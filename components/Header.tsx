
import React from 'react';

interface HeaderProps {
  onShowArch: () => void;
  onHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowArch, onHome }) => {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8 shrink-0 relative z-10">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={onHome}>
        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
          <span className="text-white font-black text-xl italic">H</span>
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">HireSync AI</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Intelligent Talent Engine</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={onShowArch}
          className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          Architecture
        </button>
        <div className="h-6 w-px bg-slate-200"></div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Ready</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
