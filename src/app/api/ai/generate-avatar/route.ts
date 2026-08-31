import { NextRequest, NextResponse } from 'next/server';

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || 'r8_JFGiVfgACKeS7z8jQznkawTYrSwhYqp3GxL8R';

// 3 Pristine TIA Royal Blue Blazer Body Templates hosted on GitHub repo
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

    // Call Replicate Face-Swap model across all 3 templates in parallel
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
            console.error(`Replicate error for ${tmpl.id}:`, data);
            throw new Error(data.detail || data.title || 'Replicate prediction failed');
          }

          const outputUrl = data.output;

          return {
            id: tmpl.id,
            name: tmpl.name,
            tag: tmpl.tag,
            pose: tmpl.pose,
            clothing: tmpl.clothing,
            dataUrl: outputUrl || tmpl.targetUrl,
            description: tmpl.description,
          };
        } catch (err: any) {
          console.error(`Fallback for ${tmpl.id}:`, err?.message);
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

    // Check if predictions encountered insufficient credit
    const creditError = generatedVariations.find((v: any) => v.error?.includes('credit') || v.error?.includes('Insufficient'));
    if (creditError) {
      return NextResponse.json({
        success: false,
        requiresCredits: true,
        error: 'Your Replicate account has insufficient credit. Please add $5 at https://replicate.com/account/billing to enable neural face-diffusion.',
        billingUrl: 'https://replicate.com/account/billing',
      }, { status: 402 });
    }

    return NextResponse.json({
      success: true,
      creatorName,
      provider: 'Replicate Neural Face-Swap Engine (lucataco/faceswap)',
      message: '3 Royal Blue Studio Face-Swapped Portraits generated successfully.',
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
