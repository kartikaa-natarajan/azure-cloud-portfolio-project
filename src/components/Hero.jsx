import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      });
      gsap.from(".hero-shape", {
        scale: 0.8,
        opacity: 0,
        rotation: 15,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="home" className="section bg-primary" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      paddingTop: '100px'
    }}>
      <div className="container" style={{ width: '100%' }}>
        <div className="hero-grid">
          
          {/* Left Text Column */}
          <div style={{ maxWidth: '600px' }}>
            <span className="hero-element section-label">Welcome</span>
            <h1 className="hero-element hero-heading">
              Building the <span className="text-gradient">future</span> of tech.
            </h1>
            <div className="hero-element hero-bio-box">
              <img 
                src="/profile-photo.jpg" 
                alt="Deepti Shree" 
                style={{ 
                  width: '150px', 
                  height: '150px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: '4px solid var(--accent-blue)', 
                  boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                  flexShrink: 0
                }} 
              />
              <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Hi, I'm <strong style={{ color: 'var(--text-primary)' }}>Deepti Shree</strong>. A passionate cloud computing enthusiast and software developer dedicated to crafting scalable, elegant solutions.
              </p>
            </div>
            <div className="hero-element">
              <a href="#projects" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                fontSize: '1.1rem',
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
              }}
              >
                Explore My Work <ArrowRight size={20} />
              </a>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="hero-ide-wrapper">
            <div className="hero-shape" style={{
              width: '400px',
              height: '400px',
              background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              opacity: 0.8,
              filter: 'blur(40px)',
              position: 'absolute'
            }}></div>
            <div className="hero-shape hero-ide-card">
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
              </div>
              <div style={{ 
                flex: 1, 
                backgroundColor: 'var(--ide-bg)', 
                borderRadius: '8px', 
                padding: '24px 20px', 
                color: 'var(--ide-text)',
                fontFamily: '"Consolas", "Fira Code", monospace',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                overflow: 'hidden',
                textAlign: 'left',
                boxShadow: 'var(--ide-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'all 0.5s ease'
              }}>
                <div><span style={{color: 'var(--ide-keyword)'}}>import</span> <span style={{color: 'var(--ide-class)'}}>Developer</span> <span style={{color: 'var(--ide-keyword)'}}>from</span> <span style={{color: 'var(--ide-string)'}}>'@world/future'</span>;</div>
                <div style={{ height: '8px' }}></div>
                <div><span style={{color: 'var(--ide-keyword)'}}>const</span> <span style={{color: 'var(--ide-var)'}}>profile</span> <span style={{color: 'var(--ide-operator)'}}>=</span> <span style={{color: 'var(--ide-new)'}}>new</span> <span style={{color: 'var(--ide-class)'}}>Developer</span>({'{'}</div>
                <div style={{paddingLeft: '24px'}}>name: <span style={{color: 'var(--ide-string)'}}>"Deepti Shree"</span>,</div>
                <div style={{paddingLeft: '24px'}}>role: <span style={{color: 'var(--ide-string)'}}>"Full Stack Engineer"</span>,</div>
                <div style={{paddingLeft: '24px'}}>focus: <span style={{color: 'var(--ide-string)'}}>"Cloud Computing"</span>,</div>
                <div style={{paddingLeft: '24px'}}>skills: [<span style={{color: 'var(--ide-string)'}}>"Java"</span>, <span style={{color: 'var(--ide-string)'}}>"React"</span>, <span style={{color: 'var(--ide-string)'}}>"AWS"</span>]</div>
                <div>{'});'}</div>
                <div style={{ height: '8px' }}></div>
                <div><span style={{color: 'var(--ide-var)'}}>profile</span>.<span style={{color: 'var(--ide-method)'}}>buildFuture</span>();<span style={{ display: 'inline-block', width: '8px', height: '16px', backgroundColor: 'var(--accent-blue)', marginLeft: '6px', verticalAlign: 'middle', animation: 'pulse 1.5s infinite' }}></span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
