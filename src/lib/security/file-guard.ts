// ===================================================
// TIA BACKEND - SECURE FILE UPLOAD GUARD
// Magic Byte Verification, MIME & Extension Whitelist
// ===================================================

import path from 'path';
import { ValidationError } from '@/lib/errors/api-error';

export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.pdf',
  '.mp4',
  '.mov',
  '.docx',
  '.csv',
]);

export const ALLOWED_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/pdf',
  'video/mp4',
  'video/quicktime',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/csv',
]);

/**
 * Validates the file buffer magic byte signatures against expected file types
 * to prevent malicious executables disguised as image/video/document files.
 */
export function verifyMagicBytes(buffer: Buffer, extension: string): boolean {
  if (buffer.length < 8) return false;

  const ext = extension.toLowerCase();

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (ext === '.png') {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    );
  }

  // JPEG / JPG: FF D8 FF
  if (ext === '.jpg' || ext === '.jpeg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  // WebP: RIFF ... WEBP (0x52 0x49 0x46 0x46 ... 0x57 0x45 0x42 0x50)
  if (ext === '.webp') {
    return (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50
    );
  }

  // PDF: %PDF (25 50 44 46)
  if (ext === '.pdf') {
    return (
      buffer[0] === 0x25 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x44 &&
      buffer[3] === 0x46
    );
  }

  // MP4 / MOV: offset 4 contains 'ftyp' (66 74 79 70)
  if (ext === '.mp4' || ext === '.mov') {
    if (buffer.length < 12) return false;
    const ftyp = buffer.toString('ascii', 4, 8);
    return ftyp === 'ftyp' || ftyp === 'moov' || ftyp === 'mdat';
  }

  // CSV or DOCX (ZIP archive: 50 4B 03 04)
  if (ext === '.docx') {
    return buffer[0] === 0x50 && buffer[1] === 0x4b && (buffer[2] === 0x03 || buffer[2] === 0x05);
  }

  if (ext === '.csv') {
    // Text inspection: ensure no binary executable headers (e.g. MZ 0x4D 0x5A)
    return !(buffer[0] === 0x4d && buffer[1] === 0x5a);
  }

  return true;
}

/**
 * Sanitizes a filename to protect against path traversal and null byte injections.
 */
export function sanitizeFilename(rawName: string, prefix = 'upload'): string {
  const ext = path.extname(rawName).toLowerCase();
  const baseName = path.basename(rawName, ext);
  const cleanBase = baseName.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50);
  const cleanPrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '_');
  return `${cleanPrefix}-${cleanBase}-${Date.now()}${ext}`;
}

/**
 * Comprehensive validation pipeline for file uploads.
 */
export function validateUploadFile(file: File, buffer: Buffer): { ext: string; sanitizedName: string } {
  // 1. Size verification
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new ValidationError(
      `File size exceeds the 10MB limit (provided: ${(file.size / (1024 * 1024)).toFixed(2)}MB)`
    );
  }

  // 2. Extension validation
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new ValidationError(
      `File extension "${ext || 'none'}" is not permitted. Allowed: ${Array.from(ALLOWED_EXTENSIONS).join(', ')}`
    );
  }

  // 3. MIME type validation
  if (file.type && !ALLOWED_MIME_TYPES.has(file.type)) {
    throw new ValidationError(`MIME type "${file.type}" is not authorized`);
  }

  // 4. Magic byte signature verification
  const isSignatureValid = verifyMagicBytes(buffer, ext);
  if (!isSignatureValid) {
    throw new ValidationError(
      `File contents do not match the declared file extension ${ext}. Upload rejected for security.`
    );
  }

  const sanitizedName = sanitizeFilename(file.name);
  return { ext, sanitizedName };
}
