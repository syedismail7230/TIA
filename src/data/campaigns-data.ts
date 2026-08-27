export interface CampaignScopeItem {
  title: string;
  detail: string;
}

export interface CampaignContentDirections {
  tone: string;
  videoSetup: string;
  hashtags: string;
  audio: string;
}

export interface CampaignProposalItem {
  handle: string;
  country: string;
  flag: string;
  bid: string;
  days: string;
  rating: string;
  reviews: number;
  er: string;
  pitch: string;
}

export interface CampaignOtherJobItem {
  title: string;
  payout: string;
}

export interface CampaignItem {
  id: string;
  title: string;
  brandName: string;
  partnerLogo?: string;
  bannerImage: string;
  avatarGradient: string;
  commercialType: string;
  commercialLabel: string;
  payoutAmount: string;
  currencySymbol: string;
  currencyCode: string;
  payType: string;
  deliverablesSummary: string;
  creatorsApplied: number;
  acceptanceChance: number;
  eligibilityRate: number;
  categories: string[];
  isNew?: boolean;
  postedAt: string;
  projectTimeline: string;
  requirementLabel: string;
  language: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  socials: string[];
  description: string;
  scopeOfWork: CampaignScopeItem[];
  contentDirections: CampaignContentDirections;
  milestones: string[];
  proposals: CampaignProposalItem[];
  otherJobs: CampaignOtherJobItem[];
}

