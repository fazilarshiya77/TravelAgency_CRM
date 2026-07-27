import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  Plus,
  Trash2,
  Printer,
  User,
  Hotel,
  Plane,
  Car,
  Map,
  CreditCard
} from 'lucide-react';

interface HotelItem {
  id: string;
  name: string;
  roomType: string;
  nights: number;
  pricePerNight: number;
}

interface FlightItem {
  id: string;
  airline: string;
  routing: string;
  classType: string;
  price: number;
}

interface TransferItem {
  id: string;
  type: string;
  routing: string;
  price: number;
}

interface ActivityItem {
  id: string;
  name: string;
  price: number;
}

export const QuotationBuilderView: React.FC = () => {
  // Navigation
  const [activeTab, setActiveTab] = useState('client');

  // Client info
  const [clientName, setClientName] = useState('Neha Sharma');
  const [clientEmail, setClientEmail] = useState('neha@sharma.com');
  const [destination, setDestination] = useState('Amalfi Coast Villa Escape');
  const [quoteDate, setQuoteDate] = useState('2026-07-24');

  // Sector lists
  const [hotels, setHotels] = useState<HotelItem[]>([
    { id: 'h-1', name: 'Hotel de la Ville, Amalfi', roomType: 'Presidential Ocean Suite', nights: 7, pricePerNight: 2200 },
  ]);

  const [flights, setFlights] = useState<FlightItem[]>([
    { id: 'f-1', airline: 'Lufthansa', routing: 'DEL - MUC - NAP (Round Trip)', classType: 'Business Class', price: 1850 },
  ]);

  const [transfers, setTransfers] = useState<TransferItem[]>([
    { id: 't-1', type: 'Private Luxury SUV', routing: 'Naples Airport - Amalfi Hotel (Round Trip)', price: 320 },
  ]);

  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: 'a-1', name: 'Tuscany Vineyard Helicopter Wine Tour', price: 1200 },
    { id: 'a-2', name: 'Private Catamaran Amalfi Sunset Excursion', price: 850 },
  ]);

  // General checklist items costs
  const [mealsPrice, setMealsPrice] = useState(450); // Meals package cost
  const [visaPrice, setVisaPrice] = useState(140);  // Schengen Visa fees
  const [insurancePrice, setInsurancePrice] = useState(90); // Allianz Policy premium

  // Input states for adding new rows
  const [newHotel, setNewHotel] = useState({ name: '', roomType: 'Deluxe Suite', nights: 1, pricePerNight: 0 });
  const [newFlight, setNewFlight] = useState({ airline: '', routing: '', classType: 'Economy Class', price: 0 });
  const [newTransfer, setNewTransfer] = useState({ type: 'Private Sedan', routing: '', price: 0 });
  const [newActivity, setNewActivity] = useState({ name: '', price: 0 });

  // Add handlers
  const handleAddHotel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHotel.name) return;
    setHotels([...hotels, { ...newHotel, id: `h-${Date.now()}` }]);
    setNewHotel({ name: '', roomType: 'Deluxe Suite', nights: 1, pricePerNight: 0 });
  };

  const handleAddFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFlight.airline || !newFlight.routing) return;
    setFlights([...flights, { ...newFlight, id: `f-${Date.now()}` }]);
    setNewFlight({ airline: '', routing: '', classType: 'Economy Class', price: 0 });
  };

  const handleAddTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTransfer.routing) return;
    setTransfers([...transfers, { ...newTransfer, id: `t-${Date.now()}` }]);
    setNewTransfer({ type: 'Private Sedan', routing: '', price: 0 });
  };

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.name) return;
    setActivities([...activities, { ...newActivity, id: `a-${Date.now()}` }]);
    setNewActivity({ name: '', price: 0 });
  };

  // Calculations
  const hotelTotal = hotels.reduce((sum, h) => sum + h.nights * h.pricePerNight, 0);
  const flightTotal = flights.reduce((sum, f) => sum + f.price, 0);
  const transferTotal = transfers.reduce((sum, t) => sum + t.price, 0);
  const activityTotal = activities.reduce((sum, a) => sum + a.price, 0);

  const subtotalINR = hotelTotal + flightTotal + transferTotal + activityTotal + mealsPrice + visaPrice + insurancePrice;
  
  const gstRate = 0.18; // 18% GST (CGST 9% + SGST 9%)
  const cgst = subtotalINR * 0.09;
  const sgst = subtotalINR * 0.09;
  const gstTotal = subtotalINR * gstRate;
  const grandTotal = subtotalINR + gstTotal;

  // Print triggered
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.4s ease-out forwards' }}>
      
      {/* Printable template style definitions */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 2rem;
            color: #111 !important;
            background: #fff !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem' }}>Quotation Builder</h2>
          <p className="body-normal" style={{ marginTop: '0.25rem' }}>
            Build custom quotations incorporating flights, stays, activities, visa, and insurance, with dynamic 18% GST invoice routing.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Printer className="w-4 h-4" />} onClick={handlePrint}>
          Print & Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem] items-start no-print" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Quotation Editor Panel */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { id: 'client', label: 'Client Info', icon: <User className="w-4 h-4" /> },
              { id: 'stays', label: 'Stays', icon: <Hotel className="w-4 h-4" /> },
              { id: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
              { id: 'commute', label: 'Commute', icon: <Car className="w-4 h-4" /> },
              { id: 'activities', label: 'Activities', icon: <Map className="w-4 h-4" /> },
              { id: 'fees', label: 'Fees', icon: <CreditCard className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  borderColor: activeTab === tab.id ? 'var(--color-secondary)' : 'var(--border-light)',
                  backgroundColor: activeTab === tab.id ? 'var(--color-secondary)' : 'var(--bg-card)',
                  color: activeTab === tab.id ? '#FFF' : 'var(--text-secondary)',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  boxShadow: activeTab === tab.id ? 'var(--shadow-sm)' : 'none'
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ minHeight: '400px' }}>
            {activeTab === 'client' && (
              <Card title="Client & Excursion Settings">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Client Name</label>
                    <Input value={clientName} onChange={(e) => setClientName(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Email Address</label>
                    <Input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Destination Package</label>
                    <Input value={destination} onChange={(e) => setDestination(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Quotation Date</label>
                    <Input type="date" value={quoteDate} onChange={(e) => setQuoteDate(e.target.value)} />
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'stays' && (
              <Card title="Hotels & Accommodations">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {hotels.map((h) => (
                    <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-app)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{h.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{h.roomType} • {h.nights} Nights</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{(h.nights * h.pricePerNight).toLocaleString()}</span>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-tertiary)' }} onClick={() => setHotels(hotels.filter(item => item.id !== h.id))}>
                          <Trash2 className="w-4 h-4 hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ marginTop: '0.5rem', padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-focus)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', color: 'var(--color-secondary)' }}>Add New Hotel</div>
                    <form onSubmit={handleAddHotel} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr', gap: '12px', alignItems: 'end' }}>
                      <Input style={{ marginBottom: 0 }} placeholder="Hotel Name" value={newHotel.name} onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })} required />
                      <Input style={{ marginBottom: 0 }} placeholder="Room Type" value={newHotel.roomType} onChange={(e) => setNewHotel({ ...newHotel, roomType: e.target.value })} />
                      <Input style={{ marginBottom: 0 }} type="number" placeholder="Nights" value={newHotel.nights || ''} onChange={(e) => setNewHotel({ ...newHotel, nights: parseInt(e.target.value) || 0 })} required />
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Input style={{ marginBottom: 0, flex: 1 }} type="number" placeholder="Price/Night" value={newHotel.pricePerNight || ''} onChange={(e) => setNewHotel({ ...newHotel, pricePerNight: parseFloat(e.target.value) || 0 })} required />
                        <Button type="submit" variant="secondary" style={{ padding: '10px' }}><Plus className="w-4 h-4" /></Button>
                      </div>
                    </form>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'flights' && (
              <Card title="Flight Logistics">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {flights.map((f) => (
                    <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-app)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{f.airline}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{f.routing} • {f.classType}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{f.price.toLocaleString()}</span>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-tertiary)' }} onClick={() => setFlights(flights.filter(item => item.id !== f.id))}>
                          <Trash2 className="w-4 h-4 hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ marginTop: '0.5rem', padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-focus)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', color: 'var(--color-secondary)' }}>Add New Flight</div>
                    <form onSubmit={handleAddFlight} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1.5fr 1fr', gap: '12px', alignItems: 'end' }}>
                      <Input style={{ marginBottom: 0 }} placeholder="Airline" value={newFlight.airline} onChange={(e) => setNewFlight({ ...newFlight, airline: e.target.value })} required />
                      <Input style={{ marginBottom: 0 }} placeholder="Routing (e.g. JFK-FCO)" value={newFlight.routing} onChange={(e) => setNewFlight({ ...newFlight, routing: e.target.value })} required />
                      <Input style={{ marginBottom: 0 }} placeholder="Class" value={newFlight.classType} onChange={(e) => setNewFlight({ ...newFlight, classType: e.target.value })} />
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Input style={{ marginBottom: 0, flex: 1 }} type="number" placeholder="Total Price" value={newFlight.price || ''} onChange={(e) => setNewFlight({ ...newFlight, price: parseFloat(e.target.value) || 0 })} required />
                        <Button type="submit" variant="secondary" style={{ padding: '10px' }}><Plus className="w-4 h-4" /></Button>
                      </div>
                    </form>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'commute' && (
              <Card title="Transfers & Ground Commute">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {transfers.map((t) => (
                    <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-app)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{t.type}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{t.routing}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{t.price.toLocaleString()}</span>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-tertiary)' }} onClick={() => setTransfers(transfers.filter(item => item.id !== t.id))}>
                          <Trash2 className="w-4 h-4 hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ marginTop: '0.5rem', padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-focus)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', color: 'var(--color-secondary)' }}>Add New Transfer</div>
                    <form onSubmit={handleAddTransfer} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '12px', alignItems: 'end' }}>
                      <Input style={{ marginBottom: 0 }} placeholder="Vehicle Type" value={newTransfer.type} onChange={(e) => setNewTransfer({ ...newTransfer, type: e.target.value })} required />
                      <Input style={{ marginBottom: 0 }} placeholder="Routing Details" value={newTransfer.routing} onChange={(e) => setNewTransfer({ ...newTransfer, routing: e.target.value })} required />
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Input style={{ marginBottom: 0, flex: 1 }} type="number" placeholder="Total Price" value={newTransfer.price || ''} onChange={(e) => setNewTransfer({ ...newTransfer, price: parseFloat(e.target.value) || 0 })} required />
                        <Button type="submit" variant="secondary" style={{ padding: '10px' }}><Plus className="w-4 h-4" /></Button>
                      </div>
                    </form>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'activities' && (
              <Card title="Sightseeing & Activities">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                  {activities.map((a) => (
                    <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-app)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{a.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{a.price.toLocaleString()}</span>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-tertiary)' }} onClick={() => setActivities(activities.filter(item => item.id !== a.id))}>
                          <Trash2 className="w-4 h-4 hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div style={{ marginTop: '0.5rem', padding: '16px', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-focus)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', color: 'var(--color-secondary)' }}>Add New Activity</div>
                    <form onSubmit={handleAddActivity} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '12px', alignItems: 'end' }}>
                      <Input style={{ marginBottom: 0 }} placeholder="Activity/Tour Name" value={newActivity.name} onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })} required />
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Input style={{ marginBottom: 0, flex: 1 }} type="number" placeholder="Total Price" value={newActivity.price || ''} onChange={(e) => setNewActivity({ ...newActivity, price: parseFloat(e.target.value) || 0 })} required />
                        <Button type="submit" variant="secondary" style={{ padding: '10px' }}><Plus className="w-4 h-4" /></Button>
                      </div>
                    </form>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'fees' && (
              <Card title="Visa, Insurance & Ancillary Fees">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Meals Packages (₹)</label>
                    <Input type="number" value={mealsPrice || ''} onChange={(e) => setMealsPrice(parseFloat(e.target.value) || 0)} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Visa Handling Fees (₹)</label>
                    <Input type="number" value={visaPrice || ''} onChange={(e) => setVisaPrice(parseFloat(e.target.value) || 0)} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Travel Insurance (₹)</label>
                    <Input type="number" value={insurancePrice || ''} onChange={(e) => setInsurancePrice(parseFloat(e.target.value) || 0)} />
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Live Preview Panel */}
        <div style={{ position: 'sticky', top: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="Dynamic Live Preview" style={{ backgroundColor: '#F8FAFC' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{clientName}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{clientEmail}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Destination: <strong>{destination}</strong></p>
              </div>

              {/* Items Summary list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
                {hotels.map(h => (
                  <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Stay: {h.name} x {h.nights}n</span>
                    <span style={{ fontWeight: 600 }}>₹{(h.nights * h.pricePerNight).toLocaleString()}</span>
                  </div>
                ))}
                {flights.map(f => (
                  <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Flight: {f.airline} ({f.routing})</span>
                    <span style={{ fontWeight: 600 }}>₹{f.price.toLocaleString()}</span>
                  </div>
                ))}
                {transfers.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Transfer: {t.type}</span>
                    <span style={{ fontWeight: 600 }}>₹{t.price.toLocaleString()}</span>
                  </div>
                ))}
                {activities.map(a => (
                  <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Activity: {a.name}</span>
                    <span style={{ fontWeight: 600 }}>₹{a.price.toLocaleString()}</span>
                  </div>
                ))}
                {mealsPrice > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Meals Inclusion Plan</span>
                    <span style={{ fontWeight: 600 }}>₹{mealsPrice}</span>
                  </div>
                )}
                {visaPrice > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Schengen Visa Processing Fee</span>
                    <span style={{ fontWeight: 600 }}>₹{visaPrice}</span>
                  </div>
                )}
                {insurancePrice > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Allianz Premium Travel Insurance</span>
                    <span style={{ fontWeight: 600 }}>₹{insurancePrice}</span>
                  </div>
                )}
              </div>

              {/* Invoicing summary details */}
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem' }}>
                  <span>Subtotal (INR)</span>
                  <span style={{ fontWeight: 600 }}>₹{subtotalINR.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--color-peach-dark)' }}>
                  <span>CGST (9%)</span>
                  <span>₹{cgst.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--color-peach-dark)' }}>
                  <span>SGST (9%)</span>
                  <span>₹{sgst.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, borderTop: '1px dashed var(--border-light)', paddingTop: '6px' }}>
                  <span>Grand Total (Incl. GST)</span>
                  <span style={{ color: 'var(--color-secondary)' }}>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* FULL PRINT PAGE CONTAINER (HIDDEN IN STANDARD WEB RENDER, DISPLAYED ON MEDIA PRINT) */}
      <div id="print-area" style={{ display: 'none', flexDirection: 'column', gap: '2rem', fontFamily: 'Inter, sans-serif' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0EA5E9', paddingBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0C182F', margin: 0 }}>NAAZ TRAVELS</h1>
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
              Premium Luxury Travel Excursions & CRM Planner<br />
              GSTIN: 27AAAAA1111A1Z1 | Support: corporate@naaztravels.com
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0EA5E9', margin: 0 }}>CUSTOM QUOTATION</h2>
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px' }}>
              Quote Ref: NZQ-{Date.now().toString().substring(8)}<br />
              Date: {quoteDate}
            </p>
          </div>
        </div>

        {/* Client details info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quotation Prepared For</h3>
            <div style={{ marginTop: '0.5rem' }}>
              <strong style={{ fontSize: '1rem', color: '#1F2937' }}>{clientName}</strong><br />
              <span style={{ fontSize: '0.85rem', color: '#475569' }}>{clientEmail}</span>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Excursion Summary</h3>
            <div style={{ marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#475569' }}>Destination: <strong>{destination}</strong></span><br />
              <span style={{ fontSize: '0.85rem', color: '#475569' }}>Currency: INR (₹)</span>
            </div>
          </div>
        </div>

        {/* Itemized Table Breakdown */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #CBD5E1', color: '#475569', fontSize: '0.8rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '8px 0', fontWeight: 600 }}>Category & Details</th>
              <th style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600 }}>Price (INR)</th>
              <th style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600 }}>Total (INR)</th>
            </tr>
          </thead>
          <tbody>
            
            {/* Stays list */}
            {hotels.map((h, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #E2E8F0', fontSize: '0.85rem' }}>
                <td style={{ padding: '12px 0' }}>
                  <strong>Stay: {h.name}</strong><br />
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Room: {h.roomType} | {h.nights} Nights @ ₹{h.pricePerNight}/night</span>
                </td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{h.pricePerNight.toLocaleString()}</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{(h.nights * h.pricePerNight).toLocaleString()}</td>
              </tr>
            ))}

            {/* Flights list */}
            {flights.map((f, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #E2E8F0', fontSize: '0.85rem' }}>
                <td style={{ padding: '12px 0' }}>
                  <strong>Flight: {f.airline}</strong><br />
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Route: {f.routing} | Class: {f.classType}</span>
                </td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{f.price.toLocaleString()}</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{f.price.toLocaleString()}</td>
              </tr>
            ))}

            {/* Transfers list */}
            {transfers.map((t, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #E2E8F0', fontSize: '0.85rem' }}>
                <td style={{ padding: '12px 0' }}>
                  <strong>Transfer: {t.type}</strong><br />
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Route: {t.routing}</span>
                </td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{t.price.toLocaleString()}</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{t.price.toLocaleString()}</td>
              </tr>
            ))}

            {/* Activities list */}
            {activities.map((a, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #E2E8F0', fontSize: '0.85rem' }}>
                <td style={{ padding: '12px 0' }}>
                  <strong>Activity: {a.name}</strong>
                </td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{a.price.toLocaleString()}</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{a.price.toLocaleString()}</td>
              </tr>
            ))}

            {/* Inclusions */}
            {mealsPrice > 0 && (
              <tr style={{ borderBottom: '1px solid #E2E8F0', fontSize: '0.85rem' }}>
                <td style={{ padding: '12px 0' }}>
                  <strong>Meals Package Inclusions</strong>
                </td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{mealsPrice}</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{mealsPrice}</td>
              </tr>
            )}
            
            {visaPrice > 0 && (
              <tr style={{ borderBottom: '1px solid #E2E8F0', fontSize: '0.85rem' }}>
                <td style={{ padding: '12px 0' }}>
                  <strong>Schengen Visa Processing Fees</strong>
                </td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{visaPrice}</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{visaPrice}</td>
              </tr>
            )}

            {insurancePrice > 0 && (
              <tr style={{ borderBottom: '1px solid #E2E8F0', fontSize: '0.85rem' }}>
                <td style={{ padding: '12px 0' }}>
                  <strong>Premium Allianz Travel Policy</strong>
                </td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{insurancePrice}</td>
                <td style={{ padding: '12px 0', textAlign: 'right' }}>₹{insurancePrice}</td>
              </tr>
            )}

          </tbody>
        </table>

        {/* GST Invoice Details summaries */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal (INR):</span>
              <strong style={{ color: '#1F2937' }}>₹{subtotalINR.toLocaleString()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #CBD5E1', paddingTop: '8px' }}>
              <span>CGST (9.0%):</span>
              <span>₹{cgst.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>SGST (9.0%):</span>
              <span>₹{sgst.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #0EA5E9', paddingTop: '10px', fontSize: '1.05rem' }}>
              <span style={{ fontWeight: 700 }}>Grand Total (INR):</span>
              <strong style={{ color: '#0EA5E9' }}>₹{grandTotal.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Terms footer */}
        <div style={{ marginTop: '4rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem', textAlign: 'center', fontSize: '0.725rem', color: '#64748B' }}>
          Thank you for choosing Naaz Travels. This document is a generated quote valid for 7 days.<br />
          All bookings are subject to availability and flight carriers schedule updates.
        </div>

      </div>

    </div>
  );
};
