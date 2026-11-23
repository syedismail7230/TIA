// ===================================================
// TIA BACKEND - NOTIFICATION SERVICE
// Backed by PostgreSQL Notification model
// ===================================================

import fs from 'fs';
import path from 'path';
import prisma from '@/lib/db/prisma';

export interface AppNotificationRecord {
  id: string;
  userId: string;
  title: string;
  message: string;
  tab: 'campaigns' | 'discovery' | 'applications' | 'workspace' | 'financials' | 'settings';
  read: boolean;
  timeAgo: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const NOTIFICATIONS_FILE = path.join(DATA_DIR, 'notifications.json');

const INITIAL_NOTIFICATIONS: AppNotificationRecord[] = [
  {
    id: 'notif-1',
    userId: 'demo-brand-user-id',
    title: 'New Creator Proposal Received',
    message: 'Aarav Sharma submitted a proposal for Summer 2026 Running Series with 98.4% verified reach.',
    tab: 'applications',
    read: false,
    timeAgo: '10m ago',
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-2',
    userId: 'demo-brand-user-id',
    title: 'Draft Video Cut Ready for Review',
    message: 'Aarav Sharma uploaded 4K draft video for boAt ANC Earbuds campaign. 72h SLA review timer active.',
    tab: 'workspace',
    read: false,
    timeAgo: '2h ago',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-3',
    userId: 'demo-brand-user-id',
    title: 'Payment Protection Disbursement Verified',
    message: '₹42,300 net bank payout disbursed to Aarav Sharma after 5% TIA fee & 1% TDS deduction.',
    tab: 'financials',
    read: true,
    timeAgo: '1d ago',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

let memoryNotifications: AppNotificationRecord[] = [...INITIAL_NOTIFICATIONS];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(NOTIFICATIONS_FILE)) {
      fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(INITIAL_NOTIFICATIONS, null, 2), 'utf-8');
    }
  } catch {}
}

function readNotifications(): AppNotificationRecord[] {
  ensureDataFile();
  try {
    if (fs.existsSync(NOTIFICATIONS_FILE)) {
      const raw = fs.readFileSync(NOTIFICATIONS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return memoryNotifications;
}

function writeNotifications(notifications: AppNotificationRecord[]) {
  memoryNotifications = [...notifications];
  try {
    ensureDataFile();
    fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2), 'utf-8');
  } catch {}
}

function calculateTimeAgo(dateStr: string | Date): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / (60 * 1000));
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function mapPrismaToNotificationRecord(n: any): AppNotificationRecord {
  return {
    id: n.id,
    userId: n.userId,
    title: n.title,
    message: n.message,
    tab: (n.tab || 'campaigns') as any,
    read: n.isRead,
    timeAgo: calculateTimeAgo(n.createdAt),
    createdAt: n.createdAt ? new Date(n.createdAt).toISOString() : new Date().toISOString(),
  };
}

export class NotificationService {
  static async getForUser(userId: string): Promise<AppNotificationRecord[]> {
    try {
      const dbRows = await prisma.notification.findMany({
        where: {
          OR: [{ userId }, { userId: 'all' }],
        },
        orderBy: { createdAt: 'desc' },
      });

      if (dbRows && dbRows.length > 0) {
        return dbRows.map(mapPrismaToNotificationRecord);
      }
    } catch {
      // Fallback to cache if database is unreachable
    }

    const list = readNotifications();
    return list
      .filter((n) => n.userId === userId || n.userId === 'all')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static async send(input: {
    userId: string;
    title: string;
    message: string;
    tab: AppNotificationRecord['tab'];
  }): Promise<AppNotificationRecord> {
    const id = `notif-${Date.now()}`;
    let newNotif: AppNotificationRecord = {
      id,
      userId: input.userId,
      title: input.title,
      message: input.message,
      tab: input.tab,
      read: false,
      timeAgo: 'Just now',
      createdAt: new Date().toISOString(),
    };

    try {
      const dbRow = await prisma.notification.create({
        data: {
          id,
          userId: input.userId,
          title: input.title,
          message: input.message,
          tab: input.tab,
          isRead: false,
          type: 'INFO',
        },
      });
      newNotif = mapPrismaToNotificationRecord(dbRow);
    } catch {
      // Local cache updated below
    }

    const list = readNotifications();
    list.unshift(newNotif);
    writeNotifications(list);
    return newNotif;
  }

  static async markAllAsRead(userId: string): Promise<boolean> {
    try {
      await prisma.notification.updateMany({
        where: {
          OR: [{ userId }, { userId: 'all' }],
        },
        data: { isRead: true },
      });
    } catch {
      // Local cache updated below
    }

    const list = readNotifications();
    for (const n of list) {
      if (n.userId === userId || n.userId === 'all') {
        n.read = true;
      }
    }
    writeNotifications(list);
    return true;
  }
}
