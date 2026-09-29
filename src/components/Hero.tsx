import React from 'react';
import { Ghost, Activity, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { audio } from '../services/audio';

interface HeroProps {
  onStartCheckup: () => void;
  onMeetDoctor: () => void;
  onRunDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartCheckup,
  onMeetDoctor,
  onRunDemo,
}) => {
  return (
    <section id="hero" className="position-relative py-5 mt-5 overflow-hidden">
      {/* Ambient Radial Fog & Moonlight */}
      <div className="fog-layer" />
      <div
        className="position-absolute top-0 start-50 translate-middle-x rounded-circle pointer-events-none"
        style={{
          width: '560px',
          height: '560px',
          background: 'radial-gradient(circle, rgba(185, 247, 255, 0.08) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 80%)',
          zIndex: 0,
        }}
      />

      <div className="container position-relative py-lg-5" style={{ zIndex: 1 }}>
        <div className="row align-items-center gy-5">
          {/* Left Column: Headlines & CTAs */}
          <div className="col-lg-7 text-center text-lg-start">
            {/* Top Sub-badge */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill glass-panel-sm mb-3">
              <span className="pulse-circle rounded-circle bg-danger" style={{ width: '8px', height: '8px' }} />
              <span className="font-mono small text-ghost fw-semibold" style={{ fontSize: '12px' }}>
                HATHI AFTERDARK &bull; AFTERLIFE EMERGENCY OPEN 24/7
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-heading display-4 fw-black text-light lh-tight mb-3">
              WHAT HAPPENS <br />
              <span className="text-transparent bg-clip-text" style={{
                backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #B9F7FF 60%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                WHEN A GHOST
              </span> <br />
              GETS SICK?
            </h1>

            {/* Taglines */}
            <p className="fs-5 text-muted mb-4 pe-lg-4" style={{ maxWidth: '580px', lineHeight: 1.6 }}>
              Welcome to the world&rsquo;s first supernatural healthcare experience built for the afterlife.
              Triage ectoplasmic destabilization, phantom phase locks, and mirror hauntings with{' '}
              <strong className="text-light">Dr. Hansraj Hathi</strong> and our multimodal{' '}
              <strong className="text-ghost">Gemini AI</strong>.
            </p>

            {/* Floating Tags */}
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start mb-4 font-mono small">
              <span className="badge bg-dark bg-opacity-75 text-ghost border border-secondary px-3 py-2 rounded-pill">
                ✦ 24/7 GHOST CARE
              </span>
              <span className="badge bg-dark bg-opacity-75 text-medical border border-secondary px-3 py-2 rounded-pill">
                ✚ SPIRIT DIAGNOSTICS
              </span>
              <span className="badge bg-dark bg-opacity-75 text-light border border-secondary px-3 py-2 rounded-pill">
                ⚡ AI CONSULTATION
              </span>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <button
                onClick={() => {
                  audio.playClick();
                  onStartCheckup();
                }}
                className="btn glow-btn-primary px-4 py-3 d-flex align-items-center justify-content-center gap-2 fs-6"
              >
                <span>START GHOST CHECK-UP</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => {
                  audio.playClick();
                  onMeetDoctor();
                }}
                className="btn glow-btn-ghost px-4 py-3 d-flex align-items-center justify-content-center gap-2 fs-6"
              >
                <span>MEET DR. HATHI</span>
              </button>

              <button
                onClick={() => {
                  audio.playChime();
                  onRunDemo();
                }}
                className="btn btn-outline-info px-3 py-3 d-flex align-items-center justify-content-center gap-2 fs-6 border-opacity-50"
                title="Automatically demonstrate Check-Up, Vision Scan, Diagnosis & Secrets"
              >
                <Zap size={16} />
                <span>90s Demo</span>
              </button>
            </div>

            {/* Fictional Disclaimer */}
            <p className="font-mono text-muted small mt-4 mb-0" style={{ fontSize: '11px' }}>
              * Fictional supernatural entertainment experience. Not real medical advice.
            </p>
          </div>

          {/* Right Column: Interactive Medical Ghost Hologram */}
          <div className="col-lg-5 d-flex justify-content-center position-relative">
            {/* Glowing Holographic Backdrop */}
            <div
              className="position-relative d-flex flex-column align-items-center justify-content-center p-4"
              style={{
                width: '100%',
                maxWidth: '440px',
                minHeight: '440px',
              }}
            >
              {/* Outer Hologram Circle */}
              <div
                className="position-absolute rounded-circle border border-info border-opacity-25"
                style={{
                  width: '360px',
                  height: '360px',
                  animation: 'pulseDot 4s infinite alternate',
                }}
              />
              <div
                className="position-absolute rounded-circle border border-danger border-opacity-20"
                style={{
                  width: '310px',
                  height: '310px',
                }}
              />

              {/* Central Ghost Avatar with Floating Animation */}
              <div className="position-relative float-ghost my-4">
                <div
                  className="rounded-circle p-4 d-flex align-items-center justify-content-center"
                  style={{
                    width: '180px',
                    height: '180px',
                    background: 'radial-gradient(circle, rgba(185, 247, 255, 0.28) 0%, rgba(17, 17, 38, 0.95) 75%)',
                    border: '2px solid rgba(185, 247, 255, 0.5)',
                    boxShadow: '0 0 50px rgba(185, 247, 255, 0.35)',
                  }}
                >
                  <Ghost size={90} className="text-ghost" />
                </div>

                {/* Floating HUD Chip 1: Vitals */}
                <div
                  className="position-absolute glass-panel p-2 px-3 shadow-lg"
                  style={{
                    top: '-15px',
                    right: '-40px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 77, 103, 0.4)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <Activity size={16} className="text-medical" />
                    <div>
                      <div className="font-mono text-muted" style={{ fontSize: '9px' }}>ECTO-FREQUENCY</div>
                      <div className="font-mono text-light fw-bold" style={{ fontSize: '13px' }}>78.4 Hz ● HIGH</div>
                    </div>
                  </div>
                </div>

                {/* Floating HUD Chip 2: Phase Status */}
                <div
                  className="position-absolute glass-panel p-2 px-3 shadow-lg"
                  style={{
                    bottom: '-15px',
                    left: '-35px',
                    borderRadius: '12px',
                    border: '1px solid rgba(185, 247, 255, 0.4)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <ShieldCheck size={16} className="text-ghost" />
                    <div>
                      <div className="font-mono text-muted" style={{ fontSize: '9px' }}>PHASE EQUILIBRIUM</div>
                      <div className="font-mono text-ghost fw-bold" style={{ fontSize: '13px' }}>31% UNSTABLE</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Hologram Status Strip */}
              <div
                className="w-100 glass-panel-sm p-3 mt-3 d-flex align-items-center justify-content-between text-center"
                style={{ borderRadius: '12px' }}
              >
                <div>
                  <div className="font-mono text-muted small" style={{ fontSize: '10px' }}>SOUL DENSITY</div>
                  <div className="font-mono text-light fw-bold">84.2%</div>
                </div>
                <div className="vr bg-secondary opacity-50" />
                <div>
                  <div className="font-mono text-muted small" style={{ fontSize: '10px' }}>DIMENSION</div>
                  <div className="font-mono text-ghost fw-bold">4.07 D</div>
                </div>
                <div className="vr bg-secondary opacity-50" />
                <div>
                  <div className="font-mono text-muted small" style={{ fontSize: '10px' }}>STATUS</div>
                  <div className="font-mono text-medical fw-bold">REQUIRES SCAN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
