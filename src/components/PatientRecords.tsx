import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  ShieldAlert,
  Lock,
  Unlock,
  AlertTriangle,
  Activity,
  User,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { PatientRecord } from '../types';
import { audio } from '../services/audio';

interface PatientRecordsProps {
  patients: PatientRecord[];
  patient013Unlocked: boolean;
  onSelectPatient: (patient: PatientRecord) => void;
  onInspect013: () => void;
}

export const PatientRecords: React.FC<PatientRecordsProps> = ({
  patients,
  patient013Unlocked,
  onSelectPatient,
  onInspect013,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Stats calculation
  const totalPatients = patients.length;
  const stableCount = patients.filter((p) => p.status === 'Stable').length;
  const observationCount = patients.filter((p) => p.status === 'Under Observation').length;
  const criticalCount = patients.filter((p) => p.status === 'Critical').length;
  const unknownCount = patients.filter((p) => p.status === 'Unknown').length;

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.ghostName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === 'All') return true;
    return p.status === activeFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Stable':
        return 'badge bg-success bg-opacity-25 text-success border border-success border-opacity-50';
      case 'Under Observation':
        return 'badge bg-info bg-opacity-25 text-info border border-info border-opacity-50';
      case 'Critical':
        return 'badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50';
      case 'Unknown':
        return 'badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-50';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <section id="patients" className="py-5 position-relative">
      <div className="container py-lg-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill glass-panel-sm mb-2">
            <FileText className="text-ghost" size={14} />
            <span className="font-mono text-ghost small text-uppercase fw-semibold" style={{ fontSize: '11px' }}>
              SECURE AFTERLIFE CLINIC DATABASE
            </span>
          </div>
          <h2 className="font-heading display-5 fw-bold text-light mb-2">
            AFTERLIFE PATIENT RECORDS
          </h2>
          <p className="text-muted" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Permanent encrypted medical charts for haunting spirits treated at Dr. Hathi Supernatural Clinic.
          </p>
        </div>

        {/* Animated Statistics Counters */}
        <div className="row g-3 mb-4 font-mono">
          <div className="col-6 col-md-3">
            <div className="glass-panel p-3 text-center">
              <div className="text-muted small" style={{ fontSize: '11px' }}>TOTAL PATIENTS</div>
              <div className="fs-3 fw-bold text-light">{totalPatients}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="glass-panel p-3 text-center">
              <div className="text-muted small" style={{ fontSize: '11px' }}>ACTIVE CASES</div>
              <div className="fs-3 fw-bold text-info">{observationCount + criticalCount}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="glass-panel p-3 text-center">
              <div className="text-muted small" style={{ fontSize: '11px' }}>RESOLVED / STABLE</div>
              <div className="fs-3 fw-bold text-success">{stableCount}</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="glass-panel p-3 text-center">
              <div className="text-muted small" style={{ fontSize: '11px' }}>UNKNOWN / ANOMALIES</div>
              <div className="fs-3 fw-bold text-medical">{unknownCount}</div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-panel p-3 mb-4">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-md-6 col-lg-5">
              <div className="position-relative">
                <Search
                  size={16}
                  className="position-absolute text-muted top-50 start-0 translate-middle-y ms-3"
                />
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary font-mono ps-5"
                  placeholder="Search by ID, Ghost name, or condition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="col-md-6 col-lg-7 d-flex flex-wrap gap-1.5 justify-content-md-end">
              {['All', 'Stable', 'Under Observation', 'Critical', 'Unknown'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    audio.playClick();
                    setActiveFilter(filter);
                  }}
                  className={`btn btn-sm font-mono px-3 py-1.5 rounded-pill ${
                    activeFilter === filter
                      ? 'btn-info text-dark fw-bold'
                      : 'btn-outline-secondary text-light'
                  }`}
                  style={{ fontSize: '12px' }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Patients Grid */}
        <div className="row g-3">
          {filteredPatients.map((patient) => {
            const isPatient013 = patient.patientId === '#013';

            return (
              <div key={patient.patientId} className="col-md-6 col-lg-4">
                <div
                  onClick={() => {
                    if (isPatient013) {
                      onInspect013();
                    } else {
                      audio.playClick();
                      onSelectPatient(patient);
                    }
                  }}
                  className={`glass-panel p-4 h-100 d-flex flex-column justify-content-between position-relative cursor-pointer transition-all ${
                    isPatient013
                      ? patient013Unlocked
                        ? 'border-danger shadow-lg'
                        : 'border-secondary'
                      : ''
                  }`}
                  style={{
                    cursor: 'pointer',
                    background: isPatient013
                      ? patient013Unlocked
                        ? 'linear-gradient(135deg, rgba(255, 77, 103, 0.15) 0%, rgba(17, 17, 38, 0.95) 100%)'
                        : 'rgba(10, 10, 20, 0.85)'
                      : 'var(--glass-bg)',
                  }}
                >
                  <div>
                    {/* Card Top: ID and Status */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="font-mono text-ghost fw-bold fs-6">
                        {patient.patientId}
                      </span>
                      <span className={getStatusBadge(patient.status)}>
                        {patient.status}
                      </span>
                    </div>

                    {/* Patient Name */}
                    <h5
                      className={`font-heading fs-5 fw-bold mb-1 ${
                        isPatient013 && !patient013Unlocked ? 'text-muted' : 'text-light'
                      }`}
                    >
                      {patient.ghostName}
                    </h5>

                    {/* Condition */}
                    <p className="font-mono text-ghost small mb-3" style={{ fontSize: '12px' }}>
                      {patient.condition}
                    </p>

                    {/* Status Bars if not locked */}
                    {!(isPatient013 && !patient013Unlocked) ? (
                      <div className="d-flex flex-column gap-2 mb-3 font-mono small">
                        <div>
                          <div className="d-flex justify-content-between text-muted" style={{ fontSize: '10px' }}>
                            <span>SPIRIT VITALITY</span>
                            <span>{patient.spiritEnergy}%</span>
                          </div>
                          <div className="progress bg-dark" style={{ height: '5px' }}>
                            <div
                              className="progress-bar bg-info"
                              style={{ width: `${patient.spiritEnergy}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between text-muted" style={{ fontSize: '10px' }}>
                            <span>ECTOPLASM STABILITY</span>
                            <span>{patient.ectoplasmStability}%</span>
                          </div>
                          <div className="progress bg-dark" style={{ height: '5px' }}>
                            <div
                              className="progress-bar bg-primary"
                              style={{ width: `${patient.ectoplasmStability}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Secret #013 Locked Teaser */
                      <div
                        className="p-3 my-2 rounded-2 text-center font-mono small border border-danger border-opacity-30"
                        style={{ background: 'rgba(255, 77, 103, 0.08)' }}
                      >
                        <Lock size={20} className="text-medical mb-1" />
                        <div className="text-medical fw-bold">ACCESS RESTRICTED</div>
                        <div className="text-muted" style={{ fontSize: '10px' }}>
                          Level 4 clearance &bull; Incident: 03:13 AM
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-2 border-top border-secondary d-flex justify-content-between align-items-center font-mono small text-muted">
                    <span style={{ fontSize: '11px' }}>
                      <Clock size={12} className="me-1 inline" />
                      {patient.lastVisit}
                    </span>
                    <span className="text-ghost" style={{ fontSize: '11px' }}>
                      {isPatient013 ? (patient013Unlocked ? 'VIEW ARCHIVE →' : 'CLASSIFIED') : 'VIEW CHART →'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
