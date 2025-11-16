import { campaignContent } from '../data/campaignContent';

export function UrgentBanner() {
  return (
    <div style={styles.banner}>
      <div style={styles.container}>
        <div style={styles.titleWrapper}>
          <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h2 style={styles.title}>{campaignContent.urgentBanner.title}</h2>
        </div>
        <p style={styles.text}>{campaignContent.urgentBanner.content}</p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    backgroundColor: '#ef4444',
    padding: '40px 24px',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  icon: {
    width: '32px',
    height: '32px',
    color: '#ffffff',
    flexShrink: 0,
  },
  title: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '700',
    margin: 0,
    lineHeight: '1.2',
  },
  text: {
    color: '#ffffff',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: 0,
    whiteSpace: 'pre-line',
  },
};
