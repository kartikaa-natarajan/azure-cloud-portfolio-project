import { motion } from 'framer-motion';
import {
  Cloud,
  Database,
  ShieldCheck,
  Workflow,
  Code2,
  Layers,
} from 'lucide-react';

function Skills() {
  const skillGroups = [
    {
      number: '01',
      icon: Cloud,
      title: 'Cloud & Infrastructure',
      description:
        'Cloud platforms, infrastructure concepts and scalable deployment environments.',
      skills: [
        'AWS',
        'Azure',
        'Cloud Infrastructure',
        'Virtual Machines',
        'Storage',
        'Networking',
      ],
    },

    {
      number: '02',
      icon: Workflow,
      title: 'DevOps & Automation',
      description:
        'Development workflows, automation and deployment practices for reliable delivery.',
      skills: [
        'Git',
        'GitHub',
        'CI/CD',
        'Jenkins',
        'Docker',
        'Linux',
      ],
    },

    {
      number: '03',
      icon: Code2,
      title: 'Development',
      description:
        'Programming and application development across backend and frontend technologies.',
      skills: [
        'Java',
        'Python',
        'JavaScript',
        'React',
        'Node.js',
        'REST APIs',
      ],
    },

    {
      number: '04',
      icon: Database,
      title: 'Data & Databases',
      description:
        'Working with structured data, databases and data processing workflows.',
      skills: [
        'SQL',
        'PostgreSQL',
        'MongoDB',
        'Data Processing',
        'Data Pipelines',
        'Database Design',
      ],
    },

    {
      number: '05',
      icon: ShieldCheck,
      title: 'Security',
      description:
        'Security fundamentals for applications, infrastructure and cloud environments.',
      skills: [
        'IAM',
        'Authentication',
        'Authorization',
        'Network Security',
        'Secure APIs',
        'Security Fundamentals',
      ],
    },

    {
      number: '06',
      icon: Layers,
      title: 'Tools & Platforms',
      description:
        'Modern developer and infrastructure tools used for building and managing systems.',
      skills: [
        'VS Code',
        'GitHub',
        'Docker',
        'Linux',
        'Postman',
        'Cloud Platforms',
      ],
    },
  ];

  return (
    <section className="skills-section" id="skills">

      <div className="section-container">

        <motion.div
          className="section-top"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-number">
            02 / SKILLS
          </span>

          <span className="section-line" />

          <span className="section-label">
            TECHNOLOGY STACK
          </span>
        </motion.div>


        <motion.div
          className="skills-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="skills-small-heading">
            WHAT I WORK WITH
          </p>

          <h2>
            TECHNICAL
            <br />
            <span>CAPABILITIES</span>
          </h2>
        </motion.div>


        <div className="skills-grid">

          {skillGroups.map((group, index) => {

            const Icon = group.icon;

            return (
              <motion.article
                className="skill-panel"
                key={group.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
              >

                <div className="skill-panel-header">

                  <span className="skill-panel-number">
                    {group.number}
                  </span>

                  <Icon
                    size={21}
                    strokeWidth={1.3}
                  />

                </div>


                <div className="skill-panel-content">

                  <h3>
                    {group.title}
                  </h3>

                  <p>
                    {group.description}
                  </p>

                </div>


                <div className="skill-list">

                  {group.skills.map((skill) => (
                    <span
                      className="skill-pill"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}

                </div>

              </motion.article>
            );
          })}

        </div>


        <motion.div
          className="skills-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <span>
            STACK / 2026
          </span>

          <p>
            Learning continuously.
            <span>
              Building practically.
            </span>
          </p>

        </motion.div>

      </div>

    </section>
  );
}

export default Skills;