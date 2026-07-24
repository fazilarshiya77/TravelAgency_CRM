import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Table, type TableColumn } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { Input, Select } from '../components/ui/Input';
import { Drawer } from '../components/ui/Drawer';
import {
  IndianRupee,
  Calendar,
  Send,
  Link,
  Printer,
} from 'lucide-react';

interface PaymentItem {
  id: string;
  client: string;
  package: string;
  totalCost: number;
  paidAmount: number;
  status: 'paid' | 'partial' | 'unpaid' | 'overdue' | 'refunded';
  dueDate: string;
  gstin?: string;
  installments: {
    label: string;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue';
  }[];
}

export const PaymentsView: React.FC = () => {
  const [payments, setPayments] = useState<PaymentItem[]>([
    {
      id: 'PAY-1001',
      client: 'Neha Sharma',
      package: 'Amalfi Coast Luxury Escape',
      totalCost: 2422500, // INR (grand total from quote)
      paidAmount: 1211250,
      status: 'partial',
      dueDate: '2026-08-01',
      gstin: '27GSP1234F1Z9',
      installments: [
        { label: 'Booking Advance (50%)', amount: 1211250, dueDate: '2026-07-15', status: 'paid' },
        { label: 'Flight & Hotel Locks (30%)', amount: 726750, dueDate: '2026-08-01', status: 'pending' },
        { label: 'Final Excursion Balance (20%)', amount: 484500, dueDate: '2026-08-10', status: 'pending' },
      ],
    },
    {
      id: 'PAY-1002',
      client: 'Priya Patel',
      package: 'Kyoto Sanctuary Meditation',
      totalCost: 756500,
      paidAmount: 756500,
      status: 'paid',
      dueDate: '2026-07-20',
      gstin: '',
      installments: [
        { label: 'Full Settlement', amount: 756500, dueDate: '2026-07-20', status: 'paid' },
      ],
    },
    {
      id: 'PAY-1003',
      client: 'Vikram Malhotra',
      package: 'Swiss Alps Hiking Adventure',
      totalCost: 1232500,
      paidAmount: 0,
      status: 'overdue',
      dueDate: '2026-07-22',
      gstin: '07AAAAA2222B1Z2',
      installments: [
        { label: 'Advance Deposit', amount: 616250, dueDate: '2026-07-22', status: 'overdue' },
        { label: 'Final Settlement', amount: 616250, dueDate: '2026-08-20', status: 'pending' },
      ],
    },
    {
      id: 'PAY-1004',
      client: 'Rajesh Iyer',
      package: 'Serengeti Photo Safari',
      totalCost: 2720000,
      paidAmount: 2720000,
      status: 'paid',
      dueDate: '2026-07-10',
      gstin: '',
      installments: [
        { label: 'Advance Deposit', amount: 1360000, dueDate: '2026-07-01', status: 'paid' },
        { label: 'Final Settlement', amount: 1360000, dueDate: '2026-07-10', status: 'paid' },
      ],
    },
  ]);

  const [activePayment, setActivePayment] = useState<PaymentItem | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [selectedPaymentForInvoice, setSelectedPaymentForInvoice] = useState<PaymentItem | null>(null);

  // Reminders states
  const [selectedReminderType, setSelectedReminderType] = useState<'whatsapp' | 'email'>('whatsapp');
  
  // Payment Link Generator States
  const [genClientName, setGenClientName] = useState('Neha Sharma');
  const [genAmount, setGenAmount] = useState('726750');
  const [genLink, setGenLink] = useState('');

  // Refund list/management state
  const [refundLogs, setRefundLogs] = useState([
    { id: 'REF-801', client: 'Ananya Sen', amount: 45000, status: 'processed', date: '2026-07-21', reason: 'Hotel double booking refund' },
  ]);

  const handleSendReminder = (pay: PaymentItem) => {
    const text = `Dear ${pay.client}, this is a friendly reminder that the installment for your ${pay.package} is due on ${pay.dueDate}. The outstanding balance is ₹${(pay.totalCost - pay.paidAmount).toLocaleString()}. Please settle via the agency portal: https://naaztravels.in/pay/quick`;
    
    if (selectedReminderType === 'whatsapp') {
      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/${pay.client.includes('Malhotra') ? '919898012345' : '919876543210'}?text=${encodedText}`, '_blank');
    } else {
      window.open(`mailto:${pay.client.toLowerCase().replace(' ', '.')}@gmail.com?subject=Naaz Travels Payment Reminder&body=${text}`);
    }
  };

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!genAmount) return;
    const mockId = Math.random().toString(36).substring(4, 9).toUpperCase();
    const linkStr = `https://naaztravels.paylink.in/rzp_live_${mockId}?amt=${genAmount}`;
    setGenLink(linkStr);
  };

  const handleInitiateRefund = (pay: PaymentItem) => {
    const amtStr = prompt(`Enter refund amount for ${pay.client} (Max: ₹${pay.paidAmount.toLocaleString()}):`);
    if (!amtStr) return;
    const amt = parseFloat(amtStr);
    if (isNaN(amt) || amt <= 0 || amt > pay.paidAmount) {
      alert('Invalid refund amount.');
      return;
    }
    
    const newLog = {
      id: `REF-${800 + refundLogs.length + 1}`,
      client: pay.client,
      amount: amt,
      status: 'processed',
      date: new Date().toISOString().substring(0, 10),
      reason: 'Agent initiated cancellation rebate',
    };

    setRefundLogs([newLog, ...refundLogs]);
    setPayments(prev => prev.map(p => {
      if (p.id === pay.id) {
        return {
          ...p,
          paidAmount: p.paidAmount - amt,
          status: p.paidAmount - amt === 0 ? 'unpaid' : 'refunded',
        };
      }
      return p;
    }));
    
    alert(`Refund of ₹${amt.toLocaleString()} processed successfully for ${pay.client}!`);
  };

  const columns: TableColumn<PaymentItem>[] = [
    { header: 'Payment ID', accessor: 'id' },
    { header: 'Client', accessor: 'client' },
    { header: 'Excursion Details', accessor: 'package' },
    {
      header: 'Total Cost',
      accessor: (row) => <span style={{ fontWeight: 600 }}>₹{row.totalCost.toLocaleString()}</span>,
      align: 'right'
    },
    {
      header: 'Paid Amount',
      accessor: (row) => <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>₹{row.paidAmount.toLocaleString()}</span>,
      align: 'right'
    },
    {
      header: 'Status',
      accessor: (row) => (
        <Tag colorway={row.status === 'paid' ? 'mint' : row.status === 'partial' ? 'peach' : row.status === 'overdue' ? 'danger' : 'sand'}>
          {row.status.toUpperCase()}
        </Tag>
      )
    },
    { header: 'Due Date', accessor: 'dueDate' },
    {
      header: 'Actions',
      accessor: (row) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); setActivePayment(row); }}>
            Installments
          </Button>
          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setSelectedPaymentForInvoice(row); setIsInvoiceOpen(true); }}>
            GST Invoice
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'page-enter 0.4s ease-out forwards' }}>
      
      {/* Dynamic invoice printing styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-print-pane, #invoice-print-pane * {
            visibility: visible;
          }
          #invoice-print-pane {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 2rem;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem' }}>Financials & Payments</h2>
          <p className="body-normal" style={{ marginTop: '0.25rem' }}>
            Manage client installments, schedule auto-reminders, generate Indian GST invoices, and reconcile client refunds.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Total Collected</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)', marginTop: '4px', display: 'flex', alignItems: 'center' }}>
            <IndianRupee className="w-5 h-5" />
            {(payments.reduce((sum, p) => sum + p.paidAmount, 0)).toLocaleString()}
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Deposits secured in bank</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Outstanding Balance</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-peach-dark)', marginTop: '4px', display: 'flex', alignItems: 'center' }}>
            <IndianRupee className="w-5 h-5" />
            {(payments.reduce((sum, p) => sum + (p.status !== 'refunded' ? (p.totalCost - p.paidAmount) : 0), 0)).toLocaleString()}
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Installments awaiting locks</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-xl)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Overdue Receivables</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-danger)', marginTop: '4px', display: 'flex', alignItems: 'center' }}>
            <IndianRupee className="w-5 h-5" />
            {(payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + (p.totalCost - p.paidAmount), 0)).toLocaleString()}
          </div>
          <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Overdue client deadlines</span>
        </div>
      </div>

      {/* Main Table view */}
      <Card style={{ padding: 0 }}>
        <Table columns={columns} data={payments} onRowClick={(row) => setActivePayment(row)} />
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Payment link generator widget */}
        <Card title="Quick Payment Link Generator">
          <form onSubmit={handleGenerateLink} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Client Prospect</label>
              <Input value={genClientName} onChange={(e) => setGenClientName(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Amount (INR)</label>
              <Input type="number" value={genAmount} onChange={(e) => setGenAmount(e.target.value)} />
            </div>
            <Button type="submit" variant="primary" leftIcon={<Link className="w-4 h-4" />}>
              Generate Razorpay / UPI Link
            </Button>
            {genLink && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px dashed var(--border-light)' }}>
                <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Share link with client:</span>
                <a href={genLink} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', wordBreak: 'break-all' }}>
                  {genLink}
                </a>
              </div>
            )}
          </form>
        </Card>

        {/* Refund logs */}
        <Card title="Refund Management Archive">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            {refundLogs.map((log) => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '10px 14px', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{log.client}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>{log.reason} • {log.date}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-danger)' }}>-₹{log.amount.toLocaleString()}</span>
                  <Tag colorway="mint">{log.status.toUpperCase()}</Tag>
                </div>
              </div>
            ))}
            {payments.filter(p => p.paidAmount > 0).map((pay) => (
              <div key={`init-${pay.id}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '10px', marginTop: '4px' }}>
                <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>Rebate on {pay.client} deposits</span>
                <Button size="sm" variant="outline" onClick={() => handleInitiateRefund(pay)}>
                  Initiate Refund
                </Button>
              </div>
            ))}
          </div>
        </Card>

      </div>

      {/* INSTALLMENTS MANAGEMENT DRAWER */}
      <Drawer
        isOpen={activePayment !== null}
        onClose={() => setActivePayment(null)}
        title={activePayment ? `Installment Plan: ${activePayment.id}` : ''}
        width="480px"
      >
        {activePayment && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{activePayment.client}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{activePayment.package}</p>
            </div>

            {/* Installments Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h5 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Installment Schedule</h5>
              {activePayment.installments.map((inst, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '12px', borderRadius: '8px', borderLeft: `4px solid ${inst.status === 'paid' ? 'var(--color-success)' : inst.status === 'overdue' ? 'var(--color-danger)' : 'var(--color-warning)'}` }}>
                  <div>
                    <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>{inst.label}</div>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <Calendar className="w-3.5 h-3.5" /> Due: {inst.dueDate}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>₹{inst.amount.toLocaleString()}</div>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end', marginTop: '4px' }}>
                      <Tag colorway={inst.status === 'paid' ? 'mint' : inst.status === 'overdue' ? 'danger' : 'peach'}>
                        {inst.status.toUpperCase()}
                      </Tag>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reminder actions */}
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h5 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Dispatch Payment Reminder</h5>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <Select
                  value={selectedReminderType}
                  onChange={(e) => setSelectedReminderType(e.target.value as any)}
                  options={[
                    { value: 'whatsapp', label: 'WhatsApp Dispatch' },
                    { value: 'email', label: 'Email Dispatch' },
                  ]}
                />
                <Button variant="primary" leftIcon={<Send className="w-4 h-4" />} onClick={() => handleSendReminder(activePayment)}>
                  Send Now
                </Button>
              </div>
            </div>

          </div>
        )}
      </Drawer>

      {/* GST INVOICE DRAWER */}
      <Drawer
        isOpen={isInvoiceOpen}
        onClose={() => { setIsInvoiceOpen(false); setSelectedPaymentForInvoice(null); }}
        title={selectedPaymentForInvoice ? `GST Tax Invoice: ${selectedPaymentForInvoice.id}` : ''}
        width="600px"
      >
        {selectedPaymentForInvoice && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
            
            {/* Visual template invoice */}
            <div id="invoice-print-pane" style={{ border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0EA5E9', paddingBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0C182F', margin: 0 }}>NAAZ TRAVELS</h3>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>GSTIN: 27AAAAA1111A1Z1 | SAC: 998552</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0EA5E9', margin: 0 }}>TAX INVOICE</h4>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Invoice: NZ-{selectedPaymentForInvoice.id.substring(4)}</span>
                </div>
              </div>

              {/* Client info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.775rem' }}>
                <div>
                  <span style={{ textTransform: 'uppercase', color: '#64748B', fontSize: '0.65rem', fontWeight: 600 }}>Billing Details</span>
                  <div style={{ marginTop: '4px' }}>
                    <strong>{selectedPaymentForInvoice.client}</strong><br />
                    {selectedPaymentForInvoice.gstin ? (
                      <span style={{ color: 'var(--color-secondary)' }}>GSTIN: {selectedPaymentForInvoice.gstin}</span>
                    ) : (
                      <span style={{ color: '#94A3B8' }}>Unregistered Consumer</span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ textTransform: 'uppercase', color: '#64748B', fontSize: '0.65rem', fontWeight: 600 }}>Excursion Package</span>
                  <div style={{ marginTop: '4px' }}>
                    <strong>{selectedPaymentForInvoice.package}</strong><br />
                    <span>Place of Supply: Maharashtra (27)</span>
                  </div>
                </div>
              </div>

              {/* GST breakdown table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #CBD5E1', color: '#475569', textTransform: 'uppercase', fontSize: '0.65rem' }}>
                    <th style={{ padding: '6px 0' }}>SAC Code & Description</th>
                    <th style={{ padding: '6px 0', textAlign: 'right' }}>Taxable Value</th>
                    <th style={{ padding: '6px 0', textAlign: 'right' }}>CGST (9%)</th>
                    <th style={{ padding: '6px 0', textAlign: 'right' }}>SGST (9%)</th>
                    <th style={{ padding: '6px 0', textAlign: 'right' }}>Total (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '10px 0' }}>
                      <strong>SAC 998552</strong><br />
                      Travel Agency Excursions booking and accommodation services
                    </td>
                    <td style={{ padding: '10px 0', textAlign: 'right' }}>
                      ₹{(selectedPaymentForInvoice.totalCost / 1.18).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style={{ padding: '10px 0', textAlign: 'right' }}>
                      ₹{((selectedPaymentForInvoice.totalCost / 1.18) * 0.09).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style={{ padding: '10px 0', textAlign: 'right' }}>
                      ₹{((selectedPaymentForInvoice.totalCost / 1.18) * 0.09).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 600 }}>
                      ₹{selectedPaymentForInvoice.totalCost.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Invoicing totals */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px dashed #CBD5E1', paddingTop: '10px', fontSize: '0.8rem' }}>
                <span style={{ color: '#64748B' }}>Total GST liability generated:</span>
                <strong style={{ fontSize: '0.9rem', color: '#0EA5E9' }}>
                  ₹{(selectedPaymentForInvoice.totalCost - (selectedPaymentForInvoice.totalCost / 1.18)).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </strong>
              </div>

            </div>

            <Button variant="primary" leftIcon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>
              Print GST Invoice Document
            </Button>
          </div>
        )}
      </Drawer>

    </div>
  );
};
