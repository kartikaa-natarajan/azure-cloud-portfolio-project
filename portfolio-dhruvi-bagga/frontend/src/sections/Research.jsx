import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';

function Research() {
  const research = [
    {
      number: '01',
      title: 'Multitenancy in Cloud Forensics (AWS)',
      publication: 'MethodsX',
      description:
        'Studied forensic investigation challenges in AWS-based multi-tenant cloud environments, focusing on secure evidence collection, isolation and data integrity.',
      topics: [
        'AWS',
        'Cloud Forensics',
        'Evidence Collection',
        'Data Integrity',
      ],
      link: 'https://doi.org/10.1016/j.mex.2026.104075',
    },

    {
      number: '02',
      title: 'CyberJain – Digital Technology Use and Wellbeing Framework',
      publication: 'Research Work',
      description:
        'Proposed a framework focused on digital wellbeing and safe online practices through secure technology usage, cybersecurity awareness and digital risk mitigation.',
      topics: [
        'Cybersecurity',
        'Digital Wellbeing',
        'Risk Mitigation',
        'Secure Technology',
      ],
      link: 'https://malque.pub/ojs/index.php/hj/article/view/14222',
    },
  ];

  return (
    <section className="research-section" id="research">

      <div className="section-container">

        <motion.div
          className="section-top"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-number">07 / RESEARCH</span>
          <span className="section-line" />
          <span className="section-label">RESEARCH &amp; PUBLICATIONS</span>
        </motion.div>

        <motion.div
          className="research-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p>EXPLORING BEYOND DEVELOPMENT</p>

          <h2>
            RESEARCH
            <br />
            <span>&amp; DISCOVERY.</span>
          </h2>
        </motion.div>

        <div className="research-list">

          {research.map((item, index) => (
            <motion.article
              className="research-card"
              key={item.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: index * 0.12,
              }}
            >

              <div className="research-number">
                {item.number}
              </div>

              <div className="research-icon">
                <BookOpen
                  size={24}
                  strokeWidth={1.2}
                />
              </div>

              <div className="research-main">

                <span>{item.publication}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="research-tags">
                  {item.topics.map((topic) => (
                    <span key={topic}>{topic}</span>
                  ))}
                </div>

              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="research-link"
              >
                READ
                <ArrowUpRight size={16} />
              </a>

            </motion.article>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Research;