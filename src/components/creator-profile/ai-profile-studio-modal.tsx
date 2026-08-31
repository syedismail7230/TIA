'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AIProfileStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAvatar: (avatarDataUrl: string) => void;
  currentAvatar?: string;
  creatorName?: string;
}

/**
 * High-Precision Flood-Fill Background Removal Algorithm
 * Strips all solid/gradient background pixels connected to the borders into 100% transparent alpha.
 */
async function makeImageTransparent(imageSrc: string): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(imageSrc);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return resolve(imageSrc);

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Sample border corner background colors
        const corners = [
          0, // top-left
          (width - 1) * 4, // top-right
          (height - 1) * width * 4, // bottom-left
          ((height - 1) * width + (width - 1)) * 4, // bottom-right
        ];

        let bgR = 0, bgG = 0, bgB = 0;
        for (const c of corners) {
          bgR += data[c];
          bgG += data[c + 1];
          bgB += data[c + 2];
        }
        bgR = Math.round(bgR / 4);
        bgG = Math.round(bgG / 4);
        bgB = Math.round(bgB / 4);

        const tolerance = 50;
        const visited = new Uint8Array(width * height);
        const queue: number[] = [];

        // Seed with all perimeter border pixels
        for (let x = 0; x < width; x++) {
          queue.push(x, 0);
          queue.push(x, height - 1);
        }
        for (let y = 0; y < height; y++) {
          queue.push(0, y);
          queue.push(width - 1, y);
        }

        let head = 0;
        while (head < queue.length) {
          const x = queue[head++];
          const y = queue[head++];
          const idx = y * width + x;

          if (x < 0 || x >= width || y < 0 || y >= height || visited[idx]) {
            continue;
          }

          visited[idx] = 1;
          const pIdx = idx * 4;
          const r = data[pIdx];
          const g = data[pIdx + 1];
          const b = data[pIdx + 2];

          // Calculate Euclidean color distance from background
          const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);

          if (dist < tolerance) {
            data[pIdx + 3] = 0; // 100% Transparent Alpha

            // Flood-fill 4-way neighbors
            if (x > 0 && !visited[y * width + (x - 1)]) queue.push(x - 1, y);
            if (x < width - 1 && !visited[y * width + (x + 1)]) queue.push(x + 1, y);
            if (y > 0 && !visited[(y - 1) * width + x]) queue.push(x, y - 1);
            if (y < height - 1 && !visited[(y + 1) * width + x]) queue.push(x, y + 1);
          } else if (dist < tolerance + 30) {
            // Anti-aliased feathering on edges
            const alphaFactor = (dist - tolerance) / 30;
            data[pIdx + 3] = Math.floor(alphaFactor * 255);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error('Transparency cutout error:', err);
        resolve(imageSrc);
      }
    };
    img.onerror = () => resolve(imageSrc);
    img.src = imageSrc;
  });
}

