import type { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onLike: () => void;
  onDislike: () => void;
}

export function RecommendationCard({ recommendation, onLike, onDislike }: RecommendationCardProps) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.name}>{recommendation.name}</h3>
        {recommendation.rating && (
          <div style={styles.rating}>
            ⭐ {recommendation.rating.toFixed(1)}
          </div>
        )}
      </div>

      <div style={styles.category}>{recommendation.category}</div>

      <p style={styles.description}>{recommendation.description}</p>

      <div style={styles.details}>
        <div style={styles.detailItem}>
          <span style={styles.label}>Cost:</span>
          <span style={styles.value}>${recommendation.estimatedCost.toFixed(2)}/person</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.label}>Location:</span>
          <span style={styles.value}>{recommendation.address}</span>
        </div>
      </div>

      <div style={styles.whyBox}>
        <strong>Why we recommend:</strong>
        <p style={styles.whyText}>{recommendation.whyRecommended}</p>
      </div>

      <div style={styles.actions}>
        <button onClick={onLike} style={{...styles.actionButton, ...styles.likeButton}}>
          👍 Love It
        </button>
        <button onClick={onDislike} style={{...styles.actionButton, ...styles.dislikeButton}}>
          👎 Not For Me
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  name: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: 0,
  },
  rating: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#fbbf24',
  },
  category: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '16px',
    textTransform: 'capitalize',
  },
  description: {
    fontSize: '16px',
    color: '#4b5563',
    lineHeight: '150%',
    marginBottom: '16px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
  },
  value: {
    fontSize: '14px',
    color: '#1a1a1a',
    fontWeight: '600',
  },
  whyBox: {
    padding: '16px',
    backgroundColor: '#ecfdf5',
    borderRadius: '8px',
    marginBottom: '16px',
  },
  whyText: {
    fontSize: '14px',
    color: '#065f46',
    lineHeight: '150%',
    margin: '8px 0 0 0',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  actionButton: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.1s, opacity 0.2s',
  },
  likeButton: {
    backgroundColor: '#10b981',
    color: 'white',
  },
  dislikeButton: {
    backgroundColor: '#ef4444',
    color: 'white',
  },
};
