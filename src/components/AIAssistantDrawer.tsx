import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { X, Send, User, ArrowUpRight } from 'lucide-react';
import aiAvatar from '../assets/ai-avatar.png';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  loading?: boolean;
  insights?: {
    metric: string;
    value: string;
    trend: string;
    details: string;
  }[];
}

export const AIAssistantDrawer: React.FC = () => {
  const {
    aiAssistantOpen,
    setAiAssistantOpen,
    aiPromptInput,
    setAiPromptInput,
  } = useNavigation();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Hello! I am your Agency's CRM Copilot. I analyze booking histories, client LTV, and itinerary details to optimize conversions. How can I help you today?",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested actions
  const suggestionPills = [
    { label: 'Predict Lead Conversion', prompt: 'Predict conversion probability for pending lead #3819' },
    { label: 'Upsell Excursions', prompt: 'Suggest premium excursion upsells for Mr. Harrison in Florence' },
    { label: 'Forecast Commissions', prompt: 'Show AI Commission target projections for next 30 days' },
  ];

  // Process global command palette prompt triggers
  useEffect(() => {
    if (aiPromptInput) {
      handleSend(aiPromptInput);
      setAiPromptInput(''); // Reset global prompt trigger
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aiPromptInput]);

  useEffect(() => {
    // Scroll to bottom on messages update
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateAIResponse = (userPrompt: string) => {
    const prompt = userPrompt.toLowerCase();
    let responseText = '';
    let responseInsights: ChatMessage['insights'] = undefined;

    if (prompt.includes('conversion') || prompt.includes('lead')) {
      responseText = "Based on machine learning models scoring client behavioral histories, lead source (referral), and speed-to-response rates, I have compiled a conversion score breakdown:";
      responseInsights = [
        { metric: 'Conversion Probability', value: '87.4%', trend: '+12%', details: 'Strong profile, recent engagement is high.' },
        { metric: 'Customer Sentiment', value: 'Positive', trend: 'Warm', details: 'Client responded within 5 minutes to itinerary drafts.' },
        { metric: 'Upsell Propensity', value: 'High (82%)', trend: 'Premium flight upgrade', details: 'Matches past luxury booking habits.' }
      ];
    } else if (prompt.includes('upsell') || prompt.includes('excursion') || prompt.includes('harrison')) {
      responseText = "Analyzing Mr. Harrison's luxury itinerary in Florence, I recommend presenting the following upscale experiences. High probability of attachment based on historical customer matches:";
      responseInsights = [
        { metric: 'Private Vineyard Helicoptor Tour', value: '₹1,200', trend: 'High Margin', details: '92% match with past Tuscan tour preferences.' },
        { metric: 'Uffizi VIP Access & Curator Meet', value: '₹450', trend: 'Exclusive', details: 'Highly requested package currently in stock.' },
        { metric: 'Michelin Star Chef Tasting', value: '₹350', trend: 'Luxury', details: 'Coordinates perfectly with day 3 dinner opening.' }
      ];
    } else if (prompt.includes('forecast') || prompt.includes('commission') || prompt.includes('revenue')) {
      responseText = "Here is the revenue forecasting model for the next 90 days, comparing current pipelines against expected conversions:";
      responseInsights = [
        { metric: 'Forecasted Revenue', value: '₹1,42,500', trend: 'On Track', details: 'Confidence margin of 95% based on active pipeline.' },
        { metric: 'Upsell Pipeline Value', value: '₹18,200', trend: '+5.4% YoY', details: 'Unrealized commissions from flight class upgrades.' },
        { metric: 'At-Risk Revenue', value: '₹6,400', trend: '-2%', details: 'Pending hotel confirmations in Amalfi.' }
      ];
    } else {
      responseText = "I've analyzed the request and checked the CRM records. The current profile matches our standard cohort. I recommend following up via email with a customizable luxury package offer.";
    }

    const aiMsgId = 'ai-' + Math.random();
    setMessages(prev => [
      ...prev,
      {
        id: aiMsgId,
        sender: 'ai',
        text: responseText,
        timestamp: 'Just now',
        insights: responseInsights,
      }
    ]);
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsgId = 'user-' + Math.random();
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Trigger AI response loading state
    const loadingId = 'ai-loading-' + Math.random();
    setMessages(prev => [...prev, { id: loadingId, sender: 'ai', text: '', timestamp: 'Just now', loading: true }]);

    setTimeout(() => {
      // Remove loading message and generate AI response
      setMessages(prev => prev.filter(m => m.id !== loadingId));
      generateAIResponse(textToSend);
    }, 1200);
  };

  if (!aiAssistantOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '420px',
        maxWidth: '100%',
        backgroundColor: '#FFFFFF',
        boxShadow: 'var(--shadow-lg)',
        borderLeft: '1px solid var(--border-light)',
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
        animation: 'page-enter 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
      className="glass-effect"
    >
      {/* Header */}
      <div 
        style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={aiAvatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="AI Copilot Avatar" />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>AI CRM Copilot</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Predictive Analytics Engine</div>
          </div>
        </div>
        <button
          onClick={() => setAiAssistantOpen(false)}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            padding: '4px',
            color: 'var(--text-secondary)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div 
        style={{
          flex: 1,
          overflowY: 'scroll',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {messages.map((msg) => (
          <div 
            key={msg.id}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              gap: '0.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {msg.sender === 'ai' ? (
                <>
                  <img src={aiAvatar} style={{ width: '14px', height: '14px', borderRadius: '50%', objectFit: 'cover' }} alt="AI Copilot" />
                  <span>AI Copilot</span>
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>You</span>
                </>
              )}
              <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>• {msg.timestamp}</span>
            </div>
            
            <div 
              style={{
                backgroundColor: msg.sender === 'user' ? 'var(--color-secondary)' : '#F8FAFC',
                color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-primary)',
                border: msg.sender === 'ai' ? '1px solid var(--border-light)' : 'none',
                borderRadius: '16px',
                borderTopRightRadius: msg.sender === 'user' ? '4px' : '16px',
                borderTopLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
                padding: '0.85rem 1.1rem',
                fontSize: '0.875rem',
                lineHeight: 1.45,
                boxShadow: msg.sender === 'ai' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {msg.loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '1.2rem', padding: '0 4px' }}>
                  <div className="skeleton-box" style={{ width: '8px', height: '8px', borderRadius: '50%' }} />
                  <div className="skeleton-box" style={{ width: '8px', height: '8px', borderRadius: '50%', animationDelay: '0.2s' }} />
                  <div className="skeleton-box" style={{ width: '8px', height: '8px', borderRadius: '50%', animationDelay: '0.4s' }} />
                </div>
              ) : (
                msg.text
              )}
            </div>

            {/* AI Insights Card Block */}
            {msg.insights && (
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  width: '100%',
                  marginTop: '0.5rem',
                }}
              >
                {msg.insights.map((ins, i) => (
                  <div 
                    key={i}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.75rem 1rem',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{ins.metric}</span>
                      <span 
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: ins.trend.includes('-') ? '#FEE2E2' : 'var(--color-mint)',
                          color: ins.trend.includes('-') ? 'var(--color-danger)' : 'var(--color-mint-dark)',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {ins.trend}
                      </span>
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0.25rem 0' }}>
                      {ins.value}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {ins.details}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Pills */}
      <div 
        style={{
          padding: '0.75rem 1.25rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          borderTop: '1px solid var(--border-light)',
          background: 'rgba(248, 250, 252, 0.8)',
        }}
      >
        {suggestionPills.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.prompt)}
            style={{
              padding: '6px 12px',
              borderRadius: '99px',
              border: '1px solid var(--border-light)',
              backgroundColor: '#FFFFFF',
              fontSize: '0.725rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.color = 'var(--color-secondary)';
              e.currentTarget.style.backgroundColor = 'var(--color-soft-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-light)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <span>{p.label}</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid var(--border-light)',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
        }}
      >
        <textarea
          placeholder="Ask CRM AI Copilot..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend(input);
            }
          }}
          style={{
            flex: 1,
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            fontSize: '0.85rem',
            outline: 'none',
            color: 'var(--text-primary)',
            transition: 'border-color var(--transition-fast)',
            resize: 'none',
            fontFamily: 'inherit',
            minHeight: '60px',
            maxHeight: '150px',
            overflowY: 'auto',
            lineHeight: '1.4'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-accent)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
        />
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            backgroundColor: 'var(--color-secondary)',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color var(--transition-fast), transform var(--transition-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
