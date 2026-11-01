import React from 'react';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Smart Resume Analyzer',
      category: 'NLP & AI',
      color: 'var(--accent-blue)',
      description: 'An advanced pipeline connecting NLP-based parsing with ATS optimization tools to improve job seeker visibility, utilizing advanced keyword skill detection.',
      features: ['NLP-based parsing', 'ATS optimization', 'Skill detection'],
      image: '/airesume.png',
      link: 'https://resume-analyzer-deepti.vercel.app'
    },
    {
      title: 'Secure File Sharing System',
      category: 'Security & Backend',
      color: 'var(--accent-purple)',
      description: 'A deeply secure application focused on maintaining data integrity through encrypted transfers and strict role-based access control inside scalable secure storage.',
      features: ['Encrypted transfer', 'Role-based access', 'Secure storage'],
      image: '/fileShare.jpeg',
      link: 'https://file-share-deepti.vercel.app'
    }
  ];

  return (
    <section id="projects" className="section bg-secondary gsap-section">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-label" style={{ display: 'inline-block' }}>My Work</span>
          <h2 className="section-heading">Featured Projects</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {projects.map((proj, idx) => (
            <div key={idx} className="projects-item" style={{
              flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse'
            }}>

              <div style={{ flex: 1, minWidth: '300px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* Organic animated backlight moved OUTSIDE the window frame */}
                <div style={{
                  position: 'absolute',
                  width: '85%',
                  height: '85%',
                  background: `linear-gradient(135deg, ${proj.color} 0%, var(--bg-tertiary) 100%)`,
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  filter: 'blur(40px)',
                  opacity: 0.7,
                  zIndex: 0
                }}></div>

                <div style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '24px',
                  border: '2px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '24px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  position: 'relative',
                  zIndex: 10
                }}>
                  {/* macOS Mockup Dots */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                  </div>

                  {proj.image ? (
                    <div style={{
                      flex: 1,
                      backgroundColor: 'var(--ide-bg)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      boxShadow: 'var(--ide-shadow)',
                      padding: '12px'
                    }}>
                      <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  ) : (
                    <div style={{
                      flex: 1,
                      border: `2px dashed ${proj.color}`,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: proj.color, fontWeight: 600 }}>{proj.category} Visual</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ flex: 1, minWidth: '300px' }}>
                <span style={{ color: proj.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>
                  {proj.category}
                </span>
                <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>{proj.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {proj.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {proj.features.map((feature, fIdx) => (
                    <span key={fIdx} style={{
                      padding: '8px 16px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}>
                      {feature}
                    </span>
                  ))}
                </div>

                {proj.link && (
                  <div style={{ marginTop: '2.5rem' }}>
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 24px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--bg-primary)',
                      backgroundColor: 'var(--text-primary)',
                      borderRadius: '8px',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}>
                      View Live Project <ExternalLink size={18} />
                    </a>
                  </div>
                )}

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
