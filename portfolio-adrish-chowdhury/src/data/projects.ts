export interface Project {
  id: string; title: string; category: string; year: string; date: string; status: string
  tagline: string; overview: string; image?: string; accent: string
  problem: string; goals: string[]; stack: string[]; features: string[]
  implementation: string; results: string; lessons: string
  repo?: string; demo?: string
}
// Facts come from the resume. "To be added" fields are honest placeholders, never invented results.
const TBA = 'To be added. Fill this in src/data/projects.ts.'
export const projects: Project[] = [
  {
    id: 'eit', title: 'Employee Ideation Tool', category: 'Enterprise AI', year: '2026', date: 'Jun to Sep 2026', status: 'Completed',
    tagline: 'AI-powered enterprise app for employee ideas.', accent: '#e50932',
    overview: 'Employee Ideation Tool (EIT) is a full-stack, AI-powered enterprise application for capturing, managing and evaluating employee ideas at scale. Built during my Fullstack AI internship at the Indian Foundation for Quality Management (IFQM).',
    problem: 'Organisations collect many employee ideas but struggle to capture, manage and evaluate them consistently.',
    goals: ['Capture and manage employee ideas', 'Evaluate ideas with AI-driven workflows', 'Support enterprise-scale usage'],
    stack: ['Python', 'REST APIs', 'Database systems', 'AI integration'],
    features: ['Idea capture and management', 'AI-driven evaluation workflows'],
    implementation: 'Work spans backend and frontend development, AI integration, database management, system testing and deployment.',
    results: 'Completed in September 2026. No measured outcomes published yet.', lessons: TBA,
  },
  {
    id: 'predictive-maintenance', title: 'Predictive Maintenance AI Assistant', category: 'Machine Learning', year: '2026', date: 'May to Jun 2026', status: 'Completed',
    tagline: 'Predicting machine failures from sensor data.', accent: '#2d9cdb',
    overview: 'A predictive maintenance assistant built on IBM watsonx.ai, Watson Studio and Langflow, using a Random Forest classifier to predict machine failures from industrial sensor data. Built during the IBM SkillBuild AI & Cloud internship.',
    problem: 'Industrial machines fail in different ways, and failures are cheaper to prevent when predicted from sensor data.',
    goals: ['Predict machine failures from sensor data', 'Detect multiple failure types', 'Offer a conversational interface'],
    stack: ['IBM watsonx.ai', 'Watson Studio', 'Langflow', 'Random Forest', 'NLP'],
    features: ['Multi-class failure detection across 6 failure types', 'NLP-based conversational input via Langflow extracting structured JSON for ML processing'],
    implementation: 'Random Forest classifier trained on a Kaggle industrial sensor dataset (10,000 samples, 6 failure classes) and deployed via Langflow and IBM watsonx.ai on Watson Studio.',
    results: 'Trained on 10,000 samples across 6 failure classes. No accuracy figure published.', lessons: TBA,
  },
  {
    id: 'resume-screening', title: 'AI Resume Screening System', category: 'NLP', year: '2025', date: 'Feb to Apr 2025', status: 'Completed',
    tagline: 'Ranked candidate shortlists from job descriptions.', accent: '#9b51e0',
    overview: 'An AI-powered system for automated resume ranking, built during my Edunet Foundation internship (Microsoft/SAP CSR program).',
    problem: 'Manually screening hundreds of resumes takes recruiters a lot of time.',
    goals: ['Parse resumes automatically', 'Match them to job descriptions', 'Give recruiters instant ranked shortlists'],
    stack: ['Python', 'NLP', 'Scikit-learn', 'Pandas', 'Jupyter', 'Streamlit', 'TF-IDF'],
    features: ['TF-IDF vectorization and cosine similarity pipeline', 'Interactive Streamlit app for uploading job descriptions', 'Instant ranked candidate shortlists'],
    implementation: 'Resume parsing with TF-IDF vectorization and cosine similarity, deployed as an interactive Streamlit web app.',
    results: 'Reduced manual screening effort by 70% across 500+ resumes, with 85%+ keyword match accuracy in resume parsing (as reported in my resume).', lessons: TBA,
  },
  {
    id: 'study-planner', title: 'Autonomous ML Study Planner', category: 'Machine Learning', year: '', date: 'Date to be added', status: 'Project',
    tagline: 'Hybrid GNN + RL for personalised study plans.', accent: '#27ae60',
    overview: 'An autonomous, machine-learning-based study planner using a hybrid GNN and reinforcement learning model for personalised study planning.',
    problem: 'Study plans are usually generic and do not adapt to the learner.',
    goals: ['Personalise study planning', 'Plan autonomously'], stack: ['GNN', 'Reinforcement learning'],
    features: ['Hybrid GNN + RL model', 'Personalised autonomous planning'],
    implementation: TBA, results: TBA, lessons: TBA,
  },
  {
    id: 'lexi-sence', title: 'LEXI SENCE', category: 'NLP', year: '', date: 'Date to be added', status: 'Project',
    tagline: 'Sentiment analysis for feedback.', accent: '#f2a900',
    overview: 'An NLP-based sentiment analysis system for processing and classifying feedback data.',
    problem: 'Feedback arrives as free text that is slow to read and classify by hand.',
    goals: ['Process feedback data', 'Classify sentiment'], stack: ['NLP', 'Sentiment analysis'],
    features: ['Feedback processing', 'Sentiment classification'],
    implementation: TBA, results: TBA, lessons: TBA,
  },
]

// Artwork lives in /public/img/projects/<id>.svg. Drop in your own screenshot by setting `image` on a project.
// TODO: add `repo: 'https://github.com/adrish-chowdhury/<repo>'` and `demo: 'https://...'` to each project above.
export const projectImage = (p: Project) => p.image ?? `/img/projects/${p.id}.svg`
