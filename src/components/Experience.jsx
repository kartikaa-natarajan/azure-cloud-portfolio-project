import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="section bg-secondary gsap-section">
      <div className="container">
        <span className="section-label">My History</span>
        <h2 className="section-heading">Work Experience</h2>

        <div className="timeline">
          
          <div className="timeline-item">
            <div className="timeline-bullet"></div>
            <div style={{ 
              background: 'var(--card-bg)', 
              padding: '2rem', 
              borderRadius: '16px', 
              border: '1px solid var(--border-color)',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(10px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>Programmer Analyst Trainee</h3>
                  <div style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>Swadha Foundation</div>
                </div>
                <div style={{ padding: '6px 12px', background: 'var(--bg-primary)', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                  May 2024 – June 2024
                </div>
              </div>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.2rem', marginTop: '1rem' }}>
                <li>Developed and maintained key application features to enhance performance.</li>
                <li>Participated in rigorous debugging and testing protocols resolving software defects.</li>
                <li>Engaged in code reviews and comprehensive documentation of codebase.</li>
                <li>Collaborated deeply with team members to deliver projects under tight deadlines.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
