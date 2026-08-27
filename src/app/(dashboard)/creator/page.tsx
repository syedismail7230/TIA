'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';
import { INITIAL_CAMPAIGNS, CampaignItem } from '@/data/campaigns-data';

// ============================================================================
// VECTOR SVG BRAND & NAVIGATION ICONS
// ============================================================================

function MarketplaceIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CollabsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PaymentsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function SocialsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function SettingsIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <defs>
        <radialGradient id="ig-g" cx="20%" cy="100%" r="130%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="25%" stopColor="#FF543E" />
          <stop offset="50%" stopColor="#C837AB" />
          <stop offset="100%" stopColor="#377424" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ig-l" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#405DE6" />
          <stop offset="30%" stopColor="#5851DB" />
          <stop offset="50%" stopColor="#833AB4" />
          <stop offset="70%" stopColor="#C13584" />
          <stop offset="85%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#FD1D1D" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-l)" />
      <rect width="24" height="24" rx="6" fill="url(#ig-g)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#FFFFFF" strokeWidth="1.75" fill="none" />
      <circle cx="12" cy="12" r="3.25" stroke="#FFFFFF" strokeWidth="1.75" fill="none" />
      <circle cx="15.5" cy="8.5" r="0.85" fill="#FFFFFF" />
    </svg>
  );
}

function YouTubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M9.5 8.5L16 12L9.5 15.5V8.5Z" fill="#FFFFFF" />
    </svg>
  );
}

function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#000000" />
      <path
        d="M14.5 6C15.2 7.2 16.3 8 17.8 8.1V10.5C16.6 10.5 15.5 10.1 14.5 9.4V14.3C14.5 16.8 12.5 18.8 10 18.8C7.5 18.8 5.5 16.8 5.5 14.3C5.5 11.8 7.5 9.8 10 9.8C10.4 9.8 10.8 9.9 11.2 10V12.4C10.8 12.2 10.4 12.1 10 12.1C8.8 12.1 7.8 13.1 7.8 14.3C7.8 15.5 8.8 16.5 10 16.5C11.2 16.5 12.2 15.5 12.2 14.3V6H14.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#0F172A" />
      <path
        d="M15.8 6.5H17.6L13.7 10.9L18.3 17.5H14.7L11.8 13.7L8.6 17.5H6.8L11 12.7L6.5 6.5H10.2L12.8 10.1L15.8 6.5ZM15.2 16.4H16.2L9.7 7.5H8.6L15.2 16.4Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function PinterestIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#E60023" />
      <path
        d="M12 5.5C8.4 5.5 5.5 8.4 5.5 12C5.5 14.8 7.2 17.1 9.7 18C9.6 17.5 9.6 16.6 9.7 16.1C9.8 15.6 10.6 12.2 10.6 12.2C10.6 12.2 10.4 11.7 10.4 11C10.4 9.9 11 9.1 11.8 9.1C12.5 9.1 12.8 9.6 12.8 10.2C12.8 10.9 12.3 11.9 12.1 12.9C11.9 13.8 12.6 14.5 13.5 14.5C15.1 14.5 16.4 12.8 16.4 10.4C16.4 8.3 14.9 6.8 12.2 6.8C9.1 6.8 7.3 9.1 7.3 11.7C7.3 12.6 7.7 13.6 8.1 14.1C8.2 14.2 8.2 14.3 8.1 14.5C8 14.8 7.8 15.6 7.7 15.8C7.6 16 7.4 16.1 7.2 16C5.8 15.4 4.9 13.4 4.9 11.6C4.9 8.1 7.5 5 12.3 5C16.2 5 19.1 7.8 19.1 11.5C19.1 15.3 16.7 18.3 13.3 18.3C12.2 18.3 11.2 17.7 10.8 17C10.8 17 10.1 19.7 10 20.2C9.8 20.9 9.3 21.8 8.9 22.4C9.9 22.7 10.9 22.9 12 22.9C17.5 22.9 22 18.4 22 12.9C22 7.4 17.5 5.5 12 5.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function PercentBadgeIcon({ size = 12, color = '#7C3AED' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="9" y1="15" x2="15" y2="9" />
      <circle cx="9.5" cy="9.5" r="1" fill={color} />
      <circle cx="14.5" cy="14.5" r="1" fill={color} />
    </svg>
  );
}

function SparklesIcon({ size = 13, color = '#0052FF' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" />
    </svg>
  );
}

function SlidersIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

