import React, { useState, useEffect } from 'react';
import { Ghost, ArrowRight, Activity, Sparkles } from 'lucide-react';
import { audio } from '../services/audio';

interface IntroExperienceProps {
  onComplete: () => void;
  onEnableSound: () => void;
}

export const IntroExperience: React.FC<IntroExperienceProps> = ({
  onComplete,
  onEnableSound,
}) => {
  const [step, setStep] = useState<number>(0);
  // Step 0: Pure black, faint ECG pulse
  // Step 1: Second heartbeat, fog rises
  // Step 2: Ghost emerges & first speech: "Welcome to the Ghost Clinic..."
  // Step 3: "Even ghosts need a doctor sometimes."
  // Step 4: Logo reveal: HATHI AFTERDARK + CTA

  useEffect(() => {
    const t0 = setTimeout(() => {
      setStep(1);
    }, 1200);

    const t1 = setTimeout(() => {
      setStep(2);
    }, 2800);

    const t2 = setTimeout(() => {
      setStep(3);
    }, 4500);

    const t3 = setTimeout(() => {
      setStep(4);
    }, 6200);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleEnterClinic = (enableAudio: boolean) => {
    if (enableAudio) {
      onEnableSound();
      audio.setSoundEnabled(true);
      audio.playHeartbeat(1.2);
    }
    onComplete();
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
      style={{
        zIndex: 2000,
        backgroundColor: '#030408',
        color: '#F5F7FA',
        overflow: 'hidden',
      }}
    >
      {/* Background Moon & Fog */}
      <div
        className="position-absolute rounded-circle transition-all"
        style={{
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(185, 247, 255, 0.12) 0%, transparent 70%)',
          top: '20%',
          opacity: step >= 1 ? 0.8 : 0,
          transition: 'opacity 2s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Skip Button Top Right */}
      <button
        onClick={() => handleEnterClinic(false)}
        className="btn btn-link text-muted position-absolute top-0 end-0 m-4 text-decoration-none font-mono small"
        style={{ zIndex: 2010 }}
      >
        SKIP INTRO [ESC] &rarr;
      </button>

      {/* Center Stage Animation */}
      <div className="text-center px-4 position-relative" style={{ maxWidth: '640px' }}>
        {/* ECG Line Indicator */}
        <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
          <Activity
            className={`transition-all ${step >= 0 ? 'text-medical' : 'opacity-0'}`}
            size={step >= 1 ? 32 : 24}
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 77, 103, 0.6))',
              animation: 'pulseDot 1.4s infinite',
            }}
          />
          <span className="font-mono small text-muted" style={{ letterSpacing: '0.2em' }}>
            {step === 0 && 'ETH REAL FREQUENCY 0.0 Hz'}
            {step === 1 && 'PULSE DETECTED: 42 BPM'}
            {step >= 2 && 'DIMENSIONAL GATE OPEN'}
          </span>
        </div>

        {/* Ghost Avatar */}
        <div
          className="my-3 transition-all"
          style={{
            transform: step >= 2 ? 'scale(1) translateY(0)' : 'scale(0.6) translateY(40px)',
            opacity: step >= 2 ? 1 : 0,
            transition: 'all 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            className="d-inline-flex p-4 rounded-circle position-relative float-ghost"
            style={{
              background: 'radial-gradient(circle, rgba(185, 247, 255, 0.25) 0%, rgba(17, 17, 38, 0.8) 75%)',
              border: '2px solid rgba(185, 247, 255, 0.4)',
              boxShadow: '0 0 40px rgba(185, 247, 255, 0.35)',
            }}
          >
            <Ghost size={68} className="text-ghost" />
            <div
              className="position-absolute"
              style={{
                top: '12px',
                right: '12px',
                color: 'var(--medical-accent)',
                animation: 'pulseCross 2s infinite',
              }}
            >
              <Sparkles size={20} />
            </div>
          </div>
        </div>

        {/* Cinematic Narrative Speeches */}
        <div className="min-vh-10 my-4" style={{ minHeight: '90px' }}>
          {step === 2 && (
            <div className="glass-panel p-3 animate-fade-in">
              <p className="fs-5 mb-0 text-ghost font-heading">
                &ldquo;Welcome to the Ghost Clinic...&rdquo;
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="glass-panel p-3 animate-fade-in">
              <p className="fs-5 mb-1 text-light">
                &ldquo;Even ghosts need a doctor sometimes.&rdquo;
              </p>
              <p className="small text-ghost font-mono mb-0">
                Dr. Hathi is waiting for you in Examination Room #1.
              </p>
            </div>
          )}

          {step >= 4 && (
            <div className="animate-fade-in">
              <h1 className="font-heading display-5 fw-bold text-light mb-1">
                HATHI <span className="text-ghost">AFTERDARK</span>
              </h1>
              <p className="font-mono text-muted small text-uppercase tracking-wider mb-4">
                Supernatural Healthcare for the Afterlife
              </p>

              {/* CTAs */}
              <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3 mt-4">
                <button
                  onClick={() => handleEnterClinic(true)}
                  className="btn glow-btn-primary px-4 py-3 d-flex align-items-center gap-2 fs-6 w-100 w-sm-auto justify-content-center"
                >
                  <span>ENTER THE CLINIC (WITH SOUND)</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => handleEnterClinic(false)}
                  className="btn glow-btn-ghost px-4 py-3 fs-6 w-100 w-sm-auto"
                >
                  ENTER SILENTLY
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-muted small mt-4 font-mono" style={{ fontSize: '11px', opacity: 0.7 }}>
          * Fictional supernatural entertainment experience. Not real medical advice.
        </p>
      </div>
    </div>
  );
};
