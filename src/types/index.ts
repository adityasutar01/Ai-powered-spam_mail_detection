export interface DetectionResult {
  id: string;
  timestamp: Date;
  content: string;
  isSpam: boolean;
  confidence: number;
  indicators: SpamIndicator[];
  processingTime: number;
}

export interface SpamIndicator {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  detected: boolean;
}

export interface Statistics {
  totalEmails: number;
  spamDetected: number;
  averageConfidence: number;
  mostCommonIndicators: string[];
}