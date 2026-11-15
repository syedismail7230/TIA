import React from 'react';

export function JsonLd() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.theinfluencers.agency/#organization',
    name: "The Influencer's Agency",
    alternateName: ['TIA', 'The Influencers Agency', 'TIA Agency'],
    url: 'https://www.theinfluencers.agency',
    logo: 'https://www.theinfluencers.agency/main-logo-cropped.png',
    description:
      'The leading global creator intelligence and campaign marketplace eliminating information asymmetry between brands and creators with escrow-backed milestone payouts and 5% transparent fees.',
    foundingDate: '2024',
    sameAs: [
      'https://www.instagram.com/theinfluencersagency',
      'https://www.linkedin.com/company/theinfluencersagency',
      'https://twitter.com/theinfluencersagency',
      'https://youtube.com/@theinfluencersagency',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@theinfluencers.agency',
      contactType: 'Customer Support',
      areaServed: 'Global',
      availableLanguage: ['English', 'Hindi'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'India',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.theinfluencers.agency/#website',
    url: 'https://www.theinfluencers.agency',
    name: "The Influencer's Agency",
    description: 'Global Creator Intelligence & Campaign Escrow Marketplace',
    publisher: {
      '@id': 'https://www.theinfluencers.agency/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.theinfluencers.agency/creators?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://www.theinfluencers.agency/#software',
    name: "The Influencer's Agency Platform",
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All Modern Web Browsers',
    url: 'https://www.theinfluencers.agency',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free onboarding with 5% transparent campaign facilitation fee upon milestone completion',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1420',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'BotShield Audience Authenticity Scoring',
      'Milestone Escrow Protection & Upfront Budget Lock',
      'Automated Commercial Contracts & IP Whitelisting',
      'Transparent 5% Platform Fee Ledger',
      'Multi-Platform Creator Analytics (YouTube, Instagram, LinkedIn, X)',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is The Influencer’s Agency (TIA)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Influencer’s Agency (TIA) is a global creator intelligence and campaign marketplace that connects verified creators with premium brands. TIA eliminates middleman markups by replacing traditional 30% agency cuts with a transparent 5% platform fee, automated contract execution, and milestone escrow protection.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does TIA Milestone Escrow Protection work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prior to campaign production, brands deposit 100% of the agreed milestone funds into a secure vault. Creators are guaranteed payment upon deliverable approval within a 72-hour review window, protecting both creators from non-payment and brands from unfulfilled deliverables.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the fees for brands and creators on TIA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TIA operates on a deterministic, transparent 5.00% platform facilitation fee upon successful campaign milestone payout release. There are zero hidden markups, retainers, or undisclosed margins.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does TIA verify creator authenticity and follower quality?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TIA incorporates BotShield™ intelligence algorithms that analyze follower velocity, engagement ratios, audience demographics, and authentic comment patterns across YouTube, Instagram, and LinkedIn to generate an immutable Creator Intelligence and Trust Score.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who owns the intellectual property (IP) and whitelisting rights for created content?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TIA provides standardized, legally enforceable contract templates that clearly define digital IP rights, paid advertising whitelisting windows (such as 30, 60, or 90 days), and commercial usage grants prior to contract signing.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
