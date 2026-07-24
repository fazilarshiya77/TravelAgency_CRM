import React from 'react';
import { Plane, Hotel, MapPin, Compass } from 'lucide-react';
import { Tag } from './Tag';

interface TimelineNode {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'flight' | 'hotel' | 'activity' | 'transfer';
  status: 'confirmed' | 'pending' | 'completed';
}

export const Timeline: React.FC = () => {
  const nodes: TimelineNode[] = [
    {
      id: 'n-1',
      time: '08:40 AM',
      title: 'Flight LH-402 Departs JFK',
      description: 'Lufthansa Business Class to Munich. Terminal 4, Gate B28.',
      type: 'flight',
      status: 'confirmed',
    },
    {
      id: 'n-2',
      time: '12:15 PM',
      title: 'VIP Transfer to Hotel',
      description: 'Private chauffeur service in Mercedes S-Class to Hotel de la Ville.',
      type: 'transfer',
      status: 'confirmed',
    },
    {
      id: 'n-3',
      time: '02:00 PM',
      title: 'Hotel Check-In - Hotel de la Ville',
      description: 'Executive suite with private balcony. VIP welcome amenities pre-arranged.',
      type: 'hotel',
      status: 'confirmed',
    },
    {
      id: 'n-4',
      time: '05:30 PM',
      title: 'Private Vineyard Wine Tasting Excursion',
      description: 'Curated tasting with estate sommelier. AI recommended upsell completed.',
      type: 'activity',
      status: 'pending',
    },
  ];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="w-3.5 h-3.5" />;
      case 'hotel':
        return <Hotel className="w-3.5 h-3.5" />;
      case 'activity':
        return <Compass className="w-3.5 h-3.5" />;
      case 'transfer':
      default:
        return <MapPin className="w-3.5 h-3.5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      default: return 'soft-blue';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        padding: '0.25rem 0.5rem',
        position: 'relative',
      }}
    >
      {nodes.map((node, index) => {
        const isLast = index === nodes.length - 1;

        return (
          <div key={node.id} style={{ display: 'flex', gap: '1.25rem', position: 'relative' }}>
            {/* Left line column */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-soft-blue)',
                  color: 'var(--color-soft-blue-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                  border: '2px solid #FFFFFF',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {getNodeIcon(node.type)}
              </div>
              {!isLast && (
                <div
                  style={{
                    width: '2px',
                    flex: 1,
                    backgroundColor: 'var(--border-light)',
                    marginTop: '4px',
                    marginBottom: '4px',
                    position: 'absolute',
                    top: '28px',
                    bottom: '-20px',
                    left: '13px',
                    zIndex: 1,
                  }}
                />
              )}
            </div>

            {/* Right content column */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
                paddingBottom: isLast ? '0' : '1.25rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                  {node.time}
                </span>
                <Tag colorway={getStatusColor(node.status)}>
                  {node.status}
                </Tag>
              </div>
              
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                {node.title}
              </div>
              
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {node.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
