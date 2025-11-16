import { campaignContent } from '../data/campaignContent';

export function ComingSoon() {
  return (
    <div style={styles.section}>
      <div style={styles.header}>
        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
        <h3 style={styles.title}>{campaignContent.comingSoon.title}</h3>
      </div>
      <ul style={styles.list}>
        {campaignContent.comingSoon.items.map((item, index) => (
          <li key={index} style={styles.listItem}>
            <span style={styles.bullet}>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    marginTop: '40px',
    paddingTop: '40px',
    borderTop: '1px solid #e2e8f0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  icon: {
    width: '28px',
    height: '28px',
    color: '#f59e0b',
    flexShrink: 0,
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    gap: '12px',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#475569',
    marginBottom: '12px',
  },
  bullet: {
    color: '#f59e0b',
    fontWeight: '700',
    fontSize: '20px',
    flexShrink: 0,
  },
};
