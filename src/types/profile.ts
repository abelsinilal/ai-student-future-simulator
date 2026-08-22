export type ScoreType = 'cgpa' | 'percentage';

export interface StudentProfile {
  name: string;
  course: string;
  customCourse: string;
  currentYear: string;
  currentSemester: string;
  scoreType: ScoreType;
  scoreValue: string;
  technicalSkills: string[];
  areasOfInterest: string[];
  desiredCareer: string;
  learningTimePerDay: string;
  createdAt?: string;
}

export type Step = 'profile' | 'simulation' | 'future';

export const COURSE_OPTIONS = [
  'Computer Science & Engineering (CSE)',
  'Artificial Intelligence & Machine Learning (AIML)',
  'AI & Data Science (AIDS)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology (IT)',
  'Other',
];

export const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
];

export const SEMESTER_OPTIONS: Record<string, string[]> = {
  '1st Year': ['Semester 1', 'Semester 2'],
  '2nd Year': ['Semester 3', 'Semester 4'],
  '3rd Year': ['Semester 5', 'Semester 6'],
  '4th Year': ['Semester 7', 'Semester 8'],
};

export const DEFAULT_TECHNICAL_SKILLS = [
  'Python',
  'JavaScript',
  'Java',
  'C++',
  'C',
  'HTML/CSS',
  'SQL',
  'Machine Learning',
  'Data Science',
  'Web Development',
  'React',
  'Node.js',
  'Git / GitHub',
  'Docker',
];

export const DEFAULT_AREAS_OF_INTEREST = [
  'Artificial Intelligence',
  'Machine Learning',
  'Web Development',
  'App Development',
  'Cybersecurity',
  'Data Science',
  'Robotics',
  'Cloud Computing',
  'UI/UX Design',
  'Game Development',
  'DevOps & Systems',
  'Blockchain / Web3',
];

export const DESIRED_CAREER_OPTIONS = [
  'AI/ML Engineer',
  'Software Developer',
  'Data Scientist',
  'Data Analyst',
  'Cybersecurity Engineer',
  'Web Developer',
  'App Developer',
  'Cloud Engineer',
  'Robotics Engineer',
  'Entrepreneur / Tech Founder',
  'Not Sure Yet',
];

export interface LearningTimeOption {
  id: string;
  label: string;
  hours: string;
  description: string;
  badge: string;
}

export const LEARNING_TIME_OPTIONS: LearningTimeOption[] = [
  {
    id: '<1h',
    label: 'Less than 1 hour',
    hours: '< 1 hr',
    description: 'Casual & Light',
    badge: 'Relaxed',
  },
  {
    id: '1-2h',
    label: '1–2 hours',
    hours: '1–2 hrs',
    description: 'Steady Consistency',
    badge: 'Balanced',
  },
  {
    id: '2-3h',
    label: '2–3 hours',
    hours: '2–3 hrs',
    description: 'Focused Momentum',
    badge: 'Recommended',
  },
  {
    id: '3-5h',
    label: '3–5 hours',
    hours: '3–5 hrs',
    description: 'Intense Growth',
    badge: 'Accelerated',
  },
  {
    id: '5h+',
    label: '5+ hours',
    hours: '5+ hrs',
    description: 'Full Throttle',
    badge: 'Mastery',
  },
];

export const INITIAL_PROFILE: StudentProfile = {
  name: '',
  course: 'Computer Science & Engineering (CSE)',
  customCourse: '',
  currentYear: '2nd Year',
  currentSemester: 'Semester 3',
  scoreType: 'cgpa',
  scoreValue: '',
  technicalSkills: ['Python', 'SQL', 'Web Development'],
  areasOfInterest: ['Artificial Intelligence', 'Web Development'],
  desiredCareer: 'Software Developer',
  learningTimePerDay: '2–3 hours',
};

export const DEMO_PROFILES: Record<string, StudentProfile> = {
  ai_explorer: {
    name: 'Alex Chen',
    course: 'Artificial Intelligence & Machine Learning (AIML)',
    customCourse: '',
    currentYear: '3rd Year',
    currentSemester: 'Semester 5',
    scoreType: 'cgpa',
    scoreValue: '8.85',
    technicalSkills: ['Python', 'Machine Learning', 'Data Science', 'SQL', 'Git / GitHub'],
    areasOfInterest: ['Artificial Intelligence', 'Machine Learning', 'Robotics', 'Cloud Computing'],
    desiredCareer: 'AI/ML Engineer',
    learningTimePerDay: '3–5 hours',
  },
  web_builder: {
    name: 'Sarah Miller',
    course: 'Computer Science & Engineering (CSE)',
    customCourse: '',
    currentYear: '2nd Year',
    currentSemester: 'Semester 4',
    scoreType: 'percentage',
    scoreValue: '84.5',
    technicalSkills: ['JavaScript', 'React', 'HTML/CSS', 'Node.js', 'SQL'],
    areasOfInterest: ['Web Development', 'UI/UX Design', 'Cloud Computing'],
    desiredCareer: 'Software Developer',
    learningTimePerDay: '2–3 hours',
  },
  exploring: {
    name: 'Rohan Sharma',
    course: 'Electronics & Communication (ECE)',
    customCourse: '',
    currentYear: '1st Year',
    currentSemester: 'Semester 2',
    scoreType: 'cgpa',
    scoreValue: '7.9',
    technicalSkills: ['C', 'Python'],
    areasOfInterest: ['Cybersecurity', 'Robotics', 'Artificial Intelligence'],
    desiredCareer: 'Not Sure Yet',
    learningTimePerDay: '1–2 hours',
  },
};
