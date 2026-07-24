import React, { useMemo } from 'react';

interface FloatingElementProps {
  id: string;
  type: string;
  top: string;
  left: string;
  scale: number;
  animClass: string;
  opacity: number;
  rotate: string;
}

const FloatingElement: React.FC<FloatingElementProps> = React.memo(({
  type,
  top,
  left,
  scale,
  animClass,
  opacity,
  rotate,
}) => {
  // Direct inline SVG rendering with thicker 1.5 stroke width for enhanced visibility
  const renderSVG = () => {
    switch (type) {
      case 'airplane':
        return (
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 20.197a15.686 15.686 0 0 0 .8-7.3m0 0a15.686 15.686 0 0 0-.8-7.3m.8 7.3H2l4.8 3.5h7.2l5.8 4.2V2.5l-5.8 4.2H6.8L2 10.2h16.6" />
          </svg>
        );
      case 'globe':
        return (
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        );
      case 'compass':
        return (
          <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
          </svg>
        );
      case 'paper-plane':
        return (
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        );
      case 'mountain':
        return (
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="m8 3 4 8 5-5 5 15H2L8 3Z" />
          </svg>
        );
      case 'camera':
        return (
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
        );
      case 'ticket':
        return (
          <svg width="74" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" />
            <line x1="9" y1="5" x2="9" y2="19" strokeDasharray="3 3" />
            <line x1="15" y1="5" x2="15" y2="19" strokeDasharray="3 3" />
          </svg>
        );
      case 'luggage':
        return (
          <svg width="60" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="6" y="7" width="12" height="14" rx="2" />
            <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
            <circle cx="9" cy="22" r="1" />
            <circle cx="15" cy="22" r="1" />
            <path d="M12 7v14" />
          </svg>
        );
      case 'pin':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case 'palm':
        return (
          <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 22c0-8.284-3.582-15-8-15" />
            <path d="M4 7c3 0 6 3 7 7" />
            <path d="M4 7c2-2 5.5-2.5 8 .5" />
            <path d="M4 7c1-3 4-5 8-3" />
            <path d="M13 22c1.5-6 6.5-11 12-11" />
            <path d="M25 11c-2-2-5-2-7.5 1" />
            <path d="M25 11c-.5-3-3-5.5-6.5-5" />
          </svg>
        );
      case 'cloud':
        return (
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.42 0-.83.05-1.22.14A5.5 5.5 0 0 0 5.5 13a4.5 4.5 0 0 0 .5 8.95h11.5Z" />
          </svg>
        );
      case 'map-fold':
        return (
          <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            <line x1="9" y1="3" x2="9" y2="18" />
            <line x1="15" y1="6" x2="15" y2="21" />
          </svg>
        );
      default:
        return (
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`floating-element ${animClass}`}
      style={{
        top,
        left,
        transform: `scale(${scale}) rotate(${rotate})`,
        opacity,
      }}
    >
      {renderSVG()}
    </div>
  );
});

FloatingElement.displayName = 'FloatingElement';

export const FloatingBackground: React.FC = () => {
  // Configured opacities at 0.20-0.26 (20%-26%) to ensure they are visible on standard display panels
  const elements = useMemo(() => [
    { id: 'el-1', type: 'airplane', top: '12%', left: '8%', scale: 0.95, animClass: 'float-anim-1', opacity: 0.22, rotate: '15deg' },
    { id: 'el-2', type: 'globe', top: '75%', left: '5%', scale: 1.1, animClass: 'float-anim-2', opacity: 0.24, rotate: '-10deg' },
    { id: 'el-3', type: 'compass', top: '25%', left: '82%', scale: 0.85, animClass: 'float-anim-3', opacity: 0.22, rotate: '45deg' },
    { id: 'el-4', type: 'paper-plane', top: '80%', left: '78%', scale: 0.9, animClass: 'float-anim-1', opacity: 0.25, rotate: '-25deg' },
    { id: 'el-5', type: 'mountain', top: '48%', left: '90%', scale: 1.2, animClass: 'float-anim-2', opacity: 0.20, rotate: '0deg' },
    { id: 'el-6', type: 'camera', top: '65%', left: '45%', scale: 0.8, animClass: 'float-anim-3', opacity: 0.22, rotate: '12deg' },
    { id: 'el-7', type: 'ticket', top: '5%', left: '60%', scale: 0.9, animClass: 'float-anim-1', opacity: 0.24, rotate: '-18deg' },
    { id: 'el-8', type: 'luggage', top: '88%', left: '28%', scale: 1.0, animClass: 'float-anim-2', opacity: 0.22, rotate: '8deg' },
    { id: 'el-9', type: 'pin', top: '35%', left: '18%', scale: 0.75, animClass: 'float-anim-3', opacity: 0.22, rotate: '-5deg' },
    { id: 'el-10', type: 'palm', top: '55%', left: '3%', scale: 1.15, animClass: 'float-anim-1', opacity: 0.20, rotate: '20deg' },
    { id: 'el-11', type: 'cloud', top: '18%', left: '40%', scale: 1.0, animClass: 'float-anim-2', opacity: 0.24, rotate: '0deg' },
    { id: 'el-12', type: 'map-fold', top: '42%', left: '72%', scale: 0.95, animClass: 'float-anim-3', opacity: 0.22, rotate: '-15deg' },
  ], []);

  return (
    <div className="floating-bg-canvas">
      {elements.map((el) => (
        <FloatingElement key={el.id} {...el} />
      ))}
    </div>
  );
};
