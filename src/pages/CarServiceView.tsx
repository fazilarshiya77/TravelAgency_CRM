import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import {
  Car,
  Key,
  History,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
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

const initialCars: CarInfo[] = [
  { id: 'CAR-001', model: 'Toyota Innova Crysta', type: 'SUV', costPerDay: 2500, costPerKm: 15, status: 'available' },
  { id: 'CAR-002', model: 'Honda City', type: 'Sedan', costPerDay: 1800, costPerKm: 12, status: 'rented' },
  { id: 'CAR-003', model: 'Suzuki Swift Dzire', type: 'Sedan', costPerDay: 1200, costPerKm: 10, status: 'available' },
  { id: 'CAR-004', model: 'Mercedes-Benz E-Class', type: 'Luxury', costPerDay: 8000, costPerKm: 40, status: 'rented' },
  { id: 'CAR-005', model: 'Mahindra Scorpio-N', type: 'SUV', costPerDay: 3000, costPerKm: 18, status: 'maintenance' },
];

const initialRentals: RentalInfo[] = [
  { id: 'RENT-101', carId: 'CAR-002', carModel: 'Honda City', client: 'Amit Sharma', startDate: '2026-07-22', endDate: '2026-07-28', status: 'active', driverName: 'Raj Kumar', driverContact: '+91 9876543210' },
  { id: 'RENT-102', carId: 'CAR-004', carModel: 'Mercedes-Benz E-Class', client: 'Priya Patel', startDate: '2026-07-24', endDate: '2026-07-26', status: 'active', driverName: 'Suresh Singh', driverContact: '+91 9876543211' },
  { id: 'RENT-099', carId: 'CAR-001', carModel: 'Toyota Innova Crysta', client: 'Ravi Kumar', startDate: '2026-07-10', endDate: '2026-07-15', status: 'completed', totalDistance: 450, totalCost: 19250, driverName: 'Mukesh Bhai', driverContact: '+91 9876543212' },
  { id: 'RENT-098', carId: 'CAR-003', carModel: 'Suzuki Swift Dzire', client: 'Anita Singh', startDate: '2026-07-05', endDate: '2026-07-08', status: 'completed', totalDistance: 200, totalCost: 5600, driverName: 'Arjun Das', driverContact: '+91 9876543213' },
];

const emptyCarForm = { model: '', type: 'Sedan', costPerDay: '', costPerKm: '', status: 'available' as CarInfo['status'] };
const emptyRentalForm = { carId: '', client: '', startDate: '', endDate: '', driverName: '', driverContact: '' };

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: '0.5rem 1rem',
  backgroundColor: active ? 'var(--color-secondary)' : 'transparent',
  color: active ? '#fff' : 'var(--text-secondary)',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
});

const iconBtnStyle: React.CSSProperties = {
  border: 'none',
  background: 'rgba(148, 163, 184, 0.12)',
  borderRadius: 'var(--radius-sm)',
  padding: '0.4rem',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-secondary)',
  transition: 'all var(--transition-fast)',
};

