export interface Chapter { id: string; ep: string; title: string; date: string; blurb: string; story: string; image?: string; accent: string }
// Dates and facts from the resume. Add personal colour to any "story" you like.
export const journey: Chapter[] = [
  { id: 'web', ep: 'E1', title: 'Web Foundations', date: 'Jul to Sep 2024', blurb: 'WordPress, HTML, CSS, JS.', story: 'As a Web Developer Intern at Travarsa Private Limited in Kolkata, I designed and deployed 5+ responsive WordPress sites and landing pages, added eCommerce integrations, cut average page load time by 25% and applied on-page SEO.', accent: '#f2a900' },
  { id: 'data', ep: 'E2', title: 'Data & First AI', date: 'Dec 2024 to Apr 2025', blurb: 'Power BI and resume screening.', story: 'Two Edunet Foundation internships: a Power BI dashboard and data cleaning, then an AI Resume Screening System with TF-IDF and cosine similarity, deployed on Streamlit.', accent: '#9b51e0' },
  { id: 'degree', ep: 'E3', title: 'Graduation & Cloud Masters', date: 'Jul to Sep 2025', blurb: 'BCA done, MCA begins.', story: 'Completed my BCA at Supreme Institute of Management and Technology (GPA 8.10), then moved to Bengaluru for an MCA in Storage & Cloud Technologies at Jain University. Network Architecture certification followed in September 2025.', image: '/img/about.jpg', accent: '#27ae60' },
  { id: 'aws', ep: 'E4', title: 'Into the Cloud', date: 'Mar 2026', blurb: 'AWS Academy Graduate.', story: 'Earned the AWS Academy Cloud Developing training badge and worked hands-on with EC2, S3, IAM, RDS, DynamoDB, VPC, SNS and SQS.', accent: '#ff9900' },
  { id: 'ibm', ep: 'E5', title: 'IBM & Applied AI', date: 'May to Jun 2026', blurb: 'watsonx.ai internships.', story: 'Two internships on IBM SkillBuild: a Predictive Maintenance AI Assistant on watsonx.ai, Watson Studio and Langflow, and a 6-week AI internship ending with an independent AI project.', accent: '#2d9cdb' },
  { id: 'eit', ep: 'E6', title: 'Enterprise AI', date: 'Jun to Sep 2026', blurb: 'Employee Ideation Tool at IFQM.', story: 'A full-stack AI-powered enterprise application for capturing and evaluating employee ideas, under the Sarvottam programme at IFQM.', accent: '#e50932' },
  { id: 'gogig', ep: 'E7', title: 'Software Developer', date: 'Aug 2026 to now', blurb: 'Joined gOGig.', story: 'Building full-stack AI and ML solutions deployed on AWS and CRM automation workflows with Google Apps Script.', accent: '#e50932' },
  { id: 'next', ep: 'E8', title: "What's Next", date: 'Expected Aug 2027', blurb: 'MCA graduation.', story: 'Finishing the MCA in Storage & Cloud Technologies while growing as a Cloud and AI engineer.', image: '/img/profile.jpg', accent: '#27ae60' },
]

// Artwork lives in /public/img/journey/<id>.svg
export const journeyImage = (c: Chapter) => `/img/journey/${c.id}.svg`
