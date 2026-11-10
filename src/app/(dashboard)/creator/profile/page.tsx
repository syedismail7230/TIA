'use client';

import React, { useEffect, useState } from 'react';
import { CreatorProfileView } from '@/components/creator-profile/creator-profile-view';

export default function CreatorProfilePage() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data?.user) {
            const handle = data.user.creatorProfile?.username || data.user.email?.split('@')[0];
            if (handle) {
              setUsername(handle);
              return;
            }
          }
        }
      } catch (err) {
        console.warn('Profile fetch note:', err);
      }
      setUsername('me');
    }
    fetchMe();
  }, []);

  if (!username) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', color: '#64748B' }}>
        Loading creator profile...
      </div>
    );
  }

  return <CreatorProfileView username={username} />;
}
