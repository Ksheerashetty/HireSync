
export interface RadarMetric {
  subject: string;
  score: number;
  fullMark: number;
}

export type CandidateStatus = 'PENDING' | 'APPROVED' | 'HOLD' | 'REJECTED';

export interface ResumeAnalysis {
  id: string;
  candidateName: string;
  role?: string; // Target role or current role
  matchScore: number;
  radarData: RadarMetric[];
  matchingSkills: string[];
  missingSkills: string[];
  explanation: string;
  thoughtProcess: string;
  timestamp: number;
  status: CandidateStatus;
  experienceYears?: number;
}

export interface AnalysisResponse {
  candidateName: string;
  role?: string;
  matchScore: number;
  radarData: RadarMetric[];
  matchingSkills: string[];
  missingSkills: string[];
  explanation: string;
  thoughtProcess: string;
  experienceYears?: number;
}

export type Step = 'INPUT' | 'PARSING' | 'ANALYZING' | 'OVERVIEW' | 'DETAIL';
