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
 * AI Human Body & Selfie Segmentation Engine using Google MediaPipe AI
 * Detects the human person (hair, face, torso, shoulders) and removes ALL background clutter,
 * rooms, walls, objects, and furniture to 100% transparent alpha.
 */
async function extractHumanWithAI(imageSrc: string): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(imageSrc);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;

        // Dynamically load MediaPipe Selfie Segmentation from CDN or npm package
        let SelfieSegmentationClass = (window as any).SelfieSegmentation;

        if (!SelfieSegmentationClass) {
          await new Promise<void>((res, rej) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/selfie_segmentation.js';
            script.crossOrigin = 'anonymous';
            script.onload = () => res();
            script.onerror = () => rej(new Error('Failed to load MediaPipe script'));
            document.head.appendChild(script);
          });
          SelfieSegmentationClass = (window as any).SelfieSegmentation;
        }

        if (!SelfieSegmentationClass) {
          console.warn('MediaPipe not available, using fallback flood-fill');
          return resolve(fallbackFloodFill(img, width, height));
        }

        const segmenter = new SelfieSegmentationClass({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
        });

        segmenter.setOptions({
          modelSelection: 1, // High accuracy general/portrait model
        });

        segmenter.onResults((results: any) => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            if (!ctx) return resolve(imageSrc);

            // 1. Clear canvas
            ctx.clearRect(0, 0, width, height);

            // 2. Draw the AI human segmentation mask
            ctx.drawImage(results.segmentationMask, 0, 0, width, height);

            // 3. Composite ONLY the human onto the mask (source-in)
            ctx.globalCompositeOperation = 'source-in';
            ctx.drawImage(results.image, 0, 0, width, height);

            // 4. Reset composite operation
            ctx.globalCompositeOperation = 'source-over';

            const outputDataUrl = canvas.toDataURL('image/png');
            resolve(outputDataUrl);
          } catch (e) {
            console.error('Error in MediaPipe onResults:', e);
            resolve(fallbackFloodFill(img, width, height));
          }
        });

        await segmenter.send({ image: img });
      } catch (err) {
        console.error('MediaPipe Human Segmentation error:', err);
        resolve(fallbackFloodFill(img, img.naturalWidth || img.width, img.naturalHeight || img.height));
      }
    };
    img.onerror = () => resolve(imageSrc);
    img.src = imageSrc;
  });
}

/**
 * Fallback flood-fill alpha extractor for edge-cases
 */
function fallbackFloodFill(img: HTMLImageElement, width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return img.src;

  ctx.drawImage(img, 0, 0);
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];

  const visited = new Uint8Array(width * height);
  const queue: number[] = [];

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

    if (x < 0 || x >= width || y < 0 || y >= height || visited[idx]) continue;
    visited[idx] = 1;

    const pIdx = idx * 4;
    const dist = Math.sqrt((data[pIdx] - bgR) ** 2 + (data[pIdx + 1] - bgG) ** 2 + (data[pIdx + 2] - bgB) ** 2);

    if (dist < 45) {
      data[pIdx + 3] = 0;
      if (x > 0 && !visited[y * width + (x - 1)]) queue.push(x - 1, y);
      if (x < width - 1 && !visited[y * width + (x + 1)]) queue.push(x + 1, y);
      if (y > 0 && !visited[(y - 1) * width + x]) queue.push(x, y - 1);
      if (y < height - 1 && !visited[(y + 1) * width + x]) queue.push(x, y + 1);
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL('image/png');
}

export function AIProfileStudioModal({
  isOpen,
  onClose,
  onSaveAvatar,
  currentAvatar = '/profile.png',
  creatorName = 'Creator',
}: AIProfileStudioModalProps) {
  // Processing States: 'UPLOAD' | 'SEGMENTING_HUMAN' | 'EDIT_STUDIO' | 'SUCCESS'
  const [step, setStep] = useState<'UPLOAD' | 'SEGMENTING_HUMAN' | 'EDIT_STUDIO' | 'SUCCESS'>('UPLOAD');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('Initializing AI Neural Segmentation...');
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);

  // Studio Options
  const [transparentCutoutSrc, setTransparentCutoutSrc] = useState<string | null>(null);
  const [isTransparentActive, setIsTransparentActive] = useState<boolean>(true);
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
      setZoomLevel(100);
      setPanY(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  /**
   * Handle File Upload & Trigger AI Human Segmentation
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
      processHumanSegmentation(result);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Run Google MediaPipe AI Human Detection
   */
  const processHumanSegmentation = async (imageSrc: string) => {
    setStep('SEGMENTING_HUMAN');
    setProcessingProgress(25);
    setProcessingMessage('Detecting human body, face, hair & shoulders...');

    try {
      setTimeout(() => {
        setProcessingProgress(60);
        setProcessingMessage('Removing background clutter, walls & furniture...');
      }, 400);

      const cutoutData = await extractHumanWithAI(imageSrc);

      setProcessingProgress(100);
      setProcessingMessage('Human Isolated Successfully!');
      setTransparentCutoutSrc(cutoutData);

      setTimeout(() => {
        setStep('EDIT_STUDIO');
      }, 300);
    } catch (err: any) {
      console.error('Human segmentation failed:', err);
      setTransparentCutoutSrc(imageSrc);
      setStep('EDIT_STUDIO');
    }
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
                AI Profile Studio • Human Detection & Cutout Engine
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                AI Human Body Segmentation • Strips Backgrounds & Clutter • 100% Free
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
                  👤
                </div>

                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                    Click or Drag to Upload Creator Photo
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '4px' }}>
                    AI automatically detects the human body and strips all background walls, rooms, and clutter
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
                  <span>AI Human Segmentation:</span>
                </div>
                <div>• <strong>Detects the Human Person</strong>: Preserves hair, facial features, skin, shoulders, and clothes.</div>
                <div>• <strong>Removes All Clutter</strong>: Strips rooms, backgrounds, chairs, shadows, and unnecessary elements.</div>
                <div>• <strong>100% Transparent Cutout</strong>: Floats seamlessly over your `# THE INFLUENCE IS REAL` cover banner.</div>
              </div>
            </div>
          )}

          {/* STEP 2: SEGMENTING HUMAN */}
          {step === 'SEGMENTING_HUMAN' && (
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
                  AI Segmenting Human Body & Hair
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
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
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0F172A' }}>Mode:</span>
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
                      AI Human Cutout (No BG)
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
                      Original Photo
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#0052FF',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Upload Different Photo
                </button>
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
                    {isTransparentActive ? 'Isolated Human' : 'Original Photo'}
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
                Your official isolated human portrait cutout is now live across your creator showcase.
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
