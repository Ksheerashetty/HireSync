
import React from 'react';
import { Step } from '../types';

interface ProcessingViewProps {
  step: Step;
}

const ProcessingView: React.FC<ProcessingViewProps> = ({ step }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full animate-in fade-in duration-700">
      <div className="relative">
        <div className="w-32 h-32 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-indigo-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center max-w-sm">
        <h3 className="text-2xl font-bold text-slate-900">
          {step === 'PARSING' ? 'Extracting Resume Data' : 'AI Analysis in Progress'}
        </h3>
        <p className="mt-3 text-slate-600">
          {step === 'PARSING' 
            ? "We're converting your PDF document into machine-readable text..." 
            : "Gemini 3 is comparing skills, experience, and certifications against the requirements..."}
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-4">
          <div className={`w-3 h-3 rounded-full ${step === 'PARSING' ? 'bg-indigo-600 animate-bounce' : 'bg-emerald-500'}`}></div>
          <div className={`w-3 h-3 rounded-full ${step === 'ANALYZING' ? 'bg-indigo-600 animate-bounce' : step === 'PARSING' ? 'bg-slate-200' : 'bg-emerald-500'}`}></div>
          <div className="w-3 h-3 rounded-full bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingView;
