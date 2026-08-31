import React from 'react';
import { Metadata } from 'next';
import { CreatorProfileView } from '@/components/creator-profile/creator-profile-view';

interface Props {
  params: {
    username: string;
  };
}

/**
 * Dynamic Per-Profile SEO & Social Graph Metadata Generation
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cleanUsername = decodeURIComponent(params.username).replace(/^@/, '');
  const isSarah = cleanUsername === 'creator.official' || cleanUsername === 'sarahjenkins' || cleanUsername === 'profile';
  const displayName = isSarah
    ? 'Sarah Jenkins'
    : cleanUsername.replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const pageTitle = `${displayName} (@${cleanUsername}) • TIA Verified Creator Profile & Commercial Rates`;
  const pageDescription = `Explore verified audience reach (615K+), YouTube & Instagram analytics, commercial rates, BotShield™ trust score, and portfolio for ${displayName} (@${cleanUsername}) on The Influencer’s Agency.`;
  const canonicalUrl = `https://theinfluencersagency.com/creator/${cleanUsername}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: "The Influencer's Agency",
      type: 'profile',
      images: [
        {
          url: 'https://theinfluencersagency.com/banner.png',
          width: 851,
          height: 315,
          alt: `${displayName} - TIA Verified Creator Cover Banner`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayName} (@${cleanUsername}) • TIA Creator`,
      description: pageDescription,
      images: ['https://theinfluencersagency.com/banner.png'],
      creator: `@${cleanUsername}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function DynamicCreatorProfilePage({ params }: Props) {
  const cleanUsername = decodeURIComponent(params.username).replace(/^@/, '');
  const isSarah = cleanUsername === 'creator.official' || cleanUsername === 'sarahjenkins' || cleanUsername === 'profile';
  const displayName = isSarah
    ? 'Sarah Jenkins'
    : cleanUsername.replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  // Rich JSON-LD Structured Data for Google Search Engine indexing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: displayName,
      alternateName: `@${cleanUsername}`,
      jobTitle: 'Content Creator & Tech Specialist',
      description: `Verified creator on The Influencer's Agency with 615K+ combined audience reach.`,
      image: 'https://theinfluencersagency.com/profile.png',
      url: `https://theinfluencersagency.com/creator/${cleanUsername}`,
      sameAs: [
        `https://www.youtube.com/@${cleanUsername}`,
        `https://www.instagram.com/${cleanUsername}`,
        `https://twitter.com/${cleanUsername}`,
        `https://www.linkedin.com/in/${cleanUsername}`,
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '48',
        bestRating: '5.0',
      },
    },
  };

  return (
    <>
      {/* Inject Google SEO Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Interactive Dual-Mode Profile Component */}
      <CreatorProfileView username={params.username} />
    </>
  );
}
