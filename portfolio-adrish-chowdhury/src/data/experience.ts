export type Kind = 'Professional' | 'Internship' | 'Education' | 'Certification'
// `sort` is YYYYMM of the start date (or award date). The timeline shows newest first.
export interface Entry { id: string; kind: Kind; title: string; org: string; period: string; sort: number; summary: string; points: string[]; tags: string[] }
// Source: Adrish_Resume_Updated.pdf
export const entries: Entry[] = [
  { id: 'gogig', kind: 'Professional', title: 'Software Developer', org: 'gOGig · On-site, HSR Layout, Bengaluru', period: '08/2026 to Present', sort: 202608, summary: 'Building AI and cloud software for a live product team.',
    points: ['Building full-stack AI and ML software solutions and deploying them on AWS cloud', 'Developing CRM automation workflows using Google Apps Script, with Git for version control', 'Automation, end-to-end software solutions, system design, core software architecture and API integration'], tags: ['AWS', 'AI/ML', 'Google Apps Script', 'Git'] },
  { id: 'ifqm', kind: 'Internship', title: 'Fullstack AI Intern', org: 'Indian Foundation for Quality Management (IFQM) · On-site, Bengaluru', period: '06/2026 to 09/2026', sort: 202606, summary: 'Enterprise AI application work under the Sarvottam programme.',
    points: ['Built and delivered the Employee Ideation Tool (EIT), a full-stack AI-powered enterprise app for capturing, managing and evaluating employee ideas at scale', 'Full-stack application development, AI integration, backend and frontend development, database management, system testing and deployment', 'Program: Sarvottam, Jain University. Mentor: Dr. S. Nagarajan'], tags: ['Full-stack', 'AI integration', 'Databases'] },
  { id: 'c-passport', kind: 'Certification', title: 'AI Skills Passport', org: 'Microsoft', period: 'Jun 2026', sort: 202606, summary: '', points: [], tags: [] },
  { id: 'c-rag', kind: 'Certification', title: 'Introduction to Retrieval-Augmented Generation', org: 'IBM SkillsBuild', period: 'Jun 2026', sort: 202606, summary: '', points: [], tags: [] },
  { id: 'ibm-cloud', kind: 'Internship', title: 'AI & Cloud Intern', org: 'IBM SkillBuild on AI & Cloud · Remote', period: '05/2026 to 06/2026', sort: 202605, summary: 'Predictive maintenance on IBM watsonx.ai.',
    points: ['Built a Predictive Maintenance AI Assistant using IBM watsonx.ai, Watson Studio, Langflow and a Random Forest classifier to predict machine failures from industrial sensor data', 'Implemented multi-class failure detection across 6 failure types with an NLP-based conversational input pipeline via Langflow extracting structured JSON for ML processing', 'Program: AICTE'], tags: ['watsonx.ai', 'Langflow', 'Random Forest'] },
  { id: 'edunet-ai-2', kind: 'Internship', title: 'Artificial Intelligence Intern', org: 'Edunet Foundation · Remote', period: '05/2026 to 06/2026', sort: 202605, summary: '6-week AI internship on IBM SkillsBuild.',
    points: ['Completed a 6-week AI internship on the IBM SkillsBuild platform with applied AI concepts, project-based learning and industry-led masterclasses', 'Delivered an independent AI project and presentation as the Week 6 final deliverable, under an assigned mentor', 'Program: IBM SkillsBuild, AICTE'], tags: ['AI', 'IBM SkillsBuild'] },
  { id: 'c-cloud', kind: 'Certification', title: 'Journey to Cloud: Envisioning Your Solution', org: 'IBM', period: 'May 2026', sort: 202605, summary: '', points: [], tags: [] },
  { id: 'c-ai-start', kind: 'Certification', title: 'Getting Started with Artificial Intelligence', org: 'IBM', period: 'May 2026', sort: 202605, summary: '', points: [], tags: [] },
  { id: 'c-ai-fund', kind: 'Certification', title: 'Artificial Intelligence Fundamentals', org: 'IBM', period: 'May 2026', sort: 202605, summary: '', points: [], tags: [] },
  { id: 'c-cyber', kind: 'Certification', title: 'Getting Started with Cybersecurity', org: 'IBM', period: 'May 2026', sort: 202605, summary: '', points: [], tags: [] },
  { id: 'c-aws', kind: 'Certification', title: 'AWS Academy Graduate: Cloud Developing Training Badge', org: 'Amazon Web Services', period: 'Mar 2026', sort: 202603, summary: '', points: [], tags: [] },
  { id: 'c-network', kind: 'Certification', title: 'Network Architecture', org: 'Jain (Deemed-to-be University)', period: 'Sep 2025', sort: 202509, summary: '', points: [], tags: [] },
  { id: 'mca', kind: 'Education', title: 'Masters in Computer Application: Storage and Cloud Technology', org: 'Jain Deemed To Be University · Bengaluru, Karnataka', period: 'In progress · expected 08/2027', sort: 202508, summary: 'GPA: 8.3', points: ['Specialisation in Storage & Cloud Technologies'], tags: ['Cloud', 'Storage'] },
  { id: 'bca', kind: 'Education', title: 'Bachelor in Computer Application', org: 'Supreme Institute of Management and Technology · Hooghly, West Bengal', period: 'Graduated 07/2025', sort: 202507, summary: 'GPA: 8.10', points: [], tags: [] },
  { id: 'edunet-ai-1', kind: 'Internship', title: 'Artificial Intelligence Intern', org: 'Edunet Foundation · Remote', period: '02/2025 to 04/2025', sort: 202502, summary: 'Resume screening with NLP.',
    points: ['Built an AI-powered Resume Screening System using Python, NLP, Scikit-learn, Jupyter, Pandas and Streamlit, reducing manual screening effort by 70% across 500+ resumes', 'Engineered TF-IDF vectorization and a cosine similarity pipeline achieving 85%+ keyword match accuracy in resume parsing', 'Deployed an interactive Streamlit app for recruiters to upload job descriptions and get ranked candidate shortlists', 'Program: Microsoft/SAP CSR'], tags: ['Python', 'NLP', 'Streamlit'] },
  { id: 'edunet-data', kind: 'Internship', title: 'Data Analytics Intern', org: 'Edunet Foundation · Remote', period: '12/2024 to 01/2025', sort: 202412, summary: 'Dashboards and data cleaning.',
    points: ['Designed and published a Power BI dashboard integrating 3 data sources for real-time KPI tracking in weekly business reporting', 'Cleaned and preprocessed 10,000+ rows of raw data, improving data accuracy by 40%', 'Program: Shell and AICTE'], tags: ['Power BI', 'Data cleaning'] },
  { id: 'travarsa', kind: 'Internship', title: 'Web Developer Intern', org: 'Travarsa Private Limited · Kolkata, West Bengal', period: '07/2024 to 09/2024', sort: 202407, summary: 'WordPress sites and SEO.',
    points: ['Designed and deployed 5+ responsive WordPress websites and landing pages using HTML, CSS, JavaScript and Bootstrap, serving 1,000+ monthly visitors', 'Implemented eCommerce integrations and performance optimisations, reducing average page load time by 25%', 'Applied on-page SEO best practices improving organic search rankings for 3 client websites'], tags: ['WordPress', 'HTML/CSS/JS', 'SEO'] },
]

// Headline numbers from the resume, shown in the Credits side panel.
export const highlights = [
  { to: 70, suffix: '%', label: 'Manual screening effort cut across 500+ resumes' },
  { to: 25, suffix: '%', label: 'Faster average page load at Travarsa' },
]

export const orgs = ['gOGig', 'IFQM', 'IBM', 'AWS Academy', 'Microsoft', 'Edunet Foundation', 'Jain University', 'Travarsa']
