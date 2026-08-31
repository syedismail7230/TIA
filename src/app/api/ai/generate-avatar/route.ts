import { NextRequest, NextResponse } from 'next/server';

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const COLAB_AI_URL = process.env.COLAB_AI_URL || process.env.NEXT_PUBLIC_AI_BACKEND_URL;

// 3 Pristine TIA Royal Blue Blazer Body Templates
const BLAZER_TEMPLATES = [
  {
    id: 'opt-executive-blazer',
    name: 'Signature Royal Blue Blazer',
    tag: 'Executive',
    pose: 'Executive Folded-Arms Pose',
    clothing: 'Tailored Royal Cobalt Blue Blazer & White Top',
    targetUrl: 'https://raw.githubusercontent.com/syedismail7230/TIA/main/public/templates/blazer-1.jpg',
    description: 'Your real face seamlessly diffused onto the signature TIA royal blue blazer.',
  },
  {
    id: 'opt-butterfly-pendant',
    name: 'Tailored Blazer + Butterfly Pendant',
    tag: 'Commercial',
    pose: 'Warm Direct Smile & Butterfly Pendant',
    clothing: 'Royal Blue Tailored Blazer with White Camisole',
    targetUrl: 'https://raw.githubusercontent.com/syedismail7230/TIA/main/public/templates/blazer-2.jpg',
    description: 'Your real face with subtle gold butterfly pendant and tailored cobalt blazer.',
  },
  {
    id: 'opt-electric-host',
    name: 'Electric Blue Media Host',
    tag: 'Modern Host',
    pose: 'Dynamic Posture & Studio Lighting',
    clothing: 'Vibrant Electric Blue Blazer & Clean White Top',
    targetUrl: 'https://raw.githubusercontent.com/syedismail7230/TIA/main/public/templates/blazer-3.jpg',
    description: 'Your real face with vibrant electric blue blazer and clean studio key lighting.',
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { image, creatorName = 'Creator' } = body;

    if (!image) {
      return NextResponse.json({ success: false, error: 'No image provided' }, { status: 400 });
    }

    // =========================================================================
    // 1. FREE GOOGLE COLAB GPU BACKEND (PATH 2 - 100% FREE FOREVER)
    // =========================================================================
    if (COLAB_AI_URL) {
      try {
        const colabEndpoint = COLAB_AI_URL.replace(/\/$/, '') + '/api/face-swap';
        const colabRes = await fetch(colabEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Bypass-Tunnel-Reminder': 'true', // For localtunnel
          },
          body: JSON.stringify({
            user_image: image,
            creator_name: creatorName,
          }),
        });

        if (colabRes.ok) {
          const colabData = await colabRes.json();
          if (colabData?.success && Array.isArray(colabData?.variations)) {
            return NextResponse.json({
              success: true,
              creatorName,
              provider: 'Google Colab Free GPU (100% Free)',
              variations: colabData.variations,
            });
          }
        }
      } catch (colabErr: any) {
        console.warn('Colab GPU backend unreachable, trying fallback...', colabErr?.message);
      }
    }

    // =========================================================================
    // 2. REPLICATE GPU BACKEND
    // =========================================================================
    if (REPLICATE_API_TOKEN) {
      const generatedVariations = await Promise.all(
        BLAZER_TEMPLATES.map(async (tmpl) => {
          try {
            const res = await fetch('https://api.replicate.com/v1/predictions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
                'Content-Type': 'application/json',
                'Prefer': 'wait',
              },
              body: JSON.stringify({
                version: '9a4298548422074c3f57258c5d544497314ae4112df80d116f0d2109e843d20d', // lucataco/faceswap
                input: {
                  target: tmpl.targetUrl,
                  swap_image: image,
                },
              }),
            });

            const data = await res.json();

            if (!res.ok) {
              throw new Error(data.detail || data.title || 'Replicate prediction failed');
            }

            return {
              id: tmpl.id,
              name: tmpl.name,
              tag: tmpl.tag,
              pose: tmpl.pose,
              clothing: tmpl.clothing,
              dataUrl: data.output || tmpl.targetUrl,
              description: tmpl.description,
            };
          } catch (err: any) {
            return {
              id: tmpl.id,
              name: tmpl.name,
              tag: tmpl.tag,
              pose: tmpl.pose,
              clothing: tmpl.clothing,
              dataUrl: tmpl.targetUrl,
              error: err?.message,
              description: tmpl.description,
            };
          }
        })
      );

      const creditError = generatedVariations.find((v: any) => v.error?.includes('credit') || v.error?.includes('Insufficient'));
      if (!creditError) {
        return NextResponse.json({
          success: true,
          creatorName,
          provider: 'Replicate Neural GPU',
          variations: generatedVariations,
        });
      }
    }

    // =========================================================================
    // 3. CLEAN REAL PHOTO CUTOUT (100% FREE CLIENT-SIDE FALLBACK)
    // =========================================================================
    return NextResponse.json({
      success: false,
      fallbackToCutout: true,
      error: 'Colab GPU not connected and Replicate credits not found. Using Clean Real Photo Cutout Studio.',
    });
  } catch (error: any) {
    console.error('AI Generation Route Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate AI avatars' },
      { status: 500 }
    );
  }
}
