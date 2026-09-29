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

const analytics: AnalyticsRecord = {
  checkupsStarted: 124,
  checkupsCompleted: 119,
  aiMessages: 382,
  imagesAnalyzed: 47,
  voiceInteractions: 29,
  prescriptionsGenerated: 119,
  secretsFound: 18,
  midnightModeUsed: 35,
  patient013Unlocked: 13,
};

const INITIAL_PATIENTS: PatientRecord[] = [
  {
    patientId: '#001',
    ghostName: 'Sir Reginald Ecto',
    condition: 'Victorian Manor Phasing Resistance',
    diagnosis: 'PHANTOM PHASE DISORDER',
    spiritEnergy: 72,
    ectoplasmStability: 85,
    phaseStability: 28,
    treatment: 'Ectoplasm Plus Vapor Inhalations',
    status: 'Under Observation',
    lastVisit: '2 nights ago',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    patientId: '#002',
    ghostName: 'Lady Beatrice Whisper',
    condition: 'Chandelier Haunting Vertigo',
    diagnosis: 'SPECTRAL ENERGY DEPLETION',
    spiritEnergy: 41,
    ectoplasmStability: 60,
    phaseStability: 75,
    treatment: 'Cryogenic Moonlight Tonic',
    status: 'Stable',
    lastVisit: 'Yesterday',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    patientId: '#003',
    ghostName: 'Casper Vance',
    condition: 'Vanishing Glow Malaise',
    diagnosis: 'ECTOPLASMIC ENERGY DEFICIENCY',
    spiritEnergy: 34,
    ectoplasmStability: 42,
    phaseStability: 68,
    treatment: 'Spiritol Ultra Elixir',
    status: 'Critical',
    lastVisit: '3 nights ago',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    patientId: '#004',
    ghostName: 'Baron Von Polter',
    condition: 'Kitchen Teacup Throwing Fatigue',
    diagnosis: 'PARANORMAL DISTURBANCE SYNDROME',
    spiritEnergy: 88,
    ectoplasmStability: 79,
    phaseStability: 64,
    treatment: 'Phantom Shield Aura Barrier',
    status: 'Stable',
    lastVisit: '4 nights ago',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    patientId: '#005',
    ghostName: 'Madame Silver-Glass',
    condition: 'Antique Mirror Entrapment',
    diagnosis: 'MIRROR PHASE SYNDROME',
    spiritEnergy: 65,
    ectoplasmStability: 58,
    phaseStability: 32,
    treatment: 'SoulCalm Reflective Paste',
    status: 'Under Observation',
    lastVisit: '5 nights ago',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    patientId: '#006',
    ghostName: 'Captain Gloom Tide',
    condition: 'Fog Ship Fog Dissipation',
    diagnosis: 'ECTOPLASMIC ENERGY DEFICIENCY',
    spiritEnergy: 52,
    ectoplasmStability: 48,
    phaseStability: 80,
    treatment: 'Spiritol Drops & Brine Vapors',
    status: 'Stable',
    lastVisit: '6 nights ago',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 518400000).toISOString(),
  },
  {
    patientId: '#007',
    ghostName: 'Little Timmy Phantom',
    condition: 'Inability to Make Creaking Floor Sounds',
    diagnosis: 'PHANTOM PHASE DISORDER',
    spiritEnergy: 82,
    ectoplasmStability: 91,
    phaseStability: 39,
    treatment: 'Ectoplasm Plus Drops',
    status: 'Stable',
    lastVisit: '1 week ago',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    patientId: '#008',
    ghostName: 'The Screaming Duchess',
    condition: 'Harmonic Vocal Distortion in Clocktower',
    diagnosis: 'PARANORMAL DISTURBANCE SYNDROME',
    spiritEnergy: 79,
    ectoplasmStability: 65,
    phaseStability: 58,
    treatment: 'SoulCalm Throat Mist',
    status: 'Under Observation',
    lastVisit: '1 week ago',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 691200000).toISOString(),
  },
  {
    patientId: '#009',
    ghostName: 'Professor Shade',
    condition: 'Library Book Hovering Shivers',
    diagnosis: 'SPECTRAL ENERGY DEPLETION',
    spiritEnergy: 38,
    ectoplasmStability: 44,
    phaseStability: 62,
    treatment: 'Midnight-X Concentrated Brew',
    status: 'Critical',
    lastVisit: '8 nights ago',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 777600000).toISOString(),
  },
  {
    patientId: '#010',
    ghostName: 'Archie Chains',
    condition: 'Rattling Resonance Overload',
    diagnosis: 'PARANORMAL DISTURBANCE SYNDROME',
    spiritEnergy: 85,
    ectoplasmStability: 76,
    phaseStability: 71,
    treatment: 'Phantom Shield Grounding Wire',
    status: 'Stable',
    lastVisit: '9 nights ago',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 864000000).toISOString(),
  },
  {
    patientId: '#011',
    ghostName: 'Constable Fogarty',
    condition: 'Afterlife Midnight Patrol Drift',
    diagnosis: 'TEMPORAL GHOST DISTORTION',
    spiritEnergy: 67,
    ectoplasmStability: 63,
    phaseStability: 54,
    treatment: 'Midnight-X Chrono-Stabilizer',
    status: 'Under Observation',
    lastVisit: '10 nights ago',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 950400000).toISOString(),
  },
  {
    patientId: '#012',
    ghostName: 'Duchess Lucinda of the Mist',
    condition: 'Ballroom Wall Boundary Collision',
    diagnosis: 'PHANTOM PHASE DISORDER',
    spiritEnergy: 74,
    ectoplasmStability: 82,
    phaseStability: 33,
    treatment: 'Ectoplasm Plus Daily Dose',
    status: 'Stable',
    lastVisit: '11 nights ago',
    doctor: 'Dr. Hansraj Hathi',
    createdAt: new Date(Date.now() - 1036800000).toISOString(),
  },
  {
    patientId: '#013',
    ghostName: '[CLASSIFIED / THE 03:13 AM SPIRIT]',
    condition: 'UNKNOWN SUPERNATURAL ANOMALY',
    diagnosis: 'DIMENSIONAL TIME-RIFT SYNDROME',
    spiritEnergy: 99,
    ectoplasmStability: 13,
    phaseStability: 3,
    treatment: 'DO NOT ADMINISTER STANDARD MEDICINES',
    status: 'Unknown',
    lastVisit: '03:13 AM (The Incident)',
    doctor: 'Dr. Hansraj Hathi (Solo Session)',
    isClassified: true,
    classifiedNotes:
      'THIS RECORD SHOULD NOT EXIST. Patient arrived during a severe dimensional rupture at 03:13 AM. Standard stethoscopes recorded an impossible heartbeat. The spirit refused crossing over, stating: "I am the clinic\'s memory." Dr. Hathi sealed this chart under Level 4 Afterlife Encryption.',
    createdAt: new Date(Date.now() - 1209600000).toISOString(),
  },
];

