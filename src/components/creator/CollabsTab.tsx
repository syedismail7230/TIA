import React from 'react';
import { CollabFilter, CreatorCollab, TabType } from './types';

interface CollabsTabProps {
  collabFilter: CollabFilter;
  setCollabFilter: (f: CollabFilter) => void;
  collabFilterDropdownOpen: boolean;
  setCollabFilterDropdownOpen: (b: boolean | ((prev: boolean) => boolean)) => void;
  collabSearchQuery: string;
  setCollabSearchQuery: (q: string) => void;
  collabs: CreatorCollab[];
  setCollabs: React.Dispatch<React.SetStateAction<CreatorCollab[]>>;
  selectedCollabId: string;
  setSelectedCollabId: (id: string) => void;
  mobileChatViewActive: boolean;
  setMobileChatViewActive: (b: boolean) => void;
  replyMessage: string;
  setReplyMessage: (m: string) => void;
  isBrandTyping: boolean;
  handleSendMessage: (customText?: string) => void;
  handleToggleArchiveCollab: (id: string) => void;
  handleAcceptDeal: (id: string) => void;
  setShowDeliverableModal: (b: boolean) => void;
  handleTabChange: (tab: TabType) => void;
}

export function CollabsTab({
  collabFilter,
  setCollabFilter,
  collabFilterDropdownOpen,
  setCollabFilterDropdownOpen,
  collabSearchQuery,
  setCollabSearchQuery,
  collabs,
  setCollabs,
  selectedCollabId,
  setSelectedCollabId,
  mobileChatViewActive,
  setMobileChatViewActive,
  replyMessage,
  setReplyMessage,
  isBrandTyping,
  handleSendMessage,
  handleToggleArchiveCollab,
  handleAcceptDeal,
  setShowDeliverableModal,
  handleTabChange,
}: CollabsTabProps) {
  const selectedCollab = collabs.find((c) => c.id === selectedCollabId) || collabs[0];

  return (
    <>

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
        
    </>
  );
}
