
import React, { useState, useMemo } from 'react';
import { ResumeAnalysis, CandidateStatus } from '../types';

interface DashboardProps {
  candidates: ResumeAnalysis[];
  onSelect: (candidate: ResumeAnalysis) => void;
  onUpdateStatus: (id: string, status: CandidateStatus) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ candidates, onSelect, onUpdateStatus }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const stats = useMemo(() => {
    const total = candidates.length;
    const avg = total > 0 ? Math.round(candidates.reduce((acc, c) => acc + (c.matchScore || 0), 0) / total) : 0;
    const shortlisted = candidates.filter(c => c.status === 'APPROVED').length;
    const rejected = candidates.filter(c => c.status === 'REJECTED').length;
    return { total, avg, shortlisted, rejected };
  }, [candidates]);

  const filteredData = useMemo(() => {
    return candidates.filter(c => {
      const name = c.candidateName || '';
      const role = c.role || '';
      const score = c.matchScore || 0;
      
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === 'All' || 
                           (filter === 'High Fit' && score >= 80) ||
                           (filter === 'Medium Fit' && score >= 60 && score < 80) ||
                           (filter === 'Low Fit' && score < 60);
      return matchesSearch && matchesFilter;
    });
  }, [candidates, searchQuery, filter]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Candidates" value={stats.total} color="bg-indigo-600" icon="👥" />
        <StatCard title="Average Score" value={`${stats.avg}%`} color="bg-amber-500" icon="📈" />
        <StatCard title="Shortlisted" value={stats.shortlisted} color="bg-emerald-500" icon="✅" />
        <StatCard title="Rejected" value={stats.rejected} color="bg-rose-500" icon="❌" />
      </div>

      {/* Action Area: Search & Filter */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all"
          />
        </div>
        
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
        >
          <option>All</option>
          <option>High Fit</option>
          <option>Medium Fit</option>
          <option>Low Fit</option>
        </select>
      </div>

      {/* Candidate List Display */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Candidate</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Experience</th>
                <th className="px-8 py-5">Match Score</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.length > 0 ? (
                filteredData.map((candidate) => (
                  <tr key={candidate.id} className="group hover:bg-slate-50/80 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs shadow-sm">
                          {(candidate.candidateName || '?').split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="font-bold text-slate-900">{candidate.candidateName}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-medium text-slate-600">{candidate.role || 'Not Specified'}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-slate-500">{candidate.experienceYears ?? 'N/A'} Years</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-black ${
                          (candidate.matchScore || 0) >= 80 ? 'text-emerald-600' : 
                          (candidate.matchScore || 0) >= 60 ? 'text-amber-600' : 'text-rose-600'
                        }`}>
                          {candidate.matchScore || 0}%
                        </span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-700 ${
                              (candidate.matchScore || 0) >= 80 ? 'bg-emerald-500' : 
                              (candidate.matchScore || 0) >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${candidate.matchScore || 0}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => onSelect(candidate)}
                        className="bg-white border border-slate-200 text-slate-600 text-xs font-bold py-2.5 px-5 rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <div className="text-4xl mb-4">🔍</div>
                      <p className="font-bold uppercase tracking-widest text-xs">No matching candidates found</p>
                      <p className="text-sm mt-1 opacity-70">Try adjusting your search or click 'New Screening' to start.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, icon }: { title: string, value: string | number, color: string, icon: string }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-lg transition-all">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-100/20`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;
