import { campaignContent } from '../data/campaignContent';

export function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <h3 style={styles.title}>
          The American 300 - A Movement for Political Accountability
        </h3>
        <a
          href={`https://${campaignContent.learnMore.link}`}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          Visit {campaignContent.learnMore.link}
        </a>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: '#0f172a',
    padding: '48px 24px',
    marginTop: '60px',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#cbd5e1',
    marginBottom: '16px',
    marginTop: 0,
    lineHeight: '1.5',
  },
  link: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#fbbf24',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
};
