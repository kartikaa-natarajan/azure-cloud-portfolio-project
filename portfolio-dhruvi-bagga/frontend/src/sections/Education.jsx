import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

function Education() {
  const education = [
    {
      degree: 'MCA',
      field: 'Storage & Cloud Technology',
      institution: 'JAIN University',
      location: 'Bengaluru',
      period: '2025 — EXPECTED 2027',
      score: '9.9 / 10',
    },
    {
      degree: 'BSc (Hons.)',
      field: 'Forensic Science',
      institution: 'JAIN University',
      location: 'Bengaluru',
      period: '2022 — 2025',
      score: '8.5 / 10',
    },
  ];

  return (
    <section className="education-section" id="education">
      <div className="section-container">

        <motion.div
          className="section-top"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-number">05 / EDUCATION</span>
          <span className="section-line" />
          <span className="section-label">ACADEMIC BACKGROUND</span>
        </motion.div>

        <div className="education-header">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p>ACADEMIC JOURNEY</p>

            <h2>
              LEARNING
              <br />
              <span>BY BUILDING.</span>
            </h2>
          </motion.div>

        </div>

        <div className="education-list">

          {education.map((item, index) => (
            <motion.article
              className="education-card"
              key={item.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >

              <div className="education-icon">
                <GraduationCap
                  size={25}
                  strokeWidth={1.2}
                />
              </div>

              <div className="education-main">

                <span className="education-period">
                  {item.period}
                </span>

                <h3>
                  {item.degree}
                </h3>

                <h4>
                  {item.field}
                </h4>

                <p>
                  {item.institution}
                  <span> / </span>
                  {item.location}
                </p>

              </div>

              <div className="education-score">
                <span>CGPA</span>
                <strong>{item.score}</strong>
              </div>

            </motion.article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Education;