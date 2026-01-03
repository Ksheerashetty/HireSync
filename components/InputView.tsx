
import React, { useState, useRef, useCallback } from 'react';

interface InputViewProps {
  onSubmit: (file: File, jd: string) => void;
  error: string | null;
}

const InputView: React.FC<InputViewProps> = ({ onSubmit, error }) => {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && jd.trim()) {
      onSubmit(file, jd);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Resume Screening Engine</h2>
        <p className="mt-2 text-slate-600">Securely parse resumes and rank candidates based on alignment with your job description.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-700">1. Candidate Resume (PDF)</label>
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 h-[300px] relative ${
              isDragging 
                ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-500/10 scale-[1.01]' 
                : file 
                  ? 'border-emerald-400 bg-emerald-50/30' 
                  : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf"
              onChange={handleFileChange}
            />
            {file ? (
              <>
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-900 truncate max-w-[240px]">{file.name}</p>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Ready for analysis • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button type="button" className="text-xs text-slate-400 font-bold hover:text-rose-500 transition-colors uppercase tracking-widest mt-2">Click to replace</button>
              </>
            ) : (
              <>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${isDragging ? 'bg-indigo-200' : 'bg-slate-100'}`}>
                  <svg className={`w-8 h-8 transition-colors ${isDragging ? 'text-indigo-600' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-900">{isDragging ? 'Drop it now!' : 'Drop resume here or click to upload'}</p>
                  <p className="text-xs text-slate-500 mt-1">Single PDF file up to 10MB</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-slate-700">2. Job Description</label>
          <div className="relative group">
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the target Job Description (JD) here..."
              className="w-full h-[300px] p-5 border rounded-xl bg-white resize-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-slate-800 placeholder:text-slate-300 leading-relaxed shadow-sm"
            ></textarea>
            <div className="absolute bottom-4 right-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest pointer-events-none group-focus-within:text-indigo-300 transition-colors">
              {jd.length > 0 ? `${jd.length} characters` : 'Input Required'}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col items-center pt-4">
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm flex items-center gap-3 animate-in shake duration-500">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={!file || !jd.trim()}
            className="group bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold py-4 px-16 rounded-xl transition-all shadow-xl shadow-indigo-200 hover:scale-[1.02] active:scale-95 flex items-center gap-3"
          >
            <span>Start AI Analysis</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <p className="mt-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Parsed locally • Processed by Gemini 3 Flash
          </p>
        </div>
      </form>
    </div>
  );
};

export default InputView;
