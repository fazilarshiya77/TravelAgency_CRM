import React from 'react';
import { Card } from '../components/ui/Card';
import { Chart } from '../components/ui/Chart';
import { MetricCard } from '../components/ui/MetricCard';
import { Tag } from '../components/ui/Tag';
import { TrendingUp, Sparkles, IndianRupee } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const commissionsData = [
    { label: 'Q1-25', value: 34000 },
    { label: 'Q2-25', value: 48000 },
    { label: 'Q3-25', value: 52000 },
    { label: 'Q4-25', value: 68000 },
    { label: 'Q1-26', value: 74000 },
    { label: 'Q2-26', value: 92000 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.4s ease-out forwards' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem' }}>Reporting & Predictive Forecasts</h2>
          <p className="body-normal" style={{ marginTop: '0.25rem' }}>
            Historical commission breakdowns, sales performance targets, and predictive trends.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', backgroundColor: 'var(--color-mint)', color: 'var(--color-mint-dark)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, alignItems: 'center' }}>
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>95% Forecast Confidence Margin</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <MetricCard
          label="Total Projected Commission"
          value="₹92,400"
          change={24.5}
          changeLabel="vs target commission"
          icon={<IndianRupee className="w-4 h-4" />}
          sparkline={[70, 75, 80, 84, 88, 92]}
        />
        <MetricCard
          label="Average Booking Revenue"
          value="₹14,500"
          change={12.2}
          changeLabel="vs last year average"
          icon={<TrendingUp className="w-4 h-4" />}
          sparkline={[12, 12.5, 13, 13.8, 14.1, 14.5]}
        />
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Commission Growth Bar Chart */}
        <Card
          title="Quarterly Commission Growth"
          subtitle="Total commission earned across the last 6 quarters"
          headerActions={<Tag colorway="soft-blue">Actual Commission</Tag>}
        >
          <div style={{ padding: '1rem 0' }}>
            <Chart type="bar" data={commissionsData} height={200} color="var(--color-secondary)" />
          </div>
        </Card>

        {/* Prediction Summary */}
        <Card
          title="AI Predictive Diagnostics"
          subtitle="Model outputs for the next 90 days"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>1. Customer Lifetime Value (LTV) Forecast</div>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                Expected average client LTV is projected to scale to ₹18,400 by Q4 due to a rise in repeat travelers requesting luxury safaris.
              </p>
            </div>
            
            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>2. Destination Popularity Trends</div>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                Kyoto Sanctuary stays and Antarctica premium cruises are showing a 42% climb in inquiry volumes. Recommend preparing pre-arranged room blocks.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>3. Staff Resource Optimization</div>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                Lead response times typically peak on Tuesdays. Recommendation: automated scheduling of follow-up tasks via Naaz Travels flows.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
