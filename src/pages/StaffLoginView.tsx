import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Lock, User, Plane, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { FloatingBackground } from '../components/FloatingBackground';

export const StaffLoginView: React.FC = () => {
  const { setIsAuthenticated } = useNavigation();
  const [email, setEmail] = useState('admin@travelagency.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
    }, 1200);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <FloatingBackground />
      
      <div style={{ zIndex: 10, width: '100%', maxWidth: '420px', padding: '1.5rem' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(24px)',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255,255,255,0.2) inset'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
              color: 'white',
              marginBottom: '1rem',
              boxShadow: '0 10px 20px rgba(14, 165, 233, 0.3)'
            }}>
              <Plane size={32} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Staff Portal
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Sign in to access the Travel Agency CRM
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <Input
                label="Email Address"
                type="email"
                placeholder="name@agency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<User size={18} />}
                required
              />
            </div>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Password</label>
                <a href="#" style={{ fontSize: '0.875rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
                  Forgot?
                </a>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={18} />}
                required
              />
            </div>

            <Button 
              variant="primary" 
              type="submit" 
              style={{ 
                marginTop: '0.5rem', 
                padding: '0.875rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                width: '100%'
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
              {!isLoading && <ArrowRight size={18} />}
            </Button>
          </form>

          <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Secure connection established.<br/>
            Unauthorized access is strictly prohibited.
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLoginView;
