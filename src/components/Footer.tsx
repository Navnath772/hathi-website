import React from 'react';
import { Ghost, ShieldAlert, Heart, Sparkles, Activity } from 'lucide-react';
import { audio } from '../services/audio';

interface FooterProps {
  onOpenJudge: () => void;
  onOpenArchive: () => void;
  archiveUnlocked: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenJudge,
  onOpenArchive,
  archiveUnlocked,
}) => {
  const scrollTo = (id: string) => {
    audio.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-top border-secondary py-5 position-relative" style={{ background: '#04050a' }}>
      <div className="container">
        <div className="row gy-4 mb-5">
          {/* Brand Info */}
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div
                className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{
                  background: 'rgba(255, 77, 103, 0.2)',
                  border: '1px solid var(--ghost-glow)',
                }}
              >
                <Ghost size={24} className="text-ghost" />
              </div>
              <span className="font-heading fw-bold fs-4 text-light tracking-wider">
                HATHI <span className="text-ghost">AFTERDARK</span>
              </span>
            </div>
            <p className="font-mono text-muted small pe-lg-3" style={{ lineHeight: 1.7 }}>
              &ldquo;Even ghosts need a doctor.&rdquo; 24/7 supernatural healthcare clinic for ghost patients, powered by Dr. Hansraj Hathi and multimodal Gemini AI.
            </p>
            <div className="d-flex gap-2 font-mono small">
              <span className="badge bg-dark border border-secondary text-ghost">
                24/7 GHOST CARE
              </span>
              <span className="badge bg-dark border border-secondary text-medical">
                SPIRIT DIAGNOSTICS
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-lg-2">
            <h6 className="font-heading text-light fw-bold mb-3">CLINIC WARDS</h6>
            <ul className="list-unstyled font-mono small d-flex flex-column gap-2 text-muted">
              <li>
                <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="text-decoration-none text-muted hover-light">
                  Home Gate
                </a>
              </li>
              <li>
                <a href="#dr-hathi" onClick={(e) => { e.preventDefault(); scrollTo('dr-hathi'); }} className="text-decoration-none text-muted hover-light">
                  Dr. Hathi
                </a>
              </li>
              <li>
                <a href="#check-up" onClick={(e) => { e.preventDefault(); scrollTo('check-up'); }} className="text-decoration-none text-muted hover-light">
                  Spirit Check-Up
                </a>
              </li>
              <li>
                <a href="#pharmacy" onClick={(e) => { e.preventDefault(); scrollTo('pharmacy'); }} className="text-decoration-none text-muted hover-light">
                  Ghost Pharmacy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="font-heading text-light fw-bold mb-3">AFTERLIFE DB</h6>
            <ul className="list-unstyled font-mono small d-flex flex-column gap-2 text-muted">
              <li>
                <a href="#patients" onClick={(e) => { e.preventDefault(); scrollTo('patients'); }} className="text-decoration-none text-muted hover-light">
                  Patient Records
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className="text-decoration-none text-muted hover-light">
                  Origin Story
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenJudge}
                  className="btn btn-link p-0 text-start text-decoration-none text-muted font-mono small"
                >
                  AI Core & Topology
                </button>
              </li>
              {archiveUnlocked && (
                <li>
                  <button
                    onClick={onOpenArchive}
                    className="btn btn-link p-0 text-start text-decoration-none text-danger font-mono small fw-bold"
                  >
                    ★ Afterlife Archive
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Medical Notice Box */}
          <div className="col-lg-4">
            <div className="glass-panel-sm p-3 border border-secondary border-opacity-50 font-mono small">
              <div className="d-flex align-items-center gap-2 text-medical fw-bold mb-2">
                <ShieldAlert size={16} />
                <span>SAFETY DISCLAIMER</span>
              </div>
              <p className="text-muted small mb-0" style={{ fontSize: '11px', lineHeight: 1.6 }}>
                Hathi Afterdark is an entertainment application created for the Google AI Studio hackathon. All conditions, treatments, diagnoses, and medicines are 100% fictional. Dr. Hansraj Hathi is a fictional character. Not real medical advice.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 border-top border-secondary font-mono small text-muted">
          <div>
            &copy; 2026 Hathi Afterdark &bull; Supernatural Healthcare for the Afterlife
          </div>
          <div className="d-flex align-items-center gap-3 mt-2 mt-sm-0">
            <span className="text-ghost">Built with Gemini 3.8 &bull; Express &bull; Bootstrap 5</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
