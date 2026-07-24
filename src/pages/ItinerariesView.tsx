import React from 'react';
import { Card } from '../components/ui/Card';
import { Timeline } from '../components/ui/Timeline';
import { Tag } from '../components/ui/Tag';
import { Button } from '../components/ui/Button';
import { Calendar, Share2 } from 'lucide-react';

export const ItinerariesView: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.4s ease-out forwards' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem' }}>Itinerary Planner Hub</h2>
          <p className="body-normal" style={{ marginTop: '0.25rem' }}>
            Build and optimize luxury client routes dynamically, with automatic time-clash checks.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Calendar className="w-4 h-4" />}>
          New Route Plan
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Active Itinerary List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card interactive title="Sharma Family Italy trip" subtitle="JFK - Rome - Florence - JFK" variant="soft-blue">
            <div style={{ display: 'flex', gap: '4px', marginTop: '0.5rem' }}>
              <Tag colorway="mint">9 Days</Tag>
              <Tag colorway="soft-blue">4 Nodes</Tag>
              <Tag colorway="peach">VIP Luxury</Tag>
            </div>
          </Card>
          
          <Card interactive title="Priya Patel Japan Retreat" subtitle="LAX - Kyoto - Tokyo - LAX" variant="white">
            <div style={{ display: 'flex', gap: '4px', marginTop: '0.5rem' }}>
              <Tag colorway="peach">8 Days</Tag>
              <Tag colorway="soft-blue">3 Nodes</Tag>
              <Tag colorway="sand">Ryokan Pack</Tag>
            </div>
          </Card>

          <Card interactive title="Rajesh Iyer Photo Safari" subtitle="JFK - Nairobi - Serengeti - JFK" variant="white">
            <div style={{ display: 'flex', gap: '4px', marginTop: '0.5rem' }}>
              <Tag colorway="mint">12 Days</Tag>
              <Tag colorway="peach">6 Nodes</Tag>
              <Tag colorway="sand">Tented Camp</Tag>
            </div>
          </Card>
        </div>

        {/* Detailed Timeline View */}
        <Card
          title="Sharma Family Itinerary Details"
          subtitle="JFK Departures & Italy Excursion Timelines"
          headerActions={
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="secondary" size="sm" leftIcon={<Share2 className="w-3 h-3" />}>
                Export PDF
              </Button>
            </div>
          }
        >
          {/* Timeline block */}
          <div style={{ padding: '1rem 0' }}>
            <Timeline />
          </div>


        </Card>
      </div>
    </div>
  );
};
