import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, ExternalLink } from 'lucide-react';
import Terminal from '../components/Terminal';

function Hero() {
  return (
    <section className="hero" id="home">

      {/* Background */}
      <div className="hero-grid" />

      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      <div className="hero-content">

        {/* Availability */}
        <motion.div
          className="hero-status"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="status-dot" />
          AVAILABLE FOR OPPORTUNITIES
        </motion.div>

        {/* Category */}
        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          CLOUD <span>•</span> DEVOPS <span>•</span> SECURITY <span>•</span> DATA
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          DHRUVI
          <br />
          <span>BAGGA</span>
        </motion.h1>

        {/* Bottom Hero Area */}
        <div className="hero-bottom">

          {/* Left Side */}
          <motion.div
            className="hero-description"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >

            <p>
              MCA student specializing in Storage & Cloud Technology,
              passionate about building secure, scalable and reliable
              cloud solutions.
            </p>

            {/* Buttons */}
            <div className="hero-actions">

              <a
                href="#projects"
                className="button button-primary"
              >
                Explore My Work
                <ArrowUpRight size={16} />
              </a>

              <a
                href="#contact"
                className="button button-secondary"
              >
                Let's Connect
              </a>

            </div>

            {/* Social Links */}
            <div className="hero-socials">

              <a
                href="https://github.com/dhruvi-2014"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={16} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/dhruvi-bagga-63663737b"
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={16} />
                LinkedIn
              </a>

            </div>

          </motion.div>

          {/* Terminal */}
          <Terminal />

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">

        <span>
          SCROLL TO EXPLORE
        </span>

        <div className="scroll-line" />

        <ArrowDown size={13} />

      </div>

    </section>
  );
}

export default Hero;