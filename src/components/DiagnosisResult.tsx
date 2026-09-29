import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  FileText,
  MessageSquare,
  BookmarkCheck,
  Share2,
  Info,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react';
import { DiagnosisOutput } from '../types';
import { audio } from '../services/audio';

interface DiagnosisResultProps {
  diagnosis: DiagnosisOutput;
  onViewPrescription: () => void;
  onAskBoo: (diagnosisName: string) => void;
  onSaveRecord: () => void;
  recordSaved: boolean;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  diagnosis,
  onViewPrescription,
  onAskBoo,
  onSaveRecord,
  recordSaved,
}) => {
  const [showExplainability, setShowExplainability] = useState<boolean>(true);

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-danger text-light';
      case 'HIGH':
        return 'bg-warning text-dark';
      case 'MODERATE':
        return 'bg-info text-dark';
      default:
        return 'bg-success text-light';
    }
  };

  return (
    <section id="diagnosis-result" className="py-5 position-relative">
      <div className="container py-lg-4">
        {/* Result Container Card */}
        <div
          className="glass-panel p-4 p-md-5"
          style={{
            border: '2px solid rgba(185, 247, 255, 0.35)',
            boxShadow: '0 0 50px rgba(185, 247, 255, 0.15)',
          }}
        >
          {/* Top Banner Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 pb-3 border-bottom border-secondary mb-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="p-3 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  background: 'rgba(255, 77, 103, 0.2)',
                  border: '1px solid var(--medical-accent)',
                }}
              >
                <CheckCircle2 size={32} className="text-medical" />
              </div>
              <div>
                <div className="font-mono text-ghost small fw-bold">
                  DIAGNOSIS FOUND &bull; CASE {diagnosis.id}
                </div>
                <h3 className="font-heading display-6 fw-bold text-light mb-0">
                  {diagnosis.diagnosis}
                </h3>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className={`badge px-3 py-2 font-mono ${getSeverityBadge(diagnosis.severity)}`}>
                SEVERITY: {diagnosis.severity}
              </span>
              <span className="badge bg-dark border border-secondary text-ghost px-3 py-2 font-mono">
                {diagnosis.ghostName}
              </span>
            </div>
          </div>

          {/* Vitals Progress Grid */}
          <div className="row g-3 mb-4">
            {/* Metric 1: Spirit Energy */}
            <div className="col-md-4">
              <div className="glass-panel-sm p-3">
                <div className="d-flex justify-content-between font-mono small text-muted mb-1">
                  <span>SPIRIT ENERGY</span>
                  <span className="text-light fw-bold">{diagnosis.spiritEnergy}%</span>
                </div>
                <div className="progress bg-dark" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-info"
                    style={{ width: `${diagnosis.spiritEnergy}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Metric 2: Ectoplasm Stability */}
            <div className="col-md-4">
              <div className="glass-panel-sm p-3">
                <div className="d-flex justify-content-between font-mono small text-muted mb-1">
                  <span>ECTOPLASM STABILITY</span>
                  <span className="text-ghost fw-bold">{diagnosis.ectoplasmStability}%</span>
                </div>
                <div className="progress bg-dark" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: `${diagnosis.ectoplasmStability}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Metric 3: Phase Stability */}
            <div className="col-md-4">
              <div className="glass-panel-sm p-3">
                <div className="d-flex justify-content-between font-mono small text-muted mb-1">
                  <span>PHASE STABILITY</span>
                  <span className="text-medical fw-bold">{diagnosis.phaseStability}%</span>
                </div>
                <div className="progress bg-dark" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-danger"
                    style={{ width: `${diagnosis.phaseStability}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dr. Hathi Clinical Assessment */}
          <div className="row g-4 mb-4">
            <div className="col-lg-7">
              <div className="glass-panel-sm p-4 h-100">
                <h5 className="font-heading text-ghost fs-5 mb-2 d-flex align-items-center gap-2">
                  <Activity size={18} className="text-medical" />
                  <span>DR. HANSRAJ HATHI&rsquo;S CLINICAL ANALYSIS</span>
                </h5>
                <p className="text-light fs-6 mb-3" style={{ lineHeight: 1.7 }}>
                  {diagnosis.analysis}
                </p>

                <div className="pt-2 border-top border-secondary font-mono small text-muted">
                  <strong>Follow-Up:</strong> {diagnosis.followUp}
                </div>
              </div>
            </div>

            {/* Fictional Treatment Recommendation */}
            <div className="col-lg-5">
              <div
                className="glass-panel-sm p-4 h-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 77, 103, 0.1) 0%, rgba(17, 17, 38, 0.8) 100%)',
                  border: '1px solid rgba(255, 77, 103, 0.3)',
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="font-mono text-medical small fw-bold">RECOMMENDED MEDICATION</span>
                  <span className="badge bg-danger text-uppercase">FICTIONAL</span>
                </div>

                <h4 className="font-heading text-light fs-4 fw-bold mb-2">
                  {diagnosis.fictionalMedication}
                </h4>

                <p className="text-muted small mb-3">
                  {diagnosis.fictionalTreatment}
                </p>

                <button
                  onClick={() => {
                    audio.playClick();
                    onViewPrescription();
                  }}
                  className="btn glow-btn-primary w-100 py-2.5 font-mono small d-flex align-items-center justify-content-center gap-2"
                >
                  <FileText size={16} />
                  <span>VIEW / PRINT OFFICIAL PRESCRIPTION</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Explainability Accordion / Box */}
          <div className="glass-panel-sm p-3 mb-4">
            <div
              className="d-flex justify-content-between align-items-center cursor-pointer"
              onClick={() => setShowExplainability(!showExplainability)}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-2">
                <Info size={16} className="text-info" />
                <span className="font-heading fs-6 text-light">
                  AI EXPLAINABILITY: WHY THIS RESULT?
                </span>
              </div>
              <span className="font-mono text-muted small">
                {showExplainability ? 'HIDE METRICS' : 'SHOW METRICS'}
              </span>
            </div>

            {showExplainability && (
              <div className="mt-3 pt-3 border-top border-secondary font-mono">
                <div className="row g-2 small">
                  <div className="col-sm-6 col-lg-3">
                    <div className="d-flex justify-content-between text-muted mb-1">
                      <span>Symptom Match</span>
                      <span className="text-light">{diagnosis.explainability.symptomMatch}%</span>
                    </div>
                    <div className="progress bg-dark" style={{ height: '6px' }}>
                      <div className="progress-bar bg-info" style={{ width: `${diagnosis.explainability.symptomMatch}%` }} />
                    </div>
                  </div>

                  <div className="col-sm-6 col-lg-3">
                    <div className="d-flex justify-content-between text-muted mb-1">
                      <span>Spirit Pattern</span>
                      <span className="text-light">{diagnosis.explainability.spiritPattern}%</span>
                    </div>
                    <div className="progress bg-dark" style={{ height: '6px' }}>
                      <div className="progress-bar bg-primary" style={{ width: `${diagnosis.explainability.spiritPattern}%` }} />
                    </div>
                  </div>

                  <div className="col-sm-6 col-lg-3">
                    <div className="d-flex justify-content-between text-muted mb-1">
                      <span>Visual Evidence</span>
                      <span className="text-light">{diagnosis.explainability.visualEvidence}%</span>
                    </div>
                    <div className="progress bg-dark" style={{ height: '6px' }}>
                      <div className="progress-bar bg-warning" style={{ width: `${diagnosis.explainability.visualEvidence}%` }} />
                    </div>
                  </div>

                  <div className="col-sm-6 col-lg-3">
                    <div className="d-flex justify-content-between text-muted mb-1">
                      <span>Historical Pattern</span>
                      <span className="text-light">{diagnosis.explainability.historicalPattern}%</span>
                    </div>
                    <div className="progress bg-dark" style={{ height: '6px' }}>
                      <div className="progress-bar bg-success" style={{ width: `${diagnosis.explainability.historicalPattern}%` }} />
                    </div>
                  </div>
                </div>

                <div className="text-muted small mt-2" style={{ fontSize: '10px' }}>
                  * These signals are generated by Dr. Hathi&rsquo;s hybrid AI diagnosis engine for the hackathon simulation.
                </div>
              </div>
            )}
          </div>

          {/* Action Button Row */}
          <div className="d-flex flex-wrap gap-3 justify-content-end">
            <button
              onClick={() => {
                audio.playClick();
                onAskBoo(diagnosis.diagnosis);
              }}
              className="btn btn-outline-info font-mono d-flex align-items-center gap-2 px-3 py-2"
            >
              <MessageSquare size={16} />
              <span>DISCUSS WITH BOO AI</span>
            </button>

            <button
              onClick={() => {
                audio.playClick();
                onSaveRecord();
              }}
              disabled={recordSaved}
              className={`btn font-mono d-flex align-items-center gap-2 px-3 py-2 ${
                recordSaved ? 'btn-success' : 'btn-outline-light'
              }`}
            >
              <BookmarkCheck size={16} />
              <span>{recordSaved ? 'SAVED TO PATIENT ARCHIVE' : 'SAVE PATIENT RECORD'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