const patientStore: PatientRecord[] = [...INITIAL_PATIENTS];
const prescriptionsStore = new Map<string, PrescriptionRecord>();

export function getPatients(patient013Unlocked = false): PatientRecord[] {
  return patientStore.map((p) => {
    if (p.patientId === '#013' && !patient013Unlocked) {
      return {
        ...p,
        ghostName: 'RESTRICTED ACCESS',
        condition: 'CLASSIFIED CASE FILE',
        diagnosis: 'ENCRYPTED',
        treatment: 'ACCESS DENIED',
        status: 'Unknown',
        classifiedNotes: 'RESTRICTED ARCHIVE. LEVEL 4 SECURITY CLEARANCE REQUIRED.',
      };
    }
    return p;
  });
}

export function getPatientById(id: string, patient013Unlocked = false): PatientRecord | undefined {
  const p = patientStore.find((item) => item.patientId.toLowerCase() === id.toLowerCase());
  if (!p) return undefined;
  if (p.patientId === '#013' && !patient013Unlocked) {
    return {
      ...p,
      ghostName: 'RESTRICTED ACCESS',
      condition: 'CLASSIFIED CASE FILE',
      diagnosis: 'ENCRYPTED',
      treatment: 'ACCESS DENIED',
      status: 'Unknown',
      classifiedNotes: 'RESTRICTED ARCHIVE. LEVEL 4 SECURITY CLEARANCE REQUIRED.',
    };
  }
  return p;
}

export function savePatientRecord(record: Omit<PatientRecord, 'createdAt'>): PatientRecord {
  const newRecord: PatientRecord = {
    ...record,
    createdAt: new Date().toISOString(),
  };
  patientStore.unshift(newRecord);
  analytics.checkupsCompleted += 1;
  return newRecord;
}

export function savePrescription(p: PrescriptionRecord): void {
  prescriptionsStore.set(p.rxId, p);
  analytics.prescriptionsGenerated += 1;
}

export function getPrescription(id: string): PrescriptionRecord | undefined {
  return prescriptionsStore.get(id);
}

export function getAnalytics(): AnalyticsRecord {
  return { ...analytics };
}

export function incrementAnalytics(metric: keyof AnalyticsRecord, amount = 1): void {
  analytics[metric] += amount;
}
