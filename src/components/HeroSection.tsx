import { campaignContent } from '../data/campaignContent';

interface HeroSectionProps {
  currentAmount: number;
  onJoinClick: () => void;
}

export function HeroSection({ currentAmount, onJoinClick }: HeroSectionProps) {
  const progress = (currentAmount / campaignContent.goalAmount) * 100;
  const formattedCurrent = currentAmount.toLocaleString();
  const formattedGoal = campaignContent.goalAmount.toLocaleString();

  return (
    <section style={styles.hero}>
      <div style={styles.container}>
        <div style={styles.iconWrapper}>
          <svg style={styles.targetIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        </div>

        <h1 style={styles.title}>{campaignContent.title}</h1>
        <p style={styles.subtitle}>{campaignContent.subtitle}</p>

        <div style={styles.fundingSection}>
          <div style={styles.amountWrapper}>
            <span style={styles.currentAmount}>${formattedCurrent}</span>
            <span style={styles.goalText}>of ${formattedGoal} goal</span>
          </div>

          <div style={styles.progressBar}>
            <div style={{...styles.progressFill, width: `${progress}%`}} />
          </div>

          <div style={styles.ctaButtons}>
            <button style={styles.ctaButton} onClick={onJoinClick}>
              <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Join the movement
            </button>

            <button style={{...styles.ctaButton, ...styles.ctaButtonSecondary}} onClick={onJoinClick}>
              <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Complete the book
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    backgroundColor: '#1e293b',
    padding: '60px 24px',
    color: '#ffffff',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
  },
  iconWrapper: {
    marginBottom: '24px',
  },
  targetIcon: {
    width: '48px',
    height: '48px',
    color: '#f59e0b',
  },
  title: {
    fontSize: '38px',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '20px',
    margin: 0,
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#e2e8f0',
    marginTop: '20px',
    marginBottom: '48px',
  },
  fundingSection: {
    marginTop: '48px',
  },
  amountWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '12px',
    marginBottom: '16px',
  },
  currentAmount: {
    fontSize: '52px',
    fontWeight: '700',
    color: '#f59e0b',
  },
  goalText: {
    fontSize: '20px',
    color: '#cbd5e1',
  },
  progressBar: {
    width: '100%',
    height: '12px',
    backgroundColor: '#334155',
    borderRadius: '6px',
    overflow: 'hidden',
    marginBottom: '32px',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
    transition: 'width 0.3s ease',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  ctaButton: {
    flex: '1',
    minWidth: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px 24px',
    backgroundColor: '#ffffff',
    color: '#1e293b',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  ctaButtonSecondary: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '2px solid #ffffff',
  },
  buttonIcon: {
    width: '20px',
    height: '20px',
  },
};
