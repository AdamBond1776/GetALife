interface FundingProgressProps {
  totalRaised: number;
  goal: number;
}

export function FundingProgress({ totalRaised, goal }: FundingProgressProps) {
  const percentage = Math.min((totalRaised / goal) * 100, 100);
  const remaining = Math.max(goal - totalRaised, 0);

  return (
    <div style={styles.container}>
      <div style={styles.stats}>
        <div style={styles.stat}>
          <div style={styles.amount}>${totalRaised.toLocaleString()}</div>
          <div style={styles.label}>Raised</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.amount}>${goal.toLocaleString()}</div>
          <div style={styles.label}>Goal</div>
        </div>
        <div style={styles.stat}>
          <div style={styles.amount}>${remaining.toLocaleString()}</div>
          <div style={styles.label}>To Go</div>
        </div>
      </div>

      <div style={styles.progressBar}>
        <div style={{...styles.progressFill, width: `${percentage}%`}}></div>
      </div>

      <div style={styles.percentage}>{percentage.toFixed(1)}% Funded</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#111827',
    borderRadius: '20px',
    padding: '48px',
    marginBottom: '56px',
    border: '3px solid #dc2626',
    boxShadow: '0 8px 32px rgba(220, 38, 38, 0.3)',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '32px',
    marginBottom: '40px',
  },
  stat: {
    textAlign: 'center',
  },
  amount: {
    fontSize: '42px',
    fontWeight: '900',
    color: '#ef4444',
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  },
  label: {
    fontSize: '14px',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '600',
  },
  progressBar: {
    width: '100%',
    height: '28px',
    backgroundColor: '#1f2937',
    borderRadius: '14px',
    overflow: 'hidden',
    marginBottom: '20px',
    border: '2px solid #374151',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#dc2626',
    transition: 'width 0.5s ease',
    backgroundImage: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)',
  },
  percentage: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '-0.01em',
  },
};
