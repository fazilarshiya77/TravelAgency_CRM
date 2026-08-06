import React from 'react';

// Input Field
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  style,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%', marginBottom: '1rem' }}>
      {label && (
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {label}
        </span>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {leftIcon && (
          <div style={{ position: 'absolute', left: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
            {leftIcon}
          </div>
        )}
        <input
          style={{
            width: '100%',
            padding: '0.65rem 0.85rem',
            paddingLeft: leftIcon ? '38px' : '0.85rem',
            borderRadius: 'var(--radius-md)',
            border: error ? '1px solid var(--color-danger)' : '1px solid var(--border-light)',
            fontSize: '0.875rem',
            color: 'var(--text-primary)',
            backgroundColor: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(6px)',
            outline: 'none',
            transition: 'all var(--transition-fast)',
            boxShadow: 'var(--shadow-sm)',
            ...style,
          }}
          onFocus={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--color-accent)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56, 189, 248, 0.15)';
          }}
          onBlur={(e) => {
            if (!error) e.currentTarget.style.borderColor = 'var(--border-light)';
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          }}
          {...props}
        />
      </div>
      {error && (
        <span style={{ fontSize: '0.725rem', color: 'var(--color-danger)', fontWeight: 500 }}>
          {error}
        </span>
      )}
    </div>
  );
};

// Select Field
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  style,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%', marginBottom: '1rem' }}>
      {label && (
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {label}
        </span>
      )}
      <select
        style={{
          width: '100%',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          border: error ? '1px solid var(--color-danger)' : '1px solid var(--border-light)',
          fontSize: '0.875rem',
          color: 'var(--text-primary)',
          backgroundColor: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(6px)',
          outline: 'none',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          boxShadow: 'var(--shadow-sm)',
          ...style,
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--color-accent)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56, 189, 248, 0.15)';
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--border-light)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span style={{ fontSize: '0.725rem', color: 'var(--color-danger)', fontWeight: 500 }}>
          {error}
        </span>
      )}
    </div>
  );
};

// Textarea Field
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%', marginBottom: '1rem' }}>
      {label && (
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {label}
        </span>
      )}
      <textarea
        style={{
          width: '100%',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          border: error ? '1px solid var(--color-danger)' : '1px solid var(--border-light)',
          fontSize: '0.875rem',
          color: 'var(--text-primary)',
          backgroundColor: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(6px)',
          outline: 'none',
          minHeight: '80px',
          resize: 'vertical',
          transition: 'all var(--transition-fast)',
          boxShadow: 'var(--shadow-sm)',
          ...style,
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--color-accent)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56, 189, 248, 0.15)';
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = 'var(--border-light)';
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        }}
        {...props}
      />
      {error && (
        <span style={{ fontSize: '0.725rem', color: 'var(--color-danger)', fontWeight: 500 }}>
          {error}
        </span>
      )}
    </div>
  );
};

// Toggle Switch
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', userSelect: 'none' }}>
      <div style={{ position: 'relative' }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          style={{ opacity: 0, position: 'absolute', width: 0, height: 0 }}
        />
        <div
          style={{
            width: '42px',
            height: '24px',
            backgroundColor: checked ? 'var(--color-secondary)' : '#E2E8F0',
            borderRadius: '99px',
            transition: 'background-color var(--transition-fast)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: checked ? '20px' : '2px',
              width: '20px',
              height: '20px',
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'left var(--transition-fast)',
            }}
          />
        </div>
      </div>
      {label && (
        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          {label}
        </span>
      )}
    </label>
  );
};
