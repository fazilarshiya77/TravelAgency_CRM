import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Search, Bell, Plus, Sun, Moon, Check } from 'lucide-react';
import aiAvatar from '../assets/ai-avatar.png';

export const Topbar: React.FC = () => {
  const {
    currentTab,
    setCommandPaletteOpen,
    aiAssistantOpen,
    setAiAssistantOpen,
    notifications,
    setNotifications,
    notificationsOpen,
    setNotificationsOpen,
  } = useNavigation();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.body.classList.add('dark');
      return true;
    }
    return false;
  });

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationBadgeColor = (type: string) => {
    switch (type) {
      case 'success': return 'var(--color-success)';
      case 'warning': return 'var(--color-warning)';
      case 'danger': return 'var(--color-danger)';
      default: return 'var(--color-secondary)';
    }
  };

  return (
    <header
      className="glass-effect"
      style={{
        height: 'var(--topbar-height)',
        borderBottom: '1px solid var(--border-light)',
        padding: '0 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        flexShrink: 0,
      }}
    >
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <h1 className="h2-subtitle" style={{ fontSize: '1.15rem' }}>{currentTab}</h1>
        <div
          style={{
            fontSize: '0.7rem',
            backgroundColor: 'var(--color-soft-blue)',
            color: 'var(--color-soft-blue-dark)',
            padding: '2px 8px',
            borderRadius: '12px',
            fontWeight: 600,
          }}
        >
          v1.0.0
        </div>
      </div>

      {/* Center/Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Global Search Visual Bar */}
        <div
          onClick={() => setCommandPaletteOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem 0.85rem',
            width: '260px',
            cursor: 'pointer',
            justifyContent: 'space-between',
            transition: 'all var(--transition-fast)',
            boxShadow: 'var(--shadow-sm)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-light)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>Search commands...</span>
          </div>
          <div
            style={{
              padding: '2px 6px',
              borderRadius: '4px',
              backgroundColor: '#F1F5F9',
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-light)',
            }}
          >
            ⌘K
          </div>
        </div>

        {/* Action Widgets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Quick Create Button */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            style={{
              border: 'none',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)',
              color: '#FFFFFF',
              padding: '0.5rem 0.85rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 4px 14px rgba(14, 165, 233, 0.15)',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(14, 165, 233, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(14, 165, 233, 0.15)';
            }}
          >
            <Plus className="w-4 h-4" />
            <span>Quick Create</span>
          </button>

          {/* AI Assistant toggle */}
          <button
            onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: aiAssistantOpen ? 'var(--color-secondary)' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)',
              boxShadow: 'var(--shadow-sm)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
              e.currentTarget.style.color = 'var(--color-secondary)';
            }}
            onMouseLeave={(e) => {
              if (!aiAssistantOpen) {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }
            }}
          >
            <img src={aiAvatar} style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} alt="AI CRM Copilot" />
          </button>

          {/* Notifications Button */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: notificationsOpen ? 'var(--color-secondary)' : 'var(--text-secondary)',
                transition: 'all var(--transition-fast)',
                boxShadow: 'var(--shadow-sm)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                e.currentTarget.style.color = 'var(--color-secondary)';
              }}
              onMouseLeave={(e) => {
                if (!notificationsOpen) {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <Bell className="w-[18px] h-[18px]" />
              {unreadCount > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: 'var(--color-danger)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #FFFFFF',
                  }}
                >
                  {unreadCount}
                </div>
              )}
            </button>

            {/* Notifications Popover */}
            {notificationsOpen && (
              <div
                className="glass-effect"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '320px',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-light)',
                  backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  animation: 'page-enter 0.2s ease-out forwards',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--color-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                      }}
                    >
                      <Check className="w-3 h-3" />
                      Mark all read
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '240px', overflowY: 'auto' }}>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: '0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: n.read ? 'transparent' : 'rgba(56, 189, 248, 0.03)',
                        borderLeft: `3px solid ${getNotificationBadgeColor(n.type)}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        transition: 'background var(--transition-fast)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.8rem', color: n.read ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                          {n.title}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{n.time}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                        {n.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button (Aesthetics design element) */}
          <button
            id="theme-toggle"
            onClick={toggleDarkMode}
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              transition: 'all var(--transition-fast)',
              boxShadow: 'var(--shadow-sm)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
              e.currentTarget.style.color = 'var(--color-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-light)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            {isDarkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
