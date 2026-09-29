import React, { useState, useRef } from 'react';
import {
  Ghost,
  Zap,
  Eye,
  Activity,
  Mic,
  MicOff,
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
} from 'lucide-react';
import { audio } from '../services/audio';
import { api } from '../services/api';
import { VisionAnalysisResult } from '../types';

interface GhostCheckupProps {
  onStartScanner: (checkupData: {
    ghostName: string;
    symptoms: string[];
    freeText: string;
    evidenceData?: string;
    evidenceMime?: string;
    visionAnalysis?: VisionAnalysisResult;
  }) => void;
}

const SYMPTOM_OPTIONS = [
  { id: 'walls', label: "Can't pass through walls", icon: '👻', desc: 'Boundary resistance & solid impact' },
  { id: 'powers', label: 'Losing my ghost powers', icon: '⚡', desc: 'Fading levitation & cold breeze failure' },
  { id: 'mirrors', label: 'I keep appearing in mirrors', icon: '🪞', desc: 'Photonic leakage on glass surfaces' },
  { id: 'haunted', label: 'Another ghost is haunting me', icon: '😱', desc: 'Secondary poltergeist interference' },
  { id: 'midnight', label: 'Strange midnight symptoms', icon: '🌙', desc: 'Resonance anomalies around 03:13 AM' },
  { id: 'houses', label: "I can't enter haunted houses", icon: '🏚️', desc: 'Warding barrier repulsion lock' },
  { id: 'ectoplasm', label: 'My ectoplasm is unstable', icon: '✨', desc: 'Rapid vapor dissipation & thinning glow' },
  { id: 'unusual', label: 'Something feels unusual', icon: '❓', desc: 'Unclassifiable dimensional itch' },
];

