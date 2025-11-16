export function UrgentBanner() {
  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <div style={styles.urgentLabel}>⚠ URGENT ⚠</div>
        <p style={styles.message}>
          <strong>TIME-SENSITIVE:</strong> The author faces potential arrest before this book can be completed.
          Your immediate support is critical to ensure this important work reaches the American people.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    backgroundColor: '#dc2626',
    borderBottom: '4px solid #991b1b',
    padding: '24px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 20px rgba(220, 38, 38, 0.6)',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  urgentLabel: {
    backgroundColor: '#ffffff',
    color: '#dc2626',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '900',
    fontSize: '20px',
    letterSpacing: '0.1em',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
  },
  message: {
    color: '#ffffff',
    fontSize: '17px',
    fontWeight: '500',
    margin: 0,
    textAlign: 'center',
    lineHeight: '160%',
    maxWidth: '900px',
  },
};
