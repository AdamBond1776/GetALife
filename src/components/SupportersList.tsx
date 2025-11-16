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
      <div style={styles.container}>
        <h2 style={styles.heading}>Recent Supporters</h2>
        <p style={styles.empty}>Be the first to support this project!</p>
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
    backgroundColor: '#111827',
    borderRadius: '16px',
    padding: '40px',
    border: '1px solid #1f2937',
  },
  heading: {
    fontSize: '32px',
    fontWeight: '800',
    marginBottom: '32px',
    color: '#ffffff',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '18px',
    padding: '40px',
  },
  empty: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '18px',
    padding: '40px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  supporter: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #374151',
  },
  supporterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  name: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#ffffff',
  },
  amount: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#ef4444',
  },
  message: {
    fontSize: '16px',
    color: '#d1d5db',
    lineHeight: '150%',
    marginBottom: '8px',
    fontStyle: 'italic',
  },
  date: {
    fontSize: '14px',
    color: '#6b7280',
  },
};
