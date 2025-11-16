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
    borderRadius: '16px',
    padding: '40px',
    marginBottom: '48px',
    border: '2px solid #dc2626',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  stat: {
    textAlign: 'center',
  },
  amount: {
    fontSize: '36px',
    fontWeight: '900',
    color: '#ef4444',
    marginBottom: '8px',
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
    height: '24px',
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '16px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#dc2626',
    transition: 'width 0.5s ease',
    backgroundImage: 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)',
  },
  percentage: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: '700',
    color: '#ffffff',
  },
};
