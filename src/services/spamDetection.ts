import { DetectionResult, SpamIndicator } from '../types';

const SPAM_KEYWORDS = [
  'FREE', 'URGENT', 'ACT NOW', 'LIMITED TIME', 'CONGRATULATIONS',
  'WINNER', 'CASH', 'MONEY', 'LOTTERY', 'PRIZE', 'GUARANTEED',
  'NO OBLIGATION', 'RISK FREE', 'CALL NOW', 'CLICK HERE'
];

const SUSPICIOUS_PATTERNS = [
  { pattern: /\$\d+/g, type: 'Money Mentions', severity: 'medium' as const },
  { pattern: /!!+/g, type: 'Excessive Exclamation', severity: 'low' as const },
  { pattern: /[A-Z]{5,}/g, type: 'Excessive Caps', severity: 'medium' as const },
  { pattern: /\d{3}-\d{3}-\d{4}/g, type: 'Phone Numbers', severity: 'low' as const },
  { pattern: /http[s]?:\/\/[^\s]+/g, type: 'Suspicious Links', severity: 'high' as const },
  { pattern: /\b(urgent|hurry|act now|limited time)\b/gi, type: 'Urgency Words', severity: 'high' as const }
];

export class SpamDetectionService {
  private static instance: SpamDetectionService;
  private history: DetectionResult[] = [];

  static getInstance(): SpamDetectionService {
    if (!SpamDetectionService.instance) {
      SpamDetectionService.instance = new SpamDetectionService();
    }
    return SpamDetectionService.instance;
  }

  async detectSpam(content: string): Promise<DetectionResult> {
    const startTime = Date.now();
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    const indicators = this.analyzeContent(content);
    const spamScore = this.calculateSpamScore(indicators);
    const isSpam = spamScore > 0.6;
    
    const result: DetectionResult = {
      id: this.generateId(),
      timestamp: new Date(),
      content: content.substring(0, 200) + (content.length > 200 ? '...' : ''),
      isSpam,
      confidence: Math.round(spamScore * 100) / 100,
      indicators,
      processingTime: Date.now() - startTime
    };

    this.history.unshift(result);
    if (this.history.length > 50) {
      this.history = this.history.slice(0, 50);
    }

    return result;
  }

  private analyzeContent(content: string): SpamIndicator[] {
    const indicators: SpamIndicator[] = [];

    // Check for spam keywords
    const foundKeywords = SPAM_KEYWORDS.filter(keyword => 
      content.toUpperCase().includes(keyword)
    );
    
    if (foundKeywords.length > 0) {
      indicators.push({
        type: 'Spam Keywords',
        description: `Contains suspicious keywords: ${foundKeywords.join(', ')}`,
        severity: foundKeywords.length > 2 ? 'high' : 'medium',
        detected: true
      });
    }

    // Check patterns
    SUSPICIOUS_PATTERNS.forEach(({ pattern, type, severity }) => {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        indicators.push({
          type,
          description: `Found ${matches.length} instance(s) of ${type.toLowerCase()}`,
          severity,
          detected: true
        });
      }
    });

    // Length analysis
    if (content.length < 50) {
      indicators.push({
        type: 'Short Content',
        description: 'Email content is unusually short',
        severity: 'low',
        detected: true
      });
    }

    // Subject line analysis (simulated)
    const hasSubjectIndicators = Math.random() > 0.7;
    if (hasSubjectIndicators) {
      indicators.push({
        type: 'Suspicious Subject',
        description: 'Subject line contains spam-like patterns',
        severity: 'medium',
        detected: true
      });
    }

    return indicators;
  }

  private calculateSpamScore(indicators: SpamIndicator[]): number {
    let score = 0;
    
    indicators.forEach(indicator => {
      switch (indicator.severity) {
        case 'high':
          score += 0.3;
          break;
        case 'medium':
          score += 0.2;
          break;
        case 'low':
          score += 0.1;
          break;
      }
    });

    // Add some randomness to make it more realistic
    score += (Math.random() - 0.5) * 0.2;
    
    return Math.max(0, Math.min(1, score));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getHistory(): DetectionResult[] {
    return [...this.history];
  }

  getStatistics() {
    if (this.history.length === 0) {
      return {
        totalEmails: 0,
        spamDetected: 0,
        averageConfidence: 0,
        mostCommonIndicators: []
      };
    }

    const spamCount = this.history.filter(r => r.isSpam).length;
    const avgConfidence = this.history.reduce((sum, r) => sum + r.confidence, 0) / this.history.length;
    
    const indicatorCounts: { [key: string]: number } = {};
    this.history.forEach(result => {
      result.indicators.forEach(indicator => {
        indicatorCounts[indicator.type] = (indicatorCounts[indicator.type] || 0) + 1;
      });
    });

    const mostCommon = Object.entries(indicatorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type);

    return {
      totalEmails: this.history.length,
      spamDetected: spamCount,
      averageConfidence: Math.round(avgConfidence * 100) / 100,
      mostCommonIndicators: mostCommon
    };
  }
}