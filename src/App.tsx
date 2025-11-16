import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { supabase } from './lib/supabase';
import { generateRecommendations, processSearchQuery } from './lib/ai-search';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { SearchInterface } from './components/SearchInterface';
import { RecommendationCard } from './components/RecommendationCard';
import { PaymentModal } from './components/PaymentModal';
import { ProfileModal } from './components/ProfileModal';
import type { Recommendation, UserPreference, SavedSearch } from './types';

function App() {
  const { user, profile, loading, signUp, signIn, signOut, canSearchToday, isPremium, refetchProfile } = useAuth();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<'search' | 'subscription'>('search');
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const [searching, setSearching] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreference[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  useEffect(() => {
    if (user) {
      loadUserPreferences();
      loadSavedSearches();
    }
  }, [user]);

  const loadUserPreferences = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id);
    if (data) setUserPreferences(data);
  };

  const loadSavedSearches = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', user.id);
    if (data) setSavedSearches(data);
  };

  const handleSearch = async (query: string, budget?: number, location?: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (!canSearchToday() && !isPremium()) {
      setPaymentType('search');
      setPaymentModalOpen(true);
      return;
    }

    setSearching(true);

    try {
      const params = await processSearchQuery(query);

      if (budget) {
        params.budget = budget;
      }

      if (location) {
        params.location = location;
      }

      const likes = userPreferences
        .filter(p => p.preference_type === 'like')
        .map(p => p.value);
      const dislikes = userPreferences
        .filter(p => p.preference_type === 'dislike')
        .map(p => p.value);

      const results = await generateRecommendations(params, { likes, dislikes });
      setRecommendations(results);

      await (supabase.from('searches') as any).insert({
        user_id: user.id,
        search_type: canSearchToday() || isPremium() ? 'free' : 'paid',
        query_text: query,
        parameters: params,
        results: results,
      });

      if (!isPremium() && profile) {
        await (supabase.from('profiles') as any)
          .update({ searches_used_today: profile.searches_used_today + 1 })
          .eq('id', user.id);
        refetchProfile();
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('An error occurred during search. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handlePlaceFeedback = async (
    place: Recommendation,
    feedbackType: 'positive' | 'negative'
  ) => {
    if (!user) return;

    await (supabase.from('place_feedback') as any).insert({
      user_id: user.id,
      place_name: place.name,
      place_data: place,
      feedback_type: feedbackType,
    });

    await (supabase.from('user_preferences') as any).insert({
      user_id: user.id,
      preference_type: feedbackType === 'positive' ? 'like' : 'dislike',
      category: place.category,
      value: place.category,
    }).then(() => loadUserPreferences());

    alert(feedbackType === 'positive'
      ? 'Thanks! We\'ll recommend more places like this.'
      : 'Got it! We\'ll avoid similar places in the future.'
    );
  };

  const handleAddPreference = async (type: 'like' | 'dislike', category: string, value: string) => {
    if (!user) return;

    const { error } = await (supabase.from('user_preferences') as any).insert({
      user_id: user.id,
      preference_type: type,
      category,
      value,
    });

    if (!error) {
      loadUserPreferences();
    }
  };

  const handleRemovePreference = async (id: string) => {
    await supabase.from('user_preferences').delete().eq('id', id);
    loadUserPreferences();
  };

  const handleDeleteSavedSearch = async (id: string) => {
    await supabase.from('saved_searches').delete().eq('id', id);
    loadSavedSearches();
  };

  const handlePaymentConfirm = async () => {
    if (!user) return;

    if (paymentType === 'subscription') {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      await (supabase.from('profiles') as any)
        .update({
          subscription_tier: 'premium',
          subscription_expires_at: expiresAt.toISOString(),
        })
        .eq('id', user.id);

      await (supabase.from('payment_transactions') as any).insert({
        user_id: user.id,
        transaction_type: 'subscription',
        amount: 3.0,
        status: 'completed',
      });

      refetchProfile();
      setPaymentModalOpen(false);
      alert('Welcome to Premium! You now have unlimited searches.');
    } else {
      await (supabase.from('payment_transactions') as any).insert({
        user_id: user.id,
        transaction_type: 'search',
        amount: 0.5,
        status: 'completed',
      });

      setPaymentModalOpen(false);
      alert('Payment successful! You can now search.');
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingText}>Loading GetALife.AI...</div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <Header
        user={user}
        isPremium={isPremium()}
        onAuthClick={() => setAuthModalOpen(true)}
        onSignOut={signOut}
        onUpgradeClick={() => {
          setPaymentType('subscription');
          setPaymentModalOpen(true);
        }}
        onProfileClick={() => setProfileModalOpen(true)}
      />

      <main style={styles.main}>
        <div style={styles.hero}>
          <h2 style={styles.heroTitle}>What do you want to do today?</h2>
          <p style={styles.heroSubtitle}>
            Tell us what you're looking for, and we'll find the perfect places for you
          </p>
        </div>

        <SearchInterface
          onSearch={handleSearch}
          loading={searching}
          canSearch={!user || canSearchToday() || isPremium()}
          searchesRemaining={user && profile ? (1 - profile.searches_used_today) : 1}
          isPremium={isPremium()}
        />

        {recommendations.length > 0 && (
          <div style={styles.results}>
            <h3 style={styles.resultsTitle}>Your Personalized Recommendations</h3>
            <div style={styles.recommendationsGrid}>
              {recommendations.map((rec, index) => (
                <RecommendationCard
                  key={index}
                  recommendation={rec}
                  onLike={() => handlePlaceFeedback(rec, 'positive')}
                  onDislike={() => handlePlaceFeedback(rec, 'negative')}
                />
              ))}
            </div>
          </div>
        )}

        {!user && recommendations.length === 0 && (
          <div style={styles.features}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🔍</div>
              <h3 style={styles.featureTitle}>Smart Search</h3>
              <p style={styles.featureText}>
                Use text or voice to describe what you're looking for
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🎯</div>
              <h3 style={styles.featureTitle}>Personalized</h3>
              <p style={styles.featureText}>
                Get recommendations based on your preferences and budget
              </p>
            </div>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>💎</div>
              <h3 style={styles.featureTitle}>Premium Features</h3>
              <p style={styles.featureText}>
                Unlimited searches and saved preferences for just $3/month
              </p>
            </div>
          </div>
        )}
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSignIn={signIn}
        onSignUp={signUp}
      />

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        type={paymentType}
        onConfirm={handlePaymentConfirm}
      />

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        profile={profile}
        preferences={userPreferences}
        savedSearches={savedSearches}
        onAddPreference={handleAddPreference}
        onRemovePreference={handleRemovePreference}
        onDeleteSavedSearch={handleDeleteSavedSearch}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2563eb',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 24px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '16px',
    lineHeight: '120%',
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#6b7280',
    lineHeight: '150%',
    maxWidth: '600px',
    margin: '0 auto',
  },
  results: {
    marginTop: '48px',
  },
  resultsTitle: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '24px',
    textAlign: 'center',
  },
  recommendationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginTop: '64px',
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  featureIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  featureTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '12px',
  },
  featureText: {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: '150%',
  },
};

export default App;
