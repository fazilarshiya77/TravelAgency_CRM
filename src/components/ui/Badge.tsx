import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'dot' | 'pill';
  colorway?: 'primary' | 'success' | 'warning' | 'danger' | 'mint' | 'soft-blue';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'pill',
  colorway = 'primary',
  style,
  ...props
}) => {
  const getColorwayStyles = () => {
    switch (colorway) {
      case 'success': return 'var(--color-success)';
      case 'warning': return 'var(--color-warning)';
      case 'danger': return 'var(--color-danger)';
      case 'mint': return 'var(--color-mint-dark)';
      case 'soft-blue': return 'var(--color-soft-blue-dark)';
      case 'primary':
      default:
        return 'var(--color-secondary)';
    }
  };

  if (variant === 'dot') {
    return (
      <span
        style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: getColorwayStyles(),
          border: '1px solid #FFFFFF',
          ...style,
        }}
        {...props}
      />
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.15rem 0.45rem',
        borderRadius: '999px',
        fontSize: '0.675rem',
        fontWeight: 700,
        backgroundColor: getColorwayStyles(),
        color: '#FFFFFF',
        lineHeight: 1,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
};
