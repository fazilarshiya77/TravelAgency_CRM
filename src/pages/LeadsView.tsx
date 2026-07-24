import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Card } from '../components/ui/Card';
import { Table, type TableColumn } from '../components/ui/Table';
import { Tag } from '../components/ui/Tag';
import { Button } from '../components/ui/Button';
import { Input, Select, Textarea } from '../components/ui/Input';
import { Drawer } from '../components/ui/Drawer';
import {
  Search,
  UserPlus,
  Sparkles,
  Mail,
  Grid,
  List,
  Trash2,
  MessageSquare,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

interface LeadNote {
  date: string;
  text: string;
  author: string;
}

interface TimelineEvent {
  date: string;
  title: string;
  desc: string;
  type: 'email' | 'whatsapp' | 'system' | 'call';
}

interface EmailLog {
  date: string;
  subject: string;
  body: string;
  incoming: boolean;
}

interface WhatsAppLog {
  date: string;
  body: string;
  incoming: boolean;
}

interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  budget: number;
  probability: number; // conversion percentage
  score: number; // AI lead qualification score
  source: string;
  stage: 'inquiry' | 'proposal' | 'negotiation' | 'booked';
  assignee: string;
  tags: string[];
  isDuplicate: boolean;
  notes: LeadNote[];
  timeline: TimelineEvent[];
  emailHistory: EmailLog[];
  whatsappHistory: WhatsAppLog[];
}

