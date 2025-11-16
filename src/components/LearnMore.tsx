import { campaignContent } from '../data/campaignContent';

export function LearnMore() {
  return (
    <div style={styles.box}>
      <div style={styles.header}>
        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        <h3 style={styles.title}>{campaignContent.learnMore.title}</h3>
      </div>
      <p style={styles.description}>{campaignContent.learnMore.description}</p>
      <a
        href={`https://${campaignContent.learnMore.link}`}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        {campaignContent.learnMore.link}
        <svg style={styles.linkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  box: {
    marginTop: '40px',
    padding: '32px',
    backgroundColor: '#fef3c7',
    borderRadius: '12px',
    border: '2px solid #fbbf24',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  icon: {
    width: '24px',
    height: '24px',
    color: '#b45309',
    flexShrink: 0,
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#475569',
    marginBottom: '16px',
    marginTop: 0,
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#d97706',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  linkIcon: {
    width: '18px',
    height: '18px',
  },
};
