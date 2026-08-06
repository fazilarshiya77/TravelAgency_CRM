import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Table, type TableColumn } from '../components/ui/Table';
import { Tag } from '../components/ui/Tag';
import { Button } from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { Drawer } from '../components/ui/Drawer';
import {
  Search,
  UserPlus,
  Star,
  Grid,
  List,
  Award,
  Trash2,
  ExternalLink,
  FileText,
  AlertTriangle,
  Calendar,
  Mail,
  Download,
  Copy,
  Check,
  Users,
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface ContactNote {
  date: string;
  text: string;
  author: string;
}

interface CompanionItem {
  name: string;
  relation: string;
}

interface TripHistoryItem {
  year: string;
  destination: string;
  cost: number;
  rating: string;
}

interface VisaRecord {
  type: string;
  status: 'active' | 'expired' | 'pending';
  expiryDate: string;
}

interface FileRecord {
  name: string;
  size: string;
  type: string;
}

interface CommunicationLog {
  date: string;
  channel: 'email' | 'whatsapp';
  snippet: string;
  incoming: boolean;
}

interface ContactItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  birthday: string; // "YYYY-MM-DD"
  birthdayLabel: string; // e.g. "July 28"
  ltv: number;
  totalTrips: number;
  sentiment: 'positive' | 'warning' | 'info';
  sentimentLabel: string;
  preferredClass: 'first' | 'business' | 'economy';
  isVip: boolean;
  passport: {
    number: string;
    country: string;
    expiryDate: string;
  };
  visas: VisaRecord[];
  preferences: {
    seating: string;
    dietary: string;
    hotelGroup: string;
    budgetLimit: number;
    favDestinations: string[];
  };
  aiSummary: string;
  companions: CompanionItem[];
  notes: ContactNote[];
  history: TripHistoryItem[];
  files: FileRecord[];
  communications: CommunicationLog[];
}

