
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { useCandidates } from '../contexts/CandidateContext';
import { ResumeAnalysis } from '../types';

const DashboardPage: React.FC = () => {
  const { history, updateStatus } = useCandidates();
  const navigate = useNavigate();

  const handleSelect = (a: ResumeAnalysis) => {
    navigate(`/candidate/${a.id}`);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <Dashboard 
          candidates={history}
          onSelect={handleSelect}
          onUpdateStatus={updateStatus}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
