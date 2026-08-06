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
  Wallet,
  FileCheck2,
  TrendingDown,
  Coins,
  CheckCircle,
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

interface VendorBill {
  id: string;
  supplier: string;
  service: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'approved' | 'paid';
}

interface WalletItem {
  id: string;
  client: string;
  balance: number;
  lastTx: string;
  date: string;
}

export const PaymentsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'refunds' | 'suppliers' | 'wallet'>('invoices');

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

  // Refund state
  const [refundLogs, setRefundLogs] = useState([
    { id: 'REF-801', client: 'Ananya Sen', amount: 45000, status: 'processed', date: '2026-07-21', reason: 'Hotel double booking refund' },
  ]);

  // Vendor bills state
  const [vendorBills, setVendorBills] = useState<VendorBill[]>([
    { id: 'BILL-401', supplier: 'Amalfi Sands DMC', service: 'Luxury Villa booking accommodation', amount: 1650000, dueDate: '2026-08-05', status: 'pending' },
    { id: 'BILL-402', supplier: 'Singing Sands Tours', service: 'Kyoto Sanctuary ground logistics', amount: 48000, dueDate: '2026-07-28', status: 'approved' },
    { id: 'BILL-403', supplier: 'Serengeti Flight Logistics', service: 'Safari private charter locks', amount: 1100000, dueDate: '2026-07-20', status: 'paid' },
  ]);

  // Wallets state
  const [wallets, setWallets] = useState<WalletItem[]>([
    { id: 'W-201', client: 'Neha Sharma', balance: 50000, lastTx: 'Refund transfer credit', date: '2026-07-25' },
    { id: 'W-202', client: 'Priya Patel', balance: 120000, lastTx: 'Advance excess deposit', date: '2026-07-24' },
    { id: 'W-203', client: 'Rajesh Iyer', balance: 0, lastTx: 'Cleared wallet payout', date: '2026-07-18' },
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
    
    setWallets(prev => prev.map(w => {
      if (w.client.toLowerCase() === pay.client.toLowerCase()) {
        return {
          ...w,
          balance: w.balance + amt,
          lastTx: 'Rebate credit adjustment',
          date: new Date().toISOString().substring(0, 10)
        };
      }
      return w;
    }));
    
    alert(`Refund of ₹${amt.toLocaleString()} processed successfully and logged to wallet for ${pay.client}!`);
  };

  const handleApproveBill = (billId: string) => {
    if (!confirm('Are you sure you want to approve this vendor payout?')) return;
    setVendorBills(prev => prev.map(b => {
      if (b.id === billId) {
        return { ...b, status: b.status === 'pending' ? 'approved' : 'paid' };
      }
      return b;
    }));
  };

  const handleAdjustWallet = (walletId: string) => {
    const amtStr = prompt('Enter adjustment amount (use negative value to deduct):');
    if (!amtStr) return;
    const amt = parseFloat(amtStr);
    if (isNaN(amt)) {
      alert('Invalid adjustment amount.');
      return;
    }
    setWallets(prev => prev.map(w => {
      if (w.id === walletId) {
        return {
          ...w,
          balance: Math.max(0, w.balance + amt),
          lastTx: 'Manual credit balance adjustment',
          date: new Date().toISOString().substring(0, 10)
        };
      }
      return w;
    }));
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem', animation: 'page-enter 0.4s ease-out forwards' }}>
      
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.25rem' }}>
        <div>
          <h2 className="h1-title" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Financials & Payments</h2>
          <p className="body-normal" style={{ color: 'var(--text-secondary)' }}>
            Manage client payments, supplier vendor invoices, ledger adjustments, and tax reports.
          </p>
        </div>

        <div style={{ display: 'flex', backgroundColor: 'rgba(255,255,255,0.04)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
          <button
            onClick={() => setActiveTab('invoices')}
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'invoices' ? 600 : 500,
              backgroundColor: activeTab === 'invoices' ? '#fff' : 'transparent',
              color: activeTab === 'invoices' ? '#0C182F' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <FileCheck2 className="w-4 h-4" />
            Client Invoices
          </button>
          <button
            onClick={() => setActiveTab('refunds')}
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'refunds' ? 600 : 500,
              backgroundColor: activeTab === 'refunds' ? '#fff' : 'transparent',
              color: activeTab === 'refunds' ? '#0C182F' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <TrendingDown className="w-4 h-4" />
            Refunds & Credits
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'suppliers' ? 600 : 500,
              backgroundColor: activeTab === 'suppliers' ? '#fff' : 'transparent',
              color: activeTab === 'suppliers' ? '#0C182F' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Coins className="w-4 h-4" />
            Supplier Bills
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              fontWeight: activeTab === 'wallet' ? 600 : 500,
              backgroundColor: activeTab === 'wallet' ? '#fff' : 'transparent',
              color: activeTab === 'wallet' ? '#0C182F' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Wallet className="w-4 h-4" />
            Digital Wallet
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <Card interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Total Collected</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success)', marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                <IndianRupee className="w-5 h-5" />
                {(payments.reduce((sum, p) => sum + p.paidAmount, 0)).toLocaleString()}
              </div>
              <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Deposits secured in bank</span>
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: 'var(--color-success)' }}>
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Outstanding Balance</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-warning)', marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                <IndianRupee className="w-5 h-5" />
                {(payments.reduce((sum, p) => sum + (p.status !== 'refunded' ? (p.totalCost - p.paidAmount) : 0), 0)).toLocaleString()}
              </div>
              <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Installments awaiting locks</span>
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', color: 'var(--color-warning)' }}>
              <Calendar className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card interactive>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>Total Wallet Deposits</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-secondary)', marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                <IndianRupee className="w-5 h-5" />
                {(wallets.reduce((sum, w) => sum + w.balance, 0)).toLocaleString()}
              </div>
              <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>Customer credits held</span>
            </div>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', color: 'var(--color-secondary)' }}>
              <Wallet className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      {activeTab === 'invoices' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <Card style={{ padding: 0 }}>
            <Table columns={columns} data={payments} onRowClick={(row) => setActivePayment(row)} />
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <Card title="Quick Payment Link Generator">
              <form onSubmit={handleGenerateLink} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Client Name</label>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: 'var(--border-light)', padding: '12px', borderRadius: '8px', border: '1px dashed rgba(255,255,255,0.2)' }}>
                    <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Share link with client:</span>
                    <a href={genLink} target="_blank" rel="noreferrer" style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', wordBreak: 'break-all' }}>
                      {genLink}
                    </a>
                  </div>
                )}
              </form>
            </Card>

            <Card title="GST Compliance & SAC rules">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <p>
                  Naaz Travels service bookings are classified under **SAC 998552** (Travel arrangement and reservation services).
                </p>
                <div style={{ padding: '0.75rem', borderLeft: '3px solid var(--color-secondary)', backgroundColor: 'rgba(56, 189, 248, 0.04)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                  <strong>Important Invoicing Rule:</strong> Invoices generated for clients within Maharashtra will carry CGST (9%) & SGST (9%). Out of state clients carry IGST (18%). All quotes are inclusive of base tax rate.
                </div>
                <p>
                  To change default Billing Details, click "GST Invoice" on the transaction list to download or print formatted invoice duplicates.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'refunds' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <Card title="Refund Management Archive">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              {refundLogs.map((log) => (
                <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', padding: '10px 14px', borderRadius: '8px' }}>
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
            </div>
          </Card>

          <Card title="Active Client Payout Triggers">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Below are completed or partial client deposits. You can initiate dynamic refunds which will update transaction logs and adjust balances instantly.
              </p>
              {payments.filter(p => p.paidAmount > 0).map((pay) => (
                <div key={`init-${pay.id}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{pay.client}</span>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>Paid: ₹{pay.paidAmount.toLocaleString()}</div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleInitiateRefund(pay)}>
                    Initiate Refund Payout
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'suppliers' && (
        <Card title="Contracted Partners & Vendor Bill Ledger">
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '1rem' }}>Bill ID</th>
                  <th style={{ padding: '1rem' }}>Vendor / Partner</th>
                  <th style={{ padding: '1rem' }}>Service Description</th>
                  <th style={{ padding: '1rem' }}>Amount</th>
                  <th style={{ padding: '1rem' }}>Due Date</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                  <th style={{ padding: '1rem' }}>Payout Action</th>
                </tr>
              </thead>
              <tbody>
                {vendorBills.map(bill => (
                  <tr key={bill.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{bill.id}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{bill.supplier}</td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{bill.service}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>₹{bill.amount.toLocaleString()}</td>
                    <td style={{ padding: '1rem' }}>{bill.dueDate}</td>
                    <td style={{ padding: '1rem' }}>
                      <Tag colorway={bill.status === 'paid' ? 'mint' : bill.status === 'approved' ? 'soft-blue' : 'peach'}>
                        {bill.status.toUpperCase()}
                      </Tag>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {bill.status === 'pending' && (
                        <Button size="sm" variant="secondary" onClick={() => handleApproveBill(bill.id)}>
                          Approve Payout
                        </Button>
                      )}
                      {bill.status === 'approved' && (
                        <Button size="sm" variant="outline" onClick={() => handleApproveBill(bill.id)}>
                          Release Fund
                        </Button>
                      )}
                      {bill.status === 'paid' && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>Cleared</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'wallet' && (
        <Card title="Client Credit Wallets & Advance Deposits Ledger">
          <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <th style={{ padding: '1rem' }}>Wallet ID</th>
                  <th style={{ padding: '1rem' }}>Client Name</th>
                  <th style={{ padding: '1rem' }}>Holdings Balance</th>
                  <th style={{ padding: '1rem' }}>Last Transaction Details</th>
                  <th style={{ padding: '1rem' }}>Reconciled Date</th>
                  <th style={{ padding: '1rem' }}>Manual Adjust</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map(w => (
                  <tr key={w.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{w.id}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{w.client}</td>
                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--color-secondary)' }}>₹{w.balance.toLocaleString()}</td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem' }}>{w.lastTx}</td>
                    <td style={{ padding: '1rem' }}>{w.date}</td>
                    <td style={{ padding: '1rem' }}>
                      <Button size="sm" variant="outline" onClick={() => handleAdjustWallet(w.id)}>
                        Adjust Credits
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h5 style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Installment Schedule</h5>
              {activePayment.installments.map((inst, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-light)', padding: '12px', borderRadius: '8px', borderLeft: `4px solid ${inst.status === 'paid' ? 'var(--color-success)' : inst.status === 'overdue' ? 'var(--color-danger)' : 'var(--color-warning)'}` }}>
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

      <Drawer
        isOpen={isInvoiceOpen}
        onClose={() => { setIsInvoiceOpen(false); setSelectedPaymentForInvoice(null); }}
        title={selectedPaymentForInvoice ? `GST Tax Invoice: ${selectedPaymentForInvoice.id}` : ''}
        width="600px"
      >
        {selectedPaymentForInvoice && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
            
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.775rem' }}>
                <div>
                  <span style={{ textTransform: 'uppercase', color: '#64748B', fontSize: '0.65rem', fontWeight: 600 }}>Billing Details</span>
                  <div style={{ marginTop: '4px' }}>
                    <strong style={{ color: '#0C182F' }}>{selectedPaymentForInvoice.client}</strong><br />
                    {selectedPaymentForInvoice.gstin ? (
                      <span style={{ color: '#0EA5E9' }}>GSTIN: {selectedPaymentForInvoice.gstin}</span>
                    ) : (
                      <span style={{ color: '#94A3B8' }}>Unregistered Consumer</span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ textTransform: 'uppercase', color: '#64748B', fontSize: '0.65rem', fontWeight: 600 }}>Excursion Package</span>
                  <div style={{ marginTop: '4px' }}>
                    <strong style={{ color: '#0C182F' }}>{selectedPaymentForInvoice.package}</strong><br />
                    <span style={{ color: '#475569' }}>Place of Supply: Maharashtra (27)</span>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#0C182F' }}>SAC 998552</strong><br />
                <span style={{ fontSize: '0.75rem', color: '#475569' }}>Travel Agency Excursions booking and accommodation services</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', width: '250px', marginLeft: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '4px', color: '#475569' }}>
                  <span>Taxable Value</span>
                  <span>₹{(selectedPaymentForInvoice.totalCost / 1.18).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '4px', color: '#475569' }}>
                  <span>CGST (9%)</span>
                  <span>₹{((selectedPaymentForInvoice.totalCost / 1.18) * 0.09).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '4px', color: '#475569' }}>
                  <span>SGST (9%)</span>
                  <span>₹{((selectedPaymentForInvoice.totalCost / 1.18) * 0.09).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.9rem', paddingTop: '4px', color: '#0C182F' }}>
                  <span>Total (INR)</span>
                  <span>₹{selectedPaymentForInvoice.totalCost.toLocaleString()}</span>
                </div>
              </div>

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
