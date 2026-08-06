import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Chart } from '../components/ui/Chart';
import { MetricCard } from '../components/ui/MetricCard';
import { Tag } from '../components/ui/Tag';
import {
  TrendingUp,
  Sparkles,
  IndianRupee,
  Activity,
  Layers,
  Map,
  BrainCircuit,
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'financials' | 'conversions' | 'destinations' | 'ai'>('financials');
  const [forecastWindow, setForecastWindow] = useState<30 | 60 | 90>(90);

  // Financial chart data
  const revenueData = [
    { label: 'Feb-26', value: 1200000 },
    { label: 'Mar-26', value: 1850000 },
    { label: 'Apr-26', value: 1500000 },
    { label: 'May-26', value: 2100000 },
    { label: 'Jun-26', value: 2400000 },
    { label: 'Jul-26', value: 2750000 },
  ];

  const expensesData = [
    { label: 'Feb-26', value: 850000 },
    { label: 'Mar-26', value: 1300000 },
    { label: 'Apr-26', value: 1100000 },
    { label: 'May-26', value: 1550000 },
    { label: 'Jun-26', value: 1700000 },
    { label: 'Jul-26', value: 1950000 },
  ];

  // Destination performance data
  const destinationData = [
    { label: 'Amalfi Coast', value: 2420000 },
    { label: 'Kyoto Meditation', value: 756500 },
    { label: 'Serengeti Safari', value: 2720000 },
    { label: 'Swiss Alps Hiking', value: 1232500 },
  ];

  // Lead conversions data
  const conversionBySource = [
    { source: 'Organic Search', leads: 48, converted: 18, rate: 37.5 },
    { source: 'Google Campaign', leads: 92, converted: 26, rate: 28.2 },
    { source: 'Instagram Lead', leads: 64, converted: 12, rate: 18.7 },
    { source: 'Agency Returnee', leads: 22, converted: 15, rate: 68.1 },
    { source: 'Word of Mouth', leads: 15, converted: 9, rate: 60.0 },
  ];

  // Employee conversion leaderboard
  const employeePerformance = [
    { name: 'Emma Watson', leads: 34, won: 18, rate: 52.9, volume: 4250000 },
    { name: 'Sophia Loren', leads: 40, won: 15, rate: 37.5, volume: 3820000 },
    { name: 'Liam Neeson', leads: 28, won: 12, rate: 42.8, volume: 2900000 },
    { name: 'Angelina Jolie', leads: 22, won: 8, rate: 36.3, volume: 1850000 },
  ];

  // AI Dynamic forecasting outputs based on predictive window
  const getAiForecasts = (window: number) => {
    const factor = window / 30;
    return {
      projectedLtv: Math.round(14500 + 1300 * factor),
      cancellationRate: (4.2 - 0.3 * factor).toFixed(1),
      upsellConversion: Math.round(24 + 1.5 * factor),
      topTargetDestination: window === 90 ? 'Antarctica Luxury Cruises' : 'Kyoto Sanctuary',
      adWordROI: (320 + 12 * factor).toFixed(0),
    };
  };

  const aiOutput = getAiForecasts(forecastWindow);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.4s ease-out forwards' }}>
      
      {/* Header and Switcher Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Reporting & Business Intelligence</h2>
          <p className="body-normal" style={{ color: 'var(--text-secondary)' }}>
            Track profit margins, monitor lead capture ratios, evaluate team performances, and run AI predictive models.
          </p>
        </div>

        {/* Tab Swappers */}
        <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.04)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
          <button
            onClick={() => setActiveTab('financials')}
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'financials' ? 600 : 500,
              backgroundColor: activeTab === 'financials' ? '#fff' : 'transparent',
              color: activeTab === 'financials' ? '#0C182F' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Activity className="w-4 h-4" />
            Financials
          </button>
          <button
            onClick={() => setActiveTab('conversions')}
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'conversions' ? 600 : 500,
              backgroundColor: activeTab === 'conversions' ? '#fff' : 'transparent',
              color: activeTab === 'conversions' ? '#0C182F' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Layers className="w-4 h-4" />
            Conversions
          </button>
          <button
            onClick={() => setActiveTab('destinations')}
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'destinations' ? 600 : 500,
              backgroundColor: activeTab === 'destinations' ? '#fff' : 'transparent',
              color: activeTab === 'destinations' ? '#0C182F' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Map className="w-4 h-4" />
            Destinations
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'ai' ? 600 : 500,
              backgroundColor: activeTab === 'ai' ? '#fff' : 'transparent',
              color: activeTab === 'ai' ? '#0C182F' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <BrainCircuit className="w-4 h-4" />
            AI Insights
          </button>
        </div>
      </div>

      {/* METRICS ROW (Reconciles dynamic core values) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <MetricCard
          label="Total Project Revenue"
          value="₹71,68,000"
          change={18.4}
          changeLabel="vs target forecasting"
          icon={<IndianRupee className="w-4 h-4" />}
          sparkline={[50, 58, 62, 65, 68, 71]}
        />
        <MetricCard
          label="Net Operating Expenses"
          value="₹52,24,000"
          change={-6.2}
          changeLabel="reclaimed cost locks"
          icon={<TrendingUp className="w-4 h-4" />}
          sparkline={[48, 50, 51, 51, 52, 52]}
        />
        <MetricCard
          label="Estimated Profit Margin"
          value="₹19,44,000"
          change={24.2}
          changeLabel="vs last year average"
          icon={<Sparkles className="w-4 h-4 text-amber-500" />}
          sparkline={[10, 12, 14, 16, 18, 19]}
        />
      </div>

      {/* WORKSPACE VIEWS */}

      {/* Tab 1: Financials */}
      {activeTab === 'financials' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <Card
            title="Monthly Sales Volume Trend"
            subtitle="Gross bookings revenue compiled over the last 6 months"
            headerActions={<Tag colorway="soft-blue">Gross Revenue</Tag>}
          >
            <div style={{ padding: '1rem 0' }}>
              <Chart type="area" data={revenueData} height={220} color="var(--color-secondary)" />
            </div>
          </Card>

          <Card
            title="Monthly Payout Expenses"
            subtitle="Supplier commissions, DMC balances, and travel tax expenses"
            headerActions={<Tag colorway="peach">Operating Expenses</Tag>}
          >
            <div style={{ padding: '1rem 0' }}>
              <Chart type="bar" data={expensesData} height={220} color="var(--color-warning)" />
            </div>
          </Card>
        </div>
      )}

      {/* Tab 2: Conversions */}
      {activeTab === 'conversions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Conversion rates table by source */}
          <Card title="Lead Acquisition Channels Performance">
            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '1rem' }}>Acquisition Channel</th>
                    <th style={{ padding: '1rem' }}>Leads Logged</th>
                    <th style={{ padding: '1rem' }}>Won Bookings</th>
                    <th style={{ padding: '1rem' }}>Conversion Rate</th>
                    <th style={{ padding: '1rem' }}>Performance Health</th>
                  </tr>
                </thead>
                <tbody>
                  {conversionBySource.map((src, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>{src.source}</td>
                      <td style={{ padding: '1rem' }}>{src.leads}</td>
                      <td style={{ padding: '1rem' }}>{src.converted}</td>
                      <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--color-secondary)' }}>{src.rate}%</td>
                      <td style={{ padding: '1rem' }}>
                        <Tag colorway={src.rate >= 50 ? 'mint' : src.rate >= 25 ? 'soft-blue' : 'peach'}>
                          {src.rate >= 50 ? 'HIGH PERFORMING' : src.rate >= 25 ? 'STABLE' : 'OPTIMIZATION NEEDED'}
                        </Tag>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Employee conversion leaderboard */}
          <Card title="Consultant Conversion & Sales Leaderboard">
            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <th style={{ padding: '1rem' }}>Consultant</th>
                    <th style={{ padding: '1rem' }}>Total Managed</th>
                    <th style={{ padding: '1rem' }}>Total Won</th>
                    <th style={{ padding: '1rem' }}>Win Rate (%)</th>
                    <th style={{ padding: '1rem' }}>Gross Booking Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {employeePerformance.map((emp, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                          {emp.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        {emp.name}
                      </td>
                      <td style={{ padding: '1rem' }}>{emp.leads}</td>
                      <td style={{ padding: '1rem' }}>{emp.won}</td>
                      <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--color-success)' }}>{emp.rate}%</td>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>₹{emp.volume.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 3: Destinations */}
      {activeTab === 'destinations' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Destination Chart */}
          <Card
            title="Destination Bookings Volume"
            subtitle="Gross booking counts registered per excursion package"
            headerActions={<Tag colorway="soft-blue">Gross Bookings</Tag>}
          >
            <div style={{ padding: '1rem 0' }}>
              <Chart type="bar" data={destinationData} height={240} color="var(--color-secondary)" />
            </div>
          </Card>

          {/* Detailed destinations performance list */}
          <Card title="Seasonality & Profit Margin Analytics">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>Serengeti Safari, Tanzania</strong>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Peak Season: Jul - Oct | Avg Margin: 15%</div>
                </div>
                <Tag colorway="mint">LEADER</Tag>
              </div>

              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>Amalfi Coast Luxury, Italy</strong>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Peak Season: May - Sep | Avg Margin: 18%</div>
                </div>
                <Tag colorway="soft-blue">HIGH PROFIT</Tag>
              </div>

              <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>Kyoto Sanctuary, Japan</strong>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Peak Season: Mar - May | Avg Margin: 12%</div>
                </div>
                <Tag colorway="sand">STABLE</Tag>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>Swiss Alps Hiking, Switzerland</strong>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Peak Season: Jun - Sep | Avg Margin: 10%</div>
                </div>
                <Tag colorway="sand">STABLE</Tag>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tab 4: AI insights */}
      {activeTab === 'ai' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '1.5rem' }}>
          
          {/* Predictive control pane */}
          <Card title="AI Prediction Engine Parameters">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Adjust the prediction timeline window below. The AI forecast model will dynamically recalculate margins, CLV ratios, and cancellation risks instantly.
              </p>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                  Target Forecasting Window
                </label>
                <div style={{ display: 'flex', gap: '8px', backgroundColor: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  {[30, 60, 90].map((win) => (
                    <button
                      key={win}
                      onClick={() => setForecastWindow(win as any)}
                      style={{
                        flex: 1,
                        padding: '6px 0',
                        fontSize: '0.8rem',
                        fontWeight: forecastWindow === win ? 600 : 500,
                        backgroundColor: forecastWindow === win ? '#38BDF8' : 'transparent',
                        color: forecastWindow === win ? '#0C182F' : 'var(--text-secondary)',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {win} Days
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.725rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600 }}>Confidence Index</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flex: 1, height: '8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '95%', height: '100%', backgroundColor: 'var(--color-success)' }}></div>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-success)' }}>95% Margin</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Predictive values breakdown board */}
          <Card
            title="AI Diagnostic Forecasts & Targets"
            headerActions={
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.725rem', color: 'var(--color-success)', fontWeight: 600 }}>
                <Sparkles className="w-4 h-4 text-emerald-500" /> Auto-recalculated
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                <div>
                  <strong style={{ fontSize: '0.875rem' }}>Projected Customer Lifetime Value (CLV)</strong>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Expected gross payout value per repeat client contract</div>
                </div>
                <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-secondary)' }}>₹{aiOutput.projectedLtv.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                <div>
                  <strong style={{ fontSize: '0.875rem' }}>Cancellation Probability Ratio</strong>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Likelihood of unconfirmed itinerary cancellations</div>
                </div>
                <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-danger)' }}>{aiOutput.cancellationRate}%</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                <div>
                  <strong style={{ fontSize: '0.875rem' }}>Upsell & Upgrade Conversion Rate</strong>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Expected client locks on villa or charter upgrades</div>
                </div>
                <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-success)' }}>{aiOutput.upsellConversion}%</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.875rem' }}>Target High-ROI Marketing Destination</strong>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px' }}>AI recommendation for premium email and WhatsApp campaigns</div>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '4px 8px', borderRadius: '6px', border: '1px solid rgba(56,189,248,0.2)' }}>
                  {aiOutput.topTargetDestination}
                </span>
              </div>

            </div>
          </Card>

        </div>
      )}

    </div>
  );
};