export const GhostCheckup: React.FC<GhostCheckupProps> = ({ onStartScanner }) => {
  const [ghostName, setGhostName] = useState<string>('Anonymous Spirit');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(["Can't pass through walls"]);
  const [freeText, setFreeText] = useState<string>('');

  // Image Evidence State
  const [evidenceBase64, setEvidenceBase64] = useState<string | null>(null);
  const [evidenceMime, setEvidenceMime] = useState<string>('image/png');
  const [visionAnalysis, setVisionAnalysis] = useState<VisionAnalysisResult | null>(null);
  const [analyzingImage, setAnalyzingImage] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice Input State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceNote, setVoiceNote] = useState<string | null>(null);

  const toggleSymptom = (label: string) => {
    audio.playClick();
    setSelectedSymptoms((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    audio.playClick();
    const reader = new FileReader();
    reader.onload = async (event) => {
      const b64 = event.target?.result as string;
      setEvidenceBase64(b64);
      setEvidenceMime(file.type || 'image/png');

      // Trigger Gemini Vision
      setAnalyzingImage(true);
      try {
        const result = await api.analyzeEvidence({
          imageBase64: b64,
          mimeType: file.type || 'image/png',
          description: freeText || 'Ghost manifestation evidence',
        });
        setVisionAnalysis(result);
        audio.playChime();
      } catch (err) {
        console.warn('Vision analysis failed:', err);
      } finally {
        setAnalyzingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      audio.stopSpeechRecognition();
      setIsRecording(false);
      setVoiceNote(null);
    } else {
      audio.playClick();
      const started = audio.startSpeechRecognition(
        (transcript) => {
          setIsRecording(false);
          setVoiceNote(null);
          setFreeText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          audio.playChime();
        },
        (err) => {
          console.warn('Speech error:', err);
          setIsRecording(false);
          setVoiceNote("Microphone signal drifted... Please type your problem!");
          setTimeout(() => setVoiceNote(null), 3000);
        }
      );

      if (started) {
        setIsRecording(true);
        setVoiceNote("Listening to your spirit frequency... Speak now!");
      } else {
        setVoiceNote("Browser speech recognition unavailable. You can type below.");
        setTimeout(() => setVoiceNote(null), 3000);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0 && !freeText) {
      audio.playGlitch();
      return;
    }
    audio.playScanPing();
    onStartScanner({
      ghostName: ghostName || 'Anonymous Spirit',
      symptoms: selectedSymptoms,
      freeText,
      evidenceData: evidenceBase64 || undefined,
      evidenceMime,
      visionAnalysis: visionAnalysis || undefined,
    });
  };

  return (
    <section id="check-up" className="py-5 position-relative">
      <div className="container py-lg-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill glass-panel-sm mb-2">
            <Activity className="text-ghost" size={14} />
            <span className="font-mono text-ghost small text-uppercase fw-semibold" style={{ fontSize: '11px' }}>
              AFTERLIFE TRIAGE & CHECK-UP
            </span>
          </div>
          <h2 className="font-heading display-5 fw-bold text-light mb-2">
            WHAT&rsquo;S WRONG WITH YOUR SPIRIT?
          </h2>
          <p className="text-muted" style={{ maxWidth: '620px', margin: '0 auto' }}>
            Tell Dr. Hathi what is haunting you. Choose your symptoms, upload paranormal evidence, or speak to Boo AI.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Patient Ghost Name Input */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-6 col-lg-5">
              <div className="glass-panel p-3">
                <label className="font-mono text-ghost small mb-1 d-flex align-items-center gap-2">
                  <Ghost size={14} />
                  <span>PATIENT SPIRIT DESIGNATION:</span>
                </label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary font-mono"
                  placeholder="e.g. Phantom of the Opera, Casper #42"
                  value={ghostName}
                  onChange={(e) => setGhostName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Symptom Cards Grid */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="font-heading fs-5 text-light mb-0">
                1. Select Supernatural Symptoms (Multiple Allowed)
              </h5>
              <span className="font-mono text-muted small">
                {selectedSymptoms.length} SELECTED
              </span>
            </div>

            <div className="row g-3">
              {SYMPTOM_OPTIONS.map((sym) => {
                const isSelected = selectedSymptoms.includes(sym.label);
                return (
                  <div key={sym.id} className="col-sm-6 col-lg-3">
                    <div
                      onClick={() => toggleSymptom(sym.label)}
                      className={`glass-panel p-3 h-100 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-info shadow-lg'
                          : 'opacity-85'
                      }`}
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, rgba(185, 247, 255, 0.14) 0%, rgba(17, 17, 38, 0.85) 100%)'
                          : 'var(--glass-bg)',
                        cursor: 'pointer',
                        transform: isSelected ? 'translateY(-2px)' : 'none',
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="fs-3">{sym.icon}</span>
                        <div
                          className={`rounded-circle d-flex align-items-center justify-content-center ${
                            isSelected ? 'bg-info text-dark' : 'border border-secondary'
                          }`}
                          style={{ width: '22px', height: '22px' }}
                        >
                          {isSelected && <Check size={14} />}
                        </div>
                      </div>
                      <h6 className="font-heading fw-bold text-light mb-1 fs-6">
                        {sym.label}
                      </h6>
                      <p className="font-mono text-muted small mb-0" style={{ fontSize: '11px' }}>
                        {sym.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Free Text & Voice Area */}
          <div className="row g-4 mb-4">
            {/* Free Text Description */}
            <div className="col-lg-7">
              <div className="glass-panel p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="font-heading fs-6 text-light mb-0">
                    2. Describe Your Supernatural Problem in Detail
                  </label>
                  {/* Voice Button */}
                  <button
                    type="button"
                    onClick={handleVoiceToggle}
                    className={`btn btn-sm d-flex align-items-center gap-1.5 px-3 py-1.5 rounded-pill ${
                      isRecording ? 'btn-danger animate-pulse' : 'btn-outline-info text-ghost'
                    }`}
                  >
                    {isRecording ? <MicOff size={14} /> : <Mic size={14} />}
                    <span className="font-mono" style={{ fontSize: '12px' }}>
                      {isRecording ? 'Listening...' : 'Speak to Boo'}
                    </span>
                  </button>
                </div>

                {voiceNote && (
                  <div className="alert alert-info py-1 px-3 small font-mono mb-2" style={{ fontSize: '11px' }}>
                    {voiceNote}
                  </div>
                )}

                <textarea
                  className="form-control bg-dark text-light border-secondary font-mono"
                  rows={4}
                  placeholder="Tell Dr. Hathi what happens when you try to phase through walls, haunt an attic, or appear in mirrors..."
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                />
                <div className="d-flex justify-content-between mt-2 font-mono text-muted small" style={{ fontSize: '11px' }}>
                  <span>Gemini AI synthesizes natural language nuance with Dr. Hathi&rsquo;s clinical knowledge.</span>
                  <span>{freeText.length} chars</span>
                </div>
              </div>
            </div>

            {/* Paranormal Evidence Upload (Multimodal Gemini Vision) */}
            <div className="col-lg-5">
              <div className="glass-panel p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="font-heading fs-6 text-light mb-0">
                    3. Upload Paranormal Evidence
                  </label>
                  <span className="badge bg-secondary font-mono" style={{ fontSize: '10px' }}>
                    GEMINI VISION
                  </span>
                </div>

                <p className="text-muted small mb-3">
                  Upload a photo of your shadow, mirror glitch, or strange aura for spectral density scanning.
                </p>

                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  className="d-none"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />

                {!evidenceBase64 ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border border-secondary border-dashed rounded-3 p-4 text-center cursor-pointer hover-glow"
                    style={{ background: 'rgba(255, 255, 255, 0.02)', cursor: 'pointer' }}
                  >
                    <Upload className="text-ghost mb-2 mx-auto" size={32} />
                    <div className="font-mono text-light small fw-bold">DRAG & DROP OR BROWSE</div>
                    <div className="text-muted small" style={{ fontSize: '11px' }}>
                      Supports JPG, PNG, WEBP ghost images
                    </div>
                  </div>
                ) : (
                  <div className="position-relative">
                    <img
                      src={evidenceBase64}
                      alt="Paranormal Evidence"
                      className="img-fluid rounded-3 border border-info mb-2"
                      style={{ maxHeight: '140px', width: '100%', objectFit: 'cover' }}
                    />
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="btn btn-sm btn-outline-secondary font-mono flex-grow-1"
                        style={{ fontSize: '11px' }}
                      >
                        Change Image
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEvidenceBase64(null);
                          setVisionAnalysis(null);
                        }}
                        className="btn btn-sm btn-outline-danger font-mono"
                        style={{ fontSize: '11px' }}
                      >
                        Remove
                      </button>
                    </div>

                    {/* Vision Analysis Pill */}
                    {analyzingImage && (
                      <div className="font-mono text-ghost small mt-2 d-flex align-items-center gap-2">
                        <Activity className="animate-spin" size={14} />
                        <span>Analyzing with Gemini Vision...</span>
                      </div>
                    )}
                    {visionAnalysis && (
                      <div
                        className="glass-panel-sm p-2.5 mt-2 font-mono text-light"
                        style={{ fontSize: '11px', border: '1px solid rgba(6, 182, 212, 0.3)' }}
                      >
                        <div className="d-flex justify-content-between text-ghost fw-bold mb-1">
                          <span>SPIRIT DENSITY: {visionAnalysis.spectralDensity}%</span>
                          <span className="text-warning">ANOMALY: {visionAnalysis.anomalyLevel}</span>
                        </div>
                        <div className="text-muted">{visionAnalysis.interpretation}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="text-center pt-2">
            <button
              type="submit"
              className="btn glow-btn-primary px-5 py-3 fs-5 fw-bold font-heading d-inline-flex align-items-center gap-3"
            >
              <Activity size={22} className="text-white" />
              <span>SCAN MY SPIRIT & GENERATE DIAGNOSIS</span>
              <ArrowRight size={22} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
