import React, { useState, useEffect } from 'react';
import { analyzeSymptoms } from '../services/geminiService';
import { SymptomAnalysis } from '../types';

// Icons for visual distinction in results
const WarningIcon: React.FC = () => (
  <svg className="h-6 w-6 mr-3 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const InfoIcon: React.FC = () => (
  <svg className="h-6 w-6 mr-3 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      setError('Please enter your symptoms.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setShowResults(false); // Reset for animation
    try {
      const result = await analyzeSymptoms(symptoms);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (analysis && !showResults) {
        // Timeout allows the component to render with initial animation state (opacity-0)
        const timer = setTimeout(() => {
            setShowResults(true);
        }, 50); 
        return () => clearTimeout(timer);
    }
  }, [analysis, showResults]);


  const getSeverityClass = (severity: 'Low' | 'Medium' | 'High') => {
    switch(severity) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h3 className="text-2xl font-bold text-neutral-800 mb-2">AI Symptom Checker</h3>
        <p className="text-neutral-500 mb-6">Describe your symptoms below. This tool provides general information and is not a substitute for professional medical advice.</p>
        
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g., I have a headache, a slight fever, and a runny nose..."
          className="w-full h-32 p-3 border-0 bg-neutral-100 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
          disabled={isLoading}
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-full hover:bg-indigo-600 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
          >
            {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
            {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
          </button>
        </div>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      </div>

      {analysis && (
        <div className={`mt-8 space-y-8 transition-all duration-700 ease-out ${showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div>
            <h4 className="text-xl font-bold text-neutral-800 mb-4">Possible Conditions</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {analysis.possibleConditions.map(cond => (
                <div key={cond.name} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-5 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <h5 className="font-bold text-neutral-800 pr-2">{cond.name}</h5>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap border ${getSeverityClass(cond.severity)}`}>{cond.severity}</span>
                  </div>
                  <p className="text-neutral-600 mt-2 text-sm">{cond.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {analysis.redFlags && analysis.redFlags.length > 0 && (
             <div className="bg-white rounded-xl shadow-sm border-l-4 border-red-500 p-5">
              <div className="flex items-center">
                <WarningIcon />
                <h5 className="text-lg font-semibold text-red-800">Red Flags</h5>
              </div>
              <ul className="list-disc list-inside text-red-700 space-y-1.5 mt-3 pl-9">
                {analysis.redFlags.map((flag, i) => <li key={i}>{flag}</li>)}
              </ul>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-sm border-l-4 border-indigo-500 p-5">
            <div className="flex items-center">
                <InfoIcon />
                <h5 className="text-lg font-semibold text-indigo-800">Recommendations</h5>
            </div>
            <ul className="list-disc list-inside text-indigo-700 space-y-1.5 mt-3 pl-9">
              {analysis.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;