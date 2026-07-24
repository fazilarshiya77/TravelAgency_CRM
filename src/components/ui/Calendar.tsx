import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plane, Bed, Compass, Sparkles } from 'lucide-react';

interface CalendarEvent {
  day: number;
  title: string;
  type: 'flight' | 'hotel' | 'tour' | 'safari';
  colorway: 'soft-blue' | 'peach' | 'mint' | 'sand';
}

export const Calendar: React.FC = () => {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Mock calendar events for a premium dashboard preview
  const events: CalendarEvent[] = [
    { day: 3, title: 'Paris Flight - Harrison', type: 'flight', colorway: 'soft-blue' },
    { day: 8, title: 'Amalfi Check-in - Miller', type: 'hotel', colorway: 'peach' },
    { day: 14, title: 'Safari excursion - Thompson', type: 'safari', colorway: 'mint' },
    { day: 22, title: 'Kyoto Sanctuary Tour', type: 'tour', colorway: 'sand' },
    { day: 28, title: 'Swiss Chalet Check-out', type: 'hotel', colorway: 'soft-blue' },
  ];

  // Grid padding for starting day (assume month starts on a Wednesday)
  const prefixDays = 2;
  const daysInMonth = 31;
  const totalSlots = 35; // 5 weeks grid

  const getEventsForDay = (day: number) => {
    return events.filter(e => e.day === day);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-3.5 h-3.5 flex-shrink-0" />;
      case 'hotel':
        return <Bed className="w-3.5 h-3.5 flex-shrink-0" />;
      case 'tour':
        return <Compass className="w-3.5 h-3.5 flex-shrink-0" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />;
    }
  };

  const getEventStyle = (colorway: string) => {
    switch (colorway) {
      case 'soft-blue':
        return {
          background: 'linear-gradient(135deg, rgba(224, 242, 254, 0.9) 0%, rgba(186, 230, 253, 0.9) 100%)',
          borderLeft: '4px solid #0EA5E9',
          color: '#0369A1',
        };
      case 'peach':
        return {
          background: 'linear-gradient(135deg, rgba(255, 232, 214, 0.9) 0%, rgba(255, 216, 190, 0.9) 100%)',
          borderLeft: '4px solid #F97316',
          color: '#7C2D12',
        };
      case 'mint':
        return {
          background: 'linear-gradient(135deg, rgba(230, 253, 240, 0.9) 0%, rgba(167, 243, 208, 0.9) 100%)',
          borderLeft: '4px solid #10B981',
          color: '#065F46',
        };
      case 'sand':
      default:
        return {
          background: 'linear-gradient(135deg, rgba(255, 247, 237, 0.9) 0%, rgba(255, 237, 213, 0.9) 100%)',
          borderLeft: '4px solid #F59E0B',
          color: '#78350F',
        };
    }
  };

  return (
    <div
      className="crm-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        width: '100%',
        padding: '1.5rem 1.75rem',
      }}
    >
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <CalendarIcon className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
          <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            Agency Planner
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            July 2026
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            style={{
              padding: '6px',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            style={{
              padding: '6px',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-secondary)',
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          borderBottom: '1px solid var(--border-light)',
          paddingBottom: '0.75rem',
        }}
      >
        {weekDays.map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridAutoRows: '96px',
          gap: '6px',
          backgroundColor: 'rgba(241, 245, 249, 0.4)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          padding: '4px',
        }}
      >
        {Array.from({ length: totalSlots }).map((_, idx) => {
          const dayNumber = idx + 1 - prefixDays;
          const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
          const dayEvents = isValidDay ? getEventsForDay(dayNumber) : [];

          return (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                borderRadius: '6px',
                border: '1px solid rgba(226, 232, 240, 0.3)',
              }}
            >
              <span
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: isValidDay ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  opacity: isValidDay ? 1 : 0.25,
                }}
              >
                {isValidDay ? dayNumber : ''}
              </span>
              
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  overflow: 'hidden',
                  width: '100%',
                }}
              >
                {dayEvents.map((e, evIdx) => {
                  const evStyle = getEventStyle(e.colorway);
                  return (
                    <div
                      key={evIdx}
                      style={{
                        ...evStyle,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 6px',
                        borderRadius: '6px',
                        fontSize: '0.725rem',
                        fontWeight: 600,
                        width: '100%',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                        transition: 'transform var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {getEventIcon(e.type)}
                      <span
                        style={{
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          display: 'block',
                          flex: 1,
                        }}
                      >
                        {e.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
