export interface SkillGroup { title: string; note: string; items: string[]; learning?: boolean }
// Source: resume "Technical Skills" and "AWS Hands-on Experience", plus HTML, CSS and React added by the owner.
export const skillGroups: SkillGroup[] = [
  { title: 'Programming Languages', note: 'Frontend, backend and data.', items: ['HTML', 'CSS', 'JavaScript', 'Python', 'React', 'Java', 'SQL'] },
  { title: 'Core Focus', note: 'Where I spend most of my time.', items: ['AWS Cloud Services', 'AI & Machine Learning', 'Cloud Networking & Security', 'Python', 'Java', 'REST APIs & System Integration'] },
  { title: 'Cloud Technologies (AWS)', note: 'Provisioned, configured and secured.', items: ['EC2', 'S3', 'VPC', 'IAM', 'RDS', 'DynamoDB', 'SNS', 'SQS', 'CloudShell', 'Cloud Security Fundamentals'] },
  { title: 'AI & Machine Learning', note: 'From classic models to RAG.', items: ['Machine Learning', 'NLP', 'Generative AI', 'Prompt Engineering', 'RAG', 'Classification Models', 'Random Forest', 'Logistic Regression', 'TF-IDF', 'Cosine Similarity', 'Sentiment Analysis'] },
  { title: 'AI & Data Science Tools', note: 'Building and shipping models.', items: ['IBM watsonx.ai', 'IBM Watson Studio', 'Langflow', 'Scikit-learn', 'Pandas', 'Jupyter Notebook', 'Streamlit', 'Power BI'] },
  { title: 'Web Development', note: 'Interfaces and integrations.', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap', 'WordPress', 'REST APIs', 'JSON'] },
  { title: 'Databases & Version Control', note: 'Data and collaboration.', items: ['MySQL', 'Oracle SQL', 'RDBMS', 'DBMS', 'Git', 'GitHub'] },
  { title: 'Systems & Concepts', note: 'The fundamentals.', items: ['Linux', 'Unix', 'Data Structures & Algorithms', 'Computer Networks', 'Operating Systems'] },
]
