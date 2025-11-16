interface Supporter {
  id: string;
  name: string;
  amount: number;
  message?: string;
  created_at: string;
}

interface SupportersListProps {
  supporters: Supporter[];
  loading: boolean;
}

export function SupportersList({ supporters, loading }: SupportersListProps) {
  if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Recent Supporters</h2>
        <p style={styles.loading}>Loading supporters...</p>
      </div>
    );
  }

  if (supporters.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <svg style={styles.heartIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <p style={styles.emptyText}>Be the first to support this project!</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Recent Supporters ({supporters.length})</h2>

      <div style={styles.list}>
        {supporters.map(supporter => (
          <div key={supporter.id} style={styles.supporter}>
            <div style={styles.supporterHeader}>
              <div style={styles.name}>{supporter.name}</div>
              <div style={styles.amount}>${supporter.amount.toLocaleString()}</div>
            </div>
            {supporter.message && (
              <div style={styles.message}>{supporter.message}</div>
            )}
            <div style={styles.date}>
              {new Date(supporter.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '48px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
    marginBottom: '32px',
  },
  loading: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: '16px',
    padding: '40px',
  },
  emptyContainer: {
    maxWidth: '680px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '60px 48px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as const,
  },
  heartIcon: {
    width: '80px',
    height: '80px',
    color: '#cbd5e1',
    margin: '0 auto 24px',
  },
  emptyText: {
    fontSize: '18px',
    color: '#64748b',
    margin: 0,
  },
  list: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  supporter: {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #e2e8f0',
  },
  supporterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  name: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
  },
  amount: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#d97706',
  },
  message: {
    fontSize: '16px',
    color: '#475569',
    lineHeight: '1.5',
    marginBottom: '8px',
    marginTop: '8px',
  },
  date: {
    fontSize: '14px',
    color: '#94a3b8',
  },
};
