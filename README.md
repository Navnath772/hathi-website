# Hathi Afterdark — Supernatural Healthcare for the Afterlife

> *"Even ghosts need a doctor."*  
> **Supernatural Healthcare for the Afterlife**

Built for the Google AI Studio Hackathon, **Hathi Afterdark** is a production-grade, full-stack, AI-powered supernatural clinic. Inspired by the immortal compassion of **Dr. Hansraj Hathi ("Chief Physician of the Afterlife")**, this application combines cinematic darkness, generative AI with **Gemini 3.8 Flash**, multimodal ghost evidence vision, real-time voice interaction, a 7-step Spirit Scanner, and an intricate state-driven **Secret Engine (The Wild Card: Patient #013 & The 03:13 AM Incident)**.

---

## 👻 1. The Challenge & Creative Concept

- **Character:** Dr. Hansraj Hathi / Hathi Clinic — The warm, genial doctor whose famous phrase *"Tell me where it hurts... Sahi baat hai!"* has crossed dimensional thresholds to heal lost souls.
- **Theme:** Ghosts & Paranormal Ailments — Fictional conditions like *Phantom Phase Disorder* (inability to pass through walls), *Ectoplasmic Energy Deficiency*, *Mirror Phase Syndrome*, and *Temporal Ghost Distortions*.
- **Wild Card ("Hide Something Special"):** A hidden mystery system featuring **Patient #013**, the **03:13 AM witching hour**, interactive stethoscope auscultation, cursor ghost followers, and the classified **Afterlife Archive** with the message: *"YOU FOUND WHAT WAS HIDDEN."*

---

## 🌟 2. Key Features

1. **Dr. Hansraj Hathi Clinic & Interactive Stethoscope (Secret #3):**
   - Chief Physician profile and famous quote.
   - Interactive stethoscope that detects an impossible biological heartbeat when clicked 3 times, opening a dimensional rift!
2. **Ghost Check-Up & Multimodal Triage:**
   - Multi-symptom selector (wall-passing resistance, mirror glitches, ectoplasmic thinning, etc.).
   - Natural language description synthesized with Gemini 3.8 Flash.
   - Drag & drop paranormal evidence upload analyzed via Gemini Vision.
   - Voice input using Web Speech recognition.
3. **7-Step Cinematic Spirit Scanner:**
   - Real-time diagnostic scan: Ectoplasm density (18%) → Soul frequency (35%) → Phase stability (57%) → Evidence analysis (76%) → Dr. Hathi consultation (91%) → Report (100%).
4. **Hybrid AI Spirit Diagnosis:**
   - Deterministic rules + Gemini AI reasoning + AI Explainability breakdown (Symptom match, Spirit pattern, Visual evidence, Historical pattern).
5. **Dr. Hathi's Ghost Pharmacy:**
   - Fictional remedies: *Ectoplasm Plus*, *Spiritol*, *Midnight-X*, *SoulCalm*, *Phantom Shield*.
6. **Certified Ghost Prescription Generator:**
   - Official afterlife prescription sheet with Dr. Hathi's digital signature, seal, dosage, and print/download TXT options.
7. **Encrypted Patient Records & Patient #013 (Secret #1):**
   - Live database with search, status filters (Stable, Under Observation, Critical, Unknown), and live statistics.
   - Patient #013 card is initially locked under *ACCESS DENIED* until secret progression is unsealed.
8. **Boo AI Chatbot (Secret #2):**
   - Floating companion with conversation memory, voice recognition, text-to-speech reading, and multi-turn secret dialogue unlocking the 03:13 AM case.
9. **Midnight Mode (Secret #5):**
   - Moon toggle in the navbar transitions the clinic into the eerie 03:13 AM witching hour with deeper blacks, glowing cyan fog, and altered AI dialogue.
10. **Ghost Follower Cursor (Secret #4):**
    - Subtle spirit trailing the mouse on desktop that whispers *"You found me. But I found you first..."*
11. **Afterlife Archive (Secret Climax):**
    - Unlocked when 3+ secrets are discovered, revealing entry #013 and confetti celebration.
12. **Judge AI Core HUD & 90-Second Demo:**
    - Live system status, topology flow diagram, telemetry metrics, and one-click demo automation.

---

## 🛠️ 3. Technology Stack

- **Frontend:** React 19, TypeScript, Bootstrap 5, Custom CSS Design System, Lucide Icons, Canvas Confetti.
- **Styling:** Custom glassmorphism (`backdrop-filter: blur(16px)`), ECG animations, holographic radar rings, scan beams, glitch effects.
- **Backend:** Node.js, Express, TypeScript (running via `tsx server.ts`).
- **AI Integration:** `@google/genai` SDK on the server with model `gemini-3.8-flash` for chat, diagnosis, and multimodal image vision.
- **Audio:** Web Audio API synthesizer (heartbeats, sonar scan pings, glitch noise, supernatural chimes) + Web Speech API for voice & TTS.
- **Database Abstraction:** In-memory + persistent session store with Firestore readiness and development fallback.

---

## 📂 4. Project Structure

```
hathi-afterdark/
├── index.html                   # HTML entry point with fonts & metadata
├── metadata.json                # Project capabilities & permissions
├── package.json                 # Dependencies & full-stack scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite bundler config
├── server.ts                    # Express server mounting Vite in dev
├── server/
│   └── services/
│       ├── gemini.ts            # @google/genai SDK wrapper & fallback
│       ├── diagnosisEngine.ts   # Hybrid deterministic & AI diagnosis
│       ├── secretEngine.ts      # Multi-step stateful secret progression
│       └── database.ts          # Patient & prescription repository
└── src/
    ├── main.tsx                 # React entry point
    ├── index.css                # Custom dark clinic design system
    ├── types.ts                 # Shared TypeScript interfaces
    ├── services/
    │   ├── api.ts               # Client-side API fetch client
    │   └── audio.ts             # Web Audio & Speech synthesis service
    └── components/
        ├── Navbar.tsx           # Glass navbar & mode controls
        ├── IntroExperience.tsx  # 5-7s cinematic opening
        ├── Hero.tsx             # Interactive hologram & CTAs
        ├── AIStatusPanel.tsx    # Live telemetry HUD for judges
        ├── DrHathi.tsx          # Doctor dossier & stethoscope secret
        ├── GhostCheckup.tsx     # Triage, voice, & vision upload
        ├── SpiritScannerModal.tsx# 7-stage diagnostic scan overlay
        ├── DiagnosisResult.tsx  # Results & AI explainability
        ├── GhostPharmacy.tsx    # Fictional elixirs & disclaimer
        ├── PrescriptionModal.tsx# Printable/downloadable Rx sheet
        ├── PatientRecords.tsx   # Patient charts & Patient #013
        ├── Patient013Modal.tsx  # Classified medical file
        ├── BooChatDrawer.tsx    # Boo Ghost AI with voice & secret chat
        ├── GhostFollower.tsx    # Subtle cursor follower
        ├── AfterlifeArchiveModal.tsx # "YOU FOUND WHAT WAS HIDDEN"
        ├── JudgeDashboardModal.tsx   # Architecture & 90s demo
        ├── AboutSection.tsx     # Pillars & origin story
        └── Footer.tsx           # Legal notice & navigation
```

---

## 🚀 5. Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/example/hathi-afterdark.git
cd hathi-afterdark

# 2. Install dependencies
npm install

# 3. Environment variables
cp .env.example .env
# Set GEMINI_API_KEY in .env (or configure via AI Studio Secrets)
```

### Running Locally
```bash
# Start development server on port 3000
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
npm run start
```

---

## 🔒 6. Medical Disclaimer & Safety

Everything in **Hathi Afterdark** is entirely fictional:
- Ghost diseases are fictional.
- Ghost diagnoses are fictional.
- Ghost medicines are fictional.
- Dr. Hansraj Hathi is a fictional character.
- **Never** present fictional treatments as real medicine or provide real medical diagnosis.

---

© 2026 Hathi Afterdark &bull; *Supernatural Healthcare for the Afterlife*
