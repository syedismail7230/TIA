import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getCurrentUser } from '@/lib/auth/session';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'avatars';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Allowed storage buckets
    const allowedBuckets = ['avatars', 'media-kits', 'deliverable-reviews', 'contract-pdfs', 'dispute-evidence'];
    const targetBucket = allowedBuckets.includes(bucket) ? bucket : 'avatars';

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || '.png';
    const filename = `${session.id}-${Date.now()}${ext}`;

    // 1. Try uploading to Supabase Storage
    try {
      const { data, error } = await supabaseAdmin.storage
        .from(targetBucket)
        .upload(filename, buffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabaseAdmin.storage
          .from(targetBucket)
          .getPublicUrl(filename);

        return NextResponse.json({
          url: publicUrlData.publicUrl,
          path: data.path,
          bucket: targetBucket,
          provider: 'supabase',
        });
      }
    } catch (supabaseErr: any) {
      console.warn('Supabase Storage upload fallback:', supabaseErr.message);
    }

    // 2. Local fallback storage in public/uploads/
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', targetBucket);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const localFilePath = path.join(uploadDir, filename);
    fs.writeFileSync(localFilePath, buffer);

    const fileUrl = `/uploads/${targetBucket}/${filename}`;
    return NextResponse.json({
      url: fileUrl,
      filename,
      bucket: targetBucket,
      provider: 'local',
    });
  } catch (error: any) {
    console.error('File Upload Error:', error);
    return NextResponse.json(
      { error: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
