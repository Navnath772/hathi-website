import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import {
  generateGhostResponse,
  analyzeGhostImageWithGemini,
} from './server/services/gemini.js';
import { runSpiritDiagnosis } from './server/services/diagnosisEngine.js';
import {
  getOrCreateSessionState,
  handleStethoscopeClick,
  handleGhostFollowerClick,
  handleMidnightModeToggle,
  advanceAISecretSequence,
  unlockPatient013Directly,
  resetSessionState,
} from './server/services/secretEngine.js';
import {
  getPatients,
  getPatientById,
  savePatientRecord,
  savePrescription,
  getPrescription,
  getAnalytics,
  incrementAnalytics,
} from './server/services/database.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();

  // Parse JSON payloads up to 15MB for ghost evidence base64 data
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Helper to extract session ID from header or body
  const getSessionId = (req: Request): string => {
    return (
      (req.headers['x-session-id'] as string) ||
      req.body?.sessionId ||
      'hathi-session-default'
    );
  };

  // -------------------------------------------------------------
  // API ROUTES
  // -------------------------------------------------------------

  // GET /api/health - System check & AI Core status
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ONLINE',
      clinic: 'Hathi Afterdark',
      physician: 'Dr. Hansraj Hathi',
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      capabilities: [
        'Ghost Check-Up',
        'Spirit Diagnostics',
        'Boo AI Chat',
        'Multimodal Vision',
        'Voice Interaction',
        'Secret Engine',
        'Patient 013 Classified Archive',
      ],
    });
  });

  // POST /api/session - Retrieve or initialize session state
  app.post('/api/session', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const secretState = getOrCreateSessionState(sessionId);
    res.json({
      sessionId,
      secretState,
      analytics: getAnalytics(),
    });
  });

  // POST /api/chat - Boo AI conversation
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      const { message, history, context } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message text required' });
      }

      incrementAnalytics('aiMessages', 1);

      // Check for secret progression triggers in conversation
      const secretOutcome = advanceAISecretSequence(sessionId, message);

      // Generate response via Gemini (with local fallback if offline)
      const aiReply = await generateGhostResponse(
        message,
        history || [],
        context
      );

      // If unlocked in this turn, prepend subtle glitch indicator
      let finalReply = aiReply;
      if (secretOutcome.unlockedNow) {
        finalReply = `⚠️ [GLITCH :: 03:13 AM TEMPORAL RIFT DETECTED]\n` +
          `"...The clinic archives tremble. You've accessed the restricted frequency."\n\n` +
          aiReply;
      }

      res.json({
        reply: finalReply,
        secretOutcome,
        sessionState: secretOutcome.state,
      });
    } catch (err: any) {
      console.error('[API /api/chat] Error:', err);
      res.status(500).json({
        reply: "👻 Boo is having trouble crossing dimensions right now... Please tell Dr. Hathi your symptoms in person!",
        error: err.message,
      });
    }
  });

  // POST /api/diagnosis - Run Spirit Check-up
  app.post('/api/diagnosis', async (req: Request, res: Response) => {
    try {
      const { ghostName, symptoms, freeText, evidenceData, evidenceMime } = req.body;
      incrementAnalytics('checkupsStarted', 1);

      const result = await runSpiritDiagnosis({
        ghostName,
        symptoms: Array.isArray(symptoms) ? symptoms : [],
        freeText,
        evidenceData,
        evidenceMime,
      });

      res.json(result);
    } catch (err: any) {
      console.error('[API /api/diagnosis] Error:', err);
      res.status(500).json({
        error: 'Spectral diagnostic beam interrupted. Please re-align spirit antenna.',
      });
    }
  });

  // POST /api/vision - Analyze Paranormal Evidence image
  app.post('/api/vision', async (req: Request, res: Response) => {
    try {
      const { imageBase64, mimeType, description } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'Ghost evidence image base64 required' });
      }

      incrementAnalytics('imagesAnalyzed', 1);

      const analysis = await analyzeGhostImageWithGemini(
        imageBase64,
        mimeType || 'image/png',
        description
      );

      res.json(analysis);
    } catch (err: any) {
      console.error('[API /api/vision] Error:', err);
      res.status(500).json({
        error: 'Spectral evidence temporarily unavailable. Using local spirit scanner.',
      });
    }
  });

  // POST /api/voice - Process voice transcript & return Boo reaction
  app.post('/api/voice', async (req: Request, res: Response) => {
    try {
      const sessionId = getSessionId(req);
      const { transcript, context } = req.body;

      if (!transcript) {
        return res.status(400).json({ error: 'Voice transcript required' });
      }

      incrementAnalytics('voiceInteractions', 1);

      const secretOutcome = advanceAISecretSequence(sessionId, transcript);
      const reply = await generateGhostResponse(transcript, [], context);

      res.json({
        transcript,
        reply,
        secretOutcome,
      });
    } catch (err: any) {
      console.error('[API /api/voice] Error:', err);
      res.status(500).json({ error: "Boo couldn't hear the spirit signal clearly." });
    }
  });

  // POST /api/prescription - Save & format official ghost prescription
  app.post('/api/prescription', (req: Request, res: Response) => {
    try {
      const { patientId, ghostName, diagnosis, medication, dosage, instructions, followUp } = req.body;

      const rxId = `RX-HATHI-${Math.floor(100000 + Math.random() * 900000)}`;
      const prescription = {
        rxId,
        patientId: patientId || '#NEW-GHOST',
        ghostName: ghostName || 'Anonymous Spirit',
        diagnosis: diagnosis || 'PHANTOM PHASE DISORDER',
        medication: medication || 'ECTOPLASM PLUS',
        dosage: dosage || '5 Spirit Drops diluted in moonwater',
        instructions: instructions || 'Consume under twilight before midnight. Avoid high-frequency silver mirrors.',
        followUp: followUp || '7 nights at Dr. Hathi Supernatural Clinic',
        prescribedBy: 'Dr. Hansraj Hathi, Chief Physician of the Afterlife',
        createdAt: new Date().toISOString(),
        spiritSeal: 'SEALED_BY_DR_HATHI_ETH_2026',
      };

      savePrescription(prescription);
      res.json(prescription);
    } catch (err: any) {
      console.error('[API /api/prescription] Error:', err);
      res.status(500).json({ error: 'Failed to imprint ghost prescription seal' });
    }
  });

  // GET /api/prescriptions/:id
  app.get('/api/prescriptions/:id', (req: Request, res: Response) => {
    const rx = getPrescription(req.params.id);
    if (!rx) {
      return res.status(404).json({ error: 'Prescription record not found in afterlife dispensary' });
    }
    res.json(rx);
  });

  // GET /api/patients - Get patient charts (#001 to #012, and #013 if unlocked)
  app.get('/api/patients', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const secretState = getOrCreateSessionState(sessionId);
    const patients = getPatients(secretState.patient013Unlocked);
    res.json({
      patients,
      patient013Unlocked: secretState.patient013Unlocked,
    });
  });

  // GET /api/patients/:id - Single patient record
  app.get('/api/patients/:id', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const secretState = getOrCreateSessionState(sessionId);
    const patient = getPatientById(req.params.id, secretState.patient013Unlocked);
    if (!patient) {
      return res.status(404).json({ error: 'Patient file not found in clinic records' });
    }
    res.json(patient);
  });

  // POST /api/patients - Save new patient record from check-up
  app.post('/api/patients', (req: Request, res: Response) => {
    try {
      const record = req.body;
      const saved = savePatientRecord(record);
      res.json(saved);
    } catch (err: any) {
      console.error('[API /api/patients] Error:', err);
      res.status(500).json({ error: 'The ghost records are temporarily drifting' });
    }
  });

  // POST /api/secrets/stethoscope - Stethoscope interactive click
  app.post('/api/secrets/stethoscope', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const outcome = handleStethoscopeClick(sessionId);
    if (outcome.unlocked) {
      incrementAnalytics('secretsFound', 1);
    }
    res.json(outcome);
  });

  // POST /api/secrets/ghost-follower - Ghost follower click
  app.post('/api/secrets/ghost-follower', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const outcome = handleGhostFollowerClick(sessionId);
    incrementAnalytics('secretsFound', 1);
    res.json(outcome);
  });

  // POST /api/secrets/midnight - Midnight Mode toggle
  app.post('/api/secrets/midnight', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const { enabled } = req.body;
    const outcome = handleMidnightModeToggle(sessionId, enabled);
    incrementAnalytics('midnightModeUsed', 1);
    res.json(outcome);
  });

  // POST /api/secrets/unlock - Direct unlock for demo or secret sequence
  app.post('/api/secrets/unlock', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const state = unlockPatient013Directly(sessionId);
    incrementAnalytics('patient013Unlocked', 1);
    res.json(state);
  });

  // GET /api/secrets/status - Current secret progress
  app.get('/api/secrets/status', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const state = getOrCreateSessionState(sessionId);
    res.json(state);
  });

  // POST /api/reset - Reset session and secret progress
  app.post('/api/reset', (req: Request, res: Response) => {
    const sessionId = getSessionId(req);
    const state = resetSessionState(sessionId);
    res.json({ message: 'Session reset successfully', state });
  });

  // GET /api/analytics - Hackathon judges metric dashboard
  app.get('/api/analytics', (req: Request, res: Response) => {
    res.json(getAnalytics());
  });

  // -------------------------------------------------------------
  // VITE DEV MIDDLEWARE OR STATIC PRODUCTION SERVE
  // -------------------------------------------------------------
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`👻 Hathi Afterdark Clinic online at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Hathi Afterdark server:', err);
  process.exit(1);
});
