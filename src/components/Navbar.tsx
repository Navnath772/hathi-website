import React, { useState, useEffect } from 'react';
import { Ghost, Moon, Sun, Volume2, VolumeX, ShieldAlert, Cpu, Menu, X, Sparkles } from 'lucide-react';
import { audio } from '../services/audio';

interface NavbarProps {
  midnightMode: boolean;
  onToggleMidnight: () => void;
  onOpenBoo: () => void;
  onOpenJudge: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  secretsCount: number;
  totalSecrets: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  midnightMode,
  onToggleMidnight,
  onOpenBoo,
  onOpenJudge,
  soundEnabled,
  onToggleSound,
  secretsCount,
  totalSecrets,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    audio.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg fixed-top navbar-clinic py-3 ${
          scrolled ? 'scrolled shadow-lg' : ''
        }`}
      >
        <div className="container-fluid px-lg-5">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="navbar-brand d-flex align-items-center gap-3 text-decoration-none"
          >
            <div className="position-relative d-flex align-items-center justify-content-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '42px',
                  height: '42px',
                  background: 'linear-gradient(135deg, rgba(255, 77, 103, 0.25) 0%, rgba(185, 247, 255, 0.2) 100%)',
                  border: '1px solid var(--ghost-glow)',
                }}
              >
                <Ghost className="text-ghost" size={24} />
              </div>
              <div
                className="position-absolute"
                style={{
                  bottom: '-2px',
                  right: '-2px',
                  width: '14px',
                  height: '14px',
                  background: 'var(--medical-accent)',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                +
              </div>
            </div>

            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="font-heading fw-bold fs-5 tracking-wider text-light mb-0">
                  HATHI <span className="text-ghost">AFTERDARK</span>
                </span>
                {midnightMode && (
                  <span className="badge bg-danger text-uppercase px-2 py-1" style={{ fontSize: '10px' }}>
                    03:13 AM
                  </span>
                )}
              </div>
              <div className="font-mono text-muted small" style={{ fontSize: '10px', letterSpacing: '0.1em' }}>
                SUPERNATURAL HEALTHCARE
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="collapse navbar-collapse d-none d-lg-flex justify-content-center">
            <ul className="navbar-nav gap-4 mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <button
                  onClick={() => scrollToSection('dr-hathi')}
                  className="btn btn-link nav-link text-light text-decoration-none py-1 px-2"
                >
                  Dr. Hathi
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => scrollToSection('check-up')}
                  className="btn btn-link nav-link text-light text-decoration-none py-1 px-2"
                >
                  Check-Up
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => scrollToSection('pharmacy')}
                  className="btn btn-link nav-link text-light text-decoration-none py-1 px-2"
                >
                  Pharmacy
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => scrollToSection('patients')}
                  className="btn btn-link nav-link text-light text-decoration-none py-1 px-2"
                >
                  Patient Records
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => scrollToSection('about')}
                  className="btn btn-link nav-link text-light text-decoration-none py-1 px-2"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Right Action Controls */}
          <div className="d-flex align-items-center gap-2 gap-md-3">
            {/* Secrets Discovered Badge */}
            <div
              className="d-none d-sm-flex align-items-center gap-2 px-2 py-1 rounded-pill"
              style={{
                background: secretsCount > 0 ? 'rgba(255, 77, 103, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${secretsCount > 0 ? 'rgba(255, 77, 103, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                fontSize: '11px',
              }}
              title="Supernatural Secrets Discovered"
            >
              <Sparkles size={12} className={secretsCount > 0 ? 'text-medical' : 'text-muted'} />
              <span className="font-mono text-light">
                {secretsCount}/{totalSecrets} SECRETS
              </span>
            </div>

            {/* Midnight Mode Toggle */}
            <button
              onClick={() => {
                audio.playClick();
                onToggleMidnight();
              }}
              className={`btn btn-sm d-flex align-items-center gap-1.5 px-2.5 py-1.5 rounded-pill transition-all ${
                midnightMode
                  ? 'btn-danger shadow-sm'
                  : 'btn-outline-secondary text-ghost border-opacity-25'
              }`}
              style={{ fontSize: '12px' }}
              title="Toggle Midnight Mode (03:13 AM Witching Hour)"
            >
              {midnightMode ? <Sun size={14} /> : <Moon size={14} />}
              <span className="d-none d-md-inline">{midnightMode ? 'Dawn' : 'Midnight'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                onToggleSound();
              }}
              className={`btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-circle ${
                soundEnabled ? 'btn-outline-info text-ghost' : 'btn-outline-secondary text-muted'
              }`}
              title={soundEnabled ? 'Sound FX: ON (Web Audio)' : 'Sound FX: OFF'}
              style={{ width: '34px', height: '34px' }}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Judge Mode / AI Core HUD */}
            <button
              onClick={() => {
                audio.playClick();
                onOpenJudge();
              }}
              className="btn btn-sm glow-btn-ghost d-flex align-items-center gap-1.5 px-3 py-1.5"
              style={{ fontSize: '12px' }}
              title="Open Hathi AI Core & Judge Architecture Panel"
            >
              <Cpu size={14} className="text-ghost" />
              <span className="d-none d-sm-inline">AI Core</span>
            </button>

            {/* Boo AI Button */}
            <button
              onClick={() => {
                audio.playChime();
                onOpenBoo();
              }}
              className="btn btn-sm glow-btn-primary d-flex align-items-center gap-1.5 px-3 py-1.5"
              style={{ fontSize: '12px' }}
            >
              <Ghost size={14} />
              <span>Boo AI</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-outline-secondary d-lg-none p-1.5 text-light"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Offcanvas Overlay */}
      {mobileMenuOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-90 d-lg-none"
          style={{ zIndex: 1060, backdropFilter: 'blur(20px)' }}
        >
          <div className="d-flex flex-column h-100 p-4 justify-content-between">
            <div>
              <div className="d-flex justify-content-between align-items-center mb-5">
                <span className="font-heading fw-bold fs-4 text-ghost">HATHI AFTERDARK</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-outline-light rounded-circle p-2"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="d-flex flex-column gap-3 fs-5">
                <button
                  onClick={() => scrollToSection('hero')}
                  className="btn btn-link text-start text-light text-decoration-none py-2"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('dr-hathi')}
                  className="btn btn-link text-start text-light text-decoration-none py-2"
                >
                  Dr. Hathi
                </button>
                <button
                  onClick={() => scrollToSection('check-up')}
                  className="btn btn-link text-start text-light text-decoration-none py-2"
                >
                  Ghost Check-Up
                </button>
                <button
                  onClick={() => scrollToSection('pharmacy')}
                  className="btn btn-link text-start text-light text-decoration-none py-2"
                >
                  Ghost Pharmacy
                </button>
                <button
                  onClick={() => scrollToSection('patients')}
                  className="btn btn-link text-start text-light text-decoration-none py-2"
                >
                  Patient Records
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="btn btn-link text-start text-light text-decoration-none py-2"
                >
                  About the Clinic
                </button>
              </div>
            </div>

            <div className="pt-4 border-top border-secondary">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted small">Secrets Found:</span>
                <span className="badge bg-danger">{secretsCount} / {totalSecrets}</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJudge();
                }}
                className="btn btn-outline-info w-100 mb-2 py-2"
              >
                Open AI Architecture & Judge Mode
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
