import React, { useState, useEffect } from 'react';
import {
  X,
  Cpu,
  Brain,
  Eye,
  Mic,
  Database,
  Key,
  Activity,
  Zap,
  RotateCcw,
  CheckCircle2,
  Server,
  Code2,
} from 'lucide-react';
import { AnalyticsRecord, SecretSessionState } from '../types';
import { api } from '../services/api';
import { audio } from '../services/audio';

interface JudgeDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  analytics: AnalyticsRecord;
  secretState: SecretSessionState;
  onRunDemo: () => void;
  onResetExperience: () => void;
}

export const JudgeDashboardModal: React.FC<JudgeDashboardModalProps> = ({
  isOpen,
  onClose,
  analytics,
  secretState,
  onRunDemo,
  onResetExperience,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'metrics' | 'demo'>('architecture');
  const [liveHealth, setLiveHealth] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/health')
        .then((r) => r.json())
        .then(setLiveHealth)
        .catch((e) => console.warn('Health check error:', e));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{
        zIndex: 2500,
        backgroundColor: 'rgba(3, 4, 8, 0.94)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        className="glass-panel p-4 p-md-5 position-relative overflow-auto"
        style={{
          maxWidth: '820px',
          width: '100%',
          maxHeight: '92vh',
          border: '2px solid rgba(6, 182, 212, 0.5)',
          boxShadow: '0 0 70px rgba(6, 182, 212, 0.25)',
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

        {/* Header */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            className="p-3 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              background: 'rgba(6, 182, 212, 0.15)',
              border: '1px solid var(--ghost-glow)',
            }}
          >
            <Cpu size={30} className="text-ghost" />
          </div>
          <div>
            <div className="d-flex align-items-center gap-2">
              <h3 className="font-heading fs-4 fw-bold text-light mb-0">
                HATHI AI CORE &bull; JUDGE DASHBOARD
              </h3>
              <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 font-mono small">
                ● LIVE VERIFIED
              </span>
            </div>
            <div className="font-mono text-muted small">
              Full-Stack Architecture &bull; Gemini 3.8 &bull; Hackathon System Inspection
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="d-flex gap-2 border-bottom border-secondary pb-2 mb-4 font-mono small">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`btn btn-sm ${
              activeTab === 'architecture' ? 'btn-info text-dark fw-bold' : 'btn-outline-secondary text-light'
            }`}
          >
            System Topology
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`btn btn-sm ${
              activeTab === 'metrics' ? 'btn-info text-dark fw-bold' : 'btn-outline-secondary text-light'
            }`}
          >
            Live Metrics ({analytics.checkupsCompleted} checkups)
          </button>
          <button
            onClick={() => setActiveTab('demo')}
            className={`btn btn-sm ${
              activeTab === 'demo' ? 'btn-info text-dark fw-bold' : 'btn-outline-secondary text-light'
            }`}
          >
            Demo Automation & Controls
          </button>
        </div>

        {/* Tab Content: Architecture */}
        {activeTab === 'architecture' && (
          <div className="animate-fade-in font-mono small">
            {/* System Service Cards */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="glass-panel-sm p-3 border border-info border-opacity-30">
                  <div className="d-flex align-items-center gap-2 text-ghost mb-1 fw-bold">
                    <Brain size={16} />
                    <span>Gemini 3.8 Flash</span>
                  </div>
                  <div className="text-muted" style={{ fontSize: '11px' }}>
                    Server-side official @google/genai SDK for ghost triage, diagnosis, and Boo AI.
                  </div>
                  <div className="text-success small mt-2">● Online / Low-Latency</div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="glass-panel-sm p-3 border border-danger border-opacity-30">
                  <div className="d-flex align-items-center gap-2 text-medical mb-1 fw-bold">
                    <Eye size={16} />
                    <span>Multimodal Vision</span>
                  </div>
                  <div className="text-muted" style={{ fontSize: '11px' }}>
                    Analyzes user-uploaded paranormal ghost photos for spectral distortion & shadow stability.
                  </div>
                  <div className="text-success small mt-2">● InlineData Supported</div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="glass-panel-sm p-3 border border-warning border-opacity-30">
                  <div className="d-flex align-items-center gap-2 text-warning mb-1 fw-bold">
                    <Key size={16} />
                    <span>State Secret Engine</span>
                  </div>
                  <div className="text-muted" style={{ fontSize: '11px' }}>
                    Session-tracked multi-step unlock for Patient #013, 03:13 AM mystery, and stethoscope.
                  </div>
                  <div className="text-success small mt-2">● Stateful Server Sync</div>
                </div>
              </div>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="glass-panel-sm p-3 mb-4">
              <div className="text-muted mb-2 fw-bold text-uppercase" style={{ fontSize: '10px' }}>
                DATA FLOW TOPOLOGY:
              </div>
              <div
                className="d-flex flex-wrap align-items-center justify-content-between p-2 rounded-2 bg-dark text-center"
                style={{ fontSize: '11px' }}
              >
                <div className="p-2 border border-secondary rounded">Client UI (React/Bootstrap 5)</div>
                <div className="text-ghost">&rarr;</div>
                <div className="p-2 border border-secondary rounded">Node/Express Server</div>
                <div className="text-ghost">&rarr;</div>
                <div className="p-2 border border-info rounded text-info">Gemini 3.8 / Hybrid Rules</div>
                <div className="text-ghost">&rarr;</div>
                <div className="p-2 border border-secondary rounded">Afterlife DB & Secrets</div>
                <div className="text-ghost">&rarr;</div>
                <div className="p-2 border border-danger rounded text-medical">Signed Ghost Rx</div>
              </div>
            </div>

            {/* Health Info Strip */}
            {liveHealth && (
              <div className="p-2 rounded bg-dark border border-secondary text-muted" style={{ fontSize: '10px' }}>
                <strong>Server Status:</strong> {liveHealth.status} &bull;{' '}
                <strong>Gemini Configured:</strong> {liveHealth.geminiConfigured ? 'Yes (Live Key)' : 'Fallback Simulation'}{' '}
                &bull; <strong>Server Uptime:</strong> {Math.floor(liveHealth.uptime)}s
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Metrics */}
        {activeTab === 'metrics' && (
          <div className="animate-fade-in font-mono">
            <div className="row g-3 mb-4">
              <div className="col-sm-6 col-md-4">
                <div className="glass-panel-sm p-3 text-center">
                  <div className="text-muted small" style={{ fontSize: '11px' }}>CHECK-UPS COMPLETED</div>
                  <div className="fs-3 fw-bold text-light">{analytics.checkupsCompleted}</div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="glass-panel-sm p-3 text-center">
                  <div className="text-muted small" style={{ fontSize: '11px' }}>AI CHAT MESSAGES</div>
                  <div className="fs-3 fw-bold text-info">{analytics.aiMessages}</div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="glass-panel-sm p-3 text-center">
                  <div className="text-muted small" style={{ fontSize: '11px' }}>EVIDENCE IMAGES SCANNED</div>
                  <div className="fs-3 fw-bold text-warning">{analytics.imagesAnalyzed}</div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="glass-panel-sm p-3 text-center">
                  <div className="text-muted small" style={{ fontSize: '11px' }}>VOICE INTERACTIONS</div>
                  <div className="fs-3 fw-bold text-ghost">{analytics.voiceInteractions}</div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="glass-panel-sm p-3 text-center">
                  <div className="text-muted small" style={{ fontSize: '11px' }}>PRESCRIPTIONS GENERATED</div>
                  <div className="fs-3 fw-bold text-success">{analytics.prescriptionsGenerated}</div>
                </div>
              </div>
              <div className="col-sm-6 col-md-4">
                <div className="glass-panel-sm p-3 text-center">
                  <div className="text-muted small" style={{ fontSize: '11px' }}>SECRETS UNCOVERED</div>
                  <div className="fs-3 fw-bold text-medical">{secretState.secretsFound.length} / 4</div>
                </div>
              </div>
            </div>

            {/* Secret progression breakdown */}
            <div className="glass-panel-sm p-3">
              <div className="text-muted small mb-2 fw-bold">ACTIVE SESSION SECRET FLAGS:</div>
              <div className="d-flex flex-wrap gap-2 small">
                <span className={`badge ${secretState.patient013Unlocked ? 'bg-success' : 'bg-secondary'}`}>
                  Patient #013: {secretState.patient013Unlocked ? 'UNLOCKED' : 'LOCKED'}
                </span>
                <span className={`badge ${secretState.stethoscopeUnlocked ? 'bg-success' : 'bg-secondary'}`}>
                  Stethoscope: {secretState.stethoscopeUnlocked ? 'UNLOCKED' : 'LOCKED'}
                </span>
                <span className={`badge ${secretState.ghostFollowerFound ? 'bg-success' : 'bg-secondary'}`}>
                  Ghost Follower: {secretState.ghostFollowerFound ? 'DISCOVERED' : 'HIDDEN'}
                </span>
                <span className={`badge ${secretState.midnightMode ? 'bg-danger' : 'bg-secondary'}`}>
                  Midnight Mode: {secretState.midnightMode ? 'ACTIVE (03:13 AM)' : 'STANDBY'}
                </span>
                <span className={`badge ${secretState.archiveUnlocked ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                  Archive: {secretState.archiveUnlocked ? 'ACCESSIBLE' : 'SEALED'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Demo Automation & Controls */}
        {activeTab === 'demo' && (
          <div className="animate-fade-in font-mono small">
            <div className="glass-panel-sm p-4 mb-4 border border-info border-opacity-40">
              <div className="d-flex align-items-center gap-2 text-ghost mb-2 fs-5 font-heading">
                <Zap size={20} className="text-warning" />
                <span>90-Second Hackathon Demo Automation</span>
              </div>
              <p className="text-light mb-3">
                Preloads demo patient <strong>BOO-013</strong> suffering from{' '}
                <em>&ldquo;Can&rsquo;t pass through walls&rdquo;</em>, executes the 7-step Spirit Scanner, produces
                Dr. Hathi&rsquo;s diagnosis, prepares the official prescription, opens Boo AI, and unlocks Patient #013.
              </p>

              <button
                onClick={() => {
                  onClose();
                  onRunDemo();
                }}
                className="btn glow-btn-primary px-4 py-2.5 font-mono d-flex align-items-center gap-2"
              >
                <Zap size={16} />
                <span>RUN 90-SECOND DEMO NOW</span>
              </button>
            </div>

            {/* Reset System */}
            <div className="glass-panel-sm p-4 border border-secondary">
              <div className="d-flex align-items-center gap-2 text-light mb-2 fs-6 font-heading">
                <RotateCcw size={18} className="text-muted" />
                <span>Reset Clinic Session</span>
              </div>
              <p className="text-muted small mb-3">
                Clears chat history, resets secret triggers, returns Patient #013 to encrypted state, and restores baseline clinic parameters.
              </p>

              <button
                onClick={() => {
                  audio.playClick();
                  onResetExperience();
                  onClose();
                }}
                className="btn btn-outline-danger font-mono small px-3 py-2"
              >
                RESET EXPERIENCE & SECRETS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
