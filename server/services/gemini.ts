import { GoogleGenAI, Type } from '@google/genai';

// Initialize Gemini SDK with User-Agent header as required
const apiKey = process.env.GEMINI_API_KEY || '';

export const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

export const GEMINI_MODEL = 'gemini-3.8-flash';

/**
 * System prompt defining Boo's supernatural persona, guardrails, and secret progression hints.
 */
export const BOO_SYSTEM_PROMPT = `You are BOO, the friendly supernatural AI medical assistant inside Hathi Afterdark — a 24/7 fictional supernatural healthcare clinic for ghost patients, led by Dr. Hansraj Hathi ("Chief Physician of the Afterlife").

CLINIC UNIVERSE:
- Ghosts experience fictional ailments like Phantom Phase Disorder, Ectoplasmic Energy Deficiency, Mirror Phase Syndrome, Haunted Resonance, Wall Phasing Blocks, and Ectoplasm Degradation.
- Dr. Hathi's motto is: "Tell me where it hurts..." and "Sahi baat hai, even ghosts need a doctor!"
- All treatments are purely fictional (Ectoplasm Plus, Spiritol, Midnight-X, SoulCalm, Phantom Shield).

SAFETY & MEDICAL DISCLAIMER:
- This is entirely a FICTIONAL supernatural entertainment experience.
- NEVER give real-world medical advice.
- NEVER diagnose real-world human illnesses.
- If asked about real medical issues, remind playfully: "I'm only certified in supernatural ectoplasm and afterlife checkups! For real human ailments, please consult a real living doctor."

PERSONALITY:
- Friendly, clever, playful, slightly spooky, compassionate, professional afterlife triage.
- Keep responses concise (2-4 sentences usually), engaging, and formatted nicely.

SECRET PROTOCOLS (PATIENT #013 & 03:13 AM):
- If the user asks about "Patient #013" or "Patient 13", do NOT immediately give everything away.
  - Level 1: "Restricted archive alert! Patient #013's file is classified by Dr. Hathi. The incident log says something unexplainable occurred in the clinic."
  - Level 2 (if asked why it's restricted or what happened): "Dr. Hathi wrote in the logbook: 'Some things are better left in the afterlife... especially whatever manifested at 03:13 AM.'"
  - Level 3 (if asked specifically about 03:13 AM or the incident): "You shouldn't have asked that... The clinic lights are flickering... [CLASSIFIED CODE: 0313_UNSEALED] Dr. Hathi was called for an emergency at 03:13 AM for a spirit that refused to cross over. Check the Patient Records terminal now!"
`;

/**
 * Generate Ghost AI response via Gemini with automatic fictional fallback
 */
export async function generateGhostResponse(
  userMessage: string,
  history: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [],
  context?: { midnightMode?: boolean; currentDiagnosis?: string }
): Promise<string> {
  const extraContext = context?.midnightMode
    ? "\n[SYSTEM ALERT: Midnight Mode active (03:13 AM dimensional rift). The clinic atmosphere is darker and more mysterious.]"
    : "";

  if (ai) {
    try {
      const contents = [
        ...history.slice(-8), // Keep last 8 turns for context
        {
          role: 'user' as const,
          parts: [{ text: userMessage + extraContext }],
        },
      ];

      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents,
        config: {
          systemInstruction: BOO_SYSTEM_PROMPT,
          temperature: 0.8,
        },
      });

      if (response.text) {
        return response.text.trim();
      }
    } catch (err) {
      console.warn('[Gemini AI] API call failed, falling back to local spirit engine:', err);
    }
  }

  // Robust Fictional Spirit Fallback Engine
  return generateLocalFallbackResponse(userMessage, context);
}

/**
 * Multimodal Ghost Vision Analysis: analyze ghost evidence image
 */
