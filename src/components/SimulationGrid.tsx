import React, { useState } from 'react';
import { 
  BookOpen, 
  Brain, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Radio, 
  Play, 
  Layers,
  Sparkles
} from 'lucide-react';
import { TrainingPhase } from '../types';
import { FaseTeoricaDetalle } from './FaseTeoricaDetalle';
import { FaseCognitivaDetalle } from './FaseCognitivaDetalle';
import { FaseTecnologicaDetalle } from './FaseTecnologicaDetalle';
import { FaseOperativaDetalle } from './FaseOperativaDetalle';
import { Fase3BackgroundVisual } from './Fase3BackgroundVisual';
import { Fase4BackgroundVisual } from './Fase4BackgroundVisual';

interface SimulationGridProps {
  onSelectPhase?: (phase: TrainingPhase) => void;
}

export function SimulationGrid({ onSelectPhase }: SimulationGridProps) {
  const [activePhaseId, setActivePhaseId] = useState<string | null>(null);
  const [showFaseTeoricaModal, setShowFaseTeoricaModal] = useState(false);
  const [showFaseCognitivaModal, setShowFaseCognitivaModal] = useState(false);
  const [showFaseTecnologicaModal, setShowFaseTecnologicaModal] = useState(false);
  const [showFaseOperativaModal, setShowFaseOperativaModal] = useState(false);
  const [fase4ImageError, setFase4ImageError] = useState(false);
  const [selectedPhaseDetail, setSelectedPhaseDetail] = useState<TrainingPhase | null>(null);

  const [phases, setPhases] = useState<TrainingPhase[]>([
    {
      id: 'fase-1',
      phaseNumber: '01',
      title: 'FASE I: SOPORTE TEÓRICO',
      subtitle: 'Nivelación Doctrinaria y Metodológica',
      description: 'Fundamentación doctrinaria, marcos normativos militares y metodologías estructuradas de inteligencia estratégica y prospectiva.',
      progress: 100,
      status: 'COMPLETADO',
      modulesCount: 6,
      duration: '40 Horas Lectivas',
      iconName: 'BookOpen',
      tag: 'FUNDAMENTOS',
      bgImageUrl: 'https://lh3.googleusercontent.com/d/1I-XgzjvWN9FfXODs2Iy-rmXWk2G7ZidZ',
      topics: [
        'Doctrina Militar de Inteligencia',
        'Metodología de Análisis Estructurado',
        'Ciclo de Inteligencia Estratégica',
        'Marco Legal y Reglas de Enfrentamiento'
      ]
    },
    {
      id: 'fase-2',
      phaseNumber: '02',
      title: 'FASE II: ENTRENAMIENTO COGNITIVO',
      subtitle: 'Mitigación de Sesgos y Análisis de Hipótesis',
      description: 'Desarrollo de capacidades críticas para la detección y neutralización de sesgos cognitivos, matrices ACH y análisis de decepción táctica.',
      progress: 65,
      status: 'EN CURSO',
      modulesCount: 8,
      duration: '60 Horas Prácticas',
      iconName: 'Brain',
      tag: 'ANÁLISIS CRÍTICO',
      bgImageUrl: 'https://lh3.googleusercontent.com/d/1v02RRMh2hggoF2L99gqhC0NQ611o47vA',
      topics: [
        'Análisis de Hipótesis en Competencia (ACH)',
        'Detección de Decepción y Desinformación',
        'Pensamiento Lateral y Juicio Predictivo',
        'Juegos de Simulación Cognitiva Red Team'
      ]
    },
    {
      id: 'fase-3',
      phaseNumber: '03',
      title: 'FASE III: RESILIENCIA TECNOLÓGICA',
      subtitle: 'Gestión de Riesgo y Ciberdefensa',
      description: 'Protección de infraestructuras críticas, protocolos OPSEC, ciberinteligencia táctica y evaluación de vectores de vulnerabilidad digital.',
      progress: 25,
      status: 'DISPONIBLE',
      modulesCount: 7,
      duration: '50 Horas Técnicas',
      iconName: 'ShieldCheck',
      tag: 'CIBERDEFENSA',
      bgImageUrl: '/Gemini_Generated_Image_pqy5ffpqy5ffpqy5.jpg',
      topics: [
        'Ciberinteligencia Táctica y OSINT',
        'Seguridad de Operaciones (OPSEC)',
        'Análisis de Vectores de Amenaza Cibernética',
        'Resiliencia en Redes Tácticas Militares'
      ]
    },
    {
      id: 'fase-4',
      phaseNumber: '04',
      title: 'FASE IV: INMERSIÓN OPERATIVA',
      subtitle: 'Simulación de Sensores y Operaciones Híbridas',
      description: 'Entorno inmersivo de toma de decisiones bajo presión, fusión de sensores ISR en tiempo real y respuesta a escenarios de guerra híbrida.',
      progress: 0,
      status: 'DISPONIBLE',
      modulesCount: 10,
      duration: '80 Horas Inmersivas',
      iconName: 'Cpu',
      tag: 'SIMULACIÓN INTEGRAL',
      bgImageUrl: '/Gemini_Generated_Image_nj052znj052znj05.jpg',
      topics: [
        'Fusión de Sensores ISR y Drones Militares',
        'Respuesta a Operaciones Híbridas Complejas',
        'Juegos de Guerra y Simulación en Terreno Virtual',
        'Comando y Control C4ISR en Tiempo Real'
      ]
    }
  ]);

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-[#34d399]" />;
      case 'Brain': return <Brain className="w-6 h-6 text-[#6ee7b7]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#38bdf8]" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-[#facc15]" />;
      default: return <Layers className="w-6 h-6 text-[#34d399]" />;
    }
  };

  const getStatusBadge = (status: TrainingPhase['status']) => {
    switch (status) {
      case 'COMPLETADO':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0e3b26] text-[#86efac] border border-[#207a4a] text-[10px] font-mono font-bold rounded-2xs uppercase">
            <CheckCircle2 className="w-3 h-3 text-[#34d399]" />
            COMPLETADO
          </span>
        );
      case 'EN CURSO':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0b3323] text-[#facc15] border border-[#715f1a] text-[10px] font-mono font-bold rounded-2xs uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] animate-ping" />
            EN CURSO
          </span>
        );
      case 'DISPONIBLE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#061d15] text-[#93c5fd] border border-[#1e4b6d] text-[10px] font-mono font-bold rounded-2xs uppercase">
            <Play className="w-3 h-3 text-[#38bdf8]" />
            DISPONIBLE
          </span>
        );
      case 'BLOQUEADO':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#170a0a] text-[#fca5a5] border border-[#521c1c] text-[10px] font-mono font-bold rounded-2xs uppercase">
            <Lock className="w-3 h-3 text-[#f87171]" />
            BLOQUEADO
          </span>
        );
    }
  };

  const handleCardClick = (phase: TrainingPhase) => {
    setActivePhaseId(phase.id);
    setSelectedPhaseDetail(phase);
    if (phase.id === 'fase-1') {
      setShowFaseTeoricaModal(true);
    } else if (phase.id === 'fase-2') {
      setShowFaseCognitivaModal(true);
    } else if (phase.id === 'fase-3') {
      setShowFaseTecnologicaModal(true);
    } else if (phase.id === 'fase-4') {
      setShowFaseOperativaModal(true);
    }
    if (onSelectPhase) onSelectPhase(phase);
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#52826e] font-semibold block">
            CICLO FORMATIVO SECUENCIAL
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
            MÓDULOS DE SIMULACIÓN Y ENTRENAMIENTO
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#7aa492]">
          <span className="w-2 h-2 rounded-full bg-[#34d399]" />
          <span>4 FASES OPERATIVAS HABILITADAS</span>
        </div>
      </div>

      {/* 4 Cards Simulation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {phases.map((phase) => {
          const isActive = activePhaseId === phase.id;
          const isFase3 = phase.id === 'fase-3';
          const isFase4 = phase.id === 'fase-4';

          return (
            <div
              key={phase.id}
              onClick={() => handleCardClick(phase)}
              className={`relative border rounded-xs p-5 sm:p-6 transition-all duration-300 group cursor-pointer backdrop-blur-md flex flex-col justify-between overflow-hidden ${
                isFase3
                  ? isActive
                    ? 'border-[#00e5ff] shadow-[0_0_35px_rgba(0,229,255,0.3)] bg-[#04160f]/85 -translate-y-1'
                    : 'bg-[#04160f]/80 border-[#1f563c] hover:border-[#00e5ff] shadow-[0_8px_24px_rgba(0,14,9,0.75)] hover:shadow-[0_14px_36px_rgba(0,229,255,0.25)] hover:-translate-y-1'
                  : isFase4
                    ? isActive
                      ? 'border-[#10b981] shadow-[0_0_40px_rgba(16,185,129,0.45)] bg-[#021811]/90 -translate-y-1 ring-1 ring-[#10b981]/50'
                      : 'bg-[#021811]/85 border-[#059669]/70 hover:border-[#10b981] shadow-[0_8px_26px_rgba(0,18,12,0.85)] hover:shadow-[0_14px_38px_rgba(16,185,129,0.35)] hover:-translate-y-1'
                    : isActive 
                      ? 'border-[#34d399] shadow-[0_0_30px_rgba(52,211,153,0.22)] bg-[#082218]/95 -translate-y-1' 
                      : 'bg-[#051811]/92 border-[#184632] hover:border-[#34d399]/80 hover:shadow-[0_12px_32px_rgba(0,12,7,0.85)] hover:-translate-y-1'
              }`}
            >
              {/* Card Tactical Background */}
              {isFase3 ? (
                <Fase3BackgroundVisual />
              ) : isFase4 ? (
                <div className="absolute inset-0 rounded-xs pointer-events-none overflow-hidden select-none">
                  {/* Real Photographic Tactical Image without modification */}
                  {!fase4ImageError ? (
                    <img
                      src="/Gemini_Generated_Image_nj052znj052znj05.jpg"
                      alt="FASE IV: INMERSIÓN OPERATIVA - Simulación de Sensores y Operaciones Híbridas"
                      aria-hidden="true"
                      referrerPolicy="no-referrer"
                      onError={() => setFase4ImageError(true)}
                      className="w-full h-full object-cover object-center transition-all duration-700 pointer-events-none filter contrast-125 brightness-95 group-hover:scale-105 group-hover:brightness-105 opacity-85 group-hover:opacity-100"
                    />
                  ) : (
                    <Fase4BackgroundVisual />
                  )}
                  {/* High-Contrast Emerald Green Military Scrim / Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021811] via-[#021811]/75 to-[#021811]/35" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#021811]/85 via-transparent to-[#021811]/80" />
                  <div className="absolute inset-0 bg-[#022c22]/15 mix-blend-overlay" />
                  
                  {/* Tactical Emerald Scanline Pattern */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 1px)',
                      backgroundSize: '100% 4px'
                    }}
                  />
                  
                  {/* Tactical Live Sensor Fusion HUD Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 bg-[#022c22]/90 border border-[#10b981]/70 rounded-xs font-mono text-[9px] text-[#a7f3d0] shadow-[0_0_12px_rgba(16,185,129,0.35)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                    <span>SENSORES ISR // EN LÍNEA</span>
                  </div>
                </div>
              ) : phase.bgImageUrl ? (
                <div className="absolute inset-0 rounded-xs pointer-events-none overflow-hidden">
                  <img
                    src={phase.bgImageUrl}
                    alt=""
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-all duration-500 pointer-events-none filter contrast-125 brightness-95 saturate-80 mix-blend-luminosity opacity-[0.24] group-hover:opacity-[0.34]"
                    onError={(e) => {
                      if (phase.bgImageUrl && phase.bgImageUrl.includes('lh3.googleusercontent.com')) {
                        const fallbackUrl = phase.bgImageUrl.replace('https://lh3.googleusercontent.com/d/', 'https://drive.google.com/thumbnail?id=') + '&sz=w1200';
                        e.currentTarget.src = fallbackUrl;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051811] via-[#051811]/65 to-[#051811]/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#051811]/75 via-transparent to-[#051811]/75" />
                </div>
              ) : null}

              {/* Tactical Corner Accents */}
              <div className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l ${isFase4 ? 'border-[#10b981]' : isFase3 ? 'border-[#00e5ff]' : 'border-[#34d399]'} group-hover:w-3.5 group-hover:h-3.5 transition-all z-20`} />
              <div className={`absolute top-0 right-0 w-2.5 h-2.5 border-t border-r ${isFase4 ? 'border-[#10b981]' : isFase3 ? 'border-[#00e5ff]' : 'border-[#34d399]'} group-hover:w-3.5 group-hover:h-3.5 transition-all z-20`} />
              <div className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l ${isFase4 ? 'border-[#10b981]' : isFase3 ? 'border-[#00e5ff]' : 'border-[#34d399]'} group-hover:w-3.5 group-hover:h-3.5 transition-all z-20`} />
              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r ${isFase4 ? 'border-[#10b981]' : isFase3 ? 'border-[#00e5ff]' : 'border-[#34d399]'} group-hover:w-3.5 group-hover:h-3.5 transition-all z-20`} />

              {/* Card Header */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xs bg-[#092419] border border-[#1e6141] flex items-center justify-center group-hover:border-[#34d399] group-hover:bg-[#0c3022] transition-colors shadow-inner">
                      {getIcon(phase.iconName)}
                    </div>
                    <div>
                      <span className={`font-mono text-[10px] font-bold tracking-[0.2em] uppercase block ${
                        isFase4 ? 'text-[#34d399]' : isFase3 ? 'text-[#38bdf8]' : 'text-[#facc15]'
                      }`}>
                        FASE {phase.phaseNumber} • {phase.tag}
                      </span>
                      <span className="font-mono text-[11px] text-[#699680]">
                        {phase.modulesCount} Módulos • {phase.duration}
                      </span>
                    </div>
                  </div>
                  <div>
                    {getStatusBadge(phase.status)}
                  </div>
                </div>

                {/* Titles */}
                <h3 className={`font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white leading-tight mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] transition-colors ${
                  isFase4 ? 'group-hover:text-[#34d399]' : isFase3 ? 'group-hover:text-[#00e5ff]' : 'group-hover:text-[#86efac]'
                }`}>
                  {phase.title}
                </h3>
                <h4 className={`font-sans text-xs sm:text-sm font-semibold tracking-wide mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
                  isFase4 ? 'text-[#34d399]' : isFase3 ? 'text-[#38bdf8]' : 'text-[#86efac]'
                }`}>
                  {phase.subtitle}
                </h4>

                {/* Description */}
                <p className="text-xs text-[#d1ded9] leading-relaxed mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  {phase.description}
                </p>

                {/* Topics / Modules Chips */}
                <div className="space-y-1.5 pb-4">
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold block drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] ${
                    isFase4 ? 'text-[#10b981]' : isFase3 ? 'text-[#38bdf8]' : 'text-[#86efac]/80'
                  }`}>
                    NÚCLEOS TEMÁTICOS:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {phase.topics.map((topic, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center gap-1.5 text-[11px] font-mono backdrop-blur-xs px-2 py-1 rounded-2xs shadow-xs ${
                          isFase4
                            ? 'bg-[#022016]/95 border border-[#059669]/70 text-[#ecfdf5] shadow-[0_2px_8px_rgba(0,18,12,0.8)]'
                            : isFase3
                              ? 'bg-[#041d27]/90 border border-[#0e485e] text-[#e0f2fe]'
                              : 'bg-[#051811]/90 border border-[#1b5039] text-[#d1ded9]'
                        }`}
                      >
                        <span className={`w-1 h-1 rounded-full ${
                          isFase4 ? 'bg-[#10b981] shadow-[0_0_6px_rgba(16,185,129,0.8)]' : isFase3 ? 'bg-[#00e5ff]' : 'bg-[#34d399]'
                        }`} />
                        <span className="truncate">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress & Action Button */}
              <div className="pt-4 border-t border-[#133c2a] mt-auto relative z-10">
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className="text-[#6c9783]">PROGRESO OPERATIVO:</span>
                  <span className="font-bold text-white">{phase.progress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#04110c] h-2 rounded-full overflow-hidden border border-[#143d2b] mb-4">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      isFase4 
                        ? 'bg-gradient-to-r from-[#059669] to-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                        : isFase3
                          ? 'bg-gradient-to-r from-[#0284c7] to-[#00e5ff]'
                          : 'bg-gradient-to-r from-[#10b981] to-[#34d399]'
                    }`}
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>

                {/* Action CTA Button */}
                <button
                  type="button"
                  className={`w-full py-2.5 px-4 rounded-xs font-heading text-sm font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 ${
                    isFase4
                      ? 'bg-[#064e3b]/90 group-hover:bg-[#059669] active:bg-[#022c22] border border-[#10b981]/70 group-hover:border-[#34d399] text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                      : isFase3
                        ? 'bg-[#082a36] group-hover:bg-[#0c3e50] border border-[#0284c7] group-hover:border-[#00e5ff] text-[#f0fdff] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                        : 'bg-[#14422e] group-hover:bg-[#1e5c41] active:bg-[#0e3122] border border-[#2b7551] group-hover:border-[#34d399] text-[#f0fdf4] group-hover:shadow-[0_0_15px_rgba(52,211,153,0.25)]'
                  }`}
                >
                  <span>INGRESAR AL MÓDULO</span>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isFase4 ? 'text-[#34d399]' : isFase3 ? 'text-[#00e5ff]' : 'text-[#34d399]'}`} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Modal / Toast confirmation for selected phase simulation */}
      {selectedPhaseDetail && selectedPhaseDetail.id !== 'fase-1' && selectedPhaseDetail.id !== 'fase-2' && selectedPhaseDetail.id !== 'fase-3' && selectedPhaseDetail.id !== 'fase-4' && (
        <div className="p-4 bg-[#0a2318] border border-[#25734e] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#d1fae5] animate-fadeIn">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#facc15] shrink-0" />
            <div>
              <span className="text-[#facc15] font-bold block">{selectedPhaseDetail.title} SELECCIONADA</span>
              <span className="text-[#a7f3d0]">Entorno de simulación táctica preparado. Entrenador virtual en línea.</span>
            </div>
          </div>
          <button 
            onClick={() => setSelectedPhaseDetail(null)}
            className="px-3 py-1 bg-[#123e2b] hover:bg-[#185338] border border-[#2d8357] text-white text-[11px] rounded-xs uppercase cursor-pointer"
          >
            ENTENDIDO
          </button>
        </div>
      )}

      {/* Detailed Tactical View for FASE I: SOPORTE TEÓRICO */}
      {showFaseTeoricaModal && (
        <FaseTeoricaDetalle 
          onClose={() => setShowFaseTeoricaModal(false)}
          onEnterModule={() => {
            setShowFaseTeoricaModal(false);
            setShowFaseCognitivaModal(true);
          }}
        />
      )}

      {/* Detailed Tactical View for FASE II: ENTRENAMIENTO COGNITIVO */}
      {showFaseCognitivaModal && (
        <FaseCognitivaDetalle 
          onClose={() => setShowFaseCognitivaModal(false)}
          onEnterModule={() => {
            setShowFaseCognitivaModal(false);
            setShowFaseTecnologicaModal(true);
          }}
        />
      )}

      {/* Detailed Tactical View for FASE III: RESILIENCIA TECNOLÓGICA */}
      {showFaseTecnologicaModal && (
        <FaseTecnologicaDetalle 
          onClose={() => setShowFaseTecnologicaModal(false)}
          onEnterModule={() => {
            setShowFaseTecnologicaModal(false);
            setShowFaseOperativaModal(true);
          }}
        />
      )}

      {/* Detailed Tactical View for FASE IV: INMERSIÓN OPERATIVA */}
      {showFaseOperativaModal && (
        <FaseOperativaDetalle 
          onClose={() => setShowFaseOperativaModal(false)}
          onCompletePhase={() => {
            setPhases((prev) =>
              prev.map((p) =>
                p.id === 'fase-4'
                  ? { ...p, progress: 100, status: 'COMPLETADO' }
                  : p
              )
            );
          }}
        />
      )}
    </div>
  );
}
