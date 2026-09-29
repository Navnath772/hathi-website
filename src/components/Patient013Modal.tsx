import React from 'react';
import {
  X,
  ShieldAlert,
  AlertOctagon,
  Clock,
  Activity,
  Lock,
  Unlock,
  Sparkles,
} from 'lucide-react';
import { PatientRecord } from '../types';
import { audio } from '../services/audio';

interface Patient013ModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientRecord;
  isUnlocked: boolean;
  onAttemptUnlock: () => void;
}

export const Patient013Modal: React.FC<Patient013ModalProps> = ({
  isOpen,
  onClose,
  patient,
  isUnlocked,
  onAttemptUnlock,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{
        zIndex: 2300,
        backgroundColor: 'rgba(3, 4, 8, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        className={`glass-panel p-4 p-md-5 position-relative ${
          isUnlocked ? 'border-danger' : 'border-secondary'
        }`}
        style={{
          maxWidth: '640px',
          width: '100%',
          boxShadow: isUnlocked
            ? '0 0 60px rgba(255, 77, 103, 0.35)'
            : '0 0 30px rgba(0, 0, 0, 0.8)',
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

        {isUnlocked ? (
          /* UNLOCKED CLASSIFIED MEDICAL RECORD */
          <div className="animate-fade-in">
            {/* Header Badge */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="badge bg-danger text-uppercase px-2.5 py-1 font-mono">
                TOP SECRET &bull; LEVEL 4 CLASSIFIED
              </span>
              <span className="font-mono text-muted small">FILE #013</span>
            </div>

            <h3 className="font-heading fs-3 fw-bold text-light mb-1 glitch-text">
              PATIENT #013 — THE 03:13 AM SPIRIT
            </h3>
            <p className="font-mono text-ghost small mb-4">
              RECORD STATUS: &ldquo;THIS RECORD SHOULD NOT EXIST.&rdquo;
            </p>

            {/* Dossier Grid */}
            <div className="glass-panel-sm p-3 mb-4 font-mono small border border-danger border-opacity-30">
              <div className="row g-2">
                <div className="col-sm-6">
                  <span className="text-muted">CHIEF PHYSICIAN:</span>{' '}
                  <span className="text-light fw-bold">Dr. Hansraj Hathi (Solo)</span>
                </div>
                <div className="col-sm-6">
                  <span className="text-muted">TIMESTAMP:</span>{' '}
                  <span className="text-medical fw-bold">03:13 AM (The Rift)</span>
                </div>
                <div className="col-sm-6">
                  <span className="text-muted">CONDITION:</span>{' '}
                  <span className="text-light">UNKNOWN SUPERNATURAL ANOMALY</span>
                </div>
                <div className="col-sm-6">
                  <span className="text-muted">STATUS:</span>{' '}
                  <span className="badge bg-warning text-dark">UNKNOWN</span>
                </div>
              </div>
            </div>

            {/* Dr. Hathi's Handwritten Incident Log */}
            <div
              className="p-3 rounded-3 mb-4 font-mono small"
              style={{
                background: 'rgba(255, 77, 103, 0.08)',
                borderLeft: '4px solid var(--medical-accent)',
                lineHeight: 1.7,
              }}
            >
              <div className="text-medical fw-bold mb-1">
                DR. HATHI&rsquo;S EMERGENCY ENCRYPTED NOTES:
              </div>
              <p className="text-light mb-2">
                &ldquo;Patient arrived during an unexplainable dimensional tremor at precisely 03:13 AM.
                Standard stethoscopes registered a biological heartbeat, yet ethereal infrared proved
                the patient had crossed over centuries ago. When asked to identify itself, the entity whispered:
                &lsquo;I am the clinic&rsquo;s memory... some patients never leave.&rsquo;&rdquo;
              </p>
              <p className="text-muted mb-0 font-italic">
                &ldquo;Treatment Protocol: Do not administer mortal or standard ghost medicine.
                Preserve this file in the deep Afterlife Archive.&rdquo;
              </p>
            </div>

            {/* Progress Metrics */}
            <div className="row g-2 mb-4 font-mono small text-center">
              <div className="col-4">
                <div className="glass-panel-sm p-2">
                  <div className="text-muted" style={{ fontSize: '10px' }}>SPIRIT ENERGY</div>
                  <div className="text-danger fw-bold fs-6">99% OVERLOAD</div>
                </div>
              </div>
              <div className="col-4">
                <div className="glass-panel-sm p-2">
                  <div className="text-muted" style={{ fontSize: '10px' }}>ECTO-STABILITY</div>
                  <div className="text-warning fw-bold fs-6">13% CRITICAL</div>
                </div>
              </div>
              <div className="col-4">
                <div className="glass-panel-sm p-2">
                  <div className="text-muted" style={{ fontSize: '10px' }}>PHASE LOCK</div>
                  <div className="text-ghost fw-bold fs-6">3% ZERO-POINT</div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-2 border-top border-secondary">
              <span className="font-mono text-muted small">
                CLASSIFIED CLEARANCE GRANTED
              </span>
              <button
                onClick={onClose}
                className="btn btn-outline-info font-mono small px-4 py-2"
              >
                CLOSE FILE
              </button>
            </div>
          </div>
        ) : (
          /* LOCKED ACCESS DENIED SCREEN */
          <div className="text-center py-4">
            <div
              className="p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                background: 'rgba(255, 77, 103, 0.15)',
                border: '1px solid var(--medical-accent)',
              }}
            >
              <Lock size={40} className="text-medical" />
            </div>

            <h3 className="font-heading fs-4 fw-bold text-light mb-1">
              PATIENT #013 — ACCESS DENIED
            </h3>
            <p className="font-mono text-medical small mb-4">
              LEVEL 4 AFTERLIFE CLEARANCE REQUIRED
            </p>

            <div
              className="glass-panel-sm p-3 mb-4 font-mono small text-start mx-auto"
              style={{ maxWidth: '440px', lineHeight: 1.6 }}
            >
              <div className="text-muted mb-2">SECURITY RESTRICTION LOG:</div>
              <p className="text-light mb-1">
                &bull; Case file encrypted by Dr. Hansraj Hathi.
              </p>
              <p className="text-light mb-1">
                &bull; Connected to the mysterious paranormal occurrence at 03:13 AM.
              </p>
              <p className="text-muted mb-0">
                &bull; Ask Boo AI in the clinic chat about Patient 013 and the 03:13 AM incident to unlock clearance.
              </p>
            </div>

            <div className="d-flex justify-content-center gap-3">
              <button
                onClick={onAttemptUnlock}
                className="btn btn-outline-danger font-mono small px-4 py-2"
              >
                REQUEST OVERRIDE
              </button>
              <button
                onClick={onClose}
                className="btn btn-secondary font-mono small px-4 py-2"
              >
                RETURN TO RECORDS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
