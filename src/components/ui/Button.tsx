import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: '#FFFFFF',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-sm)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-secondary)',
          border: '1px solid rgba(14, 165, 233, 0.4)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          border: 'none',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--color-danger)',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.15)',
        };
      case 'primary':
      default:
        return {
          background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)',
          color: '#FFFFFF',
          border: 'none',
          boxShadow: '0 4px 14px rgba(14, 165, 233, 0.15)',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: '0.4rem 0.75rem',
          fontSize: '0.8rem',
          borderRadius: 'var(--radius-sm)',
        };
      case 'lg':
        return {
          padding: '0.85rem 1.75rem',
          fontSize: '0.95rem',
          borderRadius: 'var(--radius-lg)',
        };
      case 'md':
      default:
        return {
          padding: '0.6rem 1.25rem',
          fontSize: '0.875rem',
          borderRadius: 'var(--radius-md)',
        };
    }
  };

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    cursor: props.disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: props.disabled || isLoading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    transition: 'all var(--transition-fast)',
    gap: '0.5rem',
    outline: 'none',
    userSelect: 'none',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...style,
  };

  return (
    <button
      style={baseStyles}
      onMouseEnter={(e) => {
        if (!props.disabled && !isLoading) {
          e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)';
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(14, 165, 233, 0.25)';
          } else if (variant === 'secondary') {
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
            e.currentTarget.style.backgroundColor = 'var(--color-soft-blue)';
          } else if (variant === 'ghost') {
            e.currentTarget.style.backgroundColor = '#F1F5F9';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!props.disabled && !isLoading) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(14, 165, 233, 0.15)';
          } else if (variant === 'secondary') {
            e.currentTarget.style.borderColor = 'var(--border-light)';
            e.currentTarget.style.backgroundColor = '#FFFFFF';
          } else if (variant === 'ghost') {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }
      }}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin"
          style={{
            animation: 'spin 1s linear infinite',
            width: '16px',
            height: '16px',
            marginRight: '4px',
          }}
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
          <path fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
