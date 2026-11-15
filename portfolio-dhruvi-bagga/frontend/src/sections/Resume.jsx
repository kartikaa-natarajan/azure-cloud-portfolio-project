import { motion } from 'framer-motion';
import {
  ArrowDownToLine,
  FileText,
  ArrowUpRight,
} from 'lucide-react';

function Resume() {
  return (
    <section className="resume-section" id="resume">

      <div className="section-container">

        <motion.div
          className="resume-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <div className="resume-icon">
            <FileText
              size={42}
              strokeWidth={1}
            />
          </div>

          <div className="resume-content">

            <span>CURRICULUM VITAE</span>

            <h2>
              WANT THE
              <br />
              <span>FULL STORY?</span>
            </h2>

            <p>
              View my complete experience, education, certifications,
              projects and technical skills.
            </p>

          </div>

          <div className="resume-actions">

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="resume-view"
            >
              VIEW RESUME
              <ArrowUpRight size={16} />
            </a>

            <a
              href="/resume.pdf"
              download
              className="resume-download"
            >
              DOWNLOAD
              <ArrowDownToLine size={16} />
            </a>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Resume;