function InfoCircleIcon({ size = 13, color = '#D97706' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function CountryFlag({ code, size = 18 }: { code: string; size?: number }) {
  if (!code || code.toUpperCase() === 'ALL') return null;
  const width = size;
  const height = Math.round((size * 3) / 4);

  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
      width={width}
      height={height}
      alt={code}
      style={{
        borderRadius: '2px',
        objectFit: 'cover',
        display: 'inline-block',
        flexShrink: 0,
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        verticalAlign: 'middle',
      }}
      loading="lazy"
    />
  );
}

type TabType = 'marketplace' | 'collabs' | 'payments' | 'social-media' | 'settings';
type CollabFilter = 'awaiting' | 'accepted' | 'rejected';

export interface PlatformNotification {
  id: string;
  type: 'ESCROW' | 'MATCH' | 'MESSAGE' | 'APPROVAL' | 'PAYMENT' | 'SYSTEM' | 'PROPOSAL' | 'CREDIT';
  category: 'COLLABS' | 'PAYMENTS' | 'SYSTEM';
  title: string;
  message: string;
  timeAgo: string;
  timestamp: number;
  read: boolean;
  actionTab?: TabType;
  actionCollabId?: string;
  actionLabel?: string;
  badgeText?: string;
  badgeBg?: string;
  badgeColor?: string;
}

function CreatorPortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabType) || 'marketplace';

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [collabFilter, setCollabFilter] = useState<CollabFilter>('awaiting');
  const [collabFilterDropdownOpen, setCollabFilterDropdownOpen] = useState(false);
  const [selectedCollabId, setSelectedCollabId] = useState<string>('collab-1');
  const [replyMessage, setReplyMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeTabRef = useRef<TabType>(activeTab);
  activeTabRef.current = activeTab;

  const selectedCollabIdRef = useRef<string>(selectedCollabId);
  selectedCollabIdRef.current = selectedCollabId;

  // 2-Way Collabs & Messaging Workspace State
  const [isBrandTyping, setIsBrandTyping] = useState<boolean>(false);
  const [collabSearchQuery, setCollabSearchQuery] = useState<string>('');
  const [showDeliverableModal, setShowDeliverableModal] = useState<boolean>(false);
  const [deliverableType, setDeliverableType] = useState<'DRAFT_VIDEO' | 'SCRIPT' | 'LIVE_POST'>('DRAFT_VIDEO');
  const [deliverableTitle, setDeliverableTitle] = useState<string>('');
  const [deliverableUrl, setDeliverableUrl] = useState<string>('');
  const [deliverableNotes, setDeliverableNotes] = useState<string>('');
  const [deliverableSubmitSuccess, setDeliverableSubmitSuccess] = useState<boolean>(false);
  const [mobileChatViewActive, setMobileChatViewActive] = useState<boolean>(false);
  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null);

  // Bank Account & Payout Verification State
  const [bankAccount, setBankAccount] = useState<{
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountType: 'SAVINGS' | 'CURRENT';
    upiId: string;
    panNumber: string;
    verified: boolean;
    verifiedAt: string;
  } | null>({
    accountHolderName: 'Sarah Jenkins',
    bankName: 'HDFC Bank Ltd.',
    accountNumber: '50100482910482',
    ifscCode: 'HDFC0000128',
    accountType: 'SAVINGS',
    upiId: 'sarah.jenkins@okhdfcbank',
    panNumber: 'ABCDE1234F',
    verified: true,
    verifiedAt: 'Aug 15, 2026',
  });
  const [showBankModal, setShowBankModal] = useState<boolean>(false);
  const [bankForm, setBankForm] = useState({
    accountHolderName: 'Sarah Jenkins',
    bankName: 'HDFC Bank Ltd.',
    accountNumber: '50100482910482',
    confirmAccountNumber: '50100482910482',
    ifscCode: 'HDFC0000128',
    accountType: 'SAVINGS' as 'SAVINGS' | 'CURRENT',
    upiId: 'sarah.jenkins@okhdfcbank',
    panNumber: 'ABCDE1234F',
  });
  const [isVerifyingBank, setIsVerifyingBank] = useState<boolean>(false);
  const [bankVerificationSuccess, setBankVerificationSuccess] = useState<string | null>(null);
  const [selectedReceiptTx, setSelectedReceiptTx] = useState<any | null>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('tx-101');
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState<string>('');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState<'ALL' | 'PAID' | 'UNPAID'>('ALL');
  const [selectedCheckboxIds, setSelectedCheckboxIds] = useState<string[]>(['tx-101']);
  const [invoiceDetailOpen, setInvoiceDetailOpen] = useState<boolean>(true);
  const [invoiceFilterDropdownOpen, setInvoiceFilterDropdownOpen] = useState<boolean>(false);

  // Realtime Notifications State & Engine
  const [notificationsDropdownOpen, setNotificationsDropdownOpen] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState<'ALL' | 'UNREAD' | 'COLLABS' | 'PAYMENTS' | 'SYSTEM'>('ALL');
  const [liveToast, setLiveToast] = useState<PlatformNotification | null>(null);

  const [notifications, setNotifications] = useState<PlatformNotification[]>([
    {
      id: 'notif-1',
      type: 'ESCROW',
      category: 'PAYMENTS',
      title: '₹45,000 Milestone Payment Secured',
      message: 'Verified Enterprise Client funded 100% upfront milestone payment for "Next-Gen Smartphone Showcase". Safe to begin drafting.',
      timeAgo: '2m ago',
      timestamp: Date.now() - 1000 * 60 * 2,
      read: false,
      actionTab: 'collabs',
      actionCollabId: 'collab-1',
      actionLabel: 'View Collab →',
      badgeText: 'Payment Secured',
      badgeBg: '#ECFDF5',
      badgeColor: '#059669',
    },
    {
      id: 'notif-2',
      type: 'MATCH',
      category: 'COLLABS',
      title: '98% Match: ₹75,000 Audio Brief',
      message: 'New high-match campaign dropped: "Active ANC Wireless Earbuds Sound Test". Top recommendation for your tech audience.',
      timeAgo: '14m ago',
      timestamp: Date.now() - 1000 * 60 * 14,
      read: false,
      actionTab: 'marketplace',
      actionLabel: 'Explore Brief →',
      badgeText: 'Top Match',
      badgeBg: '#EFF6FF',
      badgeColor: '#0052FF',
    },
    {
      id: 'notif-3',
      type: 'MESSAGE',
      category: 'COLLABS',
      title: 'Client Sent a Message',
      message: '"Hi! We reviewed your preliminary creative outline and love the concept. Let us know when the storyboard is ready."',
      timeAgo: '45m ago',
      timestamp: Date.now() - 1000 * 60 * 45,
      read: false,
      actionTab: 'collabs',
      actionCollabId: 'collab-1',
      actionLabel: 'Open Inbox →',
      badgeText: 'New Message',
      badgeBg: '#F5F3FF',
      badgeColor: '#7C3AED',
    },
    {
      id: 'notif-4',
      type: 'APPROVAL',
      category: 'COLLABS',
      title: 'Draft Script Approved',
      message: 'Enterprise Client approved your video script with zero revision requests. Ready for final filming and upload.',
      timeAgo: '3h ago',
      timestamp: Date.now() - 1000 * 60 * 180,
      read: true,
      actionTab: 'collabs',
      actionCollabId: 'collab-2',
      actionLabel: 'View Milestone →',
      badgeText: 'Approved',
      badgeBg: '#ECFDF5',
      badgeColor: '#059669',
    },
    {
      id: 'notif-5',
      type: 'PAYMENT',
      category: 'PAYMENTS',
      title: '₹32,800 Transferred to Bank Account',
      message: 'Disbursement complete for "Beach Collection Summer" via IMPS to HDFC Bank (A/C ending in **4921). Reference: TIA-TXN-88492.',
      timeAgo: 'Yesterday',
      timestamp: Date.now() - 1000 * 60 * 60 * 24,
      read: true,
      actionTab: 'payments',
      actionLabel: 'View Statement →',
      badgeText: 'Paid',
      badgeBg: '#ECFDF5',
      badgeColor: '#16A34A',
    },
    {
      id: 'notif-6',
      type: 'SYSTEM',
      category: 'SYSTEM',
      title: 'Social Media Sync & Verified Badge Active',
      message: 'Your Instagram & YouTube account statistics have been automatically refreshed. Overall audience reach updated to 505k+ verified followers.',
      timeAgo: '2d ago',
      timestamp: Date.now() - 1000 * 60 * 60 * 48,
      read: true,
      actionTab: 'social-media',
      actionLabel: 'Check Metrics →',
      badgeText: 'Verified',
      badgeBg: '#EFF6FF',
      badgeColor: '#0052FF',
    },
  ]);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleNotificationClick = (notif: PlatformNotification) => {
    markNotificationAsRead(notif.id);
    if (notif.actionTab) {
      setActiveTab(notif.actionTab);
      router.replace(`/creator?tab=${notif.actionTab}`);
    }
    if (notif.actionCollabId) {
      setSelectedCollabId(notif.actionCollabId);
    }
    setNotificationsDropdownOpen(false);
  };

  // Automatically dismiss live toast if the user is already on or navigates to that exact page/thread
  useEffect(() => {
    if (liveToast) {
      const isNowOnPage =
        (liveToast.actionTab === 'collabs' && liveToast.actionCollabId
          ? activeTab === 'collabs' && selectedCollabId === liveToast.actionCollabId
          : liveToast.actionTab ? activeTab === liveToast.actionTab : false);
      if (isNowOnPage) {
        setLiveToast(null);
      }
    }
  }, [activeTab, selectedCollabId, liveToast]);

  const triggerRealtimeNotification = (notif: Omit<PlatformNotification, 'id' | 'timestamp' | 'timeAgo' | 'read'>) => {
    const currentTab = activeTabRef.current;
    const currentCollab = selectedCollabIdRef.current;

    // Check if the user is already on the exact same page/view or actively inside that conversation thread
    const isAlreadyOnPage =
      (notif.actionTab === 'collabs' && notif.actionCollabId
        ? currentTab === 'collabs' && currentCollab === notif.actionCollabId
        : notif.actionTab ? currentTab === notif.actionTab : false);

    const newNotif: PlatformNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: Date.now(),
      timeAgo: 'Just now',
      read: isAlreadyOnPage,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // ONLY show the floating live toast popup if the user is NOT already on that page/thread
    if (!isAlreadyOnPage) {
      setLiveToast(newNotif);
      setTimeout(() => {
        setLiveToast((current) => (current?.id === newNotif.id ? null : current));
      }, 6500);
    }
  };

  // Realtime Platform Heartbeat Simulation (Receives live matching brief / client inquiry notifications)
  useEffect(() => {
    const realtimeEvents: Array<Omit<PlatformNotification, 'id' | 'timestamp' | 'timeAgo' | 'read'>> = [
      {
        type: 'MATCH',
        category: 'COLLABS',
        title: 'New High-Value Brief Drop',
        message: 'A verified D2C Wellness brand just launched a ₹60,000 campaign matching your health & lifestyle profile.',
        actionTab: 'marketplace',
        actionLabel: 'View Brief →',
        badgeText: 'New Opportunity',
        badgeBg: '#EFF6FF',
        badgeColor: '#0052FF',
      },
      {
        type: 'SYSTEM',
        category: 'SYSTEM',
        title: 'Brand Viewed Your Media Kit',
        message: 'A verified Enterprise Client reviewed your engagement analytics and media kit from your TIA profile.',
        actionTab: 'social-media',
        actionLabel: 'View Analytics →',
        badgeText: 'Profile View',
        badgeBg: '#F5F3FF',
        badgeColor: '#7C3AED',
      },
      {
        type: 'ESCROW',
        category: 'PAYMENTS',
        title: 'Payment Protection Update',
        message: 'TIA Payment Protection system completed automated verification. 100% payout protection is active on all ongoing deals.',
        actionTab: 'payments',
        actionLabel: 'Check Security Policy →',
        badgeText: 'Payment Protected',
        badgeBg: '#ECFDF5',
        badgeColor: '#059669',
      },
    ];

    let eventIndex = 0;
    const timer = setInterval(() => {
      const nextEvent = realtimeEvents[eventIndex % realtimeEvents.length];
      eventIndex++;
      triggerRealtimeNotification(nextEvent);
    }, 45000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#user-profile-dropdown-container')) {
        setProfileDropdownOpen(false);
      }
      if (!target.closest('#country-filter-dropdown-container')) {
        setCountryDropdownOpen(false);
      }
      if (!target.closest('#notification-bell-dropdown-container')) {
        setNotificationsDropdownOpen(false);
      }
    };
    if (profileDropdownOpen || countryDropdownOpen || notificationsDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [profileDropdownOpen, countryDropdownOpen, notificationsDropdownOpen]);

  // Application Credits & Free Applies State (1 Free Apply initially, ₹99/credit thereafter)
  const [applyCredits, setApplyCredits] = useState<number>(1);
  const [totalAppliesCount, setTotalAppliesCount] = useState<number>(0);
  const [creditPurchaseSuccess, setCreditPurchaseSuccess] = useState<string | null>(null);
  const [showBuyCreditsModal, setShowBuyCreditsModal] = useState<boolean>(false);
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [bidSubmittedSuccess, setBidSubmittedSuccess] = useState<boolean>(false);

  // Dynamic Time-Aware Personalized Greeting
  const [dynamicGreeting, setDynamicGreeting] = useState<{ title: string; subtitle: string }>({
    title: 'Welcome back, Creator!',
    subtitle: 'Explore the latest hand-picked brand deals tailored for you.',
  });

  useEffect(() => {
    const hour = new Date().getHours();
    const name = currentUser?.name ? currentUser.name.split(' ')[0] : 'Creator';

    let timeTitle = '';
    let pool: string[] = [];

    if (hour >= 5 && hour < 12) {
      timeTitle = `Good morning, ${name}!`;
      pool = [
        "Here are today's fresh brand sponsorships ready for your pitch.",
        "Start your morning with high-paying verified brand opportunities.",
        "Exciting campaigns just dropped in your niche today.",
        "Brands are actively seeking creative partners this morning.",
      ];
    } else if (hour >= 12 && hour < 17) {
      timeTitle = `Good afternoon, ${name}!`;
      pool = [
        "Take a look at newly verified brand deals waiting for you.",
        "Great time to submit your proposals and lock in new sponsorships.",
        "Discover the top brand opportunities matched to your audience.",
        "New campaigns have been added to your personalized feed.",
      ];
    } else if (hour >= 17 && hour < 22) {
      timeTitle = `Good evening, ${name}!`;
      pool = [
        "Wrap up your day by exploring top-paying brand collaborations.",
        "Check out high-converting campaigns open for bids tonight.",
        "New brand briefs match your content style and audience demographic.",
        "Review the latest verified campaigns and submit your bids.",
      ];
    } else {
      timeTitle = `Good night, ${name}!`;
      pool = [
        "Explore night-owl campaign drops and get ahead of the applicant queue.",
        "Plan tomorrow's sponsorships with these verified brand opportunities.",
        "Midnight opportunities matched directly to your profile.",
        "Discover handpicked brand collaborations ready for your pitch.",
      ];
    }

    const randomSubtitle = pool[Math.floor(Math.random() * pool.length)];
    setDynamicGreeting({
      title: timeTitle,
      subtitle: randomSubtitle,
    });
  }, [currentUser]);

  // Proposal & Bid State for Full-Page Project View (Freelancer.com Inspiration)
  const [bidAmount, setBidAmount] = useState<string>('700');
  const [bidDays, setBidDays] = useState<string>('14');
  const [proposalPitch, setProposalPitch] = useState<string>('');

  // Search & Filter State
  const [showMatchBanner, setShowMatchBanner] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [selectedCommercialType, setSelectedCommercialType] = useState('ALL');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');
  const [selectedBudgetTier, setSelectedBudgetTier] = useState<string>('ALL');
  const [selectedSuccessFilter, setSelectedSuccessFilter] = useState<string>('ALL');
  const [advancedFilterExpanded, setAdvancedFilterExpanded] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'success_rate' | 'payout_high' | 'applicants' | 'newest'>('success_rate');

  // Social accounts state
  const [socialAccounts, setSocialAccounts] = useState<any[]>([
    { platform: 'INSTAGRAM', username: 'creator.official', audienceSize: 320000, engagementRate: 4.85, connected: true },
    { platform: 'YOUTUBE', username: 'creatortech', audienceSize: 185000, engagementRate: 6.2, connected: true },
    { platform: 'X', username: 'creator_x', audienceSize: 45000, engagementRate: 2.1, connected: true },
  ]);

  // Clean Reference-Matched Campaigns Data (156 Rich Campaigns with Localized Currency & Language)
  const [campaigns] = useState<CampaignItem[]>(INITIAL_CAMPAIGNS);

  // Filter Categories & Countries Configuration
  const filterCategories = [
    { id: 'ALL', label: 'All Niches' },
    { id: 'Technology', label: 'Tech & Gadgets' },
    { id: 'Fashion', label: 'Fashion & Apparel' },
    { id: 'Beauty', label: 'Beauty & Skincare' },
    { id: 'Food', label: 'Food & Culinary' },
    { id: 'Fitness', label: 'Fitness & Gym' },
    { id: 'Lifestyle', label: 'Lifestyle' },
    { id: 'Travel', label: 'Travel & Outdoors' },
    { id: 'Gaming', label: 'Gaming & Esports' },
    { id: 'Finance', label: 'Finance & Web3' },
    { id: 'Automobile', label: 'Automobile & EV' },
    { id: 'Health', label: 'Health & Wellness' },
    { id: 'Music', label: 'Music & Audio' },
    { id: 'Sustainability', label: 'Sustainability' },
  ];

  const filterPlatforms = [
    { id: 'ALL', label: 'All Platforms', icon: '🌐' },
    { id: 'INSTAGRAM', label: 'Instagram', icon: '📸' },
    { id: 'YOUTUBE', label: 'YouTube', icon: '▶️' },
    { id: 'TWITCH', label: 'Twitch', icon: '👾' },
    { id: 'PINTEREST', label: 'Pinterest', icon: '📌' },
    { id: 'X', label: 'X (Twitter)', icon: '𝕏' },
  ];

  const filterBudgetTiers = [
    { id: 'ALL', label: 'All Payouts' },
    { id: 'UNDER_35K', label: '< ₹35,000' },
    { id: '35K_60K', label: '₹35,000 – ₹60,000' },
    { id: '60K_100K', label: '₹60,000 – ₹1,00,000' },
    { id: 'ABOVE_100K', label: '₹1,00,000+ High Value' },
  ];

  const filterMatchTiers = [
    { id: 'ALL', label: 'All Opportunities' },
    { id: 'HIGH_MATCH', label: 'High Match (90%+)' },
    { id: 'LOW_COMPETITION', label: 'Low Competition (< 35 Applicants)' },
  ];

  const filterCountries = [
    { code: 'ALL', label: 'All Countries' },
    { code: 'AR', label: 'Argentina' },
    { code: 'AU', label: 'Australia' },
    { code: 'AT', label: 'Austria' },
    { code: 'BH', label: 'Bahrain' },
    { code: 'BD', label: 'Bangladesh' },
    { code: 'BE', label: 'Belgium' },
    { code: 'BR', label: 'Brazil' },
    { code: 'BG', label: 'Bulgaria' },
    { code: 'CA', label: 'Canada' },
    { code: 'CL', label: 'Chile' },
    { code: 'CN', label: 'China' },
    { code: 'CO', label: 'Colombia' },
    { code: 'HR', label: 'Croatia' },
    { code: 'CY', label: 'Cyprus' },
    { code: 'CZ', label: 'Czech Republic' },
    { code: 'DK', label: 'Denmark' },
    { code: 'EG', label: 'Egypt' },
    { code: 'EE', label: 'Estonia' },
    { code: 'FI', label: 'Finland' },
    { code: 'FR', label: 'France' },
    { code: 'GE', label: 'Georgia' },
    { code: 'DE', label: 'Germany' },
    { code: 'GR', label: 'Greece' },
    { code: 'HK', label: 'Hong Kong' },
    { code: 'HU', label: 'Hungary' },
    { code: 'IS', label: 'Iceland' },
    { code: 'IN', label: 'India' },
    { code: 'ID', label: 'Indonesia' },
    { code: 'IE', label: 'Ireland' },
    { code: 'IL', label: 'Israel' },
    { code: 'IT', label: 'Italy' },
    { code: 'JP', label: 'Japan' },
    { code: 'JO', label: 'Jordan' },
    { code: 'KZ', label: 'Kazakhstan' },
    { code: 'KE', label: 'Kenya' },
    { code: 'KW', label: 'Kuwait' },
    { code: 'LV', label: 'Latvia' },
    { code: 'LB', label: 'Lebanon' },
    { code: 'LT', label: 'Lithuania' },
    { code: 'LU', label: 'Luxembourg' },
    { code: 'MY', label: 'Malaysia' },
    { code: 'MX', label: 'Mexico' },
    { code: 'MA', label: 'Morocco' },
    { code: 'NL', label: 'Netherlands' },
    { code: 'NZ', label: 'New Zealand' },
    { code: 'NG', label: 'Nigeria' },
    { code: 'NO', label: 'Norway' },
    { code: 'OM', label: 'Oman' },
    { code: 'PK', label: 'Pakistan' },
    { code: 'PH', label: 'Philippines' },
    { code: 'PL', label: 'Poland' },
    { code: 'PT', label: 'Portugal' },
    { code: 'QA', label: 'Qatar' },
    { code: 'RO', label: 'Romania' },
    { code: 'SA', label: 'Saudi Arabia' },
    { code: 'SG', label: 'Singapore' },
    { code: 'ZA', label: 'South Africa' },
    { code: 'KR', label: 'South Korea' },
    { code: 'ES', label: 'Spain' },
    { code: 'LK', label: 'Sri Lanka' },
    { code: 'SE', label: 'Sweden' },
    { code: 'CH', label: 'Switzerland' },
    { code: 'TW', label: 'Taiwan' },
    { code: 'TH', label: 'Thailand' },
    { code: 'TR', label: 'Turkey' },
    { code: 'UA', label: 'Ukraine' },
    { code: 'AE', label: 'United Arab Emirates' },
    { code: 'GB', label: 'United Kingdom' },
    { code: 'US', label: 'United States' },
    { code: 'VN', label: 'Vietnam' },
  ];

  // Compute Filtered & Sorted Campaigns
  const filteredCampaigns = campaigns
    .filter((camp) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = camp.title.toLowerCase().includes(q);
        const matchesBrand = camp.brandName.toLowerCase().includes(q);
        const matchesCountry =
          camp.country.toLowerCase().includes(q) || camp.countryCode.toLowerCase().includes(q);
        const matchesCategories = camp.categories.some((cat: string) =>
          cat.toLowerCase().includes(q)
        );
        const matchesDesc = camp.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesCountry && !matchesCategories && !matchesDesc) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'ALL') {
        const matchesCat = camp.categories.some((c: string) =>
          c.toLowerCase().includes(selectedCategory.toLowerCase())
        );
        if (!matchesCat) return false;
      }

      // 3. Country Filter
      if (selectedCountry !== 'ALL') {
        if (camp.countryCode.toLowerCase() !== selectedCountry.toLowerCase()) {
          return false;
        }
      }

      // 4. Commercial Type Filter
      if (selectedCommercialType !== 'ALL') {
        if (camp.commercialType !== selectedCommercialType) {
          return false;
        }
      }

      // 5. Platform Filter
      if (selectedPlatform !== 'ALL') {
        const hasPlatform = camp.socials?.some(
          (s: string) => s.toUpperCase() === selectedPlatform.toUpperCase()
        );
        if (!hasPlatform) return false;
      }

      // 6. Budget Tier Filter
      if (selectedBudgetTier !== 'ALL') {
        const numericAmount = parseInt(camp.payoutAmount.replace(/[^0-9]/g, ''), 10) || 0;
        if (selectedBudgetTier === 'UNDER_35K') {
          if (camp.currencyCode === 'INR' && numericAmount >= 35000) return false;
          if (camp.currencyCode !== 'INR' && numericAmount >= 1000) return false;
        } else if (selectedBudgetTier === '35K_60K') {
          if (camp.currencyCode === 'INR' && (numericAmount < 35000 || numericAmount > 60000)) return false;
          if (camp.currencyCode !== 'INR' && (numericAmount < 500 || numericAmount > 1500)) return false;
        } else if (selectedBudgetTier === '60K_100K') {
          if (camp.currencyCode === 'INR' && (numericAmount < 60000 || numericAmount > 100000)) return false;
          if (camp.currencyCode !== 'INR' && (numericAmount < 1500 || numericAmount > 3000)) return false;
        } else if (selectedBudgetTier === 'ABOVE_100K') {
          if (camp.currencyCode === 'INR' && numericAmount < 100000) return false;
          if (camp.currencyCode !== 'INR' && numericAmount < 2000) return false;
        }
      }

      // 7. Success / Match Filter
      if (selectedSuccessFilter === 'HIGH_MATCH') {
        if ((camp.acceptanceChance || 0) < 90 && (camp.eligibilityRate || 0) < 90) return false;
      } else if (selectedSuccessFilter === 'LOW_COMPETITION') {
        if ((camp.creatorsApplied || 0) >= 35) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'success_rate') {
        return b.eligibilityRate - a.eligibilityRate;
      }
      if (sortBy === 'payout_high') {
        const numA = parseInt(a.payoutAmount.replace(/[^0-9]/g, ''), 10) || 0;
        const numB = parseInt(b.payoutAmount.replace(/[^0-9]/g, ''), 10) || 0;
        return numB - numA;
      }
      if (sortBy === 'applicants') {
        return b.creatorsApplied - a.creatorsApplied;
      }
      if (sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      return 0;
    });

  const activeAdvancedCount =
    (selectedPlatform !== 'ALL' ? 1 : 0) +
    (selectedBudgetTier !== 'ALL' ? 1 : 0) +
    (selectedSuccessFilter !== 'ALL' ? 1 : 0);

  const activeFiltersCount =
    (selectedCategory !== 'ALL' ? 1 : 0) +
    (selectedCountry !== 'ALL' ? 1 : 0) +
    (selectedCommercialType !== 'ALL' ? 1 : 0) +
    (selectedPlatform !== 'ALL' ? 1 : 0) +
    (selectedBudgetTier !== 'ALL' ? 1 : 0) +
    (selectedSuccessFilter !== 'ALL' ? 1 : 0) +
    (sortBy !== 'success_rate' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  const hasActiveFilters = activeFiltersCount > 0;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedCountry('ALL');
    setSelectedCommercialType('ALL');
    setSelectedPlatform('ALL');
    setSelectedBudgetTier('ALL');
    setSelectedSuccessFilter('ALL');
    setSortBy('success_rate');
  };

  // Collabs & Inbox Threads
  const [collabs, setCollabs] = useState<any[]>([
    {
      id: 'collab-1',
      campaignTitle: 'Next-Gen Smartphone Showcase',
      subject: 'Creator Flagship Partnership & Unboxing',
      brandName: 'Leading Consumer Tech Brand (Verified)',
      brandRole: 'Lead Campaign Producer • Mobile Devices Group',
      brandInitials: 'TC',
      brandAvatarBg: '#EFF6FF',
      brandAvatarColor: '#0052FF',
      status: 'ACCEPTED',
      milestoneStage: 3,
      milestoneName: 'Milestone 2: Video Draft Review',
      appliedAt: 'Oct 26, 2026',
      proposedRate: '₹45,000',
      escrowFunded: true,
      escrowAmount: '₹45,000',
      deliveryTimeline: '14 Days',
      deliverables: '1x Dedicated YouTube Review, 2x IG Reels',
      unreadCount: 0,
      messages: [
        {
          id: 'msg-1',
          sender: 'BRAND',
          senderName: 'Tech Brand Lead',
          badge: 'Application Accepted',
          badgeColor: '#059669',
          badgeBg: '#ECFDF5',
          date: 'Oct 26, 2026 - 11:22 AM',
          text: 'Hey! We are thrilled to confirm your selection for our flagship smartphone launch campaign! We loved your camera comparison formats.',
          type: 'TEXT',
        },
        {
          id: 'msg-escrow-1',
          sender: 'SYSTEM',
          senderName: 'TIA Payment Protection',
          badge: '100% Payment Secured',
          badgeColor: '#059669',
          badgeBg: '#ECFDF5',
          date: 'Oct 26, 2026 - 11:25 AM',
          type: 'ESCROW',
          text: 'Milestone deposit of ₹45,000 INR has been fully funded and locked into secure milestone protection. Creator is guaranteed 100% payout upon publication of agreed deliverables.',
          escrowMeta: {
            amount: '₹45,000',
            milestone: 'Milestone 1 & 2',
            status: 'LOCKED',
          },
        },
        {
          id: 'msg-2',
          sender: 'CREATOR',
          senderName: 'You',
          date: 'Oct 27, 2026 - 02:15 PM',
          text: 'Thank you for the confirmation! I have reviewed the brief guidelines. I am working on the script outline and storyboard today.',
          type: 'TEXT',
        },
        {
          id: 'msg-3',
          sender: 'BRAND',
          senderName: 'Tech Brand Lead',
          badge: 'Product Shipment',
          badgeColor: '#059669',
          badgeBg: '#ECFDF5',
          date: 'Oct 28, 2026 - 10:40 AM',
          text: 'Awesome! Priority review unit tracking ID has been dispatched: DHL Express #99281920. Please let us know when the device arrives safely.',
          type: 'TEXT',
        },
        {
          id: 'msg-deliv-1',
          sender: 'CREATOR',
          senderName: 'You',
          date: 'Oct 29, 2026 - 06:10 PM',
          type: 'DELIVERABLE',
          text: 'Submitted preliminary script & storyboard outline for Milestone 1.',
          deliverableMeta: {
            title: 'Script & Storyboard v1.2 (Unboxing & Low-Light Camera Test)',
            url: 'https://docs.google.com/document/d/sample-script-outline',
            notes: 'Includes hook: 100x zoom demonstration in low light, followed by real-world battery benchmark.',
            type: 'SCRIPT',
            status: 'APPROVED',
          },
        },
        {
          id: 'msg-4',
          sender: 'BRAND',
          senderName: 'Tech Brand Lead',
          badge: 'Milestone Approved',
          badgeColor: '#0052FF',
          badgeBg: '#EFF6FF',
          date: 'Oct 30, 2026 - 04:10 PM',
          text: 'First draft script looks brilliant! The 100x zoom hook is fantastic. Please proceed with filming the 4K video. Mention the campaign tags #FlagshipCamera #TechReview #Ad.',
          type: 'TEXT',
        },
      ],
    },
    {
      id: 'collab-2',
      campaignTitle: 'Aurora Hydra Skincare Launch',
      subject: 'Hydra Glow 30-Day Creator Collaboration',
      brandName: 'Aurora Organics Skincare (Verified)',
      brandRole: 'Influencer Partnerships Lead',
      brandInitials: 'AO',
      brandAvatarBg: '#FDF2F8',
      brandAvatarColor: '#DB2777',
      status: 'AWAITING',
      milestoneStage: 1,
      milestoneName: 'Milestone 1: Proposal Review',
      appliedAt: 'Oct 28, 2026',
      proposedRate: '₹30,000',
      escrowFunded: false,
      escrowAmount: '₹30,000',
      deliveryTimeline: '10 Days',
      deliverables: '2x Instagram Reels, 3x Story Frame Sets',
      unreadCount: 1,
      messages: [
        {
          id: 'msg-21',
          sender: 'BRAND',
          senderName: 'Laura B. (Campaign Lead)',
          badge: 'Proposal Review',
          badgeColor: '#D97706',
          badgeBg: '#FEF3C7',
          date: 'Oct 28, 2026 - 09:30 AM',
          text: 'Hi! We received your verified bid of ₹30,000 INR. Our marketing team is reviewing your audience demographic breakdown. We will update you here shortly!',
          type: 'TEXT',
        },
      ],
    },
    {
      id: 'collab-3',
      campaignTitle: 'Active ANC Wireless Earbuds Sound Test',
      subject: 'High-Fidelity Audio Creator Review',
      brandName: 'Leading Audio & Wearables Brand (Verified)',
      brandRole: 'Senior Marketing Director',
      brandInitials: 'AW',
      brandAvatarBg: '#ECFDF5',
      brandAvatarColor: '#059669',
      status: 'ACCEPTED',
      milestoneStage: 4,
      milestoneName: 'Milestone 3: Live Post & Final Payout Release',
      appliedAt: 'Oct 20, 2026',
      proposedRate: '₹55,000',
      escrowFunded: true,
      escrowAmount: '₹55,000',
      deliveryTimeline: '7 Days',
      deliverables: '1x YouTube Integration, 1x Instagram Reel',
      unreadCount: 0,
      messages: [
        {
          id: 'msg-31',
          sender: 'BRAND',
          senderName: 'Audio Brand Manager',
          badge: 'Payment Secured',
          badgeColor: '#059669',
          badgeBg: '#ECFDF5',
          date: 'Oct 20, 2026 - 10:00 AM',
          text: 'Welcome aboard! Full ₹55,000 milestone deposit has been funded into secure payment protection. Ready for draft delivery.',
          type: 'TEXT',
        },
        {
          id: 'msg-deliv-31',
          sender: 'CREATOR',
          senderName: 'You',
          date: 'Oct 22, 2026 - 04:30 PM',
          type: 'DELIVERABLE',
          text: 'Submitted final video draft for review.',
          deliverableMeta: {
            title: '4K Earbuds Noise Cancelling Field Test (Unlisted Video)',
            url: 'https://youtube.com/watch?v=sample-unlisted-video',
            notes: 'Tested in noisy subway train and coffee shop. Sound quality highlights ANC strength.',
            type: 'DRAFT_VIDEO',
            status: 'APPROVED',
          },
        },
        {
          id: 'msg-32',
          sender: 'BRAND',
          senderName: 'Audio Brand Manager',
          badge: 'Video Approved',
          badgeColor: '#0052FF',
          badgeBg: '#EFF6FF',
          date: 'Oct 23, 2026 - 11:15 AM',
          text: 'The subway noise test is incredible! Zero revisions required. Please publish the video live on Friday at 6:00 PM IST.',
          type: 'TEXT',
        },
        {
          id: 'msg-deliv-32',
          sender: 'CREATOR',
          senderName: 'You',
          date: 'Oct 24, 2026 - 06:15 PM',
          type: 'DELIVERABLE',
          text: 'Video is published live on YouTube with tracking link.',
          deliverableMeta: {
            title: 'Live Video Link: Active ANC Earbuds Review (Public)',
            url: 'https://youtube.com/watch?v=live-earbuds-public',
            notes: 'Link in description and pinned top comment with discount code.',
            type: 'LIVE_POST',
            status: 'APPROVED',
          },
        },
        {
          id: 'msg-33',
          sender: 'BRAND',
          senderName: 'Audio Brand Manager',
          badge: 'Payout Approved',
          badgeColor: '#059669',
          badgeBg: '#ECFDF5',
          date: 'Oct 25, 2026 - 09:00 AM',
          text: 'Views and audience comments look phenomenal! Releasing full ₹55,000 payout to your balance. Thank you for a stellar collaboration!',
          type: 'TEXT',
        },
      ],
    },
    {
      id: 'collab-4',
      campaignTitle: 'Smart Fitness Tracker Launch',
      subject: 'Endurance & Heart Rate Test Campaign',
      brandName: 'Wearable Tech Enterprise (Verified)',
      brandRole: 'Global Outreach Manager',
      brandInitials: 'WT',
      brandAvatarBg: '#F1F5F9',
      brandAvatarColor: '#64748B',
      status: 'REJECTED',
      milestoneStage: 1,
      milestoneName: 'Archived',
      appliedAt: 'Oct 12, 2026',
      proposedRate: '₹22,000',
      escrowFunded: false,
      escrowAmount: '₹0',
      deliveryTimeline: '14 Days',
      deliverables: '1x Dedicated Reel',
      unreadCount: 0,
      messages: [
        {
          id: 'msg-41',
          sender: 'BRAND',
          senderName: 'Fitness Tech Team',
          badge: 'Wave Filled',
          badgeColor: '#64748B',
          badgeBg: '#F1F5F9',
          date: 'Oct 14, 2026 - 03:20 PM',
          text: 'Thank you for your proposal. All creator roster slots for this campaign wave have been filled. We will keep your profile on file for our upcoming Q1 campaign.',
          type: 'TEXT',
        },
      ],
    },
  ]);

  // Financial Ledger & Invoices (TIA Creator Collabs SaaS Model)
  const [payments, setPayments] = useState<any[]>([
    {
      id: 'tx-101',
      invoiceCode: 'INV-PHA-0192',
      mediaName: 'Paul Homes Apparel',
      initials: 'PH',
      logoBg: '#2563EB',
      email: 'partnerships@paulhomes.in',
      campaign: 'Winter Fashion 2026 Lookbook Reel',
      deliverableDesc: '1x Dedicated 4K Reel + 2x Story Highlights',
      amount: '₹25,000.00',
      priceFormatted: '₹25,000.00',
      grossAmount: 25000,
      tdsDeduction: 250,
      platformFee: 0,
      netAmount: 24750,
      authorizedAt: '20 Aug 2026',
      dueDate: '20 Aug 2026',
      status: 'UNCLAIMED',
      statusLabel: 'Unpaid',
      utrNumber: 'HDFC9821049219',
      invoiceNumber: 'INV-PHA-2026-0192',
      billedTo: 'Paul Homes Retail India Pvt Ltd',
      currency: 'INR (₹ Indian Rupee)',
      fromName: 'TIA Financial Engine',
      fromEmail: 'billing@theinfluencealliance.com',
    },
    {
      id: 'tx-102',
      invoiceCode: 'INV-NCS-2931',
      mediaName: 'Nathalie Case Swimwear',
      initials: 'NC',
      logoBg: '#DB2777',
      email: 'collabs@nathaliecase.in',
      campaign: 'Beach Collection Summer Reel',
      deliverableDesc: '1x Feature Showcase Reel + Link in Bio',
      amount: '₹32,800.00',
      priceFormatted: '₹32,800.00',
      grossAmount: 32800,
      tdsDeduction: 328,
      platformFee: 0,
      netAmount: 32472,
      authorizedAt: '18 Aug 2026',
      dueDate: '18 Aug 2026',
      status: 'PAID',
      statusLabel: 'Paid',
      utrNumber: 'HDFC8821938210',
      invoiceNumber: 'INV-NCS-2026-2931',
      billedTo: 'Nathalie Case India Brand Ltd',
      currency: 'INR (₹ Indian Rupee)',
      fromName: 'TIA Financial Engine',
      fromEmail: 'billing@theinfluencealliance.com',
      disbursedAt: '19 Aug 2026 - 11:30 AM',
    },
    {
      id: 'tx-103',
      invoiceCode: 'INV-NSA-2910',
      mediaName: 'NovaSound Audio',
      initials: 'NS',
      logoBg: '#7C3AED',
      email: 'influencers@novasound.in',
      campaign: 'Active ANC Earbuds Launch Review',
      deliverableDesc: '1x Dedicated YouTube Review & Unboxing',
      amount: '₹55,000.00',
      priceFormatted: '₹55,000.00',
      grossAmount: 55000,
      tdsDeduction: 550,
      platformFee: 0,
      netAmount: 54450,
      authorizedAt: '15 Aug 2026',
      dueDate: '15 Aug 2026',
      status: 'PAID',
      statusLabel: 'Paid',
      utrNumber: 'HDFC7721839201',
      invoiceNumber: 'INV-NSA-2026-2910',
      billedTo: 'NovaSound Electronics Ltd',
      currency: 'INR (₹ Indian Rupee)',
      fromName: 'TIA Financial Engine',
      fromEmail: 'billing@theinfluencealliance.com',
      disbursedAt: '15 Aug 2026 - 04:20 PM',
    },
    {
      id: 'tx-104',
      invoiceCode: 'INV-UB-1293',
      mediaName: 'UrbanBotanics Skincare',
      initials: 'UB',
      logoBg: '#059669',
      email: 'partnerships@urbanbotanics.in',
      campaign: 'Natural Glow Serum Routine',
      deliverableDesc: '2x Instagram Reels + 3x Stories',
      amount: '₹18,500.00',
      priceFormatted: '₹18,500.00',
      grossAmount: 18500,
      tdsDeduction: 185,
      platformFee: 0,
      netAmount: 18315,
      authorizedAt: '12 Aug 2026',
      dueDate: '12 Aug 2026',
      status: 'UNCLAIMED',
      statusLabel: 'Unpaid',
      utrNumber: 'HDFC6621049219',
      invoiceNumber: 'INV-UB-2026-1293',
      billedTo: 'UrbanBotanics Wellness Pvt Ltd',
      currency: 'INR (₹ Indian Rupee)',
      fromName: 'TIA Financial Engine',
      fromEmail: 'billing@theinfluencealliance.com',
    },
    {
      id: 'tx-105',
      invoiceCode: 'INV-ZT-3933',
      mediaName: 'Zebronics Tech',
      initials: 'ZT',
      logoBg: '#EA580C',
      email: 'campaigns@zebronics.in',
      campaign: 'RGB Gaming Headset Showcase',
      deliverableDesc: '1x Integration Segment in Gaming Stream',
      amount: '₹22,000.00',
      priceFormatted: '₹22,000.00',
      grossAmount: 22000,
      tdsDeduction: 220,
      platformFee: 0,
      netAmount: 21780,
      authorizedAt: '08 Aug 2026',
      dueDate: '08 Aug 2026',
      status: 'PAID',
      statusLabel: 'Paid',
      utrNumber: 'HDFC5521948210',
      invoiceNumber: 'INV-ZT-2026-3933',
      billedTo: 'Zebronics India Pvt Ltd',
      currency: 'INR (₹ Indian Rupee)',
      fromName: 'TIA Financial Engine',
      fromEmail: 'billing@theinfluencealliance.com',
      disbursedAt: '09 Aug 2026 - 02:15 PM',
    },
    {
      id: 'tx-106',
      invoiceCode: 'INV-CF-8585',
      mediaName: 'CultFit India',
      initials: 'CF',
      logoBg: '#E11D48',
      email: 'creatorgrowth@cultfit.in',
      campaign: 'Fit-at-Home 30 Day Challenge',
      deliverableDesc: '1x Dedicated Fitness Vlog + Referral Promo',
      amount: '₹35,000.00',
      priceFormatted: '₹35,000.00',
      grossAmount: 35000,
      tdsDeduction: 350,
      platformFee: 0,
      netAmount: 34650,
      authorizedAt: '04 Aug 2026',
      dueDate: '04 Aug 2026',
      status: 'PAID',
      statusLabel: 'Paid',
      utrNumber: 'HDFC4492019482',
      invoiceNumber: 'INV-CF-2026-8585',
      billedTo: 'Curefit Healthcare Pvt Ltd',
      currency: 'INR (₹ Indian Rupee)',
      fromName: 'TIA Financial Engine',
      fromEmail: 'billing@theinfluencealliance.com',
      disbursedAt: '05 Aug 2026 - 10:45 AM',
    },
    {
      id: 'tx-107',
      invoiceCode: 'INV-MS-8849',
      mediaName: 'Minimalist Skincare',
      initials: 'MS',
      logoBg: '#475569',
      email: 'affiliates@beminimalist.co',
      campaign: 'Niacinamide Science Breakdown',
      deliverableDesc: '1x Educational Reel + Ingredient Deep-Dive',
      amount: '₹28,000.00',
      priceFormatted: '₹28,000.00',
      grossAmount: 28000,
      tdsDeduction: 280,
      platformFee: 0,
      netAmount: 27720,
      authorizedAt: '01 Aug 2026',
      dueDate: '01 Aug 2026',
      status: 'PAID',
      statusLabel: 'Paid',
      utrNumber: 'HDFC3392019482',
      invoiceNumber: 'INV-MS-2026-8849',
      billedTo: 'Uprising Science Pvt Ltd',
      currency: 'INR (₹ Indian Rupee)',
      fromName: 'TIA Financial Engine',
      fromEmail: 'billing@theinfluencealliance.com',
      disbursedAt: '01 Aug 2026 - 05:30 PM',
    },
    {
      id: 'tx-108',
      invoiceCode: 'INV-BM-3940',
      mediaName: 'boAt Lifestyle',
      initials: 'BT',
      logoBg: '#DC2626',
      email: 'creator.hub@boat-lifestyle.com',
      campaign: 'Wireless ANC Festival Launch',
      deliverableDesc: '1x Music Festival Reel + Bio Link',
      amount: '₹42,000.00',
      priceFormatted: '₹42,000.00',
      grossAmount: 42000,
      tdsDeduction: 420,
      platformFee: 0,
      netAmount: 41580,
      authorizedAt: '28 Jul 2026',
      dueDate: '28 Jul 2026',
      status: 'PAID',
      statusLabel: 'Paid',
      utrNumber: 'HDFC2292019482',
      invoiceNumber: 'INV-BM-2026-3940',
      billedTo: 'Imagine Marketing Ltd',
      currency: 'INR (₹ Indian Rupee)',
      fromName: 'TIA Financial Engine',
      fromEmail: 'billing@theinfluencealliance.com',
      disbursedAt: '29 Jul 2026 - 12:15 PM',
    },
    {
      id: 'tx-109',
      invoiceCode: 'INV-MG-2811',
      mediaName: 'Mamaearth Organics',
      initials: 'ME',
      logoBg: '#16A34A',
      email: 'brandteam@mamaearth.in',
      campaign: 'Onion Hair Oil Routine Reel',
      deliverableDesc: '1x Hair Transformation Story Series + Reel',
      amount: '₹30,000.00',
      priceFormatted: '₹30,000.00',
      grossAmount: 30000,
      tdsDeduction: 300,
      platformFee: 0,
      netAmount: 29700,
      authorizedAt: '24 Jul 2026',
      dueDate: '24 Jul 2026',
      status: 'PAID',
      statusLabel: 'Paid',
      utrNumber: 'HDFC1192019482',
      invoiceNumber: 'INV-MG-2026-2811',
      billedTo: 'Honasa Consumer Ltd',
      currency: 'INR (₹ Indian Rupee)',
      fromName: 'TIA Financial Engine',
      fromEmail: 'billing@theinfluencealliance.com',
      disbursedAt: '25 Jul 2026 - 03:50 PM',
    },
  ]);

  // Load User Session
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user);
        }
      } catch (err) {
        console.warn('Session load note:', err);
      }
    }
    loadUser();
  }, []);

  // Listen for real OAuth messages
  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      if (event.data?.type === 'TIA_SOCIAL_CONNECTED') {
        const { platform, profile } = event.data;
        setSocialAccounts((prev) =>
          prev.map((acc) =>
            acc.platform === platform
              ? {
                  ...acc,
                  username: profile.username || acc.username,
                  audienceSize: profile.audienceSize || acc.audienceSize,
                  engagementRate: profile.engagementRate || acc.engagementRate,
                  connected: true,
                }
              : acc
          )
        );
      }
    };
    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    router.replace(`/creator?tab=${tab}`);
  };

  const handleConnectOAuth = (platform: string) => {
    const popupUrl = `/api/connectors/${platform.toLowerCase()}/auth?flow=onboarding&role=CREATOR`;
    window.open(
      popupUrl,
      `TIA_CONNECT_${platform}`,
      'width=600,height=750,scrollbars=yes,status=yes'
    );
  };

  const handleApply = (campaign: any) => {
    setSelectedCampaign(campaign);
    setBidAmount(campaign.payoutAmount?.replace(/[^0-9]/g, '') || '45000');
    setBidDays('14');
    setProposalPitch('');
    setApplySuccess(false);
    setBidSubmittedSuccess(false);
    setShowApplyModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyCredits = (count: number, costInr: number) => {
    setApplyCredits((prev) => prev + count);
    setPayments((prev) => [
      {
        id: `tx-cred-${Date.now()}`,
        mediaName: 'TIA Application Credits Top-up',
        initials: 'CR',
        campaign: `${count} Application Credits Pack (₹99/credit)`,
        amount: `₹${costInr}`,
        authorizedAt: 'Just now',
        status: 'PAID',
      },
      ...prev,
    ]);
    setCreditPurchaseSuccess(`✓ Added ${count} Application Credits for ₹${costInr}!`);
    setShowBuyCreditsModal(false);
    setTimeout(() => setCreditPurchaseSuccess(null), 4000);

    triggerRealtimeNotification({
      type: 'CREDIT',
      category: 'PAYMENTS',
      title: `${count} Application Credits Added`,
      message: `Successfully topped up your account with ${count} credits for ₹${costInr}.`,
      actionTab: 'payments',
      actionLabel: 'View Payments →',
      badgeText: 'Credits Added',
      badgeBg: '#EFF6FF',
      badgeColor: '#0052FF',
    });
  };

  const submitApplication = () => {
    if (!selectedCampaign) return;
    if (applyCredits <= 0) {
      setShowApplyModal(false);
      setSelectedCampaign(null);
      handleTabChange('payments');
      return;
    }

    // Deduct 1 credit & increment total applies
    setApplyCredits((prev) => Math.max(0, prev - 1));
    setTotalAppliesCount((prev) => prev + 1);

    const currSym = selectedCampaign.currencySymbol || '$';
    const currCode = selectedCampaign.currencyCode || 'USD';
    const currAmount = bidAmount || selectedCampaign.payoutAmount?.replace(/[^0-9]/g, '') || '45000';
    const newCollabId = `collab-${Date.now()}`;

    setCollabs((prev) => [
      {
        id: newCollabId,
        campaignTitle: selectedCampaign.title,
        subject: selectedCampaign.title,
        brandName: selectedCampaign.brandName,
        brandInitials: selectedCampaign.brandName.substring(0, 2).toUpperCase(),
        status: 'AWAITING',
        appliedAt: 'Just now',
        proposedRate: `${currSym}${currAmount} ${currCode}`,
        deliverables: selectedCampaign.deliverablesSummary || selectedCampaign.description,
        unreadCount: 1,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'BRAND',
            senderName: `${selectedCampaign.brandName} (Brand Lead)`,
            badge: 'Proposal Received',
            badgeColor: '#059669',
            badgeBg: '#ECFDF5',
            date: 'Just now',
            text: `Hi! We received your verified bid of ${currSym}${currAmount} ${currCode} (${bidDays || '14'} days delivery) for ${selectedCampaign.title}. Your profile matches our audience criteria. We will review your pitch and confirm the milestone deposit shortly.`,
          },
          {
            id: `msg-${Date.now() + 1}`,
            sender: 'CREATOR',
            senderName: 'You',
            badge: 'Application Form',
            badgeColor: '#0052FF',
            badgeBg: '#EFF6FF',
            date: 'Just now',
            text: proposalPitch || `Submitted proposal for ${selectedCampaign.title} at ${currSym}${currAmount} ${currCode}. Ready to deliver ${selectedCampaign.deliverablesSummary || selectedCampaign.description}.`,
          },
        ],
      },
      ...prev,
    ]);

    // Show bid placement confirmation screen in modal
    setBidSubmittedSuccess(true);

    triggerRealtimeNotification({
      type: 'PROPOSAL',
      category: 'COLLABS',
      title: 'Proposal Dispatched to Client',
      message: `Your verified proposal of ${currSym}${currAmount} for "${selectedCampaign.title}" was delivered to the client.`,
      actionTab: 'collabs',
      actionCollabId: newCollabId,
      actionLabel: 'View Collab →',
      badgeText: 'Bid Submitted',
      badgeBg: '#EFF6FF',
      badgeColor: '#0052FF',
    });
  };

  const handleVerifyBankAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankForm.accountNumber || !bankForm.ifscCode || !bankForm.accountHolderName) {
      alert('Please fill all mandatory bank account fields.');
      return;
    }
    if (bankForm.accountNumber !== bankForm.confirmAccountNumber) {
      alert('Account numbers do not match. Please re-enter.');
      return;
    }

    setIsVerifyingBank(true);
    setTimeout(() => {
      setIsVerifyingBank(false);
      const updatedBank = {
        accountHolderName: bankForm.accountHolderName,
        bankName: bankForm.bankName || 'HDFC Bank Ltd.',
        accountNumber: bankForm.accountNumber,
        ifscCode: bankForm.ifscCode.toUpperCase(),
        accountType: bankForm.accountType,
        upiId: bankForm.upiId || 'creator@okhdfcbank',
        panNumber: bankForm.panNumber || 'ABCDE1234F',
        verified: true,
        verifiedAt: 'Just now (Instant Penny-Drop Verified)',
      };
      setBankAccount(updatedBank);
      setBankVerificationSuccess('✓ Bank account verified successfully via Automated Penny-Drop! Ready for instant 1-click payouts.');
      setTimeout(() => {
        setBankVerificationSuccess(null);
        setShowBankModal(false);
      }, 1500);

      triggerRealtimeNotification({
        type: 'PAYMENT',
        category: 'PAYMENTS',
        title: 'Bank Account Verified',
        message: `${updatedBank.bankName} (•••• ${updatedBank.accountNumber.slice(-4)}) has been verified for automated direct payouts.`,
        actionTab: 'payments',
        badgeText: 'Bank Verified',
        badgeBg: '#ECFDF5',
        badgeColor: '#059669',
      });
    }, 1200);
  };

  const handleClaimPayout = (txId: string) => {
    if (!bankAccount || !bankAccount.verified) {
      setShowBankModal(true);
      return;
    }

    const targetTx = payments.find((p) => p.id === txId);
    const updatedTx = {
      ...targetTx,
      status: 'PAID',
      disbursedAt: 'Just now',
      utrNumber: targetTx?.utrNumber || `HDFC${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    };

    setPayments((prev) =>
      prev.map((p) => (p.id === txId ? updatedTx : p))
    );
    setSelectedReceiptTx(updatedTx);
    setClaimSuccess(true);
    setTimeout(() => setClaimSuccess(false), 4000);

    triggerRealtimeNotification({
      type: 'PAYMENT',
      category: 'PAYMENTS',
      title: 'Payout Disbursement Initiated',
      message: `Direct payout of ${targetTx?.amount || 'funds'} successfully transferred to ${bankAccount.bankName} (•••• ${bankAccount.accountNumber.slice(-4)}).`,
      actionTab: 'payments',
      actionLabel: 'View Receipt →',
      badgeText: 'Disbursed',
      badgeBg: '#F0FDF4',
      badgeColor: '#16A34A',
    });
  };

  const handleSendMessage = (customText?: string) => {
    const textToSend = (customText || replyMessage).trim();
    if (!textToSend) return;

    const currentCollab = collabs.find((c) => c.id === selectedCollabId) || collabs[0];
    if (!currentCollab) return;

    const creatorMsg = {
      id: `msg-${Date.now()}`,
      sender: 'CREATOR',
      senderName: 'You',
      date: 'Just now',
      text: textToSend,
      type: 'TEXT',
    };

    setCollabs((prev) =>
      prev.map((c) =>
        c.id === currentCollab.id
          ? {
              ...c,
              messages: [...c.messages, creatorMsg],
            }
          : c
      )
    );
    setReplyMessage('');

    // Trigger realistic 2-way Brand Response simulation
    setIsBrandTyping(true);

    setTimeout(() => {
      setIsBrandTyping(false);

      let brandReplyText = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('draft') || lower.includes('video') || lower.includes('link') || lower.includes('uploaded')) {
        brandReplyText = `Thanks for sending the update! Our creative team is reviewing the draft footage and pacing. We will confirm milestone feedback shortly.`;
      } else if (lower.includes('script') || lower.includes('outline') || lower.includes('hook')) {
        brandReplyText = `We went over your script notes—the messaging alignment is spot on! Feel free to move ahead into full filming.`;
      } else if (lower.includes('payout') || lower.includes('payment') || lower.includes('escrow') || lower.includes('money')) {
        brandReplyText = `Your ${currentCollab.proposedRate} milestone is 100% secured with payment guarantee. Once the final live post link is submitted, the payout is released directly to your balance.`;
      } else if (lower.includes('eta') || lower.includes('tomorrow') || lower.includes('time') || lower.includes('schedule') || lower.includes('friday') || lower.includes('monday')) {
        brandReplyText = `Appreciate the timeline confirmation! That fits our marketing launch schedule perfectly.`;
      } else {
        brandReplyText = `Got it! We have shared this with our campaign operations manager and will keep you posted. Thanks for the quick communication!`;
      }

      const brandReplyMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'BRAND',
        senderName: currentCollab.brandName,
        badge: 'Campaign Team',
        badgeColor: '#0052FF',
        badgeBg: '#EFF6FF',
        date: 'Just now',
        text: brandReplyText,
        type: 'TEXT',
      };

      setCollabs((prev) =>
        prev.map((c) =>
          c.id === currentCollab.id
            ? {
                ...c,
                messages: [...c.messages, brandReplyMsg],
              }
            : c
        )
      );

      triggerRealtimeNotification({
        type: 'MESSAGE',
        category: 'COLLABS',
        title: `${currentCollab.brandName} Replied`,
        message: brandReplyText,
        actionTab: 'collabs',
        actionCollabId: currentCollab.id,
        actionLabel: 'View Thread →',
        badgeText: 'New Message',
        badgeBg: '#F5F3FF',
        badgeColor: '#7C3AED',
      });
    }, 2200);
  };

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliverableUrl.trim()) return;

    const currentCollab = collabs.find((c) => c.id === selectedCollabId) || collabs[0];
    if (!currentCollab) return;

    const deliverableMsg = {
      id: `msg-deliv-${Date.now()}`,
      sender: 'CREATOR',
      senderName: 'You',
      date: 'Just now',
      type: 'DELIVERABLE',
      text: deliverableNotes || `Submitted deliverable: ${deliverableTitle || (deliverableType === 'DRAFT_VIDEO' ? 'Draft Video Review' : deliverableType === 'SCRIPT' ? 'Script & Storyboard' : 'Live Post URL')}`,
      deliverableMeta: {
        title: deliverableTitle || (deliverableType === 'DRAFT_VIDEO' ? 'Draft Video Review' : deliverableType === 'SCRIPT' ? 'Script & Storyboard' : 'Live Post URL'),
        url: deliverableUrl,
        notes: deliverableNotes,
        type: deliverableType,
        status: 'UNDER_REVIEW',
      },
    };

    setCollabs((prev) =>
      prev.map((c) =>
        c.id === currentCollab.id
          ? {
              ...c,
              milestoneStage: Math.min(4, (c.milestoneStage || 2) + 1),
              messages: [...c.messages, deliverableMsg],
            }
          : c
      )
    );

    setDeliverableSubmitSuccess(true);
    setTimeout(() => {
      setDeliverableSubmitSuccess(false);
      setShowDeliverableModal(false);
      setDeliverableUrl('');
      setDeliverableNotes('');
      setDeliverableTitle('');
    }, 1200);

    // Brand acknowledges deliverable
    setIsBrandTyping(true);
    setTimeout(() => {
      setIsBrandTyping(false);
      const brandAckMsg = {
        id: `msg-${Date.now() + 2}`,
        sender: 'BRAND',
        senderName: currentCollab.brandName,
        badge: 'Deliverable Received',
        badgeColor: '#059669',
        badgeBg: '#ECFDF5',
        date: 'Just now',
        text: `Deliverable link received! Our marketing and QA teams are reviewing the footage against the campaign requirements. Milestone confirmation will follow.`,
        type: 'TEXT',
      };

      setCollabs((prev) =>
        prev.map((c) =>
          c.id === currentCollab.id
            ? {
                ...c,
                messages: [...c.messages, brandAckMsg],
              }
            : c
        )
      );

      triggerRealtimeNotification({
        type: 'APPROVAL',
        category: 'COLLABS',
        title: 'Deliverable Under Review',
        message: `${currentCollab.brandName} has received your deliverable submission.`,
        actionTab: 'collabs',
        actionCollabId: currentCollab.id,
        actionLabel: 'View Milestone →',
        badgeText: 'Under Review',
        badgeBg: '#ECFDF5',
        badgeColor: '#059669',
      });
    }, 2500);
  };

  const handleToggleArchiveCollab = (collabId: string) => {
    setCollabs((prev) => {
      const target = prev.find((c) => c.id === collabId);
      if (!target) return prev;
      const isArchived = target.status === 'REJECTED';
      const newStatus = isArchived ? 'ACCEPTED' : 'REJECTED';
      return prev.map((c) => (c.id === collabId ? { ...c, status: newStatus } : c));
    });

    setTimeout(() => {
      setCollabs((currentCollabs) => {
        const remaining = currentCollabs.filter((c) => c.status.toLowerCase() === collabFilter && c.id !== collabId);
        if (remaining.length > 0) {
          setSelectedCollabId(remaining[0].id);
        }
        return currentCollabs;
      });
    }, 50);
  };

  const handleAcceptDeal = (collabId: string) => {
    const target = collabs.find((c) => c.id === collabId);
    if (!target) return;

    const acceptSystemMsg = {
      id: `msg-accept-${Date.now()}`,
      sender: 'SYSTEM',
      senderName: 'TIA Platform System',
      badge: 'Deal Accepted',
      badgeColor: '#059669',
      badgeBg: '#ECFDF5',
      date: 'Just now',
      type: 'ESCROW',
      text: `Brand has formally accepted the partnership agreement for ${target.proposedRate}. 100% milestone payment has been secured. You can now begin drafting and submit deliverables.`,
      escrowMeta: {
        amount: target.proposedRate,
        milestone: 'Milestone 1 & 2',
        status: 'LOCKED',
      },
    };

    setCollabs((prev) =>
      prev.map((c) =>
        c.id === collabId
          ? {
              ...c,
              status: 'ACCEPTED',
              milestoneStage: 2,
              milestoneName: 'Milestone 1: Script & Storyboard',
              escrowFunded: true,
              unreadCount: 0,
              messages: [...c.messages, acceptSystemMsg],
            }
          : c
      )
    );

    setCollabFilter('accepted');
    setSelectedCollabId(collabId);
  };

  // Auto-scroll to bottom of chat when new message arrives or thread changes
  useEffect(() => {
    if (activeTab === 'collabs') {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab, selectedCollabId, isBrandTyping, collabs]);

  const selectedCollab = collabs.find((c) => c.id === selectedCollabId) || collabs[0];
  const displayName =
    currentUser?.name ||
    (currentUser?.email ? currentUser.email.split('@')[0] : 'Creator');

  const navTabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'marketplace', label: 'Marketplace', icon: <MarketplaceIcon size={16} /> },
    { id: 'collabs', label: 'Collabs', icon: <CollabsIcon size={16} /> },
    { id: 'payments', label: 'Payments', icon: <PaymentsIcon size={16} /> },
    { id: 'social-media', label: 'Social Media', icon: <SocialsIcon size={16} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={16} /> },
  ];

  const renderThemeSocialIcon = (platform: string) => {
    switch (platform) {
      case 'INSTAGRAM':
        return (
          <span key={platform} title="Instagram" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </span>
        );
      case 'YOUTUBE':
        return (
          <span key={platform} title="YouTube" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
            </svg>
          </span>
        );
      case 'X':
        return (
          <span key={platform} title="X (Twitter)" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </span>
        );
      case 'PINTEREST':
        return (
          <span key={platform} title="Pinterest" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.14-.97.94-3.98.94-3.98s-.24-.48-.24-1.2c0-1.12.65-1.96 1.46-1.96.69 0 1.02.52 1.02 1.14 0 .7-.44 1.74-.67 2.7-.19.81.4 1.47 1.2 1.47 1.44 0 2.54-1.52 2.54-3.71 0-1.94-1.39-3.3-3.38-3.3-2.3 0-3.66 1.73-3.66 3.51 0 .7.27 1.44.6 1.84a.3.3 0 0 1 .07.29c-.08.32-.25 1.02-.28 1.16-.05.18-.15.22-.35.13-1.33-.62-2.16-2.56-2.16-4.12 0-3.36 2.44-6.44 7.04-6.44 3.7 0 6.57 2.63 6.57 6.15 0 3.67-2.31 6.63-5.52 6.63-1.08 0-2.09-.56-2.44-1.22l-.66 2.53c-.24.93-.89 2.09-1.33 2.79A12 12 0 1 0 12 0z"/>
            </svg>
          </span>
        );
      default:
        return null;
    }
  };

  const renderProfileRanksAndApplyWidget = () => {
    if (!selectedCampaign) return null;
    return (
      <>
        {/* Applicant Competition & Profile Standing Benchmark Graph */}
        <div className="cd-card">
          {/* Personalized User Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#0052FF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
              {displayName ? displayName.charAt(0).toUpperCase() : 'C'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  How Your Profile Ranks
                </h3>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <span>⭐</span> Top {Math.max(2, 100 - (selectedCampaign.eligibilityRate || 95))}%
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Comparing <strong>@{displayName}</strong> against {selectedCampaign.creatorsApplied} applicants
              </div>
            </div>
          </div>

          {/* Explicit Two-Side Legend (Flat / No Card) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', fontSize: '10.5px', fontWeight: 700, flexWrap: 'wrap', gap: '4px', padding: '0 2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748B' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#94A3B8' }}></div>
              <span>Other Applicants Avg</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#0052FF' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#0052FF' }}></div>
              <span>Your Profile (@{displayName})</span>
            </div>
          </div>

          {/* Hero Match Score Summary (Flat / No Card) */}
          <div style={{ marginBottom: '14px', padding: '0 2px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Your Profile Match Score
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#0052FF', marginTop: '2px', lineHeight: 1 }}>
                  {selectedCampaign.eligibilityRate || 98}%
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#059669' }}>
                  High Probability
                </span>
                <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', fontWeight: 600 }}>
                  Top {Math.max(2, 100 - (selectedCampaign.eligibilityRate || 95))}% tier
                </div>
              </div>
            </div>

            {/* Tiered Range Progress Bar */}
            <div style={{ position: 'relative', marginTop: '10px', marginBottom: '4px' }}>
              <div style={{ height: '7px', width: '100%', backgroundColor: '#E2E8F0', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '40%', height: '100%', backgroundColor: '#CBD5E1' }} title="Average Pool"></div>
                <div style={{ width: '35%', height: '100%', backgroundColor: '#93C5FD' }} title="Competitive Tier"></div>
                <div style={{ width: '25%', height: '100%', backgroundColor: '#0052FF' }} title="Your Tier (Top Match)"></div>
              </div>

              {/* Your Position Indicator Needle */}
              <div style={{ position: 'absolute', left: `${Math.min(96, selectedCampaign.eligibilityRate || 95)}%`, top: '-4px', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#0052FF', border: '2.5px solid #FFFFFF', boxShadow: '0 2px 6px rgba(0, 82, 255, 0.4)' }}></div>
              </div>

              {/* Tier Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748B', fontWeight: 700, marginTop: '6px' }}>
                <span>Avg: 45%</span>
                <span>75%</span>
                <span style={{ color: '#0052FF', fontWeight: 900 }}>You: {selectedCampaign.eligibilityRate || 98}%</span>
              </div>
            </div>
          </div>

          {/* 3 Circular Pie / Donut Charts in Grid (Flat / No Cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', marginBottom: '12px', padding: '4px 0' }}>
            {/* Chart 1: Engagement Rate */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '58px', height: '58px', marginBottom: '6px' }}>
                <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.42)}`} />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#0052FF" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.87)}`} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>8.7%</span>
                  <span style={{ fontSize: '7.5px', color: '#0052FF', fontWeight: 800 }}>YOU</span>
                </div>
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                Engagement
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                Avg: 4.2%
              </div>
              <div style={{ marginTop: '4px', fontSize: '9px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '1px 4px', borderRadius: '3px' }}>
                +107% vs Avg
              </div>
            </div>

            {/* Chart 2: Niche Relevance */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '58px', height: '58px', marginBottom: '6px' }}>
                <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.68)}`} />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.96)}`} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>96%</span>
                  <span style={{ fontSize: '7.5px', color: '#059669', fontWeight: 800 }}>YOU</span>
                </div>
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                Niche Match
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                Avg: 68%
              </div>
              <div style={{ marginTop: '4px', fontSize: '9px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '1px 4px', borderRadius: '3px' }}>
                Top Category
              </div>
            </div>

            {/* Chart 3: Audience Geography */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '58px', height: '58px', marginBottom: '6px' }}>
                <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.51)}`} />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#0052FF" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.84)}`} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>84%</span>
                  <span style={{ fontSize: '7.5px', color: '#0052FF', fontWeight: 800 }}>YOU</span>
                </div>
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                Audience Fit
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                Avg: 51%
              </div>
              <div style={{ marginTop: '4px', fontSize: '9px', fontWeight: 800, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '1px 4px', borderRadius: '3px' }}>
                Direct Fit
              </div>
            </div>
          </div>

          {/* Advantage Footnote */}
          <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#059669', fontWeight: 700 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Based on your connected stats, your bid has high client visibility</span>
          </div>
        </div>

        {/* Action Card (Apply to Project) */}
        <div className="cd-card">
          <button
            type="button"
            onClick={() => setShowApplyModal(true)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0052FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 82, 255, 0.25)',
              marginBottom: '10px',
            }}
          >
            Apply to this Project →
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#059669', fontWeight: 700, justifyContent: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span>100% Payment Protected</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'inherit', width: '100%', paddingBottom: '76px' }}>
      {/* Design System Global Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        * {
          box-sizing: border-box;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .upfluence-card {
          transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .upfluence-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        }
      `}} />

      {/* Top Header Navigation Bar */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
        }}
      >
        <div
          className="portal-header-wrapper"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          {/* Logo & Portal Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              href="/creator"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <img
                src="/logo-cropped.png"
                alt="The Influencer's Agency"
                style={{
                  height: '28px',
                  width: 'auto',
                  maxWidth: '140px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
              <span
                className="tia-desktop-only"
                style={{
                  fontSize: '10.5px',
                  fontWeight: 800,
                  color: '#0052FF',
                  backgroundColor: '#EFF6FF',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  letterSpacing: '0.04em',
                }}
              >
                PORTAL
              </span>
            </Link>
          </div>

          {/* User Profile, Realtime Notification Bell & Remaining Credits on Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {/* Remaining Credits Inline Indicator (Clean, Borderless, SVG Icon) */}
            <button
              type="button"
              onClick={() => handleTabChange('payments')}
              title="Click to view & top up Application Credits"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '0',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                color: '#0052FF',
                cursor: 'pointer',
                outline: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="#0052FF"
                stroke="#0052FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span style={{ whiteSpace: 'nowrap' }}>{applyCredits} {applyCredits === 1 ? 'Credit' : 'Credits'}</span>
            </button>

            {/* Realtime Notification Bell Center */}
            <div id="notification-bell-dropdown-container" style={{ position: 'relative', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setNotificationsDropdownOpen(!notificationsDropdownOpen)}
                title="Platform Notifications"
                aria-label="View notifications"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: notificationsDropdownOpen ? '#EFF6FF' : 'transparent',
                  color: unreadNotificationsCount > 0 || notificationsDropdownOpen ? '#0052FF' : '#475569',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!notificationsDropdownOpen) e.currentTarget.style.backgroundColor = '#F1F5F9';
                }}
                onMouseLeave={(e) => {
                  if (!notificationsDropdownOpen) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>

                {/* Unread Badge */}
                {unreadNotificationsCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '1px',
                      right: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '16px',
                      height: '16px',
                      padding: '0 3px',
                      fontSize: '9px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      backgroundColor: '#0052FF',
                      borderRadius: '10px',
                      border: '2px solid #FFFFFF',
                      boxShadow: '0 2px 6px rgba(0, 82, 255, 0.4)',
                    }}
                  >
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Realtime Notification Popover Dropdown Panel */}
              {notificationsDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: '-40px',
                    width: '380px',
                    maxWidth: 'calc(100vw - 24px)',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(0, 0, 0, 0.06)',
                    border: '1px solid #E2E8F0',
                    zIndex: 1000,
                    overflow: 'hidden',
                  }}
                >
                  {/* Top Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderBottom: '1px solid #F1F5F9',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Notifications</span>
                      {unreadNotificationsCount > 0 ? (
                        <span
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 700,
                            color: '#0052FF',
                            backgroundColor: '#EFF6FF',
                            padding: '2px 7px',
                            borderRadius: '10px',
                          }}
                        >
                          {unreadNotificationsCount} new
                        </span>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>All caught up</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {unreadNotificationsCount > 0 && (
                        <button
                          type="button"
                          onClick={markAllNotificationsAsRead}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#0052FF',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: '2px 4px',
                          }}
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setNotificationsDropdownOpen(false)}
                        style={{
                          background: '#F1F5F9',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#64748B',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Category Tabs */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '4px',
                      padding: '8px 12px',
                      borderBottom: '1px solid #F1F5F9',
                      backgroundColor: '#F8FAFC',
                      overflowX: 'auto',
                    }}
                  >
                    {[
                      { id: 'ALL', label: 'All' },
                      { id: 'UNREAD', label: `Unread (${unreadNotificationsCount})` },
                      { id: 'COLLABS', label: 'Collabs' },
                      { id: 'PAYMENTS', label: 'Payments' },
                      { id: 'SYSTEM', label: 'System' },
                    ].map((tab) => {
                      const isSelected = notificationFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setNotificationFilter(tab.id as any)}
                          style={{
                            padding: '4px 10px',
                            fontSize: '11px',
                            fontWeight: isSelected ? 700 : 500,
                            color: isSelected ? '#0052FF' : '#64748B',
                            backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                            border: isSelected ? '1px solid #CBD5E1' : '1px solid transparent',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            boxShadow: isSelected ? '0 1px 2px rgba(0, 0, 0, 0.04)' : 'none',
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Notification Items List */}
                  <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
                    {notifications
                      .filter((n) => {
                        if (notificationFilter === 'UNREAD') return !n.read;
                        if (notificationFilter === 'COLLABS') return n.category === 'COLLABS';
                        if (notificationFilter === 'PAYMENTS') return n.category === 'PAYMENTS';
                        if (notificationFilter === 'SYSTEM') return n.category === 'SYSTEM';
                        return true;
                      })
                      .map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleNotificationClick(notif)}
                          style={{
                            display: 'flex',
                            gap: '12px',
                            padding: '12px 16px',
                            borderBottom: '1px solid #F1F5F9',
                            backgroundColor: notif.read ? '#FFFFFF' : '#F8FAFF',
                            cursor: 'pointer',
                            transition: 'background-color 0.12s ease',
                            position: 'relative',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = notif.read ? '#F8FAFC' : '#EFF6FF';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = notif.read ? '#FFFFFF' : '#F8FAFF';
                          }}
                        >
                          {/* Contextual Icon Avatar */}
                          <div
                            style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '10px',
                              backgroundColor:
                                notif.type === 'ESCROW' || notif.type === 'APPROVAL'
                                  ? '#ECFDF5'
                                  : notif.type === 'MATCH'
                                  ? '#EFF6FF'
                                  : notif.type === 'MESSAGE'
                                  ? '#F5F3FF'
                                  : notif.type === 'PAYMENT'
                                  ? '#F0FDF4'
                                  : '#FEF3C7',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              fontSize: '15px',
                            }}
                          >
                            {notif.type === 'ESCROW' && '🛡️'}
                            {notif.type === 'MATCH' && '⭐'}
                            {notif.type === 'MESSAGE' && '💬'}
                            {notif.type === 'APPROVAL' && '✓'}
                            {notif.type === 'PAYMENT' && '💰'}
                            {notif.type === 'CREDIT' && '⚡'}
                            {notif.type === 'PROPOSAL' && '📝'}
                            {notif.type === 'SYSTEM' && '✨'}
                          </div>

                          {/* Text & Meta */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '2px' }}>
                              <span
                                style={{
                                  fontSize: '12px',
                                  fontWeight: notif.read ? 600 : 700,
                                  color: notif.read ? '#334155' : '#0F172A',
                                  lineHeight: 1.3,
                                }}
                              >
                                {notif.title}
                              </span>
                              {!notif.read && (
                                <span
                                  style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    backgroundColor: '#0052FF',
                                    flexShrink: 0,
                                  }}
                                />
                              )}
                            </div>

                            <p
                              style={{
                                fontSize: '11.5px',
                                color: '#64748B',
                                margin: '0 0 6px 0',
                                lineHeight: 1.4,
                              }}
                            >
                              {notif.message}
                            </p>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                {notif.badgeText && (
                                  <span
                                    style={{
                                      fontSize: '9.5px',
                                      fontWeight: 700,
                                      padding: '1px 5px',
                                      borderRadius: '4px',
                                      backgroundColor: notif.badgeBg || '#F1F5F9',
                                      color: notif.badgeColor || '#475569',
                                    }}
                                  >
                                    {notif.badgeText}
                                  </span>
                                )}
                                <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>{notif.timeAgo}</span>
                              </div>

                              {notif.actionLabel && (
                                <span
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    color: '#0052FF',
                                  }}
                                >
                                  {notif.actionLabel}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Dismiss X button */}
                          <button
                            type="button"
                            onClick={(e) => deleteNotification(notif.id, e)}
                            title="Dismiss"
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              background: 'none',
                              border: 'none',
                              color: '#CBD5E1',
                              fontSize: '11px',
                              cursor: 'pointer',
                              padding: '2px',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                    {notifications.filter((n) => {
                      if (notificationFilter === 'UNREAD') return !n.read;
                      if (notificationFilter === 'COLLABS') return n.category === 'COLLABS';
                      if (notificationFilter === 'PAYMENTS') return n.category === 'PAYMENTS';
                      if (notificationFilter === 'SYSTEM') return n.category === 'SYSTEM';
                      return true;
                    }).length === 0 && (
                      <div style={{ padding: '32px 16px', textAlign: 'center', color: '#94A3B8' }}>
                        <div style={{ fontSize: '24px', marginBottom: '6px' }}>🔔</div>
                        <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>No notifications in this tab</div>
                        <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '2px' }}>You will receive real-time alerts when brands take action</div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      backgroundColor: '#F8FAFC',
                      borderTop: '1px solid #F1F5F9',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#059669', fontWeight: 600 }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block', boxShadow: '0 0 6px rgba(16, 185, 129, 0.6)' }} />
                      <span>Realtime Activity Stream</span>
                    </div>

                    {notifications.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setNotifications([])}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#EF4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div id="user-profile-dropdown-container" style={{ position: 'relative', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: profileDropdownOpen ? '#F1F5F9' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '4px 6px',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background-color 0.15s ease',
                }}
              >
                {/* Clean user profile icon (No card box) */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>

                <span style={{ fontSize: '12px', color: '#1E293B', fontWeight: 600, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser?.email ? currentUser.email.split('@')[0] : 'creator'}
                </span>
                
                <BlueCheckBadge size={13} title="Verified Creator" />

                {/* Subtle Caret */}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: profileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.15s ease',
                    flexShrink: 0,
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Floating Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    width: '210px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #E2E8F0',
                    padding: '6px',
                    zIndex: 1000,
                  }}
                >
                  {/* User info Header */}
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid #F1F5F9', marginBottom: '4px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      @{currentUser?.email ? currentUser.email.split('@')[0] : 'creator'}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                      {currentUser?.email || 'creator@tia.agency'}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '5px', backgroundColor: '#EFF6FF', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, color: '#0052FF' }}>
                      <span>✓</span> Verified Creator
                    </div>
                  </div>

                  {/* Settings / Account Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleTabChange('settings');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: '#334155',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <SettingsIcon size={14} color="#64748B" />
                    <span>Account Settings</span>
                  </button>

                  <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '4px 0' }}></div>

                  {/* Logout Option */}
                  <button
                    type="button"
                    onClick={async () => {
                      setProfileDropdownOpen(false);
                      await fetch('/api/auth/logout', { method: 'POST' });
                      router.push('/login');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: '#DC2626',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="portal-main-wrapper" style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 20px' }}>
        {/* Nav Tabs (Responsive & Scrollable) */}
        <div className={`portal-nav-segmented-container creator-nav-tabs-wrapper ${mobileChatViewActive && activeTab === 'collabs' ? 'hide-on-mobile-chat' : ''}`} style={{ marginBottom: '16px', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <nav
            className="portal-nav-segmented no-scrollbar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '22px',
              background: 'transparent',
              padding: 0,
              border: 'none',
              borderBottom: '1px solid #E2E8F0',
              width: '100%',
              minWidth: 'max-content',
            }}
          >
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`portal-tab-pill ${isActive ? 'active' : ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 4px 14px 4px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 700 : 500,
                    borderRadius: 0,
                    border: 'none',
                    borderBottom: isActive ? '2px solid #0052FF' : '2px solid transparent',
                    marginBottom: '-1px',
                    cursor: 'pointer',
                    color: isActive ? '#0052FF' : '#64748B',
                    background: 'transparent',
                  }}
                >
                  <span style={{ color: isActive ? '#0052FF' : '#94A3B8' }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.id === 'collabs' && collabs.length > 0 && (
                    <span
                      style={{
                        backgroundColor: isActive ? '#EFF6FF' : '#E2E8F0',
                        color: isActive ? '#0052FF' : '#64748B',
                        fontSize: '10px',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: '10px',
                      }}
                    >
                      {collabs.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

          {/* ==================================================================== */}
        {/* TAB 1: MARKETPLACE                                                   */}
        {/* ==================================================================== */}
        {activeTab === 'marketplace' && selectedCampaign ? (
          /* ================================================================ */
          /* FULL-PAGE ZOOM-IN PROJECT DETAIL VIEW (FREELANCER.COM STYLE)     */
          /* ================================================================ */
          <div style={{ animation: 'fadeIn 0.2s ease-in-out' }}>
            {/* Top Navigation & Breadcrumbs Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setSelectedCampaign(null)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '7px 14px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#0F172A',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <span>Back to Marketplace</span>
                </button>

                <div className="tia-desktop-only" style={{ fontSize: '11.5px', fontWeight: 600, color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>FREELANCER</span>
                  <span>›</span>
                  <span>CAMPAIGNS</span>
                  <span>›</span>
                  <span style={{ color: '#64748B' }}>{selectedCampaign.categories?.[0] || 'LIFESTYLE'}</span>
                  <span>›</span>
                  <span style={{ color: '#0F172A', fontWeight: 700 }}>{selectedCampaign.title}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B' }}>
                  Project ID: <strong style={{ color: '#0F172A' }}>#TIA-{selectedCampaign.id?.replace('camp-', '406740') || '40674076'}</strong>
                </span>
              </div>
            </div>

            {/* Main 2-Column Freelancer Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', alignItems: 'start' }}>
              {/* LEFT MAIN CONTENT COLUMN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 1. Project Hero Header Card */}
                <div className="cd-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                    <div style={{ flex: '1 1 300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#059669' }}></span>
                          Open for Applications
                        </span>
                        <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>Posted {selectedCampaign.postedAt} • Ends in 18 days</span>
                        </span>
                      </div>
                      <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                        {selectedCampaign.title}
                      </h1>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', color: '#059669', fontWeight: 800, backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1px 6px', borderRadius: '4px' }}>
                          ✓ Verified Client
                        </span>
                        <span>•</span>
                        <span>{selectedCampaign.countryFlag} {selectedCampaign.country}</span>
                        <span>•</span>
                        <span>{selectedCampaign.language}</span>
                      </div>
                    </div>

                    {/* Big Payout & Deliverables Box */}
                    <div className="cd-payout-box">
                      <div style={{ fontSize: '26px', fontWeight: 900, color: '#0052FF', lineHeight: 1, letterSpacing: '-0.02em' }}>
                        {selectedCampaign.payoutAmount}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, marginTop: '4px' }}>
                        {selectedCampaign.payType || 'Fixed Pay'} (100% Protected)
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#0F172A', fontWeight: 700, marginTop: '3px' }}>
                        {selectedCampaign.deliverablesSummary}
                      </div>
                    </div>
                  </div>

                  {/* Quick Project Intelligence Bar */}
                  <div className="cd-intel-grid">
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Your Success Rate</div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0284C7', marginTop: '2px' }}>{selectedCampaign.eligibilityRate}%</div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Active Applicants</div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>{selectedCampaign.creatorsApplied} Creators</div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Project Timeline</div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedCampaign.projectTimeline || 'Sep 5 – Sep 20'}</div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Payment Security</div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#059669', marginTop: '3px' }}>100% Protected</div>
                    </div>
                  </div>
                </div>

                {/* Mobile-Only: Section 2 - How Your Profile Ranks & Apply Action */}
                <div className="tia-mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {renderProfileRanksAndApplyWidget()}
                </div>

                {/* 2. Detailed Campaign Narrative & Scope of Work */}
                <div className="cd-card">
                  <h2 style={{ fontSize: '16.5px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0' }}>
                    Campaign Overview & Creative Brief
                  </h2>
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: '0 0 14px 0' }}>
                    {selectedCampaign.description} We are seeking dynamic, authentic digital creators who have demonstrated high viewer engagement and aesthetic video production in {selectedCampaign.categories?.join(', ')}. The primary objective of this project is to craft captivating, native-feel content that drives high conversion, genuine community discussions, and click-throughs to the campaign tracking link.
                  </p>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Selected Scope of Work
                  </h3>
                  <ul style={{ paddingLeft: '18px', margin: '0 0 16px 0', fontSize: '12.5px', color: '#334155', lineHeight: 1.65 }}>
                    {selectedCampaign.scopeOfWork && selectedCampaign.scopeOfWork.length > 0 ? (
                      selectedCampaign.scopeOfWork.map((scope: any, idx: number) => (
                        <li key={idx}><strong>{scope.title}:</strong> {scope.detail}</li>
                      ))
                    ) : (
                      <>
                        <li><strong>High-Resolution Deliverable:</strong> Produce high-quality content optimized for {selectedCampaign.socials?.join(', ') || 'social platforms'}.</li>
                        <li><strong>Integrated Storytelling:</strong> Seamlessly integrate project themes with authentic voiceover and hook in the first 3 seconds.</li>
                        <li><strong>Tracking & Attribution:</strong> Include dedicated UTM campaign link and pinned comment during the active campaign window.</li>
                        <li><strong>Compliance & Creative Quality:</strong> Deliver raw exports without third-party watermarks or copyrighted audio tracks.</li>
                      </>
                    )}
                  </ul>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Content Directions & Aesthetic Guidelines
                  </h3>
                  <div className="cd-directions-grid">
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" y1="9" x2="9.01" y2="9" />
                          <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                        <span>Tone of Voice & Mood</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.tone || 'Authentic, vibrant, conversational, and energetic. Avoid overly rehearsed corporate sales scripts.'}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="23 7 16 12 23 17 23 7" />
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                        <span>Video & Lighting Setup</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.videoSetup || 'Natural daylight or soft studio lighting. Sharp macro focus when showcasing details.'}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                          <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                        <span>Hashtags & Mentions</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.hashtags || `Include #CreatorCollab and #${selectedCampaign.categories?.[0]?.replace(/\s+/g, '') || 'Lifestyle'}2026 in caption.`}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" y1="19" x2="12" y2="23" />
                          <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                        <span>Audio & Voiceover</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.audio || 'Crystal-clear vocal recording with background ambient music mixed at -18dB. Subtitles mandatory.'}
                      </div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Client Expectations & Milestone Schedule
                  </h3>
                  <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', padding: '12px 14px', marginBottom: '16px', fontSize: '12px', color: '#1E3A8A', lineHeight: 1.55 }}>
                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>Milestone Review Process:</div>
                    {selectedCampaign.milestones && selectedCampaign.milestones.length > 0 ? (
                      selectedCampaign.milestones.map((m: string, idx: number) => (
                        <div key={idx}>{m}</div>
                      ))
                    ) : (
                      <>
                        <div>1. <strong>Concept & Rough Cut:</strong> Due within 5 days of confirmation.</div>
                        <div>2. <strong>Client Review Window:</strong> Approval or revisions within 48 hours.</div>
                        <div>3. <strong>Final Publication:</strong> Post live on feed during peak hours ({selectedCampaign.projectTimeline}).</div>
                        <div>4. <strong>Analytics Verification:</strong> Submit reach insights after 7 days.</div>
                      </>
                    )}
                  </div>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Campaign Terms & Payment Protection
                  </h3>
                  <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '12px 14px', fontSize: '12px', color: '#334155', lineHeight: 1.55 }}>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                      <li><strong>100% Payment Protection:</strong> Full {selectedCampaign.payoutAmount} secured through TIA verified settlement.</li>
                      <li><strong>Usage Rights:</strong> 90 days organic digital promotional distribution rights.</li>
                      <li><strong>Exclusivity:</strong> 30-day category exclusivity against direct competitors.</li>
                      <li><strong>Automated Disbursement:</strong> Funds released to your wallet upon automated URL verification.</li>
                    </ul>
                  </div>

                  {/* Skills / Niches Pill Chips */}
                  <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B' }}>Skills / Niches:</span>
                    {selectedCampaign.categories?.map((cat: string) => (
                      <span key={cat} style={{ fontSize: '11px', fontWeight: 600, color: '#0052FF', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '2px 8px', borderRadius: '14px' }}>
                        {cat}
                      </span>
                    ))}
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '14px' }}>Instagram Reels</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '14px' }}>4K Video Editing</span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDEBAR COLUMN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 1. About the Client Card */}
                <div className="cd-card">
                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
                    About the Client
                  </h3>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 800, fontSize: '13.5px', color: '#0F172A' }}>
                        Verified Enterprise Client
                      </span>
                      <span style={{ fontSize: '10.5px', color: '#059669', fontWeight: 800, backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1px 5px', borderRadius: '4px' }}>
                        ✓ Verified
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                      {selectedCampaign.countryFlag} {selectedCampaign.country}
                    </div>
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#D97706', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#F59E0B' }}>★</span>
                    <span style={{ color: '#0F172A' }}>5.0</span>
                    <span style={{ color: '#64748B', fontWeight: 500 }}>(42 reviews)</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11.5px', color: '#475569', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontWeight: 600 }}>
                      <span>✓</span> <span>Payment method verified</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontWeight: 600 }}>
                      <span>✓</span> <span>Milestone deposit authorized</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Member since Mar 26, 2021</span>
                    </div>
                  </div>
                </div>

                {/* 2. Client Verification Checklist (Clean Green Outline SVG Vector Icons - Vertical Layout) */}
                <div className="cd-card">
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
                    Client Verification
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Payment */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Payment Verified</span>
                    </div>

                    {/* Email */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Email Address Verified</span>
                    </div>

                    {/* Identity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Identity Verified</span>
                    </div>

                    {/* Phone */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Phone Number Verified</span>
                    </div>

                    {/* Deposit */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Deposit Verified</span>
                    </div>
                  </div>
                </div>

                {/* Desktop-Only: How Your Profile Ranks & Apply Action */}
                <div className="tia-desktop-only" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {renderProfileRanksAndApplyWidget()}
                </div>

                {/* 5. Other Campaigns from this Client */}
                <div className="cd-card">
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0' }}>
                    Other jobs from this client
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(selectedCampaign.otherJobs || [
                      { title: 'Summer Lifestyle Reel Launch', payout: '$850 Fixed Pay' },
                      { title: 'YouTube Product Integration', payout: '$1,400 Fixed Pay' },
                      { title: '24-Hour Story Takeover & Review', payout: '$450 Fixed Pay' }
                    ]).map((job: any, idx: number, arr: any[]) => (
                      <div key={idx} style={{ borderBottom: idx < arr.length - 1 ? '1px solid #F1F5F9' : 'none', paddingBottom: idx < arr.length - 1 ? '6px' : '0' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{job.title}</div>
                        <div style={{ fontSize: '11px', color: '#0052FF', fontWeight: 700, marginTop: '2px' }}>{job.payout}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'marketplace' ? (
          <div>
            {/* High-End Match Booster Banner (Only shown if no social account is connected, and dismissible with ✕) */}
            {showMatchBanner && !socialAccounts.some((a) => a.connected) && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #EFF6FF 100%)',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '20px 48px 20px 24px',
                  marginBottom: '20px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '18px',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 380px' }}>
                  {/* Overlapping Social Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', zIndex: 2 }}>
                      <InstagramIcon size={18} />
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', marginLeft: '-10px', zIndex: 1 }}>
                      <YouTubeIcon size={18} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px', letterSpacing: '0.03em' }}>
                        AUDIENCE INTELLIGENCE
                      </span>
                    </div>
                    <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 3px 0', lineHeight: 1.35 }}>
                      We&apos;re actively searching for your perfect campaign!
                    </h2>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                      The more socials you link, the better the chances of finding the right fit for your audience and style.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleTabChange('social-media')}
                  style={{
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '11px 22px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0, 82, 255, 0.25)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>Connect Socials</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                {/* Dismiss Button ✕ */}
                <button
                  type="button"
                  onClick={() => setShowMatchBanner(false)}
                  title="Hide banner"
                  aria-label="Hide banner"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F1F5F9';
                    e.currentTarget.style.color = '#0F172A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#94A3B8';
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}

            {/* Embedded CSS for seamless desktop/mobile filter responsiveness */}
            <style>{`
              @media (max-width: 768px) {
                .tia-filter-desktop-group {
                  display: none !important;
                }
                .tia-filter-desktop-chips {
                  display: none !important;
                }
                .tia-filter-btn-mobile {
                  display: inline-flex !important;
                }
              }
              @media (min-width: 769px) {
                .tia-filter-desktop-group {
                  display: flex !important;
                }
                .tia-filter-desktop-chips {
                  display: flex !important;
                }
                .tia-filter-btn-mobile {
                  display: none !important;
                }
                .tia-filter-mobile-panel {
                  display: none !important;
                }
              }
            `}</style>

            {/* Search, Filter & Sort Toolbar (Clean, Responsive) */}
            <div
              style={{
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {/* Row 1: Search Input + Mobile Filter Button + Desktop Select Dropdowns */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                }}
              >
                {/* Search Input */}
                <div
                  style={{
                    position: 'relative',
                    flex: '1',
                    minWidth: '0',
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                    }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search campaigns..."
                    style={{
                      width: '100%',
                      padding: '9px 30px 9px 34px',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#0F172A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      outline: 'none',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                      transition: 'all 0.15s ease',
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '12px',
                        padding: '2px',
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Mobile Filter Toggle Button (Compact Icon Button) */}
                <button
                  type="button"
                  aria-label="Filter campaigns"
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="tia-filter-btn-mobile"
                  style={{
                    position: 'relative',
                    width: '38px',
                    height: '38px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: activeFiltersCount > 0 || mobileFilterOpen ? '#0052FF' : '#475569',
                    backgroundColor: activeFiltersCount > 0 || mobileFilterOpen ? '#EFF6FF' : '#FFFFFF',
                    border: activeFiltersCount > 0 || mobileFilterOpen ? '1px solid #0052FF' : '1px solid #CBD5E1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.15s ease',
                    flexShrink: 0,
                  }}
                >
                  <SlidersIcon size={16} color={activeFiltersCount > 0 || mobileFilterOpen ? '#0052FF' : '#475569'} />
                  {activeFiltersCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '16px',
                        height: '16px',
                        padding: '0 3px',
                        fontSize: '9.5px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        backgroundColor: '#0052FF',
                        borderRadius: '10px',
                        border: '2px solid #FFFFFF',
                      }}
                    >
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Desktop-Only Filter Group */}
                <div
                  className="tia-filter-desktop-group"
                  style={{
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Custom Country Filter Dropdown with Real Flag SVGs */}
                  <div id="country-filter-dropdown-container" style={{ position: 'relative' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setCountryDropdownOpen(!countryDropdownOpen);
                        setCountrySearchQuery('');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: selectedCountry === 'ALL' ? '4px' : '8px',
                        padding: '8px 12px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: selectedCountry !== 'ALL' ? '#0052FF' : '#334155',
                        backgroundColor: selectedCountry !== 'ALL' ? '#EFF6FF' : '#FFFFFF',
                        border: countryDropdownOpen || selectedCountry !== 'ALL' ? '1px solid #0052FF' : '1px solid #CBD5E1',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        outline: 'none',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                        transition: 'all 0.15s ease',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {selectedCountry !== 'ALL' && <CountryFlag code={selectedCountry} size={17} />}
                      <span>
                        {filterCountries.find((c) => c.code === selectedCountry)?.label || 'All Countries'}
                      </span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={selectedCountry !== 'ALL' ? '#0052FF' : '#94A3B8'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: countryDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.15s ease',
                          marginLeft: '2px',
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {countryDropdownOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 4px)',
                          left: 0,
                          width: '230px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '10px',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
                          border: '1px solid #E2E8F0',
                          padding: '6px',
                          zIndex: 100,
                        }}
                      >
                        {/* Search box inside dropdown */}
                        <div style={{ padding: '2px 4px 6px 4px', borderBottom: '1px solid #F1F5F9', marginBottom: '4px' }}>
                          <input
                            type="text"
                            value={countrySearchQuery}
                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                            placeholder="Search country..."
                            autoFocus
                            style={{
                              width: '100%',
                              padding: '6px 8px',
                              fontSize: '12px',
                              color: '#0F172A',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              outline: 'none',
                            }}
                          />
                        </div>

                        <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                          {filterCountries
                            .filter((c) =>
                              c.label.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
                              c.code.toLowerCase().includes(countrySearchQuery.toLowerCase())
                            )
                            .map((c) => {
                              const isSelected = selectedCountry === c.code;
                              return (
                                <button
                                  key={c.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(c.code);
                                    setCountryDropdownOpen(false);
                                    setCountrySearchQuery('');
                                  }}
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '8px',
                                    padding: '7px 8px',
                                    fontSize: '12px',
                                    fontWeight: isSelected ? 700 : 500,
                                    color: isSelected ? '#0052FF' : '#334155',
                                    backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'background-color 0.1s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: c.code === 'ALL' ? '0px' : '8px' }}>
                                    {c.code !== 'ALL' && <CountryFlag code={c.code} size={17} />}
                                    <span>{c.label}</span>
                                  </div>
                                  {isSelected && (
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Commercial Type Filter */}
                  <select
                    value={selectedCommercialType}
                    onChange={(e) => setSelectedCommercialType(e.target.value)}
                    style={{
                      padding: '9px 12px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: selectedCommercialType !== 'ALL' ? '#0052FF' : '#334155',
                      backgroundColor: selectedCommercialType !== 'ALL' ? '#EFF6FF' : '#FFFFFF',
                      border: selectedCommercialType !== 'ALL' ? '1px solid #0052FF' : '1px solid #CBD5E1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      outline: 'none',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <option value="ALL">All Deal Types</option>
                    <option value="FLAT_FEE">Guaranteed Fixed Pay</option>
                    <option value="COMMISSION">Commission % + Bonus</option>
                  </select>

                  {/* Sort By Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    style={{
                      padding: '9px 12px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: '#334155',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      outline: 'none',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <option value="success_rate">Sort: Highest Match</option>
                    <option value="payout_high">Sort: Highest Payout (₹ / $)</option>
                    <option value="applicants">Sort: Most Popular</option>
                    <option value="newest">Sort: Recently Posted</option>
                  </select>

                  {/* Advanced Filters Drawer Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setAdvancedFilterExpanded(!advancedFilterExpanded)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 13px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      color: advancedFilterExpanded || activeAdvancedCount > 0 ? '#0052FF' : '#475569',
                      backgroundColor: advancedFilterExpanded || activeAdvancedCount > 0 ? '#EFF6FF' : '#FFFFFF',
                      border: advancedFilterExpanded || activeAdvancedCount > 0 ? '1px solid #0052FF' : '1px solid #CBD5E1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      outline: 'none',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <SlidersIcon size={14} color={advancedFilterExpanded || activeAdvancedCount > 0 ? '#0052FF' : '#475569'} />
                    <span>Filters</span>
                    {activeAdvancedCount > 0 && (
                      <span
                        style={{
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '1px 6px',
                          borderRadius: '10px',
                          marginLeft: '2px',
                        }}
                      >
                        {activeAdvancedCount}
                      </span>
                    )}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={advancedFilterExpanded || activeAdvancedCount > 0 ? '#0052FF' : '#94A3B8'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: advancedFilterExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Row 2: Category Quick Chips Carousel (Desktop & Mobile) */}
              <div
                className="tia-filter-desktop-chips"
                style={{
                  alignItems: 'center',
                  gap: '6px',
                  overflowX: 'auto',
                  paddingBottom: '4px',
                  scrollbarWidth: 'none',
                }}
              >
                {filterCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const matchingCount =
                    cat.id === 'ALL'
                      ? campaigns.length
                      : campaigns.filter((c) =>
                          c.categories.some((k) => k.toLowerCase().includes(cat.id.toLowerCase()))
                        ).length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 13px',
                        fontSize: '12px',
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? '#0052FF' : '#475569',
                        backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                        border: isSelected ? '1px solid #0052FF' : '1px solid #E2E8F0',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        boxShadow: isSelected ? '0 2px 6px rgba(0, 82, 255, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.02)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{cat.label}</span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? '#DBEAFE' : '#F1F5F9',
                          color: isSelected ? '#0052FF' : '#94A3B8',
                        }}
                      >
                        {matchingCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Row 3: Advanced Filter Expandable Panel */}
              {advancedFilterExpanded && (
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '16px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    marginTop: '2px',
                    animation: 'fadeIn 0.2s ease',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    {/* Platform Selector */}
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        Social Platform
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {filterPlatforms.map((p) => {
                          const isSelected = selectedPlatform === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setSelectedPlatform(p.id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '6px 11px',
                                fontSize: '11.5px',
                                fontWeight: isSelected ? 700 : 500,
                                color: isSelected ? '#0052FF' : '#334155',
                                backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                                border: isSelected ? '1px solid #0052FF' : '1px solid #CBD5E1',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.12s ease',
                              }}
                            >
                              <span>{p.icon}</span>
                              <span>{p.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Payout Range Selector */}
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        Payout / Budget Tier
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {filterBudgetTiers.map((b) => {
                          const isSelected = selectedBudgetTier === b.id;
                          return (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => setSelectedBudgetTier(b.id)}
                              style={{
                                padding: '6px 11px',
                                fontSize: '11.5px',
                                fontWeight: isSelected ? 700 : 500,
                                color: isSelected ? '#0052FF' : '#334155',
                                backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                                border: isSelected ? '1px solid #0052FF' : '1px solid #CBD5E1',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.12s ease',
                              }}
                            >
                              {b.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Opportunity / Match Level */}
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        Opportunity & Match Level
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {filterMatchTiers.map((m) => {
                          const isSelected = selectedSuccessFilter === m.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setSelectedSuccessFilter(m.id)}
                              style={{
                                padding: '6px 11px',
                                fontSize: '11.5px',
                                fontWeight: isSelected ? 700 : 500,
                                color: isSelected ? '#0052FF' : '#334155',
                                backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                                border: isSelected ? '1px solid #0052FF' : '1px solid #CBD5E1',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.12s ease',
                              }}
                            >
                              {m.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Panel Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                      Showing <strong>{filteredCampaigns.length}</strong> of {campaigns.length} campaigns
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '4px 8px',
                          }}
                        >
                          Clear all filters
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setAdvancedFilterExpanded(false)}
                        style={{
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Row 4: Active Filter Chips Bar (When filters are applied) */}
              {hasActiveFilters && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    paddingTop: '2px',
                  }}
                >
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B' }}>
                    Active filters:
                  </span>

                  {searchQuery.trim() && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#F1F5F9',
                        color: '#0F172A',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Search: &ldquo;{searchQuery}&rdquo;
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedCategory !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Niche: {filterCategories.find((c) => c.id === selectedCategory)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedCountry !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Country: {filterCountries.find((c) => c.code === selectedCountry)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedCountry('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedCommercialType !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Deal: {selectedCommercialType === 'FLAT_FEE' ? 'Guaranteed Fixed' : 'Commission %'}
                      <button
                        type="button"
                        onClick={() => setSelectedCommercialType('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedPlatform !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Platform: {filterPlatforms.find((p) => p.id === selectedPlatform)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedPlatform('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedBudgetTier !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Budget: {filterBudgetTiers.find((b) => b.id === selectedBudgetTier)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedBudgetTier('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedSuccessFilter !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Level: {filterMatchTiers.find((m) => m.id === selectedSuccessFilter)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedSuccessFilter('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={resetFilters}
                    style={{
                      padding: '3px 9px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#EF4444',
                      backgroundColor: '#FEF2F2',
                      border: '1px solid #FECACA',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginLeft: 'auto',
                    }}
                  >
                    Reset all filters ({activeFiltersCount})
                  </button>
                </div>
              )}

              {/* Mobile Filter Collapsible Panel (Rendered only on Mobile when toggled) */}
              {mobileFilterOpen && (
                <div
                  className="tia-filter-mobile-panel"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '12px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <SlidersIcon size={14} color="#0052FF" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Advanced Filters</span>
                      {activeFiltersCount > 0 && (
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 7px', borderRadius: '10px' }}>
                          {activeFiltersCount} active
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '2px',
                          }}
                        >
                          Reset all
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setMobileFilterOpen(false)}
                        style={{
                          background: '#F1F5F9',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#64748B',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Dropdowns Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {/* Deal Type */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                        Deal Type
                      </label>
                      <select
                        value={selectedCommercialType}
                        onChange={(e) => setSelectedCommercialType(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#334155',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          borderRadius: '8px',
                          outline: 'none',
                        }}
                      >
                        <option value="ALL">All Deals</option>
                        <option value="FLAT_FEE">Fixed Pay</option>
                        <option value="COMMISSION">Commission %</option>
                      </select>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e: any) => setSortBy(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#334155',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          borderRadius: '8px',
                          outline: 'none',
                        }}
                      >
                        <option value="success_rate">Highest Match</option>
                        <option value="payout_high">Highest Payout</option>
                        <option value="applicants">Most Popular</option>
                        <option value="newest">Newest</option>
                      </select>
                    </div>
                  </div>

                  {/* Social Platform Filter */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                      Social Platform
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {filterPlatforms.map((p) => {
                        const isSelected = selectedPlatform === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setSelectedPlatform(p.id)}
                            style={{
                              padding: '5px 9px',
                              fontSize: '11px',
                              fontWeight: isSelected ? 700 : 500,
                              color: isSelected ? '#0052FF' : '#334155',
                              backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                              border: isSelected ? '1px solid #0052FF' : '1px solid #CBD5E1',
                              borderRadius: '6px',
                              cursor: 'pointer',
                            }}
                          >
                            {p.icon} {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payout Range Filter */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                      Budget / Payout
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {filterBudgetTiers.map((b) => {
                        const isSelected = selectedBudgetTier === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelectedBudgetTier(b.id)}
                            style={{
                              padding: '5px 9px',
                              fontSize: '11px',
                              fontWeight: isSelected ? 700 : 500,
                              color: isSelected ? '#0052FF' : '#334155',
                              backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                              border: isSelected ? '1px solid #0052FF' : '1px solid #CBD5E1',
                              borderRadius: '6px',
                              cursor: 'pointer',
                            }}
                          >
                            {b.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Country Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                      Country ({filterCountries.length} Countries)
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#334155',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        outline: 'none',
                      }}
                    >
                      {filterCountries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Categories / Niches */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
                      Niche / Category
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {filterCategories.map((cat) => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                              padding: '5px 11px',
                              fontSize: '11px',
                              fontWeight: isSelected ? 700 : 500,
                              color: isSelected ? '#0052FF' : '#64748B',
                              backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                              border: isSelected ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                              borderRadius: '16px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: '4px',
                    }}
                  >
                    View Results ({filteredCampaigns.length})
                  </button>
                </div>
              )}
            </div>

            {/* Dynamic Time-Aware Personalized Greeting Header */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
                {dynamicGreeting.title}
              </h3>
              <p style={{ fontSize: '14.5px', color: '#64748B', margin: 0, fontWeight: 500, lineHeight: 1.45 }}>
                {dynamicGreeting.subtitle}
              </p>
            </div>

            {/* Exact Reference-Matched Clean Cards Grid */}
            {filteredCampaigns.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px dashed #CBD5E1',
                  borderRadius: '16px',
                  padding: '48px 24px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
                  No campaigns match your filters
                </h4>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0' }}>
                  Try changing your search terms, selecting a different niche, or clearing your active filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 18px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                  gap: '20px',
                }}
              >
                {filteredCampaigns.map((camp, cIndex) => (
                  <div
                    key={camp.id}
                    className="upfluence-card"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: cIndex === 0 ? '1.5px solid #0052FF' : '1px solid #E2E8F0',
                      borderRadius: '16px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: cIndex === 0 ? '0 4px 16px rgba(0, 82, 255, 0.10)' : '0 2px 8px rgba(0, 0, 0, 0.03)',
                      cursor: 'default',
                    }}
                  >
                    {/* Top Cover Banner */}
                    <div
                      style={{
                        height: '140px',
                        position: 'relative',
                        backgroundColor: '#CBD5E1',
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                      }}
                    >
                      {/* Blurred Image Wrapper (Inner overflow hidden to maintain top corner radius) */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          overflow: 'hidden',
                          borderTopLeftRadius: '15px',
                          borderTopRightRadius: '15px',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: -12,
                            left: -12,
                            right: -12,
                            bottom: -12,
                            backgroundImage: `url(${camp.bannerImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(16px) saturate(1.2)',
                            transform: 'scale(1.2)',
                          }}
                        />
                      </div>

                      {/* Payment Verified Pill Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: '#FFFFFF',
                          color: '#059669',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 800,
                          letterSpacing: '0.01em',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                          zIndex: 2,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <polyline points="9 12 11 14 15 10" />
                        </svg>
                        <span>{camp.commercialLabel}</span>
                      </div>

                      {/* Best Match Pill Badge on Top Right for the First Card */}
                      {cIndex === 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            backgroundColor: '#0052FF',
                            color: '#FFFFFF',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 800,
                            letterSpacing: '0.02em',
                            boxShadow: '0 2px 8px rgba(0, 82, 255, 0.35)',
                            zIndex: 2,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span>Best Match</span>
                        </div>
                      )}

                      {/* Smooth Rounded Avatar Box with Blurred Brand Logo */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-14px',
                          left: '16px',
                          width: '40px',
                          height: '40px',
                          backgroundColor: '#FFFFFF',
                          border: '2px solid #FFFFFF',
                          borderRadius: '10px',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                          zIndex: 3,
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px',
                        }}
                      >
                        <img
                          src={camp.partnerLogo}
                          alt="Partner Brand Logo"
                          style={{
                            maxWidth: '65%',
                            maxHeight: '65%',
                            objectFit: 'contain',
                            filter: 'blur(2.5px)',
                            display: 'block',
                          }}
                        />
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div style={{ padding: '26px 16px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Row 1: Confidential Brand + Divider + Category Capsule Pills */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 700,
                            color: '#64748B',
                          }}
                        >
                          {camp.brandName}
                        </span>

                        <span style={{ width: '1px', height: '11px', backgroundColor: '#E2E8F0', margin: '0 2px' }} />

                        {camp.categories.map((cat: string, idx: number) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color: '#334155',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              padding: '3px 10px',
                              borderRadius: '20px',
                            }}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Middle Section: Left (Title + Status) & Right (Pricing + Requirements Details) */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '12px',
                          marginBottom: '14px',
                        }}
                      >
                        {/* Left: Campaign Name + Eligibility */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {/* Title + "New" Sparkle Capsule Badge */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                            <span
                              style={{
                                fontSize: '13.5px',
                                fontWeight: 700,
                                color: '#0F172A',
                              }}
                            >
                              {camp.title}
                            </span>

                            {/* Posted Time & Date (Clean, Borderless Text) */}
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '11px',
                                fontWeight: 500,
                                color: '#94A3B8',
                              }}
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{camp.postedAt || 'Aug 27, 2026 • 2:30 PM'}</span>
                            </span>
                          </div>

                          {/* Status Badge */}
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              color: '#059669',
                              fontSize: '12px',
                              fontWeight: 700,
                            }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <span>You are eligible</span>
                          </div>
                        </div>

                        {/* Right: Pricing & Requirements Details */}
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                            {camp.payoutAmount}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500, marginTop: '3px' }}>
                            {camp.payType || 'Fixed Pay'}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500, marginTop: '2px', whiteSpace: 'nowrap' }}>
                            {camp.deliverablesSummary || '7 Posts • 7 Stories • 7 Reels'}
                          </div>
                        </div>
                      </div>

                      {/* Row 4: Clean Metadata List */}
                      <div
                        style={{
                          borderTop: '1px solid #F1F5F9',
                          paddingTop: '12px',
                          marginTop: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          fontSize: '12px',
                        }}
                      >
                        {/* Profile Success Rate */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Your profile success rate</span>
                          <span style={{ fontWeight: 700, color: '#0F172A' }}>
                            {camp.eligibilityRate}%
                          </span>
                        </div>

                        {/* Language */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Language</span>
                          <span style={{ fontWeight: 600, color: '#0F172A' }}>{camp.language}</span>
                        </div>

                        {/* Country Flag & Full Name */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Country</span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <img
                              src={`https://flagcdn.com/w40/${camp.countryCode.toLowerCase()}.png`}
                              alt={camp.country}
                              style={{
                                width: '16px',
                                height: '11px',
                                objectFit: 'cover',
                                borderRadius: '2px',
                                display: 'block',
                              }}
                            />
                            <span style={{ fontWeight: 600, color: '#0F172A' }}>
                              {camp.country}
                            </span>
                          </div>
                        </div>

                        {/* Project Timeline */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Project timeline</span>
                          <span style={{ fontWeight: 600, color: '#0F172A' }}>
                            {camp.projectTimeline || 'Sep 1 – Sep 15, 2026'}
                          </span>
                        </div>

                        {/* Socials - No Card Box, Clean Theme Icons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Socials</span>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {camp.socials.map((s: string) => renderThemeSocialIcon(s))}
                          </div>
                        </div>
                      </div>

                      {/* Apply to Campaign Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(camp);
                        }}
                        style={{
                          marginTop: '16px',
                          width: '100%',
                          padding: '10px 16px',
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 8px rgba(0, 82, 255, 0.18)',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#0045D8';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 82, 255, 0.28)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#0052FF';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 82, 255, 0.18)';
                        }}
                      >
                        <span>Apply to Campaign</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* ==================================================================== */}
        {/* TAB 2: COLLABS & 2-WAY CONVERSATION PLATFORM                         */}
        {/* ==================================================================== */}
        {activeTab === 'collabs' && (
          <div>
            {/* Top Filter Bar with Standard Segmented Control & Mobile Dropdown */}
            <div
              className={`collabs-top-filter-bar ${mobileChatViewActive ? 'hide-on-mobile-chat' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}
            >
              {/* Desktop Sleek Segmented Control Track */}
              <div
                className="collabs-filter-desktop-segmented"
                style={{
                  alignItems: 'center',
                  backgroundColor: '#F1F5F9',
                  padding: '3px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  gap: '2px',
                  maxWidth: '100%',
                }}
              >
                {[
                  {
                    id: 'awaiting',
                    label: 'Awaiting Review',
                    count: collabs.filter((c) => c.status === 'AWAITING').length,
                    icon: (active: boolean) => (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active ? '#0052FF' : '#64748B'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    ),
                  },
                  {
                    id: 'accepted',
                    label: 'Accepted & Active',
                    count: collabs.filter((c) => c.status === 'ACCEPTED').length,
                    icon: (active: boolean) => (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active ? '#0052FF' : '#64748B'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    ),
                  },
                  {
                    id: 'rejected',
                    label: 'Archived',
                    count: collabs.filter((c) => c.status === 'REJECTED').length,
                    icon: (active: boolean) => (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active ? '#0052FF' : '#64748B'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="21 8 21 21 3 21 3 8" />
                        <rect x="1" y="3" width="22" height="5" />
                        <line x1="10" y1="12" x2="14" y2="12" />
                      </svg>
                    ),
                  },
                ].map((pill) => {
                  const isActive = collabFilter === pill.id;

                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => setCollabFilter(pill.id as CollabFilter)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '7px',
                        fontSize: '12px',
                        fontWeight: isActive ? 700 : 500,
                        backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                        color: isActive ? '#0F172A' : '#64748B',
                        border: 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.15s ease',
                        boxShadow: isActive ? '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)' : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.color = '#0F172A';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.color = '#64748B';
                      }}
                    >
                      {pill.icon(isActive)}
                      <span>{pill.label}</span>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 700,
                          backgroundColor: isActive ? '#EFF6FF' : '#E2E8F0',
                          color: isActive ? '#0052FF' : '#64748B',
                          padding: '1px 6px',
                          borderRadius: '8px',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {pill.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Filter Dropdown (Zero Horizontal Scroll) */}
              <div
                className="collabs-filter-mobile-dropdown"
                style={{ position: 'relative', width: '100%' }}
              >
                <button
                  type="button"
                  onClick={() => setCollabFilterDropdownOpen(!collabFilterDropdownOpen)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Filter:</span>
                    {collabFilter === 'awaiting' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#0052FF', fontWeight: 700 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        Awaiting Review ({collabs.filter((c) => c.status === 'AWAITING').length})
                      </span>
                    ) : collabFilter === 'accepted' ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#059669', fontWeight: 700 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Accepted & Active ({collabs.filter((c) => c.status === 'ACCEPTED').length})
                      </span>
                    ) : (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#64748B', fontWeight: 700 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="21 8 21 21 3 21 3 8" />
                          <rect x="1" y="3" width="22" height="5" />
                          <line x1="10" y1="12" x2="14" y2="12" />
                        </svg>
                        Archived ({collabs.filter((c) => c.status === 'REJECTED').length})
                      </span>
                    )}
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#64748B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: collabFilterDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Dropdown Menu Popup */}
                {collabFilterDropdownOpen && (
                  <>
                    <div
                      onClick={() => setCollabFilterDropdownOpen(false)}
                      style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 4px)',
                        left: 0,
                        right: 0,
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
                        zIndex: 50,
                        overflow: 'hidden',
                        padding: '4px',
                      }}
                    >
                      {[
                        {
                          id: 'awaiting',
                          label: 'Awaiting Review',
                          count: collabs.filter((c) => c.status === 'AWAITING').length,
                          color: '#0052FF',
                          bg: '#EFF6FF',
                          icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                          ),
                        },
                        {
                          id: 'accepted',
                          label: 'Accepted & Active',
                          count: collabs.filter((c) => c.status === 'ACCEPTED').length,
                          color: '#059669',
                          bg: '#ECFDF5',
                          icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                          ),
                        },
                        {
                          id: 'rejected',
                          label: 'Archived Deals',
                          count: collabs.filter((c) => c.status === 'REJECTED').length,
                          color: '#64748B',
                          bg: '#F1F5F9',
                          icon: (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="21 8 21 21 3 21 3 8" />
                              <rect x="1" y="3" width="22" height="5" />
                              <line x1="10" y1="12" x2="14" y2="12" />
                            </svg>
                          ),
                        },
                      ].map((item) => {
                        const isSelected = collabFilter === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setCollabFilter(item.id as CollabFilter);
                              setCollabFilterDropdownOpen(false);
                            }}
                            style={{
                              width: '100%',
                              padding: '9px 12px',
                              borderRadius: '7px',
                              backgroundColor: isSelected ? item.bg : 'transparent',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontSize: '12.5px',
                              fontWeight: isSelected ? 700 : 500,
                              color: isSelected ? item.color : '#334155',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {item.icon}
                              <span>{item.label}</span>
                            </div>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                backgroundColor: isSelected ? '#FFFFFF' : '#F1F5F9',
                                color: isSelected ? item.color : '#64748B',
                                padding: '1px 6px',
                                borderRadius: '10px',
                                border: isSelected ? `1px solid ${item.color}30` : 'none',
                              }}
                            >
                              {item.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Main Split-Pane Workspace */}
            {collabs.filter((c) => c.status.toLowerCase() === collabFilter).length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 14px auto',
                    color: '#64748B',
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
                  No threads in this filter
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '400px', margin: '0 auto 20px auto', lineHeight: 1.5 }}>
                  Apply to campaigns in the marketplace to start direct, 100% verified 2-way conversations with verified brand managers.
                </p>
                <button
                  type="button"
                  onClick={() => handleTabChange('marketplace')}
                  style={{
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 22px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 82, 255, 0.25)',
                  }}
                >
                  Explore Marketplace Briefs
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(300px, 340px) minmax(0, 1fr)',
                  gap: '16px',
                  alignItems: 'stretch',
                  height: 'calc(100vh - 195px)',
                  minHeight: '620px',
                  maxHeight: '840px',
                }}
                className={`collabs-grid-layout ${mobileChatViewActive ? 'mobile-chat-open' : ''}`}
              >
                {/* Left Panel: Conversation Threads List */}
                <div
                  className="collabs-left-sidebar"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  {/* Search Threads Header */}
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
                    <div style={{ position: 'relative' }}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ position: 'absolute', left: '11px', top: '10px' }}
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        type="text"
                        value={collabSearchQuery}
                        onChange={(e) => setCollabSearchQuery(e.target.value)}
                        placeholder="Search conversations..."
                        style={{
                          width: '100%',
                          padding: '7px 12px 7px 32px',
                          fontSize: '12px',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          outline: 'none',
                          backgroundColor: '#F8FAFC',
                          color: '#0F172A',
                        }}
                      />
                    </div>
                  </div>

                  {/* Threads List Items */}
                  <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '6px 8px' }}>
                    {collabs
                      .filter((c) => c.status.toLowerCase() === collabFilter)
                      .filter((c) => {
                        if (!collabSearchQuery.trim()) return true;
                        const q = collabSearchQuery.toLowerCase();
                        return (
                          c.campaignTitle.toLowerCase().includes(q) ||
                          c.brandName.toLowerCase().includes(q) ||
                          c.subject.toLowerCase().includes(q)
                        );
                      })
                      .map((thread) => {
                        const isSelected = selectedCollab?.id === thread.id;
                        const lastMsg = thread.messages[thread.messages.length - 1];

                        return (
                          <div
                            key={thread.id}
                            onClick={() => {
                              setSelectedCollabId(thread.id);
                              setMobileChatViewActive(true);
                              setCollabs((prev) =>
                                prev.map((c) => (c.id === thread.id ? { ...c, unreadCount: 0 } : c))
                              );
                            }}
                            style={{
                              padding: '10px 12px',
                              borderRadius: '10px',
                              marginBottom: '4px',
                              cursor: 'pointer',
                              backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                              borderLeft: isSelected ? '3px solid #0052FF' : '3px solid transparent',
                              transition: 'all 0.15s ease',
                              display: 'flex',
                              gap: '10px',
                              position: 'relative',
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            {/* Brand Avatar */}
                            <div
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                backgroundColor: thread.brandAvatarBg || '#EFF6FF',
                                color: thread.brandAvatarColor || '#0052FF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '13px',
                                flexShrink: 0,
                              }}
                            >
                              {thread.brandInitials || 'BR'}
                            </div>

                            {/* Thread Info */}
                            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              {/* Row 1: Title & Date */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>
                                  {thread.campaignTitle}
                                </div>
                                <span style={{ fontSize: '10px', color: '#94A3B8', flexShrink: 0, whiteSpace: 'nowrap' }}>
                                  {thread.appliedAt}
                                </span>
                              </div>

                              {/* Row 2: Brand, Rate & Unread Badge (Inline flex with zero overlap) */}
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                <div style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, minWidth: 0 }}>
                                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{thread.brandName}</span>
                                  <span>•</span>
                                  <span style={{ fontWeight: 700, color: '#0052FF', flexShrink: 0 }}>{thread.proposedRate}</span>
                                </div>

                                {thread.unreadCount > 0 && (
                                  <span
                                    style={{
                                      backgroundColor: '#0052FF',
                                      color: '#FFFFFF',
                                      fontSize: '9.5px',
                                      fontWeight: 800,
                                      minWidth: '18px',
                                      height: '18px',
                                      padding: '0 5px',
                                      borderRadius: '9px',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexShrink: 0,
                                    }}
                                  >
                                    {thread.unreadCount}
                                  </span>
                                )}
                              </div>

                              {/* Row 3: Last message snippet */}
                              {lastMsg && (
                                <p style={{ fontSize: '11px', color: isSelected ? '#334155' : '#94A3B8', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {lastMsg.sender === 'CREATOR' ? 'You: ' : ''}{lastMsg.text}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Right Panel: Full Interactive 2-Way Conversation Studio */}
                {selectedCollab ? (
                  <div
                    className="collabs-right-studio"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      position: 'relative',
                    }}
                  >
                    {/* Unified Minimalist Studio Header (Clean Single App Bar) */}
                    <div
                      style={{
                        padding: '12px 18px',
                        borderBottom: '1px solid #E2E8F0',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        flexShrink: 0,
                        minHeight: '60px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                        {/* Mobile Back Button */}
                        <button
                          type="button"
                          onClick={() => setMobileChatViewActive(false)}
                          className="collabs-mobile-back-btn"
                          title="Back to all conversations"
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#F1F5F9',
                            color: '#0F172A',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            flexShrink: 0,
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </button>

                        {/* Brand Avatar */}
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            backgroundColor: selectedCollab.brandAvatarBg || '#EFF6FF',
                            color: selectedCollab.brandAvatarColor || '#0052FF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '13.5px',
                            flexShrink: 0,
                          }}
                        >
                          {selectedCollab.brandInitials || 'BR'}
                        </div>

                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h3
                              style={{
                                fontSize: '14px',
                                fontWeight: 800,
                                color: '#0F172A',
                                margin: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {selectedCollab.campaignTitle}
                            </h3>
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                color: selectedCollab.status === 'ACCEPTED' ? '#059669' : selectedCollab.status === 'AWAITING' ? '#D97706' : '#64748B',
                                backgroundColor: selectedCollab.status === 'ACCEPTED' ? '#ECFDF5' : selectedCollab.status === 'AWAITING' ? '#FEF3C7' : '#F1F5F9',
                                padding: '2px 7px',
                                borderRadius: '12px',
                                flexShrink: 0,
                              }}
                            >
                              {selectedCollab.status === 'ACCEPTED' ? '✓ Active Deal' : selectedCollab.status === 'AWAITING' ? '⏳ Awaiting Review' : 'Archived'}
                            </span>
                          </div>

                          <div style={{ fontSize: '11.5px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '2px' }}>
                            <span style={{ fontWeight: 600 }}>{selectedCollab.brandName}</span>
                            <span>•</span>
                            <span style={{ fontWeight: 800, color: '#0052FF' }}>Rate {selectedCollab.proposedRate}</span>
                            {selectedCollab.deliverables && (
                              <>
                                <span className="tia-desktop-only">•</span>
                                <span className="tia-desktop-only" style={{ color: '#475569' }}>Deliverables: {selectedCollab.deliverables}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Header Actions & Milestone Summary */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        {/* Compact Stage Indicator Badge (Desktop Only) */}
                        <div
                          className="tia-desktop-only"
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#0052FF',
                            backgroundColor: '#EFF6FF',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            border: '1px solid #DBEAFE',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <span>Stage {selectedCollab.milestoneStage || 1}/4:</span>
                          <span style={{ color: '#1E293B', fontWeight: 600 }}>
                            {selectedCollab.milestoneStage === 1
                              ? 'Proposal'
                              : selectedCollab.milestoneStage === 2
                              ? 'Script & Storyboard'
                              : selectedCollab.milestoneStage === 3
                              ? 'Draft Review'
                              : 'Live Post & Payout'}
                          </span>
                        </div>

                        {selectedCollab.status === 'AWAITING' && (
                          <button
                            type="button"
                            onClick={() => handleAcceptDeal(selectedCollab.id)}
                            style={{
                              backgroundColor: '#059669',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '7px 14px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              boxShadow: '0 1px 3px rgba(5, 150, 105, 0.2)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Accept Deal</span>
                          </button>
                        )}

                        {selectedCollab.status === 'ACCEPTED' && (
                          <button
                            type="button"
                            onClick={() => setShowDeliverableModal(true)}
                            style={{
                              backgroundColor: '#0052FF',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '7px 14px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              boxShadow: '0 1px 3px rgba(0, 82, 255, 0.2)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                            </svg>
                            <span>Submit Deliverable</span>
                          </button>
                        )}

                        {/* Archive / Unarchive Ghost Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleArchiveCollab(selectedCollab.id)}
                          title={selectedCollab.status === 'REJECTED' ? 'Restore deal' : 'Archive deal'}
                          style={{
                            backgroundColor: '#F8FAFC',
                            color: '#64748B',
                            border: '1px solid #E2E8F0',
                            borderRadius: '8px',
                            padding: '7px 10px',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="21 8 21 21 3 21 3 8" />
                            <rect x="1" y="3" width="22" height="5" />
                            <line x1="10" y1="12" x2="14" y2="12" />
                          </svg>
                          <span className="tia-desktop-only">{selectedCollab.status === 'REJECTED' ? 'Unarchive' : 'Archive'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Chat Messages Canvas (Clean, Modern, Spacious) */}
                    <div
                      style={{
                        padding: '18px 20px',
                        flex: 1,
                        minHeight: 0,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        backgroundColor: '#F8FAFC',
                      }}
                    >
                      {/* Date Divider */}
                      <div style={{ textAlign: 'center', margin: '2px 0 8px 0' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#94A3B8',
                            backgroundColor: '#FFFFFF',
                            padding: '3px 12px',
                            borderRadius: '12px',
                            border: '1px solid #E2E8F0',
                          }}
                        >
                          Partnership Started • {selectedCollab.appliedAt}
                        </span>
                      </div>

                      {selectedCollab.messages.map((msg: any) => {
                        const isCreator = msg.sender === 'CREATOR';

                        // Specialized Payment Card (Clean, Minimalist)
                        if (msg.type === 'ESCROW') {
                          return (
                            <div
                              key={msg.id}
                              style={{
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #E2E8F0',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                display: 'flex',
                                gap: '10px',
                                alignItems: 'center',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                              }}
                            >
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '8px',
                                  backgroundColor: '#F1F5F9',
                                  color: '#0052FF',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '15px',
                                  flexShrink: 0,
                                }}
                              >
                                💳
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>
                                  Milestone Payment Funded ({msg.escrowMeta?.amount || selectedCollab.proposedRate})
                                </div>
                                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                                  {msg.text?.replace(/escrow/gi, 'milestone balance')}
                                </div>
                              </div>
                              <span style={{ fontSize: '10.5px', color: '#94A3B8', flexShrink: 0 }}>
                                {msg.date}
                              </span>
                            </div>
                          );
                        }

                        // Specialized DELIVERABLE Card (Clean Embedded Card)
                        if (msg.type === 'DELIVERABLE') {
                          return (
                            <div
                              key={msg.id}
                              style={{
                                alignSelf: isCreator ? 'flex-end' : 'flex-start',
                                maxWidth: '78%',
                                backgroundColor: isCreator ? '#0052FF' : '#FFFFFF',
                                color: isCreator ? '#FFFFFF' : '#0F172A',
                                border: isCreator ? 'none' : '1px solid #E2E8F0',
                                borderRadius: isCreator ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                padding: '14px 16px',
                                boxShadow: isCreator ? '0 2px 8px rgba(0, 82, 255, 0.25)' : '0 1px 3px rgba(0, 0, 0, 0.05)',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: isCreator ? '#DBEAFE' : '#0052FF', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  📎 Deliverable Submission
                                </span>
                                <span style={{ fontSize: '10px', color: isCreator ? 'rgba(255, 255, 255, 0.75)' : '#94A3B8' }}>{msg.date}</span>
                              </div>

                              <div style={{ fontSize: '13.5px', fontWeight: 700, color: isCreator ? '#FFFFFF' : '#0F172A', marginBottom: '4px' }}>
                                {msg.deliverableMeta?.title || 'Deliverable Asset'}
                              </div>

                              {msg.deliverableMeta?.notes && (
                                <p style={{ fontSize: '12px', color: isCreator ? 'rgba(255, 255, 255, 0.9)' : '#64748B', margin: '0 0 10px 0', lineHeight: 1.45 }}>
                                  {msg.deliverableMeta.notes}
                                </p>
                              )}

                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', paddingTop: '8px', borderTop: isCreator ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #F1F5F9' }}>
                                {msg.deliverableMeta?.url ? (
                                  <a
                                    href={msg.deliverableMeta.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      fontSize: '11.5px',
                                      fontWeight: 700,
                                      color: isCreator ? '#0052FF' : '#0052FF',
                                      backgroundColor: isCreator ? '#FFFFFF' : '#EFF6FF',
                                      padding: '5px 12px',
                                      borderRadius: '6px',
                                      textDecoration: 'none',
                                    }}
                                  >
                                    <span>Open Asset Link</span>
                                    <span>↗</span>
                                  </a>
                                ) : <div />}

                                <span
                                  style={{
                                    fontSize: '10.5px',
                                    fontWeight: 700,
                                    color: msg.deliverableMeta?.status === 'APPROVED' ? (isCreator ? '#FFFFFF' : '#059669') : (isCreator ? '#FFFFFF' : '#D97706'),
                                    backgroundColor: msg.deliverableMeta?.status === 'APPROVED' ? (isCreator ? 'rgba(255, 255, 255, 0.25)' : '#ECFDF5') : (isCreator ? 'rgba(255, 255, 255, 0.2)' : '#FEF3C7'),
                                    padding: '3px 8px',
                                    borderRadius: '10px',
                                  }}
                                >
                                  {msg.deliverableMeta?.status === 'APPROVED' ? '✓ Approved' : '⏳ In Review'}
                                </span>
                              </div>

                              {isCreator && (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', marginTop: '6px', fontSize: '10px', color: 'rgba(255, 255, 255, 0.75)' }}>
                                  <span>Delivered</span>
                                  <svg width="14" height="9" viewBox="0 0 16 11" fill="none">
                                    <path d="M1 5.5L4.5 9L10.5 1.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5.5 5.5L8.5 8.5L14.5 1.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          );
                        }

                        // Standard Chat Bubbles (WhatsApp / Slack Proportions)
                        return (
                          <div
                            key={msg.id}
                            style={{
                              alignSelf: isCreator ? 'flex-end' : 'flex-start',
                              maxWidth: '72%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: isCreator ? 'flex-end' : 'flex-start',
                            }}
                          >
                            {!isCreator && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A' }}>
                                  {msg.senderName}
                                </span>
                                <span style={{ fontSize: '10px', color: '#94A3B8' }}>{msg.date}</span>
                              </div>
                            )}

                            <div
                              style={{
                                backgroundColor: isCreator ? '#0052FF' : '#FFFFFF',
                                color: isCreator ? '#FFFFFF' : '#0F172A',
                                padding: '9px 14px',
                                borderRadius: isCreator ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                border: isCreator ? 'none' : '1px solid #E2E8F0',
                                fontSize: '13px',
                                lineHeight: 1.45,
                                boxShadow: isCreator ? '0 2px 6px rgba(0, 82, 255, 0.25)' : '0 1px 2px rgba(0, 0, 0, 0.04)',
                              }}
                            >
                              {msg.text}
                            </div>

                            {isCreator && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px', fontSize: '10px', color: '#94A3B8' }}>
                                <span>{msg.date}</span>
                                <span>•</span>
                                <svg width="14" height="9" viewBox="0 0 16 11" fill="none">
                                  <path d="M1 5.5L4.5 9L10.5 1.5" stroke="#0052FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M5.5 5.5L8.5 8.5L14.5 1.5" stroke="#0052FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* 2-Way Typing Indicator */}
                      {isBrandTyping && (
                        <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #E2E8F0',
                              padding: '6px 12px',
                              borderRadius: '12px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                            }}
                          >
                            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                              {selectedCollab.brandName} is typing
                            </span>
                            <span style={{ display: 'inline-flex', gap: '2px' }}>
                              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#0052FF', display: 'inline-block' }} />
                              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#0052FF', display: 'inline-block' }} />
                              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#0052FF', display: 'inline-block' }} />
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Reply Suggestions (Clean Pill Chips) */}
                    <div
                      style={{
                        padding: '6px 16px',
                        backgroundColor: '#FFFFFF',
                        borderTop: '1px solid #F1F5F9',
                        display: 'flex',
                        gap: '6px',
                        overflowX: 'auto',
                        flexShrink: 0,
                      }}
                    >
                      {[
                        '✨ Draft is ready for review!',
                        '📅 ETA is tomorrow 5 PM',
                        '📎 Uploaded video to Drive',
                        '💳 Confirming milestone approval',
                      ].map((qr, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(qr.replace(/^[^\s]+\s/, ''))}
                          style={{
                            padding: '4px 10px',
                            fontSize: '11px',
                            fontWeight: 500,
                            color: '#475569',
                            backgroundColor: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#EFF6FF';
                            e.currentTarget.style.borderColor = '#BFDBFE';
                            e.currentTarget.style.color = '#0052FF';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#F8FAFC';
                            e.currentTarget.style.borderColor = '#E2E8F0';
                            e.currentTarget.style.color = '#475569';
                          }}
                        >
                          {qr}
                        </button>
                      ))}
                    </div>

                    {/* Composer Input Bar (Fixed / Sticky Footer) */}
                    <div
                      style={{
                        padding: '12px 16px',
                        borderTop: '1px solid #E2E8F0',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexShrink: 0,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setShowDeliverableModal(true)}
                        title="Attach Deliverable Link"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#F8FAFC',
                          color: '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#EFF6FF';
                          e.currentTarget.style.color = '#0052FF';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#F8FAFC';
                          e.currentTarget.style.color = '#475569';
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                      </button>

                      <input
                        type="text"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message to brand campaign manager (Press Enter ↵)..."
                        style={{
                          flex: 1,
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '12.5px',
                          outline: 'none',
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => handleSendMessage()}
                        style={{
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px 18px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 6px rgba(0, 82, 255, 0.25)',
                        }}
                      >
                        <span>Send</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
                    Select a conversation to start chatting
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: INVOICES & PAYOUTS STUDIO (STRUCTURE INSPIRATION)             */}
        {/* ==================================================================== */}
        {activeTab === 'payments' && (() => {
          const selectedInvoice = payments.find((p) => p.id === selectedInvoiceId) || payments[0];
          const filteredInvoices = payments.filter((p) => {
            const matchesSearch =
              p.mediaName.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
              p.invoiceCode?.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
              p.campaign?.toLowerCase().includes(invoiceSearchQuery.toLowerCase());
            if (invoiceStatusFilter === 'PAID') return matchesSearch && p.status === 'PAID';
            if (invoiceStatusFilter === 'UNPAID') return matchesSearch && p.status === 'UNCLAIMED';
            return matchesSearch;
          });

          // Dynamic metric totals
          const totalInvoicedGross = payments.reduce((acc, curr) => acc + (curr.grossAmount || 0), 0);
          const totalPaidGross = payments.filter((p) => p.status === 'PAID').reduce((acc, curr) => acc + (curr.grossAmount || 0), 0);
          const totalUnpaidGross = payments.filter((p) => p.status === 'UNCLAIMED').reduce((acc, curr) => acc + (curr.grossAmount || 0), 0);
          const paidCount = payments.filter((p) => p.status === 'PAID').length;
          const unpaidCount = payments.filter((p) => p.status === 'UNCLAIMED').length;

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* TOP ROW: 4 STATS CARDS (Total Invoices, Paid Invoices, Unpaid Invoices, Credits Wallet) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
                  gap: '16px',
                }}
              >
                {/* Card 1: Total Invoices */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Total Invoices</span>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      •••
                    </button>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', margin: '12px 0 8px 0', letterSpacing: '-0.02em' }}>
                    ₹{totalInvoicedGross.toLocaleString('en-IN')}.00
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>Invoices this cycle</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        border: '1px solid #A7F3D0',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <span>6%</span>
                      <span>↗</span>
                    </span>
                  </div>
                </div>

                {/* Card 2: Paid Invoices */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Paid Invoices</span>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      •••
                    </button>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', margin: '12px 0 8px 0', letterSpacing: '-0.02em' }}>
                    ₹{totalPaidGross.toLocaleString('en-IN')}.00
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>{paidCount} deals disbursed</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        border: '1px solid #A7F3D0',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <span>8%</span>
                      <span>↗</span>
                    </span>
                  </div>
                </div>

                {/* Card 3: Unpaid Invoices */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>Unpaid Invoices</span>
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      •••
                    </button>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', margin: '12px 0 8px 0', letterSpacing: '-0.02em' }}>
                    ₹{totalUnpaidGross.toLocaleString('en-IN')}.00
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>{unpaidCount} deals ready</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#059669',
                        backgroundColor: '#ECFDF5',
                        border: '1px solid #A7F3D0',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <span>6%</span>
                      <span>↗</span>
                    </span>
                  </div>
                </div>

                {/* Card 4: Credits Wallet */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #BFDBFE',
                    borderRadius: '16px',
                    padding: '20px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0, 82, 255, 0.04)',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px' }}>⚡</span>
                      <span style={{ fontSize: '13px', color: '#1E40AF', fontWeight: 700 }}>Credits Wallet</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowBuyCreditsModal(true)}
                      style={{
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        borderRadius: '6px',
                        padding: '2px 8px',
                        color: '#0052FF',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <span>+ Buy</span>
                    </button>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 900, color: '#0052FF', margin: '12px 0 8px 0', letterSpacing: '-0.02em' }}>
                    {applyCredits} {applyCredits === 1 ? 'Credit' : 'Credits'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11.5px', color: '#64748B' }}>₹99 / application</span>
                    <button
                      type="button"
                      onClick={() => setShowBuyCreditsModal(true)}
                      style={{
                        backgroundColor: '#0052FF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0, 82, 255, 0.2)',
                      }}
                    >
                      Top Up ⚡
                    </button>
                  </div>
                </div>
              </div>

              {/* BANK ACCOUNT & WALLET COMPACT STRIP */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '14px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      backgroundColor: '#EFF6FF',
                      color: '#0052FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      flexShrink: 0,
                    }}
                  >
                    🏦
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>
                        {bankAccount?.bankName || 'HDFC Bank Ltd.'} (•••• {bankAccount?.accountNumber ? bankAccount.accountNumber.slice(-4) : '4829'})
                      </span>
                      {bankAccount?.verified ? (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#059669',
                            backgroundColor: '#ECFDF5',
                            border: '1px solid #A7F3D0',
                            padding: '2px 8px',
                            borderRadius: '10px',
                          }}
                        >
                          ✓ Verified for Disbursals
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#D97706',
                            backgroundColor: '#FEF3C7',
                            padding: '2px 8px',
                            borderRadius: '10px',
                          }}
                        >
                          ⚠️ Action Required
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>
                      Beneficiary: {bankAccount?.accountHolderName || 'Sarah Jenkins'} • IFSC: {bankAccount?.ifscCode || 'HDFC0000128'} • Auto-Penny-Drop Verified
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setShowBankModal(true)}
                    style={{
                      padding: '7px 12px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#0F172A',
                      cursor: 'pointer',
                    }}
                  >
                    Edit Bank Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBuyCreditsModal(true)}
                    style={{
                      padding: '7px 14px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>⚡</span>
                    <span>{applyCredits} Credits</span>
                  </button>
                </div>
              </div>

              {/* SPLIT INVOICE WORKSPACE (TABLE ON LEFT, DETAILS INSPECTOR ON RIGHT) */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* LEFT TABLE: ALL INVOICES */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '20px',
                    flex: '1 1 540px',
                    minWidth: 0,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                  }}
                >
                  {/* Table Header Toolbar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      All Invoices
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {/* Search Input */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          borderRadius: '20px',
                          padding: '6px 12px',
                          fontSize: '12px',
                          color: '#64748B',
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                          type="text"
                          value={invoiceSearchQuery}
                          onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                          placeholder="Search here"
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            outline: 'none',
                            fontSize: '12px',
                            color: '#0F172A',
                            width: '120px',
                          }}
                        />
                      </div>

                      {/* Filter Button */}
                      <div style={{ position: 'relative' }}>
                        <button
                          type="button"
                          onClick={() => setInvoiceFilterDropdownOpen(!invoiceFilterDropdownOpen)}
                          style={{
                            backgroundColor: invoiceStatusFilter !== 'ALL' ? '#EFF6FF' : '#FFFFFF',
                            border: '1px solid',
                            borderColor: invoiceStatusFilter !== 'ALL' ? '#0052FF' : '#E2E8F0',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: invoiceStatusFilter !== 'ALL' ? '#0052FF' : '#64748B',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                          </svg>
                          <span>{invoiceStatusFilter === 'ALL' ? 'Filter' : invoiceStatusFilter === 'PAID' ? 'Paid' : 'Unpaid'}</span>
                        </button>

                        {invoiceFilterDropdownOpen && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '100%',
                              right: 0,
                              marginTop: '6px',
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #E2E8F0',
                              borderRadius: '10px',
                              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                              padding: '6px',
                              zIndex: 20,
                              minWidth: '130px',
                            }}
                          >
                            {(['ALL', 'PAID', 'UNPAID'] as const).map((filterOpt) => (
                              <button
                                key={filterOpt}
                                type="button"
                                onClick={() => {
                                  setInvoiceStatusFilter(filterOpt);
                                  setInvoiceFilterDropdownOpen(false);
                                }}
                                style={{
                                  width: '100%',
                                  padding: '6px 10px',
                                  textAlign: 'left',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  backgroundColor: invoiceStatusFilter === filterOpt ? '#EFF6FF' : 'transparent',
                                  color: invoiceStatusFilter === filterOpt ? '#0052FF' : '#334155',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                }}
                              >
                                {filterOpt === 'ALL' ? 'All Invoices' : filterOpt === 'PAID' ? 'Paid Only' : 'Unpaid Only'}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Options Button */}
                      <button
                        type="button"
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: '8px',
                          padding: '6px 10px',
                          color: '#64748B',
                          cursor: 'pointer',
                          fontSize: '12px',
                        }}
                      >
                        •••
                      </button>
                    </div>
                  </div>

                  {/* Invoices Table */}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #F1F5F9', fontSize: '11.5px', color: '#94A3B8', fontWeight: 600 }}>
                          <th style={{ padding: '10px 12px', width: '32px' }}>
                            <input
                              type="checkbox"
                              checked={selectedCheckboxIds.length === filteredInvoices.length && filteredInvoices.length > 0}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCheckboxIds(filteredInvoices.map((inv) => inv.id));
                                } else {
                                  setSelectedCheckboxIds([]);
                                }
                              }}
                              style={{ accentColor: '#0052FF', cursor: 'pointer' }}
                            />
                          </th>
                          <th style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <span>Invoices</span>
                              <span style={{ fontSize: '9px' }}>↕</span>
                            </div>
                          </th>
                          <th style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <span>Name</span>
                              <span style={{ fontSize: '9px' }}>↕</span>
                            </div>
                          </th>
                          <th style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <span>Date</span>
                              <span style={{ fontSize: '9px' }}>↕</span>
                            </div>
                          </th>
                          <th style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                              <span>Status</span>
                              <span style={{ fontSize: '9px' }}>↕</span>
                            </div>
                          </th>
                          <th style={{ padding: '10px 12px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer', justifyContent: 'flex-end', width: '100%' }}>
                              <span>Amount</span>
                              <span style={{ fontSize: '9px' }}>↕</span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvoices.map((invoice) => {
                          const isSelected = selectedInvoice?.id === invoice.id;
                          const isChecked = selectedCheckboxIds.includes(invoice.id);
                          const isPaid = invoice.status === 'PAID';

                          return (
                            <tr
                              key={invoice.id}
                              onClick={() => {
                                setSelectedInvoiceId(invoice.id);
                                setInvoiceDetailOpen(true);
                              }}
                              style={{
                                borderBottom: '1px solid #F8FAFC',
                                fontSize: '12.5px',
                                backgroundColor: isSelected ? '#F0F7FF' : 'transparent',
                                cursor: 'pointer',
                                transition: 'background-color 0.12s ease',
                              }}
                              onMouseEnter={(e) => {
                                if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                              }}
                              onMouseLeave={(e) => {
                                if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              <td style={{ padding: '12px', width: '32px' }} onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedCheckboxIds([...selectedCheckboxIds, invoice.id]);
                                    } else {
                                      setSelectedCheckboxIds(selectedCheckboxIds.filter((id) => id !== invoice.id));
                                    }
                                  }}
                                  style={{ accentColor: '#0052FF', cursor: 'pointer' }}
                                />
                              </td>
                              <td style={{ padding: '12px', fontWeight: 600, color: '#334155' }}>
                                {invoice.invoiceCode || invoice.invoiceNumber?.slice(-7) || 'INV-PHA-0192'}
                              </td>
                              <td style={{ padding: '12px', fontWeight: 700, color: '#0F172A' }}>
                                {invoice.mediaName}
                              </td>
                              <td style={{ padding: '12px', color: '#64748B' }}>
                                {invoice.authorizedAt}
                              </td>
                              <td style={{ padding: '12px' }}>
                                <span
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    padding: '3px 10px',
                                    borderRadius: '6px',
                                    backgroundColor: isPaid ? '#ECFDF5' : '#FFF7ED',
                                    color: isPaid ? '#059669' : '#EA580C',
                                    border: isPaid ? '1px solid #D1FAE5' : '1px solid #FFEDD5',
                                  }}
                                >
                                  {isPaid ? 'Paid' : 'Unpaid'}
                                </span>
                              </td>
                              <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>
                                {invoice.priceFormatted || invoice.amount}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* RIGHT COLUMN: INVOICES DETAIL INSPECTOR PANEL */}
                {invoiceDetailOpen && selectedInvoice && (
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '16px',
                      padding: '22px',
                      width: '360px',
                      flexShrink: 0,
                      position: 'sticky',
                      top: '20px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    }}
                  >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        Invoices Detail
                      </h4>
                      <button
                        type="button"
                        onClick={() => setInvoiceDetailOpen(false)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          fontSize: '14px',
                          cursor: 'pointer',
                          padding: '2px 6px',
                        }}
                      >
                        ✕
                      </button>
                    </div>

                    {/* From & To Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                      {/* From */}
                      <div>
                        <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 600, marginBottom: '6px' }}>From</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '7px',
                              backgroundColor: '#0052FF',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              fontWeight: 900,
                            }}
                          >
                            TIA
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{selectedInvoice.fromName || 'TIA Financial Engine'}</div>
                            <div style={{ fontSize: '10px', color: '#94A3B8' }}>{selectedInvoice.fromEmail || 'billing@theinfluencealliance.com'}</div>
                          </div>
                        </div>
                      </div>

                      {/* To */}
                      <div>
                        <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 600, marginBottom: '6px' }}>To</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '7px',
                              backgroundColor: selectedInvoice.logoBg || '#2563EB',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              fontWeight: 900,
                            }}
                          >
                            {selectedInvoice.initials || 'PH'}
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '110px' }}>
                              {selectedInvoice.mediaName}
                            </div>
                            <div style={{ fontSize: '10px', color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '110px' }}>
                              {selectedInvoice.email || 'brand@paulhomes.in'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Grid (2x2) */}
                    <div
                      style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: '12px',
                        padding: '14px',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '12px',
                        marginBottom: '16px',
                        fontSize: '11.5px',
                      }}
                    >
                      <div>
                        <div style={{ color: '#94A3B8', fontSize: '10px', fontWeight: 600 }}>Due Date</div>
                        <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedInvoice.dueDate || selectedInvoice.authorizedAt}</div>
                      </div>
                      <div>
                        <div style={{ color: '#94A3B8', fontSize: '10px', fontWeight: 600 }}>Subject</div>
                        <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {selectedInvoice.campaign}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: '#94A3B8', fontSize: '10px', fontWeight: 600 }}>Billed to</div>
                        <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {selectedInvoice.billedTo || selectedInvoice.mediaName}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: '#94A3B8', fontSize: '10px', fontWeight: 600 }}>Currency</div>
                        <div style={{ fontWeight: 700, color: '#0F172A', marginTop: '2px' }}>{selectedInvoice.currency || 'INR (₹ Indian Rupee)'}</div>
                      </div>
                    </div>

                    {/* Itemized Table Card */}
                    <div
                      style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: '12px',
                        padding: '14px',
                        marginBottom: '20px',
                      }}
                    >
                      {/* Items Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#94A3B8', fontWeight: 600, borderBottom: '1px solid #E2E8F0', paddingBottom: '6px', marginBottom: '8px' }}>
                        <span>Description</span>
                        <div style={{ display: 'flex', gap: '20px' }}>
                          <span>Price</span>
                          <span>Amount</span>
                        </div>
                      </div>

                      {/* Line Item */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#334155', marginBottom: '12px' }}>
                        <span style={{ fontWeight: 600, maxWidth: '180px', lineHeight: 1.35 }}>
                          {selectedInvoice.deliverableDesc || selectedInvoice.campaign}
                        </span>
                        <div style={{ display: 'flex', gap: '20px' }}>
                          <span>{selectedInvoice.priceFormatted || selectedInvoice.amount}</span>
                          <span style={{ fontWeight: 700, color: '#0F172A' }}>{selectedInvoice.priceFormatted || selectedInvoice.amount}</span>
                        </div>
                      </div>

                      {/* Summary Lines */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid #E2E8F0', paddingTop: '10px', fontSize: '11.5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Gross Contract Total</span>
                          <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedInvoice.priceFormatted || selectedInvoice.amount}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>TDS Deducted (1% Sec 194J)</span>
                          <span style={{ fontWeight: 600, color: '#DC2626' }}>
                            -₹{selectedInvoice.tdsDeduction?.toLocaleString('en-IN') || '250'}.00
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                          <span>Platform Fee</span>
                          <span style={{ fontWeight: 600, color: '#059669' }}>₹0.00 (Covered by Brand)</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '2px', fontSize: '13px' }}>
                          <span style={{ fontWeight: 800, color: '#0F172A' }}>Net Payout Due</span>
                          <span style={{ fontWeight: 900, color: '#0052FF' }}>
                            ₹{(selectedInvoice.netAmount || 24750).toLocaleString('en-IN')}.00
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Primary Action Button */}
                    {selectedInvoice.status === 'UNCLAIMED' ? (
                      <button
                        type="button"
                        onClick={() => handleClaimPayout(selectedInvoice.id)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          backgroundColor: '#0F172A',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#0052FF';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#0F172A';
                        }}
                      >
                        <span>Claim Payout to Bank (₹{(selectedInvoice.netAmount || 24750).toLocaleString('en-IN')})</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedReceiptTx(selectedInvoice)}
                        style={{
                          width: '100%',
                          padding: '12px',
                          backgroundColor: '#F1F5F9',
                          color: '#0F172A',
                          border: '1px solid #CBD5E1',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 6 2 18 2 18 9" />
                          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                          <rect x="6" y="14" width="12" height="8" />
                        </svg>
                        <span>Download Tax Invoice PDF</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ==================================================================== */}
        {/* TAB 4: SOCIAL MEDIA                                                  */}
        {/* ==================================================================== */}
        {activeTab === 'social-media' && (
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: '0 0 4px 0' }}>Connected Creator Channels</h2>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                Authenticate your official social media accounts to sync real-time follower counts and unlock higher brand rate cards.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
              {[
                { id: 'INSTAGRAM', name: 'Instagram Creator', icon: <InstagramIcon size={22} /> },
                { id: 'YOUTUBE', name: 'YouTube Partner Channel', icon: <YouTubeIcon size={22} /> },
                { id: 'X', name: 'X / Twitter Creator Account', icon: <XIcon size={22} /> },
              ].map((plat, idx) => {
                const account = socialAccounts.find((a) => a.platform === plat.id);
                return (
                  <div key={plat.id} style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx < 2 ? '1px solid #F1F5F9' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {plat.icon}
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>{plat.name}</div>
                        {account?.connected ? (
                          <div style={{ fontSize: '11.5px', color: '#64748B' }}>@{account.username} • {(account.audienceSize / 1000).toFixed(0)}k followers • {account.engagementRate}% ER</div>
                        ) : (
                          <div style={{ fontSize: '11.5px', color: '#94A3B8' }}>Not connected yet</div>
                        )}
                      </div>
                    </div>
                    {account?.connected ? (
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '4px 10px', borderRadius: '6px' }}>✓ Verified Active</span>
                    ) : (
                      <button type="button" onClick={() => handleConnectOAuth(plat.id)} style={{ backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '6px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Connect Channel</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 5: SETTINGS                                                      */}
        {/* ==================================================================== */}
        {activeTab === 'settings' && (
          <div style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>Creator Profile & Rates</h2>
            <div>
              <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Public Display Name</label>
              <input type="text" defaultValue={displayName} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '16px', fontSize: '13px' }} />
            </div>
            <button type="button" style={{ backgroundColor: '#0052FF', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Save Changes</button>
          </div>
        )}
      </main>

      {/* Fixed Mobile Bottom Navigation Bar */}
      <nav className="portal-mobile-bottom-nav">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`portal-bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <div>{tab.icon}</div>
              <span>{tab.label === 'Social Media' ? 'Socials' : tab.label}</span>
            </button>
          );
        })}
      </nav>



      {/* Buy Credits Modal */}
      {showBuyCreditsModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '440px', borderRadius: '20px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>⚡ Get Application Credits</h3>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>₹99 per Application Credit</div>
              </div>
              <button type="button" onClick={() => setShowBuyCreditsModal(false)} style={{ backgroundColor: '#F1F5F9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer', color: '#64748B' }}>✕</button>
            </div>

            <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.45, marginBottom: '16px' }}>
              You need credits to apply for high-paying brand campaigns. Choose a pack below:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              <button
                type="button"
                onClick={() => handleBuyCredits(2, 198)}
                style={{
                  padding: '14px 16px',
                  backgroundColor: '#EFF6FF',
                  border: '2px solid #0052FF',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0052FF' }}>2 Application Credits ⭐</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>₹99 per credit • Most Popular</div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>₹198</div>
              </button>

              <button
                type="button"
                onClick={() => handleBuyCredits(5, 495)}
                style={{
                  padding: '14px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>5 Application Credits</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>₹99 per credit</div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>₹495</div>
              </button>

              <button
                type="button"
                onClick={() => handleBuyCredits(10, 990)}
                style={{
                  padding: '14px 16px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>10 Application Credits</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>₹99 per credit • Best Value</div>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A' }}>₹990</div>
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowBuyCreditsModal(false)} style={{ padding: '10px 18px', backgroundColor: '#F1F5F9', border: 'none', borderRadius: '8px', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Place Your Bid & Submit Proposal Modal Popup */}
      {showApplyModal && selectedCampaign && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowApplyModal(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #E2E8F0',
              position: 'relative',
            }}
          >
            {/* Modal Body: Either Confirmation Screen or Place Bid Form */}
            {bidSubmittedSuccess ? (
              <div style={{ textAlign: 'center', padding: '6px 4px' }}>
                {/* SVG Success Checkmark Icon */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#ECFDF5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
                  Bid Placed Successfully!
                </h2>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#059669', fontSize: '13px', fontWeight: 700, margin: '0 0 20px 0' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>1 Application Credit Deducted</span>
                </div>

                {/* Flat Clean Key-Value List (No Card Container) */}
                <div
                  style={{
                    textAlign: 'left',
                    marginBottom: '20px',
                    borderTop: '1px solid #E2E8F0',
                    borderBottom: '1px solid #E2E8F0',
                    padding: '6px 0',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: '13px', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Campaign</span>
                    <span style={{ color: '#0F172A', fontWeight: 700, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedCampaign.title}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: '13px', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Brand Client</span>
                    <span style={{ color: '#0F172A', fontWeight: 700 }}>{selectedCampaign.brandName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: '13px', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Your Proposed Rate</span>
                    <span style={{ color: '#0052FF', fontWeight: 900 }}>{selectedCampaign.currencySymbol || '$'}{bidAmount || selectedCampaign.payoutAmount?.replace(/[^0-9]/g, '') || '45000'} {selectedCampaign.currencyCode || 'INR'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: '13px', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Delivery Time</span>
                    <span style={{ color: '#0F172A', fontWeight: 700 }}>{bidDays || '14'} Days</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', fontSize: '13px' }}>
                    <span style={{ color: '#64748B' }}>Remaining Balance</span>
                    <span style={{ color: applyCredits > 0 ? '#059669' : '#D97706', fontWeight: 800 }}>{applyCredits} Available Credit{applyCredits === 1 ? '' : 's'}</span>
                  </div>
                </div>

                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.45, marginBottom: '20px' }}>
                  The brand manager has received your verified bid and proposal. Track their response and milestones under your <strong>Collabs</strong> messenger tab.
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowApplyModal(false);
                      setBidSubmittedSuccess(false);
                      setSelectedCampaign(null);
                      handleTabChange('collabs');
                    }}
                    style={{
                      flex: '1 1 200px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '13px 20px',
                      fontSize: '13.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 82, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>View in Collabs &amp; Messages</span>
                    <span>→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowApplyModal(false);
                      setBidSubmittedSuccess(false);
                      setSelectedCampaign(null);
                    }}
                    style={{
                      padding: '13px 20px',
                      backgroundColor: '#F1F5F9',
                      color: '#334155',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '10px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <h2 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: 0 }}>
                        Place Your Bid &amp; Submit Proposal
                      </h2>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                        <span>1 Credit Required</span>
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>
                      Campaign: <strong>{selectedCampaign.title}</strong> by <strong>{selectedCampaign.brandName}</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    aria-label="Close modal"
                    style={{
                      backgroundColor: '#F1F5F9',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      cursor: 'pointer',
                      color: '#64748B',
                      flexShrink: 0,
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Rate and Days Inputs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Proposed Rate ({selectedCampaign.currencyCode || 'INR'})
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748B', fontSize: '14px' }}>
                        {selectedCampaign.currencySymbol || '$'}
                      </span>
                      <input
                        type="text"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={selectedCampaign.payoutAmount?.replace(/[^0-9]/g, '') || '45000'}
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 28px',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: '#0F172A',
                          border: '1px solid #CBD5E1',
                          borderRadius: '10px',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                      Delivery Time (Days)
                    </label>
                    <input
                      type="number"
                      value={bidDays}
                      onChange={(e) => setBidDays(e.target.value)}
                      placeholder="14"
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#0F172A',
                        border: '1px solid #CBD5E1',
                        borderRadius: '10px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Pitch Textarea */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                    Describe Your Proposal <span style={{ color: '#94A3B8', fontWeight: 500 }}>(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={proposalPitch}
                    onChange={(e) => setProposalPitch(e.target.value)}
                    placeholder="Outline your creative vision, camera equipment, or any specific angle you'd like to propose..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '13px',
                      color: '#0F172A',
                      border: '1px solid #CBD5E1',
                      borderRadius: '10px',
                      outline: 'none',
                      resize: 'vertical',
                      lineHeight: 1.5,
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* Flat Benefits Rows */}
                <div
                  style={{
                    padding: '10px 0',
                    marginBottom: '18px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#475569',
                    borderTop: '1px solid #F1F5F9',
                    borderBottom: '1px solid #F1F5F9',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Set your budget &amp; timeframe</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>100% Payment protection</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Direct client messaging</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Keep 100% of your earnings</span>
                  </div>
                </div>

                {/* Action Button with Credit Check */}
                {applyCredits > 0 ? (
                  <div>
                    <div style={{ fontSize: '12px', color: '#059669', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{applyCredits} Available Credit{applyCredits === 1 ? '' : 's'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={submitApplication}
                      style={{
                        width: '100%',
                        backgroundColor: '#0052FF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '13px 20px',
                        fontSize: '14px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 82, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      <span>Bid on this Project (Uses 1 Credit)</span>
                      <span>→</span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ padding: '14px 16px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', marginBottom: '14px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#991B1B', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#991B1B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>0 Application Credits Remaining</span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#7F1D1D', lineHeight: 1.45 }}>
                        You have used all available application credits. Redirect to the Payments page to purchase credits and submit your bid.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowApplyModal(false);
                        setSelectedCampaign(null);
                        handleTabChange('payments');
                      }}
                      style={{
                        width: '100%',
                        backgroundColor: '#0052FF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '13px 20px',
                        fontSize: '14px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(0, 82, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      <span>Go to Payments to Buy Credits</span>
                      <span>→</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Deliverable / Draft Link Submission Modal */}
      {showDeliverableModal && selectedCollab && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDeliverableModal(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxWidth: '520px',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #E2E8F0',
              position: 'relative',
            }}
          >
            {deliverableSubmitSuccess ? (
              <div style={{ textAlign: 'center', padding: '16px 8px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: '#ECFDF5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px auto',
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0' }}>
                  Deliverable Submitted to Brand!
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
                  Posted into the collaboration stream. The brand team has been notified for milestone review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitDeliverable}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', margin: '0 0 4px 0' }}>
                      Submit Campaign Deliverable
                    </h3>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>
                      To: <strong>{selectedCollab.brandName}</strong> ({selectedCollab.campaignTitle})
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDeliverableModal(false)}
                    style={{
                      background: '#F1F5F9',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#64748B',
                      cursor: 'pointer',
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Deliverable Type Select */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Deliverable Stage / Asset Type
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    {[
                      { id: 'DRAFT_VIDEO', label: '🎬 Video Draft', desc: 'YouTube Unlisted / Drive' },
                      { id: 'SCRIPT', label: '📝 Script & Concept', desc: 'Google Docs / PDF' },
                      { id: 'LIVE_POST', label: '🚀 Live Post URL', desc: 'Public Instagram / YT' },
                    ].map((t) => {
                      const isSel = deliverableType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setDeliverableType(t.id as any)}
                          style={{
                            padding: '10px 8px',
                            borderRadius: '10px',
                            border: isSel ? '2px solid #0052FF' : '1px solid #CBD5E1',
                            backgroundColor: isSel ? '#EFF6FF' : '#FFFFFF',
                            textAlign: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ fontSize: '12px', fontWeight: 700, color: isSel ? '#0052FF' : '#0F172A' }}>
                            {t.label}
                          </div>
                          <div style={{ fontSize: '10px', color: isSel ? '#0052FF' : '#94A3B8', marginTop: '2px' }}>
                            {t.desc}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Asset Title */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Asset / Video Title
                  </label>
                  <input
                    type="text"
                    value={deliverableTitle}
                    onChange={(e) => setDeliverableTitle(e.target.value)}
                    placeholder="e.g. 4K Camera Showcase & Low-Light Review Cut v1"
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12.5px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Public / Preview Link URL */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Asset Link / Video URL (Required) *
                  </label>
                  <input
                    type="url"
                    required
                    value={deliverableUrl}
                    onChange={(e) => setDeliverableUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=... or https://drive.google.com/..."
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12.5px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Notes for Brand Team */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Production Notes / Comments for Brand Review
                  </label>
                  <textarea
                    rows={3}
                    value={deliverableNotes}
                    onChange={(e) => setDeliverableNotes(e.target.value)}
                    placeholder="e.g. Rough cut with color grading complete. Audio benchmark starts at 01:45. Let me know if any cuts need tweaking."
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Submit Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px',
                      fontSize: '13px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0, 82, 255, 0.25)',
                    }}
                  >
                    Submit Deliverable to Brand →
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeliverableModal(false)}
                    style={{
                      backgroundColor: '#F1F5F9',
                      color: '#334155',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px 18px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bank Account Details & Verification Modal */}
      {showBankModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowBankModal(false);
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxWidth: '520px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#EFF6FF',
                    color: '#0052FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                  }}
                >
                  🏦
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {bankAccount ? 'Update Bank Account Details' : 'Link Bank Account for Payouts'}
                  </h3>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                    Instant automated penny-drop verification
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowBankModal(false)}
                style={{
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: '#64748B',
                }}
              >
                ✕
              </button>
            </div>

            {bankVerificationSuccess && (
              <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '12px 14px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✓</span>
                <span>{bankVerificationSuccess}</span>
              </div>
            )}

            <form onSubmit={handleVerifyBankAccount} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Account Holder Name */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Account Holder Full Name (as per Bank / PAN) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={bankForm.accountHolderName}
                  onChange={(e) => setBankForm({ ...bankForm, accountHolderName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Bank Name Selection */}
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Bank Name *
                </label>
                <select
                  value={bankForm.bankName}
                  onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '13px',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                  }}
                >
                  <option value="HDFC Bank Ltd.">HDFC Bank Ltd.</option>
                  <option value="ICICI Bank Ltd.">ICICI Bank Ltd.</option>
                  <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                  <option value="Axis Bank Ltd.">Axis Bank Ltd.</option>
                  <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  <option value="Punjab National Bank">Punjab National Bank</option>
                  <option value="Bank of Baroda">Bank of Baroda</option>
                  <option value="Other Commercial Bank">Other Commercial Bank</option>
                </select>
              </div>

              {/* Account Number & Confirm Account Number */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Account Number *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter account number"
                    value={bankForm.accountNumber}
                    onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value.replace(/\s+/g, '') })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      fontFamily: 'monospace',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Confirm Account Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Re-enter account number"
                    value={bankForm.confirmAccountNumber}
                    onChange={(e) => setBankForm({ ...bankForm, confirmAccountNumber: e.target.value.replace(/\s+/g, '') })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      fontFamily: 'monospace',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* IFSC Code & Account Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HDFC0000128"
                    value={bankForm.ifscCode}
                    onChange={(e) => setBankForm({ ...bankForm, ifscCode: e.target.value.toUpperCase().trim() })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Account Type *
                  </label>
                  <select
                    value={bankForm.accountType}
                    onChange={(e) => setBankForm({ ...bankForm, accountType: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                    }}
                  >
                    <option value="SAVINGS">Savings Account</option>
                    <option value="CURRENT">Current Account</option>
                  </select>
                </div>
              </div>

              {/* UPI ID & PAN Number */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    UPI ID / VPA (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. name@okhdfcbank"
                    value={bankForm.upiId}
                    onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value.trim() })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                    PAN Number (Tax Compliance) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ABCDE1234F"
                    value={bankForm.panNumber}
                    onChange={(e) => setBankForm({ ...bankForm, panNumber: e.target.value.toUpperCase().trim() })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '13px',
                      fontFamily: 'monospace',
                      textTransform: 'uppercase',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Compliance & Security Callout */}
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11.5px',
                  color: '#475569',
                }}
              >
                <span>🔒</span>
                <span>
                  Encrypted & RBI-compliant penny-drop verification will be executed to validate account title match before enabling 1-click payouts.
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="submit"
                  disabled={isVerifyingBank}
                  style={{
                    flex: 1,
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px 18px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: isVerifyingBank ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 6px rgba(0, 82, 255, 0.3)',
                  }}
                >
                  {isVerifyingBank ? (
                    <>
                      <div
                        style={{
                          width: '14px',
                          height: '14px',
                          border: '2px solid #FFFFFF',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 0.8s linear infinite',
                        }}
                      />
                      <span>Executing Penny-Drop Verification...</span>
                    </>
                  ) : (
                    <span>Verify & Link Bank Account</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowBankModal(false)}
                  style={{
                    backgroundColor: '#F1F5F9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px 18px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payout Tax Invoice & Receipt Modal */}
      {selectedReceiptTx && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedReceiptTx(null);
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid #E2E8F0',
            }}
          >
            {/* Receipt Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '18px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 900, color: '#0052FF' }}>TIA</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>Creator Disbursal Slip</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  Invoice Ref: {selectedReceiptTx.invoiceNumber || 'INV-TIA-2026-0891'}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#059669',
                    backgroundColor: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  ✓ Disbursed
                </span>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                  {selectedReceiptTx.disbursedAt || 'Aug 20, 2026'}
                </div>
              </div>
            </div>

            {/* Campaign & Beneficiary Info */}
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', padding: '14px 16px', marginBottom: '18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div>
                <div style={{ color: '#64748B', fontSize: '11px', fontWeight: 600 }}>Brand Client</div>
                <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{selectedReceiptTx.mediaName}</div>
                <div style={{ color: '#475569', fontSize: '11px' }}>{selectedReceiptTx.campaign}</div>
              </div>

              <div>
                <div style={{ color: '#64748B', fontSize: '11px', fontWeight: 600 }}>Disbursed To</div>
                <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                  {bankAccount?.accountHolderName || 'Sarah Jenkins'}
                </div>
                <div style={{ color: '#475569', fontSize: '11px' }}>
                  {bankAccount?.bankName || 'HDFC Bank'} (•••• {bankAccount?.accountNumber ? bankAccount.accountNumber.slice(-4) : '4829'})
                </div>
              </div>
            </div>

            {/* Financial Ledger Breakdown */}
            <div style={{ borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '12px 0', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px' }}>
                <span style={{ color: '#475569' }}>Gross Campaign Contract Rate</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{selectedReceiptTx.amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '13px' }}>
                <span style={{ color: '#475569' }}>TDS Deducted (1% under Sec 194J)</span>
                <span style={{ fontWeight: 700, color: '#64748B' }}>-₹{selectedReceiptTx.tdsDeduction || 250}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 2px 0', fontSize: '15px', borderTop: '1px dashed #E2E8F0', marginTop: '6px' }}>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>Net Amount Disbursed</span>
                <span style={{ fontWeight: 900, color: '#0052FF' }}>
                  ₹{(selectedReceiptTx.netAmount || 24750).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Bank UTR & Tax Metadata */}
            <div style={{ fontSize: '11.5px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px' }}>
              <div>
                <strong>Bank UTR Reference:</strong>{' '}
                <span style={{ fontFamily: 'monospace', color: '#0F172A', fontWeight: 700 }}>
                  {selectedReceiptTx.utrNumber || 'HDFC9821049219'}
                </span>
              </div>
              <div>
                <strong>Disbursal Mode:</strong> IMPS / Direct RTGS Settlement
              </div>
              <div>
                <strong>Tax Certificate Form 16A:</strong> Available at quarter end under Settings
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  flex: 1,
                  backgroundColor: '#0052FF',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                <span>Print / Download Slip</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedReceiptTx(null)}
                style={{
                  backgroundColor: '#F1F5F9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 18px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Live Realtime Toast Popup */}
      {liveToast && (
        <div
          onClick={() => handleNotificationClick(liveToast)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #E2E8F0',
            padding: '14px 16px',
            maxWidth: '360px',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            cursor: 'pointer',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              color: '#0052FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: '15px',
            }}
          >
            {liveToast.type === 'ESCROW' ? '🛡️' : liveToast.type === 'MATCH' ? '⭐' : liveToast.type === 'CREDIT' ? '⚡' : liveToast.type === 'PROPOSAL' ? '📝' : '🔔'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0F172A', marginBottom: '2px' }}>
              {liveToast.title}
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.35, marginBottom: '6px' }}>
              {liveToast.message}
            </div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#0052FF' }}>
              {liveToast.actionLabel || 'View Details →'}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLiveToast(null);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#94A3B8',
              fontSize: '13px',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default function CreatorPortalPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading Creator Portal...</div>}>
      <CreatorPortalContent />
    </Suspense>
  );
}