export const CarServiceView: React.FC = () => {
  const [cars, setCars] = useState<CarInfo[]>(initialCars);
  const [rentals, setRentals] = useState<RentalInfo[]>(initialRentals);
  const [activeTab, setActiveTab] = useState<'available' | 'rented' | 'history'>('available');

  // Car modal state
  const [carModalOpen, setCarModalOpen] = useState(false);
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [carForm, setCarForm] = useState(emptyCarForm);
  const [deleteCarId, setDeleteCarId] = useState<string | null>(null);

  // Rental modal state
  const [rentalModalOpen, setRentalModalOpen] = useState(false);
  const [rentalForm, setRentalForm] = useState(emptyRentalForm);
  const [completeRentalId, setCompleteRentalId] = useState<string | null>(null);
  const [completeForm, setCompleteForm] = useState({ totalDistance: '', totalCost: '' });

  const availableCars = cars.filter(c => c.status === 'available');
  const activeRentals = rentals.filter(r => r.status === 'active');
  const pastRentals = rentals.filter(r => r.status === 'completed');

  // ---------- Car CRUD ----------
  const openAddCar = () => {
    setEditingCarId(null);
    setCarForm(emptyCarForm);
    setCarModalOpen(true);
  };

  const openEditCar = (car: CarInfo) => {
    setEditingCarId(car.id);
    setCarForm({
      model: car.model,
      type: car.type,
      costPerDay: String(car.costPerDay),
      costPerKm: String(car.costPerKm),
      status: car.status,
    });
    setCarModalOpen(true);
  };

  const saveCar = () => {
    if (!carForm.model.trim()) return;

    if (editingCarId) {
      setCars(prev =>
        prev.map(c =>
          c.id === editingCarId
            ? {
                ...c,
                model: carForm.model,
                type: carForm.type,
                costPerDay: Number(carForm.costPerDay) || 0,
                costPerKm: Number(carForm.costPerKm) || 0,
                status: carForm.status,
              }
            : c
        )
      );
    } else {
      const nextId = `CAR-${String(cars.length + 1).padStart(3, '0')}`;
      setCars(prev => [
        ...prev,
        {
          id: nextId,
          model: carForm.model,
          type: carForm.type,
          costPerDay: Number(carForm.costPerDay) || 0,
          costPerKm: Number(carForm.costPerKm) || 0,
          status: carForm.status,
        },
      ]);
    }
    setCarModalOpen(false);
  };

  const confirmDeleteCar = () => {
    if (!deleteCarId) return;
    setCars(prev => prev.filter(c => c.id !== deleteCarId));
    setDeleteCarId(null);
  };

  // ---------- Rental CRUD ----------
  const openAddRental = () => {
    setRentalForm(emptyRentalForm);
    setRentalModalOpen(true);
  };

  const saveRental = () => {
    const car = cars.find(c => c.id === rentalForm.carId);
    if (!car || !rentalForm.client.trim() || !rentalForm.startDate || !rentalForm.endDate) return;

    const nextId = `RENT-${String(rentals.length + 100)}`;
    setRentals(prev => [
      {
        id: nextId,
        carId: car.id,
        carModel: car.model,
        client: rentalForm.client,
        startDate: rentalForm.startDate,
        endDate: rentalForm.endDate,
        status: 'active',
        driverName: rentalForm.driverName || undefined,
        driverContact: rentalForm.driverContact || undefined,
      },
      ...prev,
    ]);
    setCars(prev => prev.map(c => (c.id === car.id ? { ...c, status: 'rented' } : c)));
    setRentalModalOpen(false);
    setActiveTab('rented');
  };

  const deleteRental = (id: string) => {
    setRentals(prev => prev.filter(r => r.id !== id));
  };

  const openCompleteRental = (rental: RentalInfo) => {
    setCompleteRentalId(rental.id);
    setCompleteForm({ totalDistance: '', totalCost: '' });
  };

  const confirmCompleteRental = () => {
    if (!completeRentalId) return;
    const rental = rentals.find(r => r.id === completeRentalId);
    setRentals(prev =>
      prev.map(r =>
        r.id === completeRentalId
          ? {
              ...r,
              status: 'completed',
              totalDistance: Number(completeForm.totalDistance) || 0,
              totalCost: Number(completeForm.totalCost) || 0,
            }
          : r
      )
    );
    if (rental) {
      setCars(prev => prev.map(c => (c.id === rental.carId ? { ...c, status: 'available' } : c)));
    }
    setCompleteRentalId(null);
  };

  return (
    <div style={{ animation: 'page-enter 0.4s ease-out forwards' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Car Service</h2>
          <p className="body-normal" style={{ color: 'var(--text-secondary)' }}>
            Manage fleet availability, track active rentals, and review past hirings.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="secondary" leftIcon={<Plus className="w-4 h-4" />} onClick={openAddCar}>
            Add Car
          </Button>
          <Button leftIcon={<Key className="w-4 h-4" />} onClick={openAddRental} disabled={availableCars.length === 0}>
            New Rental
          </Button>
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
          <button onClick={() => setActiveTab('available')} style={tabStyle(activeTab === 'available')}>
            Fleet Inventory
          </button>
          <button onClick={() => setActiveTab('rented')} style={tabStyle(activeTab === 'rented')}>
            Active Rentals
          </button>
          <button onClick={() => setActiveTab('history')} style={tabStyle(activeTab === 'history')}>
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
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map(car => (
                  <tr key={car.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{car.model}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{car.type}</td>
                    <td style={{ padding: '1rem' }}>₹{car.costPerDay}</td>
                    <td style={{ padding: '1rem' }}>₹{car.costPerKm}</td>
                    <td style={{ padding: '1rem' }}>
                      <Tag colorway={car.status === 'available' ? 'success' : car.status === 'maintenance' ? 'danger' : 'warning'}>
                        {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                      </Tag>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button style={iconBtnStyle} onClick={() => openEditCar(car)} title="Edit car">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          style={{ ...iconBtnStyle, color: 'var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)' }}
                          onClick={() => setDeleteCarId(car.id)}
                          title="Delete car"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {cars.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No vehicles in the fleet yet. Add one to get started.
                    </td>
                  </tr>
                )}
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
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
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
                      <Tag colorway="warning">Active</Tag>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button
                          style={{ ...iconBtnStyle, color: 'var(--color-success)', background: 'rgba(16, 185, 129, 0.1)' }}
                          onClick={() => openCompleteRental(rental)}
                          title="Mark as completed"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          style={{ ...iconBtnStyle, color: 'var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)' }}
                          onClick={() => deleteRental(rental.id)}
                          title="Delete rental"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {activeRentals.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No active rentals right now.
                    </td>
                  </tr>
                )}
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
                  <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
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
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                        <button
                          style={{ ...iconBtnStyle, color: 'var(--color-danger)', background: 'rgba(239, 68, 68, 0.1)' }}
                          onClick={() => deleteRental(rental.id)}
                          title="Delete record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pastRentals.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No completed hirings yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add / Edit Car Modal */}
      <Modal isOpen={carModalOpen} onClose={() => setCarModalOpen(false)} title={editingCarId ? 'Edit Vehicle' : 'Add Vehicle'} size="sm">
        <Input
          label="Car Model"
          placeholder="e.g. Toyota Innova Crysta"
          value={carForm.model}
          onChange={(e) => setCarForm({ ...carForm, model: e.target.value })}
        />
        <Select
          label="Vehicle Type"
          value={carForm.type}
          onChange={(e) => setCarForm({ ...carForm, type: e.target.value })}
          options={[
            { value: 'Sedan', label: 'Sedan' },
            { value: 'SUV', label: 'SUV' },
            { value: 'Luxury', label: 'Luxury' },
            { value: 'Hatchback', label: 'Hatchback' },
            { value: 'Tempo Traveller', label: 'Tempo Traveller' },
          ]}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Cost / Day (₹)"
            type="number"
            value={carForm.costPerDay}
            onChange={(e) => setCarForm({ ...carForm, costPerDay: e.target.value })}
          />
          <Input
            label="Charge / Km (₹)"
            type="number"
            value={carForm.costPerKm}
            onChange={(e) => setCarForm({ ...carForm, costPerKm: e.target.value })}
          />
        </div>
        <Select
          label="Status"
          value={carForm.status}
          onChange={(e) => setCarForm({ ...carForm, status: e.target.value as CarInfo['status'] })}
          options={[
            { value: 'available', label: 'Available' },
            { value: 'rented', label: 'Rented' },
            { value: 'maintenance', label: 'Maintenance' },
          ]}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <Button variant="ghost" onClick={() => setCarModalOpen(false)}>Cancel</Button>
          <Button onClick={saveCar}>{editingCarId ? 'Save Changes' : 'Add Vehicle'}</Button>
        </div>
      </Modal>

      {/* Delete Car Confirm */}
      <Modal isOpen={!!deleteCarId} onClose={() => setDeleteCarId(null)} title="Remove Vehicle" size="sm">
        <p className="body-normal" style={{ marginBottom: '1.5rem' }}>
          Are you sure you want to remove this vehicle from the fleet? This cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <Button variant="ghost" onClick={() => setDeleteCarId(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDeleteCar}>Remove</Button>
        </div>
      </Modal>

      {/* New Rental Modal */}
      <Modal isOpen={rentalModalOpen} onClose={() => setRentalModalOpen(false)} title="New Rental" size="sm">
        <Select
          label="Select Vehicle"
          value={rentalForm.carId}
          onChange={(e) => setRentalForm({ ...rentalForm, carId: e.target.value })}
          options={[
            { value: '', label: 'Choose an available car...' },
            ...availableCars.map(c => ({ value: c.id, label: `${c.model} (${c.type})` })),
          ]}
        />
        <Input
          label="Client Name"
          placeholder="e.g. Amit Sharma"
          value={rentalForm.client}
          onChange={(e) => setRentalForm({ ...rentalForm, client: e.target.value })}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Start Date"
            type="date"
            value={rentalForm.startDate}
            onChange={(e) => setRentalForm({ ...rentalForm, startDate: e.target.value })}
          />
          <Input
            label="Expected Return"
            type="date"
            value={rentalForm.endDate}
            onChange={(e) => setRentalForm({ ...rentalForm, endDate: e.target.value })}
          />
        </div>
        <Input
          label="Driver Name"
          placeholder="Optional"
          value={rentalForm.driverName}
          onChange={(e) => setRentalForm({ ...rentalForm, driverName: e.target.value })}
        />
        <Input
          label="Driver Contact"
          placeholder="Optional"
          value={rentalForm.driverContact}
          onChange={(e) => setRentalForm({ ...rentalForm, driverContact: e.target.value })}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <Button variant="ghost" onClick={() => setRentalModalOpen(false)}>Cancel</Button>
          <Button onClick={saveRental}>Start Rental</Button>
        </div>
      </Modal>

      {/* Complete Rental Modal */}
      <Modal isOpen={!!completeRentalId} onClose={() => setCompleteRentalId(null)} title="Complete Rental" size="sm">
        <p className="body-normal" style={{ marginBottom: '1rem' }}>
          Enter the final trip details to close out this rental.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Total Distance (km)"
            type="number"
            value={completeForm.totalDistance}
            onChange={(e) => setCompleteForm({ ...completeForm, totalDistance: e.target.value })}
          />
          <Input
            label="Total Cost (₹)"
            type="number"
            value={completeForm.totalCost}
            onChange={(e) => setCompleteForm({ ...completeForm, totalCost: e.target.value })}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <Button variant="ghost" onClick={() => setCompleteRentalId(null)}>Cancel</Button>
          <Button onClick={confirmCompleteRental}>Complete Rental</Button>
        </div>
      </Modal>
    </div>
  );
};
