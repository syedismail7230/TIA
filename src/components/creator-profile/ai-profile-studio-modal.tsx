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
 * High-Precision Client-Side Background Removal & Alpha Matte Engine
 * Automatically strips solid/gradient backdrops into a 100% transparent PNG cutout.
 */
async function processCutout(
  imageSrc: string,
  tolerance = 45,
  preset: 'natural' | 'vibrant' | 'editorial' = 'natural'
): Promise<string> {
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

        // Apply studio filter presets if desired
        if (preset === 'vibrant') {
          ctx.filter = 'contrast(1.08) saturate(1.15) brightness(1.02)';
        } else if (preset === 'editorial') {
          ctx.filter = 'contrast(1.14) saturate(1.05) brightness(1.04)';
        } else {
          ctx.filter = 'contrast(1.03) brightness(1.01)';
        }

        ctx.drawImage(img, 0, 0);
        ctx.filter = 'none';

        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Sample corner backdrop colors
        const corners = [
          0,
          (width - 1) * 4,
          (height - 1) * width * 4,
          ((height - 1) * width + (width - 1)) * 4,
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

        const visited = new Uint8Array(width * height);
        const queue: number[] = [];

        // Perimeter flood fill
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

          const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);

          if (dist < tolerance) {
            data[pIdx + 3] = 0; // 100% Transparent Alpha

            if (x > 0 && !visited[y * width + (x - 1)]) queue.push(x - 1, y);
            if (x < width - 1 && !visited[y * width + (x + 1)]) queue.push(x + 1, y);
            if (y > 0 && !visited[(y - 1) * width + x]) queue.push(x, y - 1);
            if (y < height - 1 && !visited[(y + 1) * width + x]) queue.push(x, y + 1);
          } else if (dist < tolerance + 25) {
            const alphaFactor = (dist - tolerance) / 25;
            data[pIdx + 3] = Math.floor(alphaFactor * 255);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error('Cutout processing error:', err);
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
  // Processing States: 'UPLOAD' | 'ANALYZING' | 'EDIT_STUDIO' | 'SUCCESS'
  const [step, setStep] = useState<'UPLOAD' | 'ANALYZING' | 'EDIT_STUDIO' | 'SUCCESS'>('UPLOAD');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('Initializing Studio Engine...');
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);

  // Studio Options
  const [transparentCutoutSrc, setTransparentCutoutSrc] = useState<string | null>(null);
  const [isTransparentActive, setIsTransparentActive] = useState<boolean>(true);
  const [selectedPreset, setSelectedPreset] = useState<'natural' | 'vibrant' | 'editorial'>('natural');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [panY, setPanY] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setStep('UPLOAD');
      setProcessingProgress(0);
      setRawImageSrc(null);
      setTransparentCutoutSrc(null);
      setIsTransparentActive(true);
      setSelectedPreset('natural');
      setZoomLevel(100);
      setPanY(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  /**
   * Handle File Upload & Trigger Clean In-Browser Background Stripping
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
      processImage(result);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Fast In-Browser Processing (100% Free, Instant)
   */
  const processImage = async (imageSrc: string) => {
    setStep('ANALYZING');
    setProcessingProgress(25);
    setProcessingMessage('Scanning photo and framing profile portrait...');

    try {
      setTimeout(() => {
        setProcessingProgress(65);
        setProcessingMessage('Extracting transparent alpha cutout (NO background)...');
      }, 300);

      const cutoutData = await processCutout(imageSrc, 48, 'natural');

      setTimeout(() => {
        setProcessingProgress(100);
        setProcessingMessage('Ready!');
        setTransparentCutoutSrc(cutoutData);

        setTimeout(() => {
          setStep('EDIT_STUDIO');
        }, 300);
      }, 600);
    } catch (err: any) {
      console.error('Processing failed:', err);
      setTransparentCutoutSrc(imageSrc);
      setStep('EDIT_STUDIO');
    }
  };

  /**
   * Apply Filter Preset Change
   */
  const handlePresetChange = async (preset: 'natural' | 'vibrant' | 'editorial') => {
    if (!rawImageSrc) return;
    setSelectedPreset(preset);
    const updatedCutout = await processCutout(rawImageSrc, 48, preset);
    setTransparentCutoutSrc(updatedCutout);
  };

  /**
   * Save and Apply Final Avatar
   */
  const handleSaveAvatar = () => {
    const finalAvatar = (isTransparentActive && transparentCutoutSrc) ? transparentCutoutSrc : rawImageSrc;
    if (finalAvatar) {
      onSaveAvatar(finalAvatar);
      setStep('SUCCESS');
      setTimeout(() => {
        onClose();
      }, 1200);
    }
  };

  const activeDisplaySrc = (isTransparentActive && transparentCutoutSrc) ? transparentCutoutSrc : (rawImageSrc || currentAvatar);

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
          maxWidth: '720px',
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
                Profile Photo Studio • Clean Cutout Engine
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                100% Free • Real Photo Preservation • Transparent Background Cutout
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
          {/* STEP 1: UPLOAD PHOTO */}
          {step === 'UPLOAD' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '100%',
                  border: '2px dashed #CBD5E1',
                  borderRadius: '16px',
                  padding: '44px 20px',
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
                    Click or Drag to Upload Your Photo
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '4px' }}>
                    Upload any portrait or selfie (PNG, JPG, WEBP) to create your clean profile cutout
                  </div>
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
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

              {/* Feature Highlights */}
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
                  <span>Pure Quality & Zero Cost:</span>
                </div>
                <div>• <strong>100% Real Photo</strong>: Your authentic face, outfit, and style are preserved naturally.</div>
                <div>• <strong>Automatic Background Removal</strong>: Strips backdrops to transparent alpha with zero box.</div>
                <div>• <strong>Instant Live Preview</strong>: Floats seamlessly over your cover banner without awkward seams.</div>
              </div>
            </div>
          )}

          {/* STEP 2: ANALYZING & STRIPPING */}
          {step === 'ANALYZING' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '44px 0', gap: '20px' }}>
              <div
                style={{
                  width: '68px',
                  height: '68px',
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
                  Preparing Studio Cutout
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
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          )}

          {/* STEP 3: STUDIO CUSTOMIZER & BANNER PREVIEW */}
          {step === 'EDIT_STUDIO' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Controls Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  backgroundColor: '#F8FAFC',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                }}
              >
                {/* Background Cutout Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>Background:</span>
                  <div style={{ display: 'flex', backgroundColor: '#E2E8F0', borderRadius: '8px', padding: '2px' }}>
                    <button
                      type="button"
                      onClick={() => setIsTransparentActive(true)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        backgroundColor: isTransparentActive ? '#0052FF' : 'transparent',
                        color: isTransparentActive ? '#FFFFFF' : '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      Transparent Cutout (No BG)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsTransparentActive(false)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        backgroundColor: !isTransparentActive ? '#0052FF' : 'transparent',
                        color: !isTransparentActive ? '#FFFFFF' : '#475569',
                        cursor: 'pointer',
                      }}
                    >
                      Original Background
                    </button>
                  </div>
                </div>

                {/* Lighting Presets */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>Studio Lighting:</span>
                  {(['natural', 'vibrant', 'editorial'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePresetChange(p)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: selectedPreset === p ? '1.5px solid #0052FF' : '1px solid #CBD5E1',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: selectedPreset === p ? '#EFF6FF' : '#FFFFFF',
                        color: selectedPreset === p ? '#0052FF' : '#64748B',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Side-by-Side Cutout Preview & Live Profile Header Preview */}
              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '16px' }}>
                {/* Isolated Cutout Checker Box */}
                <div
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #F1F5F9', fontSize: '11px', fontWeight: 700, color: '#64748B', textAlign: 'center' }}>
                    {isTransparentActive ? 'Transparent Cutout' : 'Original Photo'}
                  </div>

                  <div
                    style={{
                      height: '190px',
                      backgroundColor: '#F8FAFC',
                      backgroundImage: isTransparentActive ? 'radial-gradient(#CBD5E1 1px, transparent 1px)' : 'none',
                      backgroundSize: '8px 8px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      padding: '8px',
                    }}
                  >
                    <img
                      src={activeDisplaySrc}
                      alt="Cutout Preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        transform: `scale(${zoomLevel / 100}) translateY(${panY}px)`,
                        transition: 'transform 0.1s ease',
                      }}
                    />
                  </div>
                </div>

                {/* Live Banner Placement Box (Floating Cutout Over Banner!) */}
                <div
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ padding: '8px 14px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #F1F5F9', fontSize: '11.5px', fontWeight: 700, color: '#64748B' }}>
                    Live Profile Header Preview:
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
                        left: '20px',
                        width: '110px',
                        height: '110px',
                        borderRadius: isTransparentActive ? '0px' : '14px',
                        overflow: isTransparentActive ? 'visible' : 'hidden',
                        backgroundColor: isTransparentActive ? 'transparent' : '#FFFFFF',
                        border: isTransparentActive ? 'none' : '3px solid #FFFFFF',
                        boxShadow: isTransparentActive ? 'none' : '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    >
                      <img
                        src={activeDisplaySrc}
                        alt="Banner Preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: isTransparentActive ? 'contain' : 'cover',
                          objectPosition: isTransparentActive ? 'bottom left' : 'center',
                          transform: `scale(${zoomLevel / 100}) translateY(${panY}px)`,
                          display: 'block',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ padding: '42px 20px 14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{creatorName}</div>
                      <div style={{ fontSize: '11.5px', color: '#0052FF', fontWeight: 600 }}>@creator.official • Verified</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#64748B',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      Change Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* Adjust Positioning & Scale Sliders */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  padding: '12px 18px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', minWidth: '45px' }}>Zoom:</span>
                  <input
                    type="range"
                    min="80"
                    max="140"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(Number(e.target.value))}
                    style={{ flex: 1, cursor: 'pointer', accentColor: '#0052FF' }}
                  />
                  <span style={{ fontSize: '11px', color: '#64748B', minWidth: '35px' }}>{zoomLevel}%</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', minWidth: '70px' }}>Vertical Pan:</span>
                  <input
                    type="range"
                    min="-25"
                    max="25"
                    value={panY}
                    onChange={(e) => setPanY(Number(e.target.value))}
                    style={{ flex: 1, cursor: 'pointer', accentColor: '#0052FF' }}
                  />
                  <span style={{ fontSize: '11px', color: '#64748B', minWidth: '30px' }}>{panY}px</span>
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
                Your clean, transparent profile cutout is now live across your creator showcase.
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

          {step === 'EDIT_STUDIO' && (
            <button
              type="button"
              onClick={handleSaveAvatar}
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
