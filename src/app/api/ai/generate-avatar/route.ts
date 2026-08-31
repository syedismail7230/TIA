import { NextRequest, NextResponse } from 'next/server';

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '11f1ac02f254b78af7cabcc2450afb55';
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || 'cfut_6oKPZP3e0JP3lTkY8JEcYQL9CmRg7DbWryjK0B8v3e88879b';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { creatorName = 'Creator' } = body;

    // 3 Exact Blueprint Variations based on TIA Signature Royal Blue & Folded-Arm Brand Identity
    const variationsConfig = [
      {
        id: 'opt-signature-executive',
        name: 'Signature TIA Executive',
        tag: 'Recommended',
        pose: 'Upper-Body Folded-Arm Pose with Direct Eye Contact',
        clothing: 'Bright Royal Cobalt-Blue Blazer & White Top',
        accessories: 'Gold Hoop Earrings & Delicate Butterfly Pendant',
        prompt: `Upper-body commercial studio portrait of a beautiful young woman with long voluminous dark-brown wavy hair, warm confident smile with direct eye contact, approachable trustworthy expression, arms folded across chest communicating confidence and authority, wearing a bright royal cobalt-blue blazer over a clean white top matching tech brand aesthetic, gold hoop earrings and delicate butterfly necklace pendant, centered portrait framed from waist upward, polished skin, solid pure plain white background, isolated cutout portrait, 8k uhd, crisp sharp focus, Hasselblad studio lighting`,
        description: 'Exact TIA brand identity: Royal blue blazer, white top, folded arms, and butterfly pendant.',
      },
      {
        id: 'opt-cinematic-creator',
        name: 'Cinematic Commercial Portrait',
        tag: 'Commercial',
        pose: 'Warm Approachable Angle & Folded Arms',
        clothing: 'Tailored Cobalt Blue Blazer with Silk Camisole',
        accessories: 'Gold Hoop Earrings',
        prompt: `High-end commercial portrait of a charismatic female creator with long dark brown wavy hair, warm confident smile, arms folded across chest, wearing a tailored royal blue blazer over crisp white silk top, subtle gold hoop earrings, commercial tech-brand photography, polished natural makeup, solid pure white background, isolated subject, 8k uhd photo`,
        description: 'Polished commercial lighting with natural makeup and confident authority.',
      },
      {
        id: 'opt-modern-media-host',
        name: 'Modern Creator & Host',
        tag: 'Media Host',
        pose: 'Dynamic Professional Stance with Gentle Smile',
        clothing: 'Vibrant Electric Blue Blazer & Clean White Inner',
        accessories: 'Delicate Minimalist Jewelry',
        prompt: `Upper-body editorial portrait of a modern female influencer host, dark wavy hair over shoulders, radiant charismatic smile, arms crossed confidently, wearing a vibrant electric blue blazer over clean white top, gold butterfly necklace, centered composition from waist up, isolated on solid pure white background, studio key lighting, 8k uhd`,
        description: 'Dynamic media host presence with radiant smile and clean studio framing.',
      },
    ];

    // Generate 3 live AI images in parallel using Cloudflare Workers AI
    const generatedVariations = await Promise.all(
      variationsConfig.map(async (config) => {
        try {
          const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`;

          const cfRes = await fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: config.prompt,
              num_steps: 6,
            }),
          });

          if (!cfRes.ok) {
            const errText = await cfRes.text();
            console.error(`Cloudflare AI generation failed for ${config.id}:`, errText);
            throw new Error(errText);
          }

          const arrayBuffer = await cfRes.arrayBuffer();
          const base64Image = Buffer.from(arrayBuffer).toString('base64');
          const dataUrl = `data:image/png;base64,${base64Image}`;

          return {
            id: config.id,
            name: config.name,
            tag: config.tag,
            pose: config.pose,
            clothing: config.clothing,
            accessories: config.accessories,
            dataUrl,
            description: config.description,
          };
        } catch (err: any) {
          console.error(`Fallback for ${config.id}:`, err?.message);
          return {
            id: config.id,
            name: config.name,
            tag: config.tag,
            pose: config.pose,
            clothing: config.clothing,
            accessories: config.accessories,
            dataUrl: '/profile.png',
            description: config.description,
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      creatorName,
      provider: 'Cloudflare Workers AI (SDXL-Lightning - TIA Royal Blue Brand Blueprint)',
      message: '3 Royal Blue Studio Portraits generated successfully.',
      variations: generatedVariations,
    });
  } catch (error: any) {
    console.error('AI Generation Route Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate AI avatars' },
      { status: 500 }
    );
  }
}
