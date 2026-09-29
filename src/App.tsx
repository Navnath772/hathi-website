import React, { useState, useEffect } from 'react';
import {
  DiagnosisOutput,
  PatientRecord,
  PrescriptionRecord,
  SecretSessionState,
  AnalyticsRecord,
} from './types';
import { api } from './services/api';
import { audio } from './services/audio';

// Components
import { Navbar } from './components/Navbar';
import { IntroExperience } from './components/IntroExperience';
import { Hero } from './components/Hero';
import { AIStatusPanel } from './components/AIStatusPanel';
import { DrHathi } from './components/DrHathi';
import { GhostCheckup } from './components/GhostCheckup';
import { SpiritScannerModal } from './components/SpiritScannerModal';
import { DiagnosisResult } from './components/DiagnosisResult';
import { GhostPharmacy } from './components/GhostPharmacy';
import { PrescriptionModal } from './components/PrescriptionModal';
import { PatientRecords } from './components/PatientRecords';
import { Patient013Modal } from './components/Patient013Modal';
import { BooChatDrawer } from './components/BooChatDrawer';
import { GhostFollower } from './components/GhostFollower';
import { AfterlifeArchiveModal } from './components/AfterlifeArchiveModal';
import { JudgeDashboardModal } from './components/JudgeDashboardModal';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

