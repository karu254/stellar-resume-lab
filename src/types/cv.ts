export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  photo?: string;
}

export interface Summary {
  content: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link?: string;
  bullets: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface Volunteering {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date: string;
  link?: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: {
    id: string;
    content: string;
  }[];
}

export type SectionType =
  | 'personalInfo'
  | 'summary'
  | 'skills'
  | 'experience'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'achievements'
  | 'volunteering'
  | 'publications'
  | 'references'
  | 'custom';

export interface CVSection {
  id: string;
  type: SectionType;
  title: string;
  enabled: boolean;
  order: number;
}

export interface CVStyles {
  template: 'minimal' | 'two-column' | 'corporate';
  fontFamily: 'inter' | 'merriweather' | 'roboto' | 'lato' | 'opensans';
  fontSize: 'small' | 'medium' | 'large';
  accentColor: string;
  spacing: 'compact' | 'normal' | 'relaxed';
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: Summary;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  achievements: Achievement[];
  volunteering: Volunteering[];
  publications: Publication[];
  references: Reference[];
  customSections: CustomSection[];
  sections: CVSection[];
  styles: CVStyles;
}

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: 'John Anderson',
    jobTitle: 'Senior Software Engineer',
    email: 'john.anderson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johnanderson',
    github: 'github.com/johnanderson',
    portfolio: 'johnanderson.dev',
  },
  summary: {
    content: 'Results-driven software engineer with 8+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers. Led teams of 5-10 engineers to deliver products serving millions of users.',
  },
  skills: [
    { id: '1', name: 'React', category: 'Frontend' },
    { id: '2', name: 'TypeScript', category: 'Languages' },
    { id: '3', name: 'Node.js', category: 'Backend' },
    { id: '4', name: 'PostgreSQL', category: 'Database' },
    { id: '5', name: 'AWS', category: 'Cloud' },
    { id: '6', name: 'Docker', category: 'DevOps' },
    { id: '7', name: 'GraphQL', category: 'API' },
    { id: '8', name: 'Python', category: 'Languages' },
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2021-01',
      endDate: '',
      current: true,
      bullets: [
        'Led development of microservices architecture serving 2M+ daily active users',
        'Reduced API response times by 40% through database optimization and caching strategies',
        'Mentored team of 5 junior developers, conducting code reviews and pair programming sessions',
        'Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes',
      ],
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: '2018-06',
      endDate: '2020-12',
      current: false,
      bullets: [
        'Built React-based dashboard used by 500+ enterprise clients',
        'Developed RESTful APIs handling 100K+ requests per minute',
        'Collaborated with design team to improve UX, increasing user retention by 25%',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2012-09',
      endDate: '2016-05',
      gpa: '3.8',
      bullets: ['Magna Cum Laude', 'Teaching Assistant for Data Structures'],
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Open Source Analytics Dashboard',
      description: 'Real-time analytics platform for web applications',
      technologies: 'React, D3.js, Node.js, ClickHouse',
      link: 'github.com/johnanderson/analytics',
      bullets: [
        'Built open-source analytics tool with 2K+ GitHub stars',
        'Processes 1M+ events per day with sub-second query times',
      ],
    },
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Solutions Architect Professional',
      issuer: 'Amazon Web Services',
      date: '2023-03',
      link: '',
    },
  ],
  languages: [
    { id: '1', name: 'English', proficiency: 'Native' },
    { id: '2', name: 'Spanish', proficiency: 'Professional' },
  ],
  achievements: [
    {
      id: '1',
      title: 'Engineering Excellence Award',
      description: 'Recognized for outstanding contributions to platform reliability',
      date: '2023',
    },
  ],
  volunteering: [],
  publications: [],
  references: [],
  customSections: [],
  sections: [
    { id: 'personalInfo', type: 'personalInfo', title: 'Personal Info', enabled: true, order: 0 },
    { id: 'summary', type: 'summary', title: 'Professional Summary', enabled: true, order: 1 },
    { id: 'experience', type: 'experience', title: 'Work Experience', enabled: true, order: 2 },
    { id: 'education', type: 'education', title: 'Education', enabled: true, order: 3 },
    { id: 'skills', type: 'skills', title: 'Skills', enabled: true, order: 4 },
    { id: 'projects', type: 'projects', title: 'Projects', enabled: true, order: 5 },
    { id: 'certifications', type: 'certifications', title: 'Certifications', enabled: true, order: 6 },
    { id: 'languages', type: 'languages', title: 'Languages', enabled: true, order: 7 },
    { id: 'achievements', type: 'achievements', title: 'Achievements', enabled: false, order: 8 },
    { id: 'volunteering', type: 'volunteering', title: 'Volunteering', enabled: false, order: 9 },
    { id: 'publications', type: 'publications', title: 'Publications', enabled: false, order: 10 },
    { id: 'references', type: 'references', title: 'References', enabled: false, order: 11 },
  ],
  styles: {
    template: 'minimal',
    fontFamily: 'inter',
    fontSize: 'medium',
    accentColor: '#3b82f6',
    spacing: 'normal',
  },
};
