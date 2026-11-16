import { motion } from 'framer-motion';
import { ArrowUpRight, GitBranch, Activity, Star } from 'lucide-react';

function GitHub() {
  return (
    <section className="github-section" id="github">

      <div className="section-container">

        {/* SECTION HEADER */}
        <motion.div
          className="section-top"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-number">
            08 / GITHUB
          </span>

          <span className="section-line" />

          <span className="section-label">
            CODE / OPEN SOURCE
          </span>
        </motion.div>


        {/* HEADING */}
        <motion.div
          className="github-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <p className="section-eyebrow">
            ENGINEERING ACTIVITY
          </p>

          <h2>
            CODE
            <br />
            <span>IN PUBLIC.</span>
          </h2>

        </motion.div>


        {/* CONTENT */}
        <div className="github-layout">

          {/* LEFT */}
          <motion.div
            className="github-intro"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <div className="github-icon-box">
              <GitBranch size={28} strokeWidth={1.4} />
            </div>

            <h3>
              Building,
              <br />
              experimenting,
              <br />
              learning.
            </h3>

            <p>
              My GitHub contains practical projects across cloud
              engineering, DevOps, security, backend development
              and data engineering.
            </p>

            <a
              href="https://github.com/dhruvi-2014"
              target="_blank"
              rel="noreferrer"
              className="github-main-link"
            >
              VISIT GITHUB
              <ArrowUpRight size={16} />
            </a>

          </motion.div>


          {/* RIGHT */}
          <motion.div
            className="github-stats"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <div className="github-stat-card">

              <div className="github-stat-top">
                <GitBranch size={20} />
                <span>REPOSITORIES</span>
              </div>

              <strong>PROJECTS</strong>

              <p>
                Cloud, DevOps, backend and security-focused work.
              </p>

            </div>


            <div className="github-stat-card">

              <div className="github-stat-top">
                <Activity size={20} />
                <span>FOCUS</span>
              </div>

              <strong>CLOUD + DEVOPS</strong>

              <p>
                Infrastructure, automation, CI/CD and reliable
                deployment workflows.
              </p>

            </div>


            <div className="github-stat-card">

              <div className="github-stat-top">
                <Star size={20} />
                <span>FEATURED WORK</span>
              </div>

              <strong>FINGUARD</strong>

              <p>
                Real-time fraud detection and streaming analytics
                using Kafka, Databricks and PySpark.
              </p>

            </div>

          </motion.div>

        </div>


        {/* REPOSITORY STRIP */}
        <motion.div
          className="github-repositories"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <a
            href="https://github.com/dhruvi-2014/Finguard_streaming_project"
            target="_blank"
            rel="noreferrer"
            className="github-repository"
          >
            <div>
              <span>01</span>
              <strong>FinGuard</strong>
            </div>

            <ArrowUpRight size={18} />
          </a>


          <a
            href="https://github.com/dhruvi-2014/AuthCore"
            target="_blank"
            rel="noreferrer"
            className="github-repository"
          >
            <div>
              <span>02</span>
              <strong>Auth-Core</strong>
            </div>

            <ArrowUpRight size={18} />
          </a>


          <a
            href="https://github.com/EVIDA-Project"
            target="_blank"
            rel="noreferrer"
            className="github-repository"
          >
            <div>
              <span>03</span>
              <strong>EVIDA</strong>
            </div>

            <ArrowUpRight size={18} />
          </a>

        </motion.div>


        {/* FOOTER */}
        <div className="github-footer">
          <span>
            SOURCE / GITHUB
          </span>

          <span>
            DHruvi-2014 ↗
          </span>
        </div>

      </div>

    </section>
  );
}

export default GitHub;