export const ContactsView: React.FC = () => {
  const { triggerAICommand } = useNavigation();

  // 1. CRM Contacts state list
  const [contacts, setContacts] = useState<ContactItem[]>([
    {
      id: 'C-001',
      name: 'Aarav Mehta',
      email: 'aarav.mehta@gmail.com',
      phone: '+91-98765-43210',
      location: 'Mumbai, India',
      birthday: '1985-07-28',
      birthdayLabel: 'July 28',
      ltv: 92400,
      totalTrips: 12,
      sentiment: 'positive',
      sentimentLabel: 'Exceptional (98%)',
      preferredClass: 'first',
      isVip: true,
      passport: {
        number: 'IN-987211A',
        country: 'India',
        expiryDate: '2026-11-20',
      },
      visas: [
        { type: 'Schengen Visa', status: 'active', expiryDate: '2027-05-14' },
        { type: 'Japan tourist visa', status: 'active', expiryDate: '2026-12-01' },
      ],
      preferences: {
        seating: 'Window',
        dietary: 'Gluten-Free',
        hotelGroup: 'Aman Group',
        budgetLimit: 35000,
        favDestinations: ['Tuscany', 'Kyoto', 'Amalfi Coast'],
      },
      aiSummary: 'Frequent flyer who prioritizes luxury. High close rate but requires window seats. Regularly travels with wife and son. Marriott Loyalty and Aman Club member.',
      companions: [
        { name: 'Kavita Mehta', relation: 'Spouse' },
        { name: 'Ishaan Mehta', relation: 'Son' },
      ],
      notes: [
        { date: '2026-07-15 14:00', text: 'Client prefers hotel transfers with private luxury SUVs.', author: 'Sophia Loren' },
        { date: '2026-06-20 11:30', text: 'Mehta family prefers non-stop flights whenever possible.', author: 'Mohammed Rayhan' },
      ],
      history: [
        { year: '2025', destination: 'Amalfi Coast Villa Escape', cost: 28500, rating: '5/5 Stars' },
        { year: '2024', destination: 'Tokyo Autumn Tea Tour', cost: 18200, rating: '5/5 Stars' },
        { year: '2023', destination: 'Serengeti Photo Safari', cost: 22000, rating: '4.8/5 Stars' },
      ],
      files: [
        { name: 'Passport_Copy_Aarav.pdf', size: '1.2 MB', type: 'PDF' },
        { name: 'Schengen_Visa_Approved.pdf', size: '890 KB', type: 'PDF' },
      ],
      communications: [
        { date: '2026-07-22 11:00', channel: 'email', snippet: 'The seats look perfect. Please reserve the business class layouts.', incoming: true },
        { date: '2026-07-21 16:45', channel: 'whatsapp', snippet: 'Hello Mr. Mehta! Here are the private ocean-view balcony photos.', incoming: false },
      ],
    },
    {
      id: 'C-002',
      name: 'Priya Sharma',
      email: 'priya.sharma@yahoo.com',
      phone: '+91-91234-56789',
      location: 'Delhi, India',
      birthday: '1990-08-04',
      birthdayLabel: 'August 04',
      ltv: 48000,
      totalTrips: 7,
      sentiment: 'info',
      sentimentLabel: 'Satisfied (84%)',
      preferredClass: 'business',
      isVip: false,
      passport: {
        number: 'IN-102948B',
        country: 'India',
        expiryDate: '2030-04-12',
      },
      visas: [
        { type: 'Schengen Visa', status: 'expired', expiryDate: '2025-06-01' },
      ],
      preferences: {
        seating: 'Aisle',
        dietary: 'None',
        hotelGroup: 'Four Seasons',
        budgetLimit: 15000,
        favDestinations: ['Swiss Alps', 'Patagonia'],
      },
      aiSummary: 'Enjoys luxury hiking and active trails. Prefers high floor rooms with a panoramic view. Typically books solo or with small corporate groups.',
      companions: [],
      notes: [
        { date: '2026-07-22 10:15', text: 'Enjoys luxury hiking and active tours. Prefers high floor hotel rooms.', author: 'Emma Watson' },
      ],
      history: [
        { year: '2025', destination: 'Swiss Alps Premium Trek', cost: 14500, rating: '4.5/5 Stars' },
        { year: '2024', destination: 'Patagonia Wilderness Adventure', cost: 12000, rating: '4.7/5 Stars' },
      ],
      files: [
        { name: 'Passport_Priya_Sharma.pdf', size: '2.1 MB', type: 'PDF' },
      ],
      communications: [
        { date: '2026-07-22 14:00', channel: 'email', snippet: 'Confirming hiking tour slots in Interlaken.', incoming: false },
      ],
    },
    {
      id: 'C-003',
      name: 'Rohan Gupta',
      email: 'rohan.gupta@gmail.com',
      phone: '+91-98100-23456',
      location: 'Bangalore, India',
      birthday: '1993-07-30',
      birthdayLabel: 'July 30',
      ltv: 24500,
      totalTrips: 4,
      sentiment: 'positive',
      sentimentLabel: 'Exceptional (92%)',
      preferredClass: 'business',
      isVip: false,
      passport: {
        number: 'IN-882931Z',
        country: 'India',
        expiryDate: '2029-08-15',
      },
      visas: [
        { type: 'Japan Multi-Entry', status: 'active', expiryDate: '2028-10-10' },
      ],
      preferences: {
        seating: 'Window',
        dietary: 'Vegan',
        hotelGroup: 'Marriott Bonvoy',
        budgetLimit: 10000,
        favDestinations: ['Kyoto', 'Bali'],
      },
      aiSummary: 'Wellness and meditation focused client. Strict vegan dietary settings. Stays exclusively in Marriott properties to gather brand loyalty rewards.',
      companions: [
        { name: 'Rahul Gupta', relation: 'Brother' },
      ],
      notes: [
        { date: '2026-07-23 09:30', text: 'Requires vegan meal confirmation on all long-haul flights.', author: 'Sophia Loren' },
      ],
      history: [
        { year: '2025', destination: 'Kyoto Sanctuary Package', cost: 8900, rating: '5/5 Stars' },
      ],
      files: [],
      communications: [],
    },
    {
      id: 'C-004',
      name: 'Ananya Patel',
      email: 'ananya.patel@patel.co.in',
      phone: '+91-98980-12345',
      location: 'Ahmedabad, India',
      birthday: '1978-10-12',
      birthdayLabel: 'October 12',
      ltv: 112000,
      totalTrips: 15,
      sentiment: 'positive',
      sentimentLabel: 'Exceptional (96%)',
      preferredClass: 'first',
      isVip: true,
      passport: {
        number: 'IN-772911C',
        country: 'India',
        expiryDate: '2026-09-05',
      },
      visas: [
        { type: 'US B1/B2 Visa', status: 'active', expiryDate: '2034-03-10' },
        { type: 'Schengen Visa', status: 'active', expiryDate: '2028-11-20' },
      ],
      preferences: {
        seating: 'Aisle',
        dietary: 'None',
        hotelGroup: 'Aman Group',
        budgetLimit: 45000,
        favDestinations: ['Greece', 'Egypt', 'Rome'],
      },
      aiSummary: 'High net worth history academic. Prefers archaeology guides and ancient history experts. Books yachts and premium catamaran charters.',
      companions: [
        { name: 'Vikram Patel', relation: 'Spouse' },
      ],
      notes: [
        { date: '2026-07-10 16:45', text: 'Prefers historic tours and ancient architecture experts as guides.', author: 'Liam Neeson' },
      ],
      history: [
        { year: '2025', destination: 'Greek Island Sailing Yacht', cost: 32000, rating: '5/5 Stars' },
        { year: '2024', destination: 'Egypt Nile Cruise Heritage', cost: 18500, rating: '4.9/5 Stars' },
      ],
      files: [
        { name: 'Catamaran_Charter_Agreement.pdf', size: '2.5 MB', type: 'PDF' },
        { name: 'Passport_Copy_Ananya.pdf', size: '1.4 MB', type: 'PDF' },
      ],
      communications: [
        { date: '2026-07-23 09:00', channel: 'email', snippet: 'Greek Island Yacht Charter agreement signed and processed.', incoming: false },
      ],
    },
  ]);

  // 2. Navigation & UI States
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterVip, setFilterVip] = useState<boolean>(false);
  const [activeContact, setActiveContact] = useState<ContactItem | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'docs' | 'history' | 'communications' | 'files'>('profile');

  // Copy success indicator
  const [copied, setCopied] = useState(false);

  // Note log states
  const [noteInput, setNoteInput] = useState('');
  // Companion form states
  const [newCompanion, setNewCompanion] = useState({ name: '', relation: 'Spouse' });

  // 3. Add Client dialog state variables
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    birthday: '',
    ltv: '',
    totalTrips: '',
    preferredClass: 'business' as ContactItem['preferredClass'],
    isVip: false,
    passportNumber: '',
    passportCountry: 'United States',
    passportExpiry: '',
    seating: 'Window',
    dietary: 'None',
    hotelGroup: 'Marriott Bonvoy',
    budgetLimit: '15000',
    favDestinations: '',
    aiSummary: '',
  });

  // 4. Client Birthday checks (birthdays in next 30 days)
  const today = new Date('2026-07-23'); // matching local system timeline context
  const getDaysUntilBirthday = (birthdayStr: string) => {
    const bdate = new Date(birthdayStr);
    const bMonth = bdate.getMonth();
    const bDay = bdate.getDate();
    
    const nextBday = new Date(today.getFullYear(), bMonth, bDay);
    if (nextBday.getTime() < today.getTime()) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = nextBday.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const birthdayList = contacts
    .map((c) => ({
      name: c.name,
      email: c.email,
      days: getDaysUntilBirthday(c.birthday),
      label: c.birthdayLabel,
    }))
    .filter((c) => c.days <= 30)
    .sort((a, b) => a.days - b.days);

  // 5. Filter Processing
  const filteredContacts = contacts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());

    const matchClass = filterClass === 'all' || c.preferredClass === filterClass;
    const matchVip = !filterVip || c.isVip;

    return matchSearch && matchClass && matchVip;
  });

  // Copy AI Summary text
  const handleCopySummary = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Add Notes logs
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim() || !activeContact) return;

    const noteItem: ContactNote = {
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      text: noteInput,
      author: 'Mohammed Rayhan',
    };

    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContact.id
          ? { ...c, notes: [noteItem, ...c.notes] }
          : c
      )
    );

    setActiveContact((prev) =>
      prev ? { ...prev, notes: [noteItem, ...prev.notes] } : null
    );

    setNoteInput('');
  };

  // Add Companion logic
  const handleAddCompanion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanion.name.trim() || !activeContact) return;

    const companionItem: CompanionItem = {
      name: newCompanion.name,
      relation: newCompanion.relation,
    };

    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContact.id
          ? { ...c, companions: [...c.companions, companionItem] }
          : c
      )
    );

    setActiveContact((prev) =>
      prev ? { ...prev, companions: [...prev.companions, companionItem] } : null
    );

    setNewCompanion({ name: '', relation: 'Spouse' });
  };

  // Delete document file
  const handleDeleteFile = (fileName: string) => {
    if (!activeContact) return;
    if (confirm(`Remove file attachment "${fileName}"?`)) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === activeContact.id
            ? { ...c, files: c.files.filter((f) => f.name !== fileName) }
            : c
        )
      );
      setActiveContact((prev) =>
        prev ? { ...prev, files: prev.files.filter((f) => f.name !== fileName) } : null
      );
    }
  };

  // Delete client profile
  const handleDeleteContact = (contactId: string) => {
    if (confirm('Are you sure you want to delete this client from CRM contact index?')) {
      setContacts((prev) => prev.filter((c) => c.id !== contactId));
      setActiveContact(null);
    }
  };

  // Create client profile
  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.location) return;

    const generatedId = 'C-' + String(contacts.length + 1).padStart(3, '0');
    const ltvVal = parseFloat(newContact.ltv) || 0;
    const tripsVal = parseInt(newContact.totalTrips) || 0;
    const budgetLimitVal = parseFloat(newContact.budgetLimit) || 10000;
    
    // Parse birthday date for Label
    let bdayLabel = 'Pending';
    if (newContact.birthday) {
      const parts = newContact.birthday.split('-');
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      if (parts.length === 3) {
        bdayLabel = `${months[parseInt(parts[1]) - 1]} ${parts[2]}`;
      }
    }

    const newItem: ContactItem = {
      id: generatedId,
      name: newContact.name,
      email: newContact.email || 'guest@agency.com',
      phone: newContact.phone || '+1-555-0100',
      location: newContact.location,
      birthday: newContact.birthday || '1990-01-01',
      birthdayLabel: bdayLabel,
      ltv: ltvVal,
      totalTrips: tripsVal,
      sentiment: 'info',
      sentimentLabel: 'Active',
      preferredClass: newContact.preferredClass,
      isVip: newContact.isVip,
      passport: {
        number: newContact.passportNumber || 'Pending',
        country: newContact.passportCountry,
        expiryDate: newContact.passportExpiry || '2030-01-01',
      },
      visas: [],
      preferences: {
        seating: newContact.seating,
        dietary: newContact.dietary,
        hotelGroup: newContact.hotelGroup,
        budgetLimit: budgetLimitVal,
        favDestinations: newContact.favDestinations ? newContact.favDestinations.split(',').map((t) => t.trim()) : [],
      },
      aiSummary: newContact.aiSummary || 'Client details qualified in Naaz Travels CRM.',
      companions: [],
      notes: [
        {
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          text: 'Contact profile created.',
          author: 'Mohammed Rayhan',
        },
      ],
      history: [],
      files: [],
      communications: [],
    };

    setContacts((prev) => [newItem, ...prev]);
    setIsAddOpen(false);
    setNewContact({
      name: '',
      email: '',
      phone: '',
      location: '',
      birthday: '',
      ltv: '',
      totalTrips: '',
      preferredClass: 'business',
      isVip: false,
      passportNumber: '',
      passportCountry: 'United States',
      passportExpiry: '',
      seating: 'Window',
      dietary: 'None',
      hotelGroup: 'Marriott Bonvoy',
      budgetLimit: '15000',
      favDestinations: '',
      aiSummary: '',
    });
  };

  // Columns definition for table layout
  const columns: TableColumn<ContactItem>[] = [
    {
      header: 'Client Profile',
      accessor: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: row.isVip ? 'var(--color-peach)' : 'var(--color-soft-blue)',
              color: row.isVip ? 'var(--color-peach-dark)' : 'var(--color-soft-blue-dark)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
            }}
          >
            {row.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>{row.name}</span>
              {row.isVip && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{row.location}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'LTV Value',
      accessor: (row) => <span style={{ fontWeight: 600 }}>₹{row.ltv.toLocaleString()}</span>,
      align: 'right' as const,
    },
    {
      header: 'Birthday',
      accessor: (row) => <span>{row.birthdayLabel}</span>,
    },
    {
      header: 'AI Satisfaction',
      accessor: (row) => (
        <Tag colorway={row.sentiment === 'positive' ? 'mint' : 'soft-blue'}>
          {row.sentimentLabel}
        </Tag>
      ),
    },
    {
      header: 'Flight Tier',
      accessor: (row) => <span style={{ textTransform: 'capitalize', fontSize: '0.8rem' }}>{row.preferredClass}</span>,
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
            setActiveContact(row);
            setActiveTab('profile');
          }}
        >
          View Profile
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.4s ease-out forwards' }}>
      
      {/* Header controls switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem' }}>Client Directory Database</h2>
          <p className="body-normal" style={{ marginTop: '0.25rem' }}>
            Comprehensive passport credentials, visa validity trackers, upcoming birthday reminders, and custom file uploads.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Grid vs Table switcher */}
          <div style={{ display: 'flex', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', padding: '2px', boxShadow: 'var(--shadow-sm)' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: viewMode === 'grid' ? 'var(--color-soft-blue)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--color-soft-blue-dark)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
              }}
            >
              <Grid className="w-4 h-4" />
              <span>Cards Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: viewMode === 'table' ? 'var(--color-soft-blue)' : 'transparent',
                color: viewMode === 'table' ? 'var(--color-soft-blue-dark)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
              }}
            >
              <List className="w-4 h-4" />
              <span>Table List</span>
            </button>
          </div>

          <Button variant="primary" leftIcon={<UserPlus className="w-4 h-4" />} onClick={() => setIsAddOpen(true)}>
            Add New Client
          </Button>
        </div>
      </div>

      {/* Main Panel layout with Birthday Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Left Side: Filter and Cards/Table list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Filters Bar */}
          <Card>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <Input
                  placeholder="Search clients by name, location, or passport numbers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                  style={{ marginBottom: 0 }}
                />
              </div>
              <div style={{ width: '150px' }}>
                <Select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Classes' },
                    { value: 'first', label: 'First Class' },
                    { value: 'business', label: 'Business Class' },
                    { value: 'economy', label: 'Economy Class' },
                  ]}
                  style={{ marginBottom: 0 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="checkbox"
                  id="vipFilterCheck"
                  checked={filterVip}
                  onChange={(e) => setFilterVip(e.target.checked)}
                  style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                />
                <label htmlFor="vipFilterCheck" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  VIP Status
                </label>
              </div>
            </div>
          </Card>

          {/* Cards or Table */}
          {viewMode === 'table' ? (
            <Card style={{ padding: 0 }}>
              <Table columns={columns} data={filteredContacts} onRowClick={(row) => {
                setActiveContact(row);
                setActiveTab('profile');
              }} />
            </Card>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {filteredContacts.map((c) => {
                // Check if passport is expiring soon (less than 6 months from today: 180 days)
                const isPassportExpiringSoon = (expiryStr: string) => {
                  const expiry = new Date(expiryStr);
                  const diffTime = expiry.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays < 180;
                };

                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setActiveContact(c);
                      setActiveTab('profile');
                    }}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-xl)',
                      padding: '1.25rem',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      transition: 'all var(--transition-fast)',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                      e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                      e.currentTarget.style.borderColor = 'var(--border-light)';
                    }}
                  >
                    {/* VIP Star Icon badge */}
                    {c.isVip && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'var(--color-peach)', padding: '2px 8px', borderRadius: '4px' }}>
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-peach-dark)' }}>VIP</span>
                      </div>
                    )}

                    {/* Passport Expiration tag alert */}
                    {!c.isVip && isPassportExpiringSoon(c.passport.expiryDate) && (
                      <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', alignItems: 'center', gap: '3px', backgroundColor: '#FEE2E2', color: '#991B1B', padding: '2px 6px', borderRadius: '4px' }}>
                        <AlertTriangle className="w-3 h-3" />
                        <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>Doc Alert</span>
                      </div>
                    )}

                    {/* Client Core */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: (c.isVip || isPassportExpiringSoon(c.passport.expiryDate)) ? '10px' : '0' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: c.isVip ? 'var(--color-peach)' : 'var(--color-soft-blue)',
                          color: c.isVip ? 'var(--color-peach-dark)' : 'var(--color-soft-blue-dark)',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {c.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{c.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{c.location}</div>
                      </div>
                    </div>

                    {/* Budgets & Trips */}
                    <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', padding: '8px 0', marginTop: '4px' }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>LTV sales</span>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          ₹{c.ltv.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Vacations</span>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {c.totalTrips} Trips
                        </div>
                      </div>
                    </div>

                    {/* Expirations alert text snippet */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-secondary)', alignItems: 'center' }}>
                      <span>Birthday: {c.birthdayLabel}</span>
                      <span style={{ textTransform: 'capitalize', fontWeight: 600, color: 'var(--color-secondary)' }}>
                        {c.preferredClass}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Sidebar panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Upcoming Birthdays widget */}
          <Card title="Client Birthdays" subtitle="Prospect birthdays in the next 30 days">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0.25rem 0' }}>
              {birthdayList.map((bday, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{bday.name}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar className="w-3.5 h-3.5 text-sky-500" />
                      <span>{bday.label} ({bday.days}d left)</span>
                    </div>
                  </div>

                  <a
                    href={`mailto:${bday.email}?subject=Happy%20Birthday!&body=Hi%20${bday.name.split(' ')[0]},%20we%20wish%20you%20a%20fantastic%20birthday!`}
                    style={{
                      padding: '4px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-soft-blue)',
                      color: 'var(--color-soft-blue-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
              {birthdayList.length === 0 && (
                <div style={{ padding: '1rem 0', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                  No upcoming birthdays.
                </div>
              )}
            </div>
          </Card>

          {/* AI Metrics block */}
          <Card title="Agency Analytics" subtitle="Directory counts snapshot">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total LTV Directory:</span>
                <span style={{ fontWeight: 700 }}>₹276,900</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>VIP Members Count:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-peach-dark)' }}>2 Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Doc Alerts Flagged:</span>
                <span style={{ fontWeight: 700, color: '#B91C1C' }}>2 Passports</span>
              </div>
            </div>
          </Card>
        </div>

      </div>

      {/* DETAILED 5-TAB PROFILE DRAWER PANEL (HUBSPOT STYLE) */}
      <Drawer
        isOpen={activeContact !== null}
        onClose={() => { setActiveContact(null); setNoteInput(''); }}
        title={activeContact ? `Client Profile: ${activeContact.name}` : ''}
        width="480px"
      >
        {activeContact && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}>
            
            {/* Tabs selector */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', gap: '4px' }}>
              {([
                { key: 'profile', label: 'AI Profile' },
                { key: 'docs', label: 'Passport & Visa' },
                { key: 'history', label: 'History' },
                { key: 'communications', label: 'Comms' },
                { key: 'files', label: 'Notes & Files' },
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

            {/* Tab content renders */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              
              {/* TAB 1: AI Summary & general stats */}
              {activeTab === 'profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* VIP banner card */}
                  {activeContact.isVip && (
                    <div style={{ backgroundColor: 'var(--color-peach)', color: 'var(--color-peach-dark)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(253, 186, 116, 0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Award className="w-5 h-5 text-amber-600 animate-pulse-soft" />
                      <span style={{ fontWeight: 700, fontSize: '0.825rem' }}>VIP Client Travel Index Active</span>
                    </div>
                  )}

                  {/* AI Copyable Customer Summary card */}
                  <div style={{ background: 'linear-gradient(135deg, #EAF8FF 0%, #FFE8D6 100%)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-secondary)' }}>AI CUSTOMER PROFILE SUMMARY</span>
                      <button
                        onClick={() => handleCopySummary(activeContact.aiSummary)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem' }}
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                      </button>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.45, fontStyle: 'italic' }}>
                      "{activeContact.aiSummary}"
                    </p>
                  </div>

                  {/* General settings stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span style={{ fontWeight: 500 }}>CRM Identifier:</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{activeContact.id}</span>
                    <span style={{ fontWeight: 500 }}>VIP Tag Status:</span>
                    <span>{activeContact.isVip ? 'VIP Tier Class' : 'Standard Member'}</span>
                    <span style={{ fontWeight: 500 }}>Email Address:</span>
                    <span>{activeContact.email}</span>
                    <span style={{ fontWeight: 500 }}>Phone Contact:</span>
                    <span>{activeContact.phone}</span>
                    <span style={{ fontWeight: 500 }}>Birthday:</span>
                    <span>{activeContact.birthday} ({activeContact.birthdayLabel})</span>
                    <span style={{ fontWeight: 500 }}>Favorite Places:</span>
                    <span style={{ color: 'var(--text-primary)' }}>{activeContact.preferences.favDestinations.join(', ') || 'None selected'}</span>
                  </div>

                  {/* Preferred Travel limits */}
                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Preferences Profile</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <span style={{ fontWeight: 500 }}>Flight Seating:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{activeContact.preferences.seating}</span>
                      <span style={{ fontWeight: 500 }}>Dietary Choices:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{activeContact.preferences.dietary}</span>
                      <span style={{ fontWeight: 500 }}>Hotel Preferences:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{activeContact.preferences.hotelGroup}</span>
                      <span style={{ fontWeight: 500 }}>Budget Constraint:</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Max ₹{activeContact.preferences.budgetLimit.toLocaleString()} per trip</span>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: Passport & Visa Validities */}
              {activeTab === 'docs' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Passport specifications card */}
                  <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      Passport Identification Details
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <span style={{ fontWeight: 500 }}>Passport Number:</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{activeContact.passport.number}</span>
                      <span style={{ fontWeight: 500 }}>Country Issued:</span>
                      <span>{activeContact.passport.country}</span>
                      <span style={{ fontWeight: 500 }}>Expiration Date:</span>
                      <span style={{ fontWeight: 600 }}>{activeContact.passport.expiryDate}</span>
                    </div>

                    {/* Expiration check warn banner */}
                    {new Date(activeContact.passport.expiryDate).getTime() - today.getTime() < 180 * 24 * 60 * 60 * 1000 && (
                      <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '8px 10px', borderRadius: '4px', marginTop: '0.75rem', fontSize: '0.725rem', display: 'flex', gap: '6px' }}>
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        <span>⚠️ Passport expires in less than 6 months! Advise client to renew before scheduling flight reservations.</span>
                      </div>
                    )}
                  </div>

                  {/* Visa Status table list */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Active Visa Validity Tracks</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {activeContact.visas.map((visa, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: '1px solid var(--border-light)',
                            backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)',
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{visa.type}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Expires: {visa.expiryDate}</div>
                          </div>
                          <Tag colorway={visa.status === 'active' ? 'mint' : 'danger'}>
                            {visa.status.toUpperCase()}
                          </Tag>
                        </div>
                      ))}
                      {activeContact.visas.length === 0 && (
                        <div style={{ padding: '1.5rem', textAlign: 'center', border: '1px dashed var(--border-light)', color: 'var(--text-tertiary)', borderRadius: '6px', fontSize: '0.75rem' }}>
                          No active visa records logged.
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: Booking & Travel History */}
              {activeTab === 'history' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Spent</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                        ₹{activeContact.history.reduce((a, b) => a + b.cost, 0).toLocaleString()}
                      </div>
                    </div>
                    <div style={{ flex: 1, backgroundColor: '#F8FAFC', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Trips Count</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {activeContact.totalTrips} vacations
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Vacation History Logs</h4>
                    {activeContact.history.map((trip, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)',
                          borderRadius: '6px',
                          border: '1px solid var(--border-light)',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{trip.destination}</div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Year: {trip.year} | Rating: {trip.rating}</span>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-secondary)' }}>
                          ₹{trip.cost.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Companions & Communication timeline */}
              {activeTab === 'communications' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Companion relationship lists */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <Users className="w-4 h-4 text-sky-500" />
                      <span>Family Travel Companions ({activeContact.companions.length})</span>
                    </h4>

                    {/* Companion creator */}
                    <form onSubmit={handleAddCompanion} style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', backgroundColor: '#F8FAFC', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-light)', marginBottom: '0.5rem' }}>
                      <div style={{ flex: 2 }}>
                        <input
                          type="text"
                          placeholder="Companion name..."
                          value={newCompanion.name}
                          onChange={(e) => setNewCompanion({ ...newCompanion, name: e.target.value })}
                          style={{ width: '100%', padding: '5px', fontSize: '0.75rem', border: '1px solid var(--border-light)', borderRadius: '4px', outline: 'none' }}
                        />
                      </div>
                      <div style={{ flex: 1.2 }}>
                        <select
                          value={newCompanion.relation}
                          onChange={(e) => setNewCompanion({ ...newCompanion, relation: e.target.value })}
                          style={{ width: '100%', padding: '4px', fontSize: '0.75rem', border: '1px solid var(--border-light)', borderRadius: '4px', outline: 'none' }}
                        >
                          <option value="Spouse">Spouse</option>
                          <option value="Daughter">Daughter</option>
                          <option value="Son">Son</option>
                          <option value="Parent">Parent</option>
                          <option value="Friend">Friend</option>
                        </select>
                      </div>
                      <button type="submit" style={{ padding: '4px 10px', backgroundColor: 'var(--color-secondary)', color: '#FFFFFF', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>
                        Add
                      </button>
                    </form>

                    {/* Companions layout */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {activeContact.companions.map((comp, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', border: '1px solid var(--border-light)', borderRadius: '4px', fontSize: '0.775rem' }}>
                          <span style={{ fontWeight: 600 }}>{comp.name}</span>
                          <Tag colorway="soft-blue">{comp.relation}</Tag>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Communication history logs */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Relationship Communication Feed</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {activeContact.communications.map((comms, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: comms.channel === 'email' ? 'var(--color-secondary)' : '#10B981', marginTop: '6px' }} />
                          </div>
                          <div style={{ flex: 1, fontSize: '0.775rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-tertiary)', fontSize: '0.675rem' }}>
                              <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>{comms.channel} Log</span>
                              <span>{comms.date}</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>
                              "{comms.snippet}"
                            </p>
                          </div>
                        </div>
                      ))}
                      {activeContact.communications.length === 0 && (
                        <div style={{ padding: '1rem 0', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                          No communications logged.
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 5: Files uploads & Notes persistence */}
              {activeTab === 'files' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  {/* Persistent Note Logger */}
                  <div>
                    <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <textarea
                        placeholder="Add a persistent CRM travel note..."
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                        style={{ minHeight: '60px', padding: '8px', fontSize: '0.8rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', outline: 'none', fontFamily: 'inherit' }}
                      />
                      <Button type="submit" variant="outline" size="sm" style={{ alignSelf: 'flex-end' }}>
                        Save Travel Note
                      </Button>
                    </form>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {activeContact.notes.map((note, idx) => (
                        <div key={idx} style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', fontSize: '0.775rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-tertiary)', fontSize: '0.65rem', marginBottom: '3px', fontWeight: 600 }}>
                            <span>Author: {note.author}</span>
                            <span>{note.date}</span>
                          </div>
                          <p style={{ color: 'var(--text-primary)', lineHeight: 1.4 }}>{note.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Passport copies / visa file uploads */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <FileText className="w-4 h-4 text-sky-500" />
                      <span>Passenger Document Attachments</span>
                    </h4>

                    {/* Files list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {activeContact.files.map((file, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', border: '1px solid var(--border-light)', borderRadius: '6px', backgroundColor: '#FFFFFF' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FileText className="w-4 h-4 text-rose-500" />
                            <div>
                              <div style={{ fontSize: '0.775rem', fontWeight: 600 }}>{file.name}</div>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-tertiary)' }}>{file.size} | {file.type}</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <a
                              href="#"
                              onClick={(e) => { e.preventDefault(); alert(`Downloading file: ${file.name}`); }}
                              style={{ padding: '4px', borderRadius: '4px', backgroundColor: 'var(--color-soft-blue)', color: 'var(--color-soft-blue-dark)' }}
                            >
                              <Download className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href="#"
                              onClick={(e) => { e.preventDefault(); handleDeleteFile(file.name); }}
                              style={{ padding: '4px', borderRadius: '4px', backgroundColor: '#FEE2E2', color: '#B91C1C' }}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                      {activeContact.files.length === 0 && (
                        <div style={{ padding: '1.5rem', textAlign: 'center', border: '1px dashed var(--border-light)', borderRadius: '6px', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
                          No passport scans or travel files attached.
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Bottom Actions footer */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <Button
                variant="danger"
                leftIcon={<Trash2 className="w-4 h-4" />}
                onClick={() => handleDeleteContact(activeContact.id)}
              >
                Delete Profile
              </Button>
              <Button
                variant="primary"
                style={{ flex: 1 }}
                onClick={() => {
                  triggerAICommand(`Draft visa validity email reminder to ${activeContact.name}`);
                  setActiveContact(null);
                }}
              >
                AI Visa Check
              </Button>
            </div>

          </div>
        )}
      </Drawer>

      {/* CREATE NEW CLIENT MODAL DIALOG POPUP */}
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
            if (e.target === e.currentTarget) setIsAddOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '540px',
              backgroundColor: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)',
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
              <h3 className="h2-subtitle" style={{ fontSize: '1.1rem' }}>Create Client CRM Profile</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleAddContactSubmit} style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                <Input
                  label="Full Client Name *"
                  placeholder="e.g. John Miller"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  required
                />
                <Input
                  label="Birthday (YYYY-MM-DD) *"
                  placeholder="e.g. 1985-07-28"
                  type="date"
                  value={newContact.birthday}
                  onChange={(e) => setNewContact({ ...newContact, birthday: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input
                  label="Email Address"
                  placeholder="e.g. john@miller.com"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                />
                <Input
                  label="Phone Contact"
                  placeholder="e.g. +1-555-0112"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                <Input
                  label="Client Location *"
                  placeholder="e.g. London, UK"
                  value={newContact.location}
                  onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                  required
                />
                <Select
                  label="Travel Class"
                  value={newContact.preferredClass}
                  onChange={(e) => setNewContact({ ...newContact, preferredClass: e.target.value as ContactItem['preferredClass'] })}
                  options={[
                    { value: 'first', label: 'First Class' },
                    { value: 'business', label: 'Business Class' },
                    { value: 'economy', label: 'Economy Class' },
                  ]}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
                <Input
                  label="Passport Number"
                  placeholder="e.g. US-987211A"
                  value={newContact.passportNumber}
                  onChange={(e) => setNewContact({ ...newContact, passportNumber: e.target.value })}
                />
                <Input
                  label="Passport Expiry"
                  type="date"
                  value={newContact.passportExpiry}
                  onChange={(e) => setNewContact({ ...newContact, passportExpiry: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input
                  label="LTV Value (₹)"
                  placeholder="e.g. 50000"
                  value={newContact.ltv}
                  onChange={(e) => setNewContact({ ...newContact, ltv: e.target.value })}
                  type="number"
                />
                <Input
                  label="Total Trips"
                  placeholder="e.g. 6"
                  value={newContact.totalTrips}
                  onChange={(e) => setNewContact({ ...newContact, totalTrips: e.target.value })}
                  type="number"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input
                  label="Preferred Trip Budget Limit (₹)"
                  placeholder="e.g. 15000"
                  value={newContact.budgetLimit}
                  onChange={(e) => setNewContact({ ...newContact, budgetLimit: e.target.value })}
                  type="number"
                />
                <Input
                  label="Favorite Destinations (comma list)"
                  placeholder="e.g. Tuscany, Bali"
                  value={newContact.favDestinations}
                  onChange={(e) => setNewContact({ ...newContact, favDestinations: e.target.value })}
                />
              </div>

              {/* Preferences selectors */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '1rem' }}>
                <Select
                  label="Seating"
                  value={newContact.seating}
                  onChange={(e) => setNewContact({ ...newContact, seating: e.target.value })}
                  options={[
                    { value: 'Window', label: 'Window Seat' },
                    { value: 'Aisle', label: 'Aisle Seat' },
                    { value: 'Legroom', label: 'Legroom' },
                  ]}
                />
                <Select
                  label="Dietary"
                  value={newContact.dietary}
                  onChange={(e) => setNewContact({ ...newContact, dietary: e.target.value })}
                  options={[
                    { value: 'None', label: 'No Limits' },
                    { value: 'Vegan', label: 'Vegan' },
                    { value: 'Gluten-Free', label: 'Gluten-Free' },
                  ]}
                />
                <Select
                  label="Hotel brand"
                  value={newContact.hotelGroup}
                  onChange={(e) => setNewContact({ ...newContact, hotelGroup: e.target.value })}
                  options={[
                    { value: 'Marriott Bonvoy', label: 'Marriott' },
                    { value: 'Aman Group', label: 'Aman Resorts' },
                    { value: 'Four Seasons', label: 'Four Seasons' },
                  ]}
                />
              </div>

              <Input
                label="AI Summary Profile Text"
                placeholder="AI behavior summary..."
                value={newContact.aiSummary}
                onChange={(e) => setNewContact({ ...newContact, aiSummary: e.target.value })}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <input
                  type="checkbox"
                  id="addVipCheck"
                  checked={newContact.isVip}
                  onChange={(e) => setNewContact({ ...newContact, isVip: e.target.checked })}
                  style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                />
                <label htmlFor="addVipCheck" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Mark Profile as VIP
                </label>
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
                <Button type="submit" variant="primary">
                  Create Client
                </Button>
                <Button type="button" variant="secondary" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
