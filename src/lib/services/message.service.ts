// ===================================================
// TIA BACKEND - MESSAGING & CIRCUMVENTION SERVICE
// Backed by PostgreSQL MessageThread & Message models
// ===================================================

import fs from 'fs';
import path from 'path';
import { scanForCircumvention } from '@/lib/circumvention/detector';
import { logAudit } from '@/lib/audit/logger';
import prisma from '@/lib/db/prisma';

export interface ChatMessageRecord {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderRole: 'BRAND' | 'CREATOR' | 'SYSTEM';
  text: string;
  type: 'TEXT' | 'DELIVERABLE' | 'MILESTONE' | 'APPROVAL';
  attachmentUrl?: string;
  flaggedForCircumvention?: boolean;
  circumventionReasons?: string[];
  createdAt: string;
}

export interface ChatThreadRecord {
  id: string;
  collabId: string;
  campaignId: string;
  campaignTitle: string;
  brandId: string;
  brandName: string;
  creatorId: string;
  creatorName: string;
  lastMessageText: string;
  lastMessageAt: string;
  unreadCountBrand: number;
  unreadCountCreator: number;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const MESSAGES_FILE = path.join(DATA_DIR, 'chat_messages.json');
const THREADS_FILE = path.join(DATA_DIR, 'chat_threads.json');

const INITIAL_THREADS: ChatThreadRecord[] = [
  {
    id: 'thread-collab-1',
    collabId: 'collab-brand-1',
    campaignId: 'camp-101',
    campaignTitle: 'Summer 2026 Running Series & Shoe Launch',
    brandId: 'demo-brand-user-id',
    brandName: 'Nike India Private Limited',
    creatorId: 'cr-101',
    creatorName: 'Aarav Sharma',
    lastMessageText: 'Color grading completed. Timestamps: 0:00 Intro, 1:45 Midsole Cushion Test.',
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    unreadCountBrand: 1,
    unreadCountCreator: 0,
  },
];

const INITIAL_MESSAGES: ChatMessageRecord[] = [
  {
    id: 'msg-1',
    threadId: 'thread-collab-1',
    senderId: 'system',
    senderName: 'TIA Platform System',
    senderRole: 'SYSTEM',
    text: 'Milestone 2 deposit of ₹87,500 secured in TIA Payment Protection.',
    type: 'MILESTONE',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg-2',
    threadId: 'thread-collab-1',
    senderId: 'cr-101',
    senderName: 'Aarav Sharma',
    senderRole: 'CREATOR',
    text: 'Draft video cut uploaded! Color grading completed. Timestamps: 0:00 Intro, 1:45 Midsole Cushion Test, 4:20 Long-distance verdict.',
    type: 'DELIVERABLE',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];

let memoryThreads: ChatThreadRecord[] = [...INITIAL_THREADS];
let memoryMessages: ChatMessageRecord[] = [...INITIAL_MESSAGES];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(THREADS_FILE)) {
      fs.writeFileSync(THREADS_FILE, JSON.stringify(INITIAL_THREADS, null, 2), 'utf-8');
    }
    if (!fs.existsSync(MESSAGES_FILE)) {
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify(INITIAL_MESSAGES, null, 2), 'utf-8');
    }
  } catch {}
}

