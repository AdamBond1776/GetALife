import { useState, useRef, useEffect } from 'react';

interface SearchInterfaceProps {
  onSearch: (query: string, budget?: number, location?: string) => void;
  loading: boolean;
  canSearch: boolean;
  searchesRemaining: number;
  isPremium: boolean;
}

export function SearchInterface({
  onSearch,
  loading,
  canSearch,
  searchesRemaining,
  isPremium,
}: SearchInterfaceProps) {
  const [query, setQuery] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [detectedLocation, setDetectedLocation] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const cityName = data.address.city || data.address.town || data.address.village || 'your location';
            setDetectedLocation(cityName);
          } catch (error) {
            setDetectedLocation('your current location');
          }
        },
        () => {
          setDetectedLocation('your current location');
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && canSearch && !loading) {
      const budgetValue = budget ? parseFloat(budget) : undefined;
      const searchLocation = location || detectedLocation;
      onSearch(query, budgetValue, searchLocation);
    }
  };

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      if (canSearch && !loading) {
        const budgetValue = budget ? parseFloat(budget) : undefined;
        const searchLocation = location || detectedLocation;
        onSearch(transcript, budgetValue, searchLocation);
      }
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchBox}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="What do you want to do today?"
              style={styles.input}
              disabled={loading || !canSearch}
            />
            <button
              type="button"
              onClick={startVoiceSearch}
              style={{
                ...styles.voiceButton,
                backgroundColor: isListening ? '#ef4444' : '#2563eb',
              }}
              disabled={loading || !canSearch || isListening}
            >
              {isListening ? '🎤 Listening...' : '🎤'}
            </button>
          </div>

          <div style={styles.budgetContainer}>
            <label style={styles.budgetLabel}>Budget per person (optional):</label>
            <div style={styles.budgetInputWrapper}>
              <span style={styles.dollarSign}>$</span>
              <input
                type="number"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                placeholder="30"
                min="0"
                step="1"
                style={styles.budgetInput}
                disabled={loading || !canSearch}
              />
            </div>
          </div>

          <div style={styles.locationContainer}>
            <label style={styles.locationLabel}>Location (optional):</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder={detectedLocation ? `Using ${detectedLocation}` : "We'll detect your location"}
              style={styles.locationInput}
              disabled={loading || !canSearch}
            />
            {!location && detectedLocation && (
              <p style={styles.locationHint}>
                Leave blank to search near {detectedLocation}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={styles.searchButton}
            disabled={loading || !canSearch || !query.trim()}
          >
            {loading ? 'Searching...' : 'Find Places'}
          </button>
        </form>

        {!isPremium && (
          <div style={styles.searchInfo}>
            {canSearch ? (
              <p style={styles.infoText}>
                Free searches today: {searchesRemaining} remaining
              </p>
            ) : (
              <p style={styles.warningText}>
                No free searches left today. Additional searches are $0.50 each.
              </p>
            )}
          </div>
        )}

        {isPremium && (
          <div style={styles.premiumBadge}>
            Premium Member - Unlimited Searches
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  searchBox: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputContainer: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '16px 20px',
    fontSize: '18px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  voiceButton: {
    padding: '16px 20px',
    fontSize: '20px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
    minWidth: '60px',
  },
  searchButton: {
    padding: '16px',
    fontSize: '18px',
    fontWeight: '600',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
  },
  searchInfo: {
    marginTop: '16px',
    textAlign: 'center',
  },
  infoText: {
    fontSize: '14px',
    color: '#666',
  },
  warningText: {
    fontSize: '14px',
    color: '#ef4444',
    fontWeight: '500',
  },
  premiumBadge: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#fbbf24',
    color: '#78350f',
    textAlign: 'center',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
  },
  budgetContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  budgetLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#4b5563',
  },
  budgetInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#f9fafb',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
  },
  dollarSign: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#6b7280',
  },
  budgetInput: {
    flex: 1,
    fontSize: '18px',
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    fontWeight: '500',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  locationLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#4b5563',
  },
  locationInput: {
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    outline: 'none',
    backgroundColor: '#f9fafb',
    transition: 'border-color 0.2s',
  },
  locationHint: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '0',
    fontStyle: 'italic',
  },
};
