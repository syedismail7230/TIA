'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AIProfileStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAvatar: (avatarDataUrl: string) => void;
  currentAvatar?: string;
  creatorName?: string;
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

  // 3 Generated Options from Cloudflare Workers AI
  const [generatedOptions, setGeneratedOptions] = useState<
    { id: string; name: string; tag: string; description: string; pose: string; clothing: string; dataUrl: string }[]
  >([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('opt-signature-blazer');

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
    setProcessingMessage('Scanning photo for human face, hair & pose alignment...');

    try {
      // Progress simulation step 1
      setTimeout(() => {
        setProcessingProgress(40);
        setProcessingMessage('Connected to Cloudflare Workers AI GPU Edge...');
      }, 700);

      // Progress simulation step 2
      setTimeout(() => {
        setProcessingProgress(70);
        setProcessingMessage('Synthesizing 3 Royal Blue Studio Portraits in parallel...');
      }, 2000);

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
        setProcessingProgress(100);
        setProcessingMessage('AI Studio Variations Ready!');
        setGeneratedOptions(data.variations);
        setSelectedOptionId(data.variations[0].id);

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
                Cloudflare Workers AI Profile Studio
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Live GPU edge generation • 3 Uniform Royal Blue Studio Variations
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
                    Upload any photo or selfie (PNG, JPG, WEBP) to recreate your uniform studio look
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
                  <span>Powered by Cloudflare Workers AI Edge GPUs (10,000 Free Daily Neurons)</span>
                </div>
                <div>1. Analyzes your facial profile and framing.</div>
                <div>2. Recreates 3 photorealistic studio variations wearing the signature <strong>royal blue blazer</strong>.</div>
                <div>3. Delivers crisp 8k UHD studio key lighting with high edge contrast for instant profile branding.</div>
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
                  Generating Live AI Studio Variations
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
                  Select your preferred AI studio recreation:
                </div>
                <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700, backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px' }}>
                  ✓ 3 Live AI Variations Generated
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

                      {/* Studio Preview */}
                      <div
                        style={{
                          width: '100%',
                          height: '140px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          backgroundColor: '#0F172A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={opt.dataUrl}
                          alt={opt.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
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

              {/* Live Banner Preview Box */}
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
                  {/* Avatar Placement on Banner */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-25px',
                      left: '24px',
                      width: '90px',
                      height: '90px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      backgroundColor: 'transparent',
                    }}
                  >
                    {selectedOptionObj && (
                      <img
                        src={selectedOptionObj.dataUrl}
                        alt="Selected Preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                      />
                    )}
                  </div>
                </div>

                <div style={{ padding: '34px 20px 16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                Your new AI Studio Portrait is now live across your creator showcase.
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
