export function UrgentBanner() {
  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <div style={styles.urgentLabel}>⚠ URGENT ⚠</div>
        <p style={styles.message}>
          <strong>TIME-SENSITIVE:</strong> I may go to jail before finishing this book, as my local police and state-funded school are covering up a coordinated attack: kids from two schools planned a group beat-down of a girl for viral fame after she bullied an 11th-grade boy. I intervened, saving her from being dragged down while 6 kids swung at her—I threw no punches, but was grabbed from behind and assaulted. I got her to safety and had my daughters call 911 from the car. Instead of addressing the violence and my assault, Newport Police and the school emailed parents claiming a fight between two kids, handled by security/police with no other incident. They arrested me to silence the truth—likely offering, "Drop charges, we'll drop yours." The kid who punched me and his friend who orchestrated it still walk the halls with my daughter, fueling viral violence trends with zero accountability. I'm turning my hobby into this book to expose it all. Support me now for legal representation, to finish before it's too late, and to empower America to fight corruption threatening us all. With you, we hold them accountable!
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  banner: {
    backgroundColor: '#dc2626',
    borderBottom: '4px solid #991b1b',
    padding: '32px 20px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 20px rgba(220, 38, 38, 0.6)',
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  urgentLabel: {
    backgroundColor: '#ffffff',
    color: '#dc2626',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '900',
    fontSize: '20px',
    letterSpacing: '0.1em',
    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    display: 'inline-block',
  },
  message: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '500',
    margin: 0,
    textAlign: 'left',
    lineHeight: '170%',
  },
};
