import React from 'react';
import { Ghost, Activity, Brain, Key, Award, Heart, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-5 position-relative">
      <div className="container py-lg-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill glass-panel-sm mb-2">
            <Sparkles className="text-ghost" size={14} />
            <span className="font-mono text-ghost small text-uppercase fw-semibold" style={{ fontSize: '11px' }}>
              ORIGIN & PILLARS
            </span>
          </div>
          <h2 className="font-heading display-5 fw-bold text-light mb-2">
            ABOUT HATHI AFTERDARK
          </h2>
          <p className="text-muted" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Where immortal cinematic charm meets frontier generative AI — supernatural healthcare reimagined for the afterlife.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="row g-4 mb-5">
          {/* Pillar 1: Dr. Hathi */}
          <div className="col-md-6 col-lg-4">
            <div className="glass-panel p-4 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 rounded-circle bg-danger bg-opacity-20 text-medical">
                  <Heart size={24} />
                </div>
                <h4 className="font-heading fs-5 fw-bold text-light mb-0">Dr. Hansraj Hathi</h4>
              </div>
              <p className="text-muted small mb-0">
                The beloved, genial healer whose compassionate spirit crossed dimensions. He listens with his magical stethoscope and reminds every spirit: &ldquo;Tell me where it hurts... Sahi baat hai, even ghosts deserve good health!&rdquo;
              </p>
            </div>
          </div>

          {/* Pillar 2: Ghost Patients */}
          <div className="col-md-6 col-lg-4">
            <div className="glass-panel p-4 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 rounded-circle bg-info bg-opacity-20 text-ghost">
                  <Ghost size={24} />
                </div>
                <h4 className="font-heading fs-5 fw-bold text-light mb-0">The Ghost Patients</h4>
              </div>
              <p className="text-muted small mb-0">
                Centuries-old apparitions suffering from humorous yet relatable fictional conditions: wall-phasing friction, vanishing glow, bathroom mirror glitches, and poltergeist burnout.
              </p>
            </div>
          </div>

          {/* Pillar 3: Gemini 3.8 AI */}
          <div className="col-md-6 col-lg-4">
            <div className="glass-panel p-4 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 rounded-circle bg-purple bg-opacity-20 text-purple-accent">
                  <Brain size={24} />
                </div>
                <h4 className="font-heading fs-5 fw-bold text-light mb-0">Gemini Intelligence</h4>
              </div>
              <p className="text-muted small mb-0">
                Powered by Google Gemini 3.8 via the official @google/genai SDK on Node.js/Express. Provides structured clinical spirit diagnoses, multimodal vision analysis of paranormal photos, and streaming dialogue.
              </p>
            </div>
          </div>

          {/* Pillar 4: Spirit Scanner */}
          <div className="col-md-6 col-lg-4">
            <div className="glass-panel p-4 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 rounded-circle bg-success bg-opacity-20 text-success">
                  <Activity size={24} />
                </div>
                <h4 className="font-heading fs-5 fw-bold text-light mb-0">Spirit Scanner</h4>
              </div>
              <p className="text-muted small mb-0">
                A cinematic 7-stage diagnostic workflow that assesses ectoplasmic density, soul frequencies, and phase stability, converting complex signals into an intuitive Afterlife Prescription.
              </p>
            </div>
          </div>

          {/* Pillar 5: Boo AI */}
          <div className="col-md-6 col-lg-4">
            <div className="glass-panel p-4 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 rounded-circle bg-warning bg-opacity-20 text-warning">
                  <Sparkles size={24} />
                </div>
                <h4 className="font-heading fs-5 fw-bold text-light mb-0">Boo AI Companion</h4>
              </div>
              <p className="text-muted small mb-0">
                The clinic&rsquo;s witty floating ghost triage nurse. Boo features voice input, text-to-speech feedback, session memory, and stateful secret conversation triggers.
              </p>
            </div>
          </div>

          {/* Pillar 6: The Wild Card Mystery */}
          <div className="col-md-6 col-lg-4">
            <div className="glass-panel p-4 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="p-3 rounded-circle bg-danger bg-opacity-20 text-danger">
                  <Key size={24} />
                </div>
                <h4 className="font-heading fs-5 fw-bold text-light mb-0">Patient #013 & Secrets</h4>
              </div>
              <p className="text-muted small mb-0">
                The hackathon Wild Card feature (&ldquo;Hide Something Special&rdquo;). Unlocks through interactive stethoscope auscultation, 03:13 AM queries, mouse follower contact, and deep Afterlife Archives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
