
import React, { useState } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route 
} from 'react-router-dom';
import { CandidateProvider } from './contexts/CandidateContext';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import CandidateDetailPage from './pages/CandidateDetailPage';
import ArchitectureInfo from './components/ArchitectureInfo';

const App: React.FC = () => {
  const [showArch, setShowArch] = useState(false);

  return (
    <CandidateProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/new-screening" element={<UploadPage />} />
              <Route path="/candidate/:id" element={<CandidateDetailPage />} />
            </Routes>
          </main>

          {/* Architecture info button (Fixed bottom left) */}
          <button 
            onClick={() => setShowArch(true)}
            className="fixed bottom-6 left-6 p-3 bg-white border border-slate-100 rounded-full shadow-lg hover:shadow-xl transition-all z-40 text-slate-400 hover:text-indigo-600"
            title="System Architecture"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </button>

          {showArch && <ArchitectureInfo onClose={() => setShowArch(false)} />}
        </div>
      </Router>
    </CandidateProvider>
  );
};

export default App;
