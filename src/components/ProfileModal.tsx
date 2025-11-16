import { useState } from 'react';
import type { UserProfile, UserPreference, SavedSearch } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  preferences: UserPreference[];
  savedSearches: SavedSearch[];
  onAddPreference: (type: 'like' | 'dislike', category: string, value: string) => void;
  onRemovePreference: (id: string) => void;
  onDeleteSavedSearch: (id: string) => void;
}

export function ProfileModal({
  isOpen,
  onClose,
  profile,
  preferences,
  savedSearches,
  onAddPreference,
  onRemovePreference,
  onDeleteSavedSearch,
}: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'preferences' | 'searches'>('preferences');
  const [newPrefType, setNewPrefType] = useState<'like' | 'dislike'>('like');
  const [newCategory, setNewCategory] = useState('');
  const [newValue, setNewValue] = useState('');

  if (!isOpen || !profile) return null;

  const handleAddPreference = () => {
    if (newCategory.trim() && newValue.trim()) {
      onAddPreference(newPrefType, newCategory.trim(), newValue.trim());
      setNewCategory('');
      setNewValue('');
    }
  };

  const likes = preferences.filter(p => p.preference_type === 'like');
  const dislikes = preferences.filter(p => p.preference_type === 'dislike');

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>✕</button>

        <h2 style={styles.title}>Your Profile</h2>

        <div style={styles.profileInfo}>
          <div style={styles.infoRow}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{profile.email}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Tier:</span>
            <span style={{...styles.value, ...styles.tierBadge}}>
              {profile.subscription_tier === 'premium' ? '⭐ Premium' : 'Free'}
            </span>
          </div>
        </div>

        <div style={styles.tabs}>
          <button
            style={{...styles.tab, ...(activeTab === 'preferences' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          <button
            style={{...styles.tab, ...(activeTab === 'searches' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('searches')}
          >
            Saved Searches
          </button>
        </div>

        <div style={styles.content}>
          {activeTab === 'preferences' ? (
            <div style={styles.preferencesContent}>
              <div style={styles.addPreference}>
                <h3 style={styles.sectionTitle}>Add New Preference</h3>
                <div style={styles.addForm}>
                  <select
                    value={newPrefType}
                    onChange={e => setNewPrefType(e.target.value as 'like' | 'dislike')}
                    style={styles.select}
                  >
                    <option value="like">Like</option>
                    <option value="dislike">Dislike</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Category (e.g., cuisine, activity)"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Value (e.g., Italian, hiking)"
                    value={newValue}
                    onChange={e => setNewValue(e.target.value)}
                    style={styles.input}
                  />
                  <button onClick={handleAddPreference} style={styles.addButton}>
                    Add
                  </button>
                </div>
              </div>

              <div style={styles.preferenceLists}>
                <div style={styles.preferenceSection}>
                  <h3 style={styles.sectionTitle}>👍 Things You Like ({likes.length})</h3>
                  <div style={styles.preferenceGrid}>
                    {likes.map(pref => (
                      <div key={pref.id} style={styles.preferenceTag}>
                        <span>{pref.category}: {pref.value}</span>
                        <button onClick={() => onRemovePreference(pref.id)} style={styles.removeButton}>
                          ✕
                        </button>
                      </div>
                    ))}
                    {likes.length === 0 && (
                      <p style={styles.emptyText}>No likes yet. Add some above!</p>
                    )}
                  </div>
                </div>

                <div style={styles.preferenceSection}>
                  <h3 style={styles.sectionTitle}>👎 Things You Dislike ({dislikes.length})</h3>
                  <div style={styles.preferenceGrid}>
                    {dislikes.map(pref => (
                      <div key={pref.id} style={styles.preferenceTag}>
                        <span>{pref.category}: {pref.value}</span>
                        <button onClick={() => onRemovePreference(pref.id)} style={styles.removeButton}>
                          ✕
                        </button>
                      </div>
                    ))}
                    {dislikes.length === 0 && (
                      <p style={styles.emptyText}>No dislikes yet. Add some above!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.searchesContent}>
              <h3 style={styles.sectionTitle}>Saved Searches ({savedSearches.length})</h3>
              {savedSearches.length === 0 ? (
                <p style={styles.emptyText}>
                  No saved searches yet. {profile.subscription_tier !== 'premium' && 'Upgrade to Premium to save searches!'}
                </p>
              ) : (
                <div style={styles.searchList}>
                  {savedSearches.map(search => (
                    <div key={search.id} style={styles.searchItem}>
                      <div>
                        <h4 style={styles.searchName}>{search.name}</h4>
                        <p style={styles.searchDate}>
                          Saved: {new Date(search.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button onClick={() => onDeleteSavedSearch(search.id)} style={styles.deleteButton}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    width: '90%',
    maxWidth: '700px',
    maxHeight: '80vh',
    overflow: 'auto',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    padding: '4px',
    lineHeight: 1,
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#1a1a1a',
  },
  profileInfo: {
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
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
  tierBadge: {
    padding: '4px 8px',
    backgroundColor: '#fbbf24',
    color: '#78350f',
    borderRadius: '4px',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    borderBottom: '2px solid #e5e7eb',
  },
  tab: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    marginBottom: '-2px',
  },
  activeTab: {
    color: '#2563eb',
    borderBottomColor: '#2563eb',
  },
  content: {
    minHeight: '300px',
  },
  preferencesContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  addPreference: {},
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#1a1a1a',
  },
  addForm: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  select: {
    padding: '10px',
    fontSize: '14px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    outline: 'none',
  },
  input: {
    flex: 1,
    minWidth: '150px',
    padding: '10px',
    fontSize: '14px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    outline: 'none',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  preferenceLists: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  preferenceSection: {},
  preferenceGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  preferenceTag: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: '6px',
    fontSize: '14px',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#ef4444',
    padding: '0 4px',
  },
  emptyText: {
    fontSize: '14px',
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  searchesContent: {},
  searchList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  searchItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  },
  searchName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    color: '#1a1a1a',
  },
  searchDate: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
  deleteButton: {
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
