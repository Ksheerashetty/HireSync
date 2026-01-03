
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputView from '../components/InputView';
import ProcessingView from '../components/ProcessingView';
import { useCandidates } from '../contexts/CandidateContext';
import { extractTextFromPDF } from '../services/pdfService';
import { analyzeResume } from '../services/geminiService';
import { ResumeAnalysis } from '../types';

const UploadPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<'PARSING' | 'ANALYZING' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addAnalysis } = useCandidates();
  const navigate = useNavigate();

  const handleAnalysis = async (file: File, jd: string) => {
    setError(null);
    setIsProcessing('PARSING');

    try {
      const resumeText = await extractTextFromPDF(file);
      setIsProcessing('ANALYZING');
      const result = await analyzeResume(resumeText, jd);
      
      const newAnalysis: ResumeAnalysis = {
        ...result,
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        timestamp: Date.now(),
        status: 'PENDING'
      };

      addAnalysis(newAnalysis);
      navigate(`/candidate/${newAnalysis.id}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setIsProcessing(null);
    }
  };

  return (
    <div className="p-8 h-full">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
        {isProcessing ? (
          <ProcessingView step={isProcessing} />
        ) : (
          <div className="w-full">
            <InputView onSubmit={handleAnalysis} error={error} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
