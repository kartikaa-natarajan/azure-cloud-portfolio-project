import React from 'react';
import { Mail } from 'lucide-react';

const WhatsappIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 21 1.65-3.8a9 9 0 1 1 3.4 2.9z"></path>
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Contact = () => {
  return (
    <section id="contact" className="section bg-primary gsap-section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        
        <h2 className="contact-heading">
          Let's build <br /> <span className="text-gradient">something great.</span>
        </h2>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 4rem', lineHeight: 1.6 }}>
          I'm currently looking for new opportunities in cloud computing and software development. 
          My inbox is always open. Whether you have a question or just want to say hi!
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', paddingBottom: '2rem' }}>
          {/* Email Button */}
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=deeptishree9704@gmail.com" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '54px',
            color: 'var(--bg-primary)',
            backgroundColor: 'var(--text-primary)',
            borderRadius: '50%',
            transition: 'transform 0.3s, box-shadow 0.3s',
            textDecoration: 'none'
          }}
          title="Email: deeptishree9704@gmail.com"
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <Mail size={22} />
          </a>

          {/* LinkedIn Button */}
          <a href="https://www.linkedin.com/in/deeptishree04?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '54px',
            color: 'var(--text-primary)',
            backgroundColor: 'transparent',
            border: '2px solid var(--border-color)',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          title="LinkedIn Profile"
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
            e.currentTarget.style.borderColor = 'var(--accent-blue)';
            e.currentTarget.style.color = 'var(--accent-blue)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <LinkedinIcon size={22} />
          </a>

          {/* GitHub Button */}
          <a href="https://github.com/DeeptiShree04" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '54px',
            color: 'var(--text-primary)',
            backgroundColor: 'transparent',
            border: '2px solid var(--border-color)',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          title="GitHub Profile"
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
            e.currentTarget.style.borderColor = 'var(--text-primary)';
            e.currentTarget.style.color = 'var(--bg-primary)';
            e.currentTarget.style.backgroundColor = 'var(--text-primary)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <GithubIcon size={22} />
          </a>

          {/* WhatsApp Button */}
          <a href="https://wa.me/919110842007" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '54px',
            height: '54px',
            color: 'var(--text-primary)',
            backgroundColor: 'transparent',
            border: '2px solid var(--border-color)',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            textDecoration: 'none'
          }}
          title="WhatsApp DM: +91 9110842007"
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
            e.currentTarget.style.borderColor = '#25D366';
            e.currentTarget.style.color = 'var(--bg-primary)';
            e.currentTarget.style.backgroundColor = '#25D366';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(37,211,102,0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <WhatsappIcon size={22} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Contact;
