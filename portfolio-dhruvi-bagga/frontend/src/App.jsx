import { useState } from "react";
import "./App.css";
/* =========================================================
   DATA
========================================================= */

const projects = [
  {
    number: "01",
    category: "DATA ENGINEERING / CLOUD",
    name: "FinGuard",
    title: "REAL-TIME FRAUD DETECTION",
    description:
      "A real-time financial transaction streaming and fraud detection pipeline designed to process credit-card transactions and generate actionable fraud alerts.",
    details:
      "Built using Kafka, Azure Databricks and PySpark with Bronze–Silver–Gold processing, structured streaming, transaction monitoring and fraud detection workflows.",
    technologies: [
      "Python",
      "Kafka",
      "Azure Databricks",
      "PySpark",
      "PostgreSQL",
      "SQL",
    ],
    github:
      "https://github.com/dhruvi-2014/Finguard_streaming_project",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    accent: "green",
  },

  {
    number: "02",
    category: "BACKEND / SECURITY",
    name: "Auth-Core",
    title: "MODULAR AUTHENTICATION",
    description:
      "A modular authentication framework designed around secure authentication, authorization and session-management concepts.",
    details:
      "The framework focuses on role-based access control, attribute-based access control, secure sessions and reusable authentication components.",
    technologies: [
      "Java",
      "OOP",
      "RBAC",
      "ABAC",
      "REST",
      "Authentication",
    ],
    github: "https://github.com/dhruvi-2014/AuthCore",
    image:
      "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=1400&q=85",
    accent: "purple",
  },

  {
    number: "03",
    category: "CLOUD / DEVOPS / SECURITY",
    name: "EVIDA",
    title: "SECURE EVIDENCE CAPTURE",
    description:
      "An Android application designed for secure digital evidence capture, storage and integrity verification.",
    details:
      "Uses AES encryption, SHA-256 hashing and Room Database, supported by a CI/CD workflow using Jenkins and AWS for build, testing, APK generation and artifact storage.",
    technologies: [
      "Kotlin",
      "Android",
      "AES",
      "SHA-256",
      "Room",
      "Jenkins",
      "AWS",
    ],
    github: "https://github.com/EVIDA-Project",
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1400&q=85",
    accent: "cyan",
  },
];

const skills = [
  {
    number: "01",
    title: "Cloud Platforms",
    text:
      "AWS · EC2 · S3 · IAM · VPC · EBS · AMI · CloudWatch · Lambda · Azure Data Factory · Azure SQL",
    icon: "☁",
    accent: "cyan",
  },
  {
    number: "02",
    title: "DevOps & CI/CD",
    text:
      "Git · GitHub · Jenkins · CI/CD · Linux · Docker · Kubernetes (Basics)",
    icon: "↯",
    accent: "green",
  },
  {
    number: "03",
    title: "Programming",
    text: "Python · SQL · Java · C · Bash",
    icon: "</>",
    accent: "purple",
  },
  {
    number: "04",
    title: "Data Engineering",
    text:
      "ETL · Data Pipelines · Kafka · PySpark · Structured Streaming · Databricks",
    icon: "▦",
    accent: "orange",
  },
  {
    number: "05",
    title: "Networking",
    text:
      "TCP/IP · VPC · VPN · DNS · Wireshark · Cisco Packet Tracer · GNS3",
    icon: "⌁",
    accent: "cyan",
  },
  {
    number: "06",
    title: "Security",
    text: "IAM · AES · SHA-256 · EnCase · FTK · UFED · IDS/IPS",
    icon: "◇",
    accent: "purple",
  },
];

