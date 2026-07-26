import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import {
  Car,
  Key,
  History,
} from 'lucide-react';

interface CarInfo {
  id: string;
  model: string;
  type: string;
  costPerDay: number;
  costPerKm: number;
  status: 'available' | 'rented' | 'maintenance';
}

interface RentalInfo {
  id: string;
  carId: string;
  carModel: string;
  client: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  totalDistance?: number;
  totalCost?: number;
  driverName?: string;
  driverContact?: string;
}

const mockCars: CarInfo[] = [
  { id: 'CAR-001', model: 'Toyota Innova Crysta', type: 'SUV', costPerDay: 2500, costPerKm: 15, status: 'available' },
  { id: 'CAR-002', model: 'Honda City', type: 'Sedan', costPerDay: 1800, costPerKm: 12, status: 'rented' },
  { id: 'CAR-003', model: 'Suzuki Swift Dzire', type: 'Sedan', costPerDay: 1200, costPerKm: 10, status: 'available' },
  { id: 'CAR-004', model: 'Mercedes-Benz E-Class', type: 'Luxury', costPerDay: 8000, costPerKm: 40, status: 'rented' },
  { id: 'CAR-005', model: 'Mahindra Scorpio-N', type: 'SUV', costPerDay: 3000, costPerKm: 18, status: 'maintenance' },
];

const mockRentals: RentalInfo[] = [
  { id: 'RENT-101', carId: 'CAR-002', carModel: 'Honda City', client: 'Amit Sharma', startDate: '2026-07-22', endDate: '2026-07-28', status: 'active', driverName: 'Raj Kumar', driverContact: '+91 9876543210' },
  { id: 'RENT-102', carId: 'CAR-004', carModel: 'Mercedes-Benz E-Class', client: 'Priya Patel', startDate: '2026-07-24', endDate: '2026-07-26', status: 'active', driverName: 'Suresh Singh', driverContact: '+91 9876543211' },
  { id: 'RENT-099', carId: 'CAR-001', carModel: 'Toyota Innova Crysta', client: 'Ravi Kumar', startDate: '2026-07-10', endDate: '2026-07-15', status: 'completed', totalDistance: 450, totalCost: 19250, driverName: 'Mukesh Bhai', driverContact: '+91 9876543212' },
  { id: 'RENT-098', carId: 'CAR-003', carModel: 'Suzuki Swift Dzire', client: 'Anita Singh', startDate: '2026-07-05', endDate: '2026-07-08', status: 'completed', totalDistance: 200, totalCost: 5600, driverName: 'Arjun Das', driverContact: '+91 9876543213' },
];

export const CarServiceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'available' | 'rented' | 'history'>('available');

  const availableCars = mockCars.filter(c => c.status === 'available');
  const activeRentals = mockRentals.filter(r => r.status === 'active');
  const pastRentals = mockRentals.filter(r => r.status === 'completed');

  return (
    <div style={{ animation: 'page-enter 0.4s ease-out forwards' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Car Service</h2>
          <p className="body-normal" style={{ color: 'var(--text-secondary)' }}>
            Manage fleet availability, track active rentals, and review past hirings.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <Card interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.5rem' }}>Available Fleet</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{availableCars.length}</div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(56, 189, 248, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--color-secondary)' }}>
              <Car className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.5rem' }}>Currently Rented</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeRentals.length}</div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--color-warning)' }}>
              <Key className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.5rem' }}>Past Hirings</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{pastRentals.length}</div>
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-md)', color: 'var(--color-success)' }}>
              <History className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      <Card>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem', paddingBottom: '1rem' }}>
          <button
            onClick={() => setActiveTab('available')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: activeTab === 'available' ? 'var(--color-secondary)' : 'transparent',
              color: activeTab === 'available' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            Available Cars
          </button>
          <button
            onClick={() => setActiveTab('rented')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: activeTab === 'rented' ? 'var(--color-secondary)' : 'transparent',
              color: activeTab === 'rented' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            Active Rentals
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: activeTab === 'history' ? 'var(--color-secondary)' : 'transparent',
              color: activeTab === 'history' ? '#fff' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            Past Hirings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'available' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '1rem' }}>Car Model</th>
                  <th style={{ padding: '1rem' }}>Type</th>
                  <th style={{ padding: '1rem' }}>Cost / Day</th>
                  <th style={{ padding: '1rem' }}>Charge / Km</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {availableCars.map(car => (
                  <tr key={car.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{car.model}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{car.type}</td>
                    <td style={{ padding: '1rem' }}>₹{car.costPerDay}</td>
                    <td style={{ padding: '1rem' }}>₹{car.costPerKm}</td>
                    <td style={{ padding: '1rem' }}>
                      <Tag type="success">Available</Tag>
                    </td>
                  </tr>
                ))}
                {mockCars.filter(c => c.status === 'maintenance').map(car => (
                  <tr key={car.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{car.model}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{car.type}</td>
                    <td style={{ padding: '1rem' }}>₹{car.costPerDay}</td>
                    <td style={{ padding: '1rem' }}>₹{car.costPerKm}</td>
                    <td style={{ padding: '1rem' }}>
                      <Tag type="warning">Maintenance</Tag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'rented' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '1rem' }}>Rental ID</th>
                  <th style={{ padding: '1rem' }}>Car Model</th>
                  <th style={{ padding: '1rem' }}>Client</th>
                  <th style={{ padding: '1rem' }}>Driver Name</th>
                  <th style={{ padding: '1rem' }}>Driver Contact</th>
                  <th style={{ padding: '1rem' }}>Start Date</th>
                  <th style={{ padding: '1rem' }}>Expected Return</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeRentals.map(rental => (
                  <tr key={rental.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{rental.id}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{rental.carModel}</td>
                    <td style={{ padding: '1rem' }}>{rental.client}</td>
                    <td style={{ padding: '1rem' }}>{rental.driverName || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{rental.driverContact || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{rental.startDate}</td>
                    <td style={{ padding: '1rem' }}>{rental.endDate}</td>
                    <td style={{ padding: '1rem' }}>
                      <Tag type="warning">Active</Tag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'history' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '1rem' }}>Rental ID</th>
                  <th style={{ padding: '1rem' }}>Car Model</th>
                  <th style={{ padding: '1rem' }}>Client</th>
                  <th style={{ padding: '1rem' }}>Driver Name</th>
                  <th style={{ padding: '1rem' }}>Driver Contact</th>
                  <th style={{ padding: '1rem' }}>Duration</th>
                  <th style={{ padding: '1rem' }}>Total Distance</th>
                  <th style={{ padding: '1rem' }}>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {pastRentals.map(rental => (
                  <tr key={rental.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{rental.id}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{rental.carModel}</td>
                    <td style={{ padding: '1rem' }}>{rental.client}</td>
                    <td style={{ padding: '1rem' }}>{rental.driverName || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{rental.driverContact || 'N/A'}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{rental.startDate} to {rental.endDate}</td>
                    <td style={{ padding: '1rem' }}>{rental.totalDistance} km</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>₹{rental.totalCost?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
