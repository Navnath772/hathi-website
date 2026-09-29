import React, { useState, useEffect } from 'react';
import { Ghost, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { audio } from '../services/audio';

interface SpiritScannerModalProps {
  isOpen: boolean;
  onScanComplete: () => void;
  ghostName: string;
}

const SCAN_STEPS = [
  { progress: 0, text: 'INITIALIZING SPIRIT SCANNER...' },
  { progress: 18, text: 'ANALYZING ECTOPLASM DENSITY...' },
  { progress: 35, text: 'CHECKING SOUL FREQUENCY & HARMONICS...' },
  { progress: 57, text: 'MEASURING PHASE BOUNDARY STABILITY...' },
  { progress: 76, text: 'ANALYZING PARANORMAL EVIDENCE WITH GEMINI...' },
  { progress: 91, text: 'CONSULTING DR. HANSRAJ HATHI...' },
  { progress: 100, text: 'DIAGNOSIS FOUND & REPORT GENERATED!' },
];

export const SpiritScannerModal: React.FC<SpiritScannerModalProps> = ({
  isOpen,
  onScanComplete,
  ghostName,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIdx(0);
      return;
    }

    let step = 0;
    audio.playScanPing();

    const interval = setInterval(() => {
      step += 1;
      if (step < SCAN_STEPS.length) {
        setCurrentStepIdx(step);
        audio.playScanPing();
        if (step === 5) {
          audio.playHeartbeat(1.3);
        }
      } else {
        clearInterval(interval);
        audio.playChime();
        setTimeout(() => {
          onScanComplete();
        }, 800);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [isOpen, onScanComplete]);

  if (!isOpen) return null;

  const currentStep = SCAN_STEPS[currentStepIdx] || SCAN_STEPS[SCAN_STEPS.length - 1];

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        zIndex: 2100,
        backgroundColor: 'rgba(3, 4, 8, 0.92)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        className="glass-panel p-4 p-md-5 text-center position-relative scanner-container"
        style={{
          maxWidth: '540px',
          width: '90%',
          border: '1px solid rgba(185, 247, 255, 0.4)',
          boxShadow: '0 0 60px rgba(185, 247, 255, 0.25)',
        }}
      >
        {/* Animated Scanner Beam */}
        <div className="scanner-beam" />

        {/* Header Badges */}
        <div className="d-flex justify-content-between align-items-center mb-4 font-mono small">
          <span className="text-ghost fw-semibold">
            PATIENT: {ghostName.toUpperCase()}
          </span>
          <span className="badge bg-danger text-uppercase px-2 py-1">
            LEVEL 1 SCAN
          </span>
        </div>

        {/* Central Holographic Rings and Ghost Silhouette */}
        <div
          className="position-relative mx-auto my-4 d-flex align-items-center justify-content-center"
          style={{ width: '220px', height: '220px' }}
        >
          {/* Ring 1 */}
          <div
            className="position-absolute rounded-circle border border-info border-opacity-50"
            style={{
              width: '210px',
              height: '210px',
              animation: 'pulseDot 2s infinite ease-out',
            }}
          />
          {/* Ring 2 */}
          <div
            className="position-absolute rounded-circle border border-danger border-opacity-40"
            style={{
              width: '170px',
              height: '170px',
              animation: 'pulseDot 3s infinite reverse ease-out',
            }}
          />

          {/* Central Ghost Icon */}
          <div
            className="rounded-circle p-4 d-flex align-items-center justify-content-center float-ghost"
            style={{
              width: '130px',
              height: '130px',
              background: 'radial-gradient(circle, rgba(185, 247, 255, 0.3) 0%, rgba(17, 17, 38, 0.95) 75%)',
              border: '2px solid var(--ghost-glow)',
              boxShadow: '0 0 35px rgba(185, 247, 255, 0.4)',
            }}
          >
            <Ghost size={64} className="text-ghost" />
          </div>
        </div>

        {/* Step Indicator Progress */}
        <div className="my-3">
          <div className="d-flex justify-content-between font-mono small text-muted mb-2">
            <span>STEP {currentStepIdx + 1} OF {SCAN_STEPS.length}</span>
            <span className="text-ghost fw-bold">{currentStep.progress}%</span>
          </div>

          <div
            className="progress bg-dark border border-secondary"
            style={{ height: '10px', borderRadius: '5px' }}
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-info"
              role="progressbar"
              style={{
                width: `${currentStep.progress}%`,
                transition: 'width 0.4s ease',
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.7)',
              }}
            />
          </div>
        </div>

        {/* Current Step Text */}
        <div className="font-mono text-light fw-bold fs-6 my-3 d-flex align-items-center justify-content-center gap-2">
          {currentStep.progress === 100 ? (
            <CheckCircle2 size={18} className="text-success" />
          ) : (
            <Activity size={18} className="text-medical animate-pulse" />
          )}
          <span>{currentStep.text}</span>
        </div>

        {/* ECG Line Graphic */}
        <div className="pt-2 font-mono text-muted small" style={{ fontSize: '11px' }}>
          SPECTRAL RESONANCE SAMPLER &bull; HATHI MEDICAL AI
        </div>
      </div>
    </div>
  );
};