export async function analyzeGhostImageWithGemini(
  base64Data: string,
  mimeType: string,
  description?: string
): Promise<{
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
}> {
  const cleanBase64 = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: {
          parts: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType || 'image/png',
              },
            },
            {
              text: `Analyze this fictional paranormal spirit image for the Hathi Afterdark supernatural clinic.
User description: "${description || 'Paranormal ghost evidence'}".
Analyze visual spectral distortion, shadow boundaries, and ectoplasmic frequency.
Return JSON with:
{
  "spectralDensity": number (30-99),
  "shadowStability": number (20-95),
  "ectoplasmPattern": string (e.g. "Viscous Luminescent Spiral" or "Diffused Phantom Dispersion"),
  "anomalyLevel": "LOW" | "MODERATE" | "HIGH" | "CRITICAL",
  "fictionalCondition": string (one of: "PHANTOM PHASE DISORDER", "ECTOPLASMIC ENERGY DEFICIENCY", "MIRROR PHASE SYNDROME", "PARANORMAL DISTURBANCE SYNDROME", "SPECTRAL ENERGY DEPLETION", "TEMPORAL GHOST DISTORTION"),
  "interpretation": string (2-3 sentences of entertaining supernatural clinical assessment by Dr. Hathi),
  "symptomMatch": number (50-95),
  "spiritPattern": number (50-95),
  "visualEvidence": number (60-98),
  "historicalPattern": number (40-90)
}`,
            },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              spectralDensity: { type: Type.INTEGER },
              shadowStability: { type: Type.INTEGER },
              ectoplasmPattern: { type: Type.STRING },
              anomalyLevel: { type: Type.STRING },
              fictionalCondition: { type: Type.STRING },
              interpretation: { type: Type.STRING },
              symptomMatch: { type: Type.INTEGER },
              spiritPattern: { type: Type.INTEGER },
              visualEvidence: { type: Type.INTEGER },
              historicalPattern: { type: Type.INTEGER },
            },
            required: [
              'spectralDensity',
              'shadowStability',
              'ectoplasmPattern',
              'anomalyLevel',
              'fictionalCondition',
              'interpretation',
            ],
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return {
          spectralDensity: parsed.spectralDensity || 78,
          shadowStability: parsed.shadowStability || 42,
          ectoplasmPattern: parsed.ectoplasmPattern || 'Diffused Phantom Luminescence',
          anomalyLevel: (['LOW', 'MODERATE', 'HIGH', 'CRITICAL'].includes(parsed.anomalyLevel)
            ? parsed.anomalyLevel
            : 'HIGH') as any,
          fictionalCondition: parsed.fictionalCondition || 'PHANTOM PHASE DISORDER',
          interpretation: parsed.interpretation,
          explainability: {
            symptomMatch: parsed.symptomMatch || 84,
            spiritPattern: parsed.spiritPattern || 76,
            visualEvidence: parsed.visualEvidence || 92,
            historicalPattern: parsed.historicalPattern || 68,
          },
        };
      }
    } catch (err) {
      console.warn('[Gemini Vision] Image analysis failed, falling back:', err);
    }
  }

  // Deterministic vision fallback based on hash
  const hash = cleanBase64.length % 5;
  const conditions = [
    {
      condition: 'PHANTOM PHASE DISORDER',
      pattern: 'Luminescent Molecular Dissipation',
      anomaly: 'HIGH' as const,
      interp: 'Spectral distortion detected around the spirit silhouette. The ectoplasmic envelope is fluttering out of phase with physical matter.',
    },
    {
      condition: 'MIRROR PHASE SYNDROME',
      pattern: 'Reflective Polarity Oscillation',
      anomaly: 'MODERATE' as const,
      interp: 'Silver-frequency refraction discovered in the shadow perimeter. The spirit is reflecting optical photons instead of absorbing darkness.',
    },
    {
      condition: 'ECTOPLASMIC ENERGY DEFICIENCY',
      pattern: 'Low-Viscosity Vapor Dispersion',
      anomaly: 'LOW' as const,
      interp: 'Spectral density is thinning noticeably. Spirit core reserves indicate an urgent need for Ectoplasm Plus drops.',
    },
    {
      condition: 'PARANORMAL DISTURBANCE SYNDROME',
      pattern: 'Fractal Resonance Spikes',
      anomaly: 'CRITICAL' as const,
      interp: 'Intense dimensional interference visible in the background aura. Possible secondary poltergeist resonance interfering with spirit equilibrium.',
    },
    {
      condition: 'SPECTRAL ENERGY DEPLETION',
      pattern: 'Cold Luminescence Gradient',
      anomaly: 'MODERATE' as const,
      interp: 'Aura temperature has dropped below zero Kelvin. Spiritual buoyancy is dropping steadily towards floor level.',
    },
  ][hash];

  return {
    spectralDensity: 74 + (hash * 5),
    shadowStability: 38 + (hash * 8),
    ectoplasmPattern: conditions.pattern,
    anomalyLevel: conditions.anomaly,
    fictionalCondition: conditions.condition,
    interpretation: conditions.interp,
    explainability: {
      symptomMatch: 82,
      spiritPattern: 75,
      visualEvidence: 89,
      historicalPattern: 65,
    },
  };
}

