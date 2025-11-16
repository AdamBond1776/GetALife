export function VideoSection() {
  return (
    <div style={styles.container}>
      <div style={styles.videoPlaceholder}>
        <div style={styles.placeholderContent}>
          <div style={styles.icon}>▶</div>
          <p style={styles.text}>Video will be inserted here</p>
          <p style={styles.subtext}>Replace this section with your video embed code</p>
        </div>
      </div>
      <p style={styles.instructions}>
        To add your video: Replace the videoPlaceholder div in VideoSection.tsx with your video embed code
        (YouTube, Vimeo, etc.)
      </p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    marginBottom: '56px',
  },
  videoPlaceholder: {
    width: '100%',
    aspectRatio: '16 / 9',
    backgroundColor: '#111827',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px dashed #374151',
    marginBottom: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
  placeholderContent: {
    textAlign: 'center',
    padding: '40px',
  },
  icon: {
    fontSize: '80px',
    marginBottom: '20px',
    opacity: 0.4,
    color: '#ef4444',
  },
  text: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#d1d5db',
    marginBottom: '12px',
  },
  subtext: {
    fontSize: '14px',
    color: '#6b7280',
  },
  instructions: {
    fontSize: '14px',
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
};
