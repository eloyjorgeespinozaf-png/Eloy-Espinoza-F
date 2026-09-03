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

interface SimulationGridProps {
  onSelectPhase?: (phase: TrainingPhase) => void;
}

export function SimulationGrid({ onSelectPhase }: SimulationGridProps) {
  const [activePhaseId, setActivePhaseId] = useState<string | null>(null);
  const [showFaseTeoricaModal, setShowFaseTeoricaModal] = useState(false);
  const [showFaseCognitivaModal, setShowFaseCognitivaModal] = useState(false);
  const [showFaseTecnologicaModal, setShowFaseTecnologicaModal] = useState(false);
  const [showFaseOperativaModal, setShowFaseOperativaModal] = useState(false);
  const [selectedPhaseDetail, setSelectedPhaseDetail] = useState<TrainingPhase | null>(null);

  const phases: TrainingPhase[] = [
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
      topics: [
        'Fusión de Sensores ISR y Drones Militares',
        'Respuesta a Operaciones Híbridas Complejas',
        'Juegos de Guerra y Simulación en Terreno Virtual',
        'Comando y Control C4ISR en Tiempo Real'
      ]
    }
  ];

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

          return (
            <div
              key={phase.id}
              onClick={() => handleCardClick(phase)}
              className={`relative bg-[#051811]/92 border rounded-xs p-5 sm:p-6 transition-all duration-300 group cursor-pointer backdrop-blur-md flex flex-col justify-between ${
                isActive 
                  ? 'border-[#34d399] shadow-[0_0_30px_rgba(52,211,153,0.22)] bg-[#082218]/95 -translate-y-1' 
                  : 'border-[#184632] hover:border-[#34d399]/80 hover:shadow-[0_12px_32px_rgba(0,12,7,0.85)] hover:-translate-y-1'
              }`}
            >
              {/* Subtle Tactical Background Image (if configured) */}
              {phase.bgImageUrl && (
                <div 
                  className="absolute inset-0 rounded-xs bg-cover bg-center bg-no-repeat opacity-[0.24] filter contrast-125 brightness-95 saturate-75 mix-blend-luminosity pointer-events-none group-hover:opacity-[0.34] transition-opacity duration-500 overflow-hidden"
                  style={{
                    backgroundImage: `url('${phase.bgImageUrl}'), url('${phase.bgImageUrl.replace('https://lh3.googleusercontent.com/d/', 'https://drive.google.com/thumbnail?id=')}&sz=w1200')`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051811] via-[#051811]/65 to-[#051811]/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#051811]/75 via-transparent to-[#051811]/75" />
                </div>
              )}

              {/* Tactical Corner Accents */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#34d399] group-hover:w-3.5 group-hover:h-3.5 transition-all z-20" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#34d399] group-hover:w-3.5 group-hover:h-3.5 transition-all z-20" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#34d399] group-hover:w-3.5 group-hover:h-3.5 transition-all z-20" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#34d399] group-hover:w-3.5 group-hover:h-3.5 transition-all z-20" />

              {/* Card Header */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xs bg-[#092419] border border-[#1e6141] flex items-center justify-center group-hover:border-[#34d399] group-hover:bg-[#0c3022] transition-colors shadow-inner">
                      {getIcon(phase.iconName)}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] font-bold text-[#facc15] tracking-[0.2em] uppercase block">
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
                <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white group-hover:text-[#86efac] transition-colors leading-tight mb-1">
                  {phase.title}
                </h3>
                <h4 className="font-sans text-xs sm:text-sm font-semibold text-[#86efac] tracking-wide mb-3">
                  {phase.subtitle}
                </h4>

                {/* Description */}
                <p className="text-xs text-[#9ebcb0] leading-relaxed mb-4">
                  {phase.description}
                </p>

                {/* Topics / Modules Chips */}
                <div className="space-y-1.5 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#547f6b] block">
                    NÚCLEOS TEMÁTICOS:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {phase.topics.map((topic, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-1.5 text-[11px] font-mono text-[#bfddd0] bg-[#081e15] border border-[#153d2b] px-2 py-1 rounded-2xs"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#34d399]" />
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
                    className="bg-gradient-to-r from-[#10b981] to-[#34d399] h-full rounded-full transition-all duration-500"
                    style={{ width: `${phase.progress}%` }}
                  />
                </div>

                {/* Action CTA Button */}
                <button
                  type="button"
                  className="w-full py-2.5 px-4 bg-[#14422e] group-hover:bg-[#1e5c41] active:bg-[#0e3122] border border-[#2b7551] group-hover:border-[#34d399] text-[#f0fdf4] rounded-xs font-heading text-sm font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.25)]"
                >
                  <span>INGRESAR AL MÓDULO</span>
                  <ArrowRight className="w-4 h-4 text-[#34d399] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Modal / Toast confirmation for selected phase simulation */}
      {selectedPhaseDetail && selectedPhaseDetail.id !== 'fase-1' && selectedPhaseDetail.id !== 'fase-2' && (
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
        />
      )}
    </div>
  );
}
