
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardDetail from '../components/DashboardDetail';
import { useCandidates } from '../contexts/CandidateContext';

const CandidateDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAnalysis, updateStatus } = useCandidates();
  
  const analysis = id ? getAnalysis(id) : undefined;

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-20 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-slate-900">Candidate Not Found</h2>
        <p className="text-slate-500 mt-2">The analysis report you're looking for doesn't exist or was removed.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <DashboardDetail 
          analysis={analysis}
          onReset={() => navigate('/new-screening')}
          onBack={() => navigate('/')}
          onUpdateStatus={(status) => updateStatus(analysis.id, status)}
        />
      </div>
    </div>
  );
};

export default CandidateDetailPage;
