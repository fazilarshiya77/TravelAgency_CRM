import React from 'react';
import { Card } from '../components/ui/Card';
import { Compass, Sparkles } from 'lucide-react';

interface PlaceholderViewProps {
  title: string;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        animation: 'page-enter 0.4s ease-out forwards',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          backgroundColor: 'var(--color-soft-blue)',
          color: 'var(--color-soft-blue-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <Compass className="w-6 h-6 animate-pulse-soft" style={{ animation: 'pulse-soft 4s infinite' }} />
      </div>

      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h2 className="h2-subtitle" style={{ fontSize: '1.25rem' }}>{title} Module</h2>
        <p className="body-normal" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
          This enterprise CRM section is scaffolded in the architecture. Future iterations will build out the complete interface following the custom layout design system.
        </p>
      </div>

      {/* Mock skeleton UI widget inside Card */}
      <Card style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Automated Module Skeleton Loader</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="skeleton-box" style={{ width: '40%', height: '12px' }} />
          <div className="skeleton-box" style={{ width: '85%', height: '10px' }} />
          <div className="skeleton-box" style={{ width: '70%', height: '10px' }} />
        </div>
      </Card>
    </div>
  );
};
