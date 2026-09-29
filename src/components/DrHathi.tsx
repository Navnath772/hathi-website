import React, { useState } from 'react';
import {
  Stethoscope,
  Activity,
  Heart,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Award,
  Clock,
  Compass,
} from 'lucide-react';
import { audio } from '../services/audio';

interface DrHathiProps {
  onStartConsultation: () => void;
  onStethoscopeClick: () => void;
  stethoscopeUnlocked: boolean;
}

export const DrHathi: React.FC<DrHathiProps> = ({
  onStartConsultation,
  onStethoscopeClick,
  stethoscopeUnlocked,
}) => {
  const [clickCount, setClickCount] = useState<number>(0);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [stethoscopeStatus, setStethoscopeStatus] = useState<string | null>(null);

  const handleStethoscopeInteract = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    audio.playHeartbeat(1.1 + nextCount * 0.15);

    if (nextCount < 3) {
      setStethoscopeStatus(`Auscultation: Ethereal beat detected (#${nextCount}/3)...`);
      setTimeout(() => setStethoscopeStatus(null), 2500);
    } else {
      // 3rd click: Secret trigger!
      setGlitchActive(true);
      audio.playGlitch();
      setStethoscopeStatus(
        "HEARTBEAT DETECTED... WAIT! THIS PATIENT ISN'T ALIVE! PORTAL OPENING..."
      );
      onStethoscopeClick();
      setTimeout(() => {
        setGlitchActive(false);
      }, 4000);
    }
  };

  return (
    <section id="dr-hathi" className="py-5 position-relative">
      <div className="container py-lg-4">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill glass-panel-sm mb-2">
            <Activity className="text-medical" size={14} />
            <span className="font-mono text-ghost small text-uppercase fw-semibold" style={{ fontSize: '11px' }}>
              CHIEF PHYSICIAN OF THE AFTERLIFE
            </span>
          </div>
          <h2 className="font-heading display-5 fw-bold text-light mb-2">
            MEET DR. HANSRAJ HATHI
          </h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Renowned healer of the mortal realm, now tending to spirits, phantoms, and lost souls across dimensions.
          </p>
        </div>

        {/* Doctor Card & Interactive Dossier */}
        <div className="row align-items-center gy-4 justify-content-center">
          {/* Left Column: Doctor Profile Card */}
          <div className="col-lg-5">
            <div
              className={`glass-panel p-4 p-md-5 text-center position-relative ${
                glitchActive ? 'glitch-flash' : ''
              }`}
              style={{
                border: stethoscopeUnlocked
                  ? '1px solid rgba(255, 77, 103, 0.6)'
                  : '1px solid rgba(185, 247, 255, 0.25)',
              }}
            >
              {/* Secret Unlocked Hologram Stamp */}
              {stethoscopeUnlocked && (
                <div
                  className="position-absolute top-0 end-0 m-3 badge bg-danger text-uppercase px-2 py-1 font-mono"
                  style={{ fontSize: '10px' }}
                >
                  DIMENSIONAL PORTAL OPEN
                </div>
              )}

              {/* Doctor Avatar / Medical Crest */}
              <div className="position-relative d-inline-block mb-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center position-relative float-ghost"
                  style={{
                    width: '160px',
                    height: '160px',
                    background: 'radial-gradient(circle, rgba(255, 77, 103, 0.2) 0%, rgba(17, 17, 38, 0.95) 70%)',
                    border: '3px solid rgba(185, 247, 255, 0.4)',
                    boxShadow: '0 0 35px rgba(255, 77, 103, 0.3)',
                    margin: '0 auto',
                  }}
                >
                  <Activity size={72} className="text-medical" />
                </div>

                {/* Interactive Stethoscope (Secret Trigger #3) */}
                <button
                  onClick={handleStethoscopeInteract}
                  className={`btn position-absolute rounded-circle p-2.5 transition-all ${
                    stethoscopeUnlocked
                      ? 'btn-danger shadow-lg'
                      : 'btn-dark border border-info border-opacity-50'
                  }`}
                  style={{
                    bottom: '0px',
                    right: '5px',
                    width: '46px',
                    height: '46px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 15px rgba(185, 247, 255, 0.5)',
                  }}
                  title="Dr. Hathi's Spectral Stethoscope (Click to listen)"
                >
                  <Stethoscope
                    size={22}
                    className={stethoscopeUnlocked ? 'text-white' : 'text-ghost'}
                  />
                </button>
              </div>

              {/* Stethoscope Status Notification */}
              {stethoscopeStatus && (
                <div
                  className="alert alert-info py-2 px-3 small font-mono mb-3 animate-fade-in"
                  style={{ fontSize: '11px', background: 'rgba(6, 182, 212, 0.15)', borderColor: 'rgba(6, 182, 212, 0.4)' }}
                >
                  {stethoscopeStatus}
                </div>
              )}

              {/* Doctor Titles */}
              <h3 className="font-heading fs-3 fw-bold text-light mb-1">
                DR. HANSRAJ HATHI
              </h3>
              <p className="font-mono text-ghost small mb-3">
                MD, Afterlife Medicine &bull; Fellow of Paranormal Triage
              </p>

              {/* Doctor Quote */}
              <blockquote className="p-3 rounded-3 mb-4 font-italic" style={{ background: 'rgba(255, 255, 255, 0.03)', borderLeft: '3px solid var(--medical-accent)' }}>
                <p className="mb-0 text-light fs-6">
                  &ldquo;Tell me where it hurts... Sahi baat hai, whether mortal or spirit, every soul deserves gentle care and a peaceful afterlife.&rdquo;
                </p>
              </blockquote>

              {/* Consultation CTA */}
              <button
                onClick={() => {
                  audio.playClick();
                  onStartConsultation();
                }}
                className="btn glow-btn-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2"
              >
                <span>START CONSULTATION</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Doctor Qualifications & Features */}
          <div className="col-lg-6 ps-lg-4">
            <h4 className="font-heading fs-4 fw-bold text-light mb-4">
              Comprehensive Afterlife Healthcare Services
            </h4>

            <div className="d-flex flex-column gap-3">
              {/* Feature 1 */}
              <div className="glass-panel p-3 d-flex align-items-start gap-3">
                <div className="p-2.5 rounded-3 bg-danger bg-opacity-25 text-medical">
                  <Clock size={24} />
                </div>
                <div>
                  <h5 className="fs-6 fw-bold text-light mb-1 font-heading">
                    24/7 Ghost Care & Midnight Triage
                  </h5>
                  <p className="text-muted small mb-0">
                    Emergencies happen most frequently between 03:00 and 03:30 AM. Our supernatural ward never closes.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="glass-panel p-3 d-flex align-items-start gap-3">
                <div className="p-2.5 rounded-3 bg-info bg-opacity-20 text-ghost">
                  <Compass size={24} />
                </div>
                <div>
                  <h5 className="fs-6 fw-bold text-light mb-1 font-heading">
                    Multimodal Spirit Diagnostics
                  </h5>
                  <p className="text-muted small mb-0">
                    Combining Dr. Hathi&rsquo;s clinical intuition with Gemini 3.8 vision & voice recognition to analyze ectoplasmic stability.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="glass-panel p-3 d-flex align-items-start gap-3">
                <div className="p-2.5 rounded-3 bg-purple bg-opacity-20 text-purple-accent">
                  <Award size={24} />
                </div>
                <div>
                  <h5 className="fs-6 fw-bold text-light mb-1 font-heading">
                    Certified Afterlife Prescriptions
                  </h5>
                  <p className="text-muted small mb-0">
                    Every spirit diagnosis generates a signed afterlife prescription for our proprietary elixirs like Ectoplasm Plus.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="glass-panel p-3 d-flex align-items-start gap-3">
                <div className="p-2.5 rounded-3 bg-warning bg-opacity-20 text-warning">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h5 className="fs-6 fw-bold text-light mb-1 font-heading">
                    Classified Case Security
                  </h5>
                  <p className="text-muted small mb-0">
                    Certain mysterious cases (such as Patient #013) remain securely protected under strict doctor-patient supernatural privilege.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
