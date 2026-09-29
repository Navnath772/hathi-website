import React, { useState, useEffect, useRef } from 'react';
import {
  Ghost,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Activity,
  Bot,
  User,
  ShieldAlert,
} from 'lucide-react';
import { ChatMessage, SecretSessionState } from '../types';
import { api } from '../services/api';
import { audio } from '../services/audio';

interface BooChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckup: () => void;
  onOpenRecords: () => void;
  onOpenPharmacy: () => void;
  onSecretUnlocked: (secretKey: string) => void;
  midnightMode: boolean;
  currentDiagnosis?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-0',
    role: 'model',
    content: "Hello! I'm Boo, your Ghost Clinic assistant. What seems to be haunting you today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  },
];

export const BooChatDrawer: React.FC<BooChatDrawerProps> = ({
  isOpen,
  onClose,
  onOpenCheckup,
  onOpenRecords,
  onOpenPharmacy,
  onSecretUnlocked,
  midnightMode,
  currentDiagnosis,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [voiceInputActive, setVoiceInputActive] = useState<boolean>(false);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    audio.playClick();
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Build conversation history for context
      const history = messages.slice(-6).map((m) => ({
        role: m.role as 'user' | 'model',
        parts: [{ text: m.content }],
      }));

      const res = await api.sendMessageToBoo(text, history, {
        midnightMode,
        currentDiagnosis,
      });

      setIsTyping(false);

      const isGlitch = res.secretOutcome?.unlockedNow;
      if (isGlitch) {
        audio.playGlitch();
        onSecretUnlocked('PATIENT_013_UNSEALED');
      } else {
        audio.playChime();
      }

      const botMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        role: 'model',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isGlitch,
      };

      setMessages((prev) => [...prev, botMsg]);

      if (ttsEnabled) {
        audio.speakText(res.reply);
      }
    } catch (err) {
      console.warn('Boo chat error:', err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          role: 'model',
          content: "👻 Boo is having trouble crossing dimensions right now... Please consult Dr. Hathi directly!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handleVoiceInput = () => {
    if (voiceInputActive) {
      audio.stopSpeechRecognition();
      setVoiceInputActive(false);
    } else {
      audio.playClick();
      const started = audio.startSpeechRecognition(
        (transcript) => {
          setVoiceInputActive(false);
          handleSendMessage(transcript);
        },
        (err) => {
          console.warn('Voice chat recognition error:', err);
          setVoiceInputActive(false);
        }
      );
      if (started) {
        setVoiceInputActive(true);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-drawer animate-fade-in">
      <div
        className="glass-panel d-flex flex-column shadow-lg"
        style={{
          height: '560px',
          border: '2px solid rgba(185, 247, 255, 0.35)',
          background: 'rgba(7, 9, 20, 0.94)',
          borderRadius: '16px',
        }}
      >
        {/* Drawer Header */}
        <div className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2.5">
            <div
              className="rounded-circle p-2 d-flex align-items-center justify-content-center"
              style={{
                background: 'rgba(185, 247, 255, 0.15)',
                border: '1px solid var(--ghost-glow)',
              }}
            >
              <Ghost size={20} className="text-ghost" />
            </div>
            <div>
              <div className="d-flex align-items-center gap-1.5">
                <span className="font-heading fw-bold text-light fs-6">BOO</span>
                <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-50 py-0.5 px-1.5" style={{ fontSize: '9px' }}>
                  ONLINE
                </span>
              </div>
              <div className="font-mono text-muted" style={{ fontSize: '10px' }}>
                Spiritually Online &bull; Gemini 3.8
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-1">
            {/* Text to Speech toggle */}
            <button
              onClick={() => {
                const next = !ttsEnabled;
                setTtsEnabled(next);
                if (!next) audio.stopSpeaking();
              }}
              className={`btn btn-sm p-1.5 rounded-circle ${
                ttsEnabled ? 'btn-info text-dark' : 'btn-outline-secondary text-muted'
              }`}
              title={ttsEnabled ? 'Boo Voice: ON' : 'Boo Voice: OFF'}
            >
              {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="btn btn-outline-secondary btn-sm p-1.5 text-light rounded-circle"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Message Scroll Area */}
        <div className="flex-grow-1 p-3 overflow-auto d-flex flex-column gap-3 font-mono small">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`d-flex flex-column ${
                m.role === 'user' ? 'align-items-end' : 'align-items-start'
              }`}
            >
              <div
                className={`p-3 rounded-3 ${
                  m.role === 'user'
                    ? 'bg-primary text-light'
                    : m.isGlitch
                    ? 'bg-danger bg-opacity-20 border border-danger text-light'
                    : 'glass-panel-sm text-light border border-secondary border-opacity-50'
                }`}
                style={{
                  maxWidth: '85%',
                  lineHeight: 1.5,
                  fontSize: '12px',
                  background: m.role === 'user' ? 'linear-gradient(135deg, #FF4D67 0%, #D81E43 100%)' : undefined,
                }}
              >
                {m.content}
              </div>
              <span className="text-muted mt-1" style={{ fontSize: '9px' }}>
                {m.timestamp}
              </span>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="d-flex align-items-center gap-2 text-ghost small font-mono">
              <Ghost size={14} className="animate-spin" />
              <span>Boo is consulting afterlife records...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Chips */}
        <div className="px-3 py-2 border-top border-secondary d-flex gap-1.5 overflow-x-auto no-scrollbar font-mono">
          <button
            onClick={() => {
              onClose();
              onOpenCheckup();
            }}
            className="btn btn-outline-secondary btn-sm text-nowrap py-1 px-2 text-ghost"
            style={{ fontSize: '10px' }}
          >
            🩺 Check-Up
          </button>
          <button
            onClick={() => handleSendMessage("Doctor, I can't pass through walls.")}
            className="btn btn-outline-secondary btn-sm text-nowrap py-1 px-2 text-light"
            style={{ fontSize: '10px' }}
          >
            👻 Wall Problem
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenPharmacy();
            }}
            className="btn btn-outline-secondary btn-sm text-nowrap py-1 px-2 text-light"
            style={{ fontSize: '10px' }}
          >
            💊 Treatments
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenRecords();
            }}
            className="btn btn-outline-secondary btn-sm text-nowrap py-1 px-2 text-light"
            style={{ fontSize: '10px' }}
          >
            📋 Records
          </button>
          <button
            onClick={() => handleSendMessage("Who is Patient 013?")}
            className="btn btn-outline-danger btn-sm text-nowrap py-1 px-2 text-danger"
            style={{ fontSize: '10px' }}
          >
            🔐 Patient 013
          </button>
          <button
            onClick={() => handleSendMessage("What happened at 03:13 AM?")}
            className="btn btn-outline-warning btn-sm text-nowrap py-1 px-2 text-warning"
            style={{ fontSize: '10px' }}
          >
            🌙 03:13 AM
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 border-top border-secondary">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="d-flex align-items-center gap-2"
          >
            {/* Voice input mic button */}
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`btn btn-sm p-2 rounded-circle ${
                voiceInputActive ? 'btn-danger animate-pulse' : 'btn-outline-info text-ghost'
              }`}
              title={voiceInputActive ? 'Listening... click to send' : 'Speak to Boo'}
            >
              {voiceInputActive ? <MicOff size={16} /> : <Mic size={16} />}
            </button>

            <input
              type="text"
              className="form-control bg-dark text-light border-secondary font-mono small"
              placeholder="Describe your supernatural problem..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="btn glow-btn-primary btn-sm px-3 py-2 d-flex align-items-center justify-content-center"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
