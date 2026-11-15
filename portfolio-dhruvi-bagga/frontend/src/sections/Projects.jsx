import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  GitBranch,
  ShieldCheck,
  Database,
  LockKeyhole,
} from 'lucide-react';

function Projects() {
  const projects = [
    {
      number: '01',
      category: 'DATA ENGINEERING / CLOUD',
      title: 'FinGuard',
      subtitle: 'REAL-TIME FRAUD DETECTION PIPELINE',

      description:
        'A real-time financial transaction streaming and fraud detection system designed to process credit-card transactions, identify suspicious activity and generate actionable fraud alerts.',

      details:
        'Built around streaming data pipelines with Kafka, Azure Databricks, Data Factory and PySpark, with real-time monitoring and fraud detection workflows.',

      technologies: [
        'Apache Kafka',
        'Azure Databricks',
        'Azure Data Factory',
        'PySpark',
        'Structured Streaming',
        'Delta Lake',
      ],

      icon: Database,

      status: 'DATA ENGINEERING',

      github: 'https://github.com/dhruvi-2014/Finguard_streaming_project',

      featured: true,
    },

    {
      number: '02',
      category: 'BACKEND / SECURITY',
      title: 'Auth-Core',
      subtitle: 'MODULAR AUTHENTICATION FRAMEWORK',

      description:
        'A modular authentication framework designed around secure authentication, authorization and session-management concepts.',

      details:
        'The framework focuses on role-based and attribute-based access control together with secure session management and reusable authentication components.',

      technologies: [
        'Java',
        'OOP',
        'REST',
        'RBAC',
        'ABAC',
        'Authentication',
      ],

      icon: LockKeyhole,

      status: 'IN DEVELOPMENT',

      github: 'https://github.com/dhruvi-2014/AuthCore',

      featured: false,
    },

    {
      number: '03',
      category: 'CLOUD / DEVOPS / SECURITY',
      title: 'EVIDA',
      subtitle: 'SECURE EVIDENCE CAPTURE SYSTEM',

      description:
        'An Android application designed for secure digital evidence capture, storage and integrity verification.',

      details:
        'The system uses AES encryption, SHA-256 hashing and Room Database for secure evidence handling, supported by an automated CI/CD workflow using Jenkins, AWS and Terraform.',

      technologies: [
        'Kotlin',
        'Android',
        'AES',
        'SHA-256',
        'Room Database',
        'Jenkins',
        'AWS',
        'Terraform',
      ],

      icon: ShieldCheck,

      status: 'COMPLETED',

      github: 'https://github.com/EVIDA-Project',

      featured: false,
    },
  ];

  return (
    <section className="projects-section" id="projects">

      <div className="section-container">

        {/* SECTION HEADER */}

        <motion.div
          className="section-top"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-number">
            03 / PROJECTS
          </span>

          <span className="section-line" />

          <span className="section-label">
            SELECTED ENGINEERING WORK
          </span>
        </motion.div>


        {/* MAIN HEADING */}

        <motion.div
          className="projects-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="projects-small-heading">
            SYSTEMS I HAVE BUILT
          </p>

          <h2>
            SELECTED
            <br />
            <span>PROJECTS.</span>
          </h2>
        </motion.div>


        {/* PROJECTS */}

        <div className="projects-list">

          {projects.map((project, index) => {

            const Icon = project.icon;

            return (
              <motion.article
                className={`project-card ${
                  project.featured ? 'project-featured' : ''
                }`}
                key={project.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
              >

                {/* VISUAL SIDE */}

                <div className="project-visual">

                  <div className="project-grid" />

                  <div className="project-visual-content">

                    <Icon
                      size={70}
                      strokeWidth={0.8}
                    />

                    <span>
                      SYSTEM / {project.number}
                    </span>

                  </div>

                  <div className="project-visual-number">
                    {project.number}
                  </div>

                  <div className="project-corner">
                    ↗
                  </div>

                </div>


                {/* INFORMATION SIDE */}

                <div className="project-info">

                  <div className="project-info-top">

                    <span className="project-number">
                      {project.number}
                    </span>

                    <span className="project-category">
                      {project.category}
                    </span>

                    <span className="project-status">
                      ● {project.status}
                    </span>

                  </div>


                  <h3>
                    {project.title}
                  </h3>


                  <div className="project-subtitle">
                    {project.subtitle}
                  </div>


                  <p className="project-description">
                    {project.description}
                  </p>


                  <p className="project-details-text">
                    {project.details}
                  </p>


                  {/* TECHNOLOGIES */}

                  <div className="project-technologies">

                    {project.technologies.map((technology) => (

                      <span key={technology}>
                        {technology}
                      </span>

                    ))}

                  </div>


                  {/* LINKS */}

                  <div className="project-links">

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GitBranch size={15} />
                      GITHUB
                      <ArrowUpRight size={14} />
                    </a>

                    <a
                      href="#contact"
                      className="project-case-study"
                    >
                      VIEW CASE STUDY
                      <ArrowUpRight size={14} />
                    </a>

                  </div>

                </div>

              </motion.article>
            );
          })}

        </div>


        {/* PROJECT PHILOSOPHY */}

        <motion.div
          className="projects-statement"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >

          <span className="projects-quote-mark">
            "
          </span>

          <div>

            <p>
              I DON'T JUST BUILD APPLICATIONS.
            </p>

            <p className="outline-text">
              I BUILD SYSTEMS THAT CAN BE TRUSTED.
            </p>

          </div>

        </motion.div>


        {/* FOOTER */}

        <motion.div
          className="projects-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <span>
            03 — PROJECT ARCHIVE
          </span>

          <p>
            THREE CORE PROJECTS
            <ArrowUpRight size={14} />
          </p>

        </motion.div>

      </div>

    </section>
  );
}

export default Projects;