export function App() {
  // Intro & Audio
  const [introVisible, setIntroVisible] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  // Clinic Theme Mode
  const [midnightMode, setMidnightMode] = useState<boolean>(false);

  // Session & Secrets
  const [secretState, setSecretState] = useState<SecretSessionState>({
    sessionId: api.getSessionId(),
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

  const [analytics, setAnalytics] = useState<AnalyticsRecord>({
    checkupsStarted: 124,
    checkupsCompleted: 119,
    aiMessages: 382,
    imagesAnalyzed: 47,
    voiceInteractions: 29,
    prescriptionsGenerated: 119,
    secretsFound: 18,
    midnightModeUsed: 35,
    patient013Unlocked: 13,
  });

  // Checkup & Diagnosis
  const [scannerOpen, setScannerOpen] = useState<boolean>(false);
  const [scannerData, setScannerData] = useState<{
    ghostName: string;
    symptoms: string[];
    freeText: string;
    evidenceData?: string;
    evidenceMime?: string;
  } | null>(null);

  const [currentDiagnosis, setCurrentDiagnosis] = useState<DiagnosisOutput | null>(null);
  const [recordSaved, setRecordSaved] = useState<boolean>(false);

  // Prescription Modal
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState<boolean>(false);
  const [currentPrescription, setCurrentPrescription] = useState<PrescriptionRecord | null>(null);

  // Patient Records
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [selectedPatientModal, setSelectedPatientModal] = useState<PatientRecord | null>(null);
  const [patient013ModalOpen, setPatient013ModalOpen] = useState<boolean>(false);

  // Modals & Drawers
  const [booChatOpen, setBooChatOpen] = useState<boolean>(false);
  const [judgeModalOpen, setJudgeModalOpen] = useState<boolean>(false);
  const [archiveModalOpen, setArchiveModalOpen] = useState<boolean>(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync body theme
  useEffect(() => {
    if (midnightMode) {
      document.body.classList.add('midnight-mode');
    } else {
      document.body.classList.remove('midnight-mode');
    }
  }, [midnightMode]);

  // Load Session and Patients
  const refreshData = async () => {
    try {
      const sess = await api.initSession();
      setSecretState(sess.secretState);
      setMidnightMode(sess.secretState.midnightMode);
      setAnalytics(sess.analytics);

      const patRes = await api.getPatients();
      setPatients(patRes.patients);
    } catch (err) {
      console.warn('Init error, using defaults:', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Midnight Mode Toggle
  const handleToggleMidnight = async () => {
    try {
      const nextState = !midnightMode;
      setMidnightMode(nextState);
      const res = await api.toggleMidnightMode(nextState);
      setSecretState(res.state);
      if (nextState) {
        audio.playHeartbeat(1.4);
        showToast("🌙 Midnight Mode Engaged: Dimensional barrier thinned to 03:13 AM!");
      }
    } catch (err) {
      console.warn('Midnight toggle error:', err);
    }
  };

  // Stethoscope Click
  const handleStethoscopeClick = async () => {
    try {
      const res = await api.clickStethoscope();
      setSecretState(res.state);
      if (res.unlocked) {
        showToast("⚡ STETHOSCOPE SECRET: Dimensional rift detected! Patient isn't alive!");
        // Refresh patients to reflect unlock if archive influenced
        const patRes = await api.getPatients();
        setPatients(patRes.patients);
      }
    } catch (err) {
      console.warn('Stethoscope error:', err);
    }
  };

  // Ghost Follower Click
  const handleGhostFollowerClick = async () => {
    try {
      const res = await api.clickGhostFollower();
      setSecretState(res.state);
      showToast("👻 GHOST FOLLOWER: 'You found me. But I found you first...'");
    } catch (err) {
      console.warn('Follower error:', err);
    }
  };

  // Start Spirit Scanner
  const handleStartScanner = (data: {
    ghostName: string;
    symptoms: string[];
    freeText: string;
    evidenceData?: string;
    evidenceMime?: string;
  }) => {
    setScannerData(data);
    setScannerOpen(true);
  };

  // Scanner Completes -> Fetch AI Diagnosis
  const handleScanComplete = async () => {
    setScannerOpen(false);
    if (!scannerData) return;

    try {
      const result = await api.runDiagnosis({
        ghostName: scannerData.ghostName,
        symptoms: scannerData.symptoms,
        freeText: scannerData.freeText,
        evidenceData: scannerData.evidenceData,
        evidenceMime: scannerData.evidenceMime,
      });

      setCurrentDiagnosis(result);
      setRecordSaved(false);

      // Auto generate prescription
      const rx = await api.createPrescription({
        patientId: `#GHOST-${Math.floor(100 + Math.random() * 900)}`,
        ghostName: result.ghostName,
        diagnosis: result.diagnosis,
        medication: result.fictionalMedication,
        instructions: result.fictionalTreatment,
        followUp: result.followUp,
      });
      setCurrentPrescription(rx);

      // Scroll to diagnosis result
      setTimeout(() => {
        const el = document.getElementById('diagnosis-result');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err) {
      console.warn('Diagnosis error:', err);
      showToast("Diagnostic beam interrupted. Please retry.");
    }
  };

  // Save Record
  const handleSaveRecord = async () => {
    if (!currentDiagnosis || recordSaved) return;
    try {
      const newRec = await api.savePatientRecord({
        patientId: `#${Math.floor(100 + Math.random() * 900)}`,
        ghostName: currentDiagnosis.ghostName,
        condition: currentDiagnosis.symptoms?.join(', ') || 'Supernatural Malaise',
        diagnosis: currentDiagnosis.diagnosis,
        spiritEnergy: currentDiagnosis.spiritEnergy,
        ectoplasmStability: currentDiagnosis.ectoplasmStability,
        phaseStability: currentDiagnosis.phaseStability,
        treatment: currentDiagnosis.fictionalMedication,
        status: currentDiagnosis.severity === 'CRITICAL' ? 'Critical' : 'Under Observation',
        lastVisit: 'Just now',
        doctor: 'Dr. Hansraj Hathi',
      } as any);

      setRecordSaved(true);
      showToast("✓ Patient record archived in Dr. Hathi's Afterlife Database!");
      // Refresh patient list
      const patRes = await api.getPatients();
      setPatients(patRes.patients);
    } catch (err) {
      console.warn('Save record error:', err);
    }
  };

  // Inspect Patient 013
  const handleInspect013 = () => {
    audio.playClick();
    if (secretState.patient013Unlocked) {
      audio.playHeartbeat(1.3);
    } else {
      audio.playGlitch();
    }
    setPatient013ModalOpen(true);
  };

  // Attempt unlock Patient 013 manually
  const handleAttemptUnlock013 = async () => {
    try {
      audio.playGlitch();
      const updated = await api.unlockPatient013();
      setSecretState(updated);
      showToast("⚠️ CLASSIFIED OVERRIDE: Level 4 Encryption Bypassed!");
      const patRes = await api.getPatients();
      setPatients(patRes.patients);
    } catch (err) {
      console.warn('Unlock error:', err);
    }
  };

  // 90-Second Demo Automation
  const handleRunDemo = async () => {
    audio.playChime();
    showToast("⚡ DEMO AUTOMATION STARTED: Simulating patient BOO-013...");

    // Step 1: Open scanner with sample patient
    handleStartScanner({
      ghostName: 'BOO-013',
      symptoms: ["Can't pass through walls", "Strange midnight symptoms"],
      freeText: "Dr. Hathi, I can't pass through walls at 03:13 AM! My ectoplasm vibrates whenever I touch brick.",
    });

    // Step 2: Unlock Patient 013 and secret progress
    try {
      const updated = await api.unlockPatient013();
      setSecretState(updated);
      const patRes = await api.getPatients();
      setPatients(patRes.patients);
    } catch (e) {
      // ignore
    }
  };

  // Reset Experience
  const handleResetExperience = async () => {
    try {
      const res = await api.resetSession();
      setSecretState(res.state);
      setMidnightMode(false);
      setCurrentDiagnosis(null);
      setCurrentPrescription(null);
      setRecordSaved(false);
      const patRes = await api.getPatients();
      setPatients(patRes.patients);
      showToast("Clinic session and secrets reset to default state.");
    } catch (e) {
      console.warn('Reset error:', e);
    }
  };

  const patient013Data = patients.find((p) => p.patientId === '#013') || {
    patientId: '#013',
    ghostName: 'RESTRICTED ACCESS',
    condition: 'CLASSIFIED CASE FILE',
    diagnosis: 'ENCRYPTED',
    treatment: 'ACCESS DENIED',
    spiritEnergy: 99,
    ectoplasmStability: 13,
    phaseStability: 3,
    status: 'Unknown',
    lastVisit: '03:13 AM',
    doctor: 'Dr. Hansraj Hathi',
  };

  return (
    <div className="min-vh-100 bg-dark-clinic text-light medical-grid-bg position-relative">
      {/* Intro Experience */}
      {introVisible && (
        <IntroExperience
          onComplete={() => setIntroVisible(false)}
          onEnableSound={() => {
            setSoundEnabled(true);
            audio.setSoundEnabled(true);
          }}
        />
      )}

      {/* Glass Navbar */}
      <Navbar
        midnightMode={midnightMode}
        onToggleMidnight={handleToggleMidnight}
        onOpenBoo={() => setBooChatOpen(true)}
        onOpenJudge={() => setJudgeModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          const next = !soundEnabled;
          setSoundEnabled(next);
          audio.setSoundEnabled(next);
        }}
        secretsCount={secretState.secretsFound.length}
        totalSecrets={4}
      />

      {/* Floating Ghost Cursor Follower (Secret #4) */}
      <GhostFollower
        followerDiscovered={secretState.ghostFollowerFound}
        onDiscover={handleGhostFollowerClick}
      />

      {/* Main Page Content */}
      <main>
        {/* Hero Section */}
        <Hero
          onStartCheckup={() => {
            const el = document.getElementById('check-up');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onMeetDoctor={() => {
            const el = document.getElementById('dr-hathi');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onRunDemo={handleRunDemo}
        />

        {/* AI Status Telemetry Bar */}
        <AIStatusPanel onOpenJudge={() => setJudgeModalOpen(true)} />

        {/* Dr. Hathi Chief Physician & Stethoscope Secret */}
        <DrHathi
          onStartConsultation={() => {
            const el = document.getElementById('check-up');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onStethoscopeClick={handleStethoscopeClick}
          stethoscopeUnlocked={secretState.stethoscopeUnlocked}
        />

        {/* Ghost Check-Up Form */}
        <GhostCheckup onStartScanner={handleStartScanner} />

        {/* Diagnosis Result Section (if diagnosed) */}
        {currentDiagnosis && (
          <DiagnosisResult
            diagnosis={currentDiagnosis}
            onViewPrescription={() => setPrescriptionModalOpen(true)}
            onAskBoo={(diag) => {
              setBooChatOpen(true);
            }}
            onSaveRecord={handleSaveRecord}
            recordSaved={recordSaved}
          />
        )}

        {/* Ghost Pharmacy */}
        <GhostPharmacy
          onSelectMedication={(medName) => {
            showToast(`Added ${medName} to Afterlife Consultation plan.`);
          }}
        />

        {/* Patient Records Dashboard */}
        <PatientRecords
          patients={patients}
          patient013Unlocked={secretState.patient013Unlocked}
          onSelectPatient={(patient) => setSelectedPatientModal(patient)}
          onInspect013={handleInspect013}
        />

        {/* Origin & Pillars Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenJudge={() => setJudgeModalOpen(true)}
        onOpenArchive={() => setArchiveModalOpen(true)}
        archiveUnlocked={secretState.archiveUnlocked}
      />

      {/* Floating Boo AI Trigger Button (Bottom Right) */}
      {!booChatOpen && (
        <button
          onClick={() => {
            audio.playChime();
            setBooChatOpen(true);
          }}
          className="btn glow-btn-primary position-fixed rounded-circle d-flex align-items-center justify-content-center shadow-lg float-ghost"
          style={{
            bottom: '24px',
            right: '24px',
            width: '58px',
            height: '58px',
            zIndex: 1040,
            border: '2px solid var(--ghost-glow)',
          }}
          title="Talk to Boo AI & Discover Supernatural Secrets"
        >
          <span className="fs-3">👻</span>
        </button>
      )}

      {/* Spirit Scanner Cinematic Overlay */}
      <SpiritScannerModal
        isOpen={scannerOpen}
        onScanComplete={handleScanComplete}
        ghostName={scannerData?.ghostName || 'Anonymous Spirit'}
      />

      {/* Prescription Sheet Modal */}
      {currentPrescription && (
        <PrescriptionModal
          isOpen={prescriptionModalOpen}
          onClose={() => setPrescriptionModalOpen(false)}
          prescription={currentPrescription}
          onNewCheckup={() => {
            setPrescriptionModalOpen(false);
            const el = document.getElementById('check-up');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onSaveRecord={handleSaveRecord}
          isSaved={recordSaved}
        />
      )}

      {/* Patient #013 Classified Modal (Secret Wild Card) */}
      <Patient013Modal
        isOpen={patient013ModalOpen}
        onClose={() => setPatient013ModalOpen(false)}
        patient={patient013Data}
        isUnlocked={secretState.patient013Unlocked}
        onAttemptUnlock={handleAttemptUnlock013}
      />

      {/* Generic Patient Chart Modal */}
      {selectedPatientModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ zIndex: 2250, backgroundColor: 'rgba(3, 4, 8, 0.9)', backdropFilter: 'blur(16px)' }}
        >
          <div className="glass-panel p-4 p-md-5 position-relative" style={{ maxWidth: '580px', width: '100%' }}>
            <div className="d-flex justify-content-between align-items-start border-bottom border-secondary pb-3 mb-3">
              <div>
                <span className="font-mono text-ghost small fw-bold">{selectedPatientModal.patientId}</span>
                <h4 className="font-heading fs-4 fw-bold text-light mb-0">{selectedPatientModal.ghostName}</h4>
              </div>
              <span className="badge bg-info text-dark">{selectedPatientModal.status}</span>
            </div>
            <div className="font-mono small text-light mb-3">
              <p><strong>Primary Condition:</strong> {selectedPatientModal.condition}</p>
              <p><strong>Diagnosis:</strong> <span className="text-info">{selectedPatientModal.diagnosis}</span></p>
              <p><strong>Prescribed Remedy:</strong> {selectedPatientModal.treatment}</p>
              <p><strong>Attending Physician:</strong> {selectedPatientModal.doctor}</p>
              <p className="text-muted"><strong>Last Afterlife Visit:</strong> {selectedPatientModal.lastVisit}</p>
            </div>
            <div className="text-end pt-2 border-top border-secondary">
              <button
                onClick={() => setSelectedPatientModal(null)}
                className="btn btn-outline-light font-mono small px-4 py-2"
              >
                Close Chart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Boo AI Chat Drawer */}
      <BooChatDrawer
        isOpen={booChatOpen}
        onClose={() => setBooChatOpen(false)}
        onOpenCheckup={() => {
          const el = document.getElementById('check-up');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenRecords={() => {
          const el = document.getElementById('patients');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenPharmacy={() => {
          const el = document.getElementById('pharmacy');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSecretUnlocked={(secretKey) => {
          showToast("⚠️ CLASSIFIED ARCHIVE UNSEALED: Check Patient #013 in the records terminal!");
          refreshData();
        }}
        midnightMode={midnightMode}
        currentDiagnosis={currentDiagnosis?.diagnosis}
      />

      {/* Judge Mode & AI Architecture Panel */}
      <JudgeDashboardModal
        isOpen={judgeModalOpen}
        onClose={() => setJudgeModalOpen(false)}
        analytics={analytics}
        secretState={secretState}
        onRunDemo={handleRunDemo}
        onResetExperience={handleResetExperience}
      />

      {/* Afterlife Archive Modal ("YOU FOUND WHAT WAS HIDDEN") */}
      <AfterlifeArchiveModal
        isOpen={archiveModalOpen}
        onClose={() => setArchiveModalOpen(false)}
        secretsCount={secretState.secretsFound.length}
        totalSecrets={4}
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div
          className="position-fixed top-0 start-50 translate-middle-x mt-4 p-3 glass-panel animate-fade-in font-mono small text-ghost fw-bold text-center"
          style={{
            zIndex: 3000,
            maxWidth: '90%',
            border: '1px solid var(--ghost-glow)',
            boxShadow: '0 0 30px rgba(185, 247, 255, 0.4)',
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
export default App;
