import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface SupportSectionProps {
  onSupportAdded: () => void;
}

export function SupportSection({ onSupportAdded }: SupportSectionProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const amounts = [25, 50, 100, 250, 500];

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(0);
  };

  const getFinalAmount = () => {
    if (customAmount) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 0 : parsed;
    }
    return selectedAmount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = getFinalAmount();

    if (!name || !email || finalAmount <= 0) {
      alert('Please fill in all required fields and select an amount');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('supporters').insert({
        name,
        email,
        amount: finalAmount,
        message: message || null,
        payment_method: 'cashapp',
      });

      if (error) throw error;

      setShowSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setSelectedAmount(100);
      setCustomAmount('');
      onSupportAdded();

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting support:', error);
      alert('There was an error submitting your support. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg style={styles.dollarIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <h2 style={styles.title}>Support This Project</h2>
        </div>

        {showSuccess && (
          <div style={styles.successMessage}>
            Thank you for your pledge! Your support has been recorded.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formSection}>
            <label style={styles.label}>Select Amount</label>
            <div style={styles.amountGrid}>
              {amounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountClick(amount)}
                  style={{
                    ...styles.amountButton,
                    ...(selectedAmount === amount ? styles.amountButtonSelected : {}),
                  }}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formSection}>
            <label style={styles.label}>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formSection}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formSection}>
            <label style={styles.label}>Message of Support (Optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share why you're supporting this project..."
              rows={4}
              style={{...styles.input, ...styles.textarea}}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.submitButton,
              ...(isSubmitting ? styles.submitButtonDisabled : {}),
            }}
          >
            <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            {isSubmitting ? 'Processing...' : `Donate $${getFinalAmount().toFixed(2)}`}
          </button>

          <p style={styles.note}>
            Payment processing will be added soon. For now, your pledge is recorded.
          </p>
        </form>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '60px 24px',
    backgroundColor: '#f8fafc',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '48px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  dollarIcon: {
    width: '32px',
    height: '32px',
    color: '#f59e0b',
    flexShrink: 0,
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  successMessage: {
    padding: '16px',
    backgroundColor: '#dcfce7',
    color: '#166534',
    borderRadius: '8px',
    marginBottom: '24px',
    fontSize: '16px',
    fontWeight: '500',
  },
  formSection: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '8px',
  },
  amountGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '12px',
  },
  amountButton: {
    padding: '16px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#475569',
    backgroundColor: '#f1f5f9',
    border: '2px solid transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  amountButtonSelected: {
    backgroundColor: '#f59e0b',
    color: '#ffffff',
    border: '2px solid #d97706',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    color: '#1e293b',
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  },
  textarea: {
    resize: 'vertical' as const,
    fontFamily: 'inherit',
  },
  submitButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#d97706',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginBottom: '16px',
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
  },
  buttonIcon: {
    width: '20px',
    height: '20px',
  },
  note: {
    fontSize: '14px',
    color: '#64748b',
    textAlign: 'center' as const,
    margin: 0,
  },
};
