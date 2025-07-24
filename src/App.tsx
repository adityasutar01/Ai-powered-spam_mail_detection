import React, { useState } from 'react';
import { Shield, Zap, BarChart3 } from 'lucide-react';
import EmailDetector from './components/EmailDetector';
import ResultsDisplay from './components/ResultsDisplay';
import Statistics from './components/Statistics';
import { DetectionResult } from './types';

function App() {
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'detector' | 'stats'>('detector');

  const handleResult = (result: DetectionResult) => {
    setCurrentResult(result);
    setIsAnalyzing(false);
  };

  const handleAnalyzeStart = () => {
    setIsAnalyzing(true);
    setCurrentResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">SpamGuard AI</h1>
                  <p className="text-blue-200">Advanced Email Threat Detection</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab('detector')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'detector' 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span className="hidden sm:block">Detector</span>
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'stats' 
                      ? 'bg-purple-500 text-white shadow-lg' 
                      : 'text-blue-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:block">Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'detector' ? (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <EmailDetector onResult={handleResult} />
                
                {/* Feature Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Detection</h3>
                    <p className="text-blue-200 text-sm">Advanced machine learning algorithms analyze email patterns and indicators</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Real-time Analysis</h3>
                    <p className="text-blue-200 text-sm">Get instant results with detailed confidence scores and threat indicators</p>
                  </div>
                </div>
              </div>
              
              <div>
                <ResultsDisplay result={currentResult} isLoading={isAnalyzing} />
              </div>
            </div>
          ) : (
            <Statistics />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-white/5 backdrop-blur-md mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">SpamGuard AI</span>
              </div>
              <p className="text-blue-200 text-sm">
                Protecting your inbox with advanced AI-powered spam detection technology
              </p>
              <div className="mt-4 flex justify-center space-x-6 text-sm text-blue-300">
                <span>Powered by Machine Learning</span>
                <span>•</span>
                <span>Real-time Analysis</span>
                <span>•</span>
                <span>Enterprise Security</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;