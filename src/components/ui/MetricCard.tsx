import React, { useState } from 'react';
import { Sparkles, TrendingUp, TrendingDown, ChevronRight, HelpCircle } from 'lucide-react';
import { Card } from './Card';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number; // e.g. 14.2 for +14.2%, -3.4 for -3.4%
  changeLabel?: string; // e.g. "vs last month"
  icon?: React.ReactNode;
  sparkline?: number[];
  aiInsight?: string;
  variant?: 'white' | 'glass';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  change,
  changeLabel = 'vs last month',
  icon,
  sparkline,
  aiInsight,
  variant = 'white',
}) => {
  const [insightOpen, setInsightOpen] = useState(false);

  const isPositive = change !== undefined ? change >= 0 : true;

  // Render minimal SVG sparkline
  const renderSparkline = () => {
    if (!sparkline || sparkline.length < 2) return null;

    const width = 120;
    const height = 36;
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline);
    const range = max - min === 0 ? 1 : max - min;

    const points = sparkline
      .map((val, index) => {
        const x = (index / (sparkline.length - 1)) * width;
        const y = height - ((val - min) / range) * height + 2; // Pad slightly top/bottom
        return `${x},${Math.min(height - 2, Math.max(2, y))}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <polyline
          fill="none"
          stroke={isPositive ? 'var(--color-success)' : 'var(--color-danger)'}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {/* Soft area gradient fill below sparkline */}
        <path
          d={`M 0,${height} L ${points} L ${width},${height} Z`}
          fill={isPositive ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 110, 110, 0.05)'}
        />
      </svg>
    );
  };

  return (
    <Card
      variant={variant}
      interactive
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1.25rem 1.5rem',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
          {label}
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-app)',
            color: 'var(--text-secondary)',
          }}
        >
          {icon || <HelpCircle className="w-4 h-4" />}
        </div>
      </div>

      {/* Value Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.25rem' }}>
        <div>
          <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {value}
          </span>
          {change !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: '0.725rem',
                  fontWeight: 600,
                  color: isPositive ? 'var(--color-success)' : 'var(--color-danger)',
                }}
              >
                {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                {isPositive ? '+' : ''}{change}%
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                {changeLabel}
              </span>
            </div>
          )}
        </div>

        {/* Sparkline Visual */}
        {sparkline && <div style={{ marginBottom: '4px' }}>{renderSparkline()}</div>}
      </div>

      {/* AI Insight Overlay */}
      {aiInsight && (
        <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
          <div
            onClick={() => setInsightOpen(!insightOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: 'var(--color-secondary)',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>AI Insight Recommendation</span>
            </div>
            <ChevronRight
              className="w-3.5 h-3.5"
              style={{
                transform: insightOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform var(--transition-fast)',
              }}
            />
          </div>

          {insightOpen && (
            <div
              style={{
                backgroundColor: 'var(--color-soft-blue)',
                color: 'var(--color-soft-blue-dark)',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                fontSize: '0.75rem',
                lineHeight: 1.4,
                marginTop: '0.5rem',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                animation: 'page-enter 0.2s ease-out forwards',
              }}
            >
              {aiInsight}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
