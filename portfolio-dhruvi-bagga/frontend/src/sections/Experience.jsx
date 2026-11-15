import { motion } from 'framer-motion';
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';

function Experience() {
  const experiences = [
    {
      number: '01',
      date: 'JUNE 2026 — AUG 2026',
      role: 'Data Engineer Intern',
      company: 'J2D Technologies',
      location: 'Bengaluru',
      description:
        'Developed a real-time financial transaction streaming pipeline using Kafka, Azure Databricks, Azure Data Factory, PySpark and Structured Streaming for processing credit-card transaction data.',
      points: [
        'Built real-time fraud detection and alerting workflows.',
        'Worked with transaction limits, fraud watchlists, joins and watermarks.',
        'Implemented sliding-window aggregations for streaming analytics.',
        'Worked with monitoring through a Databricks dashboard.',
      ],
    },

    {
      number: '02',
      date: 'FEB 2025 — MAR 2025',
      role: 'Crime Scene Analysis',
      company: 'Bengaluru Police',
      location: 'Bengaluru',
      description:
        'Assisted in crime scene investigations, cloud forensics and evidence analysis across cybercrime, financial crimes and theft cases.',
      points: [
        'Assisted in 20 crime scene investigations.',
        'Worked with cloud forensics and evidence analysis.',
        'Developed analytical and investigative skills.',
        'Followed established forensic procedures.',
      ],
    },

    {
      number: '03',
      date: 'AUG 2024 — NOV 2024',
      role: 'Campus Catalyst Crew',
      company: 'CloudSEK',
      location: 'Bengaluru',
      description:
        'Contributed to cybersecurity-focused projects involving threat analysis, deepfake detection and spam detection.',
      points: [
        'Contributed to 3 cybersecurity projects.',
        'Worked on threat analysis and detection-oriented tasks.',
        'Strengthened knowledge of incident response.',
        'Developed risk mitigation, teamwork and communication skills.',
      ],
    },
  ];

  return (
    <section className="experience-section" id="experience">
      <div className="section-container">

        <motion.div
          className="section-top"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-number">04 / EXPERIENCE</span>
          <span className="section-line" />
          <span className="section-label">PROFESSIONAL JOURNEY</span>
        </motion.div>

        <motion.div
          className="experience-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p>WHERE I HAVE WORKED</p>

          <h2>
            EXPERIENCE
            <br />
            <span>&amp; IMPACT.</span>
          </h2>
        </motion.div>

        <div className="experience-list">

          {experiences.map((experience, index) => (
            <motion.article
              className="experience-item"
              key={experience.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
              }}
            >

              <div className="experience-number">
                {experience.number}
              </div>

              <div className="experience-date">
                {experience.date}
              </div>

              <div className="experience-main">

                <div className="experience-role">
                  <div>
                    <h3>{experience.role}</h3>

                    <div className="experience-company">
                      {experience.company}
                      <span> / </span>
                      {experience.location}
                    </div>
                  </div>

                  <BriefcaseBusiness
                    size={21}
                    strokeWidth={1.2}
                  />
                </div>

                <p className="experience-description">
                  {experience.description}
                </p>

                <ul className="experience-points">
                  {experience.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

              </div>

              <ArrowUpRight
                className="experience-arrow"
                size={18}
              />

            </motion.article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Experience;