const experience = [
  {
    number: "01",
    date: "JUN 2026 — AUG 2026",
    role: "DATA ENGINEER INTERN",
    company: "J2D TECHNOLOGIES",
    location: "BENGALURU",
    description:
      "Developed a real-time financial transaction streaming pipeline using Kafka, Azure Databricks, Data Factory, PySpark and Structured Streaming.",
    second:
      "Built fraud detection and alerting workflows using transaction limits, fraud watchlists, joins, watermarks and sliding-window aggregations.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
    accent: "cyan",
  },
  {
    number: "02",
    date: "FEB 2025 — MAR 2025",
    role: "CRIME SCENE ANALYSIS",
    company: "BENGALURU POLICE",
    location: "BENGALURU",
    description:
      "Assisted in crime scene investigations, cloud forensics and evidence analysis across cybercrime, financial crimes and theft cases.",
    second:
      "Developed analytical, reporting and investigative skills while following forensic procedures.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85",
    accent: "purple",
  },
  {
    number: "03",
    date: "AUG 2024 — NOV 2024",
    role: "CAMPUS CATALYST CREW",
    company: "CLOUDSEK",
    location: "BENGALURU",
    description:
      "Contributed to cybersecurity projects involving threat analysis, deepfake detection and spam detection.",
    second:
      "Strengthened knowledge of incident response, risk mitigation, teamwork and communication.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
    accent: "green",
  },
];

const education = [
  {
    number: "01",
    period: "2025 — EXPECTED 2027",
    degree: "MCA",
    specialization: "STORAGE & CLOUD TECHNOLOGY",
    institution: "JAIN University, Bengaluru",
    score: "CGPA 9.9",
  },
  {
    number: "02",
    period: "2022 — 2025",
    degree: "BSc (Hons.)",
    specialization: "FORENSIC SCIENCE",
    institution: "JAIN University, Bengaluru",
    score: "",
  },
];

const certifications = [
  "AWS Certified Solutions Architect – Associate level",
  "Certified Fraud Examiner (CFE)",
  "AWS Developer Training",
  "DSA with C Language",
  "Google Cybersecurity Professional Certificate",
];

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function Arrow() {
  return <span className="arrow">↗</span>;
}

