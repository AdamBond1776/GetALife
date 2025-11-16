export function UrgentBanner() {
  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <div style={styles.urgentLabel}>URGENT</div>
        <p style={styles.message}>
          The author may face arrest before completion of this critical work.
          Your support is needed NOW to ensure this book reaches the public.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    backgroundColor: '#dc2626',
    borderBottom: '3px solid #991b1b',
    padding: '20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.5)',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  urgentLabel: {
    backgroundColor: '#ffffff',
    color: '#dc2626',
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: '900',
    fontSize: '18px',
    letterSpacing: '0.05em',
    animation: 'pulse 2s ease-in-out infinite',
  },
  message: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
    textAlign: 'center',
    lineHeight: '150%',
  },
};
