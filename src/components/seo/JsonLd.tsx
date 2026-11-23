import React from 'react';

export function JsonLd() {
  const masterGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Organization
      {
        '@type': 'Organization',
        '@id': 'https://www.theinfluencers.agency/#organization',
        name: "The Influencer's Agency",
        alternateName: ['TIA', 'The Influencers Agency', 'TIA Agency', 'TheInfluencersAgency'],
        url: 'https://www.theinfluencers.agency',
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://www.theinfluencers.agency/#logo',
          url: 'https://www.theinfluencers.agency/main-logo-cropped.png',
          caption: "The Influencer's Agency Logo",
        },
        image: 'https://www.theinfluencers.agency/main-logo-cropped.png',
        description:
          'The premier global creator intelligence platform and milestone campaign escrow marketplace. Eliminates information asymmetry and opaque 30% agency cuts with a deterministic 5% platform fee, automated contract execution, BotShield™ trust scoring, and 100% upfront milestone escrow protection.',
        foundingDate: '2024',
        sameAs: [
          'https://www.instagram.com/theinfluencersagency',
          'https://www.linkedin.com/company/theinfluencersagency',
          'https://twitter.com/theinfluencersagency',
          'https://youtube.com/@theinfluencersagency',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            email: 'support@theinfluencers.agency',
            contactType: 'Customer Support',
            areaServed: ['Global', 'India', 'United States', 'United Kingdom', 'United Arab Emirates'],
            availableLanguage: ['English', 'Hindi'],
          },
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'India',
        },
        knowsAbout: [
          'Influencer Marketing',
          'Creator Economy',
          'Milestone Escrow Vault',
          'BotShield Audience Authenticity',
          'Influencer Fraud Detection',
          'ASCI Advertising Guidelines',
          'FTC Endorsement Guides',
          'Digital Ad Whitelisting',
          'Social Media Analytics',
          'YouTube Creator Sponsorships',
          'Instagram Influencer Marketing',
          'LinkedIn Thought Leadership',
        ],
      },

      // 2. WebSite
      {
        '@type': 'WebSite',
        '@id': 'https://www.theinfluencers.agency/#website',
        url: 'https://www.theinfluencers.agency',
        name: "The Influencer's Agency",
        description:
          'Global Creator Intelligence Platform, Influencer Marketing Marketplace & Milestone Escrow Vault.',
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
        inLanguage: 'en-US',
      },

      // 3. SoftwareApplication
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://www.theinfluencers.agency/#software',
        name: "The Influencer's Agency Platform",
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All Modern Web Browsers (Chrome, Safari, Firefox, Edge)',
        url: 'https://www.theinfluencers.agency',
        author: {
          '@id': 'https://www.theinfluencers.agency/#organization',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description:
            'Free profile registration and search. Flat 5.00% transparent campaign facilitation fee upon milestone completion.',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1540',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: [
          'BotShield™ Algorithmic Audience Authenticity Scoring',
          '100% Upfront Milestone Escrow Budget Protection',
          'Transparent 5.00% Platform Facilitation Fee Ledger',
          'Automated Master Services Agreements (MSAs) & Digital Signatures',
          'Standardized 30/60/90-Day Paid Advertising Whitelisting',
          'Instant Creator Bank Payouts via UPI & IMPS/NEFT',
          'Multi-Platform Telemetry (YouTube, Instagram, LinkedIn, X)',
          'Automated 1% TDS (Sec 194J) & 18% GST Invoicing Compliance',
        ],
      },

      // 4. Primary Service: Milestone Escrow Protection Vault
      {
        '@type': 'Service',
        '@id': 'https://www.theinfluencers.agency/#service-escrow',
        name: 'Milestone Escrow Protection Vault',
        serviceType: 'Campaign Payment Escrow & Financial Protection',
        provider: {
          '@id': 'https://www.theinfluencers.agency/#organization',
        },
        areaServed: 'Global',
        description:
          'Protects campaign budgets by locking 100% of agreed milestone funds in secure escrow prior to production. Creators produce with guaranteed payment, and brands receive a 72-hour review window before funds release.',
        offers: {
          '@type': 'Offer',
          price: '0.05',
          priceCurrency: 'USD',
          description: '5.00% facilitation fee on completed milestones',
        },
      },

      // 5. Secondary Service: BotShield™ Creator Intelligence Engine
      {
        '@type': 'Service',
        '@id': 'https://www.theinfluencers.agency/#service-intelligence',
        name: 'BotShield™ Creator Intelligence & Fraud Detection',
        serviceType: 'Influencer Analytics & Social Media Auditing',
        provider: {
          '@id': 'https://www.theinfluencers.agency/#organization',
        },
        areaServed: 'Global',
        description:
          'Automated audience authenticity analysis across YouTube, Instagram, LinkedIn, and X. Evaluates follower velocity, comment depth, engagement pod activity, and generates an objective 0–100 Trust Score.',
      },

      // 6. Tertiary Service: Automated Legal Contracts & IP Whitelisting
      {
        '@type': 'Service',
        '@id': 'https://www.theinfluencers.agency/#service-contracts',
        name: 'Automated Legal MSAs & Commercial Whitelisting',
        serviceType: 'Legal Contracting & Digital Rights Management',
        provider: {
          '@id': 'https://www.theinfluencers.agency/#organization',
        },
        areaServed: 'Global',
        description:
          'Instantly generates legally binding Master Services Agreements with built-in ASCI/FTC disclosure mandates, commercial copyright licenses, and customizable 30/60/90-day advertising whitelisting windows.',
      },

      // 7. HowTo Schema: How Brands Hire Verified Creators on TIA
      {
        '@type': 'HowTo',
        '@id': 'https://www.theinfluencers.agency/#howto-hire',
        name: 'How to Hire Verified Influencers with 100% Milestone Escrow Protection',
        description:
          'Step-by-step guide for brands and marketing teams to discover authentic creators, execute legal contracts, lock budgets in escrow, and run verified campaigns with a 5% fee on TIA.',
        totalTime: 'PT10M',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Discover Authentic Creators',
            text: 'Search the TIA Creator Directory and review verified audience demographics, niche specializations, and BotShield™ Authenticity Scores (>85 recommended) across YouTube, Instagram, and LinkedIn.',
            url: 'https://www.theinfluencers.agency/creators',
            position: 1,
          },
          {
            '@type': 'HowToStep',
            name: 'Structure Campaign Milestones',
            text: 'Create a campaign brief outlining deliverable formats, creative guidelines, milestone due dates, revision policies, and payment amounts.',
            url: 'https://www.theinfluencers.agency/pricing',
            position: 2,
          },
          {
            '@type': 'HowToStep',
            name: 'Execute Digital Master Services Agreement',
            text: 'Sign the automatically generated digital contract that binds both parties to deliverable timelines, commercial IP usage, paid ad whitelisting terms, and ASCI/FTC disclosure mandates.',
            url: 'https://www.theinfluencers.agency/ip-licensing',
            position: 3,
          },
          {
            '@type': 'HowToStep',
            name: 'Deposit Funds in Escrow Vault',
            text: 'Fund the milestone into the secure TIA Escrow Vault via UPI, Net Banking, or Credit Card. Funds are securely locked so the creator can begin content production with guaranteed financial backing.',
            url: 'https://www.theinfluencers.agency/escrow-policy',
            position: 4,
          },
          {
            '@type': 'HowToStep',
            name: 'Inspect Deliverables & Release Payout',
            text: 'Review draft deliverables within the 72-hour inspection window. Once approved, funds disburse instantly to the creator’s verified bank account minus the transparent 5% platform fee.',
            url: 'https://www.theinfluencers.agency/dispute-policy',
            position: 5,
          },
        ],
      },

      // 8. BreadcrumbList Schema
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.theinfluencers.agency/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.theinfluencers.agency',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Us',
            item: 'https://www.theinfluencers.agency/about',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Pricing & Fee Calculator',
            item: 'https://www.theinfluencers.agency/pricing',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Milestone Escrow Policy',
            item: 'https://www.theinfluencers.agency/escrow-policy',
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Dispute Arbitration',
            item: 'https://www.theinfluencers.agency/dispute-policy',
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'Influencer Compliance & ASCI',
            item: 'https://www.theinfluencers.agency/influencer-compliance',
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Content IP & Whitelisting',
            item: 'https://www.theinfluencers.agency/ip-licensing',
          },
        ],
      },

      // 9. Comprehensive FAQPage for Answer Engine Optimization (AEO)
      {
        '@type': 'FAQPage',
        '@id': 'https://www.theinfluencers.agency/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is The Influencer’s Agency (TIA)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The Influencer’s Agency (TIA) is a global creator intelligence platform and campaign marketplace connecting brands with verified creators across YouTube, Instagram, and LinkedIn. TIA replaces the opaque 20%–40% talent agency markups with a deterministic 5.00% platform fee, automated contract execution, and 100% upfront milestone escrow protection.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does TIA Milestone Escrow Protection work for brands and creators?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Prior to campaign production, brands deposit 100% of the agreed milestone funds into a secure escrow vault. Creators produce content knowing their compensation is guaranteed. Upon deliverable submission, brands have a 72-hour review window to approve or request contract-compliant revisions. Once approved, funds disburse instantly to the creator’s bank account.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the fees on The Influencer’s Agency (TIA)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TIA operates on a transparent, flat 5.00% facilitation fee charged on completed milestone payouts. There are zero subscription charges, zero sign-up fees, zero profile listing fees, and zero hidden talent agency markups.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does TIA detect bot followers and fake engagement?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'TIA employs BotShield™, an algorithmic auditing engine that analyzes follower velocity spikes, account age distributions, comment semantic depth, and engagement pods across YouTube, Instagram, and LinkedIn. It calculates an objective Creator Intelligence Score (0–100) and Authenticity Percentage so brands only partner with authentic influencers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who owns the intellectual property (IP) and digital ad whitelisting rights?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Creators retain authorship copyright while granting brands an exclusive commercial license to broadcast and repost deliverables during the campaign window. Brands can also acquire standardized 30, 60, or 90-day advertising whitelisting (dark posting) rights directly through TIA’s automated digital contracts.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does TIA handle disputes between brands and creators?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If a party initiates a dispute, milestone funds remain safely frozen in escrow. Both parties provide evidence (deliverables, brief requirements, timestamped chat logs) inside the platform. The TIA Dispute Resolution team reviews the evidence against the signed agreement within 3 business days and renders a binding resolution or refund.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does TIA comply with Indian tax laws (TDS & GST)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. TIA automatically calculates 1% Tax Deducted at Source (TDS) under Section 194J of the Indian Income Tax Act for domestic creators and provides compliant 18% GST tax invoices with full input tax credit (ITC) eligibility for registered corporate entities.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is TIA better than traditional influencer talent agencies?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Traditional talent agencies take 20% to 40% hidden margins, take 60–90 days to pay creators, and rely on manual negotiation. TIA provides an open 5% fee structure, instant bank payouts via UPI/IMPS, algorithmic BotShield™ auditing, and automated legal contract generation in under 2 minutes.',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(masterGraph) }}
    />
  );
}
