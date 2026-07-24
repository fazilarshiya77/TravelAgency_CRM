import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Search, Compass, BookOpen, FileText, CheckSquare, UserPlus, FilePlus } from 'lucide-react';

interface CommandOption {
  category: string;
  items: {
    label: string;
    description: string;
    icon: React.ReactNode;
    action: () => void;
  }[];
}

export const CommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setCurrentTab,
  } = useNavigation();

  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const paletteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Command categories
  const categories: CommandOption[] = [
    {
      category: 'Navigation',
      items: [
        { label: 'Go to Dashboard', description: 'Overview of metrics and alerts', icon: <Compass className="w-4 h-4" />, action: () => setCurrentTab('Dashboard') },
        { label: 'Go to Leads', description: 'Centralized CRM pipeline', icon: <UserPlus className="w-4 h-4" />, action: () => setCurrentTab('Leads') },
        { label: 'Go to Contacts', description: 'Customer profiles and history', icon: <BookOpen className="w-4 h-4" />, action: () => setCurrentTab('Contacts') },
        { label: 'Go to Bookings', description: 'Automated booking manager', icon: <CheckSquare className="w-4 h-4" />, action: () => setCurrentTab('Bookings') },
        { label: 'Go to Itineraries', description: 'Itinerary manager and logs', icon: <Compass className="w-4 h-4" />, action: () => setCurrentTab('Itineraries') },
        { label: 'Go to Quotation Builder', description: 'Build and export premium client quotes', icon: <FileText className="w-4 h-4" />, action: () => setCurrentTab('Quotation Builder') },
        { label: 'Go to Payments', description: 'Installments, invoicing and link manager', icon: <FileText className="w-4 h-4" />, action: () => setCurrentTab('Payments') },
        { label: 'Go to Reports', description: 'Revenue and commission charts', icon: <FileText className="w-4 h-4" />, action: () => setCurrentTab('Reports') },
      ],
    },
    {
      category: 'Quick Actions',
      items: [
        { label: 'Create New Lead', description: 'Add a new travel prospect', icon: <UserPlus className="w-4 h-4" />, action: () => { alert('Quick Create Lead Modal Triggers'); setCommandPaletteOpen(false); } },
        { label: 'Add Luxury Booking', description: 'Scaffold a custom flight + stay plan', icon: <FilePlus className="w-4 h-4" />, action: () => { alert('Quick Create Booking Modal Triggers'); setCommandPaletteOpen(false); } },
      ],
    },
  ];

  // Flatten options for easy index mapping during key navigations
  const flatItems = categories.flatMap(cat => 
    cat.items
      .filter(item => 
        item.label.toLowerCase().includes(search.toLowerCase()) || 
        item.description.toLowerCase().includes(search.toLowerCase())
      )
      .map(item => ({ ...item, category: cat.category }))
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      
      // Close on Escape
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setSearch('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [commandPaletteOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!flatItems.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % flatItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      flatItems[activeIndex]?.action();
    }
  };

  // Close when clicking overlay backdrop
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
      setCommandPaletteOpen(false);
    }
  };

  if (!commandPaletteOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 backdrop-blur-md"
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.18)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '12vh',
        zIndex: 9999,
        transition: 'opacity var(--transition-fast)',
      }}
      onClick={handleOverlayClick}
    >
      <div 
        ref={paletteRef}
        className="w-full max-w-[640px] rounded-2xl border bg-white shadow-2xl overflow-hidden flex flex-col"
        style={{
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: '#FFFFFF',
          boxShadow: 'var(--shadow-lg)',
          maxHeight: '480px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          animation: 'page-enter 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Search Input */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <Search className="w-5 h-5 mr-3" style={{ color: 'var(--text-secondary)' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search options... (Use Arrow keys, Esc)"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              background: 'transparent',
              fontFamily: 'inherit',
            }}
          />
          <div 
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              backgroundColor: '#F1F5F9',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-light)',
            }}
          >
            ESC
          </div>
        </div>

        {/* Results List */}
        <div 
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.75rem 0.5rem',
          }}
        >
          {flatItems.length === 0 ? (
            <div 
              style={{
                padding: '2.5rem 0',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
              }}
            >
              No matching CRM commands found. Try searching navigation tabs or AI prompts.
            </div>
          ) : (
            <div>
              {/* Grouped Rendering */}
              {categories.map((cat) => {
                const filteredCatItems = cat.items.filter(item => 
                  flatItems.some(flat => flat.label === item.label && flat.category === cat.category)
                );

                if (filteredCatItems.length === 0) return null;

                return (
                  <div key={cat.category} style={{ marginBottom: '0.75rem' }}>
                    <div 
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        color: 'var(--text-tertiary)',
                        textTransform: 'uppercase',
                        padding: '0.25rem 1rem',
                      }}
                    >
                      {cat.category}
                    </div>
                    <div>
                      {filteredCatItems.map((item) => {
                        const globalIndex = flatItems.findIndex(flat => flat.label === item.label && flat.category === cat.category);
                        const isSelected = globalIndex === activeIndex;

                        return (
                          <div
                            key={item.label}
                            onClick={() => item.action()}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '0.75rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              cursor: 'pointer',
                              backgroundColor: isSelected ? 'var(--color-soft-blue)' : 'transparent',
                              transition: 'background-color var(--transition-fast)',
                            }}
                          >
                            <div 
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '28px',
                                height: '28px',
                                borderRadius: '8px',
                                backgroundColor: isSelected ? '#FFFFFF' : '#F8FAFC',
                                border: '1px solid var(--border-light)',
                                marginRight: '0.75rem',
                                color: isSelected ? 'var(--color-secondary)' : 'var(--text-secondary)',
                                transition: 'all var(--transition-fast)',
                              }}
                            >
                              {item.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div 
                                style={{
                                  fontSize: '0.9rem',
                                  fontWeight: 500,
                                  color: 'var(--text-primary)',
                                }}
                              >
                                {item.label}
                              </div>
                              <div 
                                style={{
                                  fontSize: '0.75rem',
                                  color: 'var(--text-secondary)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {item.description}
                              </div>
                            </div>
                            {isSelected && (
                              <div 
                                style={{
                                  fontSize: '0.75rem',
                                  fontWeight: 500,
                                  color: 'var(--color-secondary)',
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                Enter ↵
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Footer info bar */}
        <div
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
          }}
        >
          <div>
            Use <span style={{ fontWeight: 600 }}>↑↓</span> to navigate, <span style={{ fontWeight: 600 }}>Enter</span> to select
          </div>
          <div>
            Hold <span style={{ fontWeight: 600 }}>Ctrl + K</span> to toggle palette anywhere
          </div>
        </div>
      </div>
    </div>
  );
};
