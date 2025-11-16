import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface ContributionFormProps {
  onContributionComplete: () => void;
}

export function ContributionForm({ onContributionComplete }: ContributionFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cashapp' | 'venmo' | 'zelle'>('cashapp');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !amount) {
      alert('Please fill in all required fields');
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await (supabase.from('supporters') as any).insert({
        name,
        email,
        amount: amountNum,
        message: message || null,
        payment_method: paymentMethod,
      });

      if (error) throw error;

      alert(`Thank you ${name}! Please complete your ${paymentMethod.toUpperCase()} payment to finalize your contribution.`);

      setName('');
      setEmail('');
      setAmount('');
      setMessage('');

      onContributionComplete();
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error recording your contribution. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Support This Project</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Your Name *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="John Smith"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Email *</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Contribution Amount * ($)</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="25"
            min="1"
            step="1"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Payment Method *</label>
          <div style={styles.paymentOptions}>
            <button
              type="button"
              onClick={() => setPaymentMethod('cashapp')}
              style={{
                ...styles.paymentButton,
                ...(paymentMethod === 'cashapp' ? styles.paymentButtonActive : {}),
              }}
            >
              Cash App
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('venmo')}
              style={{
                ...styles.paymentButton,
                ...(paymentMethod === 'venmo' ? styles.paymentButtonActive : {}),
              }}
            >
              Venmo
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('zelle')}
              style={{
                ...styles.paymentButton,
                ...(paymentMethod === 'zelle' ? styles.paymentButtonActive : {}),
              }}
            >
              Zelle
            </button>
          </div>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Message (optional)</label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Leave a message of support..."
            style={styles.textarea}
            rows={4}
          />
        </div>

        <button type="submit" style={styles.submitButton} disabled={submitting}>
          {submitting ? 'Processing...' : 'Pledge Contribution'}
        </button>

        <p style={styles.note}>
          After submitting, you'll receive payment instructions for your selected method.
          Your contribution will be recorded once payment is confirmed.
        </p>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#111827',
    borderRadius: '16px',
    padding: '40px',
    marginBottom: '48px',
    border: '1px solid #1f2937',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '800',
    marginBottom: '32px',
    color: '#ffffff',
    textAlign: 'center',
  },
  form: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  field: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    backgroundColor: '#1f2937',
    border: '2px solid #374151',
    borderRadius: '8px',
    color: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    backgroundColor: '#1f2937',
    border: '2px solid #374151',
    borderRadius: '8px',
    color: '#ffffff',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  paymentOptions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
  },
  paymentButton: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#1f2937',
    border: '2px solid #374151',
    borderRadius: '8px',
    color: '#9ca3af',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  paymentButtonActive: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
    color: '#ffffff',
  },
  submitButton: {
    width: '100%',
    padding: '18px',
    fontSize: '18px',
    fontWeight: '700',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginBottom: '16px',
  },
  note: {
    fontSize: '14px',
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: '150%',
  },
};
