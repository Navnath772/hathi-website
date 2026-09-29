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

const sessionStore = new Map<string, SecretSessionState>();

export function getOrCreateSessionState(sessionId: string): SecretSessionState {
  if (!sessionStore.has(sessionId)) {
    sessionStore.set(sessionId, {
      sessionId,
      stethoscopeClicks: 0,
      stethoscopeUnlocked: false,
      ghostFollowerFound: false,
      midnightMode: false,
      aiSequenceStep: 0,
      patient013Unlocked: false,
      archiveUnlocked: false,
      secretsFound: [],
      lastUpdated: new Date().toISOString(),
    });
  }
  return sessionStore.get(sessionId)!;
}

export function registerSecretFound(state: SecretSessionState, secretKey: string): void {
  if (!state.secretsFound.includes(secretKey)) {
    state.secretsFound.push(secretKey);
  }
  // If 3 or more secrets found, auto unlock afterlife archive
  if (state.secretsFound.length >= 3) {
    state.archiveUnlocked = true;
  }
  state.lastUpdated = new Date().toISOString();
}

export function handleStethoscopeClick(sessionId: string): {
  clicks: number;
  unlocked: boolean;
  message?: string;
  audioTrigger?: string;
  state: SecretSessionState;
} {
  const state = getOrCreateSessionState(sessionId);
  state.stethoscopeClicks += 1;

  if (state.stethoscopeClicks >= 3 && !state.stethoscopeUnlocked) {
    state.stethoscopeUnlocked = true;
    registerSecretFound(state, 'STETHOSCOPE_DIMENSIONAL_PORTAL');
    return {
      clicks: state.stethoscopeClicks,
      unlocked: true,
      message: "HEARTBEAT DETECTED... WAIT. THIS PATIENT ISN'T ALIVE! PORTAL OPENED.",
      audioTrigger: 'heartbeat_glitch',
      state,
    };
  }

  return {
    clicks: state.stethoscopeClicks,
    unlocked: state.stethoscopeUnlocked,
    message: state.stethoscopeClicks === 1 ? 'Thump... faint ethereal pulse heard.' : 'Thump... thump... frequency is accelerating.',
    audioTrigger: 'heartbeat',
    state,
  };
}

export function handleGhostFollowerClick(sessionId: string): {
  unlocked: boolean;
  message: string;
  state: SecretSessionState;
} {
  const state = getOrCreateSessionState(sessionId);
  if (!state.ghostFollowerFound) {
    state.ghostFollowerFound = true;
    registerSecretFound(state, 'GHOST_FOLLOWER_DISCOVERED');
  }
  return {
    unlocked: true,
    message: "You found me. But I found you first...",
    state,
  };
}

export function handleMidnightModeToggle(sessionId: string, enabled?: boolean): {
  midnightMode: boolean;
  state: SecretSessionState;
} {
  const state = getOrCreateSessionState(sessionId);
  state.midnightMode = typeof enabled === 'boolean' ? enabled : !state.midnightMode;
  if (state.midnightMode) {
    registerSecretFound(state, 'MIDNIGHT_HOUR_313');
  }
  return {
    midnightMode: state.midnightMode,
    state,
  };
}

export function advanceAISecretSequence(
  sessionId: string,
  userMessage: string
): {
  step: number;
  unlockedNow: boolean;
  specialNote?: string;
  state: SecretSessionState;
} {
  const state = getOrCreateSessionState(sessionId);
  const msg = userMessage.toLowerCase();

  const mentions13 = msg.includes('patient 013') || msg.includes('patient #013') || msg.includes('patient 13') || msg.includes('013');
  const mentionsWhy = msg.includes('why') || msg.includes('restricted') || msg.includes('secret') || msg.includes('who is');
  const mentionsTime = msg.includes('03:13') || msg.includes('3:13') || msg.includes('3.13') || msg.includes('what happened');

  let unlockedNow = false;

  if (mentions13 && state.aiSequenceStep === 0) {
    state.aiSequenceStep = 1;
  } else if ((mentionsWhy || mentions13) && state.aiSequenceStep === 1) {
    state.aiSequenceStep = 2;
  } else if ((mentionsTime || (mentions13 && mentionsWhy)) && state.aiSequenceStep >= 2) {
    state.aiSequenceStep = 3;
    if (!state.patient013Unlocked) {
      state.patient013Unlocked = true;
      unlockedNow = true;
      registerSecretFound(state, 'PATIENT_013_UNSEALED');
    }
  }

  return {
    step: state.aiSequenceStep,
    unlockedNow,
    specialNote: state.aiSequenceStep === 3 ? 'PATIENT #013 RESTRICTED ARCHIVE UNSEALED AT 03:13 AM' : undefined,
    state,
  };
}

export function unlockPatient013Directly(sessionId: string): SecretSessionState {
  const state = getOrCreateSessionState(sessionId);
  state.patient013Unlocked = true;
  registerSecretFound(state, 'PATIENT_013_UNSEALED');
  return state;
}

export function resetSessionState(sessionId: string): SecretSessionState {
  const fresh: SecretSessionState = {
    sessionId,
    stethoscopeClicks: 0,
    stethoscopeUnlocked: false,
    ghostFollowerFound: false,
    midnightMode: false,
    aiSequenceStep: 0,
    patient013Unlocked: false,
    archiveUnlocked: false,
    secretsFound: [],
    lastUpdated: new Date().toISOString(),
  };
  sessionStore.set(sessionId, fresh);
  return fresh;
}
