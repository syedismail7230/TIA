// ===================================================
// TIA BACKEND - NOTIFICATION SERVICE
// ===================================================

import fs from 'fs';
import path from 'path';

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

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(NOTIFICATIONS_FILE)) {
    const initial: AppNotificationRecord[] = [
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
    fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  }
}

function readNotifications(): AppNotificationRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(NOTIFICATIONS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeNotifications(notifications: AppNotificationRecord[]) {
  ensureDataFile();
  fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2), 'utf-8');
}

export class NotificationService {
  static async getForUser(userId: string): Promise<AppNotificationRecord[]> {
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
    const list = readNotifications();
    const newNotif: AppNotificationRecord = {
      id: `notif-${Date.now()}`,
      userId: input.userId,
      title: input.title,
      message: input.message,
      tab: input.tab,
      read: false,
      timeAgo: 'Just now',
      createdAt: new Date().toISOString(),
    };

    list.unshift(newNotif);
    writeNotifications(list);
    return newNotif;
  }

  static async markAllAsRead(userId: string): Promise<boolean> {
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
