// ===================================================
// TIA BACKEND - MESSAGING & CIRCUMVENTION SERVICE
// ===================================================

import fs from 'fs';
import path from 'path';
import { scanForCircumvention } from '@/lib/circumvention/detector';
import { logAudit } from '@/lib/audit/logger';

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

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(THREADS_FILE)) {
    const initialThreads: ChatThreadRecord[] = [
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
    fs.writeFileSync(THREADS_FILE, JSON.stringify(initialThreads, null, 2), 'utf-8');
  }

  if (!fs.existsSync(MESSAGES_FILE)) {
    const initialMessages: ChatMessageRecord[] = [
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
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(initialMessages, null, 2), 'utf-8');
  }
}

function readThreads(): ChatThreadRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(THREADS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeThreads(threads: ChatThreadRecord[]) {
  ensureDataFile();
  fs.writeFileSync(THREADS_FILE, JSON.stringify(threads, null, 2), 'utf-8');
}

function readMessages(): ChatMessageRecord[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeMessages(messages: ChatMessageRecord[]) {
  ensureDataFile();
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
}

export class MessageService {
  static async getThreadsForUser(userId: string): Promise<ChatThreadRecord[]> {
    const threads = readThreads();
    return threads.filter((t) => t.brandId === userId || t.creatorId === userId);
  }

  static async getMessages(threadId: string): Promise<ChatMessageRecord[]> {
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

    const messages = readMessages();
    const newMsg: ChatMessageRecord = {
      id: `msg-${Date.now()}`,
      threadId: input.threadId,
      senderId: input.senderId,
      senderName: input.senderName,
      senderRole: input.senderRole,
      text: input.text.trim(),
      type: 'TEXT',
      attachmentUrl: input.attachmentUrl,
      createdAt: new Date().toISOString(),
    };

    messages.push(newMsg);
    writeMessages(messages);

    // Update thread snippet
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
