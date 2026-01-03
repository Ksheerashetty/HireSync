
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeAnalysis, CandidateStatus } from '../types';

const MOCK_CANDIDATES: ResumeAnalysis[] = [
  {
    id: 'CAND-001',
    candidateName: 'Alex Rivera',
    role: 'Senior Frontend Engineer',
    matchScore: 92,
    experienceYears: 8,
    status: 'APPROVED',
    timestamp: Date.now() - 3600000,
    matchingSkills: ['React', 'TypeScript', 'Tailwind CSS', 'System Design'],
    missingSkills: ['AWS Lambda'],
    explanation: 'Highly qualified with extensive React experience and strong architectural knowledge.',
    thoughtProcess: 'Candidate has 8 years of relevant experience. Match score is high due to skill alignment.',
    radarData: [
      { subject: 'Technical', score: 95, fullMark: 100 },
      { subject: 'Soft Skills', score: 85, fullMark: 100 },
      { subject: 'Experience', score: 90, fullMark: 100 },
      { subject: 'Education', score: 80, fullMark: 100 },
      { subject: 'Certifications', score: 70, fullMark: 100 }
    ]
  },
  {
    id: 'CAND-002',
    candidateName: 'Sarah Chen',
    role: 'Full Stack Developer',
    matchScore: 78,
    experienceYears: 5,
    status: 'HOLD',
    timestamp: Date.now() - 7200000,
    matchingSkills: ['Node.js', 'PostgreSQL', 'React', 'Docker'],
    missingSkills: ['GraphQL', 'Kubernetes'],
    explanation: 'Strong full-stack profile with good backend fundamentals.',
    thoughtProcess: 'Solid experience in core tech stack. Missing some advanced orchestration skills.',
    radarData: [
      { subject: 'Technical', score: 75, fullMark: 100 },
      { subject: 'Soft Skills', score: 80, fullMark: 100 },
      { subject: 'Experience', score: 75, fullMark: 100 },
      { subject: 'Education', score: 85, fullMark: 100 },
      { subject: 'Certifications', score: 60, fullMark: 100 }
    ]
  },
  {
    id: 'CAND-003',
    candidateName: 'James Wilson',
    role: 'Backend Engineer',
    matchScore: 45,
    experienceYears: 3,
    status: 'REJECTED',
    timestamp: Date.now() - 10800000,
    matchingSkills: ['Python', 'SQL'],
    missingSkills: ['Go', 'Microservices', 'Distributed Systems'],
    explanation: 'Experience is too junior for the current requirements.',
    thoughtProcess: 'Mismatch in required years of experience and core backend languages.',
    radarData: [
      { subject: 'Technical', score: 40, fullMark: 100 },
      { subject: 'Soft Skills', score: 60, fullMark: 100 },
      { subject: 'Experience', score: 40, fullMark: 100 },
      { subject: 'Education', score: 70, fullMark: 100 },
      { subject: 'Certifications', score: 30, fullMark: 100 }
    ]
  }
];

interface CandidateContextType {
  history: ResumeAnalysis[];
  addAnalysis: (analysis: ResumeAnalysis) => void;
  updateStatus: (id: string, status: CandidateStatus) => void;
  getAnalysis: (id: string) => ResumeAnalysis | undefined;
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export const CandidateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<ResumeAnalysis[]>(MOCK_CANDIDATES);

  const addAnalysis = (analysis: ResumeAnalysis) => {
    setHistory((prev) => [analysis, ...prev]);
  };

  const updateStatus = (id: string, status: CandidateStatus) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const getAnalysis = (id: string) => {
    return history.find((a) => a.id === id);
  };

  return (
    <CandidateContext.Provider value={{ history, addAnalysis, updateStatus, getAnalysis }}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidates = () => {
  const context = useContext(CandidateContext);
  if (!context) {
    throw new Error('useCandidates must be used within a CandidateProvider');
  }
  return context;
};
