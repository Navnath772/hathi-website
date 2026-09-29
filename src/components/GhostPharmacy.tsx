import React, { useState } from 'react';
import { Sparkles, Check, Plus, AlertCircle, Shield, Droplets, Moon, Zap } from 'lucide-react';
import { audio } from '../services/audio';

interface GhostPharmacyProps {
  onSelectMedication: (medName: string) => void;
}

const PHARMACY_ITEMS = [
  {
    name: 'ECTOPLASM PLUS',
    condition: 'Phantom Phase Disorder & Wall-Passing Resistance',
    effect: 'Aligns spirit molecular vibration frequency with solid physical boundaries.',
    usage: '5 drops diluted in lukewarm moonwater before twilight.',
    icon: Droplets,
    color: '#06B6D4',
    badge: 'TOP SELLER',
  },
  {
    name: 'SPIRITOL',
    condition: 'Ectoplasmic Energy Deficiency & Vanishing Glow',
    effect: 'Replenishes cold-luminescence and boosts levitation ceiling by up to 40 feet.',
    usage: '3 vapor drops taken twice nightly during lunar crest.',
    icon: Zap,
    color: '#8B5CF6',
    badge: 'RESTORATIVE',
  },
  {
    name: 'MIDNIGHT-X',
    condition: 'Temporal Ghost Distortion & 03:13 AM Echoes',
    effect: 'Synchronizes spirit chronological clock with the Greenwich Mean Witching Hour.',
    usage: '1 nocturnal vapor capsule taken precisely at midnight.',
    icon: Moon,
    color: '#FF4D67',
    badge: 'POTENT',
  },
  {
    name: 'SOULCALM',
    condition: 'Mirror Phase Syndrome & Silver-Glass Glitches',
    effect: 'Dampens photonic reflection leakage, preventing inadvertent bathroom mirror appearances.',
    usage: 'Apply spectral paste gently to spiritual perimeter.',
    icon: Sparkles,
    color: '#10B981',
    badge: 'CALMING',
  },
  {
    name: 'PHANTOM SHIELD',
    condition: 'Paranormal Disturbance Syndrome & Poltergeist Rivalry',
    effect: 'Forms an impenetrable 5-meter psychic repulsion barrier against intruder apparitions.',
    usage: 'Hang ethereal warding crystal over favorite haunting armchair.',
    icon: Shield,
    color: '#F59E0B',
    badge: 'DEFENSIVE',
  },
];

export const GhostPharmacy: React.FC<GhostPharmacyProps> = ({ onSelectMedication }) => {
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAdd = (name: string) => {
    audio.playClick();
    setAddedItem(name);
    onSelectMedication(name);
    setTimeout(() => setAddedItem(null), 2500);
  };

  return (
    <section id="pharmacy" className="py-5 position-relative">
      <div className="container py-lg-4">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill glass-panel-sm mb-2">
            <Sparkles className="text-ghost" size={14} />
            <span className="font-mono text-ghost small text-uppercase fw-semibold" style={{ fontSize: '11px' }}>
              AFTERLIFE APOTHECARY & DISPENSARY
            </span>
          </div>
          <h2 className="font-heading display-5 fw-bold text-light mb-2">
            DR. HATHI&rsquo;S GHOST PHARMACY
          </h2>
          <p className="text-muted" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Specially formulated ethereal remedies designed to ease wall phasing, replenish ectoplasm, and restore peace to the afterlife.
          </p>
        </div>

        {/* Pharmacy Cards Grid */}
        <div className="row g-4 mb-4 justify-content-center">
          {PHARMACY_ITEMS.map((item) => {
            const Icon = item.icon;
            const isAdded = addedItem === item.name;

            return (
              <div key={item.name} className="col-md-6 col-lg-4">
                <div
                  className="glass-panel p-4 h-100 d-flex flex-column justify-content-between position-relative"
                  style={{
                    border: '1px solid rgba(185, 247, 255, 0.2)',
                  }}
                >
                  <div>
                    {/* Badge & Icon */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div
                        className="p-3 rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          background: `rgba(${item.color === '#06B6D4' ? '6, 182, 212' : item.color === '#8B5CF6' ? '139, 92, 246' : '255, 77, 103'}, 0.15)`,
                          border: `1px solid ${item.color}`,
                        }}
                      >
                        <Icon size={24} style={{ color: item.color }} />
                      </div>
                      <span className="badge bg-dark border border-secondary font-mono small">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="font-heading fs-4 fw-bold text-light mb-1">
                      {item.name}
                    </h4>
                    <div className="font-mono small text-ghost mb-3" style={{ fontSize: '11px' }}>
                      Target: {item.condition}
                    </div>

                    <div className="mb-3">
                      <div className="font-mono text-muted small" style={{ fontSize: '10px' }}>
                        SUPERNATURAL EFFECT:
                      </div>
                      <p className="text-light small mb-2">{item.effect}</p>

                      <div className="font-mono text-muted small" style={{ fontSize: '10px' }}>
                        USAGE DIRECTIONS:
                      </div>
                      <p className="text-muted small mb-0 font-italic">{item.usage}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-top border-secondary mt-3">
                    <button
                      onClick={() => handleAdd(item.name)}
                      className={`btn w-100 font-mono small d-flex align-items-center justify-content-center gap-2 ${
                        isAdded ? 'btn-success' : 'btn-outline-info'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check size={16} />
                          <span>ADDED TO PRESCRIPTION</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>PRESCRIBE THIS MEDICATION</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Disclaimer Banner */}
        <div
          className="glass-panel p-3 d-flex align-items-center gap-3 text-muted small font-mono mx-auto"
          style={{ maxWidth: '780px', borderLeft: '4px solid var(--medical-accent)' }}
        >
          <AlertCircle size={20} className="text-medical flex-shrink-0" />
          <div>
            <strong>MEDICAL SAFETY NOTICE:</strong> All treatments, elixirs, and recommendations presented in Dr. Hathi&rsquo;s Ghost Pharmacy are purely fictional entertainment created for this hackathon experience. Not real medical advice.
          </div>
        </div>
      </div>
    </section>
  );
};
