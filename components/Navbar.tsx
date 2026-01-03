
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isNewScreening = location.pathname === '/new-screening';

  return (
    <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
          <span className="text-white font-black text-xl italic">H</span>
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">HireSync AI</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Intelligent Talent Engine</p>
        </div>
      </Link>
      
      <div className="flex items-center gap-6">
        {!isNewScreening && (
          <Link 
            to="/new-screening"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-xl shadow-indigo-100 flex items-center gap-2 group active:scale-95"
          >
            <span className="text-xl leading-none">+</span>
            <span>New Screening</span>
          </Link>
        )}
        <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
        <div className="hidden md:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Ready</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