export const LeadsView: React.FC = () => {
  const { triggerAICommand } = useNavigation();
  // 1. CRM Lead state holding mock database
  const initialSeedLeads: LeadItem[] = [
    {
      id: 'L-101',
      name: 'Amit Sharma',
      email: 'amit@sharma.com',
      phone: '+91-98765-43210',
      destination: 'Amalfi Coast, Italy',
      budget: 18500,
      probability: 94,
      score: 88,
      source: 'Luxury Referral',
      stage: 'proposal',
      assignee: 'Sophia Loren',
      tags: ['Amalfi', 'Family', 'VIP'],
      isDuplicate: true, // triggers duplicate alert banner
      notes: [
        { date: '2026-07-22 14:30', text: 'Sharma requested a private helicopter tour from Rome to Florence.', author: 'Mohammed Rayhan' },
        { date: '2026-07-21 09:15', text: 'Client prefers business class flights only. Budget is flexible.', author: 'Sophia Loren' },
      ],
      timeline: [
        { date: '2026-07-22 14:30', title: 'Note Logged', desc: 'Requested private helicopter tour details', type: 'system' },
        { date: '2026-07-22 11:00', title: 'Email Received', desc: 'Confirming flight layout preferences', type: 'email' },
        { date: '2026-07-21 16:45', title: 'WhatsApp Sent', desc: 'Shared Amalfi villa photos', type: 'whatsapp' },
        { date: '2026-07-21 10:00', title: 'Call Completed', desc: 'Initial inquiry interview with John', type: 'call' },
      ],
      emailHistory: [
        { date: '2026-07-22 11:00', subject: 'Re: Amalfi Package Flight Layouts', body: 'The seats on the flight look perfect. Please proceed to reserve the business suite for all four passengers.', incoming: true },
        { date: '2026-07-22 09:30', subject: 'Amalfi Package Flight Layouts', body: 'Hi Amit, I have attached the Lufthansa business class seating diagram for your review.', incoming: false },
      ],
      whatsappHistory: [
        { date: '2026-07-21 16:45', body: 'Hi Amit, here are the direct villa pictures for the Amalfi Coast stay. Let me know which date suits you.', incoming: false },
      ],
    },
    {
      id: 'L-102',
      name: 'Priya Patel',
      email: 'priya@patel.co.in',
      phone: '+91-91234-56789',
      destination: 'Kyoto Sanctuary, Japan',
      budget: 8200,
      probability: 75,
      score: 82,
      source: 'Organic Search',
      stage: 'inquiry',
      assignee: 'Sophia Loren',
      tags: ['Kyoto', 'Wellness'],
      isDuplicate: false,
      notes: [],
      timeline: [
        { date: '2026-07-22 10:00', title: 'Inquiry Received', desc: 'Sought premium custom wellness itineraries', type: 'system' },
      ],
      emailHistory: [],
      whatsappHistory: [],
    },
    {
      id: 'L-103',
      name: 'Rajesh Iyer',
      email: 'rajesh@iyer.com',
      phone: '+91-99887-76655',
      destination: 'Serengeti Safari, Tanzania',
      budget: 23000,
      probability: 60,
      score: 74,
      source: 'Google Campaign',
      stage: 'negotiation',
      assignee: 'Liam Neeson',
      tags: ['Safari', 'Adventure', 'Group'],
      isDuplicate: false,
      notes: [
        { date: '2026-07-20 16:30', text: 'Client matches our adventure safari cohort. Requested custom itinerary quotes.', author: 'Liam Neeson' },
      ],
      timeline: [
        { date: '2026-07-21 13:00', title: 'WhatsApp Sent', desc: 'Sent safari excursion draft schedules', type: 'whatsapp' },
        { date: '2026-07-20 16:30', title: 'Note Logged', desc: 'Safari cohort match noted', type: 'system' },
      ],
      emailHistory: [],
      whatsappHistory: [
        { date: '2026-07-21 13:00', body: 'Hi Rajesh, here is the itinerary draft showing the hot air balloon excursion in Serengeti.', incoming: false },
      ],
    },
    {
      id: 'L-104',
      name: 'Vikram Malhotra',
      email: 'vikram@malhotra.in',
      phone: '+91-98980-12345',
      destination: 'Swiss Alps Hiking Tour',
      budget: 6400,
      probability: 38,
      score: 45,
      source: 'Instagram Lead',
      stage: 'negotiation',
      assignee: 'Emma Watson',
      tags: ['Alps', 'Hiking'],
      isDuplicate: false,
      notes: [],
      timeline: [
        { date: '2026-07-22 14:00', title: 'Call Completed', desc: 'Flight booking constraints discussion', type: 'call' },
      ],
      emailHistory: [],
      whatsappHistory: [],
    },
    {
      id: 'L-105',
      name: 'Ananya Sen',
      email: 'ananya@sen.edu',
      phone: '+91-98450-98765',
      destination: 'Greek Island Sailing',
      budget: 14000,
      probability: 82,
      score: 86,
      source: 'Agency Returnee',
      stage: 'booked',
      assignee: 'Emma Watson',
      tags: ['Greece', 'Sailing', 'VIP'],
      isDuplicate: false,
      notes: [
        { date: '2026-07-23 11:20', text: 'Fully reserved catamaran cruise. Final invoicing sent.', author: 'Emma Watson' },
      ],
      timeline: [
        { date: '2026-07-23 11:20', title: 'Booking Won', desc: 'Lead shifted to Won stage', type: 'system' },
        { date: '2026-07-23 09:00', title: 'Invoice Shared', desc: 'Shared invoice link for catamaran charter', type: 'email' },
      ],
      emailHistory: [
        { date: '2026-07-23 09:00', subject: 'Invoice: Greek Island Sailing Charter', body: 'Hi Ananya, please find the payment link enclosed.', incoming: false },
      ],
      whatsappHistory: [],
    },
  ];

  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      if (!supabase) {
        console.warn('Supabase not configured. Running in mock local state mode.');
        setLeads(initialSeedLeads);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching leads from Supabase:', error);
        } else if (data && data.length > 0) {
          setLeads(data.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email || '',
            phone: item.phone || '',
            destination: item.destination || '',
            budget: Number(item.budget) || 0,
            probability: Number(item.probability) || 50,
            score: Number(item.score) || 50,
            source: item.source || 'Direct',
            stage: item.stage || 'inquiry',
            assignee: item.assignee || 'Sophia Loren',
            tags: item.tags || [],
            isDuplicate: item.is_duplicate || false,
            notes: item.notes || [],
            timeline: item.timeline || [],
            emailHistory: item.email_history || [],
            whatsappHistory: item.whatsapp_history || []
          })));
        } else {
          // Seed the database
          const { error: seedError } = await supabase
            .from('leads')
            .insert(
              initialSeedLeads.map(l => ({
                id: l.id,
                name: l.name,
                email: l.email,
                phone: l.phone,
                destination: l.destination,
                budget: l.budget,
                probability: l.probability,
                score: l.score,
                source: l.source,
                stage: l.stage,
                assignee: l.assignee,
                tags: l.tags,
                is_duplicate: l.isDuplicate,
                notes: l.notes,
                timeline: l.timeline,
                email_history: l.emailHistory,
                whatsapp_history: l.whatsappHistory,
              }))
            );
          if (!seedError) {
            setLeads(initialSeedLeads);
          }
        }
      } catch (err) {
        console.error('Fetch leads exception:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. View States
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('table');
  const [search, setSearch] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedScore, setSelectedScore] = useState<string>('all');
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [activeLead, setActiveLead] = useState<LeadItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'notes' | 'messages' | 'admin'>('overview');
  const [noteInput, setNoteInput] = useState('');

  // 3. New Lead Creation Dialog State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [clientNameError, setClientNameError] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumberVal, setPhoneNumberVal] = useState('');
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Amalfi Coast, Italy',
    budget: '',
    source: 'Direct Search',
    assignee: 'Fazil Arshiya',
    description: '',
  });

  // 4. Filtering Logic
  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.destination.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase());

    const matchStage = selectedStage === 'all' || lead.stage === selectedStage;
    const matchSource = selectedSource === 'all' || lead.source === selectedSource;

    let matchScore = true;
    if (selectedScore === 'high') matchScore = lead.score >= 80;
    else if (selectedScore === 'medium') matchScore = lead.score >= 60 && lead.score < 80;
    else if (selectedScore === 'low') matchScore = lead.score < 60;

    return matchSearch && matchStage && matchSource && matchScore;
  });

  // 5. Checkbox selection handlers
  const handleSelectRow = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeadIds(filteredLeads.map((l) => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  // 6. Bulk Action Handlers
  const handleBulkAssign = async (agentName: string) => {
    if (selectedLeadIds.length === 0) return;
    setLeads((prev) =>
      prev.map((l) => (selectedLeadIds.includes(l.id) ? { ...l, assignee: agentName } : l))
    );
    if (!supabase) {
      alert(`Assigned ${selectedLeadIds.length} leads to ${agentName}`);
      setSelectedLeadIds([]);
      return;
    }
    const { error } = await supabase
      .from('leads')
      .update({ assignee: agentName })
      .in('id', selectedLeadIds);
    if (error) console.error('Error in bulk assign:', error);
    alert(`Assigned ${selectedLeadIds.length} leads to ${agentName}`);
    setSelectedLeadIds([]);
  };

  const handleBulkStageChange = async (newStage: LeadItem['stage']) => {
    if (selectedLeadIds.length === 0) return;
    setLeads((prev) =>
      prev.map((l) => (selectedLeadIds.includes(l.id) ? { ...l, stage: newStage } : l))
    );
    if (!supabase) {
      alert(`Moved ${selectedLeadIds.length} leads to ${newStage.toUpperCase()}`);
      setSelectedLeadIds([]);
      return;
    }
    const { error } = await supabase
      .from('leads')
      .update({ stage: newStage })
      .in('id', selectedLeadIds);
    if (error) console.error('Error in bulk stage change:', error);
    alert(`Moved ${selectedLeadIds.length} leads to ${newStage.toUpperCase()}`);
    setSelectedLeadIds([]);
  };

  const handleBulkDelete = async () => {
    if (selectedLeadIds.length === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedLeadIds.length} selected leads?`)) {
      const originalLeads = [...leads];
      setLeads((prev) => prev.filter((l) => !selectedLeadIds.includes(l.id)));
      if (!supabase) {
        setSelectedLeadIds([]);
        return;
      }
      const { error } = await supabase
        .from('leads')
        .delete()
        .in('id', selectedLeadIds);
      if (error) {
        console.error('Error in bulk delete:', error);
        setLeads(originalLeads);
      }
      setSelectedLeadIds([]);
    }
  };

  // 7. Dynamic Stage Mover for Kanban cards (simulates smooth dnd)
  const moveLeadStage = async (leadId: string, direction: 'forward' | 'backward') => {
    const stages: LeadItem['stage'][] = ['inquiry', 'proposal', 'negotiation', 'booked'];
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    const currIdx = stages.indexOf(lead.stage);
    let nextIdx = direction === 'forward' ? currIdx + 1 : currIdx - 1;
    if (nextIdx >= 0 && nextIdx < stages.length) {
      const newStage = stages[nextIdx];
      const newEvent: TimelineEvent = {
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        title: 'Stage Shifted',
        desc: `Moved manually to ${newStage.toUpperCase()}`,
        type: 'system',
      };
      const updatedTimeline = [newEvent, ...lead.timeline];

      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, stage: newStage, timeline: updatedTimeline } : l))
      );

      if (!supabase) return;

      const { error } = await supabase
        .from('leads')
        .update({ stage: newStage, timeline: updatedTimeline })
        .eq('id', leadId);
      if (error) console.error('Error in moveLeadStage:', error);
    }
  };

  // 8. Individual Action Handler inside drawer: Assignee selection
  const handleAssignSingle = async (leadId: string, agent: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    const newEvent: TimelineEvent = {
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      title: 'Assignee Changed',
      desc: `Assigned to agent ${agent}`,
      type: 'system',
    };
    const updatedTimeline = [newEvent, ...lead.timeline];

    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, assignee: agent, timeline: updatedTimeline } : l))
    );

    if (activeLead && activeLead.id === leadId) {
      setActiveLead((prev) => (prev ? { ...prev, assignee: agent, timeline: [newEvent, ...prev.timeline] } : null));
    }

    if (!supabase) return;

    const { error } = await supabase
      .from('leads')
      .update({ assignee: agent, timeline: updatedTimeline })
      .eq('id', leadId);
    if (error) console.error('Error in handleAssignSingle:', error);
  };

  // 9. Notes Logger handler
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim() || !activeLead) return;

    const newNote: LeadNote = {
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      text: noteInput,
      author: 'Mohammed Rayhan',
    };

    const newEvent: TimelineEvent = {
      date: newNote.date,
      title: 'Note Logged',
      desc: noteInput,
      type: 'system',
    };

    const updatedNotes = [newNote, ...activeLead.notes];
    const updatedTimeline = [newEvent, ...activeLead.timeline];

    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== activeLead.id) return l;
        return {
          ...l,
          notes: updatedNotes,
          timeline: updatedTimeline,
        };
      })
    );

    setActiveLead((prev) =>
      prev
        ? {
            ...prev,
            notes: updatedNotes,
            timeline: updatedTimeline,
          }
        : null
    );

    setNoteInput('');

    if (!supabase) return;

    const { error } = await supabase
      .from('leads')
      .update({ notes: updatedNotes, timeline: updatedTimeline })
      .eq('id', activeLead.id);
    if (error) console.error('Error in handleAddNote:', error);
  };

  // 10. Add New Lead validation & submission (includes duplicate alert scoring)
  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.destination) return;

    // Check duplicate: matches by name string similarity
    const duplicateDetected = leads.some(
      (l) => l.name.toLowerCase() === newLead.name.toLowerCase()
    );

    const generatedId = 'L-' + (100 + Date.now().toString().substring(10));
    const budgetVal = parseFloat(newLead.budget) || 5000;

    // AI qualifies new leads with simulated scoring bounds
    const aiQualScore = budgetVal > 15000 ? 88 : budgetVal > 8000 ? 76 : 48;
    const aiWinProb = duplicateDetected ? 30 : budgetVal > 15000 ? 82 : 55;

    const fullPhone = phoneNumberVal ? `${countryCode} ${phoneNumberVal}` : '';

    const createdItem: LeadItem = {
      id: generatedId,
      name: newLead.name,
      email: newLead.email || 'pending@corp.com',
      phone: fullPhone || '+91-98765-43210',
      destination: newLead.destination,
      budget: budgetVal,
      probability: aiWinProb,
      score: aiQualScore,
      source: newLead.source,
      stage: 'inquiry',
      assignee: newLead.assignee,
      tags: ['New Prospect'],
      isDuplicate: duplicateDetected,
      notes: newLead.description ? [
        {
          date: new Date().toISOString().substring(0, 10) + ' ' + new Date().toTimeString().substring(0, 5),
          text: newLead.description,
          author: newLead.assignee,
        }
      ] : [],
      timeline: [
        {
          date: new Date().toISOString().substring(0, 10) + ' ' + new Date().toTimeString().substring(0, 5),
          title: 'Lead Created',
          desc: `AI pre-qualification score computed: ${aiQualScore}`,
          type: 'system',
        },
      ],
      emailHistory: [],
      whatsappHistory: [],
    };

    setLeads((prev) => [createdItem, ...prev]);
    setIsAddOpen(false);

    if (!supabase) {
      setNewLead({
        name: '',
        email: '',
        phone: '',
        destination: 'Amalfi Coast, Italy',
        budget: '',
        source: 'Direct Search',
        assignee: 'Fazil Arshiya',
        description: '',
      });
      setClientNameError('');
      setCountryCode('+91');
      setPhoneNumberVal('');
      if (duplicateDetected) {
        alert(`⚠️ Potential duplicate detected. Lead created with warnings. View in profile.`);
      }
      return;
    }

    const { error } = await supabase
      .from('leads')
      .insert([
        {
          id: createdItem.id,
          name: createdItem.name,
          email: createdItem.email,
          phone: createdItem.phone,
          destination: createdItem.destination,
          budget: createdItem.budget,
          probability: createdItem.probability,
          score: createdItem.score,
          source: createdItem.source,
          stage: createdItem.stage,
          assignee: createdItem.assignee,
          tags: createdItem.tags,
          is_duplicate: createdItem.isDuplicate,
          notes: createdItem.notes,
          timeline: createdItem.timeline,
          email_history: createdItem.emailHistory,
          whatsapp_history: createdItem.whatsappHistory,
        }
      ]);

    if (error) {
      console.error('Error inserting lead to Supabase:', error);
      // Revert local state
      setLeads((prev) => prev.filter((l) => l.id !== generatedId));
      alert('Failed to save lead in database: ' + error.message);
    }
    setNewLead({
      name: '',
      email: '',
      phone: '',
      destination: 'Amalfi Coast, Italy',
      budget: '',
      source: 'Direct Search',
      assignee: 'Fazil Arshiya',
      description: '',
    });
    setClientNameError('');
    setCountryCode('+91');
    setPhoneNumberVal('');

    if (duplicateDetected) {
      alert(`⚠️ Potential duplicate detected. Lead created with warnings. View in profile.`);
    }
  };

  const getScoreColorway = (score: number) => {
    if (score >= 80) return 'mint';
    if (score >= 60) return 'peach';
    return 'danger';
  };

  // 11. Column definitions for CRM list view
  const columns: TableColumn<LeadItem>[] = [
    {
      header: '',
      accessor: (row) => (
        <input
          type="checkbox"
          checked={selectedLeadIds.includes(row.id)}
          onChange={() => handleSelectRow(row.id)}
          style={{ cursor: 'pointer' }}
        />
      ),
      width: '40px',
    },
    {
      header: 'Prospect',
      accessor: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-soft-blue)',
              color: 'var(--color-soft-blue-dark)',
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
            <div style={{ fontWeight: 600 }}>{row.name}</div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{row.email}</div>
          </div>
        </div>
      ),
    },
    { header: 'Target Destination', accessor: 'destination' },
    {
      header: 'Est. Budget',
      accessor: (row) => <span>₹{row.budget.toLocaleString()}</span>,
      align: 'right' as const,
    },
    {
      header: 'AI Win Prob.',
      accessor: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontWeight: 700 }}>{row.probability}%</span>
          {row.isDuplicate && <Tag colorway="danger">Duplicate</Tag>}
        </div>
      ),
    },
    {
      header: 'AI Lead Score',
      accessor: (row) => <Tag colorway={getScoreColorway(row.score)}>{row.score}/100</Tag>,
    },
    {
      header: 'Pipeline Stage',
      accessor: (row) => (
        <Tag colorway={row.stage === 'booked' ? 'mint' : row.stage === 'negotiation' ? 'peach' : 'sand'}>
          {row.stage.toUpperCase()}
        </Tag>
      ),
    },
    { header: 'Assignee', accessor: 'assignee' },
    {
      header: 'Actions',
      accessor: (row) => (
        <Button
          size="sm"
          variant="secondary"
          leftIcon={<ExternalLink className="w-3 h-3 text-sky-500" />}
          onClick={(e) => {
            e.stopPropagation();
            setActiveLead(row);
            setActiveTab('overview');
          }}
        >
          Qualify
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: '1rem' }}>
        <style>{`
          @keyframes custom-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{ width: '40px', height: '40px', border: '4px solid var(--border-light)', borderTopColor: 'var(--color-secondary)', borderRadius: '50%', animation: 'custom-spin 1s linear infinite' }} />
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Syncing with Supabase Live Database...</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.4s ease-out forwards', position: 'relative' }}>
      
      {/* View Mode Toggle & Create button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem' }}>Lead Center Hub</h2>
          <p className="body-normal" style={{ marginTop: '0.25rem' }}>
            Interactive Kanban boards and lead listing models configured with predictive conversion scoring algorithms.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Toggle View buttons */}
          <div style={{ display: 'flex', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', backgroundColor: '#FFFFFF', padding: '2px', boxShadow: 'var(--shadow-sm)' }}>
            <button
              onClick={() => setViewMode('kanban')}
              style={{
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: viewMode === 'kanban' ? 'var(--color-soft-blue)' : 'transparent',
                color: viewMode === 'kanban' ? 'var(--color-soft-blue-dark)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.8rem',
              }}
            >
              <Grid className="w-4 h-4" />
              <span>Kanban Board</span>
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
              <span>Table Grid</span>
            </button>
          </div>

          <Button variant="primary" leftIcon={<UserPlus className="w-4 h-4" />} onClick={() => setIsAddOpen(true)}>
            Add New Lead
          </Button>
        </div>
      </div>

      {/* Filters Catalog */}
      <Card>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <Input
              placeholder="Search prospects by name, target destination, or email address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ width: '160px' }}>
            <Select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              options={[
                { value: 'all', label: 'All Stages' },
                { value: 'inquiry', label: 'New Inquiry' },
                { value: 'proposal', label: 'Proposal Sent' },
                { value: 'negotiation', label: 'Negotiation' },
                { value: 'booked', label: 'Booked / Won' },
              ]}
              style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ width: '150px' }}>
            <Select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              options={[
                { value: 'all', label: 'All Sources' },
                { value: 'Luxury Referral', label: 'Referrals' },
                { value: 'Direct Search', label: 'Direct Search' },
                { value: 'Google Campaign', label: 'Google Ads' },
                { value: 'Instagram Lead', label: 'Social Media' },
                { value: 'Agency Returnee', label: 'Returnees' },
              ]}
              style={{ marginBottom: 0 }}
            />
          </div>
          <div style={{ width: '150px' }}>
            <Select
              value={selectedScore}
              onChange={(e) => setSelectedScore(e.target.value)}
              options={[
                { value: 'all', label: 'AI Score: All' },
                { value: 'high', label: 'High Qualified (80+)' },
                { value: 'medium', label: 'Medium (60-79)' },
                { value: 'low', label: 'Low (<60)' },
              ]}
              style={{ marginBottom: 0 }}
            />
          </div>
        </div>
      </Card>

      {/* Main Panel Content switching between layouts */}
      {viewMode === 'table' ? (
        <Card style={{ padding: 0 }}>
          {/* Main selection headers */}
          <div style={{ padding: '0.85rem 1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={filteredLeads.length > 0 && selectedLeadIds.length === filteredLeads.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Select All {filteredLeads.length} visible leads
            </span>
          </div>

          <Table columns={columns} data={filteredLeads} onRowClick={(row) => { setActiveLead(row); setActiveTab('overview'); }} />
        </Card>
      ) : (
        /* KANBAN BOARD VIEW LAYOUT */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', minHeight: '480px', alignItems: 'start' }}>
          {(['inquiry', 'proposal', 'negotiation', 'booked'] as LeadItem['stage'][]).map((stageKey) => {
            const stageLeads = filteredLeads.filter((l) => l.stage === stageKey);
            const totalBudget = stageLeads.reduce((acc, curr) => acc + curr.budget, 0);

            const getStageTitle = (key: string) => {
              switch (key) {
                case 'inquiry': return 'New Inquiry';
                case 'proposal': return 'Proposal Sent';
                case 'negotiation': return 'Negotiating';
                case 'booked':
                default:
                  return 'Closed / Won';
              }
            };

            return (
              <div
                key={stageKey}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-light)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {/* Column stats header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      {getStageTitle(stageKey)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      ₹{totalBudget.toLocaleString()}
                    </div>
                  </div>
                  <Tag colorway="soft-blue">{stageLeads.length}</Tag>
                </div>

                {/* Column card scroll list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '560px', overflowY: 'auto' }}>
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => { setActiveLead(lead); setActiveTab('overview'); }}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1rem',
                        boxShadow: 'var(--shadow-sm)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)',
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
                      {/* Top row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{lead.name}</div>
                          <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginTop: '1px' }}>{lead.destination}</div>
                        </div>
                        <Tag colorway={getScoreColorway(lead.score)}>{lead.score}/100</Tag>
                      </div>

                      {/* Info budget / probability */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        <span>₹{lead.budget.toLocaleString()}</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>{lead.probability}% Prob.</span>
                      </div>

                      {/* Tags & Assignee */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {lead.tags.slice(0, 2).map((t, idx) => (
                            <span key={idx} style={{ fontSize: '0.65rem', backgroundColor: '#F1F5F9', color: 'var(--text-secondary)', padding: '1px 6px', borderRadius: '4px' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{lead.assignee.split(' ')[0]}</span>
                        </div>
                      </div>

                      {/* Kanban Stage controllers */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', marginTop: '0.25rem' }}>
                        <button
                          disabled={stageKey === 'inquiry'}
                          onClick={(e) => { e.stopPropagation(); moveLeadStage(lead.id, 'backward'); }}
                          style={{
                            flex: 1,
                            padding: '3px',
                            border: '1px solid var(--border-light)',
                            borderRadius: '4px',
                            backgroundColor: '#FFFFFF',
                            cursor: stageKey === 'inquiry' ? 'not-allowed' : 'pointer',
                            fontSize: '0.7rem',
                            opacity: stageKey === 'inquiry' ? 0.3 : 1,
                          }}
                        >
                          ◀ Move Back
                        </button>
                        <button
                          disabled={stageKey === 'booked'}
                          onClick={(e) => { e.stopPropagation(); moveLeadStage(lead.id, 'forward'); }}
                          style={{
                            flex: 1,
                            padding: '3px',
                            border: '1px solid var(--border-light)',
                            borderRadius: '4px',
                            backgroundColor: '#FFFFFF',
                            cursor: stageKey === 'booked' ? 'not-allowed' : 'pointer',
                            fontSize: '0.7rem',
                            opacity: stageKey === 'booked' ? 0.3 : 1,
                          }}
                        >
                          Advance ▶
                        </button>
                      </div>

                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div style={{ border: '1px dashed var(--border-light)', padding: '2.5rem 1rem', textAlign: 'center', color: 'var(--text-tertiary)', borderRadius: 'var(--radius-lg)', fontSize: '0.8rem' }}>
                      Drag / Drop column empty
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FLOATING BULK ACTIONS DASHBOARD PANEL BAR */}
      {selectedLeadIds.length > 0 && (
        <div
          className="glass-effect"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: 'calc(var(--sidebar-width) + 2.5rem)',
            right: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '1rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1000,
            animation: 'page-enter 0.2s ease-out forwards',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
              {selectedLeadIds.length}
            </div>
            <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>prospects selected</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Bulk Assign */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Assignee:</span>
              <select
                onChange={(e) => handleBulkAssign(e.target.value)}
                defaultValue=""
                style={{ padding: '6px', fontSize: '0.8rem', border: '1px solid var(--border-light)', borderRadius: '6px', outline: 'none' }}
              >
                <option value="" disabled>Select agent...</option>
                <option value="Sophia Loren">Sophia Loren</option>
                <option value="Liam Neeson">Liam Neeson</option>
                <option value="Emma Watson">Emma Watson</option>
              </select>
            </div>

            {/* Bulk Stage */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Stage:</span>
              <select
                onChange={(e) => handleBulkStageChange(e.target.value as LeadItem['stage'])}
                defaultValue=""
                style={{ padding: '6px', fontSize: '0.8rem', border: '1px solid var(--border-light)', borderRadius: '6px', outline: 'none' }}
              >
                <option value="" disabled>Move stage...</option>
                <option value="inquiry">New Inquiry</option>
                <option value="proposal">Proposal Sent</option>
                <option value="negotiation">Negotiation</option>
                <option value="booked">Booked / Won</option>
              </select>
            </div>

            <Button variant="danger" size="sm" leftIcon={<Trash2 className="w-3.5 h-3.5" />} onClick={handleBulkDelete}>
              Delete Leads
            </Button>
            
            <button
              onClick={() => setSelectedLeadIds([])}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-secondary)', marginLeft: '10px' }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* 5-TAB COMPREHENSIVE DETAIL DRAWER PANEL (HUBSPOT STYLE) */}
      <Drawer
        isOpen={activeLead !== null}
        onClose={() => { setActiveLead(null); setNoteInput(''); }}
        title={activeLead ? `CRM Lead: ${activeLead.name}` : ''}
        width="480px"
      >
        {activeLead && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}>
            
            {/* Drawer Tab buttons */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', gap: '4px' }}>
              {(['overview', 'timeline', 'notes', 'messages', 'admin'] as const).map((tabKey) => {
                const isActive = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--color-secondary)' : 'var(--text-secondary)',
                      position: 'relative',
                      textTransform: 'capitalize',
                    }}
                  >
                    {tabKey}
                    {isActive && (
                      <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '2px', backgroundColor: 'var(--color-secondary)' }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab content renderer */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {/* TAB 1: AI qualification & warnings */}
              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Duplicate Alert Warning */}
                  {activeLead.isDuplicate && (
                    <div
                      style={{
                        backgroundColor: 'var(--color-peach)',
                        border: '1px solid rgba(254, 243, 199, 0.8)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.85rem 1rem',
                        display: 'flex',
                        gap: '8px',
                        color: 'var(--color-peach-dark)',
                      }}
                    >
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>AI Duplicate Warning Check</div>
                        <p style={{ fontSize: '0.725rem', marginTop: '2px', lineHeight: 1.35 }}>
                          A contact matching the email/name "{activeLead.name}" already exists in the client directory database. Confirm parameters before cataloging.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* AI Win progress gauge */}
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                    <div style={{ position: 'relative', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="64" height="64" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          stroke="var(--color-secondary)"
                          strokeWidth="3"
                          strokeDasharray="100"
                          strokeDashoffset={100 - activeLead.probability}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                        />
                      </svg>
                      <span style={{ position: 'absolute', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-secondary)' }}>
                        {activeLead.probability}%
                      </span>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>AI Win Probability</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                        High Priority Target
                      </div>
                    </div>
                  </div>

                  {/* Qualification scoring breakdown */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>AI Qualification Factors</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Response Velocity</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>Excellent (+15% score)</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Budget Alignment</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>Luxury Match (+20% score)</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '4px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Engagement Ratio</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>Active (+10% score)</span>
                      </div>
                    </div>
                  </div>

                  {/* Base specifications info */}
                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Lead Specifications</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <span style={{ fontWeight: 500 }}>Lead Reference:</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{activeLead.id}</span>
                      <span style={{ fontWeight: 500 }}>Email Address:</span>
                      <span>{activeLead.email}</span>
                      <span style={{ fontWeight: 500 }}>Phone Contact:</span>
                      <span>{activeLead.phone}</span>
                      <span style={{ fontWeight: 500 }}>Target Destination:</span>
                      <span>{activeLead.destination}</span>
                      <span style={{ fontWeight: 500 }}>Est. Budget:</span>
                      <span>₹{activeLead.budget.toLocaleString()}</span>
                      <span style={{ fontWeight: 500 }}>Channel Source:</span>
                      <span>{activeLead.source}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Interaction milestone timelines */}
              {activeTab === 'timeline' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '0.5rem' }}>
                  {activeLead.timeline.map((event, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '12px', position: 'relative' }}>
                      {/* Dot connector */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', zIndex: 2 }} />
                        {idx !== activeLead.timeline.length - 1 && (
                          <div style={{ width: '1px', flex: 1, backgroundColor: 'var(--border-light)', position: 'absolute', top: '8px', bottom: '-8px', left: '3.5px', zIndex: 1 }} />
                        )}
                      </div>
                      <div style={{ flex: 1, fontSize: '0.8rem', paddingBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{event.title}</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{event.date}</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.35 }}>{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: CRM Notes logger */}
              {activeTab === 'notes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Note Creator Form */}
                  <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Textarea
                      placeholder="Type a new persistent CRM note..."
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      style={{ minHeight: '60px', marginBottom: 0 }}
                    />
                    <Button type="submit" variant="outline" size="sm" style={{ alignSelf: 'flex-end' }}>
                      Save CRM Note
                    </Button>
                  </form>

                  {/* Notes Feed logs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {activeLead.notes.length === 0 ? (
                      <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-tertiary)', border: '1px dashed var(--border-light)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
                        No notes logged for this prospect.
                      </div>
                    ) : (
                      activeLead.notes.map((note, idx) => (
                        <div key={idx} style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '0.75rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '4px', fontWeight: 600 }}>
                            <span>Logged by: {note.author}</span>
                            <span>{note.date}</span>
                          </div>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{note.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: Messages logs */}
              {activeTab === 'messages' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Emails Section */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                      <Mail className="w-4 h-4 text-sky-500" />
                      <span>Email Conversation Log ({activeLead.emailHistory.length})</span>
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {activeLead.emailHistory.length === 0 ? (
                        <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-tertiary)', border: '1px dashed var(--border-light)', borderRadius: '6px', fontSize: '0.75rem' }}>
                          No logged emails.
                        </div>
                      ) : (
                        activeLead.emailHistory.map((email, idx) => (
                          <div key={idx} style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
                            <div style={{ padding: '6px 10px', backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{email.subject}</span>
                              <span style={{ color: 'var(--text-tertiary)' }}>{email.date}</span>
                            </div>
                            <p style={{ padding: '8px 10px', fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                              {email.body}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Section */}
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
                      <MessageSquare className="w-4 h-4 text-emerald-500" />
                      <span>WhatsApp Thread Log ({activeLead.whatsappHistory.length})</span>
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', backgroundColor: '#ECE5DD', padding: '0.75rem', borderRadius: 'var(--radius-md)', minHeight: '120px' }}>
                      {activeLead.whatsappHistory.length === 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', width: '100%', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                          No active WhatsApp logs.
                        </div>
                      ) : (
                        activeLead.whatsappHistory.map((chat, idx) => (
                          <div
                            key={idx}
                            style={{
                              alignSelf: chat.incoming ? 'flex-start' : 'flex-end',
                              maxWidth: '75%',
                              backgroundColor: chat.incoming ? '#FFFFFF' : '#DCF8C6',
                              padding: '6px 10px',
                              borderRadius: '8px',
                              fontSize: '0.775rem',
                              color: 'var(--text-primary)',
                              boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                              lineHeight: 1.35,
                            }}
                          >
                            {chat.body}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: Lead Operations settings */}
              {activeTab === 'admin' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Lead Assignment */}
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Assign Lead to Agent:
                    </span>
                    <select
                      value={activeLead.assignee}
                      onChange={(e) => handleAssignSingle(activeLead.id, e.target.value)}
                      style={{ width: '100%', padding: '8px', fontSize: '0.85rem', border: '1px solid var(--border-light)', borderRadius: '8px', outline: 'none' }}
                    >
                      <option value="Sophia Loren">Sophia Loren</option>
                      <option value="Liam Neeson">Liam Neeson</option>
                      <option value="Emma Watson">Emma Watson</option>
                    </select>
                  </div>

                  {/* Manual Stage Override */}
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Pipeline Stage Selection:
                    </span>
                    <select
                      value={activeLead.stage}
                      onChange={async (e) => {
                        const newStage = e.target.value as LeadItem['stage'];
                        setLeads((prev) => prev.map((l) => (l.id === activeLead.id ? { ...l, stage: newStage } : l)));
                        setActiveLead((prev) => (prev ? { ...prev, stage: newStage } : null));
                        if (!supabase) return;
                        const { error } = await supabase
                          .from('leads')
                          .update({ stage: newStage })
                          .eq('id', activeLead.id);
                        if (error) console.error('Error overriding stage:', error);
                      }}
                      style={{ width: '100%', padding: '8px', fontSize: '0.85rem', border: '1px solid var(--border-light)', borderRadius: '8px', outline: 'none' }}
                    >
                      <option value="inquiry">New Inquiry</option>
                      <option value="proposal">Proposal Sent</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="booked">Booked / Won</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions footer */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <Button
                variant="primary"
                style={{ flex: 1 }}
                leftIcon={<Sparkles className="w-4 h-4" />}
                onClick={() => {
                  triggerAICommand(`Draft introduction email to ${activeLead.name}`);
                  setActiveLead(null);
                }}
              >
                Draft Pitch Email
              </Button>
              <Button variant="secondary" onClick={() => { setActiveLead(null); setNoteInput(''); }}>
                Close Profile
              </Button>
            </div>

          </div>
        )}
      </Drawer>

      {/* CREATE NEW LEAD DIALOG MODAL */}
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
              <h3 className="h2-subtitle" style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0C182F' }}>Create New Prospect Lead</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#0C182F', fontSize: '1.2rem', fontWeight: 'bold', padding: '4px' }}
              >
                ✕
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleAddLead} style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              
              {/* Client Name with Validation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0C182F' }}>Full Client Name *</label>
                <Input
                  placeholder="e.g. Aarav Mehta"
                  value={newLead.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    const cleanVal = val.replace(/[^a-zA-Z\s]/g, '');
                    if (/\d/.test(val)) {
                      setClientNameError('⚠️ Numbers are not permitted in client names!');
                    } else {
                      setClientNameError('');
                    }
                    setNewLead({ ...newLead, name: cleanVal });
                  }}
                  style={{ fontSize: '1rem', color: '#0C182F', fontWeight: 600 }}
                  required
                />
                {clientNameError && (
                  <div style={{ color: '#E11D48', fontSize: '0.8rem', marginTop: '-4px', marginBottom: '8px', fontWeight: 600 }}>
                    {clientNameError}
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0C182F' }}>Email Address</label>
                <Input
                  placeholder="e.g. aarav@mehta.com"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  style={{ fontSize: '1rem', color: '#0C182F', fontWeight: 600 }}
                />
              </div>

              {/* Phone Number with Country Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0C182F' }}>Phone Number</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '1rem',
                      color: '#0C182F',
                      fontWeight: 600,
                      outline: 'none',
                      cursor: 'pointer',
                      width: '100px',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                  </select>
                  <input
                    placeholder="Phone number"
                    value={phoneNumberVal}
                    onChange={(e) => setPhoneNumberVal(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: '#FFFFFF',
                      fontSize: '1rem',
                      color: '#0C182F',
                      fontWeight: 600,
                      outline: 'none',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  />
                </div>
              </div>

              {/* Destination Dropdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0C182F' }}>Target Destination *</label>
                <Select
                  value={newLead.destination}
                  onChange={(e) => setNewLead({ ...newLead, destination: e.target.value })}
                  style={{ fontSize: '1rem', color: '#0C182F', fontWeight: 600 }}
                  options={[
                    { value: 'Amalfi Coast, Italy', label: 'Amalfi Coast, Italy' },
                    { value: 'Kyoto Sanctuary, Japan', label: 'Kyoto Sanctuary, Japan' },
                    { value: 'Serengeti Safari, Tanzania', label: 'Serengeti Safari, Tanzania' },
                    { value: 'Swiss Alps Chalet, Switzerland', label: 'Swiss Alps Chalet, Switzerland' },
                    { value: 'Paris & French Riviera, France', label: 'Paris & French Riviera, France' },
                    { value: 'Greek Islands Yacht, Greece', label: 'Greek Islands Yacht, Greece' },
                    { value: 'Kashmir Valleys, India', label: 'Kashmir Valleys, India' },
                    { value: 'Goa Luxury Beach, India', label: 'Goa Luxury Beach, India' },
                  ]}
                  required
                />
              </div>

              {/* Budget */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0C182F' }}>Estimated Travel Budget (₹) *</label>
                <Input
                  placeholder="e.g. 150000"
                  value={newLead.budget}
                  onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                  type="number"
                  style={{ fontSize: '1rem', color: '#0C182F', fontWeight: 600 }}
                  required
                />
              </div>

              {/* Source & Assignee */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0C182F' }}>Channel Source</label>
                  <Select
                    value={newLead.source}
                    onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                    style={{ fontSize: '1rem', color: '#0C182F', fontWeight: 600 }}
                    options={[
                      { value: 'Direct Search', label: 'Direct Search' },
                      { value: 'Luxury Referral', label: 'Luxury Referral' },
                      { value: 'Google Campaign', label: 'Google Ads' },
                      { value: 'Instagram Lead', label: 'Social Media' },
                      { value: 'Agency Returnee', label: 'Agency Returnee' },
                    ]}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0C182F' }}>Lead Assignee</label>
                  <Select
                    value={newLead.assignee}
                    onChange={(e) => setNewLead({ ...newLead, assignee: e.target.value })}
                    style={{ fontSize: '1rem', color: '#0C182F', fontWeight: 600 }}
                    options={[
                      { value: 'Fazil Arshiya', label: 'Fazil Arshiya' },
                      { value: 'Rayyan Zainullabidin', label: 'Rayyan Zainullabidin' },
                      { value: 'Bhumika', label: 'Bhumika' },
                      { value: 'Touhid Ahmed', label: 'Touhid Ahmed' },
                      { value: 'Santosh', label: 'Santosh' },
                    ]}
                  />
                </div>
              </div>

              {/* Description textarea instead of CRM tags */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0C182F' }}>Description Note</label>
                <Textarea
                  placeholder="Write initial notes, tour preferences or client details..."
                  value={newLead.description}
                  onChange={(e) => setNewLead({ ...newLead, description: e.target.value })}
                  style={{ fontSize: '1rem', color: '#0C182F', fontWeight: 600, minHeight: '80px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
                <Button type="submit" variant="primary" style={{ fontSize: '1rem', padding: '0.75rem 1.25rem', fontWeight: 700 }}>
                  Qualify & Create Lead
                </Button>
                <Button type="button" variant="secondary" onClick={() => setIsAddOpen(false)} style={{ fontSize: '1rem', padding: '0.75rem 1.25rem', fontWeight: 700 }}>
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
