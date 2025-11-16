import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { UrgentBanner } from './components/UrgentBanner';
import { VideoSection } from './components/VideoSection';
import { ProjectInfo } from './components/ProjectInfo';
import { FundingProgress } from './components/FundingProgress';
import { ContributionForm } from './components/ContributionForm';
import { SupportersList } from './components/SupportersList';

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
    const { data } = await (supabase
      .from('supporters')
      .select('*')
      .order('created_at', { ascending: false }) as any);

    if (data) {
      setSupporters(data);
      const total = data.reduce((sum: number, supporter: Supporter) => sum + supporter.amount, 0);
      setTotalRaised(total);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <UrgentBanner />

      <main style={styles.main}>
        <div style={styles.content}>
          <h1 style={styles.title}>The American 300</h1>
          <p style={styles.subtitle}>Help Finish This Critical Book Project</p>

          <VideoSection />

          <ProjectInfo />

          <FundingProgress totalRaised={totalRaised} goal={50000} />

          <ContributionForm onContributionComplete={loadSupporters} />

          <SupportersList supporters={supporters} loading={loading} />
        </div>
      </main>

      <footer style={styles.footer}>
        <p>The American 300 Book Project - {new Date().getFullYear()}</p>
        <p style={styles.footerNote}>
          Direct contributions via Cash App, Venmo, or Zelle accepted
        </p>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
  },
  main: {
    paddingBottom: '80px',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 24px',
  },
  title: {
    fontSize: '64px',
    fontWeight: '900',
    textAlign: 'center',
    margin: '48px 0 20px',
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.03em',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  subtitle: {
    fontSize: '26px',
    textAlign: 'center',
    color: '#d1d5db',
    marginBottom: '64px',
    fontWeight: '500',
    letterSpacing: '-0.01em',
  },
  footer: {
    backgroundColor: '#000000',
    borderTop: '1px solid #1f2937',
    padding: '32px 20px',
    textAlign: 'center',
    color: '#6b7280',
  },
  footerNote: {
    marginTop: '8px',
    fontSize: '14px',
  },
};
