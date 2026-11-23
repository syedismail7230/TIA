import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getCurrentUser } from '@/lib/auth/session';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB max file size
const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.pdf', '.mp4', '.mov', '.docx', '.csv']);
const ALLOWED_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/pdf',
  'video/mp4',
  'video/quicktime',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/csv',
]);

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

    // 1. File size enforcement
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File size exceeds the 10MB limit (size: ${(file.size / (1024 * 1024)).toFixed(2)}MB)` },
        { status: 400 }
      );
    }

    // 2. Extension & MIME validation
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `File type ${ext || 'unknown'} is not permitted. Allowed: PNG, JPG, WEBP, PDF, MP4, MOV, DOCX, CSV` },
        { status: 400 }
      );
    }

    if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `MIME type ${file.type} is not allowed` },
        { status: 400 }
      );
    }

    // 3. Storage bucket validation
    const allowedBuckets = ['avatars', 'media-kits', 'deliverable-reviews', 'contract-pdfs', 'dispute-evidence'];
    const targetBucket = allowedBuckets.includes(bucket) ? bucket : 'avatars';

    const buffer = Buffer.from(await file.arrayBuffer());
    const sanitizedFilename = `${session.id.replace(/[^a-zA-Z0-9_-]/g, '')}-${Date.now()}${ext}`;

    // Try uploading to Supabase Storage
    try {
      const { data, error } = await supabaseAdmin.storage
        .from(targetBucket)
        .upload(sanitizedFilename, buffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabaseAdmin.storage
          .from(targetBucket)
          .getPublicUrl(sanitizedFilename);

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

    // Local fallback storage in public/uploads/
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', targetBucket);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const localFilePath = path.join(uploadDir, sanitizedFilename);
    fs.writeFileSync(localFilePath, buffer);

    const fileUrl = `/uploads/${targetBucket}/${sanitizedFilename}`;
    return NextResponse.json({
      url: fileUrl,
      filename: sanitizedFilename,
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
