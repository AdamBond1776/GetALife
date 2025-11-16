interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'search' | 'subscription';
  onConfirm: () => void;
}

export function PaymentModal({ isOpen, onClose, type, onConfirm }: PaymentModalProps) {
  if (!isOpen) return null;

  const amount = type === 'search' ? '$0.50' : '$3.00/month';
  const description = type === 'search'
    ? 'Purchase one additional search'
    : 'Upgrade to Premium with unlimited searches and saved preferences';

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>✕</button>

        <h2 style={styles.title}>
          {type === 'search' ? 'Purchase Search' : 'Upgrade to Premium'}
        </h2>

        <div style={styles.content}>
          <div style={styles.priceBox}>
            <span style={styles.price}>{amount}</span>
          </div>

          <p style={styles.description}>{description}</p>

          {type === 'subscription' && (
            <ul style={styles.featureList}>
              <li>Unlimited searches every day</li>
              <li>Save and fine-tune search preferences</li>
              <li>Advanced filtering based on likes/dislikes</li>
              <li>Priority recommendations</li>
            </ul>
          )}

          <div style={styles.stripeNotice}>
            To complete payment integration, you'll need to set up Stripe.
            <br />
            <a
              href="https://bolt.new/setup/stripe"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.stripeLink}
            >
              Learn how to configure Stripe
            </a>
          </div>

          <button onClick={onConfirm} style={styles.confirmButton}>
            Proceed with Payment
          </button>

          <button onClick={onClose} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    width: '90%',
    maxWidth: '500px',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    padding: '4px',
    lineHeight: 1,
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '24px',
    color: '#1a1a1a',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  priceBox: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f9ff',
    borderRadius: '12px',
  },
  price: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#2563eb',
  },
  description: {
    fontSize: '16px',
    color: '#4b5563',
    lineHeight: '150%',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  stripeNotice: {
    padding: '16px',
    backgroundColor: '#fef3c7',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#92400e',
    lineHeight: '150%',
  },
  stripeLink: {
    color: '#2563eb',
    textDecoration: 'underline',
    fontWeight: '600',
  },
  confirmButton: {
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  cancelButton: {
    padding: '14px',
    fontSize: '16px',
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};
