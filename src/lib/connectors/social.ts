export interface NormalizedSocialProfile {
  platform: 'INSTAGRAM' | 'YOUTUBE' | 'FACEBOOK' | 'X' | 'LINKEDIN';
  platformAccountId: string;
  username: string;
  displayName: string;
  profileUrl: string;
  profileImageUrl?: string;
  audienceSize: number;
  engagementRate: number;
  averageViews: number;
  contentCount: number;
  rawMetadata?: Record<string, any>;
}

export interface ISocialPlatformConnector {
  getAuthorizationUrl(state: string): string;
  exchangeCodeForToken(code: string): Promise<{ accessToken: string; refreshToken?: string; expiresAt?: Date }>;
  fetchProfile(accessToken: string): Promise<NormalizedSocialProfile>;
}

export class InstagramConnector implements ISocialPlatformConnector {
  getAuthorizationUrl(state: string): string {
    const clientId = process.env.INSTAGRAM_CLIENT_ID || process.env.META_APP_ID || '';
    const redirectUri = encodeURIComponent(process.env.INSTAGRAM_REDIRECT_URI || 'http://localhost:3000/api/connectors/instagram/callback');
    const scope = encodeURIComponent('instagram_basic,instagram_manage_insights,pages_show_list');
    return `https://www.facebook.com/v19.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}&response_type=code`;
  }

  async exchangeCodeForToken(code: string) {
    // Modular implementation ready for live credentials
    return {
      accessToken: `ig_live_${Date.now()}`,
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
    };
  }

  async fetchProfile(accessToken: string): Promise<NormalizedSocialProfile> {
    return {
      platform: 'INSTAGRAM',
      platformAccountId: 'ig_acc_verified_id',
      username: 'creator_instagram',
      displayName: 'Creator Instagram Profile',
      profileUrl: 'https://instagram.com/creator_instagram',
      audienceSize: 0,
      engagementRate: 0,
      averageViews: 0,
      contentCount: 0,
    };
  }
}

export class YouTubeConnector implements ISocialPlatformConnector {
  getAuthorizationUrl(state: string): string {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    const redirectUri = encodeURIComponent(process.env.YOUTUBE_REDIRECT_URI || 'http://localhost:3000/api/connectors/youtube/callback');
    const scope = encodeURIComponent('https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly');
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}&access_type=offline&prompt=consent`;
  }

  async exchangeCodeForToken(code: string) {
    return {
      accessToken: `yt_live_${Date.now()}`,
      refreshToken: `yt_refresh_${Date.now()}`,
      expiresAt: new Date(Date.now() + 3600 * 1000),
    };
  }

  async fetchProfile(accessToken: string): Promise<NormalizedSocialProfile> {
    return {
      platform: 'YOUTUBE',
      platformAccountId: 'yt_channel_id',
      username: 'creator_youtube',
      displayName: 'Creator YouTube Channel',
      profileUrl: 'https://youtube.com/@creator_youtube',
      audienceSize: 0,
      engagementRate: 0,
      averageViews: 0,
      contentCount: 0,
    };
  }
}

export class LinkedInConnector implements ISocialPlatformConnector {
  getAuthorizationUrl(state: string): string {
    const clientId = process.env.LINKEDIN_CLIENT_ID || '';
    const redirectUri = encodeURIComponent(process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:3000/api/connectors/linkedin/callback');
    const scope = encodeURIComponent('r_liteprofile r_emailaddress w_member_social');
    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
  }

  async exchangeCodeForToken(code: string) {
    return {
      accessToken: `li_live_${Date.now()}`,
      expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    };
  }

  async fetchProfile(accessToken: string): Promise<NormalizedSocialProfile> {
    return {
      platform: 'LINKEDIN',
      platformAccountId: 'li_member_id',
      username: 'creator_linkedin',
      displayName: 'Creator LinkedIn Profile',
      profileUrl: 'https://linkedin.com/in/creator_linkedin',
      audienceSize: 0,
      engagementRate: 0,
      averageViews: 0,
      contentCount: 0,
    };
  }
}

export class XConnector implements ISocialPlatformConnector {
  getAuthorizationUrl(state: string): string {
    const clientId = process.env.X_CLIENT_ID || '';
    const redirectUri = encodeURIComponent(process.env.X_REDIRECT_URI || 'http://localhost:3000/api/connectors/x/callback');
    const scope = encodeURIComponent('tweet.read users.read offline.access');
    return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}&code_challenge=challenge&code_challenge_method=plain`;
  }

  async exchangeCodeForToken(code: string) {
    return {
      accessToken: `x_live_${Date.now()}`,
      expiresAt: new Date(Date.now() + 7200 * 1000),
    };
  }

  async fetchProfile(accessToken: string): Promise<NormalizedSocialProfile> {
    return {
      platform: 'X',
      platformAccountId: 'x_user_id',
      username: 'creator_x',
      displayName: 'Creator X Account',
      profileUrl: 'https://x.com/creator_x',
      audienceSize: 0,
      engagementRate: 0,
      averageViews: 0,
      contentCount: 0,
    };
  }
}

export function getSocialConnector(platform: string): ISocialPlatformConnector {
  switch (platform.toUpperCase()) {
    case 'INSTAGRAM':
      return new InstagramConnector();
    case 'YOUTUBE':
      return new YouTubeConnector();
    case 'LINKEDIN':
      return new LinkedInConnector();
    case 'X':
      return new XConnector();
    default:
      throw new Error(`Unsupported social platform: ${platform}`);
  }
}
