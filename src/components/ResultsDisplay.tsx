import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { DetectionResult } from '../types';

interface ResultsDisplayProps {
  result: DetectionResult | null;
  isLoading: boolean;
}

export default function ResultsDisplay({ result, isLoading }: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-2">Analyzing Email</h3>
            <p className="text-blue-200">Our AI is processing your email content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
        <div className="text-center text-blue-200">
          <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">Ready for Analysis</h3>
          <p>Enter an email above to see detailed spam detection results</p>
        </div>
      </div>
    );
  }

  const confidenceColor = result.isSpam 
    ? result.confidence > 0.8 ? 'text-red-400' : 'text-orange-400'
    : 'text-green-400';

  const backgroundGradient = result.isSpam
    ? 'from-red-500/20 to-orange-500/20'
    : 'from-green-500/20 to-blue-500/20';

  return (
    <div className={`bg-gradient-to-br ${backgroundGradient} backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl ${result.isSpam ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
          {result.isSpam ? (
            <AlertTriangle className="w-8 h-8 text-red-400" />
          ) : (
            <CheckCircle className="w-8 h-8 text-green-400" />
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">
            {result.isSpam ? 'Spam Detected' : 'Email Appears Safe'}
          </h3>
          <p className="text-blue-100">
            Analysis completed in {result.processingTime}ms
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h4 className="text-lg font-semibold text-white">Confidence Score</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-blue-200">Spam Probability</span>
              <span className={`text-xl font-bold ${confidenceColor}`}>
                {Math.round(result.confidence * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  result.isSpam 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                    : 'bg-gradient-to-r from-green-500 to-blue-500'
                }`}
                style={{ width: `${result.confidence * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-blue-400" />
            <h4 className="text-lg font-semibold text-white">Analysis Details</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-200">Processing Time:</span>
              <span className="text-white">{result.processingTime}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Analyzed At:</span>
              <span className="text-white">{result.timestamp.toLocaleTimeString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Content Length:</span>
              <span className="text-white">{result.content.length} chars</span>
            </div>
          </div>
        </div>
      </div>

      {result.indicators.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Detection Indicators</h4>
          <div className="space-y-3">
            {result.indicators.map((indicator, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  indicator.severity === 'high' ? 'bg-red-400' :
                  indicator.severity === 'medium' ? 'bg-orange-400' : 'bg-yellow-400'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{indicator.type}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      indicator.severity === 'high' ? 'bg-red-400/20 text-red-300' :
                      indicator.severity === 'medium' ? 'bg-orange-400/20 text-orange-300' : 
                      'bg-yellow-400/20 text-yellow-300'
                    }`}>
                      {indicator.severity}
                    </span>
                  </div>
                  <p className="text-sm text-blue-200">{indicator.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
        <h5 className="font-semibold text-white mb-2">Email Preview</h5>
        <p className="text-sm text-blue-200 leading-relaxed">{result.content}</p>
      </div>
    </div>
  );
}