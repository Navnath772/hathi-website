import React from 'react';
import { Cpu, Eye, Mic, Brain, Key, Database, CheckCircle2 } from 'lucide-react';

interface AIStatusPanelProps {
  onOpenJudge: () => void;
}

export const AIStatusPanel: React.FC<AIStatusPanelProps> = ({ onOpenJudge }) => {
  return (
    <section className="container py-3">
      <div
        className="glass-panel p-3 p-md-4"
        style={{
          background: 'linear-gradient(135deg, rgba(17, 17, 38, 0.85) 0%, rgba(7, 9, 20, 0.95) 100%)',
          border: '1px solid rgba(185, 247, 255, 0.25)',
        }}
      >
        <div className="row align-items-center gy-3">
          {/* Title Header */}
          <div className="col-lg-3 d-flex align-items-center gap-3">
            <div
              className="p-2.5 rounded-3 d-flex align-items-center justify-content-center"
              style={{
                background: 'rgba(185, 247, 255, 0.1)',
                border: '1px solid rgba(185, 247, 255, 0.3)',
              }}
            >
              <Cpu className="text-ghost" size={24} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="font-heading fw-bold text-light" style={{ letterSpacing: '0.05em' }}>
                  HATHI AI CORE
                </span>
                <span
                  className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 d-inline-flex align-items-center gap-1 px-2 py-0.5"
                  style={{ fontSize: '10px' }}
                >
                  <span className="pulse-circle rounded-circle bg-success" style={{ width: '6px', height: '6px' }} />
                  ONLINE
                </span>
              </div>
              <div className="font-mono text-muted small" style={{ fontSize: '11px' }}>
                Gemini 3.8 Intelligence Engine
              </div>
            </div>
          </div>

          {/* Engine Status Grid */}
          <div className="col-lg-7">
            <div className="row g-2 text-center text-md-start font-mono" style={{ fontSize: '12px' }}>
              {/* Gemini Intelligence */}
              <div className="col-6 col-md-3">
                <div className="glass-panel-sm p-2 d-flex align-items-center gap-2">
                  <Brain size={16} className="text-ghost" />
                  <div>
                    <div className="text-muted" style={{ fontSize: '9px' }}>MODEL</div>
                    <div className="text-light fw-semibold" style={{ fontSize: '11px' }}>Gemini 3.8</div>
                  </div>
                </div>
              </div>

              {/* Spirit Analysis Engine */}
              <div className="col-6 col-md-3">
                <div className="glass-panel-sm p-2 d-flex align-items-center gap-2">
                  <Database size={16} className="text-info" />
                  <div>
                    <div className="text-muted" style={{ fontSize: '9px' }}>DIAGNOSTICS</div>
                    <div className="text-info fw-semibold" style={{ fontSize: '11px' }}>Active Hybrid</div>
                  </div>
                </div>
              </div>

              {/* Vision Interface */}
              <div className="col-6 col-md-3">
                <div className="glass-panel-sm p-2 d-flex align-items-center gap-2">
                  <Eye size={16} className="text-medical" />
                  <div>
                    <div className="text-muted" style={{ fontSize: '9px' }}>VISION API</div>
                    <div className="text-light fw-semibold" style={{ fontSize: '11px' }}>Multimodal</div>
                  </div>
                </div>
              </div>

              {/* Voice / Secret Detection */}
              <div className="col-6 col-md-3">
                <div className="glass-panel-sm p-2 d-flex align-items-center gap-2">
                  <Mic size={16} className="text-warning" />
                  <div>
                    <div className="text-muted" style={{ fontSize: '9px' }}>VOICE & SECRETS</div>
                    <div className="text-warning fw-semibold" style={{ fontSize: '11px' }}>Stateful</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Judge Link */}
          <div className="col-lg-2 text-center text-lg-end">
            <button
              onClick={onOpenJudge}
              className="btn btn-outline-info btn-sm font-mono px-3 py-1.5"
              style={{ fontSize: '11px', borderRadius: '8px' }}
            >
              System Topology &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
