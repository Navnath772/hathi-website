import { ai, GEMINI_MODEL } from './gemini.js';
import { Type } from '@google/genai';

export interface DiagnosisInput {
  ghostName?: string;
  symptoms: string[];
  freeText?: string;
  evidenceData?: string;
  evidenceMime?: string;
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

const FICTIONAL_CONDITIONS = [
  {
    name: 'PHANTOM PHASE DISORDER',
    primarySymptom: "Can't pass through walls",
    medication: 'ECTOPLASM PLUS',
    treatment: 'Daily spectral vapor inhalation & phase calibration under moonlight.',
    analysis: 'The spirit exhibits severe boundary resistance. Molecular density has misaligned with standard ethereal vibration frequencies, causing wall-impact rebound.',
    severity: 'HIGH' as const,
  },
  {
    name: 'ECTOPLASMIC ENERGY DEFICIENCY',
    primarySymptom: 'Losing my ghost powers',
    medication: 'SPIRITOL',
    treatment: '3 drops of high-viscosity Spiritol taken twice nightly at lunar crest.',
    analysis: 'Bioluminescent ectoplasmic depletion detected across core spiritual nodes. Ethereal levitation threshold is operating at reduced capacity.',
    severity: 'MODERATE' as const,
  },
  {
    name: 'MIRROR PHASE SYNDROME',
    primarySymptom: 'I keep appearing in mirrors',
    medication: 'SOULCALM',
    treatment: 'Reflective polarity dampener paste applied to spiritual contours.',
    analysis: 'Photonic resonance leakage causing accidental quantum manifestation on reflective surfaces. The spirit is bouncing off silver glass rather than passing undetected.',
    severity: 'MODERATE' as const,
  },
  {
    name: 'PARANORMAL DISTURBANCE SYNDROME',
    primarySymptom: 'Another ghost is haunting me',
    medication: 'PHANTOM SHIELD',
    treatment: 'Poltergeist frequency shielding barrier around haunting coordinates.',
    analysis: 'Secondary ethereal harmonic interference. An unregistered apparition is projecting discordant paranormal ripples into the patient’s personal astral sanctuary.',
    severity: 'HIGH' as const,
  },
  {
    name: 'SPECTRAL ENERGY DEPLETION',
    primarySymptom: 'My ectoplasm is unstable',
    medication: 'MIDNIGHT-X',
    treatment: 'Cryogenic moonlight resting chamber for 3 consecutive nights.',
    analysis: 'Sub-zero spiritual hypothermia with accelerated cellular breakdown in ectoplasmic membrane. Immediate stabilizing tonic required.',
    severity: 'CRITICAL' as const,
  },
  {
    name: 'TEMPORAL GHOST DISTORTION',
    primarySymptom: 'Strange midnight symptoms',
    medication: 'MIDNIGHT-X',
    treatment: 'Afterlife clock synchronization with Greenwich Mean Witching Time.',
    analysis: 'Patient is caught in a 03:13 AM chronological echo loop. Spiritual symptoms fluctuate with lunar cycles.',
    severity: 'HIGH' as const,
  },
];

export async function runSpiritDiagnosis(input: DiagnosisInput): Promise<DiagnosisOutput> {
  const ghostName = input.ghostName?.trim() || `Anonymous Ghost #${Math.floor(100 + Math.random() * 900)}`;
  const symptomList = input.symptoms || [];

  // Match best condition from deterministic dictionary
  let matched = FICTIONAL_CONDITIONS[0];
  for (const cond of FICTIONAL_CONDITIONS) {
    if (symptomList.some((s) => s.toLowerCase().includes(cond.primarySymptom.toLowerCase().slice(0, 10)))) {
      matched = cond;
      break;
    }
  }

  // Calculate baseline metrics
  let spiritEnergy = Math.floor(65 + Math.random() * 25);
  let ectoplasmStability = Math.floor(50 + Math.random() * 35);
  let phaseStability = Math.floor(30 + Math.random() * 40);

  if (symptomList.includes("Can't pass through walls")) {
    phaseStability = Math.min(phaseStability, 31);
  }
  if (symptomList.includes("Losing my ghost powers")) {
    spiritEnergy = Math.min(spiritEnergy, 42);
  }
  if (symptomList.includes("My ectoplasm is unstable")) {
    ectoplasmStability = Math.min(ectoplasmStability, 38);
  }

  let finalDiagnosis = matched.name;
  let finalAnalysis = matched.analysis;
  let finalTreatment = matched.treatment;
  let finalMed = matched.medication;
  let finalSeverity = matched.severity;

  // Enhance with Gemini AI if available and user provided free-text or unusual symptoms
  if (ai && (input.freeText || input.symptoms.length > 1)) {
    try {
      const prompt = `As Dr. Hansraj Hathi ("Chief Physician of the Afterlife" at Hathi Afterdark supernatural clinic), review this fictional ghost patient check-up.
Ghost Name: ${ghostName}
Reported Symptoms: ${symptomList.join(', ') || 'General haunting malaise'}
Patient's Own Words: "${input.freeText || 'None'}"

Provide a creative, humorous yet professional supernatural medical diagnosis.
Return JSON:
{
  "diagnosis": "${matched.name}",
  "severity": "${matched.severity}",
  "drHathiAnalysis": "Dr. Hathi's warm, clinical, and witty 2-3 sentence analysis of their spirit condition",
  "fictionalTreatment": "2 sentence fictional afterlife treatment plan",
  "fictionalMedication": "${matched.medication}",
  "followUp": "e.g. Return in 7 lunar cycles if wall-passing remains blocked"
}`;

      const res = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              diagnosis: { type: Type.STRING },
              severity: { type: Type.STRING },
              drHathiAnalysis: { type: Type.STRING },
              fictionalTreatment: { type: Type.STRING },
              fictionalMedication: { type: Type.STRING },
              followUp: { type: Type.STRING },
            },
            required: ['diagnosis', 'drHathiAnalysis', 'fictionalTreatment'],
          },
        },
      });

      if (res.text) {
        const parsed = JSON.parse(res.text);
        if (parsed.diagnosis) finalDiagnosis = parsed.diagnosis.toUpperCase();
        if (parsed.drHathiAnalysis) finalAnalysis = parsed.drHathiAnalysis;
        if (parsed.fictionalTreatment) finalTreatment = parsed.fictionalTreatment;
        if (parsed.fictionalMedication) finalMed = parsed.fictionalMedication;
        if (parsed.severity && ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'].includes(parsed.severity)) {
          finalSeverity = parsed.severity;
        }
      }
    } catch (err) {
      console.warn('[Diagnosis Engine] Gemini refinement fallback to deterministic output:', err);
    }
  }

  const id = `HA-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

  return {
    id,
    ghostName,
    symptoms: symptomList,
    diagnosis: finalDiagnosis,
    spiritEnergy,
    ectoplasmStability,
    phaseStability,
    severity: finalSeverity,
    analysis: finalAnalysis,
    fictionalTreatment: finalTreatment,
    fictionalMedication: finalMed,
    followUp: '7 nights under the waning crescent moon at Dr. Hathi Clinic.',
    explainability: {
      symptomMatch: Math.floor(78 + Math.random() * 18),
      spiritPattern: Math.floor(70 + Math.random() * 22),
      visualEvidence: input.evidenceData ? Math.floor(85 + Math.random() * 12) : 64,
      historicalPattern: Math.floor(60 + Math.random() * 30),
    },
    createdAt: new Date().toISOString(),
  };
}
