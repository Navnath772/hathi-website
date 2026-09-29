import React, { useRef } from 'react';
import {
  X,
  Printer,
  Download,
  BookmarkCheck,
  RefreshCw,
  Ghost,
  ShieldCheck,
  Activity,
  Award,
} from 'lucide-react';
import { PrescriptionRecord } from '../types';
import { audio } from '../services/audio';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescription: PrescriptionRecord;
  onNewCheckup: () => void;
  onSaveRecord: () => void;
  isSaved: boolean;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  isOpen,
  onClose,
  prescription,
  onNewCheckup,
  onSaveRecord,
  isSaved,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    audio.playClick();
    window.print();
  };

  const handleDownload = () => {
    audio.playClick();
    const content = `=====================================================
HATHI AFTERDARK SUPERNATURAL CLINIC
OFFICIAL AFTERLIFE GHOST PRESCRIPTION
=====================================================
RX ID: ${prescription.rxId}
Date: ${new Date(prescription.createdAt).toLocaleDateString()}
Chief Physician: ${prescription.prescribedBy}

PATIENT INFORMATION:
Patient ID: ${prescription.patientId}
Ghost Designation: ${prescription.ghostName}
Condition Diagnosed: ${prescription.diagnosis}

PRESCRIBED REMEDY:
Medication: ${prescription.medication}
Dosage: ${prescription.dosage}
Instructions: ${prescription.instructions}

FOLLOW-UP CARE:
Schedule: ${prescription.followUp}
Official Astral Seal: ${prescription.spiritSeal}

* FICTIONAL ENTERTAINMENT PREVIEW. NOT REAL MEDICAL ADVICE.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Prescription-${prescription.rxId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{
        zIndex: 2200,
        backgroundColor: 'rgba(3, 4, 8, 0.88)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div
        className="glass-panel p-4 p-md-5 position-relative overflow-auto"
        style={{
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          border: '2px solid rgba(185, 247, 255, 0.35)',
        }}
      >
        {/* Close Button (no-print) */}
        <button
          onClick={onClose}
          className="btn btn-outline-light rounded-circle p-2 position-absolute top-0 end-0 m-3 no-print"
          style={{ width: '38px', height: '38px' }}
        >
          <X size={18} />
        </button>

        {/* Printable Section */}
        <div ref={printRef} className="printable-prescription p-3 p-md-4 rounded-3 text-dark bg-white">
          {/* Clinic Header */}
          <div className="d-flex justify-content-between align-items-start border-bottom border-dark pb-3 mb-4">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="fw-black fs-4" style={{ fontFamily: 'Cinzel, Georgia, serif', letterSpacing: '0.05em' }}>
                  DR. HANSRAJ HATHI
                </span>
                <span className="badge bg-danger text-uppercase px-2 py-1" style={{ fontSize: '10px' }}>
                  24/7 CLINIC
                </span>
              </div>
              <div className="small font-monospace text-muted">
                CHIEF PHYSICIAN OF THE AFTERLIFE &bull; HATHI AFTERDARK
              </div>
              <div className="small font-monospace text-muted">
                Dimensional Clinic Ward #1 &bull; Tel: 0313-GHOST-MD
              </div>
            </div>

            <div className="text-end font-monospace">
              <div className="fw-bold fs-6 text-danger">{prescription.rxId}</div>
              <div className="small text-muted">{new Date(prescription.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Patient Details Table */}
          <div className="row g-2 mb-4 font-monospace small bg-light p-3 rounded-2 border">
            <div className="col-sm-6">
              <strong>Patient Ghost:</strong> {prescription.ghostName}
            </div>
            <div className="col-sm-6">
              <strong>Patient ID:</strong> {prescription.patientId}
            </div>
            <div className="col-12 mt-2 pt-2 border-top">
              <strong>Diagnosis:</strong> <span className="text-primary fw-bold">{prescription.diagnosis}</span>
            </div>
          </div>

          {/* Rx Symbol & Medication Body */}
          <div className="mb-4">
            <div className="display-4 fw-black text-danger mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              &#8478;
            </div>

            <div className="ps-3 border-start border-3 border-danger">
              <h4 className="fw-bold mb-1" style={{ fontFamily: 'Cinzel, Georgia, serif' }}>
                {prescription.medication}
              </h4>
              <p className="mb-2 font-monospace">
                <strong>Dosage:</strong> {prescription.dosage}
              </p>
              <p className="mb-2 font-monospace">
                <strong>Instructions:</strong> {prescription.instructions}
              </p>
              <p className="mb-0 font-monospace text-muted small">
                <strong>Follow-Up:</strong> {prescription.followUp}
              </p>
            </div>
          </div>

          {/* Doctor Signature & Seal */}
          <div className="d-flex justify-content-between align-items-end pt-4 border-top border-dark mt-4">
            <div>
              <div
                className="border border-danger border-2 p-2 rounded-2 text-danger font-monospace text-center fw-bold small"
                style={{ transform: 'rotate(-5deg)', display: 'inline-block' }}
              >
                <div>&#10004; AFTERLIFE VERIFIED</div>
                <div style={{ fontSize: '9px' }}>{prescription.spiritSeal}</div>
              </div>
            </div>

            <div className="text-end">
              <div className="font-monospace text-muted small fst-italic mb-1">
                Digitally Inscribed by:
              </div>
              <div className="fw-bold" style={{ fontFamily: 'Cinzel, serif' }}>
                Dr. Hansraj Hathi
              </div>
              <div className="small font-monospace text-muted">
                MD (Afterlife), FPTR
              </div>
            </div>
          </div>

          {/* Legal disclaimer */}
          <div className="text-center mt-4 pt-2 border-top text-muted font-monospace" style={{ fontSize: '9px' }}>
            * FICTIONAL SUPERNATURAL ENTERTAINMENT ONLY. NOT REAL MEDICAL ADVICE OR REAL MEDICATION.
          </div>
        </div>

        {/* Modal Action Controls (no-print) */}
        <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center mt-4 no-print">
          <div className="d-flex gap-2">
            <button
              onClick={handlePrint}
              className="btn btn-outline-info font-mono small d-flex align-items-center gap-1.5"
            >
              <Printer size={16} />
              <span>PRINT</span>
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-outline-light font-mono small d-flex align-items-center gap-1.5"
            >
              <Download size={16} />
              <span>DOWNLOAD TXT</span>
            </button>
          </div>

          <div className="d-flex gap-2">
            <button
              onClick={() => {
                audio.playClick();
                onSaveRecord();
              }}
              disabled={isSaved}
              className={`btn font-mono small d-flex align-items-center gap-1.5 ${
                isSaved ? 'btn-success' : 'btn-outline-warning'
              }`}
            >
              <BookmarkCheck size={16} />
              <span>{isSaved ? 'RECORD ARCHIVED' : 'SAVE TO PATIENT RECORD'}</span>
            </button>
            <button
              onClick={() => {
                audio.playClick();
                onNewCheckup();
              }}
              className="btn glow-btn-primary font-mono small d-flex align-items-center gap-1.5"
            >
              <RefreshCw size={16} />
              <span>NEW CHECK-UP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
