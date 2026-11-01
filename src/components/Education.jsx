import React from 'react';

const Education = () => {
  return (
    <section id="education" className="section bg-primary gsap-section">
      <div className="container">
        
        <div className="education-grid">
          
          <div>
            <span className="section-label">Academic Background</span>
            <h2 className="section-heading" style={{ marginBottom: '2rem' }}>Education</h2>
            <div className="timeline" style={{ maxWidth: '100%' }}>
              <div className="timeline-item">
                <div className="timeline-bullet" style={{ borderColor: 'var(--accent-purple)' }}></div>
                <div style={{ paddingLeft: '1rem' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.2rem' }}>MCA</h3>
                  <div style={{ color: 'var(--accent-purple)', fontWeight: 500, marginBottom: '0.5rem' }}>Jain University</div>
                  <div style={{ color: 'var(--text-secondary)' }}>2025 – Present</div>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-bullet" style={{ borderColor: 'var(--accent-purple)' }}></div>
                <div style={{ paddingLeft: '1rem' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.2rem' }}>BCA</h3>
                  <div style={{ color: 'var(--accent-purple)', fontWeight: 500, marginBottom: '0.5rem' }}>Periyar University</div>
                  <div style={{ color: 'var(--text-secondary)' }}>2022 – 2025</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="section-label">Skill Upgrades</span>
            <h2 className="section-heading" style={{ marginBottom: '2rem' }}>Certifications</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {['AWS Academy Cloud Developing (2026)', 'Python ML & AI (2024)', 'SQL Visualization using Power BI (2025)'].map((cert, idx) => (
                <div key={idx} style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.3s' }}
                     onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                     onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-primary)' }}></div>
                  <span style={{ fontWeight: 500 }}>{cert}</span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Languages</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['English', 'Kannada', 'Tamil', 'Hindi'].map((lang, idx) => (
                <span key={idx} style={{ padding: '8px 20px', borderRadius: '30px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Education;