export const INITIAL_CAMPAIGNS: CampaignItem[] = [
  {
    "id": "camp-1",
    "title": "Zero-Waste Sustainable Living & Kitchen Challenge",
    "brandName": "Leading Eco-Living Enterprise (Verified)",
    "partnerLogo": "/logos/shopify-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #059669 0%, #047857 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "A$1,650",
    "currencySymbol": "A$",
    "currencyCode": "AUD",
    "payType": "Fixed Pay",
    "deliverablesSummary": "2 Reels • 3 Stories • 1 Post",
    "creatorsApplied": 18,
    "acceptanceChance": 86,
    "eligibilityRate": 94,
    "categories": [
      "Sustainability",
      "Cooking",
      "Food",
      "Lifestyle"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "English",
    "country": "Australia",
    "countryCode": "AU",
    "countryFlag": "🇦🇺",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create 2x Instagram Reels showcasing zero-waste kitchen lifestyle habits and authentic sustainable cooking tips.",
    "scopeOfWork": [
      {
        "title": "Zero-Waste Cooking Reel",
        "detail": "Low-waste meal prep or sustainable kitchen hack with engaging voiceover."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, mindful, approachable, and educational.",
      "videoSetup": "Warm natural daylight, clean eco-kitchen aesthetics, macro food textures.",
      "hashtags": "#ZeroWasteKitchen #SustainableLiving2026 #EcoLiving #Ad",
      "audio": "Gentle acoustic lo-fi ambient track with clear narration."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@green_culinary",
        "country": "Australia",
        "flag": "🇦🇺",
        "bid": "A$1,650",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Sustainability Showcase Follow-up Campaign",
        "payout": "A$1,650 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-2",
    "title": "Festive Season Artisan Gourmet Hampers Unboxing",
    "brandName": "Artisanal Gourmet Food Enterprise (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 50%, #475569 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "€650",
    "currencySymbol": "€",
    "currencyCode": "EUR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "7 Posts • 7 Stories • 7 Reels",
    "creatorsApplied": 24,
    "acceptanceChance": 92,
    "eligibilityRate": 98,
    "categories": [
      "Festivals",
      "Food",
      "Lifestyle"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Italian / English",
    "country": "Italy",
    "countryCode": "IT",
    "countryFlag": "🇮🇹",
    "socials": [
      "INSTAGRAM",
      "PINTEREST",
      "YOUTUBE"
    ],
    "description": "Review artisan gift hampers and holiday snack collections with dedicated link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Artisan Hamper Unboxing Reel",
        "detail": "High-energy celebratory unboxing showing luxury packaging and ribbon unwrapping."
      }
    ],
    "contentDirections": {
      "tone": "Festive, warm, indulgent, and joyful.",
      "videoSetup": "Cozy warm indoor lighting, holiday ambient background bokeh.",
      "hashtags": "#HolidayGourmet #FestiveSeason2026 #GourmetGiftGuide #Ad",
      "audio": "Upbeat holiday acoustic or festive jazz score."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@aria_lifestyle",
        "country": "Italy",
        "flag": "🇮🇹",
        "bid": "€650",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Festivals Showcase Follow-up Campaign",
        "payout": "€650 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-3",
    "title": "Bio-Active Herbal Wellness & Vitality Booster Launch",
    "brandName": "Top Clinical Wellness Brand (Verified)",
    "partnerLogo": "/logos/redbull-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "$1,800",
    "currencySymbol": "$",
    "currencyCode": "USD",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Dedicated Video • 2 Shorts • 3 Stories",
    "creatorsApplied": 31,
    "acceptanceChance": 78,
    "eligibilityRate": 88,
    "categories": [
      "Health",
      "Supplements",
      "Fitness"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "English",
    "country": "United States",
    "countryCode": "US",
    "countryFlag": "🇺🇸",
    "socials": [
      "YOUTUBE",
      "INSTAGRAM"
    ],
    "description": "Explain the scientific benefits of natural adaptogens in morning wellness routines for sustained focus and energy.",
    "scopeOfWork": [
      {
        "title": "Daily Adaptogen Science Routine",
        "detail": "4K vertical video showing morning smoothie prep with adaptogen booster."
      }
    ],
    "contentDirections": {
      "tone": "Inspirational, evidence-based, clean, and transparent.",
      "videoSetup": "Bright modern kitchen, high-resolution nutrition macro shots.",
      "hashtags": "#HerbalWellness #AdaptogenRoutine #DailyVitality #Ad",
      "audio": "Upbeat chill electronic rhythm with articulate narration."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@holistic_david",
        "country": "United States",
        "flag": "🇺🇸",
        "bid": "$1,800",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Health Showcase Follow-up Campaign",
        "payout": "$1,800 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-4",
    "title": "Next-Gen Flagship Smartphone 4K Low-Light Camera Showcase",
    "brandName": "Tier-1 Smartphone Enterprise (Verified)",
    "partnerLogo": "/logos/apple-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #0052FF 0%, #002B99 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹85,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 1 YouTube Short • 3 Stories",
    "creatorsApplied": 42,
    "acceptanceChance": 82,
    "eligibilityRate": 91,
    "categories": [
      "Technology",
      "Mobile",
      "Photography"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Capture low-light city nightscape footage, 100x zoom stability, and 4K 60fps cinematic video capabilities.",
    "scopeOfWork": [
      {
        "title": "Nightscape 4K Cinema Video Test",
        "detail": "Side-by-side comparison under streetlamps and low ambient light."
      }
    ],
    "contentDirections": {
      "tone": "Sleek, futuristic, high-tech, cinematic.",
      "videoSetup": "Urban neon night city streets, high-contrast dynamic lighting.",
      "hashtags": "#FlagshipCamera #Cinematography2026 #TechReview #Ad",
      "audio": "Punchy cinematic electronic beat with razor-sharp sound design."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@tech_guru_karan",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹85,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Showcase Follow-up Campaign",
        "payout": "₹85,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-5",
    "title": "Wireless ANC Active Earbuds Deep Bass & Commute Sound Test",
    "brandName": "Leading Audio & Wearables Brand (Verified)",
    "partnerLogo": "/logos/bose-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹35,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 ASMR Audio Reel • 2 Stories",
    "creatorsApplied": 50,
    "acceptanceChance": 91,
    "eligibilityRate": 96,
    "categories": [
      "Technology",
      "Music",
      "Audio"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Test 40dB active noise cancellation in crowded metros and cafes, highlighting crystal-clear dual mic calling.",
    "scopeOfWork": [
      {
        "title": "Metro Noise Cancellation Test",
        "detail": "Turn ANC on/off in live busy metro station and capture instant silence."
      }
    ],
    "contentDirections": {
      "tone": "Energetic, youth-centric, crisp, musical.",
      "videoSetup": "Urban street / metro commute background, macro earbud closeups.",
      "hashtags": "#WirelessAudio #DeepBassEarbuds #ANCReview #Ad",
      "audio": "High-fidelity spatial audio mix demonstrating bass depth."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@audio_vibes_rohit",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹35,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Showcase Follow-up Campaign",
        "payout": "₹35,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-6",
    "title": "Natural 10% Niacinamide Clarifying Face Serum Routine",
    "brandName": "Top D2C Clean Skincare Brand (Verified)",
    "partnerLogo": "/logos/shopify.svg",
    "bannerImage": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #10B981 0%, #047857 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹40,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Routine Reel • 2 Stories",
    "creatorsApplied": 47,
    "acceptanceChance": 89,
    "eligibilityRate": 95,
    "categories": [
      "Beauty",
      "Skincare",
      "Clean Beauty"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Demonstrate non-sticky watery serum absorption, rice water brightening, and daily barrier protection.",
    "scopeOfWork": [
      {
        "title": "Morning Glass Skin Routine",
        "detail": "Dropper application on bare face showing instant hydration without oiliness."
      }
    ],
    "contentDirections": {
      "tone": "Gentle, soothing, authentic, glow-focused.",
      "videoSetup": "Warm sunlit bathroom vanity, clean aesthetic mirror shots.",
      "hashtags": "#CleanSkincare #NiacinamideGlow #HealthyBarrier #Ad",
      "audio": "Relaxing ambient acoustic melody with natural voiceover."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@shreya_skintalks",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹40,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Showcase Follow-up Campaign",
        "payout": "₹40,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-7",
    "title": "Urban Streetwear 240 GSM Heavyweight Graphic Tees",
    "brandName": "Top Mens Streetwear Label (Verified)",
    "partnerLogo": "/logos/puma-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #18181B 0%, #27272A 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹45,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Style Transitions Reel • 3 Stories",
    "creatorsApplied": 48,
    "acceptanceChance": 87,
    "eligibilityRate": 94,
    "categories": [
      "Fashion",
      "Streetwear",
      "Lifestyle"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "PINTEREST"
    ],
    "description": "Style 240 GSM heavy cotton anime and typography graphic tees with baggy denim and clean sneakers.",
    "scopeOfWork": [
      {
        "title": "3 Ways to Style Oversized Tees Reel",
        "detail": "Layering with denim jackets, tucking into wide-leg trousers."
      }
    ],
    "contentDirections": {
      "tone": "Trendy, energetic, effortless, stylish.",
      "videoSetup": "Urban street graffiti backdrop, skatepark transitions.",
      "hashtags": "#StreetwearStyle #OversizedFashion #MensFitInspo #Ad",
      "audio": "High-energy phonk / trap beat with snappy shoe transitions."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@ayush_fits",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹45,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Showcase Follow-up Campaign",
        "payout": "₹45,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-8",
    "title": "Hyper-Mode Electric Scooter Urban Acceleration Sprint",
    "brandName": "Top EV Mobility Enterprise (Verified)",
    "partnerLogo": "/logos/tesla-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #10B981 0%, #047857 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹1,10,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 1 YouTube Short • 3 Stories",
    "creatorsApplied": 31,
    "acceptanceChance": 78,
    "eligibilityRate": 89,
    "categories": [
      "Automobile",
      "Technology",
      "Sustainability"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Experience 0-40 km/h in 2.6 seconds with party mode lighting, hill hold assist, and hypercharging range test.",
    "scopeOfWork": [
      {
        "title": "Hyper Mode Acceleration Test",
        "detail": "Chest mount camera capturing instantaneous torque and digital speedometer."
      }
    ],
    "contentDirections": {
      "tone": "Thrilling, high-tech, futuristic, eco-friendly.",
      "videoSetup": "Early morning clear highway, sunset neon city streets.",
      "hashtags": "#ElectricMobility #HyperMode #EVScooter #Ad",
      "audio": "High-octane electronic cyberpunk synthwave."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@ev_explorer_raj",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹1,10,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Automobile Showcase Follow-up Campaign",
        "payout": "₹1,10,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-9",
    "title": "15% Stabilized Vitamin C Rapid Dark Spot Glow Serum",
    "brandName": "Top Clinical Skincare Brand (Verified)",
    "partnerLogo": "/logos/canva-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹38,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Routine Reel • 2 Stories",
    "creatorsApplied": 44,
    "acceptanceChance": 90,
    "eligibilityRate": 95,
    "categories": [
      "Beauty",
      "Skincare"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Stabilized L-Ascorbic Vitamin C application showing zero oxidation, fast absorption, and glow under sunlight.",
    "scopeOfWork": [
      {
        "title": "Morning Antioxidant Glow Routine",
        "detail": "Dropper application, macro skin glow absorption, layer with sunscreen."
      }
    ],
    "contentDirections": {
      "tone": "Radiant, honest, educational, aesthetic.",
      "videoSetup": "Warm sunlit bathroom mirror, golden morning sun rays.",
      "hashtags": "#VitaminCGlow #MorningSkincare #AntioxidantSerum #Ad",
      "audio": "Cheerful acoustic rhythm with genuine voiceover review."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@priya_skinglow",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹38,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Showcase Follow-up Campaign",
        "payout": "₹38,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-10",
    "title": "2% BHA Salicylic Acid Active Acne & Blackhead Defense",
    "brandName": "Dermatologist-Formulated Skincare Label (Verified)",
    "partnerLogo": "/logos/notion.svg",
    "bannerImage": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹42,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Educational Reel • 2 Stories",
    "creatorsApplied": 39,
    "acceptanceChance": 89,
    "eligibilityRate": 94,
    "categories": [
      "Beauty",
      "Skincare",
      "Education"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Dermatologist-designed breakdown of BHA salicylic acid unclogging congested pores and clearing active blackheads.",
    "scopeOfWork": [
      {
        "title": "The Acne Unclogging Science Reel",
        "detail": "Graphics explaining oil solubility of BHA and application on T-zone areas."
      }
    ],
    "contentDirections": {
      "tone": "Clinical, supportive, evidence-based, transparent.",
      "videoSetup": "Clean white medical/studio aesthetic, high clarity macro shots.",
      "hashtags": "#SalicylicAcid #AcneCare #DermatologyTips #Ad",
      "audio": "Calm ambient tech beats with informative voiceover."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@dermat_insights",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹42,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Showcase Follow-up Campaign",
        "payout": "₹42,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-11",
    "title": "Watermelon Glow Hydrating Sunscreen SPF 50 PA++++",
    "brandName": "Verified D2C Beauty Label",
    "partnerLogo": "/logos/canva.svg",
    "bannerImage": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #FB7185 0%, #E11D48 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹35,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Dewy Skin Reel • 2 Stories",
    "creatorsApplied": 48,
    "acceptanceChance": 92,
    "eligibilityRate": 97,
    "categories": [
      "Beauty",
      "Skincare"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Blend watermelon extracts & hyaluronic acid for that glass-skin dewy finish under makeup with 0 stickiness.",
    "scopeOfWork": [
      {
        "title": "Under-Makeup Dewy Sunscreen Prep",
        "detail": "Showing smooth primer effect and glossy skin without oiliness."
      }
    ],
    "contentDirections": {
      "tone": "Playful, refreshing, youthful, dewy.",
      "videoSetup": "Pastel backdrop, natural window light, macro water splash.",
      "hashtags": "#DewySunscreen #GlassSkinRoutine #SPF50Daily #Ad",
      "audio": "Trendy pop acoustic tune with upbeat commentary."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@tanya_glowdiaries",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹35,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Showcase Follow-up Campaign",
        "payout": "₹35,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-12",
    "title": "Pure Himalayan Shilajit Resin Purity & Stamina Test",
    "brandName": "Heritage Ayurvedic Wellness Enterprise (Verified)",
    "partnerLogo": "/logos/redbull-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #78350F 0%, #451A03 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹60,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Purity Burn Test Reel • 2 Stories",
    "creatorsApplied": 28,
    "acceptanceChance": 84,
    "eligibilityRate": 90,
    "categories": [
      "Health",
      "Supplements",
      "Ayurveda"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Perform authentic Himalayan resin fire & water test showing 100% natural dissolution and pure fulvic acid boost.",
    "scopeOfWork": [
      {
        "title": "The Shilajit Purity Test Reel",
        "detail": "Dissolving pea-sized resin in warm water with lab NABL certificate transparency."
      }
    ],
    "contentDirections": {
      "tone": "Energetic, disciplined, traditional wellness meets modern science.",
      "videoSetup": "Clean gym workout station, warm morning kitchen counter.",
      "hashtags": "#PureShilajit #AyurvedicStamina #NaturalEnergy #Ad",
      "audio": "Confident, powerful percussion beats with clear narration."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@rahul_fitness_yogi",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹60,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Health Showcase Follow-up Campaign",
        "payout": "₹60,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-13",
    "title": "Ultra-Soft Beechwood MicroModal Loungewear Stretch Test",
    "brandName": "Modern Comfort Apparel Label (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹45,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Fun Comfort Reel • 3 Stories",
    "creatorsApplied": 32,
    "acceptanceChance": 87,
    "eligibilityRate": 93,
    "categories": [
      "Fashion",
      "Lifestyle",
      "Comfort"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Humorous, vibrant video showing why beechwood micro-modal fabric feels 3x softer than cotton on hot humid days.",
    "scopeOfWork": [
      {
        "title": "The Ultimate Couch Stretch Test",
        "detail": "Showing 4-way stretch, quirky printed patterns, and extreme breathable softness."
      }
    ],
    "contentDirections": {
      "tone": "Funky, quirky, humorous, candid.",
      "videoSetup": "Colorful home living room, cozy bed stretch shots.",
      "hashtags": "#LoungewearComfort #SoftestFabric #WorkFromHomeComfort #Ad",
      "audio": "Fun bubbly viral track with comedic acting."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@fun_with_adit",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹45,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Showcase Follow-up Campaign",
        "payout": "₹45,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-14",
    "title": "100% Certified Whole Grain Rolled Oats Meal Prep",
    "brandName": "Leading Health Foods Brand (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹32,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Overnight Oats Reel • 2 Stories",
    "creatorsApplied": 35,
    "acceptanceChance": 93,
    "eligibilityRate": 98,
    "categories": [
      "Food",
      "Health",
      "Cooking"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Prepare creamy chia & peanut butter overnight oats in a mason jar with 0 added sugar or preservatives.",
    "scopeOfWork": [
      {
        "title": "5-Minute Prep Overnight Oats Mason Jar",
        "detail": "Layering jumbo rolled oats, almond milk, chia seeds, and honey drizzle."
      }
    ],
    "contentDirections": {
      "tone": "Wholesome, healthy, appetizing, clean.",
      "videoSetup": "Sunny breakfast table, glass jar macro texture.",
      "hashtags": "#OvernightOats #CleanBreakfast #HealthyRecipes #Ad",
      "audio": "Gentle acoustic guitar with step-by-step recipe narration."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@chef_neha_fit",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹32,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Showcase Follow-up Campaign",
        "payout": "₹32,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-15",
    "title": "Zero-Maida Chocolate & Ragi Millet Pancakes for Kids",
    "brandName": "Organic Kids Nutrition Brand (Verified)",
    "partnerLogo": "/logos/duolingo-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹38,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Kids Breakfast Reel • 2 Stories",
    "creatorsApplied": 33,
    "acceptanceChance": 91,
    "eligibilityRate": 96,
    "categories": [
      "Food",
      "Parenting",
      "Health"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Wholesome breakfast pancakes made of ragi, jowar, oats, and real cocoa that kids finish in 5 minutes.",
    "scopeOfWork": [
      {
        "title": "Happy Breakfast Without The Sugar Rush",
        "detail": "Flipping fluffy chocolate pancakes in cute animal shapes with banana toppings."
      }
    ],
    "contentDirections": {
      "tone": "Heartwarming, joyful, mother-friendly, wholesome.",
      "videoSetup": "Bright modern kitchen, happy toddler tasting moments.",
      "hashtags": "#MilletPancakes #ZeroMaida #HealthyKidsFood #Ad",
      "audio": "Upbeat playful tune with warm family voiceover."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@mom_and_munchkin",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹38,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Showcase Follow-up Campaign",
        "payout": "₹38,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-16",
    "title": "Artisanal Handwoven Mulmul Cotton Saree Draping",
    "brandName": "Artisanal Handloom Saree Label (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #E11D48 0%, #BE123C 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹48,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Aesthetic Draping Reel • 3 Stories",
    "creatorsApplied": 38,
    "acceptanceChance": 89,
    "eligibilityRate": 94,
    "categories": [
      "Fashion",
      "Handloom",
      "Lifestyle"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "PINTEREST"
    ],
    "description": "Poetic 1-minute video showing the effortless drape of breathable handwoven mulmul saree with silver jhumkas.",
    "scopeOfWork": [
      {
        "title": "The 60-Second Modern Saree Drape Reel",
        "detail": "Pleat making, pallu flow, and styling with contemporary crop top blouse."
      }
    ],
    "contentDirections": {
      "tone": "Poetic, graceful, timeless, feminine.",
      "videoSetup": "Heritage courtyard or sunlight filtering through linen curtains.",
      "hashtags": "#SareeDraping #MulmulCotton #HandloomElegance #Ad",
      "audio": "Nostalgic acoustic Indian classical or indie melody."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@pallu_and_poetry",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹48,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Showcase Follow-up Campaign",
        "payout": "₹48,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-17",
    "title": "Festive Handwoven Silk-Linen Traditional Kurtas",
    "brandName": "Heritage Indian Festive Apparel Label (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #92400E 0%, #78350F 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹65,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "2 Festive Lookbook Reels • 4 Stories",
    "creatorsApplied": 27,
    "acceptanceChance": 82,
    "eligibilityRate": 90,
    "categories": [
      "Fashion",
      "Festivals",
      "Luxury"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Celebrate Indian artisanal handcrafts with royal tussar silk Nehru jackets and breathable pastel linen kurtas.",
    "scopeOfWork": [
      {
        "title": "Festive Royal Lookbook Reel",
        "detail": "Transitioning between daytime puja pastel kurta to evening celebration embroidered jacket."
      }
    ],
    "contentDirections": {
      "tone": "Regal, culturally rooted, sophisticated, festive.",
      "videoSetup": "Indian heritage arches, warm brass oil lamps and marigold garlands.",
      "hashtags": "#FestiveLookbook #HandcraftedFashion #TraditionalWear #Ad",
      "audio": "Soulful Sufi or contemporary classical flute fusion."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@royal_ethnics_dev",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹65,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Showcase Follow-up Campaign",
        "payout": "₹65,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-18",
    "title": "Tailored European Collar Egyptian Giza Cotton Shirts",
    "brandName": "Luxury Menswear Tailoring House (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #1E1E1E 0%, #121212 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹75,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Editorial Reel • 1 Carousel • 2 Stories",
    "creatorsApplied": 24,
    "acceptanceChance": 79,
    "eligibilityRate": 88,
    "categories": [
      "Fashion",
      "Luxury",
      "Menswear"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "English / Hindi",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "PINTEREST"
    ],
    "description": "Precision Italian collars, subtle embossed detailing, and Egyptian Giza cotton for boardroom-to-bar style.",
    "scopeOfWork": [
      {
        "title": "The Modern Gentleman Silhouette Reel",
        "detail": "Editorial slow-motion tracking showing fabric texture and tailored drape."
      }
    ],
    "contentDirections": {
      "tone": "Sleek, aspirational, minimalist, confident.",
      "videoSetup": "Modern architecture, cocktail lounge mood lighting.",
      "hashtags": "#LuxuryMenswear #TailoredShirts #GentlemanStyle #Ad",
      "audio": "Deep melodic house with sharp cinematic visual transitions."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@siddharth_style",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹75,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Showcase Follow-up Campaign",
        "payout": "₹75,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-19",
    "title": "Desi Masala Chai Premix Instant Hot Water Taste Test",
    "brandName": "Top Indian Tea & Beverages Enterprise (Verified)",
    "partnerLogo": "/logos/cocacola-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #15803D 0%, #166534 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹30,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Travel Chai Reel • 2 Stories",
    "creatorsApplied": 42,
    "acceptanceChance": 93,
    "eligibilityRate": 98,
    "categories": [
      "Food",
      "Travel",
      "Lifestyle"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Make steaming restaurant-quality ginger adrak-elaichi chai in hotel room or office desk in 30 seconds using only hot water.",
    "scopeOfWork": [
      {
        "title": "The Hotel Room Desi Chai Saver Reel",
        "detail": "Tearing premix sachet, stirring in hot water, and authentic taste reaction."
      }
    ],
    "contentDirections": {
      "tone": "Relatable, comforting, travel-friendly, delicious.",
      "videoSetup": "Scenic hotel balcony or train window desk, steaming mug.",
      "hashtags": "#TravelChai #InstantMasalaChai #DesiTeaLovers #Ad",
      "audio": "Cozy acoustic Indian guitar with warm voiceover."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@travel_chai_lover",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹30,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Showcase Follow-up Campaign",
        "payout": "₹30,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-20",
    "title": "100% Pure Himalayan Single-Estate Whole Leaf Green Tea",
    "brandName": "Export-Grade Premium Tea Estate (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #15803D 0%, #14532D 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹55,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Tea Ritual Reel • 1 YouTube Short • 2 Stories",
    "creatorsApplied": 25,
    "acceptanceChance": 83,
    "eligibilityRate": 90,
    "categories": [
      "Food",
      "Health",
      "Export Quality"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "English / Hindi",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Direct-from-source single-estate whole green tea leaves uncurling in transparent teapot with zero bitterness.",
    "scopeOfWork": [
      {
        "title": "Morning Detox Whole Leaf Infusion Reel",
        "detail": "Macro 4K timelapse of dried whole leaves unfurling and releasing liquor."
      }
    ],
    "contentDirections": {
      "tone": "Mindful, premium, elegant, authentic tea connoisseur.",
      "videoSetup": "Clear glass infuser teapot, morning sunlight through greenery.",
      "hashtags": "#WholeLeafTea #HimalayanGreenTea #TeaRitual #Ad",
      "audio": "Calm Zen meditation acoustic track with pouring water sounds."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@tarun_tea_sommelier",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹55,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Showcase Follow-up Campaign",
        "payout": "₹55,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-21",
    "title": "Fresh Black Tiger Prawns Butter Garlic Pan Sizzle",
    "brandName": "Leading Gourmet Fresh Meat & Seafood Brand (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹48,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Seafood Cooking Reel • 2 Stories",
    "creatorsApplied": 30,
    "acceptanceChance": 87,
    "eligibilityRate": 93,
    "categories": [
      "Food",
      "Cooking",
      "Gourmet"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Cook de-veined, fresh chilled black tiger prawns with sizzling butter, garlic, parsley, and lemon wedges.",
    "scopeOfWork": [
      {
        "title": "Butter Garlic Prawns Sizzle ASMR Reel",
        "detail": "Prawns sizzling in cast iron pan, turning pink, and succulent juicy bite."
      }
    ],
    "contentDirections": {
      "tone": "Mouthwatering, culinary, crisp, indulgent.",
      "videoSetup": "High-heat pan sizzle, macro steam and herb garnish.",
      "hashtags": "#ButterGarlicPrawns #GourmetSeafood #CookingASMR #Ad",
      "audio": "High-quality pan frying foley sounds with upbeat jazz cooking beat."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@chef_samir_cooks",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹48,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Showcase Follow-up Campaign",
        "payout": "₹48,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-22",
    "title": "10-Minute Instant Grocery Delivery Sunday Dum Biryani",
    "brandName": "Top Quick-Commerce Unicorn (Verified)",
    "partnerLogo": "/logos/uber-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹42,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 10-Minute Delivery & Cook Reel • 2 Stories",
    "creatorsApplied": 39,
    "acceptanceChance": 90,
    "eligibilityRate": 95,
    "categories": [
      "Food",
      "Cooking",
      "Lifestyle"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Order whole spices, basmati rice, and saffron on quick-commerce and cook a fragrant Sunday family Dum Biryani.",
    "scopeOfWork": [
      {
        "title": "The 10-Min Delivery to Dum Biryani Reel",
        "detail": "Ordering on app, doorbell delivery, layering rice and fried onions on camera."
      }
    ],
    "contentDirections": {
      "tone": "Appetizing, energetic, fast-paced, Sunday family cooking.",
      "videoSetup": "Steaming biryani pot opening, saffron rice layers.",
      "hashtags": "#QuickCommerceDelivery #SundayBiryani #InstantCooking #Ad",
      "audio": "Lively culinary fusion beat with upbeat commentary."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@biryani_diaries_hyderabad",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹42,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Showcase Follow-up Campaign",
        "payout": "₹42,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-23",
    "title": "Daily ₹10 Digital Gold Automatic Micro-Saving Challenge",
    "brandName": "Leading Fintech Micro-Savings Unicorn (Verified)",
    "partnerLogo": "/logos/stripe-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹50,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Educational Reel • 2 Stories",
    "creatorsApplied": 35,
    "acceptanceChance": 86,
    "eligibilityRate": 91,
    "categories": [
      "Finance",
      "Education",
      "Technology"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Round off daily UPI chai/food spends into pure 24K digital gold and watch gold grams accumulate automatically.",
    "scopeOfWork": [
      {
        "title": "The Chai-to-Gold Wealth Hack Reel",
        "detail": "Showing how saving just spare change of ₹15 daily built a ₹50,000 gold fund."
      }
    ],
    "contentDirections": {
      "tone": "Motivating, simple, relatable, transparent.",
      "videoSetup": "Clean mobile screen UI recording, daily UPI scan moment.",
      "hashtags": "#MicroSavings #DigitalGoldSavings #FinancialHabits #Ad",
      "audio": "Upbeat modern fintech pop with encouraging voiceover."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@fin_literate_rohit",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹50,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Finance Showcase Follow-up Campaign",
        "payout": "₹50,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-24",
    "title": "Web3 & Blockchain Distributed Ledger Educational Masterclass",
    "brandName": "Top Compliant Crypto Exchange (Verified)",
    "partnerLogo": "/logos/wise-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹70,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Whiteboard Educational Reel • 1 Carousel",
    "creatorsApplied": 22,
    "acceptanceChance": 77,
    "eligibilityRate": 86,
    "categories": [
      "Finance",
      "Technology",
      "Education"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE",
      "X"
    ],
    "description": "Explain blockchain ledgers, cryptographic keys, and security best practices in simple visual layman terms.",
    "scopeOfWork": [
      {
        "title": "How Blockchains Actually Work in 60s",
        "detail": "Visual animation explaining distributed ledgers without trading hype."
      }
    ],
    "contentDirections": {
      "tone": "Academic, tech-first, cautious, educational.",
      "videoSetup": "Minimalist tech desk, clear motion graphic overlays.",
      "hashtags": "#BlockchainBasics #CryptoEducation #TechMasterclass #Ad",
      "audio": "Clean electronic synth with articulate narration."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@crypto_tech_varun",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹70,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Finance Showcase Follow-up Campaign",
        "payout": "₹70,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-25",
    "title": "All-Day Comfort Wireless Seamless Lounge Bralette",
    "brandName": "Leading Intimate Wear & Loungewear Brand (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #FB7185 0%, #E11D48 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹42,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Comfort Review Reel • 2 Stories",
    "creatorsApplied": 35,
    "acceptanceChance": 89,
    "eligibilityRate": 94,
    "categories": [
      "Fashion",
      "Lifestyle",
      "Comfort"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Zero underwire poke, breathable cloud fabric, and invisible seamless finish under white t-shirts.",
    "scopeOfWork": [
      {
        "title": "The 12-Hour Wireless Comfort Test Reel",
        "detail": "Work-from-home lounge to errands wear test highlighting soft band."
      }
    ],
    "contentDirections": {
      "tone": "Relatable, body-positive, comfortable, candid.",
      "videoSetup": "Warm cozy bedroom, clean aesthetic mirror.",
      "hashtags": "#WirelessComfort #EverydayLingerie #BodyPositive #Ad",
      "audio": "Gentle upbeat acoustic indie song with relaxed voiceover."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@rhea_bodylove",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹42,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Showcase Follow-up Campaign",
        "payout": "₹42,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-26",
    "title": "Gourmand Warm Vanilla Cupcake Fine Fragrance Mist",
    "brandName": "Top Bath & Body D2C Label (Verified)",
    "partnerLogo": "/logos/patreon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #FBBF24 0%, #D97706 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹36,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Fragrance Spritz Reel • 2 Stories",
    "creatorsApplied": 44,
    "acceptanceChance": 92,
    "eligibilityRate": 96,
    "categories": [
      "Beauty",
      "Fragrance",
      "Lifestyle"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Smell like a freshly baked warm vanilla cupcake with long-lasting alcohol-free formulation.",
    "scopeOfWork": [
      {
        "title": "The Compliment Magnet Vanilla Mist Reel",
        "detail": "Spritzing after shower and capturing authentic smell reactions from friends."
      }
    ],
    "contentDirections": {
      "tone": "Sweet, gourmand, playful, cheerful.",
      "videoSetup": "Pastel vanity table, slow-motion fine mist spray against backlight.",
      "hashtags": "#VanillaMist #GourmandFragrance #BodyMistLovers #Ad",
      "audio": "Bubbly sweet pop track with enthusiastic commentary."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@fragrance_diaries_simran",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹36,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Showcase Follow-up Campaign",
        "payout": "₹36,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-27",
    "title": "5-in-1 Compact Click-and-Pop Matte Lipstick Wand",
    "brandName": "Trending Color Cosmetics Brand (Verified)",
    "partnerLogo": "/logos/figma.svg",
    "bannerImage": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #F43F5E 0%, #9F1239 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹38,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 5-Shade Swatch Reel • 2 Stories",
    "creatorsApplied": 43,
    "acceptanceChance": 90,
    "eligibilityRate": 95,
    "categories": [
      "Beauty",
      "Cosmetics"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Pop and click 5 iconic nude, peach, and red matte lipstick bullet shades in one single travel stick.",
    "scopeOfWork": [
      {
        "title": "5 Outfits 1 Lipstick Stick Challenge",
        "detail": "Rapid clicking between the 5 shades matching college, work, and party outfits."
      }
    ],
    "contentDirections": {
      "tone": "Clever, fast-paced, trendy, convenient.",
      "videoSetup": "Studio lighting, macro clicking sound and lip swatches.",
      "hashtags": "#5in1Lipstick #LipstickHacks #BeautyOnTheGo #Ad",
      "audio": "Trendy click sound synchronized with snappy musical cuts."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@swatches_by_divya",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹38,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Showcase Follow-up Campaign",
        "payout": "₹38,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-28",
    "title": "Precision 0.1mm Felt-Tip Waterproof Wing Eyeliner",
    "brandName": "Clean Botanical Cosmetics Label (Verified)",
    "partnerLogo": "/logos/canva.svg",
    "bannerImage": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #18181B 0%, #09090B 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹34,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Perfect Wing Tutorial Reel • 2 Stories",
    "creatorsApplied": 37,
    "acceptanceChance": 91,
    "eligibilityRate": 96,
    "categories": [
      "Beauty",
      "Clean Beauty",
      "Cosmetics"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "0.1mm micro-felt tip delivering jet black botanical argan oil eyeliner wings in 1 seamless stroke.",
    "scopeOfWork": [
      {
        "title": "The 10-Second Foolproof Wing Eyeliner Hack",
        "detail": "Drawing sharp graphic eyeliner wing without tugging sensitive eyelids."
      }
    ],
    "contentDirections": {
      "tone": "Sleek, instructional, clean, satisfying.",
      "videoSetup": "Macro ring light focus on eyelid precision.",
      "hashtags": "#WingedEyeliner #PrecisionEyeliner #CleanMakeup #Ad",
      "audio": "Upbeat smooth pop track with instructional voiceover."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@eye_art_by_pooja",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹34,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Showcase Follow-up Campaign",
        "payout": "₹34,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-29",
    "title": "Traditional 100% Real Alphonso Mango Pulp Memory Drink",
    "brandName": "Iconic Beverage & FMCG Brand (Verified)",
    "partnerLogo": "/logos/cocacola-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹40,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Storytelling Reel • 2 Stories",
    "creatorsApplied": 45,
    "acceptanceChance": 93,
    "eligibilityRate": 97,
    "categories": [
      "Food",
      "Storytelling",
      "Lifestyle"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Heartwarming childhood memory storytelling featuring real Alphonso mango pulp juice in the iconic paper pouch.",
    "scopeOfWork": [
      {
        "title": "Summer Vacations Nostalgia Storytelling Reel",
        "detail": "Nostalgic storytelling remembering summer holidays with chilled mango drink."
      }
    ],
    "contentDirections": {
      "tone": "Nostalgic, emotional, warm, wholesome.",
      "videoSetup": "Warm afternoon sunlight, retro vintage color grading.",
      "hashtags": "#MangoMemories #ChildhoodFlavours #AuthenticDrinks #Ad",
      "audio": "Nostalgic acoustic whistle and piano soundtrack."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@nostalgia_tales_amit",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹40,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Showcase Follow-up Campaign",
        "payout": "₹40,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-30",
    "title": "Mother-of-Pearl Rose Gold Artisan Luxury Timepiece",
    "brandName": "Top Heritage Horology House (Verified)",
    "partnerLogo": "/logos/apple-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹85,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Luxury Styling Reel • 3 Stories",
    "creatorsApplied": 22,
    "acceptanceChance": 80,
    "eligibilityRate": 88,
    "categories": [
      "Fashion",
      "Luxury",
      "Accessories"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "English / Hindi",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "PINTEREST"
    ],
    "description": "Style the mother-of-pearl dial and rose gold metal bracelet with modern corporate suits and festive silk sarees.",
    "scopeOfWork": [
      {
        "title": "The Statement Jewellery Watch Reel",
        "detail": "Wrist closeups showing light refraction on dial and seamless transitions across outfits."
      }
    ],
    "contentDirections": {
      "tone": "Graceful, regal, empowered, luxurious.",
      "videoSetup": "Soft luxury studio lighting, macro jewelry detail focus.",
      "hashtags": "#LuxuryTimepiece #RoseGoldWatch #TimelessElegance #Ad",
      "audio": "Sophisticated contemporary instrumental score."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@anushka_luxury_style",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹85,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Showcase Follow-up Campaign",
        "payout": "₹85,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-31",
    "title": "Polarized UV400 Gradient Aviator Road Trip Eyewear",
    "brandName": "Youth Eyewear & Accessories Brand (Verified)",
    "partnerLogo": "/logos/airbnb.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹32,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Road Trip Reel • 2 Stories",
    "creatorsApplied": 36,
    "acceptanceChance": 91,
    "eligibilityRate": 96,
    "categories": [
      "Fashion",
      "Travel",
      "Accessories"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Road trip driving glare test showing polarized UV400 lens cutting harsh highway reflections with metal aviator frames.",
    "scopeOfWork": [
      {
        "title": "The Highway Glare Polarized Lens Test",
        "detail": "Holding sunglasses in front of camera lens against windshield sunlight."
      }
    ],
    "contentDirections": {
      "tone": "Adventurous, cool, dynamic, youth road trip.",
      "videoSetup": "Open highway convertible/car, sunny coastal backdrop.",
      "hashtags": "#PolarizedSunglasses #RoadTripStyle #SunProtection #Ad",
      "audio": "High-energy indie rock driving anthem."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@road_tripper_karan",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹32,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Showcase Follow-up Campaign",
        "payout": "₹32,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-32",
    "title": "5% Redensyl + Procapil Hair Density & Growth Actives",
    "brandName": "Evidence-Based Active Skincare & Haircare Label (Verified)",
    "partnerLogo": "/logos/notion-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #475569 0%, #1E293B 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹55,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Science-First Hair Reel • 2 Stories",
    "creatorsApplied": 31,
    "acceptanceChance": 85,
    "eligibilityRate": 92,
    "categories": [
      "Beauty",
      "Hair Care",
      "Education"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Evidence-based breakdown showing how 5% Redensyl + Procapil + Anagain reactivates dormant hair stem cells at follicle level.",
    "scopeOfWork": [
      {
        "title": "The Science of Hair Follicle Actives Reel",
        "detail": "Scalp dropper application with 3D follicle graphics explaining anagen growth cycle."
      }
    ],
    "contentDirections": {
      "tone": "Science-first, trustworthy, transparent, myth-busting.",
      "videoSetup": "Minimalist clean laboratory backdrop, clear graphics.",
      "hashtags": "#HairGrowthActives #Redensyl5 #HairDensityRoutine #Ad",
      "audio": "Subtle clean electronic pulse with calm, informative voiceover."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@tricho_science_rahul",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹55,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Showcase Follow-up Campaign",
        "payout": "₹55,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-33",
    "title": "12-Hour Velvet Matte Non-Drying Liquid Lip Color",
    "brandName": "Celebrity Glamour Cosmetics Label (Verified)",
    "partnerLogo": "/logos/figma-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹35,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 12-Hr Wear Reel • 2 Stories",
    "creatorsApplied": 46,
    "acceptanceChance": 91,
    "eligibilityRate": 96,
    "categories": [
      "Beauty",
      "Cosmetics"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Non-drying velvet matte texture enriched with moringa oil that stays vibrant throughout meals without flaking.",
    "scopeOfWork": [
      {
        "title": "The Non-Drying Matte Lipstick Test",
        "detail": "Applying bold red shade, blot test with tissue, and checking lip hydration."
      }
    ],
    "contentDirections": {
      "tone": "Glamorous, sassy, relatable, colorful.",
      "videoSetup": "Beauty vanity ring light, clean macro mouth closeups.",
      "hashtags": "#VelvetMatte #LongLastingLipstick #GlamMakeup #Ad",
      "audio": "Upbeat disco pop beat with quick witty cuts."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@tanya_glam_studio",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹35,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Showcase Follow-up Campaign",
        "payout": "₹35,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-34",
    "title": "Limited Edition 500 GSM French Terry Luxury Hoodie Film",
    "brandName": "Ultra-Luxury Streetwear Fashion House (Verified)",
    "partnerLogo": "/logos/nike-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #000000 0%, #1A1A1A 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹1,40,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Cinematic Fashion Reel • 1 Carousel",
    "creatorsApplied": 18,
    "acceptanceChance": 65,
    "eligibilityRate": 80,
    "categories": [
      "Fashion",
      "Luxury",
      "Streetwear"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "X"
    ],
    "description": "Ultra-exclusive 500 GSM French terry hoodie with matte black custom metal hardware and bold rebellious design.",
    "scopeOfWork": [
      {
        "title": "Cinematic High-Fashion Streetwear Film",
        "detail": "4K anamorphic lens sequence in brutalist concrete architectural spaces."
      }
    ],
    "contentDirections": {
      "tone": "Dark, opulent, rebellious, hyper-exclusive, avant-garde.",
      "videoSetup": "Industrial warehouse, smoke haze, anamorphic flare lighting.",
      "hashtags": "#LuxuryStreetwear #CinematicFashion #LimitedDrop #Ad",
      "audio": "Deep industrial techno bassline with suspenseful builds."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@cinematic_kartik",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹1,40,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Showcase Follow-up Campaign",
        "payout": "₹1,40,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-35",
    "title": "Heritage Heavyweight Washed Denim Trucker Jacket",
    "brandName": "Leading Casual Denim & Outdoor Label (Verified)",
    "partnerLogo": "/logos/adidas-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #1E3A8A 0%, #172554 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹38,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Outfit Styling Reel • 2 Stories",
    "creatorsApplied": 38,
    "acceptanceChance": 89,
    "eligibilityRate": 94,
    "categories": [
      "Fashion",
      "Denim",
      "Lifestyle"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Style 100% rigid cotton washed denim trucker jacket with boots and graphic tee for vintage biker look.",
    "scopeOfWork": [
      {
        "title": "3 Ways to Style Classic Denim Jacket",
        "detail": "Layering with hoodie for winter, all-black casual streetwear, and rugged boots."
      }
    ],
    "contentDirections": {
      "tone": "Rugged, effortless, vintage, adventurous.",
      "videoSetup": "Vintage motorcycle backdrop, rustic brick alleyways.",
      "hashtags": "#DenimTrucker #VintageDenim #EverydayStreetwear #Ad",
      "audio": "Indie rock guitar riff with dynamic style transitions."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@biker_denim_dev",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹38,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Showcase Follow-up Campaign",
        "payout": "₹38,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-36",
    "title": "Crunchy Whole Grain Honey & Cocoa Millet Stars Cereal",
    "brandName": "Certified Organic Cereals Enterprise (Verified)",
    "partnerLogo": "/logos/duolingo.svg",
    "bannerImage": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #10B981 0%, #047857 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹30,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Crunchy Breakfast Reel • 2 Stories",
    "creatorsApplied": 35,
    "acceptanceChance": 93,
    "eligibilityRate": 98,
    "categories": [
      "Food",
      "Parenting",
      "Health"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Crunchy ragi & jowar star shapes that stay crispy in cold milk without getting soggy or loaded with refined sugar.",
    "scopeOfWork": [
      {
        "title": "The 5-Minute Milk Pour Crunch Test",
        "detail": "Pouring cold milk over millet stars, listening to crunch, and showing zero maida label."
      }
    ],
    "contentDirections": {
      "tone": "Joyful, crunchy, clean, wholesome parenting.",
      "videoSetup": "Sunny breakfast table, colorful ceramic bowl.",
      "hashtags": "#MilletCereal #HealthyBreakfast #KidsNutrition #Ad",
      "audio": "Satisfying milk pour and crunch ASMR sounds with cheerful acoustic melody."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@moms_healthy_plate",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹30,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Showcase Follow-up Campaign",
        "payout": "₹30,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-37",
    "title": "High-Protein Real Alphonso Mango Greek Yogurt Shake",
    "brandName": "Leading Gourmet Dairy & Fitness Brand (Verified)",
    "partnerLogo": "/logos/nike-official.svg",
    "bannerImage": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹34,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Post-Workout Shake Reel • 2 Stories",
    "creatorsApplied": 38,
    "acceptanceChance": 91,
    "eligibilityRate": 96,
    "categories": [
      "Fitness",
      "Food",
      "Supplements"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Grab-and-go 12g protein Greek yogurt smoothie with zero added preservatives for immediate gym muscle recovery.",
    "scopeOfWork": [
      {
        "title": "Post-Workout Protein In A Bottle",
        "detail": "Chugging chilled mango smoothie post-HIIT session with on-screen macro breakdown."
      }
    ],
    "contentDirections": {
      "tone": "Energizing, appetizing, active, refreshing.",
      "videoSetup": "Gym exit or outdoor park, sunny day glow, bottle condensation droplets.",
      "hashtags": "#HighProteinShake #PostWorkoutRecovery #FitnessFuel #Ad",
      "audio": "High-energy electronic workout beat."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@tarun_fitcoach",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹34,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Showcase Follow-up Campaign",
        "payout": "₹34,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-38",
    "title": "Farm-Fresh Malai Paneer Tender Sizzle & Softness Test",
    "brandName": "Top Farm-to-Home Dairy Enterprise (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #059669 0%, #047857 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹36,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Paneer Softness Reel • 2 Stories",
    "creatorsApplied": 34,
    "acceptanceChance": 92,
    "eligibilityRate": 97,
    "categories": [
      "Food",
      "Cooking",
      "Health"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Cut fresh buffalo milk malai paneer with a butter knife and cook Paneer Butter Masala with zero rubbery texture.",
    "scopeOfWork": [
      {
        "title": "The Softest Paneer Knife Cut Test",
        "detail": "Knife slicing like butter through fresh paneer block and pan searing to golden tenderness."
      }
    ],
    "contentDirections": {
      "tone": "Wholesome, appetizing, fresh, authentic.",
      "videoSetup": "Kitchen cutting board, pan-frying sizzle with rich gravy.",
      "hashtags": "#FreshPaneer #DesiCooking #GourmetPaneer #Ad",
      "audio": "Warm acoustic cooking melody with mouthwatering sizzle foley."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@rasoi_magic_anjali",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹36,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Showcase Follow-up Campaign",
        "payout": "₹36,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-39",
    "title": "Deep Sofa & Upholstery Injection-Extraction ASMR Cleaning",
    "brandName": "Leading At-Home Home Services Unicorn (Verified)",
    "partnerLogo": "/logos/uber-official.svg",
    "bannerImage": "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #0F172A 0%, #0284C7 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹45,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Deep Clean ASMR Reel • 2 Stories",
    "creatorsApplied": 29,
    "acceptanceChance": 88,
    "eligibilityRate": 94,
    "categories": [
      "Lifestyle",
      "Home",
      "Services"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Extremely satisfying video showing black dirt and water sucked out of sofa fabric using industrial vacuum extraction.",
    "scopeOfWork": [
      {
        "title": "The Oddly Satisfying Deep Sofa Cleaning",
        "detail": "Transparent vacuum nozzle sucking out dirty foaming water showing pristine fabric."
      }
    ],
    "contentDirections": {
      "tone": "Oddly satisfying, shocking, clean, transformational.",
      "videoSetup": "High contrast lighting, macro suction nozzle closeups in slow motion.",
      "hashtags": "#DeepCleaningASMR #SatisfyingClean #HomeTransformation #Ad",
      "audio": "Satisfying vacuum extraction foley sounds with upbeat chill electronic track."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@satisfying_clean_india",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹45,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Lifestyle Showcase Follow-up Campaign",
        "payout": "₹45,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-40",
    "title": "Intelligent Scalp Protection Fast Hair Dryer Showcase",
    "brandName": "Leading British Consumer Tech Enterprise (Verified)",
    "partnerLogo": "/logos/apple-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #EC4899 0%, #831843 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "£1,450",
    "currencySymbol": "£",
    "currencyCode": "GBP",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Styling Reel • 3 Stories",
    "creatorsApplied": 18,
    "acceptanceChance": 74,
    "eligibilityRate": 85,
    "categories": [
      "Technology",
      "Beauty",
      "Hair Care"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "English",
    "country": "United Kingdom",
    "countryCode": "GB",
    "countryFlag": "🇬🇧",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Demonstrate Scalp Protect sensor automatically reducing heat at 55°C to preserve natural shine and prevent thermal damage.",
    "scopeOfWork": [
      {
        "title": "Salon-Grade Blowout with Scalp Sensor",
        "detail": "Testing distance sensing LED changing from red to orange while drying curly hair."
      }
    ],
    "contentDirections": {
      "tone": "Futuristic, premium, high-tech beauty, luxurious.",
      "videoSetup": "Studio vanity mirror, macro sensor LED and airflow closeup in 4K.",
      "hashtags": "#HairTech #ScalpProtection #SalonBlowout #Ad",
      "audio": "Sleek electronic bassline with studio microphone voiceover."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@chloe_hairartist",
        "country": "United Kingdom",
        "flag": "🇬🇧",
        "bid": "£1,450",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Showcase Follow-up Campaign",
        "payout": "£1,450 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-41",
    "title": "Vital Seamless 2.0 High-Waist Squat-Proof Gym Leggings",
    "brandName": "Leading British Athleisure Label (Verified)",
    "partnerLogo": "/logos/nike.svg",
    "bannerImage": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "£850",
    "currencySymbol": "£",
    "currencyCode": "GBP",
    "payType": "Fixed Pay",
    "deliverablesSummary": "2 High-Energy Gym Reels • 4 Stories",
    "creatorsApplied": 24,
    "acceptanceChance": 82,
    "eligibilityRate": 90,
    "categories": [
      "Fitness",
      "Fashion",
      "Athleisure"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "English",
    "country": "United Kingdom",
    "countryCode": "GB",
    "countryFlag": "🇬🇧",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Heavy barbell deadlifts, squats, and HIIT sprints demonstrating sweat-wicking knit and compression support.",
    "scopeOfWork": [
      {
        "title": "Heavy Leg Day Squat & Sweat Test",
        "detail": "High-intensity workout wear test with direct audience discount code."
      }
    ],
    "contentDirections": {
      "tone": "High-octane, intense, motivating, athletic.",
      "videoSetup": "Dark aesthetic gym lighting, heavy weights, speed ramp tracking camera.",
      "hashtags": "#GymLeggings #SquatProof #FitnessMotivation #Ad",
      "audio": "Heavy-bass motivational gym music synced to barbell lifts."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@fitt_with_emma",
        "country": "United Kingdom",
        "flag": "🇬🇧",
        "bid": "£850",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Showcase Follow-up Campaign",
        "payout": "£850 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-42",
    "title": "Pillowy Gel-Cream Seamless Cheek Flush Blush Tutorial",
    "brandName": "NYC Minimalist Beauty Label (Verified)",
    "partnerLogo": "/logos/canva-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #FB7185 0%, #F43F5E 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "$1,650",
    "currencySymbol": "$",
    "currencyCode": "USD",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Blend Technique Reel • 3 Stories",
    "creatorsApplied": 26,
    "acceptanceChance": 80,
    "eligibilityRate": 88,
    "categories": [
      "Beauty",
      "Cosmetics",
      "Clean Beauty"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "English",
    "country": "United States",
    "countryCode": "US",
    "countryFlag": "🇺🇸",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Dab a pea-sized drop on cheekbones and tap out sheer, pillowy, natural flushed glow with no harsh lines.",
    "scopeOfWork": [
      {
        "title": "The Pillowy Natural Flush Tutorial",
        "detail": "Fingertip blending technique showing sheer buildable coverage on bare skin."
      }
    ],
    "contentDirections": {
      "tone": "Effortless, dewy, glowing, minimalist chic.",
      "videoSetup": "Natural golden hour window light, macro cheek tap.",
      "hashtags": "#CreamBlush #NoMakeupMakeup #DewyGlow #Ad",
      "audio": "Dreamy bedroom pop acoustic track with calm voiceover."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@maya_cleanbeauty",
        "country": "United States",
        "flag": "🇺🇸",
        "bid": "$1,650",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Showcase Follow-up Campaign",
        "payout": "$1,650 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-43",
    "title": "Weightless Buttery-Soft Second-Skin Yoga Flow Set",
    "brandName": "Top Global Athleisure & Yoga Label (Verified)",
    "partnerLogo": "/logos/puma-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "$2,200",
    "currencySymbol": "$",
    "currencyCode": "USD",
    "payType": "Fixed Pay",
    "deliverablesSummary": "2 Morning Yoga Reels • 4 Stories",
    "creatorsApplied": 20,
    "acceptanceChance": 72,
    "eligibilityRate": 84,
    "categories": [
      "Fitness",
      "Yoga",
      "Athleisure"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "English",
    "country": "United States",
    "countryCode": "US",
    "countryFlag": "🇺🇸",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Experience the buttery-soft weightless fabric during sunrise vinyasa flows with zero friction and second-skin stretch.",
    "scopeOfWork": [
      {
        "title": "Sunrise Vinyasa Flow in Active Set",
        "detail": "Seamless camera transitions between morning meditation, flow poses, and matcha routine."
      }
    ],
    "contentDirections": {
      "tone": "Mindful, serene, elevated, luxurious athleisure.",
      "videoSetup": "Sun-drenched studio loft with natural oak wood floor.",
      "hashtags": "#YogaFlow #MindfulMovement #AthleisureStyle #Ad",
      "audio": "Peaceful ambient meditation music with soft narration."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@sophia_mindfulflow",
        "country": "United States",
        "flag": "🇺🇸",
        "bid": "$2,200",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Showcase Follow-up Campaign",
        "payout": "$2,200 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-44",
    "title": "Centrifusion Rapid Crema Extraction Home Barista Masterclass",
    "brandName": "Leading European Coffee Machine Enterprise (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #78350F 0%, #451A03 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "€950",
    "currencySymbol": "€",
    "currencyCode": "EUR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 1-Touch Barista Reel • 2 Stories",
    "creatorsApplied": 21,
    "acceptanceChance": 81,
    "eligibilityRate": 89,
    "categories": [
      "Food",
      "Coffee",
      "Lifestyle"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "French / English",
    "country": "France",
    "countryCode": "FR",
    "countryFlag": "🇫🇷",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Insert barcode pod, press 1 button, and watch 4,000 RPM Centrifusion technology spin thick velvety coffee crema.",
    "scopeOfWork": [
      {
        "title": "The Perfect Morning Crema Pour",
        "detail": "Macro 4K video of barcode scanning, spinning extraction, and golden crema layer."
      }
    ],
    "contentDirections": {
      "tone": "Sophisticated, Parisian aesthetic, sensory, luxurious.",
      "videoSetup": "Parisian balcony or marble coffee bar, crystal glassware.",
      "hashtags": "#HomeBarista #CoffeeCrema #MorningCoffeeRitual #Ad",
      "audio": "Classy French jazz accordion & acoustic bass with brewing ASMR."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@lucas_cafe_paris",
        "country": "France",
        "flag": "🇫🇷",
        "bid": "€950",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Showcase Follow-up Campaign",
        "payout": "€950 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-45",
    "title": "Anodized Aviation Aluminum Cabin Suitcase Travel Film",
    "brandName": "Heritage German Luxury Luggage House (Verified)",
    "partnerLogo": "/logos/airbnb-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #64748B 0%, #334155 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "€1,850",
    "currencySymbol": "€",
    "currencyCode": "EUR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Cinematic Travel Reel • 1 YouTube Vlog",
    "creatorsApplied": 15,
    "acceptanceChance": 68,
    "eligibilityRate": 82,
    "categories": [
      "Travel",
      "Luxury",
      "Design"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "German / English",
    "country": "Germany",
    "countryCode": "DE",
    "countryFlag": "🇩🇪",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Iconic grooved aviation aluminum shell, handmade leather handles, and Multiwheel ball-bearing glide in first class.",
    "scopeOfWork": [
      {
        "title": "The Timeless Aluminum Case Film",
        "detail": "Cinematic tracking shot through luxury terminal, TSA lock clicks, and leather patina."
      }
    ],
    "contentDirections": {
      "tone": "Timeless, architectural, German engineering excellence, luxury travel.",
      "videoSetup": "First-class lounges, high-end design hotels, 4K 60fps tracking camera.",
      "hashtags": "#LuxuryTravel #EngineeredLuggage #TravelInStyle #Ad",
      "audio": "Minimalist cinematic electronic soundscape."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@maximilian_voyage",
        "country": "Germany",
        "flag": "🇩🇪",
        "bid": "€1,850",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Travel Showcase Follow-up Campaign",
        "payout": "€1,850 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-46",
    "title": "Enameled Cast Iron Dutch Oven Slow-Cooked Stew Master",
    "brandName": "Heritage French Cookware Manufacturer (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "€750",
    "currencySymbol": "€",
    "currencyCode": "EUR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 Slow-Cooked Stew Reel • 2 Stories",
    "creatorsApplied": 19,
    "acceptanceChance": 84,
    "eligibilityRate": 91,
    "categories": [
      "Food",
      "Cooking",
      "Kitchenware"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "French / English",
    "country": "France",
    "countryCode": "FR",
    "countryFlag": "🇫🇷",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Slow-simmer French Boeuf Bourguignon demonstrating even heat retention and signature flame-orange enamel finish.",
    "scopeOfWork": [
      {
        "title": "The 3-Hour Slow Braise Dutch Oven Reel",
        "detail": "Searing beef, deglazing red wine, simmering with lid on, and unveiling rich sauce."
      }
    ],
    "contentDirections": {
      "tone": "Cozy, rustic, artisanal, indulgent gourmet cooking.",
      "videoSetup": "Warm candlelit kitchen, wooden dining table, macro steam sizzle.",
      "hashtags": "#CastIronCooking #SlowCooking #GourmetStew #Ad",
      "audio": "Gentle French acoustic waltz with mouthwatering simmer sounds."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@julie_frenchtable",
        "country": "France",
        "flag": "🇫🇷",
        "bid": "€750",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Showcase Follow-up Campaign",
        "payout": "€750 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-47",
    "title": "33MP Full-Frame Compact Cinema Camera Creator Review",
    "brandName": "Top Japanese Camera & Optics Enterprise (Verified)",
    "partnerLogo": "/logos/sony-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #0284C7 0%, #0369A1 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "¥240,000",
    "currencySymbol": "¥",
    "currencyCode": "JPY",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Dedicated Camera Review • 2 Shorts",
    "creatorsApplied": 17,
    "acceptanceChance": 70,
    "eligibilityRate": 83,
    "categories": [
      "Technology",
      "Photography",
      "AI"
    ],
    "isNew": true,
    "postedAt": "Aug 27, 2026 • 2:30 PM",
    "projectTimeline": "Sep 5 – Sep 25, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Japanese / English",
    "country": "Japan",
    "countryCode": "JP",
    "countryFlag": "🇯🇵",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Review 33MP full-frame sensor, AI subject recognition autofocus, and 4K 60p compact body for solo travel filmmakers.",
    "scopeOfWork": [
      {
        "title": "Tokyo Night Walk 4K 60fps Low-Light Test",
        "detail": "Handheld walking through Shibuya night rain showcasing 7-step stabilization."
      }
    ],
    "contentDirections": {
      "tone": "Cinematic, technical, authoritative, visually stunning.",
      "videoSetup": "Tokyo neon reflections, razor-sharp eye-autofocus tracking.",
      "hashtags": "#CinematicCamera #FullFrameVlog #LowLightVideo #Ad",
      "audio": "Atmospheric lo-fi synth with crisp Japanese & English narration."
    },
    "milestones": [
      "1. Concept & plan check",
      "2. Video rough cut review",
      "3. Final live publication"
    ],
    "proposals": [
      {
        "handle": "@kenji_cinematics",
        "country": "Japan",
        "flag": "🇯🇵",
        "bid": "¥240,000",
        "days": "8",
        "rating": "5.0",
        "reviews": 96,
        "er": "9.8",
        "pitch": "Experienced content creator with strong engagement in this category."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Showcase Follow-up Campaign",
        "payout": "¥240,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-48",
    "title": "Matte Ceramic Coated Non-Stick Sauté Pan Cooking Test",
    "brandName": "Premium Culinary Cookware Enterprise (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹42,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 47,
    "acceptanceChance": 93,
    "eligibilityRate": 95,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹42,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹42,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-49",
    "title": "100% Pure Cold-Pressed Sweet Almond Hair Oil Ritual",
    "brandName": "Ayurvedic Hair & Scalp Therapeutics Brand (Verified)",
    "partnerLogo": "/logos/canva-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹38,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 48,
    "acceptanceChance": 82,
    "eligibilityRate": 96,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹38,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹38,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-50",
    "title": "Ultra-Breathable Bamboo Viscose Underwear Comfort Challenge",
    "brandName": "Modern Sustainable Essentials Label (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹35,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 49,
    "acceptanceChance": 83,
    "eligibilityRate": 97,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹35,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹35,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-51",
    "title": "Smart Touchscreen Air Fryer Healthy Samosa Challenge",
    "brandName": "Smart Kitchen Appliances Enterprise (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹55,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 25,
    "acceptanceChance": 84,
    "eligibilityRate": 88,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹55,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹55,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-52",
    "title": "Ergonomic Lumbar Support Mesh Office Chair Assembly & Review",
    "brandName": "Ergonomic Workspace Solutions (Verified)",
    "partnerLogo": "/logos/notion.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹60,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 26,
    "acceptanceChance": 85,
    "eligibilityRate": 89,
    "categories": [
      "Home",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our home campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Home Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#HomeReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_home",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹60,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Home reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Home Seasonal Launch Campaign",
        "payout": "₹60,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-53",
    "title": "Instant Filter Coffee Decoction 30-Second Morning Pour",
    "brandName": "South Indian Artisanal Coffee Brand (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹32,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 27,
    "acceptanceChance": 86,
    "eligibilityRate": 90,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹32,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹32,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-54",
    "title": "High-Cushion Carbon Plate Running Shoes 10K Time Trial",
    "brandName": "Performance Athletic Footwear Label (Verified)",
    "partnerLogo": "/logos/nike-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹65,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 28,
    "acceptanceChance": 87,
    "eligibilityRate": 91,
    "categories": [
      "Fitness",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fitness campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fitness Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FitnessReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fitness",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹65,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fitness reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Seasonal Launch Campaign",
        "payout": "₹65,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-55",
    "title": "Hydrating Rice Water & Ceramide Night Barrier Moisture Mask",
    "brandName": "Derma-Approved Clean Cosmetics (Verified)",
    "partnerLogo": "/logos/canva.svg",
    "bannerImage": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹36,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 29,
    "acceptanceChance": 88,
    "eligibilityRate": 92,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹36,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹36,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-56",
    "title": "Wireless 65W Fast MagSafe Multi-Device Charging Station",
    "brandName": "Next-Gen Mobile Accessories Brand (Verified)",
    "partnerLogo": "/logos/apple-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹48,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 30,
    "acceptanceChance": 89,
    "eligibilityRate": 93,
    "categories": [
      "Technology",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our technology campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Technology Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TechnologyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_technology",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹48,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Technology reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Seasonal Launch Campaign",
        "payout": "₹48,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-57",
    "title": "Direct-Trade Single-Origin Chikmagalur Dark Roast Beans",
    "brandName": "Specialty Coffee Roasters (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹34,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 31,
    "acceptanceChance": 90,
    "eligibilityRate": 94,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹34,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹34,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-58",
    "title": "4K Wireless Security Cam Dual-Lens Solar Powered Guard",
    "brandName": "Smart Home Automation Unicorn (Verified)",
    "partnerLogo": "/logos/google-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹58,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 32,
    "acceptanceChance": 91,
    "eligibilityRate": 95,
    "categories": [
      "Technology",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our technology campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Technology Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TechnologyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_technology",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹58,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Technology reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Seasonal Launch Campaign",
        "payout": "₹58,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-59",
    "title": "Pure Copper Hammered Water Bottle Ayurvedic Daily Ritual",
    "brandName": "Heritage Copper & Brass Artisans (Verified)",
    "partnerLogo": "/logos/patreon.svg",
    "bannerImage": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹30,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 33,
    "acceptanceChance": 92,
    "eligibilityRate": 96,
    "categories": [
      "Health",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our health campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Health Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#HealthReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_health",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹30,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Health reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Health Seasonal Launch Campaign",
        "payout": "₹30,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-60",
    "title": "Classic Japanese Selvedge Raw Indigo Jeans Break-In Test",
    "brandName": "Denim Artisanal Workshop (Verified)",
    "partnerLogo": "/logos/adidas-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹52,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 34,
    "acceptanceChance": 93,
    "eligibilityRate": 97,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "PINTEREST"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹52,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹52,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-61",
    "title": "Dual-Phase Vitamin E Cleansing Balm Makeup Melt Test",
    "brandName": "Clean Skincare Lab (Verified)",
    "partnerLogo": "/logos/shopify.svg",
    "bannerImage": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹33,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 35,
    "acceptanceChance": 82,
    "eligibilityRate": 88,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹33,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹33,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-62",
    "title": "Lightweight Honeycomb Shell 8000Hz Polling Rate Gaming Mouse",
    "brandName": "Pro Gaming Gear (Verified)",
    "partnerLogo": "/logos/twitch.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹46,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 36,
    "acceptanceChance": 83,
    "eligibilityRate": 89,
    "categories": [
      "Gaming",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "TWITCH",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our gaming campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Gaming Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#GamingReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_gaming",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹46,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Gaming reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Gaming Seasonal Launch Campaign",
        "payout": "₹46,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-63",
    "title": "Adjustable Quick-Lock Dumbbells Home Gym Space Saving Tour",
    "brandName": "Home Fitness Equipment Innovators (Verified)",
    "partnerLogo": "/logos/nike-official.svg",
    "bannerImage": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹70,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 37,
    "acceptanceChance": 84,
    "eligibilityRate": 90,
    "categories": [
      "Fitness",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fitness campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fitness Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FitnessReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fitness",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹70,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fitness reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Seasonal Launch Campaign",
        "payout": "₹70,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-64",
    "title": "Artisanal Himalayan Yak Cheese Churpi Chews Dog Treats",
    "brandName": "Natural Pet Nutrition Brand (Verified)",
    "partnerLogo": "/logos/shopify-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹28,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 38,
    "acceptanceChance": 85,
    "eligibilityRate": 91,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹28,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹28,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-65",
    "title": "Water-Repellent Commuter Laptop Backpack Weather Test",
    "brandName": "Urban Travel & EDC Gear (Verified)",
    "partnerLogo": "/logos/puma-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹40,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 39,
    "acceptanceChance": 86,
    "eligibilityRate": 92,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹40,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹40,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-66",
    "title": "Zero-Forex Markup Global Travel Debit Card Airport Test",
    "brandName": "Neo-Banking Fintech Platform (Verified)",
    "partnerLogo": "/logos/wise-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹65,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 40,
    "acceptanceChance": 87,
    "eligibilityRate": 93,
    "categories": [
      "Finance",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our finance campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Finance Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FinanceReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_finance",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹65,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Finance reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Finance Seasonal Launch Campaign",
        "payout": "₹65,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-67",
    "title": "Cruelty-Free Botanical Lash Growth Peptide Mascara",
    "brandName": "Clean Cosmetics Innovators (Verified)",
    "partnerLogo": "/logos/figma.svg",
    "bannerImage": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹35,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 41,
    "acceptanceChance": 88,
    "eligibilityRate": 94,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹35,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹35,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-68",
    "title": "High-Torque Electric Cycle All-Terrain Hill Climb Test",
    "brandName": "Sustainable Smart Mobility (Verified)",
    "partnerLogo": "/logos/tesla-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹85,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 42,
    "acceptanceChance": 89,
    "eligibilityRate": 95,
    "categories": [
      "Automobile",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our automobile campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Automobile Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#AutomobileReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_automobile",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹85,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Automobile reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Automobile Seasonal Launch Campaign",
        "payout": "₹85,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-69",
    "title": "Organic Stone-Ground A2 Cow Ghee Tadka Aroma Test",
    "brandName": "Certified Organic Farm Dairy (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹40,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 43,
    "acceptanceChance": 90,
    "eligibilityRate": 96,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹40,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹40,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-70",
    "title": "Noise-Cancelling Studio Boom Mic Podcast Audio Test",
    "brandName": "Creator Studio Acoustics (Verified)",
    "partnerLogo": "/logos/spotify.svg",
    "bannerImage": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹50,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 44,
    "acceptanceChance": 91,
    "eligibilityRate": 97,
    "categories": [
      "Technology",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our technology campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Technology Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TechnologyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_technology",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹50,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Technology reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Seasonal Launch Campaign",
        "payout": "₹50,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-71",
    "title": "Pure Mulberry Silk Pillowcase Hair Frizz Reduction Test",
    "brandName": "Luxury Sleep & Silk Essentials (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹45,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 45,
    "acceptanceChance": 92,
    "eligibilityRate": 88,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹45,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹45,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-72",
    "title": "Plant-Based Fermented Pea Protein Shake Taste Test",
    "brandName": "Vegan Sports Nutrition (Verified)",
    "partnerLogo": "/logos/nike.svg",
    "bannerImage": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹42,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 46,
    "acceptanceChance": 93,
    "eligibilityRate": 89,
    "categories": [
      "Fitness",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fitness campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fitness Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FitnessReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fitness",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹42,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fitness reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Seasonal Launch Campaign",
        "payout": "₹42,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-73",
    "title": "Smart Self-Watering Indoor Herb Garden Time-Lapse",
    "brandName": "Urban Hydroponic Living (Verified)",
    "partnerLogo": "/logos/shopify.svg",
    "bannerImage": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹48,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 47,
    "acceptanceChance": 82,
    "eligibilityRate": 90,
    "categories": [
      "Home",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our home campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Home Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#HomeReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_home",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹48,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Home reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Home Seasonal Launch Campaign",
        "payout": "₹48,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-74",
    "title": "Multi-Peptide Lash & Brow Enhancing Density Serum",
    "brandName": "Clinical Cosmetics (Verified)",
    "partnerLogo": "/logos/canva.svg",
    "bannerImage": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹37,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 48,
    "acceptanceChance": 83,
    "eligibilityRate": 91,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹37,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹37,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-75",
    "title": "Compact Folding Ultra-Light Drone 4K Sunset Flight",
    "brandName": "Consumer Drone & Robotics (Verified)",
    "partnerLogo": "/logos/sony-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹95,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 49,
    "acceptanceChance": 84,
    "eligibilityRate": 92,
    "categories": [
      "Travel",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our travel campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Travel Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TravelReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_travel",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹95,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Travel reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Travel Seasonal Launch Campaign",
        "payout": "₹95,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-76",
    "title": "Gluten-Free Almond Flour Keto Cookie Baking Session",
    "brandName": "Healthy Gourmet Bakery (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹34,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 25,
    "acceptanceChance": 85,
    "eligibilityRate": 93,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹34,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹34,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-77",
    "title": "Anti-Theft RFID Blocking Minimalist Leather Bifold",
    "brandName": "Heritage Leathercraft Studio (Verified)",
    "partnerLogo": "/logos/puma-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹36,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 26,
    "acceptanceChance": 86,
    "eligibilityRate": 94,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹36,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹36,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-78",
    "title": "Matte Ceramic Coated Non-Stick Sauté Pan Cooking Test",
    "brandName": "Premium Culinary Cookware Enterprise (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹42,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 27,
    "acceptanceChance": 87,
    "eligibilityRate": 95,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹42,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹42,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-79",
    "title": "100% Pure Cold-Pressed Sweet Almond Hair Oil Ritual",
    "brandName": "Ayurvedic Hair & Scalp Therapeutics Brand (Verified)",
    "partnerLogo": "/logos/canva-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹38,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 28,
    "acceptanceChance": 88,
    "eligibilityRate": 96,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹38,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹38,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-80",
    "title": "Ultra-Breathable Bamboo Viscose Underwear Comfort Challenge",
    "brandName": "Modern Sustainable Essentials Label (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹35,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 29,
    "acceptanceChance": 89,
    "eligibilityRate": 97,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹35,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹35,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-81",
    "title": "Smart Touchscreen Air Fryer Healthy Samosa Challenge",
    "brandName": "Smart Kitchen Appliances Enterprise (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹55,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 30,
    "acceptanceChance": 90,
    "eligibilityRate": 88,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹55,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹55,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-82",
    "title": "Ergonomic Lumbar Support Mesh Office Chair Assembly & Review",
    "brandName": "Ergonomic Workspace Solutions (Verified)",
    "partnerLogo": "/logos/notion.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹60,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 31,
    "acceptanceChance": 91,
    "eligibilityRate": 89,
    "categories": [
      "Home",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our home campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Home Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#HomeReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_home",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹60,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Home reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Home Seasonal Launch Campaign",
        "payout": "₹60,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-83",
    "title": "Instant Filter Coffee Decoction 30-Second Morning Pour",
    "brandName": "South Indian Artisanal Coffee Brand (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹32,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 32,
    "acceptanceChance": 92,
    "eligibilityRate": 90,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹32,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹32,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-84",
    "title": "High-Cushion Carbon Plate Running Shoes 10K Time Trial",
    "brandName": "Performance Athletic Footwear Label (Verified)",
    "partnerLogo": "/logos/nike-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹65,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 33,
    "acceptanceChance": 93,
    "eligibilityRate": 91,
    "categories": [
      "Fitness",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fitness campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fitness Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FitnessReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fitness",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹65,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fitness reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Seasonal Launch Campaign",
        "payout": "₹65,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-85",
    "title": "Hydrating Rice Water & Ceramide Night Barrier Moisture Mask",
    "brandName": "Derma-Approved Clean Cosmetics (Verified)",
    "partnerLogo": "/logos/canva.svg",
    "bannerImage": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹36,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 34,
    "acceptanceChance": 82,
    "eligibilityRate": 92,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹36,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹36,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-86",
    "title": "Wireless 65W Fast MagSafe Multi-Device Charging Station",
    "brandName": "Next-Gen Mobile Accessories Brand (Verified)",
    "partnerLogo": "/logos/apple-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹48,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 35,
    "acceptanceChance": 83,
    "eligibilityRate": 93,
    "categories": [
      "Technology",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our technology campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Technology Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TechnologyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_technology",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹48,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Technology reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Seasonal Launch Campaign",
        "payout": "₹48,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-87",
    "title": "Direct-Trade Single-Origin Chikmagalur Dark Roast Beans",
    "brandName": "Specialty Coffee Roasters (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹34,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 36,
    "acceptanceChance": 84,
    "eligibilityRate": 94,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹34,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹34,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-88",
    "title": "4K Wireless Security Cam Dual-Lens Solar Powered Guard",
    "brandName": "Smart Home Automation Unicorn (Verified)",
    "partnerLogo": "/logos/google-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹58,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 37,
    "acceptanceChance": 85,
    "eligibilityRate": 95,
    "categories": [
      "Technology",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our technology campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Technology Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TechnologyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_technology",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹58,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Technology reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Seasonal Launch Campaign",
        "payout": "₹58,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-89",
    "title": "Pure Copper Hammered Water Bottle Ayurvedic Daily Ritual",
    "brandName": "Heritage Copper & Brass Artisans (Verified)",
    "partnerLogo": "/logos/patreon.svg",
    "bannerImage": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹30,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 38,
    "acceptanceChance": 86,
    "eligibilityRate": 96,
    "categories": [
      "Health",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our health campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Health Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#HealthReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_health",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹30,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Health reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Health Seasonal Launch Campaign",
        "payout": "₹30,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-90",
    "title": "Classic Japanese Selvedge Raw Indigo Jeans Break-In Test",
    "brandName": "Denim Artisanal Workshop (Verified)",
    "partnerLogo": "/logos/adidas-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹52,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 39,
    "acceptanceChance": 87,
    "eligibilityRate": 97,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "PINTEREST"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹52,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹52,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-91",
    "title": "Dual-Phase Vitamin E Cleansing Balm Makeup Melt Test",
    "brandName": "Clean Skincare Lab (Verified)",
    "partnerLogo": "/logos/shopify.svg",
    "bannerImage": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹33,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 40,
    "acceptanceChance": 88,
    "eligibilityRate": 88,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹33,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹33,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-92",
    "title": "Lightweight Honeycomb Shell 8000Hz Polling Rate Gaming Mouse",
    "brandName": "Pro Gaming Gear (Verified)",
    "partnerLogo": "/logos/twitch.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹46,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 41,
    "acceptanceChance": 89,
    "eligibilityRate": 89,
    "categories": [
      "Gaming",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "TWITCH",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our gaming campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Gaming Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#GamingReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_gaming",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹46,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Gaming reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Gaming Seasonal Launch Campaign",
        "payout": "₹46,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-93",
    "title": "Adjustable Quick-Lock Dumbbells Home Gym Space Saving Tour",
    "brandName": "Home Fitness Equipment Innovators (Verified)",
    "partnerLogo": "/logos/nike-official.svg",
    "bannerImage": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹70,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 42,
    "acceptanceChance": 90,
    "eligibilityRate": 90,
    "categories": [
      "Fitness",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fitness campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fitness Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FitnessReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fitness",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹70,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fitness reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Seasonal Launch Campaign",
        "payout": "₹70,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-94",
    "title": "Artisanal Himalayan Yak Cheese Churpi Chews Dog Treats",
    "brandName": "Natural Pet Nutrition Brand (Verified)",
    "partnerLogo": "/logos/shopify-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹28,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 43,
    "acceptanceChance": 91,
    "eligibilityRate": 91,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹28,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹28,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-95",
    "title": "Water-Repellent Commuter Laptop Backpack Weather Test",
    "brandName": "Urban Travel & EDC Gear (Verified)",
    "partnerLogo": "/logos/puma-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹40,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 44,
    "acceptanceChance": 92,
    "eligibilityRate": 92,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹40,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹40,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-96",
    "title": "Zero-Forex Markup Global Travel Debit Card Airport Test",
    "brandName": "Neo-Banking Fintech Platform (Verified)",
    "partnerLogo": "/logos/wise-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹65,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 45,
    "acceptanceChance": 93,
    "eligibilityRate": 93,
    "categories": [
      "Finance",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our finance campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Finance Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FinanceReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_finance",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹65,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Finance reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Finance Seasonal Launch Campaign",
        "payout": "₹65,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-97",
    "title": "Cruelty-Free Botanical Lash Growth Peptide Mascara",
    "brandName": "Clean Cosmetics Innovators (Verified)",
    "partnerLogo": "/logos/figma.svg",
    "bannerImage": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹35,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 46,
    "acceptanceChance": 82,
    "eligibilityRate": 94,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹35,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹35,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-98",
    "title": "High-Torque Electric Cycle All-Terrain Hill Climb Test",
    "brandName": "Sustainable Smart Mobility (Verified)",
    "partnerLogo": "/logos/tesla-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹85,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 47,
    "acceptanceChance": 83,
    "eligibilityRate": 95,
    "categories": [
      "Automobile",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our automobile campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Automobile Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#AutomobileReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_automobile",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹85,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Automobile reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Automobile Seasonal Launch Campaign",
        "payout": "₹85,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-99",
    "title": "Organic Stone-Ground A2 Cow Ghee Tadka Aroma Test",
    "brandName": "Certified Organic Farm Dairy (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹40,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 48,
    "acceptanceChance": 84,
    "eligibilityRate": 96,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹40,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹40,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-100",
    "title": "Noise-Cancelling Studio Boom Mic Podcast Audio Test",
    "brandName": "Creator Studio Acoustics (Verified)",
    "partnerLogo": "/logos/spotify.svg",
    "bannerImage": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹50,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 49,
    "acceptanceChance": 85,
    "eligibilityRate": 97,
    "categories": [
      "Technology",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our technology campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Technology Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TechnologyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_technology",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹50,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Technology reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Seasonal Launch Campaign",
        "payout": "₹50,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-101",
    "title": "Pure Mulberry Silk Pillowcase Hair Frizz Reduction Test",
    "brandName": "Luxury Sleep & Silk Essentials (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹45,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 25,
    "acceptanceChance": 86,
    "eligibilityRate": 88,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹45,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹45,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-102",
    "title": "Plant-Based Fermented Pea Protein Shake Taste Test",
    "brandName": "Vegan Sports Nutrition (Verified)",
    "partnerLogo": "/logos/nike.svg",
    "bannerImage": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹42,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 26,
    "acceptanceChance": 87,
    "eligibilityRate": 89,
    "categories": [
      "Fitness",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fitness campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fitness Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FitnessReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fitness",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹42,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fitness reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Seasonal Launch Campaign",
        "payout": "₹42,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-103",
    "title": "Smart Self-Watering Indoor Herb Garden Time-Lapse",
    "brandName": "Urban Hydroponic Living (Verified)",
    "partnerLogo": "/logos/shopify.svg",
    "bannerImage": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹48,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 27,
    "acceptanceChance": 88,
    "eligibilityRate": 90,
    "categories": [
      "Home",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our home campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Home Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#HomeReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_home",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹48,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Home reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Home Seasonal Launch Campaign",
        "payout": "₹48,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-104",
    "title": "Multi-Peptide Lash & Brow Enhancing Density Serum",
    "brandName": "Clinical Cosmetics (Verified)",
    "partnerLogo": "/logos/canva.svg",
    "bannerImage": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹37,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 28,
    "acceptanceChance": 89,
    "eligibilityRate": 91,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹37,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹37,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-105",
    "title": "Compact Folding Ultra-Light Drone 4K Sunset Flight",
    "brandName": "Consumer Drone & Robotics (Verified)",
    "partnerLogo": "/logos/sony-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹95,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 29,
    "acceptanceChance": 90,
    "eligibilityRate": 92,
    "categories": [
      "Travel",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our travel campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Travel Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TravelReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_travel",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹95,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Travel reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Travel Seasonal Launch Campaign",
        "payout": "₹95,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-106",
    "title": "Gluten-Free Almond Flour Keto Cookie Baking Session",
    "brandName": "Healthy Gourmet Bakery (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹34,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 30,
    "acceptanceChance": 91,
    "eligibilityRate": 93,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹34,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹34,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-107",
    "title": "Anti-Theft RFID Blocking Minimalist Leather Bifold",
    "brandName": "Heritage Leathercraft Studio (Verified)",
    "partnerLogo": "/logos/puma-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹36,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 31,
    "acceptanceChance": 92,
    "eligibilityRate": 94,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹36,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹36,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-108",
    "title": "Matte Ceramic Coated Non-Stick Sauté Pan Cooking Test",
    "brandName": "Premium Culinary Cookware Enterprise (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹42,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 32,
    "acceptanceChance": 93,
    "eligibilityRate": 95,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹42,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹42,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-109",
    "title": "100% Pure Cold-Pressed Sweet Almond Hair Oil Ritual",
    "brandName": "Ayurvedic Hair & Scalp Therapeutics Brand (Verified)",
    "partnerLogo": "/logos/canva-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹38,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 33,
    "acceptanceChance": 82,
    "eligibilityRate": 96,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹38,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹38,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-110",
    "title": "Ultra-Breathable Bamboo Viscose Underwear Comfort Challenge",
    "brandName": "Modern Sustainable Essentials Label (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹35,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 34,
    "acceptanceChance": 83,
    "eligibilityRate": 97,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": true,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹35,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹35,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-111",
    "title": "Smart Touchscreen Air Fryer Healthy Samosa Challenge",
    "brandName": "Smart Kitchen Appliances Enterprise (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹55,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 35,
    "acceptanceChance": 84,
    "eligibilityRate": 88,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹55,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹55,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-112",
    "title": "Ergonomic Lumbar Support Mesh Office Chair Assembly & Review",
    "brandName": "Ergonomic Workspace Solutions (Verified)",
    "partnerLogo": "/logos/notion.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹60,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 36,
    "acceptanceChance": 85,
    "eligibilityRate": 89,
    "categories": [
      "Home",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our home campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Home Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#HomeReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_home",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹60,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Home reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Home Seasonal Launch Campaign",
        "payout": "₹60,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-113",
    "title": "Instant Filter Coffee Decoction 30-Second Morning Pour",
    "brandName": "South Indian Artisanal Coffee Brand (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹32,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 37,
    "acceptanceChance": 86,
    "eligibilityRate": 90,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹32,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹32,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-114",
    "title": "High-Cushion Carbon Plate Running Shoes 10K Time Trial",
    "brandName": "Performance Athletic Footwear Label (Verified)",
    "partnerLogo": "/logos/nike-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹65,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 38,
    "acceptanceChance": 87,
    "eligibilityRate": 91,
    "categories": [
      "Fitness",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fitness campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fitness Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FitnessReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fitness",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹65,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fitness reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Seasonal Launch Campaign",
        "payout": "₹65,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-115",
    "title": "Hydrating Rice Water & Ceramide Night Barrier Moisture Mask",
    "brandName": "Derma-Approved Clean Cosmetics (Verified)",
    "partnerLogo": "/logos/canva.svg",
    "bannerImage": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹36,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 39,
    "acceptanceChance": 88,
    "eligibilityRate": 92,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹36,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹36,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-116",
    "title": "Wireless 65W Fast MagSafe Multi-Device Charging Station",
    "brandName": "Next-Gen Mobile Accessories Brand (Verified)",
    "partnerLogo": "/logos/apple-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹48,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 40,
    "acceptanceChance": 89,
    "eligibilityRate": 93,
    "categories": [
      "Technology",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our technology campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Technology Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TechnologyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_technology",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹48,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Technology reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Seasonal Launch Campaign",
        "payout": "₹48,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-117",
    "title": "Direct-Trade Single-Origin Chikmagalur Dark Roast Beans",
    "brandName": "Specialty Coffee Roasters (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹34,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 41,
    "acceptanceChance": 90,
    "eligibilityRate": 94,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹34,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹34,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-118",
    "title": "4K Wireless Security Cam Dual-Lens Solar Powered Guard",
    "brandName": "Smart Home Automation Unicorn (Verified)",
    "partnerLogo": "/logos/google-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹58,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 42,
    "acceptanceChance": 91,
    "eligibilityRate": 95,
    "categories": [
      "Technology",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our technology campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Technology Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TechnologyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_technology",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹58,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Technology reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Seasonal Launch Campaign",
        "payout": "₹58,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-119",
    "title": "Pure Copper Hammered Water Bottle Ayurvedic Daily Ritual",
    "brandName": "Heritage Copper & Brass Artisans (Verified)",
    "partnerLogo": "/logos/patreon.svg",
    "bannerImage": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹30,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 43,
    "acceptanceChance": 92,
    "eligibilityRate": 96,
    "categories": [
      "Health",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our health campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Health Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#HealthReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_health",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹30,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Health reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Health Seasonal Launch Campaign",
        "payout": "₹30,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-120",
    "title": "Classic Japanese Selvedge Raw Indigo Jeans Break-In Test",
    "brandName": "Denim Artisanal Workshop (Verified)",
    "partnerLogo": "/logos/adidas-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹52,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 44,
    "acceptanceChance": 93,
    "eligibilityRate": 97,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "PINTEREST"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹52,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹52,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-121",
    "title": "Dual-Phase Vitamin E Cleansing Balm Makeup Melt Test",
    "brandName": "Clean Skincare Lab (Verified)",
    "partnerLogo": "/logos/shopify.svg",
    "bannerImage": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹33,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 45,
    "acceptanceChance": 82,
    "eligibilityRate": 88,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹33,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹33,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-122",
    "title": "Lightweight Honeycomb Shell 8000Hz Polling Rate Gaming Mouse",
    "brandName": "Pro Gaming Gear (Verified)",
    "partnerLogo": "/logos/twitch.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹46,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 46,
    "acceptanceChance": 83,
    "eligibilityRate": 89,
    "categories": [
      "Gaming",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "TWITCH",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our gaming campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Gaming Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#GamingReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_gaming",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹46,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Gaming reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Gaming Seasonal Launch Campaign",
        "payout": "₹46,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-123",
    "title": "Adjustable Quick-Lock Dumbbells Home Gym Space Saving Tour",
    "brandName": "Home Fitness Equipment Innovators (Verified)",
    "partnerLogo": "/logos/nike-official.svg",
    "bannerImage": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹70,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 47,
    "acceptanceChance": 84,
    "eligibilityRate": 90,
    "categories": [
      "Fitness",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fitness campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fitness Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FitnessReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fitness",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹70,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fitness reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Seasonal Launch Campaign",
        "payout": "₹70,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-124",
    "title": "Artisanal Himalayan Yak Cheese Churpi Chews Dog Treats",
    "brandName": "Natural Pet Nutrition Brand (Verified)",
    "partnerLogo": "/logos/shopify-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹28,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 48,
    "acceptanceChance": 85,
    "eligibilityRate": 91,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹28,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹28,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-125",
    "title": "Water-Repellent Commuter Laptop Backpack Weather Test",
    "brandName": "Urban Travel & EDC Gear (Verified)",
    "partnerLogo": "/logos/puma-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹40,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 49,
    "acceptanceChance": 86,
    "eligibilityRate": 92,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹40,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹40,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-126",
    "title": "Zero-Forex Markup Global Travel Debit Card Airport Test",
    "brandName": "Neo-Banking Fintech Platform (Verified)",
    "partnerLogo": "/logos/wise-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹65,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 25,
    "acceptanceChance": 87,
    "eligibilityRate": 93,
    "categories": [
      "Finance",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our finance campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Finance Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FinanceReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_finance",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹65,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Finance reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Finance Seasonal Launch Campaign",
        "payout": "₹65,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-127",
    "title": "Cruelty-Free Botanical Lash Growth Peptide Mascara",
    "brandName": "Clean Cosmetics Innovators (Verified)",
    "partnerLogo": "/logos/figma.svg",
    "bannerImage": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹35,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 26,
    "acceptanceChance": 88,
    "eligibilityRate": 94,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹35,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹35,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-128",
    "title": "High-Torque Electric Cycle All-Terrain Hill Climb Test",
    "brandName": "Sustainable Smart Mobility (Verified)",
    "partnerLogo": "/logos/tesla-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹85,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 27,
    "acceptanceChance": 89,
    "eligibilityRate": 95,
    "categories": [
      "Automobile",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our automobile campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Automobile Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#AutomobileReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_automobile",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹85,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Automobile reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Automobile Seasonal Launch Campaign",
        "payout": "₹85,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-129",
    "title": "Organic Stone-Ground A2 Cow Ghee Tadka Aroma Test",
    "brandName": "Certified Organic Farm Dairy (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹40,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 28,
    "acceptanceChance": 90,
    "eligibilityRate": 96,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹40,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹40,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-130",
    "title": "Noise-Cancelling Studio Boom Mic Podcast Audio Test",
    "brandName": "Creator Studio Acoustics (Verified)",
    "partnerLogo": "/logos/spotify.svg",
    "bannerImage": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹50,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 29,
    "acceptanceChance": 91,
    "eligibilityRate": 97,
    "categories": [
      "Technology",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our technology campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Technology Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TechnologyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_technology",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹50,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Technology reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Seasonal Launch Campaign",
        "payout": "₹50,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-131",
    "title": "Pure Mulberry Silk Pillowcase Hair Frizz Reduction Test",
    "brandName": "Luxury Sleep & Silk Essentials (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹45,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 30,
    "acceptanceChance": 92,
    "eligibilityRate": 88,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹45,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹45,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-132",
    "title": "Plant-Based Fermented Pea Protein Shake Taste Test",
    "brandName": "Vegan Sports Nutrition (Verified)",
    "partnerLogo": "/logos/nike.svg",
    "bannerImage": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹42,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 31,
    "acceptanceChance": 93,
    "eligibilityRate": 89,
    "categories": [
      "Fitness",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fitness campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fitness Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FitnessReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fitness",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹42,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fitness reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Seasonal Launch Campaign",
        "payout": "₹42,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-133",
    "title": "Smart Self-Watering Indoor Herb Garden Time-Lapse",
    "brandName": "Urban Hydroponic Living (Verified)",
    "partnerLogo": "/logos/shopify.svg",
    "bannerImage": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹48,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 32,
    "acceptanceChance": 82,
    "eligibilityRate": 90,
    "categories": [
      "Home",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our home campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Home Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#HomeReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_home",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹48,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Home reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Home Seasonal Launch Campaign",
        "payout": "₹48,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-134",
    "title": "Multi-Peptide Lash & Brow Enhancing Density Serum",
    "brandName": "Clinical Cosmetics (Verified)",
    "partnerLogo": "/logos/canva.svg",
    "bannerImage": "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹37,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 33,
    "acceptanceChance": 83,
    "eligibilityRate": 91,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹37,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹37,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-135",
    "title": "Compact Folding Ultra-Light Drone 4K Sunset Flight",
    "brandName": "Consumer Drone & Robotics (Verified)",
    "partnerLogo": "/logos/sony-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹95,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 34,
    "acceptanceChance": 84,
    "eligibilityRate": 92,
    "categories": [
      "Travel",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our travel campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Travel Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TravelReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_travel",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹95,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Travel reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Travel Seasonal Launch Campaign",
        "payout": "₹95,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-136",
    "title": "Gluten-Free Almond Flour Keto Cookie Baking Session",
    "brandName": "Healthy Gourmet Bakery (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹34,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 35,
    "acceptanceChance": 85,
    "eligibilityRate": 93,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹34,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹34,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-137",
    "title": "Anti-Theft RFID Blocking Minimalist Leather Bifold",
    "brandName": "Heritage Leathercraft Studio (Verified)",
    "partnerLogo": "/logos/puma-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹36,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 36,
    "acceptanceChance": 86,
    "eligibilityRate": 94,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹36,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹36,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-138",
    "title": "Matte Ceramic Coated Non-Stick Sauté Pan Cooking Test",
    "brandName": "Premium Culinary Cookware Enterprise (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹42,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 37,
    "acceptanceChance": 87,
    "eligibilityRate": 95,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹42,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹42,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-139",
    "title": "100% Pure Cold-Pressed Sweet Almond Hair Oil Ritual",
    "brandName": "Ayurvedic Hair & Scalp Therapeutics Brand (Verified)",
    "partnerLogo": "/logos/canva-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹38,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 38,
    "acceptanceChance": 88,
    "eligibilityRate": 96,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹38,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹38,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-140",
    "title": "Ultra-Breathable Bamboo Viscose Underwear Comfort Challenge",
    "brandName": "Modern Sustainable Essentials Label (Verified)",
    "partnerLogo": "/logos/zara-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹35,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 39,
    "acceptanceChance": 89,
    "eligibilityRate": 97,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹35,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹35,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-141",
    "title": "Smart Touchscreen Air Fryer Healthy Samosa Challenge",
    "brandName": "Smart Kitchen Appliances Enterprise (Verified)",
    "partnerLogo": "/logos/amazon-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹55,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 40,
    "acceptanceChance": 90,
    "eligibilityRate": 88,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹55,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹55,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-142",
    "title": "Ergonomic Lumbar Support Mesh Office Chair Assembly & Review",
    "brandName": "Ergonomic Workspace Solutions (Verified)",
    "partnerLogo": "/logos/notion.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹60,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 41,
    "acceptanceChance": 91,
    "eligibilityRate": 89,
    "categories": [
      "Home",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our home campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Home Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#HomeReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_home",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹60,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Home reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Home Seasonal Launch Campaign",
        "payout": "₹60,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-143",
    "title": "Instant Filter Coffee Decoction 30-Second Morning Pour",
    "brandName": "South Indian Artisanal Coffee Brand (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹32,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 42,
    "acceptanceChance": 92,
    "eligibilityRate": 90,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹32,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹32,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-144",
    "title": "High-Cushion Carbon Plate Running Shoes 10K Time Trial",
    "brandName": "Performance Athletic Footwear Label (Verified)",
    "partnerLogo": "/logos/nike-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹65,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 43,
    "acceptanceChance": 93,
    "eligibilityRate": 91,
    "categories": [
      "Fitness",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fitness campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fitness Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FitnessReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fitness",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹65,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fitness reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Seasonal Launch Campaign",
        "payout": "₹65,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-145",
    "title": "Hydrating Rice Water & Ceramide Night Barrier Moisture Mask",
    "brandName": "Derma-Approved Clean Cosmetics (Verified)",
    "partnerLogo": "/logos/canva.svg",
    "bannerImage": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹36,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 44,
    "acceptanceChance": 82,
    "eligibilityRate": 92,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹36,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹36,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-146",
    "title": "Wireless 65W Fast MagSafe Multi-Device Charging Station",
    "brandName": "Next-Gen Mobile Accessories Brand (Verified)",
    "partnerLogo": "/logos/apple-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹48,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 45,
    "acceptanceChance": 83,
    "eligibilityRate": 93,
    "categories": [
      "Technology",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our technology campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Technology Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TechnologyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_technology",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹48,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Technology reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Seasonal Launch Campaign",
        "payout": "₹48,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-147",
    "title": "Direct-Trade Single-Origin Chikmagalur Dark Roast Beans",
    "brandName": "Specialty Coffee Roasters (Verified)",
    "partnerLogo": "/logos/starbucks-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹34,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 46,
    "acceptanceChance": 84,
    "eligibilityRate": 94,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹34,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹34,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-148",
    "title": "4K Wireless Security Cam Dual-Lens Solar Powered Guard",
    "brandName": "Smart Home Automation Unicorn (Verified)",
    "partnerLogo": "/logos/google-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹58,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 47,
    "acceptanceChance": 85,
    "eligibilityRate": 95,
    "categories": [
      "Technology",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our technology campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Technology Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#TechnologyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_technology",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹58,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Technology reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Technology Seasonal Launch Campaign",
        "payout": "₹58,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-149",
    "title": "Pure Copper Hammered Water Bottle Ayurvedic Daily Ritual",
    "brandName": "Heritage Copper & Brass Artisans (Verified)",
    "partnerLogo": "/logos/patreon.svg",
    "bannerImage": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹30,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 48,
    "acceptanceChance": 86,
    "eligibilityRate": 96,
    "categories": [
      "Health",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our health campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Health Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#HealthReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_health",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹30,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Health reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Health Seasonal Launch Campaign",
        "payout": "₹30,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-150",
    "title": "Classic Japanese Selvedge Raw Indigo Jeans Break-In Test",
    "brandName": "Denim Artisanal Workshop (Verified)",
    "partnerLogo": "/logos/adidas-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹52,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 49,
    "acceptanceChance": 87,
    "eligibilityRate": 97,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "PINTEREST"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹52,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹52,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-151",
    "title": "Dual-Phase Vitamin E Cleansing Balm Makeup Melt Test",
    "brandName": "Clean Skincare Lab (Verified)",
    "partnerLogo": "/logos/shopify.svg",
    "bannerImage": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹33,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 25,
    "acceptanceChance": 88,
    "eligibilityRate": 88,
    "categories": [
      "Beauty",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our beauty campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Beauty Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#BeautyReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_beauty",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹33,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Beauty reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Beauty Seasonal Launch Campaign",
        "payout": "₹33,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-152",
    "title": "Lightweight Honeycomb Shell 8000Hz Polling Rate Gaming Mouse",
    "brandName": "Pro Gaming Gear (Verified)",
    "partnerLogo": "/logos/twitch.svg",
    "bannerImage": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹46,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 26,
    "acceptanceChance": 89,
    "eligibilityRate": 89,
    "categories": [
      "Gaming",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "TWITCH",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our gaming campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Gaming Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#GamingReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_gaming",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹46,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Gaming reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Gaming Seasonal Launch Campaign",
        "payout": "₹46,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-153",
    "title": "Adjustable Quick-Lock Dumbbells Home Gym Space Saving Tour",
    "brandName": "Home Fitness Equipment Innovators (Verified)",
    "partnerLogo": "/logos/nike-official.svg",
    "bannerImage": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹70,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 27,
    "acceptanceChance": 90,
    "eligibilityRate": 90,
    "categories": [
      "Fitness",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fitness campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fitness Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FitnessReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fitness",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹70,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fitness reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fitness Seasonal Launch Campaign",
        "payout": "₹70,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-154",
    "title": "Artisanal Himalayan Yak Cheese Churpi Chews Dog Treats",
    "brandName": "Natural Pet Nutrition Brand (Verified)",
    "partnerLogo": "/logos/shopify-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹28,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 28,
    "acceptanceChance": 91,
    "eligibilityRate": 91,
    "categories": [
      "Food",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our food campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Food Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FoodReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_food",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹28,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Food reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Food Seasonal Launch Campaign",
        "payout": "₹28,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-155",
    "title": "Water-Repellent Commuter Laptop Backpack Weather Test",
    "brandName": "Urban Travel & EDC Gear (Verified)",
    "partnerLogo": "/logos/puma-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "COMMISSION",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹40,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 29,
    "acceptanceChance": 92,
    "eligibilityRate": 92,
    "categories": [
      "Fashion",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our fashion campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Fashion Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FashionReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_fashion",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹40,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Fashion reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Fashion Seasonal Launch Campaign",
        "payout": "₹40,000 Fixed Pay"
      }
    ]
  },
  {
    "id": "camp-156",
    "title": "Zero-Forex Markup Global Travel Debit Card Airport Test",
    "brandName": "Neo-Banking Fintech Platform (Verified)",
    "partnerLogo": "/logos/wise-full.svg",
    "bannerImage": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80",
    "avatarGradient": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
    "commercialType": "FLAT_FEE",
    "commercialLabel": "Payment verified by client",
    "payoutAmount": "₹65,000",
    "currencySymbol": "₹",
    "currencyCode": "INR",
    "payType": "Fixed Pay",
    "deliverablesSummary": "1 4K Reel • 2 Stories • 1 Post",
    "creatorsApplied": 30,
    "acceptanceChance": 93,
    "eligibilityRate": 93,
    "categories": [
      "Finance",
      "Lifestyle",
      "CreatorCollab"
    ],
    "isNew": false,
    "postedAt": "Aug 26, 2026 • 11:15 AM",
    "projectTimeline": "Sep 6 – Sep 28, 2026",
    "requirementLabel": "Requirement not met",
    "language": "Hindi / English",
    "country": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "socials": [
      "INSTAGRAM",
      "YOUTUBE"
    ],
    "description": "Create high-impact, engaging content showcasing key product features and real-world performance for our finance campaign with trackable link-in-bio attribution.",
    "scopeOfWork": [
      {
        "title": "Finance Showcase Video",
        "detail": "High-definition 4K video capturing product in real-world everyday usage scenario."
      }
    ],
    "contentDirections": {
      "tone": "Authentic, conversational, informative, and visually engaging.",
      "videoSetup": "Bright natural lighting, clear audio recording, sharp macro product focus.",
      "hashtags": "#FinanceReview #CreatorCollab #ProductShowcase #Ad",
      "audio": "Upbeat modern background beat mixed at -18dB with articulate voiceover."
    },
    "milestones": [
      "1. Brief and storyboard approval",
      "2. Draft edit check",
      "3. Coordinated publication"
    ],
    "proposals": [
      {
        "handle": "@creator_finance",
        "country": "India",
        "flag": "🇮🇳",
        "bid": "₹65,000",
        "days": "7",
        "rating": "5.0",
        "reviews": 85,
        "er": "9.4",
        "pitch": "Specialized in Finance reviews and styling with high organic conversion."
      }
    ],
    "otherJobs": [
      {
        "title": "Finance Seasonal Launch Campaign",
        "payout": "₹65,000 Fixed Pay"
      }
    ]
  }
];
