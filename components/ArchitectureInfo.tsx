
import React from 'react';

interface ArchitectureInfoProps {
  onClose: () => void;
}

const ArchitectureInfo: React.FC<ArchitectureInfoProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-slate-900 mb-8">System Architecture & Scalability</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">1</div>
                Async Data Pipelines
              </h3>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                <p className="text-sm text-slate-600 font-medium">To handle thousands of resumes:</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="bg-slate-200 px-2 py-1 rounded font-mono">STEP 1</span>
                    <span className="text-slate-700">S3 Presigned URL Upload</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="bg-slate-200 px-2 py-1 rounded font-mono">STEP 2</span>
                    <span className="text-slate-700">BullMQ Job Dispatch (Redis)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="bg-slate-200 px-2 py-1 rounded font-mono">STEP 3</span>
                    <span className="text-slate-700">Worker Node Analysis via Gemini</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="bg-slate-200 px-2 py-1 rounded font-mono">STEP 4</span>
                    <span className="text-slate-700">Socket.io Broadcast to Client</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-emerald-600 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">2</div>
                Prompt Engineering (CoT)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We use <strong>Chain of Thought (CoT)</strong> prompting. The model is forced to write out its reasoning steps 
                before reaching a final score. This significantly reduces hallucinations and provides "explainability" 
                for why a specific match percentage was given.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Cost Optimization Matrix</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Volume</th>
                    <th className="text-left pb-2">Strategy</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b">
                    <td className="py-2 font-semibold">1 - 100</td>
                    <td className="py-2">Direct Gemini 3 Pro API calls.</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-semibold">1k - 10k</td>
                    <td className="py-2">Gemini Flash for initial triage + Context Window optimization.</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">100k+</td>
                    <td className="py-2">Vector Embeddings (Pinecone) to match top 1% then deep scan.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-3 text-sm">Security & Privacy</h3>
              <ul className="text-xs text-indigo-700 space-y-2 list-disc ml-4">
                <li>PII Scrubbing: Redact names/emails before LLM processing if required.</li>
                <li>Stateless Processing: We do not use resume data to train models.</li>
                <li>Encryption at Rest: Resumes are deleted from cache after 24h.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="bg-slate-900 text-white font-bold py-3 px-10 rounded-xl hover:bg-slate-800 transition-all"
          >
            Close System Design
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureInfo;
