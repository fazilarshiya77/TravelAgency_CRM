import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Table, type TableColumn } from '../components/ui/Table';
import { Tag } from '../components/ui/Tag';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Drawer } from '../components/ui/Drawer';
import {
  Search,
  Trash2,
  ExternalLink,
  AlertTriangle,
  Check,
  Clock,
  ArrowUp,
  ArrowDown,
  Printer,
  ThumbsUp,
  Plus,
  FileText,
} from 'lucide-react';

interface ItineraryItem {
  id: string;
  type: 'flight' | 'hotel' | 'activity' | 'transport';
  title: string;
  details: string;
  time: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

interface ReminderItem {
  title: string;
  sentDate: string;
  status: 'sent' | 'scheduled';
}

interface BookingItem {
  id: string;
  client: string;
  email: string;
  destination: string;
  cost: number;
  dates: string;
  approvalStatus: 'draft' | 'awaiting_approval' | 'confirmed' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  visaRequired: boolean;
  visaStatus: string;
  insurancePolicy: string;
  hasConflict: boolean;
  conflictMessage: string;
  itinerary: ItineraryItem[];
  checklist: ChecklistItem[];
  reminders: ReminderItem[];
}

export const BookingsView: React.FC = () => {
  // 1. CRM Bookings state holding mock database
  const [bookings, setBbookings] = useState<BookingItem[]>([
    {
      id: 'BKG-9921',
      client: 'Neha Sharma',
      email: 'neha@sharma.com',
      destination: 'Amalfi Coast Luxury Escape',
      cost: 28500,
      dates: '2026-08-15 to 2026-08-22',
      approvalStatus: 'awaiting_approval', // triggers approval workflow button
      paymentStatus: 'partial',
      visaRequired: true,
      visaStatus: 'Approved & Attached',
      insurancePolicy: 'Allianz Explorer Plus #AX-99281',
      hasConflict: true, // triggers warning banner
      conflictMessage: 'Flight LH-402 lands in Naples on Aug 15 at 22:45, but Amalfi Hotel private transfer vehicle check-in was scheduled for Aug 15 at 14:00. This leaves a 8-hour scheduling gap.',
      itinerary: [
        { id: 'it-1', type: 'flight', title: 'Outbound Flight LH-402', details: 'Lufthansa Business Class (JFK -> MUC -> NAP)', time: 'Aug 15, 08:30 - 22:45' },
        { id: 'it-2', type: 'transport', title: 'Private Car Transfer', details: 'Naples Airport to Hotel de la Ville (Luxury SUV)', time: 'Aug 15, 23:00' },
        { id: 'it-3', type: 'hotel', title: 'Hotel de la Ville Reservation', details: 'Suite Presidential (Ocean-View Balcony), Room #402', time: 'Aug 15 - Aug 22 (7 Nights)' },
        { id: 'it-4', type: 'activity', title: 'Tuscany Vineyards Heli-Tour', details: 'Private helicopter transfer and wine degustation session', time: 'Aug 17, 10:00 - 15:00' },
        { id: 'it-5', type: 'flight', title: 'Inbound Flight LH-409', details: 'Lufthansa First Class (NAP -> FRA -> JFK)', time: 'Aug 22, 11:30 - 20:15' },
      ],
      checklist: [
        { id: 'ch-1', label: 'Verify Passport validity (expires Nov 2026)', done: true },
        { id: 'ch-2', label: 'Confirm Lufthansa Business seating layouts', done: true },
        { id: 'ch-3', label: 'Confirm Catamaran private charter time slot', done: false },
        { id: 'ch-4', label: 'Verify travel insurance Allianz coverage parameters', done: true },
        { id: 'ch-5', label: 'Send Schengen Visa confirmation details to hotel concierge', done: false },
      ],
      reminders: [
        { title: 'Payment Balance Reminder email', sentDate: '2026-07-01 10:00', status: 'sent' },
        { title: 'Visa validity documentation reminder', sentDate: '2026-07-15 09:30', status: 'sent' },
        { title: 'Pre-flight check-in WhatsApp dispatch', sentDate: '2026-08-14 09:00', status: 'scheduled' },
      ],
    },
    {
      id: 'BKG-9922',
      client: 'Priya Patel',
      email: 'priya@patel.com',
      destination: 'Kyoto Sanctuary Meditation',
      cost: 8900,
      dates: '2026-09-02 to 2026-09-09',
      approvalStatus: 'confirmed',
      paymentStatus: 'paid',
      visaRequired: false,
      visaStatus: 'Not Required',
      insurancePolicy: 'AIG Travel Guard #TG-88192',
      hasConflict: false,
      conflictMessage: '',
      itinerary: [
        { id: 'it-10', type: 'flight', title: 'Outbound Flight JL-005', details: 'Japan Airlines Business Class (ORD -> HND)', time: 'Sep 02, 11:15 - Sep 03, 14:00' },
        { id: 'it-11', type: 'hotel', title: 'Hoshinoya Kyoto Sanctuary Ryokan', details: 'Garden View Pavilion Room #12', time: 'Sep 03 - Sep 09 (6 Nights)' },
        { id: 'it-12', type: 'activity', title: 'Private Zen Meditation Session', details: 'Conducted by resident Zen monk at Ryogan Temple', time: 'Sep 05, 09:00' },
      ],
      checklist: [
        { id: 'ch-10', label: 'Confirm Zen monk schedule alignment', done: true },
        { id: 'ch-11', label: 'Verify vegan dietary restrictions logged at Ryokan kitchen', done: true },
        { id: 'ch-12', label: 'Check Kyoto autumn weather status', done: false },
      ],
      reminders: [
        { title: 'Ryokan dietary guidelines confirmation dispatch', sentDate: '2026-08-25 10:00', status: 'scheduled' },
      ],
    },
    {
      id: 'BKG-9923',
      client: 'Vikram Malhotra',
      email: 'vikram@malhotra.in',
      destination: 'Swiss Alps Hiking Adventure',
      cost: 14500,
      dates: '2026-08-28 to 2026-09-04',
      approvalStatus: 'confirmed',
      paymentStatus: 'paid',
      visaRequired: true,
      visaStatus: 'Awaiting Document Submission',
      insurancePolicy: 'Allianz Basic #AB-1029',
      hasConflict: false,
      conflictMessage: '',
      itinerary: [
        { id: 'it-20', type: 'flight', title: 'Outbound Flight LX-015', details: 'Swiss Air Business (SFO -> ZRH)', time: 'Aug 28, 19:30' },
        { id: 'it-21', type: 'hotel', title: 'The Alpina Gstaad Superior Room', details: 'Deluxe Suite Room #88', time: 'Aug 29 - Sep 04 (6 Nights)' },
      ],
      checklist: [
        { id: 'ch-20', label: 'Submit Schengen visa application form', done: false },
        { id: 'ch-21', label: 'Assign local mountain guide', done: true },
      ],
      reminders: [
        { title: 'Schengen Visa urgency alert', sentDate: '2026-07-20 11:00', status: 'sent' },
      ],
    },
  ]);

  // 2. Navigation & UI States
  const [search, setSearch] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');
  const [activeBooking, setActiveBooking] = useState<BookingItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'checklist' | 'ai' | 'invoices'>('overview');

  // PDF Print dialog modal state
  const [isInvoicePrintOpen, setIsInvoicePrintOpen] = useState(false);

  // 3. Create Booking dialog modal state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [clientNameError, setClientNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [newBooking, setNewBooking] = useState({
    client: '',
    email: '',
    destination: '',
    cost: '',
    dates: '',
    hotelName: '',
    roomAllocation: '',
    flightCarrier: '',
    flightNumber: '',
  });

  // 4. Filtering Logic
  const filteredBookings = bookings.filter((b) => {
    const matchSearch =
      b.client.toLowerCase().includes(search.toLowerCase()) ||
      b.destination.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());

    const matchStage = filterStage === 'all' || b.approvalStatus === filterStage;

    return matchSearch && matchStage;
  });

  // 5. Manager Approval workflow handler
  const handleApproveBooking = (bookingId: string) => {
    setBbookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          approvalStatus: 'confirmed',
          itinerary: [
            ...b.itinerary,
            {
              id: 'it-system-' + Date.now(),
              type: 'transport',
              title: 'Booking Approved',
              details: 'Manager Mohammed Rayhan verified and locked ticketing slots',
              time: 'Confirmed Action',
            },
          ],
        };
      })
    );

    setActiveBooking((prev) =>
      prev
        ? {
            ...prev,
            approvalStatus: 'confirmed',
          }
        : null
    );

    alert(`🎉 Booking slots approved and locked! Flights and hotels status changed to Confirmed.`);
  };

  // 6. Itinerary timeline reordering engine (simulated drag/drop)
  const moveItineraryItem = (bookingId: string, itemId: string, direction: 'up' | 'down') => {
    setBbookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const newItinerary = [...b.itinerary];
        const idx = newItinerary.findIndex((item) => item.id === itemId);
        if (idx === -1) return b;

        const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (targetIdx >= 0 && targetIdx < newItinerary.length) {
          const temp = newItinerary[idx];
          newItinerary[idx] = newItinerary[targetIdx];
          newItinerary[targetIdx] = temp;
        }

        return { ...b, itinerary: newItinerary };
      })
    );

    // Update active drawer view state
    setActiveBooking((prev) => {
      if (!prev || prev.id !== bookingId) return prev;
      const newItinerary = [...prev.itinerary];
      const idx = newItinerary.findIndex((item) => item.id === itemId);
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx >= 0 && targetIdx < newItinerary.length) {
        const temp = newItinerary[idx];
        newItinerary[idx] = newItinerary[targetIdx];
        newItinerary[targetIdx] = temp;
      }
      return { ...prev, itinerary: newItinerary };
    });
  };

  // 7. Interactive travel Checklist toggles
  const handleToggleChecklist = (bookingId: string, checkId: string) => {
    setBbookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          checklist: b.checklist.map((item) =>
            item.id === checkId ? { ...item, done: !item.done } : item
          ),
        };
      })
    );

    setActiveBooking((prev) => {
      if (!prev || prev.id !== bookingId) return prev;
      return {
        ...prev,
        checklist: prev.checklist.map((item) =>
          item.id === checkId ? { ...item, done: !item.done } : item
        ),
      };
    });
  };

  // Date helper functions for new booking modal
  const updateBookingDates = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setNewBooking(prev => ({
        ...prev,
        dates: `${start} to ${end}`
      }));
    } else if (start) {
      setNewBooking(prev => ({ ...prev, dates: `${start}` }));
    } else {
      setNewBooking(prev => ({ ...prev, dates: '' }));
    }
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime < 0) return 0;
    // Number of days (inclusive)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  // 8. Create booking submission
  const handleAddBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.client || !newBooking.destination) return;

    if (newBooking.email) {
      const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
      if (!emailRegex.test(newBooking.email)) {
        setEmailError('⚠️ Email must be in format: alphabets/numbers followed by @gmail.com (e.g. john123@gmail.com)');
        return;
      }
    }

    const generatedId = 'BKG-' + (9900 + bookings.length + 1);
    const costVal = parseFloat(newBooking.cost) || 3500;

    const createdItem: BookingItem = {
      id: generatedId,
      client: newBooking.client,
      email: newBooking.email || 'guest@agency.com',
      destination: newBooking.destination,
      cost: costVal,
      dates: newBooking.dates || 'TBD',
      approvalStatus: 'draft',
      paymentStatus: 'unpaid',
      visaRequired: false,
      visaStatus: 'Not Checked',
      insurancePolicy: 'None',
      hasConflict: false,
      conflictMessage: '',
      itinerary: [
        {
          id: 'it-add-1',
          type: 'flight',
          title: `Outbound Flight: ${newBooking.flightCarrier || 'TBD'} ${newBooking.flightNumber || ''}`,
          details: 'Scheduled routing',
          time: 'Departure Slot',
        },
        {
          id: 'it-add-2',
          type: 'hotel',
          title: `Hotel: ${newBooking.hotelName || 'TBD'}`,
          details: `Room Allocation: ${newBooking.roomAllocation || 'Standard'}`,
          time: 'Accommodation Slot',
        },
      ],
      checklist: [
        { id: 'ch-add-1', label: 'Verify passenger passport credentials', done: false },
        { id: 'ch-add-2', label: 'Request room layout preferences', done: false },
      ],
      reminders: [
        { title: 'Payment Balance reminder dispatch', sentDate: 'Scheduled', status: 'scheduled' },
      ],
    };

    setBbookings((prev) => [createdItem, ...prev]);
    setIsAddOpen(false);
    setClientNameError('');
    setEmailError('');
    setStartDate('');
    setEndDate('');
    setNewBooking({
      client: '',
      email: '',
      destination: '',
      cost: '',
      dates: '',
      hotelName: '',
      roomAllocation: '',
      flightCarrier: '',
      flightNumber: '',
    });
  };

  const getStageColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'mint';
      case 'awaiting_approval': return 'peach';
      case 'draft': return 'sand';
      default: return 'danger';
    }
  };

  // Pipeline summary card calculations
  const totalInvoiced = bookings.reduce((acc, curr) => acc + curr.cost, 0);
  const awaitingCount = bookings.filter((b) => b.approvalStatus === 'awaiting_approval').length;
  const activeCount = bookings.filter((b) => b.approvalStatus === 'confirmed').length;

  const columns: TableColumn<BookingItem>[] = [
    { header: 'Ref ID', accessor: 'id' },
    {
      header: 'Client Prospect',
      accessor: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.client}</div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{row.email}</div>
        </div>
      ),
    },
    { header: 'Excursion Packages', accessor: 'destination' },
    {
      header: 'Total Cost',
      accessor: (row) => <span style={{ fontWeight: 600 }}>₹{row.cost.toLocaleString()}</span>,
      align: 'right' as const,
    },
    {
      header: 'Payment Status',
      accessor: (row) => (
        <Tag colorway={row.paymentStatus === 'paid' ? 'mint' : row.paymentStatus === 'partial' ? 'peach' : 'danger'}>
          {row.paymentStatus.toUpperCase()}
        </Tag>
      ),
    },
    {
      header: 'Manager Approval Status',
      accessor: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {row.approvalStatus === 'confirmed' ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          )}
          <Tag colorway={getStageColor(row.approvalStatus)}>
            {row.approvalStatus.toUpperCase()}
          </Tag>
        </div>
      ),
    },
    {
      header: 'Scheduling Status',
      accessor: (row) => (
        row.hasConflict ? (
          <Tag colorway="danger">1 Conflict Detected</Tag>
        ) : (
          <Tag colorway="mint">No Overlaps</Tag>
        )
      ),
    },
    {
      header: 'Actions',
      accessor: (row) => (
        <Button
          size="sm"
          variant="secondary"
          leftIcon={<ExternalLink className="w-3.5 h-3.5 text-sky-500" />}
          onClick={(e) => {
            e.stopPropagation();
            setActiveBooking(row);
            setActiveTab('overview');
          }}
        >
          Manage Booking
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.4s ease-out forwards' }}>
      
      {/* Title Header switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem' }}>Automated Booking Center</h2>
          <p className="body-normal" style={{ marginTop: '0.25rem' }}>
            Verify client reservations, process manager approvals, check scheduling logic overlaps, and generate invoices.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => { setIsAddOpen(true); setClientNameError(''); }}>
          Create Booking File
        </Button>
      </div>

      {/* Pipeline Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Total Pipeline Value</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
            ₹{totalInvoiced.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Invoice volume in circulation</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Awaiting Approval</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-peach-dark)', marginTop: '4px' }}>
            {awaitingCount} Bookings
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Requires managers signoff to ticket</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Confirmed Ticketing</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)', marginTop: '4px' }}>
            {activeCount} Bookings Active
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Rooms allocated and flights locked</span>
        </div>
      </div>

      {/* Filter and Table Grid layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Card>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <Input
                placeholder="Search bookings by client name, target destination, or reference ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
                style={{ marginBottom: 0 }}
              />
            </div>
            <div style={{ width: '220px' }}>
              <Select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                options={[
                  { value: 'all', label: 'All Booking Stages' },
                  { value: 'awaiting_approval', label: 'Awaiting Manager Signoff' },
                  { value: 'confirmed', label: 'Confirmed Booking' },
                  { value: 'draft', label: 'Draft' },
                ]}
                style={{ marginBottom: 0 }}
              />
            </div>
          </div>
        </Card>

        {/* Table data */}
        <Card style={{ padding: 0 }}>
          <Table columns={columns} data={filteredBookings} onRowClick={(row) => {
            setActiveBooking(row);
            setActiveTab('overview');
          }} />
        </Card>
      </div>

      {/* DETAILED BOOKING MANAGEMENT DRAWER PANEL (HUBSPOT STYLE) */}
      <Drawer
        isOpen={activeBooking !== null}
        onClose={() => setActiveBooking(null)}
        title={activeBooking ? `Booking Sheet: ${activeBooking.id}` : ''}
        width="500px"
      >
        {activeBooking && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}>
            
            {/* Tab navigation headers */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', gap: '4px' }}>
              {([
                { key: 'overview', label: 'Overview' },
                { key: 'itinerary', label: 'Itinerary Timeline' },
                { key: 'checklist', label: 'Checklist' },
                { key: 'ai', label: 'AI Audit' },
                { key: 'invoices', label: 'Invoices & PDF' },
              ] as const).map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      padding: '8px 10px',
                      cursor: 'pointer',
                      fontSize: '0.775rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--color-secondary)' : 'var(--text-secondary)',
                      position: 'relative',
                    }}
                  >
                    {tab.label}
                    {isActive && (
                      <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '2px', backgroundColor: 'var(--color-secondary)' }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content box */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              
              {/* TAB 1: Booking overview & Manager approvals */}
              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Manager Approval trigger card */}
                  {activeBooking.approvalStatus === 'awaiting_approval' && (
                    <div style={{ backgroundColor: 'var(--color-peach)', color: 'var(--color-peach-dark)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(253, 186, 116, 0.5)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
                        <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Requires Manager Signature Approval</span>
                      </div>
                      <p style={{ fontSize: '0.725rem', lineHeight: 1.35 }}>
                        Verify flight schedules and hotel allocations below before confirming seats and issuing flight tickets.
                      </p>
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ alignSelf: 'flex-start', marginTop: '4px' }}
                        leftIcon={<ThumbsUp className="w-4 h-4" />}
                        onClick={() => handleApproveBooking(activeBooking.id)}
                      >
                        Approve Booking & Lock Tickets
                      </Button>
                    </div>
                  )}

                  {/* Confirmed indicator banner */}
                  {activeBooking.approvalStatus === 'confirmed' && (
                    <div style={{ backgroundColor: 'var(--color-mint)', color: 'var(--color-mint-dark)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(167, 243, 208, 0.5)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check className="w-5 h-5 text-emerald-600" />
                      <span style={{ fontWeight: 700, fontSize: '0.825rem' }}>Ticketing Confirmed & Approved</span>
                    </div>
                  )}

                  {/* Pricing info details */}
                  <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Package Cost</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        ₹{activeBooking.cost.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Paid to Date</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-success)' }}>
                        ₹{activeBooking.paymentStatus === 'paid' ? activeBooking.cost.toLocaleString() : activeBooking.paymentStatus === 'partial' ? (activeBooking.cost / 2).toLocaleString() : '0'}
                      </div>
                    </div>
                  </div>

                  {/* Booking Specs */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Reservation Specifications</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <span style={{ fontWeight: 500 }}>Client Name:</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{activeBooking.client}</span>
                      <span style={{ fontWeight: 500 }}>Excursion Path:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{activeBooking.destination}</span>
                      <span style={{ fontWeight: 500 }}>Booking Dates:</span>
                      <span>{activeBooking.dates}</span>
                      <span style={{ fontWeight: 500 }}>Insurance Policy:</span>
                      <span>{activeBooking.insurancePolicy}</span>
                      <span style={{ fontWeight: 500 }}>Visa Requirements:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{activeBooking.visaStatus}</span>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: Re-orderable Itinerary Builder (Modern Timeline UI) */}
              {activeTab === 'itinerary' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '0.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                    Adjust itinerary sequencing manually using order controllers below:
                  </div>

                  {activeBooking.itinerary.map((item, idx) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        position: 'relative',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      {/* Left: Move buttons */}
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                        <button
                          disabled={idx === 0}
                          onClick={() => moveItineraryItem(activeBooking.id, item.id, 'up')}
                          style={{
                            border: 'none',
                            background: '#F1F5F9',
                            borderRadius: '4px',
                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                            padding: '2px',
                            opacity: idx === 0 ? 0.3 : 1,
                          }}
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === activeBooking.itinerary.length - 1}
                          onClick={() => moveItineraryItem(activeBooking.id, item.id, 'down')}
                          style={{
                            border: 'none',
                            background: '#F1F5F9',
                            borderRadius: '4px',
                            cursor: idx === activeBooking.itinerary.length - 1 ? 'not-allowed' : 'pointer',
                            padding: '2px',
                            opacity: idx === activeBooking.itinerary.length - 1 ? 0.3 : 1,
                          }}
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Right: Timeline content details */}
                      <div style={{ flex: 1, fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)', textTransform: 'capitalize' }}>
                            {item.type.toUpperCase()}: {item.title}
                          </span>
                          <span style={{ fontSize: '0.675rem', color: 'var(--text-tertiary)' }}>{item.time}</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
                          {item.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: Interactive Travel Checklist */}
              {activeTab === 'checklist' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Check off verification goals completed below:
                  </span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeBooking.checklist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleToggleChecklist(activeBooking.id, item.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-light)',
                          backgroundColor: item.done ? 'var(--color-soft-blue)' : '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={item.done}
                          readOnly
                          style={{ cursor: 'pointer' }}
                        />
                        <span
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            color: item.done ? 'var(--color-soft-blue-dark)' : 'var(--text-primary)',
                            textDecoration: item.done ? 'line-through' : 'none',
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: AI Overlap warnings & Automated Reminders */}
              {activeTab === 'ai' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Conflict Detection Banner */}
                  {activeBooking.hasConflict && (
                    <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 'var(--radius-md)', padding: '1rem', color: '#991B1B', display: 'flex', gap: '8px' }}>
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>AI Conflict Check Alert</div>
                        <p style={{ fontSize: '0.725rem', marginTop: '2px', lineHeight: 1.4 }}>
                          {activeBooking.conflictMessage}
                        </p>
                      </div>
                    </div>
                  )}

                  {!activeBooking.hasConflict && (
                    <div style={{ backgroundColor: 'var(--color-mint)', border: '1px solid rgba(167, 243, 208, 0.5)', borderRadius: 'var(--radius-md)', padding: '10px 14px', color: 'var(--color-mint-dark)', fontSize: '0.775rem' }}>
                      🟢 AI Audit confirms all flight schedules, hotel dates, and vehicle transfers have zero timing conflicts.
                    </div>
                  )}

                  {/* Automated reminder schedulers */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      Automated Customer Reminder Engine
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {activeBooking.reminders.map((rem, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid var(--border-light)',
                            backgroundColor: '#FFFFFF',
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '0.775rem', fontWeight: 600 }}>{rem.title}</div>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Dispatch time: {rem.sentDate}</span>
                          </div>
                          <Tag colorway={rem.status === 'sent' ? 'mint' : 'peach'}>
                            {rem.status.toUpperCase()}
                          </Tag>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 5: Invoice details & printable layout trigger */}
              {activeTab === 'invoices' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '0.25rem 0' }}>
                  
                  <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                    <FileText className="w-8 height-8 text-rose-500 mx-auto" style={{ margin: '0 auto 8px auto' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Client Invoice Statement PDF</div>
                    <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px', marginBottom: '0.75rem' }}>
                      Naaz Travels official accounting letterhead ready for print.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Printer className="w-3.5 h-3.5" />}
                      onClick={() => setIsInvoicePrintOpen(true)}
                    >
                      Print Invoice (window.print)
                    </Button>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Payment Balance Status:
                    </span>
                    <select
                      value={activeBooking.paymentStatus}
                      onChange={(e) => {
                        const nextVal = e.target.value as BookingItem['paymentStatus'];
                        setBbookings((prev) => prev.map((b) => (b.id === activeBooking.id ? { ...b, paymentStatus: nextVal } : b)));
                        setActiveBooking((prev) => (prev ? { ...prev, paymentStatus: nextVal } : null));
                      }}
                      style={{ width: '100%', padding: '6px', fontSize: '0.8rem', border: '1px solid var(--border-light)', borderRadius: '6px', outline: 'none' }}
                    >
                      <option value="paid">PAID (Full Payment Completed)</option>
                      <option value="partial">PARTIAL (Deposit Made)</option>
                      <option value="unpaid">UNPAID (Pending Invoicing)</option>
                    </select>
                  </div>

                </div>
              )}

            </div>

            {/* Footer triggers */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <Button
                variant="danger"
                leftIcon={<Trash2 className="w-4 h-4" />}
                onClick={() => {
                  if (confirm('Cancel and delete booking file?')) {
                    setBbookings((prev) => prev.filter((b) => b.id !== activeBooking.id));
                    setActiveBooking(null);
                  }
                }}
              >
                Cancel Booking
              </Button>
              <Button variant="secondary" onClick={() => setActiveBooking(null)}>
                Close Sheet
              </Button>
            </div>

          </div>
        )}
      </Drawer>

      {/* CREATE NEW BOOKING DIALOG MODAL POPUP */}
      {isAddOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.2)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9500,
            padding: '1.5rem',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAddOpen(false);
              setClientNameError('');
              setEmailError('');
              setStartDate('');
              setEndDate('');
            }
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '85vh',
              animation: 'page-enter 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="h2-subtitle" style={{ fontSize: '1.1rem' }}>Create Booking Excursion File</h3>
              <button
                onClick={() => { setIsAddOpen(false); setClientNameError(''); setEmailError(''); setStartDate(''); setEndDate(''); }}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleAddBookingSubmit} style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                <div>
                  <Input
                    label="Client Name *"
                    placeholder="e.g. Eleanor Harrison"
                    value={newBooking.client}
                    onChange={(e) => {
                      const val = e.target.value;
                      const cleanVal = val.replace(/[^a-zA-Z\s]/g, '');
                      if (/\d/.test(val)) {
                        setClientNameError('⚠️ Numbers are not permitted in client names!');
                      } else {
                        setClientNameError('');
                      }
                      setNewBooking({ ...newBooking, client: cleanVal });
                    }}
                    required
                  />
                  {clientNameError && (
                    <div style={{ color: '#E11D48', fontSize: '0.725rem', marginTop: '2px', fontWeight: 500 }}>
                      {clientNameError}
                    </div>
                  )}
                </div>
                <Input
                  label="Invoiced Cost (₹) *"
                  placeholder="e.g. 28500"
                  type="number"
                  value={newBooking.cost}
                  onChange={(e) => setNewBooking({ ...newBooking, cost: e.target.value })}
                  required
                />
              </div>

              <div>
                <Input
                  label="Client Email Address"
                  placeholder="e.g. eleanor@harrison.com"
                  value={newBooking.email}
                  onChange={(e) => {
                    const val = e.target.value;
                    const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
                    if (val === '') {
                      setEmailError('');
                    } else if (!emailRegex.test(val)) {
                      setEmailError('⚠️ Email must be in format: alphabets/numbers followed by @gmail.com (e.g. john123@gmail.com)');
                    } else {
                      setEmailError('');
                    }
                    setNewBooking({ ...newBooking, email: val });
                  }}
                />
                {emailError && (
                  <div style={{ color: '#E11D48', fontSize: '0.725rem', marginTop: '-8px', marginBottom: '8px', fontWeight: 500 }}>
                    {emailError}
                  </div>
                )}
              </div>

              <Select
                label="Destination Packages *"
                value={newBooking.destination}
                onChange={(e) => setNewBooking({ ...newBooking, destination: e.target.value })}
                options={[
                  { value: '', label: 'Select a destination package...' },
                  { value: 'Amalfi Coast Luxury Escape', label: 'Amalfi Coast Luxury Escape' },
                  { value: 'Kyoto Sanctuary Meditation', label: 'Kyoto Sanctuary Meditation' },
                  { value: 'Swiss Alps Hiking Adventure', label: 'Swiss Alps Hiking Adventure' },
                  { value: 'Tuscany Vineyards Heli-Tour', label: 'Tuscany Vineyards Heli-Tour' },
                  { value: 'Bali Tropical Paradise', label: 'Bali Tropical Paradise' },
                  { value: 'Paris Romance Getaway', label: 'Paris Romance Getaway' },
                  { value: 'Iceland Northern Lights Expedition', label: 'Iceland Northern Lights Expedition' },
                ]}
                required
              />

              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input
                    label="Start Date *"
                    type="date"
                    value={startDate}
                    onFocus={(e) => {
                      try {
                        e.target.showPicker();
                      } catch (err) {}
                    }}
                    onChange={(e) => updateBookingDates(e.target.value, endDate)}
                    required
                  />
                  <Input
                    label="End Date *"
                    type="date"
                    value={endDate}
                    onFocus={(e) => {
                      try {
                        e.target.showPicker();
                      } catch (err) {}
                    }}
                    onChange={(e) => updateBookingDates(startDate, e.target.value)}
                    required
                  />
                </div>
                {startDate && endDate && (
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-secondary)', marginTop: '8px', marginBottom: '8px' }}>
                    📅 Trip Duration: {calculateDays()} Days
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                <Input
                  label="Hotel Accommodations"
                  placeholder="e.g. Hotel de la Ville"
                  value={newBooking.hotelName}
                  onChange={(e) => setNewBooking({ ...newBooking, hotelName: e.target.value })}
                />
                <Input
                  label="Room Allocation"
                  placeholder="e.g. Suite #402"
                  value={newBooking.roomAllocation}
                  onChange={(e) => setNewBooking({ ...newBooking, roomAllocation: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                <Input
                  label="Flight Carrier"
                  placeholder="e.g. Lufthansa"
                  value={newBooking.flightCarrier}
                  onChange={(e) => setNewBooking({ ...newBooking, flightCarrier: e.target.value })}
                />
                <Input
                  label="Flight Number"
                  placeholder="e.g. LH-402"
                  value={newBooking.flightNumber}
                  onChange={(e) => setNewBooking({ ...newBooking, flightNumber: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
                <Button type="submit" variant="primary">
                  Draft Booking File
                </Button>
                <Button type="button" variant="secondary" onClick={() => { setIsAddOpen(false); setClientNameError(''); setEmailError(''); setStartDate(''); setEndDate(''); }}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE PDF INVOICE STATEMENT MODAL OVERLAY (NATIVE WINDOW.PRINT) */}
      {isInvoicePrintOpen && activeBooking && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#FFFFFF',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          {/* Top Bar actions (Hidden when printing via standard print css styling if compiled, but let's provide clean triggers) */}
          <div
            className="no-print"
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#F8FAFC',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Invoice Statement PDF Preview</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                variant="primary"
                leftIcon={<Printer className="w-4 h-4" />}
                onClick={() => window.print()}
              >
                Print / Save PDF
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsInvoicePrintOpen(false)}
              >
                Close Preview
              </Button>
            </div>
          </div>

          {/* Letterhead print body */}
          <div
            style={{
              padding: '3rem',
              maxWidth: '800px',
              margin: '0 auto',
              backgroundColor: '#FFFFFF',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.5,
              color: '#1F2937',
            }}
          >
            {/* Logo Letterhead */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #E2E8F0', paddingBottom: '1.5rem' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)' }}>Naaz Travels Ltd.</h1>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Luxury Custom Experiences | CRM Division</span>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#64748B' }}>
                <div>100 Fifth Avenue, Suite 400</div>
                <div>New York, NY 10011</div>
                <div>billing@naaz.travel</div>
              </div>
            </div>

            {/* Bill To section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem', fontSize: '0.875rem' }}>
              <div>
                <span style={{ color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600, fontSize: '0.75rem' }}>Billed To:</span>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginTop: '4px' }}>{activeBooking.client}</div>
                <div style={{ color: '#64748B', marginTop: '2px' }}>{activeBooking.email}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div><span style={{ fontWeight: 600 }}>Statement Reference:</span> #{activeBooking.id}</div>
                <div><span style={{ fontWeight: 600 }}>Invoice Date:</span> July 23, 2026</div>
                <div><span style={{ fontWeight: 600 }}>Excursion:</span> {activeBooking.destination}</div>
              </div>
            </div>

            {/* Itemized Table */}
            <table style={{ width: '100%', marginTop: '3rem', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#94A3B8' }}>
                  <th style={{ padding: '8px 0' }}>Itemized Travel Excursion Routing</th>
                  <th style={{ padding: '8px 0', textAlign: 'right' }}>Cost Details</th>
                </tr>
              </thead>
              <tbody>
                {activeBooking.itinerary.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px 0' }}>
                      <div style={{ fontWeight: 600 }}>{item.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>{item.details}</div>
                    </td>
                    <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>
                      {idx === 0 ? `₹${(activeBooking.cost * 0.4).toLocaleString()}` : idx === 2 ? `₹${(activeBooking.cost * 0.5).toLocaleString()}` : 'Included'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Balance details */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
              <div style={{ width: '280px', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#64748B' }}>Subtotal:</span>
                  <span style={{ fontWeight: 600 }}>₹{activeBooking.cost.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <span style={{ color: '#64748B' }}>Paid Deposits:</span>
                  <span style={{ fontWeight: 600, color: 'green' }}>
                    -₹{activeBooking.paymentStatus === 'paid' ? activeBooking.cost.toLocaleString() : activeBooking.paymentStatus === 'partial' ? (activeBooking.cost / 2).toLocaleString() : '0'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '1rem', borderTop: '2px solid #E2E8F0' }}>
                  <span style={{ fontWeight: 700 }}>Total Balance Due:</span>
                  <span style={{ fontWeight: 800, color: 'var(--color-secondary)' }}>
                    ₹{activeBooking.paymentStatus === 'paid' ? '0' : activeBooking.paymentStatus === 'partial' ? (activeBooking.cost / 2).toLocaleString() : activeBooking.cost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Signoff letterhead */}
            <div style={{ marginTop: '5rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#94A3B8' }}>
              Thank you for traveling with Naaz Custom Packages. For wire transfers and booking adjustments, contact billing@naaz.travel.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
