import { motion } from 'framer-motion';
import { Award, ArrowUpRight } from 'lucide-react';

function Certifications() {
  const certifications = [
    {
      number: '01',
      title: 'AWS Certified Solutions Architect',
      issuer: 'AWS',
      level: 'ASSOCIATE LEVEL',
    },
    {
      number: '02',
      title: 'Certified Fraud Examiner',
      issuer: 'CFE',
      level: 'CERTIFICATION',
    },
    {
      number: '03',
      title: 'AWS Developer Training',
      issuer: 'AWS',
      level: 'TRAINING',
    },
    {
      number: '04',
      title: 'Google Cybersecurity Professional Certificate',
      issuer: 'Google',
      level: 'PROFESSIONAL CERTIFICATE',
    },
  ];

  return (
    <section className="certifications-section" id="certifications">

      <div className="section-container">

        <motion.div
          className="section-top"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-number">06 / CERTIFICATIONS</span>
          <span className="section-line" />
          <span className="section-label">CREDENTIALS</span>
        </motion.div>

        <motion.div
          className="cert-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p>VALIDATED KNOWLEDGE</p>

          <h2>
            CERTIFIED
            <br />
            <span>CAPABILITIES.</span>
          </h2>
        </motion.div>

        <div className="cert-grid">

          {certifications.map((cert, index) => (
            <motion.article
              className="cert-card"
              key={cert.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
            >

              <div className="cert-top">

                <span>{cert.number}</span>

                <Award
                  size={20}
                  strokeWidth={1.2}
                />

              </div>

              <div className="cert-content">

                <span className="cert-level">
                  {cert.level}
                </span>

                <h3>{cert.title}</h3>

                <p>{cert.issuer}</p>

              </div>

              <ArrowUpRight
                className="cert-arrow"
                size={18}
              />

            </motion.article>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Certifications;