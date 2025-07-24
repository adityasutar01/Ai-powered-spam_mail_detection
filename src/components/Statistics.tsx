import React from 'react';
import { BarChart3, Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { SpamDetectionService } from '../services/spamDetection';

export default function Statistics() {
  const spamService = SpamDetectionService.getInstance();
  const stats = spamService.getStatistics();
  const history = spamService.getHistory();

  const spamRate = stats.totalEmails > 0 ? (stats.spamDetected / stats.totalEmails) * 100 : 0;
  const legitimateRate = 100 - spamRate;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-blue-100">Detection statistics and insights</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalEmails}</div>
          <div className="text-sm text-blue-200">Total Analyzed</div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.spamDetected}</div>
          <div className="text-sm text-blue-200">Spam Detected</div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.averageConfidence.toFixed(2)}</div>
          <div className="text-sm text-blue-200">Avg Confidence</div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{spamRate.toFixed(1)}%</div>
          <div className="text-sm text-blue-200">Spam Rate</div>
        </div>
      </div>

      {stats.totalEmails > 0 && (
        <>
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Detection Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-200">Spam ({stats.spamDetected})</span>
                  <span className="text-red-400">{spamRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000"
                    style={{ width: `${spamRate}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-blue-200">Legitimate ({stats.totalEmails - stats.spamDetected})</span>
                  <span className="text-green-400">{legitimateRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${legitimateRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {stats.mostCommonIndicators.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Common Indicators</h3>
              <div className="grid gap-3">
                {stats.mostCommonIndicators.map((indicator, index) => (
                  <div key={indicator} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-white font-medium">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Recent Analysis History</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {history.slice(0, 5).map((result) => (
                <div key={result.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className={`w-3 h-3 rounded-full ${result.isSpam ? 'bg-red-400' : 'bg-green-400'}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">
                        {result.isSpam ? 'Spam' : 'Legitimate'}
                      </span>
                      <span className="text-sm text-blue-200">
                        {result.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-blue-200 truncate">{result.content}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${result.isSpam ? 'text-red-400' : 'text-green-400'}`}>
                      {Math.round(result.confidence * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}