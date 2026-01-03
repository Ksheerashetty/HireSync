
import React, { useMemo, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { ResumeAnalysis, CandidateStatus } from '../types';

interface DashboardOverviewProps {
  candidates: ResumeAnalysis[];
  onSelect: (a: ResumeAnalysis) => void;
  onUpdateStatus: (id: string, status: CandidateStatus) => void;
  onStartNew: () => void;
}

type ViewMode = 'CARDS' | 'TABLE';

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ candidates, onSelect, onUpdateStatus, onStartNew }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('CARDS');
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [skillFilter, setSkillFilter] = useState('');

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchesSearch = c.candidateName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesScore = c.matchScore >= minScore;
      const matchesSkill = skillFilter === '' || 
        c.matchingSkills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()));
      return matchesSearch && matchesScore && matchesSkill;
    });
  }, [candidates, searchQuery, minScore, skillFilter]);

  const stats = useMemo(() => {
    const total = candidates.length;
    const approved = candidates.filter(c => c.status === 'APPROVED').length;
    const avgScore = total > 0 ? Math.round(candidates.reduce((acc, curr) => acc + curr.matchScore, 0) / total) : 0;
    
    return { total, approved, avgScore };
  }, [candidates]);

  if (candidates.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Pipeline Empty</h3>
        <p className="text-slate-500 mt-2 mb-8 max-w-sm">Upload a resume and job description to start the AI screening process.</p>
        <button 
          onClick={onStartNew}
          className="bg-indigo-600 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
        >
          Begin New Analysis
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700 pb-20">
      {/* Premium Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard label="Total Resumes" value={stats.total.toString()} icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />} color="indigo" />
        <StatsCard label="Avg Match Score" value={`${stats.avgScore}%`} icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />} color="amber" />
        <StatsCard label="Shortlisted" value={stats.approved.toString()} icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />} color="emerald" />
        <StatsCard label="Success Rate" value={`${stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%`} icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />} color="slate" />
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col xl:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search candidates by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-6 w-full xl:w-auto">
          <div className="flex flex-col min-w-[140px] flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Min Match Score</span>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{minScore}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={minScore}
              onChange={(e) => setMinScore(parseInt(e.target.value))}
              className="accent-indigo-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="h-10 w-px bg-slate-100 hidden md:block"></div>

          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
            <button 
              onClick={() => setViewMode('CARDS')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'CARDS' ? 'bg-white shadow-md text-indigo-600 scale-105' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              📇 Cards
            </button>
            <button 
              onClick={() => setViewMode('TABLE')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'TABLE' ? 'bg-white shadow-md text-indigo-600 scale-105' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              📊 Table
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'CARDS' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCandidates.map(c => (
            <CandidateCard key={c.id} candidate={c} onSelect={() => onSelect(c)} onStatusUpdate={(s) => onUpdateStatus(c.id, s)} />
          ))}
          {filteredCandidates.length === 0 && (
             <div className="col-span-full py-24 text-center bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold uppercase tracking-widest">No matching candidates found</p>
                <p className="text-slate-300 text-sm mt-1">Try adjusting your filters or search query.</p>
             </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in fade-in zoom-in-95">
          <div className="p-8 border-b flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Ranked Results</h3>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full">Showing {filteredCandidates.length} Candidates</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-8 py-5">Candidate</th>
                  <th className="px-8 py-5">Exp</th>
                  <th className="px-8 py-5">Score</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-indigo-50/20 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-[10px] font-black text-indigo-700 shadow-sm transition-transform group-hover:scale-110">
                          {c.candidateName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => onSelect(c)}>
                            {c.candidateName}
                          </div>
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">ID: {c.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-600">{c.experienceYears ?? '0'} Years</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-black ${c.matchScore >= 80 ? 'text-emerald-600' : c.matchScore >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                          {c.matchScore}%
                        </span>
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className={`h-full transition-all duration-1000 ${c.matchScore >= 80 ? 'bg-emerald-500' : c.matchScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${c.matchScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onUpdateStatus(c.id, 'APPROVED'); }}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${c.status === 'APPROVED' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-50 text-slate-400 hover:text-emerald-600 border border-slate-100'}`}
                        >
                          ✓
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onUpdateStatus(c.id, 'REJECTED'); }}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${c.status === 'REJECTED' ? 'bg-rose-500 text-white shadow-lg shadow-rose-100' : 'bg-slate-50 text-slate-400 hover:text-rose-600 border border-slate-100'}`}
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const CandidateCard = ({ candidate, onSelect, onStatusUpdate }: { candidate: ResumeAnalysis, onSelect: () => void, onStatusUpdate: (s: CandidateStatus) => void }) => {
  const isHighFit = candidate.matchScore >= 80;
  const isMediumFit = candidate.matchScore >= 60;
  
  const scoreStyles = isHighFit 
    ? { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', label: 'High Fit' }
    : isMediumFit 
      ? { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', label: 'Medium Fit' }
      : { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100', label: 'Low Fit' };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group flex flex-col relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] -mr-12 -mt-12 rounded-full ${isHighFit ? 'bg-emerald-500' : isMediumFit ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
      
      <div className="flex justify-between items-start mb-6 relative">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-[1.25rem] flex items-center justify-center text-slate-900 font-black shadow-inner transition-transform group-hover:rotate-6">
             {candidate.candidateName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors cursor-pointer" onClick={onSelect}>
              {candidate.candidateName}
            </h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">ID: {candidate.id}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1.5 rounded-2xl border ${scoreStyles.bg} ${scoreStyles.border} ${scoreStyles.text} flex flex-col items-center`}>
          <span className="text-xl font-black leading-none">{candidate.matchScore}%</span>
          <span className="text-[8px] font-black uppercase tracking-tighter mt-1">{scoreStyles.label}</span>
        </div>
      </div>
      
      <div className="flex-1 space-y-6">
        <div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Professional Core</span>
          <div className="flex flex-wrap gap-2">
            {candidate.matchingSkills.slice(0, 5).map((skill, i) => (
              <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-100 group-hover:bg-white group-hover:border-indigo-100 transition-colors">
                {skill}
              </span>
            ))}
            {candidate.matchingSkills.length > 5 && (
              <span className="px-3 py-1.5 text-xs font-bold text-slate-300">+{candidate.matchingSkills.length - 5}</span>
            )}
          </div>
        </div>

        <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Experience Alignment</span>
            <span className="text-xs font-bold text-slate-800">{candidate.experienceYears ?? '0'} Years</span>
          </div>
          <p className="text-xs text-slate-500 line-clamp-2 italic leading-relaxed">
            "{candidate.explanation}"
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-50">
        <div className="flex gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onStatusUpdate('APPROVED'); }}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${candidate.status === 'APPROVED' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-50 text-slate-400 hover:text-emerald-600 border border-slate-100'}`}
          >
            ✓
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onStatusUpdate('HOLD'); }}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${candidate.status === 'HOLD' ? 'bg-amber-500 text-white shadow-lg shadow-amber-200' : 'bg-slate-50 text-slate-400 hover:text-amber-600 border border-slate-100'}`}
          >
            ⏸
          </button>
        </div>
        
        <button 
          onClick={onSelect}
          className="bg-indigo-600 text-white text-xs font-bold py-3 px-6 rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-xl hover:translate-x-1 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const StatsCard = ({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) => {
  const colorMap: Record<string, string> = {
    indigo: 'bg-indigo-50 text-indigo-600',
    amber: 'bg-amber-50 text-amber-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    slate: 'bg-slate-50 text-slate-600'
  };

  return (
    <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group cursor-default relative overflow-hidden">
      <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-3 ${colorMap[color] || 'bg-slate-50'} shadow-inner`}>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export default DashboardOverview;
