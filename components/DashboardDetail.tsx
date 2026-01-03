
import React from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar 
} from 'recharts';
import { ResumeAnalysis, CandidateStatus } from '../types';

interface DashboardDetailProps {
  analysis: ResumeAnalysis;
  onReset: () => void;
  onBack: () => void;
  onUpdateStatus: (s: CandidateStatus) => void;
}

const DashboardDetail: React.FC<DashboardDetailProps> = ({ analysis, onReset, onBack, onUpdateStatus }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500 pb-20">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-indigo-100 text-indigo-700">Deep Analysis</span>
              <span className="text-slate-400 text-xs">{new Date(analysis.timestamp).toLocaleString()}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {analysis.candidateName}
            </h2>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 mr-2">
            <StatusToggle active={analysis.status === 'APPROVED'} color="emerald" label="Approve" onClick={() => onUpdateStatus('APPROVED')} />
            <StatusToggle active={analysis.status === 'HOLD'} color="amber" label="Hold" onClick={() => onUpdateStatus('HOLD')} />
            <StatusToggle active={analysis.status === 'REJECTED'} color="rose" label="Reject" onClick={() => onUpdateStatus('REJECTED')} />
          </div>
          <button 
            onClick={onReset}
            className="bg-indigo-600 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2"
          >
            New Scan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Radar Metrics */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-8 border shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Competency Matrix</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={analysis.radarData || []}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <Radar
                  name="Candidate"
                  dataKey="score"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <div className={`text-5xl font-black ${getScoreColor(analysis.matchScore)}`}>
              {analysis.matchScore}<span className="text-2xl opacity-50">%</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Weighted Alignment</p>
          </div>
        </div>

        {/* Executive Summary & Thought Process */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-8 border shadow-sm relative overflow-hidden">
             <div className={`absolute top-0 right-0 w-2 h-full ${analysis.matchScore >= 80 ? 'bg-emerald-500' : analysis.matchScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              Executive Verdict
            </h3>
            <p className="text-slate-800 leading-relaxed text-xl font-bold italic">
              "{analysis.explanation}"
            </p>
            
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              <DetailMetric label="Fit Status" value={analysis.matchScore >= 80 ? 'Exceptional' : analysis.matchScore >= 60 ? 'Qualified' : 'Mismatched'} icon="🎯" />
              <DetailMetric label="Est. Experience" value={`${analysis.experienceYears ?? 'N/A'} Years`} icon="📅" />
              <DetailMetric label="Status" value={analysis.status} icon="🏷️" />
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 shadow-xl relative overflow-hidden group border border-slate-800">
            <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Internal Reasoning Strategy
            </h3>
            <p className="text-indigo-100/70 text-sm font-mono leading-relaxed whitespace-pre-wrap">
              {analysis.thoughtProcess}
            </p>
          </div>
        </div>
      </div>

      {/* Skills Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SkillListCard title="Verified Strengths" list={analysis.matchingSkills} type="success" />
        <SkillListCard title="Candidate Gaps" list={analysis.missingSkills} type="danger" />
      </div>
    </div>
  );
};

const StatusToggle = ({ active, color, label, onClick }: { active: boolean, color: 'emerald' | 'amber' | 'rose', label: string, onClick: () => void }) => {
  const activeClasses = {
    emerald: 'bg-emerald-500 text-white shadow-lg shadow-emerald-200',
    amber: 'bg-amber-500 text-white shadow-lg shadow-amber-200',
    rose: 'bg-rose-500 text-white shadow-lg shadow-rose-200'
  };

  const inactiveClasses = {
    emerald: 'text-slate-500 hover:bg-white hover:text-emerald-600',
    amber: 'text-slate-500 hover:bg-white hover:text-amber-600',
    rose: 'text-slate-500 hover:bg-white hover:text-rose-600'
  };

  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
        active ? activeClasses[color] : inactiveClasses[color]
      }`}
    >
      {label}
    </button>
  );
};

const DetailMetric = ({ label, value, icon }: any) => (
  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-lg">{icon}</div>
    <div>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="font-bold text-slate-800 text-sm">{value}</p>
    </div>
  </div>
);

const SkillListCard = ({ title, list, type }: any) => {
  const isSuccess = type === 'success';
  return (
    <div className={`bg-white rounded-3xl p-8 border shadow-sm border-t-4 ${isSuccess ? 'border-t-emerald-500' : 'border-t-rose-500'}`}>
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSuccess ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isSuccess ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
            </svg>
          </div>
          {title}
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSuccess ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {(list || []).length}
        </span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {(list || []).map((item: string, i: number) => (
          <span key={i} className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${
            isSuccess 
              ? 'bg-emerald-50/30 text-emerald-700 border-emerald-100 hover:bg-emerald-50' 
              : 'bg-rose-50/30 text-rose-700 border-rose-100 hover:bg-rose-50'
          }`}>
            {item}
          </span>
        ))}
        {(!list || list.length === 0) && <p className="text-slate-400 text-sm italic">No data points identified.</p>}
      </div>
    </div>
  );
};

export default DashboardDetail;
