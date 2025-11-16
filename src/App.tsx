import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { UrgentBanner } from './components/UrgentBanner';
import { HeroSection } from './components/HeroSection';
import { AboutCampaign } from './components/AboutCampaign';
import { ComingSoon } from './components/ComingSoon';
import { LearnMore } from './components/LearnMore';
import { SupportSection } from './components/SupportSection';
import { SupportersList } from './components/SupportersList';
import { Footer } from './components/Footer';

interface Supporter {
  id: string;
  name: string;
  amount: number;
  message?: string;
  created_at: string;
}

export default function App() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [totalRaised, setTotalRaised] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSupporters();
  }, []);

  const loadSupporters = async () => {
    const { data } = await supabase
      .from('supporters')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setSupporters(data);
      const total = data.reduce((sum: number, supporter: Supporter) => sum + supporter.amount, 0);
      setTotalRaised(total);
    }
    setLoading(false);
  };

  const scrollToSupport = () => {
    const supportSection = document.getElementById('support-section');
    if (supportSection) {
      supportSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={styles.container}>
      <UrgentBanner />

      <HeroSection currentAmount={totalRaised} onJoinClick={scrollToSupport} />

      <AboutCampaign />

      <div style={styles.aboutContainer}>
        <div style={styles.aboutWrapper}>
          <ComingSoon />
          <LearnMore />
        </div>
      </div>

      <div id="support-section">
        <SupportSection onSupportAdded={loadSupporters} />
      </div>

      <div style={styles.supportersSection}>
        <SupportersList supporters={supporters} loading={loading} />
      </div>

      <Footer />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  aboutContainer: {
    padding: '0 24px 60px',
    backgroundColor: '#f8fafc',
  },
  aboutWrapper: {
    maxWidth: '680px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '48px',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  supportersSection: {
    padding: '60px 24px',
    backgroundColor: '#f8fafc',
  },
};
