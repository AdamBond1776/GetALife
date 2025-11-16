export function ProjectInfo() {
  return (
    <div style={styles.container}>
      <div style={styles.section}>
        <h2 style={styles.heading}>About The American 300</h2>
        <p style={styles.text}>
          This book documents critical truths that must reach the American people. Time is running out,
          and your support will help ensure this work is completed and published before it's too late.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>Why This Matters</h3>
        <p style={styles.text}>
          The American 300 tells the story that mainstream sources won't cover. It's a rallying cry
          for patriots who believe in truth, freedom, and the American way. But powerful forces want
          to silence this message.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>How Your Support Helps</h3>
        <ul style={styles.list}>
          <li style={styles.listItem}>Complete the final chapters</li>
          <li style={styles.listItem}>Professional editing and fact-checking</li>
          <li style={styles.listItem}>Cover design and formatting</li>
          <li style={styles.listItem}>Publishing and distribution costs</li>
          <li style={styles.listItem}>Legal defense fund if needed</li>
          <li style={styles.listItem}>Website maintenance and reader organization</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subheading}>Join the Movement</h3>
        <p style={styles.text}>
          Visit <a href="https://theamerican300.com" style={styles.link}>theamerican300.com</a> to
          connect with other readers and stay updated on the book's progress.
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: '#111827',
    borderRadius: '20px',
    padding: '48px',
    marginBottom: '56px',
    border: '2px solid #1f2937',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
  section: {
    marginBottom: '40px',
  },
  heading: {
    fontSize: '36px',
    fontWeight: '800',
    marginBottom: '24px',
    color: '#ffffff',
    letterSpacing: '-0.02em',
  },
  subheading: {
    fontSize: '26px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#ef4444',
    letterSpacing: '-0.01em',
  },
  text: {
    fontSize: '18px',
    lineHeight: '175%',
    color: '#d1d5db',
    marginBottom: '16px',
  },
  list: {
    paddingLeft: '24px',
    marginTop: '12px',
  },
  listItem: {
    fontSize: '18px',
    lineHeight: '200%',
    color: '#d1d5db',
    marginBottom: '8px',
  },
  link: {
    color: '#ef4444',
    textDecoration: 'underline',
    fontWeight: '600',
  },
};
