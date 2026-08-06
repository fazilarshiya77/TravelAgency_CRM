import React from 'react';
import { useNavigation, type TabName } from '../context/NavigationContext';
import logo from '../assets/logo.jpg';
import {
  LayoutDashboard,
  UserCheck,
  Users,
  Briefcase,
  Compass,
  Calendar,
  BarChart3,
  CheckSquare,
  Mail,
  FileText,
  CreditCard,
  Car,
  LogOut,
} from 'lucide-react';

interface SidebarItem {
  name: TabName;
  icon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, setIsAuthenticated } = useNavigation();

  const menuItems: SidebarItem[] = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
    { name: 'Leads', icon: <UserCheck className="w-[18px] h-[18px]" /> },
    { name: 'Contacts', icon: <Users className="w-[18px] h-[18px]" /> },
    { name: 'Bookings', icon: <Briefcase className="w-[18px] h-[18px]" /> },
    { name: 'Itineraries', icon: <Compass className="w-[18px] h-[18px]" /> },
    { name: 'Quotation Builder', icon: <FileText className="w-[18px] h-[18px]" /> },
    { name: 'Payments', icon: <CreditCard className="w-[18px] h-[18px]" /> },
    { name: 'Car Service', icon: <Car className="w-[18px] h-[18px]" /> },
    { name: 'Calendar', icon: <Calendar className="w-[18px] h-[18px]" /> },
    { name: 'Reports', icon: <BarChart3 className="w-[18px] h-[18px]" /> },
    { name: 'Tasks', icon: <CheckSquare className="w-[18px] h-[18px]" /> },
    { name: 'Messages', icon: <Mail className="w-[18px] h-[18px]" /> },
  ];

  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 20,
        background: 'linear-gradient(180deg, rgba(12, 24, 47, 0.9), rgba(8, 17, 34, 0.92))',
        backdropFilter: 'blur(18px) saturate(160%)',
        WebkitBackdropFilter: 'blur(18px) saturate(160%)',
        flexShrink: 0,
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          height: 'var(--topbar-height)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.75rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          gap: '0.65rem',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)',
          }}
        >
          <img src={logo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Naaz Travels Logo" />
        </div>
        <div>
          <span style={{ fontWeight: 700, fontSize: '0.975rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            NAAZ
          </span>
          <span style={{ fontWeight: 500, fontSize: '0.75rem', color: '#38BDF8', marginLeft: '4px', letterSpacing: '0.05em' }}>
            TRAVELS
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem 0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem',
        }}
      >
        {menuItems.map((item) => {
          const isActive = currentTab === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setCurrentTab(item.name)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'transparent',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                textAlign: 'left',
                position: 'relative',
                color: isActive ? '#38BDF8' : '#94A3B8',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                gap: '0.75rem',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#94A3B8';
                }
              }}
            >
              {/* Active Indicator Slider */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '12%',
                    bottom: '12%',
                    width: '3px',
                    borderRadius: '0 4px 4px 0',
                    backgroundColor: '#38BDF8',
                  }}
                />
              )}

              {/* Hover Indicator Box */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                    borderRadius: 'var(--radius-md)',
                    zIndex: -1,
                  }}
                />
              )}

              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: isActive ? '#38BDF8' : '#94A3B8',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Agent Profile */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          background: 'rgba(0, 0, 0, 0.22)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'var(--shadow-sm)',
            background: 'linear-gradient(135deg, #FFE8D6, #A7F3D0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#1F2937',
          }}
        >
          MR
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#FFFFFF', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            Mohammed Rayhan
          </div>
          <div style={{ fontSize: '0.7rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            CEO
          </div>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          title="Sign Out"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94A3B8',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            transition: 'color var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};
