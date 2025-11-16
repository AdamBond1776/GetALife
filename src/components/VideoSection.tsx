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
    marginBottom: '48px',
  },
  videoPlaceholder: {
    width: '100%',
    aspectRatio: '16 / 9',
    backgroundColor: '#1f2937',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px dashed #374151',
    marginBottom: '16px',
  },
  placeholderContent: {
    textAlign: 'center',
    padding: '40px',
  },
  icon: {
    fontSize: '64px',
    marginBottom: '16px',
    opacity: 0.5,
  },
  text: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: '8px',
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
