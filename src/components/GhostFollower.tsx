import React, { useState, useEffect } from 'react';
import { Ghost, Sparkles } from 'lucide-react';
import { audio } from '../services/audio';

interface GhostFollowerProps {
  onDiscover: () => void;
  followerDiscovered: boolean;
}

export const GhostFollower: React.FC<GhostFollowerProps> = ({
  onDiscover,
  followerDiscovered,
}) => {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [visible, setVisible] = useState<boolean>(false);
  const [speech, setSpeech] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Follow cursor with slight trailing delay
    const handleMouseMove = (e: MouseEvent) => {
      // Appear after scrolling down at least 300px
      if (window.scrollY > 300) {
        setVisible(true);
        setCoords({ x: e.clientX + 18, y: e.clientY + 18 });
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playChime();
    audio.playGlitch();

    setSpeech('You found me.');

    setTimeout(() => {
      setSpeech('But I found you first...');
    }, 1400);

    setTimeout(() => {
      setSpeech(null);
      setVisible(false);
      onDiscover();
    }, 3200);
  };

  if (isMobile || !visible) return null;

  return (
    <div
      onClick={handleClick}
      className="ghost-follower-cursor"
      style={{
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
      title="A lingering spirit follows your mouse... (Click me!)"
    >
      <div className="position-relative float-ghost">
        <div
          className="rounded-circle p-2 d-flex align-items-center justify-content-center"
          style={{
            width: '38px',
            height: '38px',
            background: 'rgba(185, 247, 255, 0.25)',
            border: '1.5px solid var(--ghost-glow)',
            boxShadow: '0 0 20px rgba(185, 247, 255, 0.6)',
          }}
        >
          <Ghost size={20} className="text-ghost" />
        </div>

        {/* Speech Bubble */}
        {speech && (
          <div
            className="position-absolute glass-panel p-2 text-nowrap font-mono text-ghost fw-bold"
            style={{
              bottom: '42px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '11px',
              zIndex: 1000,
              boxShadow: '0 0 25px rgba(255, 77, 103, 0.4)',
              border: '1px solid var(--medical-accent)',
            }}
          >
            {speech}
          </div>
        )}
      </div>
    </div>
  );
};