function readThreads(): ChatThreadRecord[] {
  ensureDataFile();
  try {
    if (fs.existsSync(THREADS_FILE)) {
      const raw = fs.readFileSync(THREADS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return memoryThreads;
}

function writeThreads(threads: ChatThreadRecord[]) {
  memoryThreads = [...threads];
  try {
    ensureDataFile();
    fs.writeFileSync(THREADS_FILE, JSON.stringify(threads, null, 2), 'utf-8');
  } catch {}
}

function readMessages(): ChatMessageRecord[] {
  ensureDataFile();
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return memoryMessages;
}

function writeMessages(messages: ChatMessageRecord[]) {
  memoryMessages = [...messages];
  try {
    ensureDataFile();
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
  } catch {}
}

function mapPrismaToMessageRecord(m: any): ChatMessageRecord {
  return {
    id: m.id,
    threadId: m.threadId,
    senderId: m.senderUserId,
    senderName: m.sender?.name || 'User',
    senderRole: (m.senderRole || 'SYSTEM') as any,
    text: m.content,
    type: (m.type || 'TEXT') as any,
    attachmentUrl: m.attachmentUrls ? JSON.parse(m.attachmentUrls)[0] : undefined,
    flaggedForCircumvention: m.containsFlaggedContactInfo,
    circumventionReasons: m.flaggedReason ? [m.flaggedReason] : undefined,
    createdAt: m.createdAt ? new Date(m.createdAt).toISOString() : new Date().toISOString(),
  };
}

export class MessageService {
  static async getThreadsForUser(userId: string): Promise<ChatThreadRecord[]> {
    try {
      const dbThreads = await prisma.messageThread.findMany({
        where: {
          OR: [
            { creator: { userId } },
            { creatorId: userId },
            { organization: { members: { some: { userId } } } },
            { organizationId: userId },
          ],
        },
        include: {
          campaign: true,
          organization: true,
          creator: { include: { user: true } },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
        orderBy: { updatedAt: 'desc' },
      });

      if (dbThreads && dbThreads.length > 0) {
        return dbThreads.map((t) => {
          const lastMsg = t.messages[0];
          return {
            id: t.id,
            collabId: t.id,
            campaignId: t.campaignId,
            campaignTitle: t.campaign?.title || 'Active Collaboration',
            brandId: t.organizationId,
            brandName: t.organization?.name || 'Brand Partner',
            creatorId: t.creatorId,
            creatorName: t.creator?.displayName || t.creator?.user?.name || 'Creator',
            lastMessageText: lastMsg?.content || 'Conversation initiated',
            lastMessageAt: lastMsg?.createdAt ? new Date(lastMsg.createdAt).toISOString() : new Date(t.createdAt).toISOString(),
            unreadCountBrand: 0,
            unreadCountCreator: 0,
          };
        });
      }
    } catch {
      // Fallback to cache if PostgreSQL is unreachable
    }

    const threads = readThreads();
    return threads.filter((t) => t.brandId === userId || t.creatorId === userId);
  }

  static async getMessages(threadId: string): Promise<ChatMessageRecord[]> {
    try {
      const dbMessages = await prisma.message.findMany({
        where: { threadId },
        include: { sender: true },
        orderBy: { createdAt: 'asc' },
      });

      if (dbMessages && dbMessages.length > 0) {
        return dbMessages.map(mapPrismaToMessageRecord);
      }
    } catch {
      // Fallback to cache
    }

    const messages = readMessages();
    return messages
      .filter((m) => m.threadId === threadId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  static async sendMessage(input: {
    threadId: string;
    senderId: string;
    senderName: string;
    senderRole: 'BRAND' | 'CREATOR';
    text: string;
    attachmentUrl?: string;
  }): Promise<ChatMessageRecord> {
    const circumventionCheck = scanForCircumvention(input.text);

    if (circumventionCheck.isFlagged) {
      logAudit({
        actorId: input.senderId,
        action: 'CIRCUMVENTION_ATTEMPT_BLOCKED',
        targetType: 'ChatMessage',
        targetId: input.threadId,
        details: { reasons: circumventionCheck.reasons },
      });
      throw new Error(
        `Message blocked by TIA Protection Shield: ${circumventionCheck.reasons.join(', ')}. Direct off-platform contact sharing is strictly prohibited.`
      );
    }

    const id = `msg-${Date.now()}`;
    let newMsg: ChatMessageRecord = {
      id,
      threadId: input.threadId,
      senderId: input.senderId,
      senderName: input.senderName,
      senderRole: input.senderRole,
      text: input.text.trim(),
      type: 'TEXT',
      attachmentUrl: input.attachmentUrl,
      createdAt: new Date().toISOString(),
    };

    try {
      const created = await prisma.message.create({
        data: {
          id,
          threadId: input.threadId,
          senderUserId: input.senderId,
          senderRole: input.senderRole,
          content: input.text.trim(),
          type: 'TEXT',
          attachmentUrls: input.attachmentUrl ? JSON.stringify([input.attachmentUrl]) : null,
          containsFlaggedContactInfo: false,
          isSystemMessage: false,
        },
        include: { sender: true },
      });
      newMsg = mapPrismaToMessageRecord(created);
    } catch {
      // Local cache updated below
    }

    const messages = readMessages();
    messages.push(newMsg);
    writeMessages(messages);

    // Update thread snippet in memory
    const threads = readThreads();
    const tIdx = threads.findIndex((t) => t.id === input.threadId);
    if (tIdx >= 0) {
      threads[tIdx].lastMessageText = newMsg.text;
      threads[tIdx].lastMessageAt = newMsg.createdAt;
      if (input.senderRole === 'CREATOR') {
        threads[tIdx].unreadCountBrand += 1;
      } else {
        threads[tIdx].unreadCountCreator += 1;
      }
      writeThreads(threads);
    }

    return newMsg;
  }
}
