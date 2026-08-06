import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'white' | 'sand' | 'peach' | 'soft-blue' | 'glass';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerActions,
  footer,
  variant = 'white',
  interactive = false,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'sand':
        return {
          backgroundColor: 'var(--color-sand)',
          borderColor: 'rgba(255, 247, 237, 0.6)',
          background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
        };
      case 'peach':
        return {
          backgroundColor: 'var(--color-peach)',
          borderColor: 'rgba(255, 232, 214, 0.6)',
          background: 'linear-gradient(135deg, #FFE8D6, #FFD8BE)',
        };
      case 'soft-blue':
        return {
          backgroundColor: 'var(--color-soft-blue)',
          borderColor: 'rgba(234, 248, 255, 0.6)',
          background: 'linear-gradient(135deg, #EAF8FF, #D0EFFF)',
        };
      case 'glass':
        return {
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
        };
      case 'white':
      default:
        return {
          background: 'rgba(255, 255, 255, 0.6)',
          borderColor: 'rgba(255, 255, 255, 0.7)',
        };
    }
  };

  const cardStyles: React.CSSProperties = {
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-light)',
    boxShadow: 'var(--shadow-sm)',
    padding: '1.5rem',
    position: 'relative',
    backdropFilter: 'blur(14px) saturate(160%)',
    WebkitBackdropFilter: 'blur(14px) saturate(160%)',
    transition: 'transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal), background var(--transition-normal)',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <div
      style={cardStyles}
      className={`ui-card ${interactive ? 'crm-card-interactive' : ''}`.trim()}
      onMouseEnter={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
          e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
        }
      }}
      onMouseLeave={(e) => {
        if (interactive) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          e.currentTarget.style.borderColor = variant === 'white' ? 'var(--border-light)' : 'rgba(255, 255, 255, 0.5)';
        }
      }}
      {...props}
    >
      {/* Card Header */}
      {(title || subtitle || headerActions) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.25rem',
            gap: '1rem',
          }}
        >
          <div>
            {title && (
              <h3 className="h2-subtitle" style={{ fontSize: '1rem', fontWeight: 600 }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="body-normal" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {subtitle}
              </p>
            )}
          </div>
          {headerActions && <div style={{ display: 'flex', gap: '0.5rem' }}>{headerActions}</div>}
        </div>
      )}

      {/* Card Body */}
      <div style={{ flex: 1 }}>{children}</div>

      {/* Card Footer */}
      {footer && (
        <div
          style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};
