import {
  DiagnosisOutput,
  PatientRecord,
  PrescriptionRecord,
  SecretSessionState,
  VisionAnalysisResult,
  AnalyticsRecord,
} from '../types';

function getSessionId(): string {
  let sid = localStorage.getItem('hathi_session_id');
  if (!sid) {
    sid = 'ghost-sess-' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('hathi_session_id', sid);
  }
  return sid;
}

const defaultHeaders = () => ({
  'Content-Type': 'application/json',
  'x-session-id': getSessionId(),
});

export const api = {
  getSessionId,

  async initSession(): Promise<{ sessionId: string; secretState: SecretSessionState; analytics: AnalyticsRecord }> {
    const res = await fetch('/api/session', {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify({ sessionId: getSessionId() }),
    });
    if (!res.ok) throw new Error('Failed to init session');
    return res.json();
  },

  async sendMessageToBoo(
    message: string,
    history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [],
    context?: { midnightMode?: boolean; currentDiagnosis?: string }
  ): Promise<{ reply: string; secretOutcome?: any; sessionState?: SecretSessionState }> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify({ message, history, context }),
    });
    if (!res.ok) throw new Error('Failed to send message to Boo');
    return res.json();
  },

  async runDiagnosis(payload: {
    ghostName?: string;
    symptoms: string[];
    freeText?: string;
    evidenceData?: string;
    evidenceMime?: string;
  }): Promise<DiagnosisOutput> {
    const res = await fetch('/api/diagnosis', {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Diagnosis calculation error');
    return res.json();
  },

  async analyzeEvidence(payload: {
    imageBase64: string;
    mimeType: string;
    description?: string;
  }): Promise<VisionAnalysisResult> {
    const res = await fetch('/api/vision', {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Paranormal vision scan error');
    return res.json();
  },

  async sendVoiceTranscript(transcript: string, context?: { midnightMode?: boolean }): Promise<{
    transcript: string;
    reply: string;
    secretOutcome?: any;
  }> {
    const res = await fetch('/api/voice', {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify({ transcript, context }),
    });
    if (!res.ok) throw new Error('Voice transmission failed');
    return res.json();
  },

  async createPrescription(payload: {
    patientId: string;
    ghostName: string;
    diagnosis: string;
    medication: string;
    dosage?: string;
    instructions?: string;
    followUp?: string;
  }): Promise<PrescriptionRecord> {
    const res = await fetch('/api/prescription', {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create ghost prescription');
    return res.json();
  },

  async getPatients(): Promise<{ patients: PatientRecord[]; patient013Unlocked: boolean }> {
    const res = await fetch('/api/patients', {
      headers: defaultHeaders(),
    });
    if (!res.ok) throw new Error('Could not retrieve patient archives');
    return res.json();
  },

  async savePatientRecord(record: Omit<PatientRecord, 'createdAt'>): Promise<PatientRecord> {
    const res = await fetch('/api/patients', {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error('Failed to archive patient record');
    return res.json();
  },

  async clickStethoscope(): Promise<{
    clicks: number;
    unlocked: boolean;
    message?: string;
    audioTrigger?: string;
    state: SecretSessionState;
  }> {
    const res = await fetch('/api/secrets/stethoscope', {
      method: 'POST',
      headers: defaultHeaders(),
    });
    if (!res.ok) throw new Error('Stethoscope resonance error');
    return res.json();
  },

  async clickGhostFollower(): Promise<{
    unlocked: boolean;
    message: string;
    state: SecretSessionState;
  }> {
    const res = await fetch('/api/secrets/ghost-follower', {
      method: 'POST',
      headers: defaultHeaders(),
    });
    if (!res.ok) throw new Error('Follower contact error');
    return res.json();
  },

  async toggleMidnightMode(enabled?: boolean): Promise<{
    midnightMode: boolean;
    state: SecretSessionState;
  }> {
    const res = await fetch('/api/secrets/midnight', {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify({ enabled }),
    });
    if (!res.ok) throw new Error('Midnight toggle failed');
    return res.json();
  },

  async unlockPatient013(): Promise<SecretSessionState> {
    const res = await fetch('/api/secrets/unlock', {
      method: 'POST',
      headers: defaultHeaders(),
    });
    if (!res.ok) throw new Error('Secret archive bypass failed');
    return res.json();
  },

  async getSecretStatus(): Promise<SecretSessionState> {
    const res = await fetch('/api/secrets/status', {
      headers: defaultHeaders(),
    });
    if (!res.ok) throw new Error('Secret status fetch failed');
    return res.json();
  },

  async resetSession(): Promise<{ message: string; state: SecretSessionState }> {
    const res = await fetch('/api/reset', {
      method: 'POST',
      headers: defaultHeaders(),
    });
    if (!res.ok) throw new Error('Reset failed');
    return res.json();
  },

  async getAnalytics(): Promise<AnalyticsRecord> {
    const res = await fetch('/api/analytics', {
      headers: defaultHeaders(),
    });
    if (!res.ok) throw new Error('Analytics unavailable');
    return res.json();
  },
};
