import { campaignContent } from '../data/campaignContent';

export function AboutCampaign() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.mainTitle}>About This Campaign</h2>

        <div style={styles.subsection}>
          <div style={styles.subsectionHeader}>
            <svg style={{...styles.icon, color: '#f59e0b'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <h3 style={styles.subsectionTitle}>{campaignContent.bookProject.title}</h3>
          </div>
          <p style={styles.text}>{campaignContent.bookProject.description}</p>
        </div>

        <div style={styles.subsection}>
          <div style={styles.subsectionHeader}>
            <svg style={{...styles.icon, color: '#f59e0b'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <h3 style={styles.subsectionTitle}>{campaignContent.legalNeeds.title}</h3>
          </div>
          <ul style={styles.list}>
            {campaignContent.legalNeeds.items.map((item, index) => (
              <li key={index} style={styles.listItem}>
                <span style={styles.bullet}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.subsection}>
          <div style={styles.subsectionHeader}>
            <svg style={{...styles.icon, color: '#f59e0b'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <h3 style={styles.subsectionTitle}>{campaignContent.completingBook.title}</h3>
          </div>
          <ul style={styles.list}>
            {campaignContent.completingBook.items.map((item, index) => (
              <li key={index} style={styles.listItem}>
                <span style={styles.bullet}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  section: {
    padding: '60px 24px',
    backgroundColor: '#f8fafc',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '48px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  mainTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '40px',
    marginTop: 0,
  },
  subsection: {
    marginBottom: '40px',
  },
  subsectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  icon: {
    width: '28px',
    height: '28px',
    flexShrink: 0,
  },
  subsectionTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#475569',
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
    color: '#ef4444',
    fontWeight: '700',
    fontSize: '20px',
    flexShrink: 0,
  },
};
