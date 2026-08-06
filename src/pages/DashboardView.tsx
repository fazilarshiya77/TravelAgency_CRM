import React from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Chart } from '../components/ui/Chart';
import { Tag } from '../components/ui/Tag';
import {
  IndianRupee,
  UserCheck,
  Compass,
  BrainCircuit,
  Send,
  Calendar,
  Layers,
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface MessageItem {
  id: string;
  sender: string;
  snippet: string;
  sentiment: 'positive' | 'warning' | 'danger';
  sentimentLabel: string;
  time: string;
}

export const DashboardView: React.FC = () => {
  const { triggerAICommand } = useNavigation();

  // Revenue chart data
  const revenueData = [
    { label: 'Jan', value: 38000 },
    { label: 'Feb', value: 45000 },
    { label: 'Mar', value: 58000 },
    { label: 'Apr', value: 52000 },
    { label: 'May', value: 72000 },
    { label: 'Jun', value: 94000 },
    { label: 'Jul', value: 148000 },
  ];

  // Client messages
  const recentMessages: MessageItem[] = [
    { id: 'msg-1', sender: 'Neha Sharma', snippet: 'Can we add a private helicopter tour to Tuscany?', sentiment: 'positive', sentimentLabel: 'Exceptional', time: '5m ago' },
    { id: 'msg-2', sender: 'Vikram Malhotra', snippet: 'Flight schedule LH-402 shows a gate change. Verify?', sentiment: 'warning', sentimentLabel: 'Neutral', time: '1h ago' },
    { id: 'msg-3', sender: 'Priya Patel', snippet: 'Amalfi hotel says premium suite is double-booked.', sentiment: 'danger', sentimentLabel: 'Urgent', time: '3h ago' },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'mint';
      case 'warning': return 'peach';
      case 'danger':
      default:
        return 'danger';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.4s ease-out forwards' }}>
      
      {/* 1. Welcome Header */}
      <div>
        <h2 className="h1-title" style={{ fontSize: '1.75rem' }}>
          {(() => {
            const date = new Date();
            const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            const nd = new Date(utc + (3600000 * 5.5)); // Indian Time (IST)
            const hour = nd.getHours();
            if (hour < 12) return 'Good morning';
            if (hour < 17) return 'Good afternoon';
            return 'Good evening';
          })()}, Mohammed Rayhan
        </h2>
        <p className="body-normal" style={{ marginTop: '0.25rem' }}>
          Here is your agency's simplified overview for today.
        </p>
      </div>

      {/* 2. Key Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <MetricCard
          label="Today's Closed Revenue"
          value="₹148,000"
          change={18.4}
          changeLabel="vs target sales"
          icon={<IndianRupee className="w-4 h-4" />}
          sparkline={[90, 110, 105, 125, 118, 132, 148]}
        />
        <MetricCard
          label="Active Bookings"
          value="42 Completed"
          change={8.2}
          icon={<UserCheck className="w-4 h-4" />}
          sparkline={[32, 34, 35, 34, 38, 40, 42]}
        />
        <MetricCard
          label="Upcoming Trips"
          value="18 Live"
          change={-2.5}
          icon={<Compass className="w-4 h-4" />}
          sparkline={[20, 18, 19, 21, 20, 19, 18]}
        />
      </div>

      {/* 3. Main Chart */}
      <Card title="Revenue Growth" subtitle="Monthly performance overview">
        <div style={{ padding: '0.5rem 0' }}>
          <Chart type="area" data={revenueData} height={200} color="var(--color-secondary)" />
        </div>
      </Card>

      {/* 4. Inbox and Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
        
        <Card title="Recent Client Messages" subtitle="Priority inbox updates">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentMessages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{msg.sender}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{msg.time}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  "{msg.snippet}"
                </p>
                <div>
                  <Tag colorway={getSentimentColor(msg.sentiment)}>{msg.sentimentLabel}</Tag>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Quick Actions" subtitle="Frequently used tools">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button
              onClick={() => triggerAICommand('Analyze Tokyo booking')}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '1.5rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', cursor: 'pointer', gap: '8px', transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'var(--color-soft-blue)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              <BrainCircuit className="w-6 h-6 text-sky-500" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>AI Analyze</span>
            </button>

            <button
              onClick={() => triggerAICommand('Draft pitch email')}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '1.5rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', cursor: 'pointer', gap: '8px', transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'var(--color-soft-blue)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              <Send className="w-6 h-6 text-emerald-500" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Draft Pitch</span>
            </button>

            <button
              onClick={() => triggerAICommand('Schedule client check in')}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '1.5rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', cursor: 'pointer', gap: '8px', transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'var(--color-soft-blue)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              <Calendar className="w-6 h-6 text-amber-500" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Schedule</span>
            </button>

            <button
              onClick={() => triggerAICommand('Upsell hotel')}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '1.5rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', cursor: 'pointer', gap: '8px', transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'var(--color-soft-blue)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              <Layers className="w-6 h-6 text-rose-500" />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Upsell</span>
            </button>
          </div>
        </Card>

      </div>
    </div>
  );
};
