import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Chart } from '../components/ui/Chart';
import { Tag } from '../components/ui/Tag';
import {
  IndianRupee,
  UserCheck,
  Compass,
  Sparkles,
  BrainCircuit,
  Sun,
  CloudRain,
  Wind,
  Send,
  Calendar,
  Layers,
  MapPin,
  Award,
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface ActivityItem {
  id: string;
  time: string;
  agent: string;
  action: string;
  target: string;
  type: 'success' | 'info' | 'warning';
}

interface MessageItem {
  id: string;
  sender: string;
  snippet: string;
  sentiment: 'positive' | 'warning' | 'danger';
  sentimentLabel: string;
  time: string;
}

interface WeatherItem {
  city: string;
  temp: number;
  condition: string;
  icon: 'sun' | 'rain' | 'wind';
}

interface DestinationItem {
  name: string;
  conversion: string;
  growth: string;
  price: string;
  colorway: 'soft-blue' | 'peach' | 'mint' | 'sand';
}

export const DashboardView: React.FC = () => {
  const { triggerAICommand } = useNavigation();
  const [activeWeatherIndex, setActiveWeatherIndex] = useState(0);

  // Revenue chart data: Current vs AI Forecasted projections
  const revenueData = [
    { label: 'Jan', value: 38000 },
    { label: 'Feb', value: 45000 },
    { label: 'Mar', value: 58000 },
    { label: 'Apr', value: 52000 },
    { label: 'May', value: 72000 },
    { label: 'Jun', value: 94000 },
    { label: 'Jul', value: 148000 },
  ];

  // Activities log feed
  const activities: ActivityItem[] = [
    { id: 'act-1', time: '10m ago', agent: 'Fazil A.', action: 'Closed booking', target: 'Tokyo Ryokan Pack #BKG-9921', type: 'success' },
    { id: 'act-2', time: '35m ago', agent: 'AI Copilot', action: 'Triggered risk alert', target: 'Amalfi hotel overlap check', type: 'warning' },
    { id: 'act-3', time: '2h ago', agent: 'Fazil A.', action: 'Drafted itinerary pitch', target: 'Sharma Wine Excursion', type: 'info' },
    { id: 'act-4', time: '4h ago', agent: 'Fazil A.', action: 'Created new contact profile', target: 'Selina Kyle', type: 'info' },
  ];

  // Client messages with sentiment ratings
  const recentMessages: MessageItem[] = [
    { id: 'msg-1', sender: 'Neha Sharma', snippet: 'Can we add a private helicopter tour to Tuscany?', sentiment: 'positive', sentimentLabel: 'Exceptional (98%)', time: '5m ago' },
    { id: 'msg-2', sender: 'Vikram Malhotra', snippet: 'Flight schedule LH-402 shows a gate change. Verify?', sentiment: 'warning', sentimentLabel: 'Neutral (72%)', time: '1h ago' },
    { id: 'msg-3', sender: 'Priya Patel', snippet: 'Amalfi hotel says premium suite is double-booked.', sentiment: 'danger', sentimentLabel: 'Urgent (22%)', time: '3h ago' },
  ];

  // Destination weather indices
  const weatherList: WeatherItem[] = [
    { city: 'Florence, Italy', temp: 26, condition: 'Sunny', icon: 'sun' },
    { city: 'Kyoto, Japan', temp: 21, condition: 'Rainy', icon: 'rain' },
    { city: 'Serengeti, Tanzania', temp: 24, condition: 'Windy', icon: 'wind' },
  ];

  // Trending destinations
  const popularDestinations: DestinationItem[] = [
    { name: 'Amalfi Coast Villa Pack', conversion: '92%', growth: '+18%', price: '₹12,500', colorway: 'soft-blue' },
    { name: 'Kyoto Sanctuary Package', conversion: '85%', growth: '+24%', price: '₹8,900', colorway: 'peach' },
    { name: 'Serengeti Photo Safari', conversion: '78%', growth: '+14%', price: '₹22,000', colorway: 'mint' },
    { name: 'Swiss Alps Premium Chalet', conversion: '64%', growth: '+8%', price: '₹14,200', colorway: 'sand' },
  ];

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'sun': return <Sun className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '20s' }} />;
      case 'rain': return <CloudRain className="w-5 h-5 text-sky-500 animate-bounce" style={{ animationDuration: '2s' }} />;
      case 'wind':
      default:
        return <Wind className="w-5 h-5 text-teal-500 animate-pulse" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'mint';
      case 'warning': return 'peach';
      case 'danger':
      default:
        return 'danger';
    }
  };

  const [dashboardTab, setDashboardTab] = useState<'overview' | 'analytics' | 'ops'>('overview');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.4s ease-out forwards' }}>
      
      {/* 1. Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Enterprise Portal
            </span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--text-tertiary)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>System Active</span>
          </div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem', marginTop: '0.25rem' }}>
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
            Here is your agency portfolio report. AI metrics predict an 84% conversion probability for leads en route.
          </p>
        </div>


      </div>

      {/* 2. Modern Tab Selector */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', gap: '1rem', marginBottom: '-0.5rem', overflowX: 'auto', paddingBottom: '2px' }}>
        {([
          { key: 'overview', label: 'Overview', desc: 'Core metrics, maps & funnel' },
          { key: 'analytics', label: 'AI Analytics', desc: 'Revenue charts & forecast targets' },
          { key: 'ops', label: 'Operations & Leaderboard', desc: 'Trending places, weather & staff performance' },
        ] as const).map((tab) => {
          const isActive = dashboardTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setDashboardTab(tab.key)}
              style={{
                border: 'none',
                background: 'transparent',
                padding: '10px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                transition: 'all var(--transition-fast)',
                minWidth: '160px',
              }}
            >
              <span style={{
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-secondary)' : 'var(--text-secondary)',
              }}>
                {tab.label}
              </span>
              <span style={{
                fontSize: '0.675rem',
                color: 'var(--text-tertiary)',
              }}>
                {tab.desc}
              </span>
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2.5px',
                  backgroundColor: 'var(--color-secondary)',
                  borderRadius: '2px',
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}

      {/* TAB: OVERVIEW */}
      {dashboardTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.3s ease-out forwards' }}>
          {/* Today's Summary Metrics grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <MetricCard
              label="Today's Closed Revenue"
              value="₹148,000"
              change={18.4}
              changeLabel="vs target sales"
              icon={<IndianRupee className="w-4 h-4" />}
              sparkline={[90, 110, 105, 125, 118, 132, 148]}
              aiInsight="Luxury Italian hotel additions closes target margin by +₹3.2K."
            />
            <MetricCard
              label="Active Bookings Status"
              value="42 Completed Reservations"
              change={8.2}
              icon={<UserCheck className="w-4 h-4" />}
              sparkline={[32, 34, 35, 34, 38, 40, 42]}
              aiInsight="Pending hotel room blocks are auto-confirming in 2 destinations."
            />
            <MetricCard
              label="Upcoming Client Excursions"
              value="18 Live Trips"
              change={-2.5}
              icon={<Compass className="w-4 h-4" />}
              sparkline={[20, 18, 19, 21, 20, 19, 18]}
              aiInsight="Weather checks en route are 100% compliant with flights schedule."
            />
          </div>

          {/* Travel Map & Funnel Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.1fr', gap: '1.5rem', alignItems: 'stretch' }}>
            {/* World Travel Map */}
            <Card
              title="Active Global Travel Routes"
              subtitle="Real-time locations tracking live client excursions"
              headerActions={
                <div style={{ display: 'flex', gap: '4px' }}>
                  <Tag colorway="mint">4 Flights Active</Tag>
                  <Tag colorway="soft-blue">3 Hotels Safe</Tag>
                </div>
              }
            >
              <div style={{ position: 'relative', width: '100%', height: '230px', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 400 200" width="100%" height="100%" style={{ opacity: 0.8 }}>
                  <path d="M50 60 Q 60 40, 90 50 T 130 65 T 160 50 T 210 42 T 260 70 T 320 60 T 370 75" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="3 3" />
                  <path d="M40 120 Q 80 130, 110 115 T 160 140 T 210 160 T 260 130 T 310 145 T 350 120" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="3 3" />
                  <path d="M 80,80 Q 135,45 190,75" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse-soft" style={{ animationDuration: '4s' }} />
                  <path d="M 190,75 Q 205,105 220,135" fill="none" stroke="var(--color-peach-dark)" opacity="0.3" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 80,80 Q 210,35 340,90" fill="none" stroke="var(--color-secondary)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <g transform="translate(80, 80)">
                    <circle r="8" fill="var(--color-accent)" opacity="0.25" className="map-ping-pulse" />
                    <circle r="4.5" fill="var(--color-secondary)" stroke="#FFFFFF" strokeWidth="1.5" />
                  </g>
                  <g transform="translate(190, 75)">
                    <circle r="8" fill="var(--color-accent)" opacity="0.25" className="map-ping-pulse" style={{ animationDelay: '0.5s' }} />
                    <circle r="4.5" fill="var(--color-secondary)" stroke="#FFFFFF" strokeWidth="1.5" />
                  </g>
                  <g transform="translate(220, 135)">
                    <circle r="8" fill="var(--color-mint)" opacity="0.25" className="map-ping-pulse" style={{ animationDelay: '1s' }} />
                    <circle r="4.5" fill="var(--color-success)" stroke="#FFFFFF" strokeWidth="1.5" />
                  </g>
                  <g transform="translate(340, 90)">
                    <circle r="8" fill="var(--color-accent)" opacity="0.25" className="map-ping-pulse" style={{ animationDelay: '1.5s' }} />
                    <circle r="4.5" fill="var(--color-secondary)" stroke="#FFFFFF" strokeWidth="1.5" />
                  </g>
                </svg>
                <div style={{ position: 'absolute', bottom: '8px', left: '10px', display: 'flex', gap: '8px', pointerEvents: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                    <MapPin className="w-3 h-3 text-sky-500" />
                    <span style={{ color: 'var(--text-secondary)' }}>JFK Departures</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    <span style={{ color: 'var(--text-secondary)' }}>Serengeti photo</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Sales Funnel */}
            <Card title="Sales Pipeline Funnel" subtitle="Conversions from inquiry to closed bookings">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', padding: '0.5rem 0' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>1. Inquiries</span>
                    <span>128 Leads</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-soft-blue)', borderRadius: '4px' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>2. Proposals Sent</span>
                    <span>84 Leads (65%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '65%', height: '100%', backgroundColor: 'var(--color-peach)', borderRadius: '4px' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>3. Under Negotiation</span>
                    <span>42 Leads (50%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '32%', height: '100%', backgroundColor: 'var(--color-sand)', borderRadius: '4px' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>4. Closed & Booked</span>
                    <span>28 Won (66%)</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '22%', height: '100%', backgroundColor: 'var(--color-mint)', borderRadius: '4px' }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Activity and Client Inbox */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
            <Card
              title="Recent Agent Activity"
              subtitle="Time-ordered feed of CRM logs"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: '0.25rem 0' }}>
                {activities.map((act) => (
                  <div key={act.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{act.agent}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{act.action}</span>
                      </div>
                      <div style={{ fontSize: '0.725rem', color: 'var(--text-tertiary)', marginTop: '2px' }}>{act.target}</div>
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{act.time}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card
              title="Agency Client Inbox"
              subtitle="Real-time feedback showing sentiment tags"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      borderBottom: '1px solid var(--border-light)',
                      paddingBottom: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{msg.sender}</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{msg.time}</span>
                    </div>
                    <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '350px' }}>
                      "{msg.snippet}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>AI sentiment:</span>
                      <Tag colorway={getSentimentColor(msg.sentiment)}>
                        {msg.sentimentLabel}
                      </Tag>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB: AI ANALYTICS */}
      {dashboardTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.3s ease-out forwards' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
            {/* Double-series Chart */}
            <Card
              title="Revenue & Commission Growth"
              subtitle="Comparing active invoice volume against predictive AI projections"
            >
              <div style={{ padding: '0.5rem 0' }}>
                <Chart type="area" data={revenueData} height={200} color="var(--color-secondary)" />
              </div>
            </Card>

            {/* Predictive Analytics card */}
            <Card
              title="AI Predictive Metrics"
              subtitle="Model outputs based on client booking behaviors"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.25rem 0' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Close Win Probability Index</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-success)' }}>84.7%</span>
                  </div>
                  <div style={{ height: '6px', width: '100%', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '84.7%', height: '100%', backgroundColor: 'var(--color-success)', borderRadius: '3px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Target Client LTV Growth</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-secondary)' }}>+₹18,400</span>
                  </div>
                  <div style={{ height: '6px', width: '100%', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '74%', height: '100%', backgroundColor: 'var(--color-secondary)', borderRadius: '3px' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Forecasted Commission</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹74,500</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>At-Risk Revenue</span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-danger)' }}>₹6,400</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Insights feed */}
          <Card
            title="AI Insights feed"
            subtitle="Real-time optimization diagnostics"
            headerActions={<Tag colorway="mint">Active recommendations</Tag>}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '0.25rem 0' }}>
              <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-sand)', border: '1px solid rgba(254, 243, 199, 0.4)', display: 'flex', gap: '8px' }}>
                <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-sand-dark)' }}>Upsell Excursions Upgrade</div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
                    Sophia Loren is closing Tokyo. Suggest private Ryokan tea ceremony package upgrade to boost commissions.
                  </p>
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-soft-blue)', border: '1px solid rgba(234, 248, 255, 0.4)', display: 'flex', gap: '8px' }}>
                <Sparkles className="w-4 h-4 text-sky-500 flex-shrink-0" style={{ marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-soft-blue-dark)' }}>Amalfi Overlap Mitigation</div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
                    Double booking risk flagged at Hotel de la Ville. Pitch VIP room transfer options en route.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB: OPERATIONS & LEADERBOARD */}
      {dashboardTab === 'ops' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.3s ease-out forwards' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', alignItems: 'stretch' }}>
            {/* Trending Luxury Packages */}
            <Card
              title="Trending Luxury Packages"
              subtitle="Trending locations prioritized by customer interest index"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {popularDestinations.map((dest, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{dest.name}</div>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '4px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Win Index:</span>
                        <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--color-secondary)' }}>{dest.conversion}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontWeight: 600, marginLeft: '4px' }}>
                          {dest.growth}
                        </span>
                      </div>
                    </div>
                    <Tag colorway={dest.colorway}>
                      {dest.price}
                    </Tag>
                  </div>
                ))}
              </div>
            </Card>

            {/* Destination Weather */}
            <Card
              title="Destination Weather"
              subtitle="Real-time updates for clients en route"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {weatherList.map((item, idx) => {
                    const isActive = activeWeatherIndex === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveWeatherIndex(idx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isActive ? 'var(--color-soft-blue)' : '#FFFFFF',
                          border: '1px solid var(--border-light)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.03)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) e.currentTarget.style.backgroundColor = '#FFFFFF';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {getWeatherIcon(item.icon)}
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.city}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isActive ? 'var(--color-secondary)' : 'var(--text-primary)' }}>
                            {item.temp}°C
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{item.condition}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Top Performing Agents */}
            <Card
              title="Top Performing Agents"
              subtitle="Current month close-rates closed volumes"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#D1FAE5', color: '#065F46', fontWeight: 700, fontSize: '0.75rem' }}>
                      SL
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>Sophia Loren</div>
                      <div style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Close Rate: 94%</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>₹84.2K</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2px', fontSize: '0.65rem', color: 'var(--color-success)', fontWeight: 600 }}>
                      <Award className="w-3 h-3" />
                      <span>Rank 1</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#EAF8FF', color: '#0369A1', fontWeight: 700, fontSize: '0.75rem' }}>
                      LN
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>Liam Neeson</div>
                      <div style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Close Rate: 88%</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>₹58.1K</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>Rank 2</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFE8D6', color: '#78350F', fontWeight: 700, fontSize: '0.75rem' }}>
                      EW
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>Emma Watson</div>
                      <div style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Close Rate: 86%</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>₹46.5K</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>Rank 3</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Action Center */}
          <Card title="Quick Action Center" subtitle="Instantly trigger CRM triggers">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <button
                onClick={() => triggerAICommand('Analyze Tokyo booking')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 20px',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  gap: '12px',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.backgroundColor = 'var(--color-soft-blue)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <BrainCircuit className="w-5 h-5 text-sky-500" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>AI Analyze</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Inspect reservation risks</div>
                </div>
              </button>

              <button
                onClick={() => triggerAICommand('Draft pitch email')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 20px',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  gap: '12px',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.backgroundColor = 'var(--color-soft-blue)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Send className="w-5 h-5 text-emerald-500" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Draft Pitch</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Generate travel package pitch</div>
                </div>
              </button>

              <button
                onClick={() => triggerAICommand('Schedule client check in')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 20px',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  gap: '12px',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.backgroundColor = 'var(--color-soft-blue)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Calendar className="w-5 h-5 text-amber-500" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Schedule Check-in</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Add follow-up task to calendar</div>
                </div>
              </button>

              <button
                onClick={() => triggerAICommand('Upsell hotel')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 20px',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  gap: '12px',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.backgroundColor = 'var(--color-soft-blue)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Layers className="w-5 h-5 text-rose-500" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>Upsell Room</div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Auto-generate VIP hotel upgrade</div>
                </div>
              </button>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
};
