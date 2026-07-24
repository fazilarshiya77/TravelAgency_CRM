import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  colorway?: 'mint' | 'peach' | 'sand' | 'soft-blue' | 'success' | 'warning' | 'danger';
}

export const Tag: React.FC<TagProps> = ({
  children,
  colorway = 'soft-blue',
  style,
  ...props
}) => {
  const getColorwayStyles = () => {
    switch (colorway) {
      case 'mint':
        return {
          backgroundColor: 'var(--color-mint)',
          color: 'var(--color-mint-dark)',
        };
      case 'peach':
        return {
          backgroundColor: 'var(--color-peach)',
          color: 'var(--color-peach-dark)',
        };
      case 'sand':
        return {
          backgroundColor: 'var(--color-sand)',
          color: 'var(--color-sand-dark)',
        };
      case 'success':
        return {
          backgroundColor: '#D1FAE5',
          color: '#065F46',
        };
      case 'warning':
        return {
          backgroundColor: '#FEF3C7',
          color: '#92400E',
        };
      case 'danger':
        return {
          backgroundColor: '#FEE2E2',
          color: '#991B1B',
        };
      case 'soft-blue':
      default:
        return {
          backgroundColor: 'var(--color-soft-blue)',
          color: 'var(--color-soft-blue-dark)',
        };
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.2rem 0.6rem',
        borderRadius: '6px',
        fontSize: '0.725rem',
        fontWeight: 600,
        letterSpacing: '0.01em',
        transition: 'all var(--transition-fast)',
        border: '1px solid rgba(255,255,255,0.4)',
        ...getColorwayStyles(),
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
};