function SectionTitle({ number, label, first, second }) {
  return (
    <div className="section-title">
      <div className="section-eyebrow">
        <span>{number}</span>
        <span className="section-line"></span>
        <span>{label}</span>
      </div>

      <h2>
        {first}
        <br />
        <span>{second}</span>
      </h2>
    </div>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

function Navbar() {
  return (
    <header className="navbar">
      <a href="#home" className="brand">
        DB<span>.</span>
      </a>

      <nav>
        <a href="#about">ABOUT</a>
        <a href="#skills">SKILLS</a>
        <a href="#projects">PROJECTS</a>
        <a href="#experience">EXPERIENCE</a>
        <a href="#education">EDUCATION</a>
        <a href="#research">RESEARCH</a>
        <a href="#contact">CONTACT</a>
      </nav>

      <a
        className="nav-button"
        href="https://github.com/dhruvi-2014"
        target="_blank"
        rel="noreferrer"
      >
        GITHUB <Arrow />
      </a>
    </header>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-glow hero-glow-one"></div>
      <div className="hero-glow hero-glow-two"></div>
      <div className="hero-grid"></div>

      <div className="container hero-container">
        <div className="availability">
          <span className="status-dot"></span>
          AVAILABLE FOR OPPORTUNITIES
        </div>

        <div className="hero-categories">
          <span>CLOUD</span>
          <b>•</b>
          <span>DEVOPS</span>
          <b>•</b>
          <span>SECURITY</span>
          <b>•</b>
          <span>DATA</span>
        </div>

        <div className="hero-layout">
          <div className="hero-heading">
            <div className="small-label">01 / PORTFOLIO</div>

            <h1>
              <span>DHRUVI</span>
              <br />
              <span>BAGGA</span>
            </h1>

            <div className="hero-role">
              <span>STORAGE & CLOUD TECHNOLOGY</span>
              <span>01 — 04</span>
            </div>
          </div>

          <div className="hero-right">
            <div className="orb">
              <div className="orb-ring orb-ring-one"></div>
              <div className="orb-ring orb-ring-two"></div>
              <div className="orb-core"></div>

              <span className="orb-label orb-label-one">AWS</span>
              <span className="orb-label orb-label-two">AZURE</span>
              <span className="orb-label orb-label-three">DEVOPS</span>
            </div>

            <div className="terminal">
              <div className="terminal-bar">
                <div className="terminal-dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>

                <span>dhruvi@cloud</span>
              </div>

              <div className="terminal-body">
                <p>$ whoami</p>
                <strong>dhruvi-bagga</strong>

                <p>$ specialization</p>

                <span>Cloud Engineering</span>
                <span>DevOps</span>
                <span>Cybersecurity</span>
                <span>Data Engineering</span>

                <p>$ cloud.status</p>

                <strong className="terminal-green">
                  ● ALL SYSTEMS OPERATIONAL
                </strong>

                <p>$ _</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <div>
            <p>
              MCA student specializing in Storage & Cloud Technology,
              focused on building secure, scalable and reliable cloud
              systems.
            </p>

            <div className="hero-links">
              <a
                href="https://github.com/dhruvi-2014"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB <Arrow />
              </a>

              <a
                href="https://www.linkedin.com/in/dhruvi-bagga-63663737b"
                target="_blank"
                rel="noreferrer"
              >
                LINKEDIN <Arrow />
              </a>
            </div>
          </div>

          <div className="hero-metric">
            <span>FOCUS</span>
            <strong>CLOUD × DEVOPS</strong>
            <small>SECURITY × DATA</small>
          </div>
        </div>

        <a href="#about" className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <i></i>
          <b>↓</b>
        </a>
      </div>
    </section>
  );
}

/* =========================================================
   ABOUT
========================================================= */

function About() {
  const focusCards = [
    [
      "01",
      "Cloud Engineering",
      "Designing and deploying scalable cloud infrastructure with a focus on reliability, security and efficient resource management.",
      "☁",
    ],
    [
      "02",
      "DevOps",
      "Building automated development and deployment workflows using CI/CD, containerization and infrastructure practices.",
      "↯",
    ],
    [
      "03",
      "Cybersecurity",
      "Understanding secure infrastructure, access control and security practices for protecting cloud-based systems.",
      "◇",
    ],
    [
      "04",
      "Data Engineering",
      "Working with data pipelines, streaming workflows and cloud technologies to build dependable data systems.",
      "▦",
    ],
  ];

  return (
    <section className="section" id="about">
      <div className="container">
        <SectionTitle
          number="01 / ABOUT"
          label="PROFILE"
          first="I BUILD"
          second="SYSTEMS THAT SCALE."
        />

        <div className="about-layout">
          <div className="about-copy">
            <span className="mini-heading">WHO I AM</span>

            <p className="about-large">
              I'm an MCA student specializing in Storage & Cloud Technology
              with practical experience across cloud deployment, Linux, data
              engineering, security and CI/CD.
            </p>

            <p>
              I enjoy understanding how modern applications are built,
              deployed and operated. My focus is on combining development
              fundamentals with cloud infrastructure and automation to create
              systems that are reliable, secure and scalable.
            </p>

            <p>
              My work sits at the intersection of cloud engineering, DevOps,
              cybersecurity and data engineering.
            </p>

            <a href="#projects" className="text-link">
              VIEW MY PROJECTS <Arrow />
            </a>
          </div>

          <div className="focus-cards">
            {focusCards.map(([number, title, text, icon]) => (
              <div className="focus-card" key={number}>
                <div className="card-number">{number}</div>

                <div className="focus-icon">{icon}</div>

                <h3>{title}</h3>

                <p>{text}</p>

                <span className="card-arrow">↗</span>
              </div>
            ))}
          </div>
        </div>

        <div className="quote">
          <span>"</span>

          <div>
            <strong>BUILDING IS ONLY THE BEGINNING.</strong>
            <strong>MAKING IT RELIABLE IS THE GOAL.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SKILLS
========================================================= */

function Skills() {
  return (
    <section className="section dark-section" id="skills">
      <div className="container">
        <SectionTitle
          number="02 / SKILLS"
          label="TECHNICAL STACK"
          first="TECHNICAL"
          second="CAPABILITIES."
        />

        <div className="skills-grid">
          {skills.map((skill) => (
            <div
              className={`skill-card skill-${skill.accent}`}
              key={skill.number}
            >
              <div className="skill-top">
                <span>{skill.number}</span>
                <span>+</span>
              </div>

              <div className="skill-icon">{skill.icon}</div>

              <h3>{skill.title}</h3>

              <p>{skill.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROJECTS
========================================================= */

function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">
            <i></i>
            03 / PROJECTS
          </div>

          <h2>
            SELECTED <span>PROJECTS.</span>
          </h2>

          <p>
            ENGINEERING WORK ACROSS CLOUD, DATA, SECURITY AND DEVOPS.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article
              className={`project project-${project.accent}`}
              key={project.number}
            >
              <div className="project-art">
                <img
                  src={project.image}
                  alt={`${project.name} project`}
                />

                <div className="art-overlay"></div>
                <div className="art-grid"></div>

                <div className="art-center">
                  <strong>
                    {project.name === "FinGuard"
                      ? "FG"
                      : project.name === "Auth-Core"
                      ? "AC"
                      : "EV"}
                  </strong>

                  <span>SYSTEM / {project.number}</span>
                </div>

                <small>{project.number}</small>
              </div>

              <div className="project-body">
                <div className="project-meta">
                  <span>{project.number}</span>
                  <span>{project.category}</span>
                </div>

                <h3>{project.name}</h3>

                <h4>{project.title}</h4>

                <p className="project-lead">
                  {project.description}
                </p>

                <p>{project.details}</p>

                <div className="tags">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <a
                  className="project-link"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  VIEW ON GITHUB <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="statement">
          <span>"</span>

          <div>
            <strong>I DON'T JUST BUILD APPLICATIONS.</strong>
            <strong>I BUILD SYSTEMS THAT CAN BE TRUSTED.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE
========================================================= */

function Experience() {
  return (
    <section className="section dark-section" id="experience">
      <div className="container">
        <SectionTitle
          number="04 / EXPERIENCE"
          label="PRACTICAL WORK"
          first="WORK"
          second="EXPERIENCE."
        />

        <div className="experience-list">
          {experience.map((item) => (
            <article
              className={`experience-item experience-${item.accent}`}
              key={item.number}
            >
              <div className="experience-date">{item.date}</div>

              <div className="experience-number">{item.number}</div>

              <div className="experience-content">
                <span className="experience-location">
                  {item.location}
                </span>

                <h3>{item.role}</h3>

                <h4>{item.company}</h4>

                <p>{item.description}</p>

                <p>{item.second}</p>
              </div>

              <div className="experience-image">
                <img
                  src={item.image}
                  alt={`${item.company} experience`}
                />

                <div className="experience-image-overlay"></div>

                <span>FIELD / {item.number}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   EDUCATION
========================================================= */

function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <SectionTitle
          number="05 / EDUCATION"
          label="ACADEMIC BACKGROUND"
          first="EDUCATION"
          second="& LEARNING."
        />

        <div className="education-grid">
          {education.map((item) => (
            <article className="education-card" key={item.number}>
              <div className="education-number">{item.number}</div>

              <span>{item.period}</span>

              <h3>{item.degree}</h3>

              <h4>{item.specialization}</h4>

              <p>{item.institution}</p>

              {item.score && <strong>{item.score}</strong>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CERTIFICATIONS
========================================================= */

function Certifications() {
  return (
    <section className="section dark-section" id="certifications">
      <div className="container">
        <SectionTitle
          number="06 / CERTIFICATIONS"
          label="CREDENTIALS"
          first="CERTIFIED"
          second="FOUNDATIONS."
        />

        <div className="certifications">
          {certifications.map((certification, index) => (
            <div className="certification" key={certification}>
              <span>0{index + 1}</span>

              <strong>{certification}</strong>

              <Arrow />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   RESEARCH
========================================================= */

function Research() {
  return (
    <section className="section" id="research">
      <div className="container">
        <SectionTitle
          number="07 / RESEARCH"
          label="RESEARCH WORK"
          first="QUESTIONS"
          second="WORTH EXPLORING."
        />

        <div className="research-grid">
          <article className="research-card research-purple">
            <span>01 / DIGITAL WELLBEING</span>

            <h3>CyberJain</h3>

            <p>
              Digital Technology Use and Wellbeing Framework. Proposed a
              framework to improve digital wellbeing and promote safe online
              practices through secure technology usage.
            </p>

            <a
              href="https://malque.pub/ojs/index.php/hj/article/view/14222"
              target="_blank"
              rel="noreferrer"
            >
              READ RESEARCH <Arrow />
            </a>
          </article>

          <article className="research-card research-cyan">
            <span>02 / AWS CLOUD FORENSICS</span>

            <h3>Cloud Evidence Lifecycle Framework</h3>

            <p>
              A six-stage log-centric framework for multi-tenant AWS forensic
              investigations, focusing on evidence identification,
              preservation, collection, examination and attribution.
            </p>

            <a
              href="https://doi.org/10.1016/j.mex.2026.104075"
              target="_blank"
              rel="noreferrer"
            >
              VIEW PUBLICATION <Arrow />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   GITHUB
========================================================= */

function GitHub() {
  return (
    <section className="section dark-section" id="github">
      <div className="container">
        <SectionTitle
          number="08 / GITHUB"
          label="CODE / OPEN SOURCE"
          first="CODE"
          second="IN PUBLIC."
        />

        <div className="github-layout">
          <div className="github-intro">
            <div className="github-symbol">⌘</div>

            <h3>
              BUILDING.
              <br />
              EXPERIMENTING.
              <br />
              LEARNING.
            </h3>

            <p>
              Practical work across cloud engineering, DevOps, security,
              backend development and data engineering.
            </p>

            <a
              href="https://github.com/dhruvi-2014"
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              VISIT GITHUB <Arrow />
            </a>
          </div>

          <div className="repositories">
            {projects.map((project) => (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="repository"
                key={project.name}
              >
                <span>{project.number}</span>

                <div>
                  <small>{project.category}</small>
                  <strong>{project.name}</strong>
                </div>

                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   RESUME
========================================================= */

function Resume() {
  const resumePath = "/Dhruvi%20Paresh%20Bagga.pdf";

  return (
    <section className="section" id="resume">
      <div className="container">
        <div className="resume-box">
          <div>
            <span>09 / RESUME</span>

            <h2>
              THE FULL
              <br />
              <em>PROFILE.</em>
            </h2>

            <p>
              Cloud, DevOps, data engineering, cybersecurity, projects,
              education and certifications.
            </p>
          </div>

          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            VIEW RESUME <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
========================================================= */

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("SENDING...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("MESSAGE SENT SUCCESSFULLY.");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus(data.message || "FAILED TO SEND MESSAGE.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("SERVER CONNECTION FAILED.");
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <SectionTitle
          number="10 / CONTACT"
          label="START A CONVERSATION"
          first="LET'S BUILD"
          second="SOMETHING USEFUL."
        />

        <div className="contact-layout">
          <div>
            <p className="contact-large">
              Interested in cloud engineering, DevOps, security or data
              engineering opportunities? Let's connect.
            </p>

            <span className="contact-location">
              BENGALURU / INDIA
            </span>
          </div>

          <div className="contact-links">

            {/* CONTACT FORM */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="YOUR EMAIL"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="YOUR MESSAGE"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button type="submit" className="contact-submit">
                <span>SEND MESSAGE</span>
                <Arrow />
              </button>

              {status && <p className="contact-status">{status}</p>}
            </form>

            {/* SOCIAL / CONTACT LINKS */}
            <a href="mailto:baggadhruvi2515@gmail.com">
              <span>EMAIL</span>
              <strong>baggadhruvi2515@gmail.com</strong>
              <Arrow />
            </a>

            <a
              href="https://www.linkedin.com/in/dhruvi-bagga-63663737b"
              target="_blank"
              rel="noreferrer"
            >
              <span>LINKEDIN</span>
              <strong>/in/dhruvi-bagga</strong>
              <Arrow />
            </a>

            <a
              href="https://github.com/dhruvi-2014"
              target="_blank"
              rel="noreferrer"
            >
              <span>GITHUB</span>
              <strong>/dhruvi-2014</strong>
              <Arrow />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  return (
    <footer>
      <span>
        DB<span className="footer-dot">.</span>
      </span>

      <p>BUILDING SYSTEMS THAT CAN BE TRUSTED.</p>

      <a href="#home">BACK TO TOP ↑</a>
    </footer>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Research />
        <GitHub />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;