export type UserRole =
  | 'CREATOR'
  | 'BRAND_USER'
  | 'BRAND_ADMIN'
  | 'TIA_SUPPORT'
  | 'TIA_MODERATOR'
  | 'TIA_FINANCE'
  | 'TIA_SUPER_ADMIN';

export type OrgRole = 'OWNER' | 'ADMIN' | 'CAMPAIGN_MANAGER' | 'FINANCE' | 'VIEWER';

export function isCreator(role: string): boolean {
  return role === 'CREATOR';
}

export function isBrandMember(role: string): boolean {
  return role === 'BRAND_USER' || role === 'BRAND_ADMIN';
}

export function isTiaStaff(role: string): boolean {
  return (
    role === 'TIA_SUPPORT' ||
    role === 'TIA_MODERATOR' ||
    role === 'TIA_FINANCE' ||
    role === 'TIA_SUPER_ADMIN'
  );
}

export function isTiaSuperAdmin(role: string): boolean {
  return role === 'TIA_SUPER_ADMIN';
}

export function canManageCampaigns(role: string, orgRole?: string): boolean {
  if (role === 'TIA_SUPER_ADMIN') return true;
  if (role === 'BRAND_ADMIN') return true;
  if (role === 'BRAND_USER' && (orgRole === 'OWNER' || orgRole === 'ADMIN' || orgRole === 'CAMPAIGN_MANAGER')) {
    return true;
  }
  return false;
}

export function canAuthorizePayments(role: string, orgRole?: string): boolean {
  if (role === 'TIA_SUPER_ADMIN' || role === 'TIA_FINANCE') return true;
  if (role === 'BRAND_ADMIN') return true;
  if (role === 'BRAND_USER' && (orgRole === 'OWNER' || orgRole === 'ADMIN' || orgRole === 'FINANCE')) {
    return true;
  }
  return false;
}

export function canModerateContent(role: string): boolean {
  return role === 'TIA_MODERATOR' || role === 'TIA_SUPER_ADMIN';
}

export function canResolveDisputes(role: string): boolean {
  return role === 'TIA_FINANCE' || role === 'TIA_SUPER_ADMIN' || role === 'TIA_MODERATOR';
}
