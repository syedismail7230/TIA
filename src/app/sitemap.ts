import { MetadataRoute } from 'next';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.theinfluencers.agency';
  const currentDate = new Date();

  // Core Static Marketing & Policy Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/escrow-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dispute-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/influencer-compliance`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ip-licensing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic Public Creator Profiles
  let creatorRoutes: MetadataRoute.Sitemap = [];
  try {
    const creators = await prisma.creator.findMany({
      where: {
        username: {
          not: undefined,
        },
      },
      select: {
        username: true,
        updatedAt: true,
      },
      take: 500,
    });

    creatorRoutes = creators
      .filter((c: { username: string | null; updatedAt: Date }) => Boolean(c.username))
      .map((c: { username: string | null; updatedAt: Date }) => ({
        url: `${baseUrl}/creator/${encodeURIComponent(c.username!)}`,
        lastModified: c.updatedAt || currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  } catch (error) {
    console.warn('Sitemap creator fetch fallback notice:', error);
  }

  // Include popular default profiles as fallback if database is empty or seeding
  if (creatorRoutes.length === 0) {
    const fallbackUsernames = ['creator.official', 'sarahjenkins', 'aarav.fitness', 'priya.lifestyle', 'rohan.tech'];
    creatorRoutes = fallbackUsernames.map((u) => ({
      url: `${baseUrl}/creator/${u}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  }

  return [...staticRoutes, ...creatorRoutes];
}
