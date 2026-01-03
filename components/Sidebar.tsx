
import React from 'react';
import { ResumeAnalysis, Step } from '../types';

interface SidebarProps {
  history: ResumeAnalysis[];
  onSelect: (a: ResumeAnalysis) => void;
  onNew: () => void;
  onOverview: () => void;
  activeId?: string;
  currentStep: Step;
}

const Sidebar: React.FC<SidebarProps> = ({ history, onSelect, onNew, onOverview, activeId, currentStep }) => {
  return (
    <aside className="w-72 bg-slate-900 h-full hidden lg:flex flex-col text-slate-300">
      <div className="p-6 space-y-3">
        <button 
          onClick={onNew}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          New Screening
        </button>
        
        <button 
          onClick={onOverview}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
            currentStep === 'OVERVIEW' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/40'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Main Dashboard
        </button>
      </div>

      <div className="px-6 mb-2">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Recent Candidates</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-1 pb-4">
        {history.length === 0 ? (
          <div className="px-4 py-4 text-xs text-slate-500 italic">No candidates processed yet.</div>
        ) : (
          history.map(item => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={`w-full text-left px-4 py-4 rounded-xl transition-all group ${
                activeId === item.id ? 'bg-indigo-600/10 border-indigo-500/20 text-white' : 'hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="font-bold truncate text-sm">{item.candidateName}</div>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                  item.matchScore >= 80 ? 'text-emerald-400 bg-emerald-400/10' :
                  item.matchScore >= 60 ? 'text-amber-400 bg-amber-400/10' : 'text-rose-400 bg-rose-400/10'
                }`}>
                  {item.matchScore}%
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  {new Date(item.timestamp).toLocaleDateString()}
                </span>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  item.status === 'APPROVED' ? 'bg-emerald-500' :
                  item.status === 'HOLD' ? 'bg-amber-500' :
                  item.status === 'REJECTED' ? 'bg-rose-500' : 'bg-slate-500'
                }`}></div>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="p-6 border-t border-slate-800 text-[10px] font-bold text-slate-600 uppercase tracking-widest text-center">
        HireSync System v2.1
      </div>
    </aside>
  );
};

export default Sidebar;
