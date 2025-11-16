interface HeaderProps {
  user: any;
  isPremium: boolean;
  onAuthClick: () => void;
  onSignOut: () => void;
  onUpgradeClick: () => void;
  onProfileClick: () => void;
}

export function Header({ user, isPremium, onAuthClick, onSignOut, onUpgradeClick, onProfileClick }: HeaderProps) {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <h1 style={styles.logoText}>GetALife.AI</h1>
          <p style={styles.tagline}>Discover places you'll love</p>
        </div>

        <nav style={styles.nav}>
          {user ? (
            <>
              {!isPremium && (
                <button onClick={onUpgradeClick} style={styles.upgradeButton}>
                  Upgrade to Premium - $3/mo
                </button>
              )}
              <button onClick={onProfileClick} style={styles.profileButton}>
                Profile
              </button>
              <button onClick={onSignOut} style={styles.signOutButton}>
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={onAuthClick} style={styles.authButton}>
              Sign In / Sign Up
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoText: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2563eb',
    margin: 0,
  },
  tagline: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  authButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '600',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  upgradeButton: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: '#fbbf24',
    color: '#78350f',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  profileButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '500',
    backgroundColor: '#f3f4f6',
    color: '#1f2937',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  signOutButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '500',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};
