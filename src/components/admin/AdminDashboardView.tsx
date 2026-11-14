'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Users,
  ShieldAlert,
  Sparkles,
  Building2,
  Briefcase,
  CreditCard,
  Scale,
  ShieldCheck,
  FileText,
  Search,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  X,
  LogOut,
  ExternalLink,
  Sliders,
  DollarSign,
  TrendingUp,
  Activity,
  Check,
  ChevronRight,
  Filter
} from 'lucide-react';

interface AdminDashboardViewProps {
  initialUser: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export function AdminDashboardView({ initialUser }: AdminDashboardViewProps) {
  const router = useRouter();

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'USERS' | 'CREATORS' | 'ORGS' | 'CAMPAIGNS' | 'FINANCIALS' | 'DISPUTES' | 'MODERATION' | 'AUDIT'
  >('OVERVIEW');

  // Loading & Global States
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Tab Data States
  const [overview, setOverview] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [creators, setCreators] = useState<any[]>([]);
  const [orgs, setOrgs] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [disputes, setDisputes] = useState<any[]>([]);
  const [moderation, setModeration] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // -------------------------------------------------------------
  // Data Fetching Handlers
  // -------------------------------------------------------------
  const fetchOverview = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/overview');
      const data = await res.json();
      if (data.success) setOverview(data);
    } catch (e: any) {
      console.error(e);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?search=${encodeURIComponent(searchTerm)}&role=${roleFilter}`);
      const data = await res.json();
      if (data.success) setUsers(data.users || []);
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, roleFilter]);

  const fetchCreators = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/creators?search=${encodeURIComponent(searchTerm)}&status=${statusFilter}`);
      const data = await res.json();
      if (data.success) setCreators(data.creators || []);
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter]);

  const fetchOrgs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/organizations?search=${encodeURIComponent(searchTerm)}&status=${statusFilter}`);
      const data = await res.json();
      if (data.success) setOrgs(data.organizations || []);
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter]);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/campaigns?search=${encodeURIComponent(searchTerm)}&status=${statusFilter}`);
      const data = await res.json();
      if (data.success) setCampaigns(data.campaigns || []);
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter]);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/transactions?status=${statusFilter}`);
      const data = await res.json();
      if (data.success) setTransactions(data.transactions || []);
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  const fetchDisputes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/disputes?status=${statusFilter}`);
      const data = await res.json();
      if (data.success) setDisputes(data.disputes || []);
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  const fetchModeration = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/moderation');
      const data = await res.json();
      if (data.success) setModeration(data.messages || []);
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAuditLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/audit-logs');
      const data = await res.json();
      if (data.success) setAuditLogs(data.logs || []);
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync active tab
  useEffect(() => {
    if (activeTab === 'OVERVIEW') fetchOverview();
    if (activeTab === 'USERS') fetchUsers();
    if (activeTab === 'CREATORS') fetchCreators();
    if (activeTab === 'ORGS') fetchOrgs();
    if (activeTab === 'CAMPAIGNS') fetchCampaigns();
    if (activeTab === 'FINANCIALS') fetchTransactions();
    if (activeTab === 'DISPUTES') fetchDisputes();
    if (activeTab === 'MODERATION') fetchModeration();
    if (activeTab === 'AUDIT') fetchAuditLogs();
  }, [activeTab, fetchOverview, fetchUsers, fetchCreators, fetchOrgs, fetchCampaigns, fetchTransactions, fetchDisputes, fetchModeration, fetchAuditLogs]);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (e) {
      router.push('/login');
    }
  };

  // -------------------------------------------------------------
  // CRUD Actions Execution
  // -------------------------------------------------------------
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const isEdit = Boolean(modalData.id);
      const url = '/api/admin/users';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modalData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save user');

      showToast(`User ${isEdit ? 'updated' : 'created'} successfully!`);
      setModalType(null);
      fetchUsers();
      fetchOverview();
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this user and all associated records?')) return;
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete user');
      showToast('User deleted successfully');
      fetchUsers();
      fetchOverview();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleSaveCreator = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const isEdit = Boolean(modalData.id);
      const url = '/api/admin/creators';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modalData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save creator');

      showToast(`Creator ${isEdit ? 'updated' : 'created'} successfully!`);
      setModalType(null);
      fetchCreators();
      fetchOverview();
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteCreator = async (id: string) => {
    if (!confirm('Are you sure you want to delete this creator profile?')) return;
    try {
      const res = await fetch(`/api/admin/creators?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete creator');
      showToast('Creator deleted successfully');
      fetchCreators();
      fetchOverview();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleSaveOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const isEdit = Boolean(modalData.id);
      const url = '/api/admin/organizations';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modalData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save organization');

      showToast(`Organization ${isEdit ? 'updated' : 'created'} successfully!`);
      setModalType(null);
      fetchOrgs();
      fetchOverview();
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteOrg = async (id: string) => {
    if (!confirm('Are you sure you want to delete this organization and brand profile?')) return;
    try {
      const res = await fetch(`/api/admin/organizations?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete organization');
      showToast('Organization deleted successfully');
      fetchOrgs();
      fetchOverview();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleSaveCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const isEdit = Boolean(modalData.id);
      const url = '/api/admin/campaigns';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modalData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save campaign');

      showToast(`Campaign ${isEdit ? 'updated' : 'created'} successfully!`);
      setModalType(null);
      fetchCampaigns();
      fetchOverview();
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      const res = await fetch(`/api/admin/campaigns?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete campaign');
      showToast('Campaign deleted successfully');
      fetchCampaigns();
      fetchOverview();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleUpdateTxStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/transactions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update transaction status');
      showToast(`Transaction marked as ${newStatus}`);
      fetchTransactions();
      fetchOverview();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleResolveDispute = async (id: string, verdict: string, resolutionNotes: string) => {
    try {
      const res = await fetch('/api/admin/disputes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: verdict, resolutionNotes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to resolve dispute');
      showToast(`Dispute resolved with verdict: ${verdict}`);
      fetchDisputes();
      fetchOverview();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleModerateMessage = async (id: string, action: 'DISMISS' | 'REDACT') => {
    try {
      const res = await fetch('/api/admin/moderation', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to moderate message');
      showToast(`Flagged message ${action === 'DISMISS' ? 'cleared' : 'redacted'}`);
      fetchModeration();
      fetchOverview();
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', color: '#0F172A', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Alert */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          zIndex: 9999,
          background: toast.type === 'error' ? '#EF4444' : '#0052FF',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
          fontSize: '13.5px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'slideIn 0.25s ease',
        }}>
          {toast.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* TOP COMMAND BAR */}
      <header style={{
        background: '#0B0F19',
        borderBottom: '1px solid #1E293B',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/logo-cropped.png" alt="TIA Logo" style={{ height: '32px', width: 'auto' }} />
          </Link>
          <div style={{ height: '24px', width: '1px', background: '#334155' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                GOVERNANCE &amp; COMMAND CENTER
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                background: '#1E3A8A',
                color: '#60A5FA',
                padding: '2px 8px',
                borderRadius: '9999px',
                border: '1px solid #2563EB',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#60A5FA', animation: 'pulse 1.5s infinite' }} />
                LIVE PRODUCTION
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>
              The Influencer&apos;s Agency • Full Relational Control &amp; Settlement System
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#E2E8F0',
          }}>
            <ShieldCheck size={14} color="#10B981" />
            <span>Supabase Pooler: <strong>Connected</strong></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#FFFFFF' }}>{initialUser.name || 'TIA Administrator'}</div>
              <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 600 }}>{initialUser.role}</div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#F87171',
                padding: '7px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* SECONDARY NAVIGATION BAR */}
      <nav style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            { id: 'OVERVIEW', label: 'Platform Pulse', icon: Activity },
            { id: 'USERS', label: 'Users', icon: Users, count: overview?.stats?.userCount },
            { id: 'CREATORS', label: 'Verified Creators', icon: Sparkles, count: overview?.stats?.creatorCount },
            { id: 'ORGS', label: 'Brands & Orgs', icon: Building2, count: overview?.stats?.orgCount },
            { id: 'CAMPAIGNS', label: 'Campaigns', icon: Briefcase, count: overview?.stats?.campaignCount },
            { id: 'FINANCIALS', label: 'Escrow & Financials', icon: CreditCard },
            { id: 'DISPUTES', label: 'Disputes & Governance', icon: Scale, count: overview?.stats?.disputeCount, badgeColor: '#EF4444' },
            { id: 'MODERATION', label: 'Moderation Queue', icon: ShieldAlert, count: overview?.stats?.flaggedCount, badgeColor: '#F59E0B' },
            { id: 'AUDIT', label: 'System Audit Log', icon: FileText },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setSearchTerm('');
                  setStatusFilter('ALL');
                  setRoleFilter('ALL');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: active ? '3px solid #0052FF' : '3px solid transparent',
                  padding: '16px 14px',
                  fontSize: '13px',
                  fontWeight: active ? 700 : 600,
                  color: active ? '#0052FF' : '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={16} color={active ? '#0052FF' : '#64748B'} />
                <span>{item.label}</span>
                {item.count !== undefined && item.count !== null && item.count > 0 && (
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    background: item.badgeColor || '#EFF6FF',
                    color: item.badgeColor ? '#FFFFFF' : '#0052FF',
                    padding: '1px 6px',
                    borderRadius: '9999px',
                  }}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              if (activeTab === 'OVERVIEW') fetchOverview();
              if (activeTab === 'USERS') fetchUsers();
              if (activeTab === 'CREATORS') fetchCreators();
              if (activeTab === 'ORGS') fetchOrgs();
              if (activeTab === 'CAMPAIGNS') fetchCampaigns();
              if (activeTab === 'FINANCIALS') fetchTransactions();
              if (activeTab === 'DISPUTES') fetchDisputes();
              if (activeTab === 'MODERATION') fetchModeration();
              if (activeTab === 'AUDIT') fetchAuditLogs();
              showToast('Data refreshed');
            }}
            style={{
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '7px 12px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT REGION */}
      <main style={{ flex: 1, padding: '28px', maxWidth: '1600px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        {/* =========================================================
            TAB 1: OVERVIEW & PLATFORM PULSE
           ========================================================= */}
        {activeTab === 'OVERVIEW' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Executive Platform Pulse</h1>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                Real-time financial volume, active escrow guarantees, settlement commission, and entity health.
              </p>
            </div>

            {/* KPI Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Gross Platform Volume</span>
                  <div style={{ background: '#EFF6FF', padding: '8px', borderRadius: '10px' }}><DollarSign size={18} color="#0052FF" /></div>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, marginTop: '12px', color: '#0F172A' }}>
                  ₹{((overview?.stats?.totalVolumeMinor || 0) / 100).toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 600, marginTop: '4px' }}>
                  100% Escrow protected contracts
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>TIA Commission Earned (5%)</span>
                  <div style={{ background: '#ECFDF5', padding: '8px', borderRadius: '10px' }}><TrendingUp size={18} color="#059669" /></div>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, marginTop: '12px', color: '#059669' }}>
                  ₹{((overview?.stats?.totalCommissionMinor || 0) / 100).toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                  Auto-settled upon deliverable approval
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Escrow Locked Guarantee</span>
                  <div style={{ background: '#FEF3C7', padding: '8px', borderRadius: '10px' }}><CreditCard size={18} color="#D97706" /></div>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, marginTop: '12px', color: '#D97706' }}>
                  ₹{((overview?.stats?.escrowLockedMinor || 0) / 100).toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                  Secured pending campaign milestone approvals
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Total Registered Users</span>
                  <div style={{ background: '#F1F5F9', padding: '8px', borderRadius: '10px' }}><Users size={18} color="#475569" /></div>
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, marginTop: '12px', color: '#0F172A' }}>
                  {overview?.stats?.userCount || 0}
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                  {overview?.stats?.creatorCount || 0} Creators • {overview?.stats?.orgCount || 0} Brands
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              padding: '16px 20px',
              marginBottom: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Quick Operational Actions:</span>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    setModalData({ email: '', name: '', role: 'CREATOR', country: 'India', password: '', emailVerified: true });
                    setModalType('USER');
                  }}
                  style={{
                    background: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Plus size={14} /> New User
                </button>

                <button
                  onClick={() => {
                    setModalData({ name: '', legalName: '', businessCategory: 'Consumer Tech', country: 'India', verificationStatus: 'VERIFIED' });
                    setModalType('ORG');
                  }}
                  style={{
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Building2 size={14} /> New Brand / Org
                </button>

                <button
                  onClick={() => {
                    setModalData({ title: '', description: '', budget: '50000', category: 'Tech & Gadgets', objective: 'AWARENESS', status: 'PUBLISHED', organizationId: orgs[0]?.id || '' });
                    setModalType('CAMPAIGN');
                  }}
                  style={{
                    background: '#10B981',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Briefcase size={14} /> New Campaign
                </button>

                <button
                  onClick={() => {
                    setModalData({ grossAmount: '10000', type: 'BONUS_PAYOUT', status: 'SETTLED', description: 'Administrative settlement' });
                    setModalType('TRANSACTION');
                  }}
                  style={{
                    background: '#6366F1',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <CreditCard size={14} /> Record Manual Settlement
                </button>
              </div>
            </div>

            {/* Split Grids: Recent Logins & Security Audit */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Recent User Registrations</h3>
                  <button onClick={() => setActiveTab('USERS')} style={{ background: 'none', border: 'none', color: '#0052FF', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>View All →</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(overview?.recentUsers || []).map((u: any) => (
                    <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#F8FAFC', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{u.name}</div>
                        <div style={{ fontSize: '11.5px', color: '#64748B' }}>{u.email}</div>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, background: '#EFF6FF', color: '#0052FF', padding: '2px 8px', borderRadius: '6px' }}>
                        {u.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Live Security &amp; Audit Trail</h3>
                  <button onClick={() => setActiveTab('AUDIT')} style={{ background: 'none', border: 'none', color: '#0052FF', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>View Full Stream →</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(overview?.recentLogs || []).map((log: any) => (
                    <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#F8FAFC', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>{log.action}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{log.entityType} • {new Date(log.createdAt).toLocaleTimeString()}</div>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, background: '#E2E8F0', color: '#475569', padding: '2px 8px', borderRadius: '6px' }}>
                        {log.userRole || 'SYSTEM'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: USERS MANAGEMENT (CRUD)
           ========================================================= */}
        {activeTab === 'USERS' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Platform Users &amp; Identities</h1>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>Manage roles, credentials, verification statuses, and account lifetimes.</p>
              </div>
              <button
                onClick={() => {
                  setModalData({ email: '', name: '', role: 'CREATOR', country: 'India', password: '', emailVerified: true });
                  setModalType('USER');
                }}
                style={{
                  background: '#0052FF',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} /> Add User
              </button>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '6px 12px', flex: 1, minWidth: '220px' }}>
                <Search size={16} color="#64748B" />
                <input
                  type="text"
                  placeholder="Search by name, email, or user ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px' }}
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '6px 12px', fontSize: '13px', fontWeight: 600 }}
              >
                <option value="ALL">All Roles</option>
                <option value="CREATOR">CREATOR</option>
                <option value="BRAND_ADMIN">BRAND_ADMIN</option>
                <option value="BRAND_USER">BRAND_USER</option>
                <option value="TIA_SUPER_ADMIN">TIA_SUPER_ADMIN</option>
                <option value="TIA_SUPPORT">TIA_SUPPORT</option>
                <option value="TIA_FINANCE">TIA_FINANCE</option>
              </select>
            </div>

            {/* Table */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 16px' }}>User / Identity</th>
                    <th style={{ padding: '14px 16px' }}>Assigned Role</th>
                    <th style={{ padding: '14px 16px' }}>Email Verified</th>
                    <th style={{ padding: '14px 16px' }}>Profile Linkage</th>
                    <th style={{ padding: '14px 16px' }}>Registered</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{u.name}</div>
                        <div style={{ fontSize: '11.5px', color: '#64748B' }}>{u.email}</div>
                        <div style={{ fontSize: '10.5px', color: '#94A3B8', fontFamily: 'monospace' }}>{u.id}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: u.role.startsWith('TIA_') ? '#FEF2F2' : u.role.startsWith('BRAND_') ? '#F0FDF4' : '#EFF6FF',
                          color: u.role.startsWith('TIA_') ? '#DC2626' : u.role.startsWith('BRAND_') ? '#16A34A' : '#0052FF',
                        }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        {u.emailVerified ? (
                          <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '12px' }}>
                            <CheckCircle2 size={14} /> Verified
                          </span>
                        ) : (
                          <span style={{ color: '#D97706', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, fontSize: '12px' }}>
                            <AlertTriangle size={14} /> Pending
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '12px', color: '#475569' }}>
                        {u.creatorProfile ? (
                          <span style={{ color: '#0052FF', fontWeight: 600 }}>Creator: @{u.creatorProfile.username}</span>
                        ) : u.orgMemberships?.length > 0 ? (
                          <span style={{ color: '#16A34A', fontWeight: 600 }}>Brand: {u.orgMemberships[0]?.organization?.name}</span>
                        ) : (
                          <span style={{ color: '#94A3B8' }}>Unattached</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748B' }}>
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => {
                              setModalData({ id: u.id, name: u.name, email: u.email, role: u.role, country: u.country || 'India', emailVerified: u.emailVerified });
                              setModalType('USER');
                            }}
                            title="Edit User"
                            style={{ background: '#F1F5F9', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#334155' }}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            title="Delete User"
                            style={{ background: '#FEE2E2', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#DC2626' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                        No users match the selected query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: CREATORS MANAGEMENT (CRUD & SCORES OVERRIDE)
           ========================================================= */}
        {activeTab === 'CREATORS' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Creator Portfolios &amp; Trust Matrix</h1>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>Adjust Intelligence Scores, BotShield verification badges, and commercial availability.</p>
              </div>
              <button
                onClick={() => {
                  setModalData({ displayName: '', username: '', bio: '', country: 'India', verificationStatus: 'VERIFIED_CREATOR', userId: users[0]?.id || '' });
                  setModalType('CREATOR');
                }}
                style={{
                  background: '#0052FF',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} /> Link Creator
              </button>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '6px 12px', flex: 1, minWidth: '220px' }}>
                <Search size={16} color="#64748B" />
                <input
                  type="text"
                  placeholder="Search by display name, @handle, or account email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: 'none', outline: 'none', width: '100%', fontSize: '13px' }}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '6px 12px', fontSize: '13px', fontWeight: 600 }}
              >
                <option value="ALL">All Verification Tiers</option>
                <option value="VERIFIED_CREATOR">VERIFIED_CREATOR</option>
                <option value="IDENTITY_VERIFIED">IDENTITY_VERIFIED</option>
                <option value="EMAIL_VERIFIED">EMAIL_VERIFIED</option>
                <option value="UNVERIFIED">UNVERIFIED</option>
              </select>
            </div>

            {/* Table */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 16px' }}>Creator / Handle</th>
                    <th style={{ padding: '14px 16px' }}>Verification Status</th>
                    <th style={{ padding: '14px 16px' }}>Intelligence Score</th>
                    <th style={{ padding: '14px 16px' }}>Reputation / Safety</th>
                    <th style={{ padding: '14px 16px' }}>Availability</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {creators.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{c.displayName}</div>
                        <div style={{ fontSize: '12px', color: '#0052FF', fontWeight: 600 }}>@{c.username}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>User: {c.user?.email}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: c.verificationStatus === 'VERIFIED_CREATOR' ? '#ECFDF5' : '#EFF6FF',
                          color: c.verificationStatus === 'VERIFIED_CREATOR' ? '#059669' : '#0052FF',
                        }}>
                          {c.verificationStatus}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 800, fontSize: '14px', color: '#0052FF' }}>{c.intelligenceScore}/100</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontSize: '12px' }}>
                          Rep: <strong>{c.reputationScore}%</strong> • Safety: <strong>{c.brandSafetyScore}%</strong>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: c.availabilityStatus === 'AVAILABLE' ? '#F0FDF4' : '#FEF2F2',
                          color: c.availabilityStatus === 'AVAILABLE' ? '#16A34A' : '#DC2626',
                        }}>
                          {c.availabilityStatus}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => {
                              setModalData(c);
                              setModalType('CREATOR');
                            }}
                            title="Edit Creator & Scores"
                            style={{ background: '#F1F5F9', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#334155' }}
                          >
                            <Sliders size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteCreator(c.id)}
                            title="Delete Creator Profile"
                            style={{ background: '#FEE2E2', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#DC2626' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {creators.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                        No creators found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 4: BRANDS & ORGANIZATIONS (CRUD)
           ========================================================= */}
        {activeTab === 'ORGS' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Brands &amp; Enterprise Organizations</h1>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>Review enterprise verification, legal entities, member tiers, and payment reliability.</p>
              </div>
              <button
                onClick={() => {
                  setModalData({ name: '', legalName: '', businessCategory: 'Fashion & Lifestyle', country: 'India', verificationStatus: 'VERIFIED' });
                  setModalType('ORG');
                }}
                style={{
                  background: '#0052FF',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} /> New Organization
              </button>
            </div>

            {/* Table */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 16px' }}>Organization / Legal Entity</th>
                    <th style={{ padding: '14px 16px' }}>Category / Industry</th>
                    <th style={{ padding: '14px 16px' }}>Verification Status</th>
                    <th style={{ padding: '14px 16px' }}>Payment Score</th>
                    <th style={{ padding: '14px 16px' }}>Active Campaigns</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orgs.map((o) => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{o.name}</div>
                        <div style={{ fontSize: '11.5px', color: '#64748B' }}>{o.legalName || 'Unregistered Legal Name'}</div>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#475569' }}>
                        {o.businessCategory || 'General'}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: o.verificationStatus === 'VERIFIED' ? '#ECFDF5' : '#EFF6FF',
                          color: o.verificationStatus === 'VERIFIED' ? '#059669' : '#0052FF',
                        }}>
                          {o.verificationStatus}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <strong style={{ color: '#059669' }}>{o.paymentReliabilityScore}%</strong>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#0F172A', fontWeight: 600 }}>
                        {o._count?.campaigns || 0} campaigns
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => {
                              setModalData(o);
                              setModalType('ORG');
                            }}
                            title="Edit Organization"
                            style={{ background: '#F1F5F9', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#334155' }}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteOrg(o.id)}
                            title="Delete Organization"
                            style={{ background: '#FEE2E2', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#DC2626' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {orgs.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                        No organizations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 5: CAMPAIGNS & DELIVERABLES (CRUD)
           ========================================================= */}
        {activeTab === 'CAMPAIGNS' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Campaigns &amp; Deal Flow</h1>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>Force state transitions, approve escrow contracts, and modify deal parameters.</p>
              </div>
              <button
                onClick={() => {
                  setModalData({ title: '', description: '', budget: '50000', category: 'Tech & AI', objective: 'AWARENESS', status: 'PUBLISHED', organizationId: orgs[0]?.id || '' });
                  setModalType('CAMPAIGN');
                }}
                style={{
                  background: '#0052FF',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} /> New Campaign
              </button>
            </div>

            {/* Table */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 16px' }}>Campaign Title</th>
                    <th style={{ padding: '14px 16px' }}>Hosting Brand</th>
                    <th style={{ padding: '14px 16px' }}>Budget (Gross)</th>
                    <th style={{ padding: '14px 16px' }}>Lifecycle Status</th>
                    <th style={{ padding: '14px 16px' }}>Contracts / Deliverables</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((camp) => (
                    <tr key={camp.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{camp.title}</div>
                        <div style={{ fontSize: '11.5px', color: '#64748B' }}>{camp.category} • {camp.objective}</div>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#475569' }}>
                        {camp.organization?.name || 'Unassigned Org'}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#0F172A' }}>
                        ₹{(camp.budget / 100).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: camp.status === 'PUBLISHED' || camp.status === 'IN_PROGRESS' ? '#ECFDF5' : '#F1F5F9',
                          color: camp.status === 'PUBLISHED' || camp.status === 'IN_PROGRESS' ? '#059669' : '#475569',
                        }}>
                          {camp.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748B' }}>
                        {camp._count?.contracts || 0} active • {camp._count?.deliverables || 0} items
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => {
                              setModalData({ ...camp, budget: camp.budget / 100 });
                              setModalType('CAMPAIGN');
                            }}
                            title="Edit Campaign & Status"
                            style={{ background: '#F1F5F9', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#334155' }}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteCampaign(camp.id)}
                            title="Delete Campaign"
                            style={{ background: '#FEE2E2', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#DC2626' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {campaigns.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                        No campaigns found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 6: FINANCIALS & ESCROW MANAGEMENT
           ========================================================= */}
        {activeTab === 'FINANCIALS' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Escrow Ledger &amp; Platform Settlements</h1>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>Inspect transactions, trigger manual settlements, and refund escrow vaults.</p>
              </div>
              <button
                onClick={() => {
                  setModalData({ grossAmount: '25000', type: 'ADMIN_ADJUSTMENT', status: 'SETTLED', description: 'Manual settlement' });
                  setModalType('TRANSACTION');
                }}
                style={{
                  background: '#0052FF',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} /> Record Transaction
              </button>
            </div>

            {/* Table */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 16px' }}>Transaction ID</th>
                    <th style={{ padding: '14px 16px' }}>Type</th>
                    <th style={{ padding: '14px 16px' }}>Gross Contract</th>
                    <th style={{ padding: '14px 16px' }}>TIA Fee (5%)</th>
                    <th style={{ padding: '14px 16px' }}>Net Creator Payout</th>
                    <th style={{ padding: '14px 16px' }}>Status</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Admin Overrides</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#0F172A', fontFamily: 'monospace' }}>{tx.id}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{new Date(tx.createdAt).toLocaleString()}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, background: '#F1F5F9', padding: '3px 8px', borderRadius: '6px' }}>
                          {tx.type}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                        ₹{(tx.grossAmount / 100).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0052FF' }}>
                        ₹{(tx.commissionAmount / 100).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#059669' }}>
                        ₹{(tx.netAmount / 100).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: tx.status === 'SETTLED' ? '#ECFDF5' : tx.status === 'ESCROW_LOCKED' ? '#FEF3C7' : '#FEE2E2',
                          color: tx.status === 'SETTLED' ? '#059669' : tx.status === 'ESCROW_LOCKED' ? '#D97706' : '#DC2626',
                        }}>
                          {tx.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          {tx.status !== 'SETTLED' && (
                            <button
                              onClick={() => handleUpdateTxStatus(tx.id, 'SETTLED')}
                              style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Force Settle
                            </button>
                          )}
                          {tx.status !== 'REFUNDED' && (
                            <button
                              onClick={() => handleUpdateTxStatus(tx.id, 'REFUNDED')}
                              style={{ background: '#FEE2E2', border: '1px solid #FECACA', color: '#DC2626', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Refund Brand
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {transactions.length === 0 && !loading && (
                    <tr>
                      <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                        No transactions recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 7: DISPUTES & GOVERNANCE
           ========================================================= */}
        {activeTab === 'DISPUTES' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Dispute Arbitration &amp; Governance</h1>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>Review non-delivery, creative divergence, and contractual breaches. Admin verdicts are final.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 16px' }}>Campaign</th>
                    <th style={{ padding: '14px 16px' }}>Initiator</th>
                    <th style={{ padding: '14px 16px' }}>Claim / Reason</th>
                    <th style={{ padding: '14px 16px' }}>Claimed Amount</th>
                    <th style={{ padding: '14px 16px' }}>Status</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Arbitration Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {disputes.map((d) => (
                    <tr key={d.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                        {d.campaign?.title || 'Unknown Campaign'}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 600 }}>{d.initiator?.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{d.initiator?.email}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, background: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: '6px' }}>
                          {d.reason}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 700 }}>
                        ₹{((d.claimedAmount || 0) / 100).toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: d.status === 'RESOLVED' || d.status.startsWith('RESOLVED_') ? '#ECFDF5' : '#FEE2E2',
                          color: d.status === 'RESOLVED' || d.status.startsWith('RESOLVED_') ? '#059669' : '#DC2626',
                        }}>
                          {d.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => handleResolveDispute(d.id, 'RESOLVED_CREATOR', 'Administrator determined creator satisfied deliverable requirements.')}
                            style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Favor Creator
                          </button>
                          <button
                            onClick={() => handleResolveDispute(d.id, 'RESOLVED_BRAND', 'Administrator determined brand fulfilled contract and deliverable was deficient.')}
                            style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#0052FF', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Favor Brand
                          </button>
                          <button
                            onClick={() => handleResolveDispute(d.id, 'SPLIT_50_50', 'Administrator determined mutual partial fulfillment. 50/50 escrow split.')}
                            style={{ background: '#FEF3C7', border: '1px solid #FDE68A', color: '#D97706', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Split 50/50
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {disputes.length === 0 && !loading && (
                    <tr>
                      <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                        Zero open disputes awaiting administrative verdict.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 8: MODERATION QUEUE (ANTI-CIRCUMVENTION)
           ========================================================= */}
        {activeTab === 'MODERATION' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Anti-Circumvention Moderation Queue</h1>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>Prohibited direct contact sharing (phone, email, WhatsApp, UPI links) detected across messaging streams.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 16px' }}>Timestamp</th>
                    <th style={{ padding: '14px 16px' }}>Sender</th>
                    <th style={{ padding: '14px 16px' }}>Flagged Message Content</th>
                    <th style={{ padding: '14px 16px' }}>Violation Reason</th>
                    <th style={{ padding: '14px 16px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {moderation.map((m) => (
                    <tr key={m.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748B' }}>
                        {new Date(m.createdAt).toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 600 }}>{m.sender?.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>{m.sender?.role}</div>
                      </td>
                      <td style={{ padding: '14px 16px', maxWidth: '420px', wordBreak: 'break-word', color: '#DC2626', fontWeight: 500 }}>
                        &ldquo;{m.content}&rdquo;
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, background: '#FEE2E2', color: '#DC2626', padding: '3px 8px', borderRadius: '6px' }}>
                          {m.flaggedReason || 'Off-Platform Contact'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                          <button
                            onClick={() => handleModerateMessage(m.id, 'REDACT')}
                            style={{ background: '#DC2626', color: '#FFFFFF', border: 'none', padding: '5px 10px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            Redact &amp; Strike
                          </button>
                          <button
                            onClick={() => handleModerateMessage(m.id, 'DISMISS')}
                            style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', color: '#475569', padding: '5px 10px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Dismiss
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {moderation.length === 0 && !loading && (
                    <tr>
                      <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                        Zero flagged anti-circumvention violations in queue.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 9: SYSTEM AUDIT LOG
           ========================================================= */}
        {activeTab === 'AUDIT' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>Append-Only System Audit Stream</h1>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>Cryptographic trace of all logins, registrations, administrative edits, and financial events.</p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '11.5px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '14px 16px' }}>Timestamp</th>
                    <th style={{ padding: '14px 16px' }}>Action Triggered</th>
                    <th style={{ padding: '14px 16px' }}>Entity Type</th>
                    <th style={{ padding: '14px 16px' }}>Entity ID</th>
                    <th style={{ padding: '14px 16px' }}>Operator Role</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748B' }}>
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                        {log.action}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, background: '#EFF6FF', color: '#0052FF', padding: '2px 8px', borderRadius: '6px' }}>
                          {log.entityType}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontFamily: 'monospace', fontSize: '11.5px', color: '#475569' }}>
                        {log.entityId}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, background: '#F1F5F9', color: '#334155', padding: '2px 8px', borderRadius: '6px' }}>
                          {log.userRole || 'SYSTEM'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {auditLogs.length === 0 && !loading && (
                    <tr>
                      <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                        No audit records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================
          GLOBAL MODALS FOR CRUD ACTIONS
         ========================================================= */}

      {/* 1. USER MODAL (CREATE / EDIT) */}
      {modalType === 'USER' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px',
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '480px', width: '100%', padding: '24px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {modalData.id ? 'Edit User Credentials & Role' : 'Create New User Account'}
              </h2>
              <button onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Full Name / Display Name</label>
                <input
                  type="text"
                  required
                  value={modalData.name || ''}
                  onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Email Address</label>
                <input
                  type="email"
                  required
                  value={modalData.email || ''}
                  onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  {modalData.id ? 'Change Password (Leave blank to keep existing)' : 'Set Password'}
                </label>
                <input
                  type="password"
                  required={!modalData.id}
                  placeholder={modalData.id ? '••••••••' : 'Minimum 8 characters'}
                  value={modalData.password || ''}
                  onChange={(e) => setModalData({ ...modalData, password: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Assigned System Role</label>
                <select
                  value={modalData.role || 'CREATOR'}
                  onChange={(e) => setModalData({ ...modalData, role: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="CREATOR">CREATOR</option>
                  <option value="BRAND_ADMIN">BRAND_ADMIN</option>
                  <option value="BRAND_USER">BRAND_USER</option>
                  <option value="TIA_SUPER_ADMIN">TIA_SUPER_ADMIN</option>
                  <option value="TIA_SUPPORT">TIA_SUPPORT</option>
                  <option value="TIA_FINANCE">TIA_FINANCE</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <input
                  type="checkbox"
                  id="user-verified-check"
                  checked={Boolean(modalData.emailVerified)}
                  onChange={(e) => setModalData({ ...modalData, emailVerified: e.target.checked })}
                  style={{ cursor: 'pointer', accentColor: '#0052FF' }}
                />
                <label htmlFor="user-verified-check" style={{ fontSize: '12px', color: '#475569', cursor: 'pointer', fontWeight: 600 }}>
                  Mark Email as Verified
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  style={{ background: '#F1F5F9', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  style={{ background: '#0052FF', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}
                >
                  {modalLoading ? 'Saving...' : 'Save User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. CREATOR MODAL (EDIT SCORES & VERIFICATION) */}
      {modalType === 'CREATOR' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px',
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '520px', width: '100%', padding: '24px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {modalData.id ? `Edit Creator: ${modalData.displayName}` : 'Link New Creator Profile'}
              </h2>
              <button onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveCreator} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Display Name</label>
                <input
                  type="text"
                  required
                  value={modalData.displayName || ''}
                  onChange={(e) => setModalData({ ...modalData, displayName: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Creator Handle / Username</label>
                <input
                  type="text"
                  required
                  value={modalData.username || ''}
                  onChange={(e) => setModalData({ ...modalData, username: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Verification Badge Status</label>
                <select
                  value={modalData.verificationStatus || 'VERIFIED_CREATOR'}
                  onChange={(e) => setModalData({ ...modalData, verificationStatus: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="VERIFIED_CREATOR">VERIFIED_CREATOR (Top Tier)</option>
                  <option value="IDENTITY_VERIFIED">IDENTITY_VERIFIED</option>
                  <option value="EMAIL_VERIFIED">EMAIL_VERIFIED</option>
                  <option value="UNVERIFIED">UNVERIFIED</option>
                </select>
              </div>

              {/* Sliders for Scores */}
              <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700 }}>
                    <span>Intelligence Score</span>
                    <span style={{ color: '#0052FF' }}>{modalData.intelligenceScore || 85}/100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={modalData.intelligenceScore || 85}
                    onChange={(e) => setModalData({ ...modalData, intelligenceScore: parseInt(e.target.value, 10) })}
                    style={{ width: '100%', accentColor: '#0052FF' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700 }}>
                    <span>Reputation Score</span>
                    <span style={{ color: '#16A34A' }}>{modalData.reputationScore || 100}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={modalData.reputationScore || 100}
                    onChange={(e) => setModalData({ ...modalData, reputationScore: parseInt(e.target.value, 10) })}
                    style={{ width: '100%', accentColor: '#16A34A' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Availability Status</label>
                <select
                  value={modalData.availabilityStatus || 'AVAILABLE'}
                  onChange={(e) => setModalData({ ...modalData, availabilityStatus: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="AVAILABLE">AVAILABLE (Accepting Campaigns)</option>
                  <option value="BUSY">BUSY (High Demand)</option>
                  <option value="UNAVAILABLE">UNAVAILABLE</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  style={{ background: '#F1F5F9', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  style={{ background: '#0052FF', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}
                >
                  {modalLoading ? 'Saving...' : 'Save Creator'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ORGANIZATION MODAL (CREATE / EDIT) */}
      {modalType === 'ORG' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px',
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '480px', width: '100%', padding: '24px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {modalData.id ? 'Edit Organization / Brand' : 'Create New Organization'}
              </h2>
              <button onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveOrg} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Brand / Company Name</label>
                <input
                  type="text"
                  required
                  value={modalData.name || ''}
                  onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Legal Registered Entity</label>
                <input
                  type="text"
                  value={modalData.legalName || ''}
                  onChange={(e) => setModalData({ ...modalData, legalName: e.target.value })}
                  placeholder="e.g. Acme Retail Technologies Private Limited"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Industry / Business Category</label>
                <input
                  type="text"
                  value={modalData.businessCategory || ''}
                  onChange={(e) => setModalData({ ...modalData, businessCategory: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Verification Status</label>
                <select
                  value={modalData.verificationStatus || 'VERIFIED'}
                  onChange={(e) => setModalData({ ...modalData, verificationStatus: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="VERIFIED">VERIFIED (Approved)</option>
                  <option value="PENDING">PENDING (Under KYC Review)</option>
                  <option value="UNVERIFIED">UNVERIFIED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  style={{ background: '#F1F5F9', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  style={{ background: '#0052FF', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}
                >
                  {modalLoading ? 'Saving...' : 'Save Organization'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. CAMPAIGN MODAL (CREATE / EDIT) */}
      {modalType === 'CAMPAIGN' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px',
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '520px', width: '100%', padding: '24px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>
                {modalData.id ? 'Edit Campaign Details' : 'Launch Administrative Campaign'}
              </h2>
              <button onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Campaign Title</label>
                <input
                  type="text"
                  required
                  value={modalData.title || ''}
                  onChange={(e) => setModalData({ ...modalData, title: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Brief / Description</label>
                <textarea
                  required
                  rows={3}
                  value={modalData.description || ''}
                  onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Total Budget (INR ₹)</label>
                  <input
                    type="number"
                    required
                    value={modalData.budget || ''}
                    onChange={(e) => setModalData({ ...modalData, budget: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Campaign Status</label>
                  <select
                    value={modalData.status || 'PUBLISHED'}
                    onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PUBLISHED">PUBLISHED (Active on Marketplace)</option>
                    <option value="IN_PROGRESS">IN_PROGRESS (Under Execution)</option>
                    <option value="COMPLETED">COMPLETED (Settled)</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>

              {!modalData.id && (
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Select Sponsoring Brand / Organization</label>
                  <select
                    required
                    value={modalData.organizationId || ''}
                    onChange={(e) => setModalData({ ...modalData, organizationId: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="">-- Choose Organization --</option>
                    {orgs.map((o) => (
                      <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  style={{ background: '#F1F5F9', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  style={{ background: '#0052FF', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}
                >
                  {modalLoading ? 'Saving...' : 'Save Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MANUAL TRANSACTION MODAL */}
      {modalType === 'TRANSACTION' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px',
        }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', maxWidth: '480px', width: '100%', padding: '24px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0 }}>Record Platform Settlement</h2>
              <button onClick={() => setModalType(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              setModalLoading(true);
              try {
                const res = await fetch('/api/admin/transactions', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(modalData),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Failed to record transaction');
                showToast('Transaction recorded successfully!');
                setModalType(null);
                fetchTransactions();
                fetchOverview();
              } catch (err: any) {
                showToast(err.message, 'error');
              } finally {
                setModalLoading(false);
              }
            }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Gross Amount (INR ₹)</label>
                <input
                  type="number"
                  required
                  value={modalData.grossAmount || ''}
                  onChange={(e) => setModalData({ ...modalData, grossAmount: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Transaction Type</label>
                <select
                  value={modalData.type || 'ADMIN_ADJUSTMENT'}
                  onChange={(e) => setModalData({ ...modalData, type: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="ESCROW_FUNDING">ESCROW_FUNDING</option>
                  <option value="MILESTONE_RELEASE">MILESTONE_RELEASE</option>
                  <option value="BONUS_PAYOUT">BONUS_PAYOUT</option>
                  <option value="ADMIN_ADJUSTMENT">ADMIN_ADJUSTMENT</option>
                  <option value="REFUND">REFUND</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Status</label>
                <select
                  value={modalData.status || 'SETTLED'}
                  onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                >
                  <option value="SETTLED">SETTLED (Completed)</option>
                  <option value="ESCROW_LOCKED">ESCROW_LOCKED (Guaranteed in Vault)</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>Audit Note / Reason</label>
                <input
                  type="text"
                  value={modalData.description || ''}
                  onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                  placeholder="e.g. Manual creator milestone clearance"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  style={{ background: '#F1F5F9', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  style={{ background: '#0052FF', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}
                >
                  {modalLoading ? 'Recording...' : 'Record Settlement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
