import React, { useState, useRef } from 'react';
import { Mail, Upload, Loader2, Shield, AlertTriangle } from 'lucide-react';
import { SpamDetectionService } from '../services/spamDetection';
import { DetectionResult } from '../types';

interface EmailDetectorProps {
  onResult: (result: DetectionResult) => void;
}

export default function EmailDetector({ onResult }: EmailDetectorProps) {
  const [emailContent, setEmailContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const spamService = SpamDetectionService.getInstance();

  const handleAnalyze = async () => {
    if (!emailContent.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await spamService.detectSpam(emailContent);
      onResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    const text = await file.text();
    setEmailContent(text);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const sampleEmails = [
    "Congratulations! You've won $1,000,000! Click here NOW to claim your prize! Limited time offer - ACT FAST!",
    "Hi John, just wanted to follow up on our meeting yesterday. Looking forward to hearing your thoughts on the proposal.",
    "URGENT!!! Your account will be suspended unless you verify your information immediately! Click this link: http://suspicious-site.com"
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Email Analysis</h2>
          <p className="text-blue-100">Paste your email content or upload a file</p>
        </div>
      </div>

      <div className="space-y-6">
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 ${
            dragActive 
              ? 'border-blue-400 bg-blue-50/10' 
              : 'border-white/30 hover:border-white/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Paste your email content here..."
            className="w-full h-40 bg-transparent text-white placeholder-blue-200 resize-none outline-none"
            disabled={isAnalyzing}
          />
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 text-white"
                disabled={isAnalyzing}
              >
                <Upload className="w-4 h-4" />
                Upload File
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.eml,.msg"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                className="hidden"
              />
              
              <span className="text-sm text-blue-200">
                {emailContent.length} characters
              </span>
            </div>
            
            <button
              onClick={handleAnalyze}
              disabled={!emailContent.trim() || isAnalyzing}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Analyze Email
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Try Sample Emails:</h3>
          <div className="grid gap-3">
            {sampleEmails.map((sample, index) => (
              <button
                key={index}
                onClick={() => setEmailContent(sample)}
                className="text-left p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200 text-blue-100 hover:text-white"
                disabled={isAnalyzing}
              >
                <div className="flex items-start gap-3">
                  {index === 0 || index === 2 ? (
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Mail className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  )}
                  <span className="text-sm line-clamp-2">{sample}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}