import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Mail,
  Linkedin,
  Github,
} from 'lucide-react';

function Contact() {
  return (
    <section className="contact-section" id="contact">

      <div className="section-container">

        <motion.div
          className="section-top"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-number">09 / CONTACT</span>
          <span className="section-line" />
          <span className="section-label">LET'S CONNECT</span>
        </motion.div>

        <div className="contact-layout">

          <motion.div
            className="contact-heading"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >

            <p>HAVE A PROJECT OR OPPORTUNITY?</p>

            <h2>
              LET'S BUILD
              <br />
              <span>SOMETHING.</span>
            </h2>

            <p className="contact-description">
              Whether it's a cloud project, engineering opportunity,
              collaboration or simply a conversation about technology,
              I'd love to hear from you.
            </p>

          </motion.div>


          <motion.div
            className="contact-links"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <a
              href="mailto:baggadhruvi2515@gmail.com"
              className="contact-link"
            >
              <div>
                <Mail size={20} />
                <span>EMAIL</span>
              </div>

              <ArrowUpRight size={18} />
            </a>


            <a
              href="https://www.linkedin.com/in/dhruvi-bagga-63663737b"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              <div>
                <Linkedin size={20} />
                <span>LINKEDIN</span>
              </div>

              <ArrowUpRight size={18} />
            </a>


            <a
              href="https://github.com/dhruvi-2014"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              <div>
                <Github size={20} />
                <span>GITHUB</span>
              </div>

              <ArrowUpRight size={18} />
            </a>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Contact;