export function AIProfileStudioModal({
  isOpen,
  onClose,
  onSaveAvatar,
  currentAvatar = '/profile.png',
  creatorName = 'Creator',
}: AIProfileStudioModalProps) {
  // Processing States: 'UPLOAD' | 'ANALYZING' | 'SELECT_OPTION' | 'SUCCESS'
  const [step, setStep] = useState<'UPLOAD' | 'ANALYZING' | 'SELECT_OPTION' | 'SUCCESS'>('UPLOAD');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('Initializing AI Studio Engine...');
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);

  // 3 Generated Options with transparent cutouts
  const [generatedOptions, setGeneratedOptions] = useState<
    { id: string; name: string; tag: string; description: string; pose: string; clothing: string; accessories?: string; dataUrl: string }[]
  >([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('opt-signature-executive');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setStep('UPLOAD');
      setProcessingProgress(0);
      setGeneratedOptions([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  /**
   * Handle File Upload & Trigger Live Cloudflare AI Engine
   */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, or WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setRawImageSrc(result);
      processImageWithAI(result);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Live Cloudflare Workers AI Generation Pipeline
   */
  const processImageWithAI = async (imageSrc: string) => {
    setStep('ANALYZING');
    setProcessingProgress(15);
    setProcessingMessage('Analyzing facial structure, hair & posture...');

    try {
      setTimeout(() => {
        setProcessingProgress(40);
        setProcessingMessage('Cloudflare Workers AI: Rendering Royal Blue Studio Portraits...');
      }, 700);

      setTimeout(() => {
        setProcessingProgress(75);
        setProcessingMessage('Extracting transparent alpha cutout (NO background box)...');
      }, 2200);

      const res = await fetch('/api/ai/generate-avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageSrc,
          creatorName,
        }),
      });

      const data = await res.json();

      if (data?.success && Array.isArray(data?.variations) && data.variations.length > 0) {
        // Apply transparent background stripping to all 3 variations
        const transparentVariations = await Promise.all(
          data.variations.map(async (v: any) => {
            const transparentDataUrl = await makeImageTransparent(v.dataUrl);
            return {
              ...v,
              dataUrl: transparentDataUrl,
            };
          })
        );

        setProcessingProgress(100);
        setProcessingMessage('AI Studio Transparent Cutouts Ready!');
        setGeneratedOptions(transparentVariations);
        setSelectedOptionId(transparentVariations[0].id);

        setTimeout(() => {
          setStep('SELECT_OPTION');
        }, 400);
      } else {
        throw new Error(data?.error || 'Failed to generate AI avatars');
      }
    } catch (err: any) {
      console.error('AI Generation Failed:', err);
      alert('Cloudflare Workers AI Generation encountered an issue: ' + (err?.message || 'Please try again.'));
      setStep('UPLOAD');
    }
  };

  /**
   * Save Selected Option
   */
  const handleApplySelection = () => {
    const chosen = generatedOptions.find((o) => o.id === selectedOptionId) || generatedOptions[0];
    if (chosen) {
      onSaveAvatar(chosen.dataUrl);
      setStep('SUCCESS');
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  const selectedOptionObj = generatedOptions.find((o) => o.id === selectedOptionId) || generatedOptions[0];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          maxWidth: '740px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#EFF6FF',
                color: '#0052FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              ✨
            </span>
            <div>
              <h3 style={{ margin: 0, fontSize: '16.5px', fontWeight: 800, color: '#0F172A' }}>
                TIA AI Profile Studio • Royal Blue Cutouts
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Uniform Royal Blue Blazer • Folded-Arm Pose • 100% Transparent (No BG)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: '#F1F5F9',
              border: 'none',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {/* STEP 1: UPLOAD INITIAL PHOTO */}
          {step === 'UPLOAD' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '100%',
                  border: '2px dashed #CBD5E1',
                  borderRadius: '16px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  backgroundColor: '#F8FAFC',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#EFF6FF',
                    color: '#0052FF',
                    fontSize: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  📷
                </div>

                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                    Click or Drag to Upload Creator Photo
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '4px' }}>
                    Upload any photo or selfie to recreate your uniform royal blue studio look (NO background)
                  </div>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0052FF',
                    marginTop: '6px',
                  }}
                >
                  <span>Select Image File</span>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />

              {/* What the AI Does Explanation */}
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '16px',
                  fontSize: '12px',
                  color: '#475569',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, color: '#0052FF' }}>
                  <span>⚡</span>
                  <span>TIA Brand Portrait System:</span>
                </div>
                <div>• Recreates your photo into a signature <strong>royal blue blazer & white top</strong>.</div>
                <div>• Enforces the confident <strong>folded-arm executive posture</strong>.</div>
                <div>• <strong>NO background (100% transparent)</strong> so it floats over your cover banner seamlessly.</div>
              </div>
            </div>
          )}

          {/* STEP 2: ANALYZING & GENERATING */}
          {step === 'ANALYZING' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: '20px' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#EFF6FF',
                  border: '4px solid #BFDBFE',
                  borderTopColor: '#0052FF',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 100% { transform: rotate(360deg); } }` }} />

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                  Generating Royal Blue Cutouts (NO Background)
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '6px' }}>
                  {processingMessage}
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '80%', maxWidth: '360px', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${processingProgress}%`,
                    backgroundColor: '#0052FF',
                    borderRadius: '4px',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: SELECT GENERATED STUDIO OPTION */}
          {step === 'SELECT_OPTION' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#334155' }}>
                  Select your preferred royal blue studio cutout:
                </div>
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700, backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px' }}>
                  ✓ Transparent (NO Background)
                </span>
              </div>

              {/* 3 Variations Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                {generatedOptions.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedOptionId(opt.id)}
                      style={{
                        borderRadius: '16px',
                        border: isSelected ? '2.5px solid #0052FF' : '1px solid #E2E8F0',
                        backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                        padding: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        position: 'relative',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? '0 8px 20px rgba(0, 82, 255, 0.15)' : 'none',
                      }}
                    >
                      {/* Tag */}
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          backgroundColor: isSelected ? '#0052FF' : '#F1F5F9',
                          color: isSelected ? '#FFFFFF' : '#64748B',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {opt.tag}
                      </span>

                      {/* Transparent Checkerboard Backdrop for Cutout */}
                      <div
                        style={{
                          width: '100%',
                          height: '140px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          backgroundColor: '#F8FAFC',
                          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                          backgroundSize: '8px 8px',
                          display: 'flex',
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={opt.dataUrl}
                          alt={opt.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom center' }}
                        />
                      </div>

                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{opt.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', lineHeight: 1.2 }}>
                          {opt.pose}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Banner Preview Box (No Box / Full Floating Cutout!) */}
              <div
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  marginTop: '6px',
                }}
              >
                <div style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #F1F5F9', fontSize: '11.5px', fontWeight: 700, color: '#64748B' }}>
                  Live Profile Header Preview (NO Background Box):
                </div>

                <div
                  style={{
                    position: 'relative',
                    height: '130px',
                    backgroundImage: 'url("/banner.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Floating Avatar Placement on Banner (No Background Box!) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-35px',
                      left: '24px',
                      width: '110px',
                      height: '110px',
                      borderRadius: '0px',
                      overflow: 'visible',
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      border: 'none',
                    }}
                  >
                    {selectedOptionObj && (
                      <img
                        src={selectedOptionObj.dataUrl}
                        alt="Selected Preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'bottom left',
                          display: 'block',
                        }}
                      />
                    )}
                  </div>
                </div>

                <div style={{ padding: '42px 20px 16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A' }}>{creatorName}</div>
                    <div style={{ fontSize: '11.5px', color: '#0052FF', fontWeight: 600 }}>@creator.official • Verified</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#64748B',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Upload Different Photo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 'SUCCESS' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: '14px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  fontSize: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                }}
              >
                ✓
              </div>

              <div style={{ fontSize: '16.5px', fontWeight: 800, color: '#0F172A', textAlign: 'center' }}>
                Profile Picture Successfully Updated!
              </div>
              <div style={{ fontSize: '13px', color: '#64748B', textAlign: 'center' }}>
                Your transparent royal blue studio portrait is now live with NO background.
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 18px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#475569',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>

          {step === 'SELECT_OPTION' && (
            <button
              type="button"
              onClick={handleApplySelection}
              style={{
                padding: '10px 24px',
                backgroundColor: '#0052FF',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13.5px',
                fontWeight: 800,
                color: '#FFFFFF',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 82, 255, 0.25)',
              }}
            >
              Set as Official Profile Picture ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
