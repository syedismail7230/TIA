// ===================================================
// TIA BACKEND - SECURE FILE UPLOAD API
// Enforces Magic Byte Header Verification, MIME & Extension Whitelist, 10MB Limit & Sanitization
// ===================================================

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getCurrentUser } from '@/lib/auth/session';
import fs from 'fs';
import path from 'path';
import { handleApiError, AuthenticationError, ValidationError } from '@/lib/errors/api-error';
import { enforceRateLimit, getClientIp, RATE_LIMIT_TIERS } from '@/lib/security/rate-limiter';
import { validateUploadFile, sanitizeFilename } from '@/lib/security/file-guard';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      throw new AuthenticationError('Authentication required to upload files');
    }

    // Rate limiting: 120 uploads / minute per user
    await enforceRateLimit(session.id || getClientIp(request), RATE_LIMIT_TIERS.STANDARD);

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'avatars';

    if (!file) {
      throw new ValidationError('No file provided in form data');
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 1. Comprehensive Security Validation (Size, Extension, MIME, Magic Bytes)
    const { ext } = validateUploadFile(file, buffer);

    // 2. Storage bucket validation
    const allowedBuckets = ['avatars', 'media-kits', 'deliverable-reviews', 'contract-pdfs', 'dispute-evidence'];
    const targetBucket = allowedBuckets.includes(bucket) ? bucket : 'avatars';

    // 3. Path-traversal proof filename sanitization
    const sanitizedFilename = sanitizeFilename(file.name, session.id);

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
          success: true,
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
      success: true,
      url: fileUrl,
      filename: sanitizedFilename,
      bucket: targetBucket,
      provider: 'local',
    });
  } catch (error) {
    return handleApiError(error, 'POST /api/upload');
  }
}
