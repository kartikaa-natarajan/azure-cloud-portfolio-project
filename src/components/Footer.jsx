import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '2rem 0',
      borderTop: '1px solid var(--glass-border)',
      marginTop: 'auto',
      color: 'var(--text-secondary)'
    }}>
      <p>&copy; {new Date().getFullYear()} Deepti Shree. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
