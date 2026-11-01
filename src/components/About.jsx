import React from 'react';

const About = () => {
  return (
    <section id="about" className="section bg-secondary gsap-section">
      <div className="container">
        <div className="about-grid">
          
          <div>
            <span className="section-label">Who am I?</span>
            <h2 className="section-heading">About Me</h2>
          </div>

          <div style={{ paddingTop: '2.5rem' }}>
            <p style={{ fontSize: '1.4rem', lineHeight: 1.8, color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 500 }}>
              I am a motivated MCA student with a deep interest in cloud computing, modern web architecture, and scalable storage technologies.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              Over the course of my academic projects and hands-on learning, I have embraced the challenge of building solutions that are not only functional but architecturally sound. I am passionate about elegant code, robust databases, and the endless possibilities of machine learning and the cloud. 
              Always eager to tackle new challenges, I thrive in environments where technology meets problem-solving.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
