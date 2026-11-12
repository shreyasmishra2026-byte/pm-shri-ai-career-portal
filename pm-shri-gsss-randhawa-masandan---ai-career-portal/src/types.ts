export interface AssessmentInput {
  fullName: string;
  classLevel: string;
  streamInterest: string;
  favoriteSubjects: string[];
  skills: string[];
  workStyle: string;
  careerGoal: string;
  locationPreference: string;
  studentNotes?: string;
}

export interface CareerRecommendation {
  title: string;
  streamRoadmap: string;
  degree: string;
  entranceExams: string;
  topInstitutes: string;
  startingSalary: string;
  matchScore: number;
  outlook: string;
  whyFit: string;
}

export interface StreamOption {
  streamName: string;
  suggestedElectives: string[];
  whyRecommended: string;
}

export interface ActionPlanItem {
  timeline: string;
  title: string;
  details: string;
}

export interface ScholarshipInfo {
  name: string;
  eligibility: string;
  benefit: string;
  portal: string;
}

export interface AssessmentResult {
  studentProfileSummary: string;
  topStreamsClass11_12: StreamOption[];
  recommendedCareers: CareerRecommendation[];
  actionPlan: ActionPlanItem[];
  scholarships: ScholarshipInfo[];
  schoolSupport: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface CareerItem {
  id: string;
  title: string;
  category: 'Science (PCM)' | 'Science (PCB)' | 'Commerce' | 'Humanities' | 'Defence & Law' | 'IT & AI' | 'Vocational & PM SHRI';
  streamReq: string;
  degrees: string[];
  entranceExams: string[];
  topColleges: string[];
  salaryRange: string;
  growthRating: 'Very High' | 'High' | 'Steady';
  shortDesc: string;
  keySkills: string[];
  dayInTheLife: string;
}
