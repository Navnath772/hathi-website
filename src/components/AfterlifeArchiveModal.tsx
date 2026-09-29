import React, { useEffect } from 'react';
import {
  X,
  Sparkles,
  Archive,
  Activity,
  ShieldAlert,
  Ghost,
  Lock,
  Key,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../services/audio';

interface AfterlifeArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  secretsCount: number;
  totalSecrets: number;
}

export const AfterlifeArchiveModal: React.FC<AfterlifeArchiveModalProps> = ({
  isOpen,
  onClose,
  secretsCount,
  totalSecrets,
}) => {
  useEffect(() => {
    if (isOpen) {
      audio.playChime();
      audio.playGlitch();
      // Victory confetti for secret hunters
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B9F7FF', '#FF4D67', '#06B6D4', '#8B5CF6'],
        });
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{
        zIndex: 2400,
        backgroundColor: 'rgba(3, 4, 8, 0.96)',
        backdropFilter: 'blur(24px)',
      }}
    >
      <div
        className="glass-panel p-4 p-md-5 position-relative text-center"
        style={{
          maxWidth: '720px',
          width: '100%',
          border: '2px solid rgba(255, 77, 103, 0.6)',
          boxShadow: '0 0 80px rgba(255, 77, 103, 0.35)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-outline-light rounded-circle p-2 position-absolute top-0 end-0 m-3"
          style={{ width: '38px', height: '38px' }}
        >
          <X size={18} />
        </button>

        {/* Top Secret Badge */}
        <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-danger bg-opacity-25 border border-danger mb-3">
          <Sparkles size={16} className="text-medical" />
          <span className="font-mono text-light fw-bold small">
            ACCESS GRANTED &bull; AFTERLIFE ARCHIVE
          </span>
        </div>

        <h2 className="font-heading display-5 fw-bold text-light mb-1 glitch-text">
          YOU FOUND WHAT WAS HIDDEN.
        </h2>
        <p className="font-mono text-ghost small mb-4">
          CASE FILE: HATHI AFTERDARK &bull; SYSTEM STATUS: UNEXPLAINED
        </p>

        {/* Holographic Entry Dossier */}
        <div
          className="glass-panel-sm p-4 text-start font-mono small mb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(17, 17, 38, 0.95) 0%, rgba(7, 9, 20, 0.98) 100%)',
            border: '1px solid rgba(185, 247, 255, 0.3)',
            lineHeight: 1.8,
          }}
        >
          <div className="d-flex justify-content-between text-medical fw-bold border-bottom border-secondary pb-2 mb-3">
            <span>ARCHIVE ENTRY #013 — THE PERPETUAL HEALING OF SOULS</span>
            <span>CHRONO: 03:13 AM</span>
          </div>

          <p className="text-light mb-2">
            &ldquo;When Dr. Hansraj Hathi founded the afterlife clinic, he placed a vow upon the threshold:
            no soul, no matter how distant or adrift, would be turned away.&rdquo;
          </p>

          <p className="text-light mb-2">
            &ldquo;Patient #013 was not a phantom seeking departure. It was the collective spirit of every
            doctor and healer who ever comforted a fearful patient in the dark of night. That is why the
            stethoscope hears a heartbeat: compassion remains alive, even when the mortal body has passed.&rdquo;
          </p>

          <div className="pt-2 text-ghost fst-italic">
            &mdash; Excerpt from Dr. Hathi&rsquo;s Private Journal, Vault #13
          </div>
        </div>

        {/* Secrets Discovered Breakdown */}
        <div className="row g-2 mb-4 font-mono small text-start">
          <div className="col-sm-6">
            <div className="p-2.5 rounded-2 bg-dark border border-secondary text-success">
              &#10004; Secret #1: Patient #013 Classified Record
            </div>
          </div>
          <div className="col-sm-6">
            <div className="p-2.5 rounded-2 bg-dark border border-secondary text-success">
              &#10004; Secret #2: 03:13 AM Boo AI Dialogue Progression
            </div>
          </div>
          <div className="col-sm-6">
            <div className="p-2.5 rounded-2 bg-dark border border-secondary text-success">
              &#10004; Secret #3: Interactive Stethoscope Auscultation
            </div>
          </div>
          <div className="col-sm-6">
            <div className="p-2.5 rounded-2 bg-dark border border-secondary text-success">
              &#10004; Secret #4: Ghost Follower Cursor Contact
            </div>
          </div>
        </div>

        {/* Closing Action */}
        <button
          onClick={onClose}
          className="btn glow-btn-primary px-5 py-2.5 font-mono"
        >
          RETURN TO CLINIC MAIN HALL
        </button>
      </div>
    </div>
  );
};
