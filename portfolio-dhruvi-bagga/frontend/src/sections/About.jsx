import { motion } from 'framer-motion';
import {
  Cloud,
  Database,
  ShieldCheck,
  Workflow,
  ArrowUpRight,
} from 'lucide-react';

function About() {
  const focusAreas = [
    {
      number: '01',
      icon: Cloud,
      title: 'Cloud Engineering',
      description:
        'Designing and deploying scalable cloud infrastructure with a focus on reliability, security and efficient resource management.',
    },
    {
      number: '02',
      icon: Workflow,
      title: 'DevOps',
      description:
        'Building automated development and deployment workflows using modern CI/CD, containerization and infrastructure practices.',
    },
    {
      number: '03',
      icon: ShieldCheck,
      title: 'Cybersecurity',
      description:
        'Understanding secure infrastructure, access control and security practices for protecting cloud-based systems.',
    },
    {
      number: '04',
      icon: Database,
      title: 'Data Engineering',
      description:
        'Working with data pipelines, processing workflows and cloud technologies to build dependable data systems.',
    },
  ];

  return (
    <section className="about-section" id="about">

      <div className="section-container">

        {/* Section Header */}
        <motion.div
          className="section-top"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-number">01 / ABOUT</span>

          <span className="section-line" />

          <span className="section-label">
            PROFILE
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          className="about-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="about-small-heading">
            WHO I AM
          </p>

          <h2>
            I BUILD
            <br />
            <span>SYSTEMS</span>
            <br />
            THAT SCALE.
          </h2>
        </motion.div>

        {/* About Content */}
        <div className="about-content">

          <motion.div
            className="about-intro"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-tag">
              <span />
              ABOUT ME
            </div>

            <p className="about-lead">
              I am an MCA student specializing in Storage & Cloud
              Technology, with a strong interest in cloud engineering,
              DevOps, cybersecurity and data engineering.
            </p>

            <p className="about-text">
              I enjoy understanding how modern applications are built,
              deployed and operated. My focus is on combining development
              fundamentals with cloud infrastructure and automation to
              create systems that are reliable, secure and scalable.
            </p>

            <p className="about-text">
              I am continuously building practical projects to strengthen
              my understanding of cloud platforms, deployment workflows,
              containerization, automation and modern infrastructure.
            </p>

            <a href="#projects" className="about-link">
              VIEW MY PROJECTS
              <ArrowUpRight size={15} />
            </a>
          </motion.div>

          {/* Focus Areas */}
          <motion.div
            className="focus-grid"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >

            {focusAreas.map((area) => {
              const Icon = area.icon;

              return (
                <div className="focus-card" key={area.number}>

                  <div className="focus-card-top">
                    <span className="focus-number">
                      {area.number}
                    </span>

                    <Icon size={20} strokeWidth={1.4} />
                  </div>

                  <div className="focus-card-content">
                    <h3>{area.title}</h3>

                    <p>
                      {area.description}
                    </p>
                  </div>

                  <div className="focus-card-arrow">
                    ↗
                  </div>

                </div>
              );
            })}

          </motion.div>

        </div>

        {/* Bottom Statement */}
        <motion.div
          className="about-statement"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="statement-mark">"</span>

          <p>
            BUILDING IS ONLY THE BEGINNING.
            <br />
            <span>MAKING IT RELIABLE IS THE GOAL.</span>
          </p>
        </motion.div>

      </div>

    </section>
  );
}

export default About;