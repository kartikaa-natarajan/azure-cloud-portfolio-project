import React from 'react';
import { Cloud, Code, Database, Server, PenTool, Brain, Users, MessageSquare, Target } from 'lucide-react';

const Skills = () => {
  return (
    <section id="skills" className="section bg-primary gsap-section">
      <div className="container">
        <span className="section-label">My Expertise</span>
        <h2 className="section-heading">Technical Arsenal</h2>
        
        <div className="bento-grid">
          {/* Main Core Skill - Span 2 */}
          <div className="bento-item span-2">
            <div style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}><Cloud size={40} /></div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Cloud Computing</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Proficient in AWS Ecosystem (EC2, S3, RDS). AWS Academy Cloud Developing (2026) certified.</p>
          </div>

          <div className="bento-item">
            <div style={{ color: 'var(--accent-purple)', marginBottom: '1rem' }}><Code size={40} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Programming</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Python, Java, JavaScript, Flutter.</p>
          </div>

          <div className="bento-item">
            <div style={{ color: '#10b981', marginBottom: '1rem' }}><Database size={40} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Databases</h3>
            <p style={{ color: 'var(--text-secondary)' }}>MySQL, PostgreSQL, MongoDB.</p>
          </div>

          <div className="bento-item">
            <div style={{ color: '#f59e0b', marginBottom: '1rem' }}><Brain size={40} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>AI / ML</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Machine Learning Basics, NLP.</p>
          </div>

          <div className="bento-item">
            <div style={{ color: '#ec4899', marginBottom: '1rem' }}><Server size={40} /></div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Data & BI</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Power BI, Data Visualization.</p>
          </div>

          {/* Soft Skills - Span 2 */}
          <div className="bento-item span-2 soft-skills-card" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Soft Skills</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Effective team player and problem solver.</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ padding: '15px', background: 'var(--bg-secondary)', borderRadius: '12px', color: 'var(--text-primary)' }}><Users size={24} /></div>
              <div style={{ padding: '15px', background: 'var(--bg-secondary)', borderRadius: '12px', color: 'var(--text-primary)' }}><MessageSquare size={24} /></div>
              <div style={{ padding: '15px', background: 'var(--bg-secondary)', borderRadius: '12px', color: 'var(--text-primary)' }}><Target size={24} /></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
