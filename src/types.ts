export interface PatientRecord {
  patientId: string;
  ghostName: string;
  condition: string;
  diagnosis: string;
  spiritEnergy: number;
  ectoplasmStability: number;
  phaseStability: number;
  treatment: string;
  status: 'Stable' | 'Under Observation' | 'Critical' | 'Unknown';
  lastVisit: string;
  doctor: string;
  isClassified?: boolean;
  classifiedNotes?: string;
  rxCode?: string;
  createdAt?: string;
}

export interface DiagnosisOutput {
  id: string;
  ghostName: string;
  symptoms?: string[];
  diagnosis: string;
  spiritEnergy: number;
  ectoplasmStability: number;
  phaseStability: number;
  severity: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  analysis: string;
  fictionalTreatment: string;
  fictionalMedication: string;
  followUp: string;
  explainability: {
    symptomMatch: number;
    spiritPattern: number;
    visualEvidence: number;
    historicalPattern: number;
  };
  createdAt: string;
}

export interface PrescriptionRecord {
  rxId: string;
  patientId: string;
  ghostName: string;
  diagnosis: string;
  medication: string;
  dosage: string;
  instructions: string;
  followUp: string;
  prescribedBy: string;
  createdAt: string;
  spiritSeal: string;
}

export interface SecretSessionState {
  sessionId: string;
  stethoscopeClicks: number;
  stethoscopeUnlocked: boolean;
  ghostFollowerFound: boolean;
  midnightMode: boolean;
  aiSequenceStep: number;
  patient013Unlocked: boolean;
  archiveUnlocked: boolean;
  secretsFound: string[];
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: string;
  isGlitch?: boolean;
}

export interface VisionAnalysisResult {
  spectralDensity: number;
  shadowStability: number;
  ectoplasmPattern: string;
  anomalyLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  fictionalCondition: string;
  interpretation: string;
  explainability: {
    symptomMatch: number;
    spiritPattern: number;
    visualEvidence: number;
    historicalPattern: number;
  };
}

export interface AnalyticsRecord {
  checkupsStarted: number;
  checkupsCompleted: number;
  aiMessages: number;
  imagesAnalyzed: number;
  voiceInteractions: number;
  prescriptionsGenerated: number;
  secretsFound: number;
  midnightModeUsed: number;
  patient013Unlocked: number;
}
