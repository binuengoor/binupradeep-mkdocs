// Single source of truth for the homepage "Experience"/"Certifications" sections and /resume/.
// Contact details (address, phone, personal email) are intentionally NOT included.

export const summary =
  'Project Manager and Business Analyst with 10+ years in healthcare data analysis, project management and product development. I gather and document business requirements, lead cross-functional teams and deliver data-driven solutions, using SQL and Tableau to support informed decisions. Strong background in healthcare systems and agile delivery.';

export const experience = [
  {
    title: 'Project Manager / Senior Business Systems Analyst',
    period: '2018 – Present',
    context: 'Healthcare payer client · Philadelphia, PA',
    teams: [
      {
        name: 'Provider Engagement Analytics & Reporting',
        points: [
          'Managed a migration project integrating multiple APIs into the provider portal.',
          'Served as hybrid Scrum Master and Senior Business Systems Analyst; coached the team on scrum and cleared impediments across business, technical and infrastructure teams.',
          'Captured, prioritized and documented business requirements and functional specifications with stakeholders and SMEs.',
          'Ran requirements testing across Dev, Test, QA and Production data-warehouse environments and led user acceptance testing.',
        ],
        tools: 'Azure DevOps, Jira, Figma, SQL, Postman',
      },
      {
        name: 'Business Intelligence Solutions',
        points: [
          'Acted as product owner and lead business systems analyst, owning and prioritizing requirements across the feature lifecycle.',
          'Designed and oversaw the development of Tableau dashboards for different business needs.',
          'Worked with stakeholders to turn business pain points into product solutions, from UI/UX in Figma through development and testing.',
        ],
        tools: 'SQL, Teradata, Tableau, Figma',
      },
    ],
  },
  {
    title: 'Business Systems Analyst (Senior, Technical)',
    period: '2014 – 2018',
    context: 'Healthcare payers and a national pharmacy retailer',
    teams: [
      {
        name: '',
        points: [
          'Defined project scope and documented business requirements and functional/technical specifications for healthcare and retail pharmacy programs.',
          'Mapped as-is processes and produced UML system flow diagrams to turn pain points into high-level requirements.',
          'Guided a retail pharmacy implementation through client acceptance testing, post-launch support and webcast training.',
          'Prepared test data and test plans with QA, and ran UAT for successful implementation.',
        ],
        tools: 'SQL, Teradata, MS Visio, Adobe Photoshop',
      },
    ],
  },
];

export const certifications = [
  { name: 'Project Management Professional (PMP)®', issued: 'May 2021', short: 'PMP®', featured: true },
  { name: 'Professional Scrum Master™ I', issued: 'May 2021', short: 'PSM I', featured: true },
  { name: 'Professional Scrum Product Owner™ I', issued: 'May 2021', short: 'PSPO I', featured: true },
  { name: 'Certified SAFe® Agilist', issued: 'Jun 2020', short: 'SAFe® Agilist', featured: true },
  { name: 'Certified SAFe® Practitioner', issued: 'Apr 2021', short: 'SAFe® Practitioner', featured: false },
  { name: 'AWS Certified Cloud Practitioner', issued: 'Jan 2023', short: 'AWS Cloud Practitioner', featured: true },
  { name: 'Microsoft Certified: Identity and Access Administrator Associate', issued: 'Oct 2022', short: 'Microsoft IAM Admin', featured: false },
  { name: 'Microsoft Certified: Azure Data Scientist Associate', issued: 'Jun 2021', short: 'Azure Data Scientist', featured: false },
  { name: 'Microsoft Certified: Data Analyst Associate', issued: 'Nov 2020', short: 'Microsoft Data Analyst', featured: true },
  { name: 'Tableau Desktop Specialist', issued: 'May 2020', short: 'Tableau Desktop', featured: true },
];

export const education = [
  { degree: 'M.S., Global Marketing', school: 'Virginia Commonwealth University, Richmond, VA', period: '2013 – 2014', note: 'GPA 3.70 / 4.00' },
  { degree: 'MBA, Marketing', school: 'Christ University, India', period: '2012 – 2014', note: '' },
  { degree: 'B.Tech, Mechanical Engineering', school: 'Calicut University, India', period: '2008 – 2012', note: '' },
];

export const skills = [
  ['Delivery & agile', 'Project management, Scrum, SAFe, requirements, UAT, Azure DevOps, Jira'],
  ['Data & analytics', 'SQL (MS-SQL, MySQL, PostgreSQL, MariaDB), Teradata, BigQuery, Tableau, Power BI'],
  ['Design & documentation', 'Figma, Adobe Photoshop, MS Visio, UML, MS Office'],
  ['Programming', 'C, C++'],
];

export const links = {
  credly: 'https://www.credly.com/users/binu-engoor-pradeep/badges',
  tableau: 'https://public.tableau.com/app/profile/binu.pradeep',
  linkedin: 'https://www.linkedin.com/in/binuepradeep/',
  github: 'https://github.com/binuengoor',
  email: 'contact@binupradeep.com',
};