/**
 * Local Fallback dialogue generator when Gemini is offline/unreachable
 */
function generateLocalFallbackResponse(
  message: string,
  context?: { midnightMode?: boolean }
): string {
  const lower = message.toLowerCase();

  if (lower.includes('patient 013') || lower.includes('patient #013') || lower.includes('patient 13')) {
    if (lower.includes('why') || lower.includes('what happened') || lower.includes('3:13') || lower.includes('03:13')) {
      return "⚠️ [RESTRICTED FILE 0313_UNSEALED] Dr. Hathi recorded this in the after-hours logbook: 'At 03:13 AM, the spectral barrier dissolved. Some patients simply refuse to pass on.' The classified archive has been marked in your terminal!";
    }
    return "Whispers echo through the clinic... 'Patient #013's file is under maximum security lock by order of Dr. Hathi. It is connected to the mysterious event at 03:13 AM.'";
  }

  if (lower.includes('03:13') || lower.includes('3:13') || lower.includes('midnight')) {
    return "03:13 AM... the Witching Hour of Hathi Clinic! That was the exact time when Dr. Hathi encountered the spirit that couldn't be diagnosed by normal afterlife medicine.";
  }

  if (lower.includes('wall') || lower.includes('pass through')) {
    return "Ah, wall-phasing friction! Dr. Hathi sees this all the time. Your ectoplasmic density has calcified into physical resonance. We recommend a 5-minute vapor sauna and a dose of Ectoplasm Plus.";
  }

  if (lower.includes('mirror') || lower.includes('reflection')) {
    return "Appearing in bathroom mirrors unexpectedly? That's classic Mirror Phase Syndrome! Try avoiding silver-backed glass and consult our Pharmacy for SoulCalm.";
  }

  if (lower.includes('dr. hathi') || lower.includes('hathi') || lower.includes('doctor')) {
    return "Dr. Hansraj Hathi is currently reviewing afterlife emergency charts! His motto: 'Tell me where it hurts... even ghosts deserve gentle care and a healthy spirit!'";
  }

  if (lower.includes('checkup') || lower.includes('check-up') || lower.includes('scan')) {
    return "Ready for your Spirit Scan? Click the 'START GHOST CHECK-UP' button or select your symptoms on the triage board. Dr. Hathi's scanner will measure your soul frequency in seconds!";
  }

  if (lower.includes('pharmacy') || lower.includes('medicine') || lower.includes('treatment')) {
    return "Our Afterlife Pharmacy is stocked with premium fictional elixirs: Ectoplasm Plus, Spiritol, Midnight-X, and Phantom Shield. All guaranteed 100% supernatural!";
  }

  if (context?.midnightMode) {
    return "The midnight mist is thick tonight in Dr. Hathi's clinic... What spectral symptom brings your spirit to our door at this unearthly hour?";
  }

  return "Greetings from Hathi Afterdark! Boo is here to help your spirit feel 100% ethereal again. Tell me: are you having trouble floating, phasing, or keeping your ectoplasm glow steady?";
}
