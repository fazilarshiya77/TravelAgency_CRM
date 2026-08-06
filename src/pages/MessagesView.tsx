import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { Send, Search, CheckCheck, Compass, Phone, Mail } from 'lucide-react';

interface MessageThread {
  id: string;
  sender: string;
  avatarInitials: string;
  avatarColor: string;
  message: string;
  time: string;
  unread: boolean;
  package: string;
  conversation: {
    sender: 'client' | 'agent';
    text: string;
    time: string;
  }[];
}

export const MessagesView: React.FC = () => {
  const [threads, setThreads] = useState<MessageThread[]>([
    {
      id: '1',
      sender: 'Aarav Mehta',
      avatarInitials: 'AM',
      avatarColor: '#E0F2FE',
      message: 'Can you share the updated itinerary for our Amalfi Coast family trip? I want to make sure the transfer buffer is sufficient.',
      time: '10:42 AM',
      unread: true,
      package: 'Amalfi Coast Villa Pack',
      conversation: [
        { sender: 'client', text: 'Hello, regarding our upcoming trip to the Amalfi Coast next month, we wanted to request some details.', time: '10:30 AM' },
        { sender: 'agent', text: 'Hi Aarav, absolutely! I will load the plan. Do you want me to look at airport transfer buffers specifically?', time: '10:35 AM' },
        { sender: 'client', text: 'Yes, please. Can you share the updated itinerary for our Amalfi Coast family trip? I want to make sure the transfer buffer is sufficient.', time: '10:42 AM' },
      ]
    },
    {
      id: '2',
      sender: 'Priya Sharma',
      avatarInitials: 'PS',
      avatarColor: '#FFE8D6',
      message: 'We want to book a luxury getaway to Kyoto. Do you have any premium Ryokan packages available for Q4?',
      time: 'Yesterday',
      unread: false,
      package: 'Kyoto Sanctuary Package',
      conversation: [
        { sender: 'client', text: 'We want to book a luxury getaway to Kyoto. Do you have any premium Ryokan packages available for Q4?', time: 'Yesterday 4:15 PM' },
        { sender: 'agent', text: 'Hi Priya, yes! We have a curated package that includes stays at Hoshinoya Kyoto and private tea ceremonies. I will draft a pitch email for you.', time: 'Yesterday 4:45 PM' }
      ]
    },
    {
      id: '3',
      sender: 'Rohan Gupta',
      avatarInitials: 'RG',
      avatarColor: '#EAF8FF',
      message: 'Is the flight booking confirmed for our Serengeti photo safari? Please share the ticket voucher.',
      time: '2 days ago',
      unread: false,
      package: 'Serengeti Photo Safari',
      conversation: [
        { sender: 'client', text: 'Is the flight booking confirmed for our Serengeti photo safari? Please share the ticket voucher.', time: '2 days ago' },
        { sender: 'agent', text: 'Hi Rohan, yes! The flight is fully booked and confirmed. You can see details under your Bookings view. I will email the vouchers shortly.', time: '2 days ago' }
      ]
    },
    {
      id: '4',
      sender: 'Ananya Patel',
      avatarInitials: 'AP',
      avatarColor: '#A7F3D0',
      message: 'Thanks for the quick response! The custom flight + hotel plan looks great. Can we proceed with payment?',
      time: '3 days ago',
      unread: false,
      package: 'Swiss Alps Premium Chalet',
      conversation: [
        { sender: 'client', text: 'Thanks for the quick response! The custom flight + hotel plan looks great. Can we proceed with payment?', time: '3 days ago' }
      ]
    },
    {
      id: '5',
      sender: 'Kabir Malhotra',
      avatarInitials: 'KM',
      avatarColor: '#FFF7ED',
      message: 'Could we extend our Florence hotel booking by two more nights? Let me know the additional charges.',
      time: '1 week ago',
      unread: false,
      package: 'Florence Arts Tour',
      conversation: [
        { sender: 'client', text: 'Could we extend our Florence hotel booking by two more nights? Let me know the additional charges.', time: '1 week ago' }
      ]
    }
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string | null>('1');
  const [inputText, setInputText] = useState('');

  const activeThread = activeThreadId ? threads.find(t => t.id === activeThreadId) || null : null;

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveThreadId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSendMessage = () => {
    if (!inputText.trim() || !activeThreadId) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          message: inputText,
          time: timeStr,
          unread: false,
          conversation: [
            ...t.conversation,
            { sender: 'agent', text: inputText, time: timeStr }
          ]
        };
      }
      return t;
    }));
    setInputText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: 'calc(100vh - 120px)', animation: 'page-enter 0.4s ease-out forwards' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem' }}>Client Communications</h2>
          <p className="body-normal" style={{ marginTop: '0.25rem' }}>
            Unified agent inbox for live updates, chat requests, and trip check-ins.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', flex: 1, minHeight: 0, alignItems: 'stretch' }}>
        
        {/* Inbox Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', padding: '4px 8px' }}>
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input placeholder="Search inbox..." style={{ border: 'none', background: 'transparent', fontSize: '0.75rem', outline: 'none', width: '100%' }} />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {threads.map(t => {
              const isActive = t.id === activeThreadId;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setActiveThreadId(t.id);
                    setThreads(prev => prev.map(th => th.id === t.id ? { ...th, unread: false } : th));
                  }}
                  style={{
                    padding: '1rem',
                    borderBottom: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    backgroundColor: isActive ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    gap: '10px',
                    position: 'relative'
                  }}
                >
                  {t.unread && (
                    <div style={{ position: 'absolute', left: '4px', top: '50%', transform: 'translateY(-50%)', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)' }} />
                  )}
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: t.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.8rem', color: '#1F2937', flexShrink: 0 }}>
                    {t.avatarInitials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.825rem', color: 'var(--text-primary)' }}>{t.sender}</span>
                      <span style={{ fontSize: '0.675rem', color: 'var(--text-tertiary)' }}>{t.time}</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-secondary)', fontWeight: 500, margin: '2px 0' }}>{t.package}</div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {t.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conversation Pane */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          {activeThread ? (
            <>
              {/* Active Header */}
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: activeThread.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.9rem', color: '#1F2937' }}>
                    {activeThread.avatarInitials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{activeThread.sender}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Compass className="w-3 h-3 text-sky-400" />
                      <span>Package: {activeThread.package}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Button variant="outline" size="sm" leftIcon={<Phone className="w-3.5 h-3.5" />}>
                    Call Client
                  </Button>
                  <Tag colorway="mint">Active Trip</Tag>
                </div>
              </div>

              {/* Messages list */}
              <div style={{ flex: 1, overflowY: 'scroll', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeThread.conversation.map((c, idx) => {
                  const isAgent = c.sender === 'agent';
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: isAgent ? 'flex-end' : 'flex-start',
                        width: '100%'
                      }}
                    >
                      <div
                        style={{
                          maxWidth: '70%',
                          padding: '0.85rem 1.15rem',
                          borderRadius: '16px',
                          borderTopRightRadius: isAgent ? '4px' : '16px',
                          borderTopLeftRadius: isAgent ? '16px' : '4px',
                          backgroundColor: isAgent ? 'var(--color-secondary)' : 'rgba(255,255,255,0.5)',
                          color: isAgent ? '#FFFFFF' : 'var(--text-primary)',
                          border: isAgent ? 'none' : '1px solid var(--border-light)',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <div style={{ fontSize: '0.8rem', lineHeight: 1.45 }}>{c.text}</div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.625rem', color: isAgent ? 'rgba(255,255,255,0.7)' : 'var(--text-tertiary)' }}>
                          <span>{c.time}</span>
                          {isAgent && <CheckCheck className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Typing box */}
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-light)', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={`Send message to ${activeThread.sender}...`}
                  style={{
                    flex: 1,
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                    minHeight: '60px',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    lineHeight: '1.4'
                  }}
                />
                <Button
                  variant="primary"
                  onClick={handleSendMessage}
                  style={{ padding: '0.75rem', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)' }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '1.25rem', color: 'var(--text-secondary)', padding: '2rem', textAlign: 'center' }}>
              <Mail className="w-12 h-12 text-slate-400" />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>No Contact Selected</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Select a conversation from the list to start messaging or press Esc to clear your selection.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
