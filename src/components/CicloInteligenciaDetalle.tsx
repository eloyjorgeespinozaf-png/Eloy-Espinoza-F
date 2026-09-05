import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  BookOpen, 
  Cpu, 
  Award, 
  Printer, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Radio, 
  RotateCcw,
  Check,
  Shield,
  Layers,
  FileText,
  Activity
} from 'lucide-react';
import { safePrint } from '../utils/safePrint';

interface CicloInteligenciaDetalleProps {
  onClose: () => void;
  onUpdateXp?: (newXp: number) => void;
  initialXp?: number;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user' | 'red';
  author: string;
  text: string;
}

export function CicloInteligenciaDetalle({ onClose, onUpdateXp, initialXp = 40 }: CicloInteligenciaDetalleProps) {
  // Global Experience Points
  const [xp, setXp] = useState<number>(initialXp);
  
  // Navigation: Active cycle phase (1: Orientación, 2: Búsqueda, 3: Procesamiento, 4: Difusión, 0: Misión)
  const [activePhase, setActivePhase] = useState<number>(1);
  
  // View mode: 'doc' (Doctrina Oficial) vs 'sim' (Simulación Táctica de Crisis)
  const [activeView, setActiveView] = useState<'doc' | 'sim'>('doc');
  
  // Simulator State
  const [simStep, setSimStep] = useState<number>(1);
  const [timerSeconds, setTimerSeconds] = useState<number>(180);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerExpired, setTimerExpired] = useState<boolean>(false);

  // Step 1: Orientación (RPI vs ORI)
  const [selRpi1, setSelRpi1] = useState<string>('none');
  const [selRpi2, setSelRpi2] = useState<string>('none');
  const [step1Feedback, setStep1Feedback] = useState<{ isSuccess: boolean; msg: string }>({
    isSuccess: false,
    msg: 'Complete la clasificación para proceder al paso de Búsqueda.'
  });
  const [step1Completed, setStep1Completed] = useState<boolean>(false);

  // Step 2: Búsqueda (Selección de Fuentes)
  const [selectedSources, setSelectedSources] = useState<number[]>([]);
  const [step2Feedback, setStep2Feedback] = useState<{ isError: boolean; msg: string } | null>(null);
  const [step2Completed, setStep2Completed] = useState<boolean>(false);

  // Step 3: Procesamiento (Matriz de Evaluación)
  const [p3Conf1, setP3Conf1] = useState<string>('none');
  const [p3Ex1, setP3Ex1] = useState<string>('none');
  const [p3Conf2, setP3Conf2] = useState<string>('none');
  const [p3Ex2, setP3Ex2] = useState<string>('none');
  const [step3Feedback, setStep3Feedback] = useState<{ isSuccess: boolean; msg: string }>({
    isSuccess: false,
    msg: 'Califique los datos según el rigor de la directiva boliviana.'
  });
  const [step3Completed, setStep3Completed] = useState<boolean>(false);

  // Step 4: Difusión (Chat con Gral. de Operaciones)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'ai',
      author: 'GRAL. OPERACIONES',
      text: 'Analista, con base en el procesamiento del Ciclo de Inteligencia, ¿cuál es el verdadero Curso de Acción que adoptará el oponente y qué grado de certeza estimativa le asigna doctrinalmente?'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [step4Completed, setStep4Completed] = useState<boolean>(false);
  const [showScorecard, setShowScorecard] = useState<boolean>(false);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const scorecardRef = useRef<HTMLDivElement>(null);

  // Update parent XP when local XP changes
  const handleXpGain = (amount: number) => {
    setXp((prev) => {
      const nextXp = Math.min(100, Math.max(prev, prev + amount));
      if (onUpdateXp) onUpdateXp(nextXp);
      return nextXp;
    });
  };

  // Timer effect for simulation
  useEffect(() => {
    let interval: any = null;
    if (activeView === 'sim' && timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            setTimerExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeView, timerRunning, timerSeconds]);

  // Scroll chat bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const startSimulator = () => {
    setActiveView('sim');
    if (!timerRunning && timerSeconds > 0 && !timerExpired) {
      setTimerRunning(true);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Check Step 1 Triage
  const handleStep1Change = (val1: string, val2: string) => {
    setSelRpi1(val1);
    setSelRpi2(val2);

    if (val1 === 'RPI' && val2 === 'ORI') {
      setStep1Feedback({
        isSuccess: true,
        msg: '¡Clasificación Doctrinal Correcta! El Comandante requiere RPI para el SCADA, mientras que el Estado Mayor maneja ORI para logística. Procediendo a Búsqueda.'
      });
      if (!step1Completed) {
        setStep1Completed(true);
        handleXpGain(25);
      }
      setTimeout(() => {
        setSimStep(2);
      }, 1400);
    } else if (val1 !== 'none' && val2 !== 'none') {
      setStep1Feedback({
        isSuccess: false,
        msg: 'Clasificación imprecisa. Recuerde: RPI son interrogantes críticas del Mando sobre el enemigo; ORI son requerimientos funcionales del Estado Mayor.'
      });
    }
  };

  // Toggle source option in Step 2
  const toggleSourceOption = (optNum: number) => {
    setSelectedSources((prev) => 
      prev.includes(optNum) ? prev.filter((x) => x !== optNum) : [...prev, optNum]
    );
    setStep2Feedback(null);
  };

  // Validate Step 2
  const validateStep2 = () => {
    const hasA = selectedSources.includes(1);
    const hasB = selectedSources.includes(2);
    const hasC = selectedSources.includes(3);

    if (hasA && hasC && !hasB) {
      setStep2Feedback({
        isError: false,
        msg: '¡Excelente! Ha asignado de forma óptima SIGINT (Guerra Electrónica) e IMINT/SAR para triangular el sabotaje hostil en el Este.'
      });
      if (!step2Completed) {
        setStep2Completed(true);
        handleXpGain(25);
      }
      setTimeout(() => {
        setSimStep(3);
      }, 1400);
    } else {
      setStep2Feedback({
        isError: true,
        msg: 'Error de planeamiento. Seleccione sensores técnicos de defensa (SIGINT e IMINT SAR) y descarte encuestas civiles en zonas ajenas al teatro operativo.'
      });
    }
  };

  // Check Step 3 Matrix
  const handleStep3Change = (c1: string, e1: string, c2: string, e2: string) => {
    setP3Conf1(c1);
    setP3Ex1(e1);
    setP3Conf2(c2);
    setP3Ex2(e2);

    if (c1 === 'F' && e1 === '5' && c2 === 'A' && e2 === '1') {
      setStep3Feedback({
        isSuccess: true,
        msg: '¡Matriz Doctrinal Validada! OSINT es clasificada como F-5 (Señuelos) e IMINT/SAR es clasificada como A-1 (Total Fiabilidad Física). Habilitando Difusión.'
      });
      if (!step3Completed) {
        setStep3Completed(true);
        handleXpGain(25);
      }
      setTimeout(() => {
        setSimStep(4);
      }, 1400);
    } else if (c1 !== 'none' && e1 !== 'none' && c2 !== 'none' && e2 !== 'none') {
      setStep3Feedback({
        isSuccess: false,
        msg: 'Reevalúe según la directiva boliviana: Las redes sociales no corroboradas corresponden a F-5; las capturas satelitales térmicas directas corresponden a A-1.'
      });
    }
  };

  // Handle Chat in Step 4
  const handleSubmitChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      author: 'ANALISTA DE ESTADO MAYOR',
      text
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    const lower = text.toLowerCase();

    setTimeout(() => {
      const sectorMatched = lower.includes('este') || lower.includes('scada') || lower.includes('bombeo') || lower.includes('fluvial');
      const certaintyMatched = lower.includes('altamente') || lower.includes('probable') || lower.includes('casi') || lower.includes('seguro') || lower.includes('75') || lower.includes('85') || lower.includes('kent');

      if (sectorMatched && certaintyMatched) {
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          author: 'GRAL. OPERACIONES',
          text: 'Brillante. Su apreciación de inteligencia estratégica demuestra rigurosa trazabilidad de las firmas del satélite SAR y el léxico estimativo de Sherman Kent. Ha completado de forma impecable el Ciclo de Inteligencia de la CVIE.'
        };
        setChatMessages((prev) => [...prev, aiMsg]);
        if (!step4Completed) {
          setStep4Completed(true);
          handleXpGain(100);
        }
      } else {
        const redMsg: ChatMessage = {
          id: `red-${Date.now()}`,
          sender: 'red',
          author: 'GRAL. OPERACIONES',
          text: 'Apreciación ambigua. Debe determinar el Sector geográfico bajo ataque real (Sector Este / subestación SCADA) y justificar su grado de certeza estimativa usando la escala de Sherman Kent (ej: Altamente Probable).'
        };
        setChatMessages((prev) => [...prev, redMsg]);
      }
    }, 500);
  };

  const handleGenerateScorecard = () => {
    setShowScorecard(true);
    setTimeout(() => {
      scorecardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-[#02040a]/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      
      {/* Container matching CVIE military HUD */}
      <div className="relative w-full max-w-[1550px] bg-[#070d1e] border border-[#12254d] rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col max-h-[94vh] overflow-hidden my-auto">
        
        {/* TOP OPERATIONAL BAR */}
        <header className="bg-[#030612] border-b-2 border-[#12254d] px-4 sm:px-6 py-3 flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-[#00ffff]/10 border border-[#00ffff] text-[#00ffff] font-mono text-[11px] sm:text-xs px-2.5 py-1 rounded tracking-widest uppercase font-bold">
              CVIE COGNITIVE SIMULATOR
            </span>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
                Ciclo de Producción de Inteligencia Estratégica
              </h1>
              <p className="text-[11px] text-[#64748b]">
                Modelo Doctrinal de la Escuela de Comando y Estado Mayor (ECEME) [Bolivia]
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="font-mono text-xs text-[#00ff66] font-bold bg-[#00ff66]/10 px-3 py-1.5 rounded border border-[#00ff66]/30">
              SISTEMA ACTIVO // XP: <span className="text-white font-black">{xp}</span> / 100
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 hover:bg-slate-800 rounded transition-colors cursor-pointer"
              title="Cerrar simulador"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* WORKSPACE GRID */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-5">
          
          {/* ========================================================================= */}
          {/* LEFT PANEL: HUD WHEEL INTERACTIVA & PRINCIPIOS DE INTELIGENCIA           */}
          {/* ========================================================================= */}
          <div className="flex flex-col items-center gap-4">
            
            <div className="w-full bg-[#0c152a] border border-[#12254d] rounded-md p-4">
              <div className="text-xs sm:text-sm font-bold text-[#00ffff] font-mono mb-2 border-b border-[#12254d] pb-1.5 flex items-center justify-between">
                <span>CARTA CIRCULAR DOCTRINAL (WHEEL HUD)</span>
                <span className="text-[10px] text-[#64748b] font-normal">INTERACTIVO</span>
              </div>
              <p className="text-[11px] text-[#64748b] mb-3 text-justify leading-relaxed">
                Haga clic en cualquiera de las fases del ciclo gráfico para orientar el análisis, cargar su base conceptual o iniciar la simulación táctica.
              </p>

              {/* SVG WHEEL */}
              <div className="flex justify-center my-2">
                <svg 
                  className="w-full max-w-[340px] h-auto select-none" 
                  viewBox="0 0 360 360"
                  style={{ transform: 'rotate(-45deg)' }}
                >
                  <circle cx="180" cy="180" r="160" fill="none" stroke="#12254d" strokeWidth="1.5" />
                  <circle cx="180" cy="180" r="150" fill="#02040b" />

                  {/* Quadrant 1: Orientación */}
                  <path 
                    d="M 180 180 L 180 30 A 150 150 0 0 1 330 180 Z" 
                    fill={activePhase === 1 ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.06)'}
                    stroke={activePhase === 1 ? '#00ffff' : '#12254d'}
                    strokeWidth={activePhase === 1 ? 3 : 2}
                    className="cursor-pointer transition-all duration-300 hover:fill-[rgba(59,130,246,0.3)] hover:stroke-[#00ffff]"
                    style={{
                      filter: activePhase === 1 ? 'drop-shadow(0 0 8px #00ffff)' : 'none'
                    }}
                    onClick={() => { setActivePhase(1); setActiveView('doc'); }}
                  />
                  
                  {/* Quadrant 2: Búsqueda */}
                  <path 
                    d="M 180 180 L 330 180 A 150 150 0 0 1 180 330 Z" 
                    fill={activePhase === 2 ? 'rgba(192, 132, 252, 0.25)' : 'rgba(192, 132, 252, 0.06)'}
                    stroke={activePhase === 2 ? '#00ffff' : '#12254d'}
                    strokeWidth={activePhase === 2 ? 3 : 2}
                    className="cursor-pointer transition-all duration-300 hover:fill-[rgba(192,132,252,0.3)] hover:stroke-[#00ffff]"
                    style={{
                      filter: activePhase === 2 ? 'drop-shadow(0 0 8px #00ffff)' : 'none'
                    }}
                    onClick={() => { setActivePhase(2); setActiveView('doc'); }}
                  />

                  {/* Quadrant 3: Procesamiento */}
                  <path 
                    d="M 180 180 L 180 330 A 150 150 0 0 1 30 180 Z" 
                    fill={activePhase === 3 ? 'rgba(255, 0, 85, 0.25)' : 'rgba(255, 0, 85, 0.06)'}
                    stroke={activePhase === 3 ? '#00ffff' : '#12254d'}
                    strokeWidth={activePhase === 3 ? 3 : 2}
                    className="cursor-pointer transition-all duration-300 hover:fill-[rgba(255,0,85,0.3)] hover:stroke-[#00ffff]"
                    style={{
                      filter: activePhase === 3 ? 'drop-shadow(0 0 8px #00ffff)' : 'none'
                    }}
                    onClick={() => { setActivePhase(3); setActiveView('doc'); }}
                  />

                  {/* Quadrant 4: Difusión */}
                  <path 
                    d="M 180 180 L 30 180 A 150 150 0 0 1 180 30 Z" 
                    fill={activePhase === 4 ? 'rgba(0, 255, 102, 0.25)' : 'rgba(0, 255, 102, 0.06)'}
                    stroke={activePhase === 4 ? '#00ffff' : '#12254d'}
                    strokeWidth={activePhase === 4 ? 3 : 2}
                    className="cursor-pointer transition-all duration-300 hover:fill-[rgba(0,255,102,0.3)] hover:stroke-[#00ffff]"
                    style={{
                      filter: activePhase === 4 ? 'drop-shadow(0 0 8px #00ffff)' : 'none'
                    }}
                    onClick={() => { setActivePhase(4); setActiveView('doc'); }}
                  />

                  {/* Center Misión circle */}
                  <circle 
                    cx="180" 
                    cy="180" 
                    r="45" 
                    fill={activePhase === 0 ? '#0d1a3a' : '#030612'}
                    stroke="#ffaa00"
                    strokeWidth={activePhase === 0 ? 4 : 3}
                    className="cursor-pointer transition-all duration-300 hover:fill-[#0d1a3a]"
                    style={{
                      filter: activePhase === 0 ? 'drop-shadow(0 0 12px #ffaa00)' : 'none'
                    }}
                    onClick={() => { setActivePhase(0); setActiveView('doc'); }}
                  />

                  {/* Rotated text layer */}
                  <g transform="rotate(45 180 180)">
                    <text 
                      x="180" 
                      y="110" 
                      textAnchor="middle" 
                      fill="#f8fafc" 
                      className="font-mono text-[10px] pointer-events-none font-bold"
                    >
                      ORIENTACIÓN
                    </text>
                    <text 
                      x="250" 
                      y="184" 
                      textAnchor="middle" 
                      fill="#f8fafc" 
                      className="font-mono text-[10px] pointer-events-none font-bold"
                    >
                      BÚSQUEDA
                    </text>
                    <text 
                      x="180" 
                      y="260" 
                      textAnchor="middle" 
                      fill="#f8fafc" 
                      className="font-mono text-[10px] pointer-events-none font-bold"
                    >
                      PROCESO
                    </text>
                    <text 
                      x="110" 
                      y="184" 
                      textAnchor="middle" 
                      fill="#f8fafc" 
                      className="font-mono text-[10px] pointer-events-none font-bold"
                    >
                      DIFUSIÓN
                    </text>
                    <text 
                      x="180" 
                      y="184" 
                      textAnchor="middle" 
                      fill="#ffaa00" 
                      className="font-mono text-[11px] pointer-events-none font-bold tracking-wider"
                    >
                      MISIÓN
                    </text>
                  </g>
                </svg>
              </div>

              <div className="mt-3 text-center font-mono text-xs text-[#00ffff] font-semibold bg-[#030612] py-2 px-3 rounded border border-[#12254d]">
                {activePhase === 1 && 'FASE ACTIVA: 1. ORIENTACIÓN DEL ESFUERZO DE BÚSQUEDA'}
                {activePhase === 2 && 'FASE ACTIVA: 2. BÚSQUEDA DE INFORMACIÓN'}
                {activePhase === 3 && 'FASE ACTIVA: 3. PROCESAMIENTO DE LA INFORMACIÓN'}
                {activePhase === 4 && 'FASE ACTIVA: 4. DIFUSIÓN Y USO DE LA INTELIGENCIA'}
                {activePhase === 0 && 'NÚCLEO CENTRAL: LA MISIÓN'}
              </div>
            </div>

            {/* PRINCIPLES CARD */}
            <div className="w-full bg-[#ffaa00]/[0.03] border border-[#ffaa00]/30 rounded-md p-4">
              <strong className="text-xs font-bold text-[#ffaa00] block mb-1.5 font-mono">
                PRINCIPIOS DE INTELIGENCIA DE LA ECEME
              </strong>
              <p className="text-[11px] text-[#94a3b8] leading-relaxed text-justify">
                De acuerdo con los textos doctrinales bolivianos, el ciclo se rige por: <b>Propósito, Definición, Explotación de las Fuentes, Significado, Causa y Efecto, Grado de Certeza, Tendencia y Conclusiones</b>.
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT PANEL: INTERACTIVE DASHBOARD & CRISIS SIMULATOR                    */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-4">
            
            {/* View Switching Tabs */}
            <div className="flex gap-2.5 border-b border-[#12254d] pb-2">
              <button
                onClick={() => setActiveView('doc')}
                className={`py-2 px-4 rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeView === 'doc'
                    ? 'border border-[#00ffff] text-[#00ffff] bg-[#00ffff]/5 shadow-[0_0_12px_rgba(0,255,255,0.15)]'
                    : 'border border-[#12254d] text-[#64748b] hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>📖 DOCTRINA OFICIAL</span>
              </button>

              <button
                onClick={startSimulator}
                className={`py-2 px-4 rounded text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeView === 'sim'
                    ? 'border border-[#00ffff] text-[#00ffff] bg-[#00ffff]/5 shadow-[0_0_12px_rgba(0,255,255,0.15)]'
                    : 'border border-[#12254d] text-[#64748b] hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>⚡ SIMULACIÓN TÁCTICA DE CRISIS</span>
              </button>
            </div>

            {/* ===================================================================== */}
            {/* VISTA A: DOCTRINA OFICIAL DE LA ECEME                                 */}
            {/* ===================================================================== */}
            {activeView === 'doc' && (
              <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-5 animate-fadeIn space-y-4">
                {activePhase === 1 && (
                  <div>
                    <div className="text-sm font-bold text-[#00ffff] font-mono mb-2 border-b border-[#12254d] pb-1.5 flex items-center justify-between">
                      <span>1. ORIENTACIÓN DEL ESFUERZO DE BÚSQUEDA</span>
                      <span className="text-xs text-[#3b82f6] font-mono">FASE I</span>
                    </div>
                    <div className="text-xs text-[#cbd5e1] leading-relaxed space-y-3">
                      <p>
                        La <b>Orientación</b> determina qué inteligencia se requiere para las decisiones operacionales estratégicas. Su propósito es guiar de forma eficiente los medios de recolección hacia los objetivos de valor táctico.
                      </p>
                      <strong className="text-[#00ffff] block font-mono text-xs">Elementos Doctrinales:</strong>
                      <ul className="pl-5 list-disc space-y-2 marker:text-[#00ffff]">
                        <li>
                          <b>RPI (Requerimientos Prioritarios de Inteligencia):</b> Aquellas interrogantes críticas que el Comandante necesita responder para tomar una decisión oportuna (e.g. ¿Cuándo y por dónde atacará el adversario?).
                        </li>
                        <li>
                          <b>ORI (Otros Requerimientos de Información):</b> Demandas de información de los demás miembros del Estado Mayor para coordinar maniobras logísticas, de personal o comunicaciones.
                        </li>
                        <li>
                          <b>Plan de Búsqueda:</b> Instrumento interno de coordinación para administrar órganos y medios de recolección de manera integrada.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activePhase === 2 && (
                  <div>
                    <div className="text-sm font-bold text-[#00ffff] font-mono mb-2 border-b border-[#12254d] pb-1.5 flex items-center justify-between">
                      <span>2. BÚSQUEDA DE INFORMACIÓN</span>
                      <span className="text-xs text-[#c084fc] font-mono">FASE II</span>
                    </div>
                    <div className="text-xs text-[#cbd5e1] leading-relaxed space-y-3">
                      <p>
                        La <b>Búsqueda</b> consiste en la explotación sistemática de fuentes mediante diversos procedimientos para transmitir datos de forma segura y oportuna al escalón de análisis.
                      </p>
                      <strong className="text-[#00ffff] block font-mono text-xs">Clasificación de Fuentes (Doctrina Bolivia):</strong>
                      <ul className="pl-5 list-disc space-y-2 marker:text-[#c084fc]">
                        <li><b>Fuentes Primarias:</b> Documentos capturados, señales electromagnéticas directas e imágenes satelitales directas.</li>
                        <li><b>Fuentes Secundarias:</b> Informes procesados o apreciaciones elaboradas por otras agencias de inteligencia.</li>
                        <li><b>Fuentes Públicas:</b> Prensa escrita, medios de comunicación, foros digitales y bibliografía especializada (OSINT).</li>
                        <li><b>Fuentes Secretas:</b> Clandestinas, de difícil acceso y con alta necesidad de compartimentación y protección.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activePhase === 3 && (
                  <div>
                    <div className="text-sm font-bold text-[#00ffff] font-mono mb-2 border-b border-[#12254d] pb-1.5 flex items-center justify-between">
                      <span>3. PROCESAMIENTO DE LA INFORMACIÓN</span>
                      <span className="text-xs text-[#ff0055] font-mono">FASE III</span>
                    </div>
                    <div className="text-xs text-[#cbd5e1] leading-relaxed space-y-3">
                      <p>
                        El <b>Procesamiento</b> es el estudio analítico y metódico del dato para convertirlo en inteligencia táctica o estratégica útil para la toma de decisiones.
                      </p>
                      <strong className="text-[#00ffff] block font-mono text-xs">Las 3 Etapas Fundamentales:</strong>
                      <ul className="pl-5 list-disc space-y-2 marker:text-[#ff0055]">
                        <li><b>Registro:</b> Clasificación y almacenamiento gráfico/físico de la información que ingresa.</li>
                        <li><b>Evaluación:</b> Determinación analítica de la <b>Pertinencia, Confiabilidad</b> (A-F) y <b>Exactitud</b> (1-6) de la fuente y el dato.</li>
                        <li><b>Interpretación:</b> Descomposición lógica (Análisis), síntesis unificada (Integración) y enunciación de conclusiones estimativas (Deducción).</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activePhase === 4 && (
                  <div>
                    <div className="text-sm font-bold text-[#00ffff] font-mono mb-2 border-b border-[#12254d] pb-1.5 flex items-center justify-between">
                      <span>4. DIFUSIÓN Y USO DE LA INTELIGENCIA</span>
                      <span className="text-xs text-[#00ff66] font-mono">FASE IV</span>
                    </div>
                    <div className="text-xs text-[#cbd5e1] leading-relaxed space-y-3">
                      <p>
                        La <b>Difusión</b> asegura que la inteligencia producida llegue de forma oportuna, clara y con los debidos resguardos de seguridad a los tomadores de decisión para orientar las operaciones.
                      </p>
                      <strong className="text-[#00ffff] block font-mono text-xs">Documentos de Difusión Estratégica:</strong>
                      <ul className="pl-5 list-disc space-y-2 marker:text-[#00ff66]">
                        <li><b>Apreciación / Examen de Situación:</b> Evaluación analítica formal de las capacidades y probables cursos de acción del enemigo.</li>
                        <li><b>Anexo de Inteligencia:</b> Suplemento de inteligencia para planes o directivas militares de campaña.</li>
                        <li><b>IPI (Informe Periódico de Inteligencia):</b> Actualización regular de la situación de los componentes y frentes operacionales.</li>
                      </ul>
                    </div>
                  </div>
                )}

                {activePhase === 0 && (
                  <div>
                    <div className="text-sm font-bold text-[#ffaa00] font-mono mb-2 border-b border-[#12254d] pb-1.5 flex items-center justify-between">
                      <span>MISIÓN: CONDUCCIÓN Y PLANEAMIENTO</span>
                      <span className="text-xs text-[#ffaa00] font-mono">NÚCLEO CENTRAL</span>
                    </div>
                    <div className="text-xs text-[#cbd5e1] leading-relaxed space-y-3">
                      <p>
                        La <b>Misión</b> es el corazón del Ciclo de Inteligencia. Orienta y unifica de manera proactiva todos los esfuerzos analíticos para satisfacer las necesidades de información del Mando Militar.
                      </p>
                      <p>
                        En el Estado Plurinacional de Bolivia, el planeamiento de operaciones militares se apoya firmemente en el análisis sistemático de la amenaza para preservar la soberanía y defensa de la patria.
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-[#12254d] flex justify-end">
                  <button
                    onClick={startSimulator}
                    className="py-2 px-4 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>INICIAR SIMULACIÓN DE CRISIS</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* ===================================================================== */}
            {/* VISTA B: WAR GAME SIMULATOR                                           */}
            {/* ===================================================================== */}
            {activeView === 'sim' && (
              <div className="space-y-4 animate-fadeIn">
                
                {/* HUD Header */}
                <div className="flex justify-between items-center bg-[#ff0055]/[0.04] border border-[#12254d] p-3 rounded-md">
                  <div>
                    <span className="font-mono text-[10px] text-[#64748b] block">TIEMPO DE DECISIÓN CRÍTICO:</span>
                    <span className="font-mono text-2xl font-bold text-[#ff0055] tracking-wider">
                      {timerExpired ? '00:00 - EXPIRADO' : formatTimer(timerSeconds)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] text-[#64748b] block">ESTADO DE LA OPERACIÓN:</span>
                    <span className="text-xs font-bold text-[#ffaa00] font-mono">
                      {simStep === 1 && 'FASE 1: DETERMINACIÓN DE REQUERIMIENTOS'}
                      {simStep === 2 && 'FASE 2: ASIGNACIÓN DE ÓRGANOS DE BÚSQUEDA'}
                      {simStep === 3 && 'FASE 3: REGISTRO Y EVALUACIÓN ANALÍTICA'}
                      {simStep === 4 && 'FASE 4: DIFUSIÓN Y APRECIACIÓN ESTIMATIVA'}
                    </span>
                  </div>
                </div>

                {/* PASO 1: ORIENTACIÓN (RPI VS ORI TRIAGE) */}
                {simStep === 1 && (
                  <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4 space-y-3">
                    <div className="text-sm font-bold text-[#00ffff] font-mono border-b border-[#12254d] pb-1.5 flex items-center justify-between">
                      <span>PASO 1: CLASIFICACIÓN DE REQUERIMIENTOS (RPI VS ORI)</span>
                      <span className="text-xs text-[#cbd5e1] font-mono">+25 XP</span>
                    </div>
                    <p className="text-xs text-[#64748b]">
                      <b>Misión:</b> Incursión cibernética y hostil asimétrica en la subestación SCADA de la frontera. Clasifique las interrogantes del Comando para encuadrar la búsqueda.
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs border border-[#12254d]">
                        <thead>
                          <tr className="bg-[#030611] text-[#00ffff] font-mono border-b border-[#12254d]">
                            <th className="p-2.5 text-left border-r border-[#12254d]">Interrogante del Escalón Superior</th>
                            <th className="p-2.5 text-center w-[35%]">Clasificación Doctrinal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#12254d]">
                          <tr className="bg-[#02040b]">
                            <td className="p-2.5 text-slate-200 border-r border-[#12254d]">
                              ¿Procederá el oponente a cortar el suministro eléctrico del hospital de campaña del Sector Este mediante ciberataque SCADA?
                            </td>
                            <td className="p-2 text-center">
                              <select 
                                value={selRpi1}
                                onChange={(e) => handleStep1Change(e.target.value, selRpi2)}
                                className={`w-full bg-[#02040b] border rounded p-1.5 text-xs outline-none transition-colors ${
                                  selRpi1 === 'RPI' 
                                    ? 'border-[#00ff66] text-[#00ff66] bg-[#00ff66]/10' 
                                    : 'border-[#12254d] text-white focus:border-[#00ffff]'
                                }`}
                              >
                                <option value="none">-- Seleccionar --</option>
                                <option value="RPI">RPI (Interrogante del Comandante)</option>
                                <option value="ORI">ORI (Requerimiento de Estado Mayor)</option>
                              </select>
                            </td>
                          </tr>
                          <tr className="bg-[#02040b]">
                            <td className="p-2.5 text-slate-200 border-r border-[#12254d]">
                              ¿Cuál es la tasa de consumo logístico mensual de raciones de combate de nuestras tropas de reserva en el Sector Central?
                            </td>
                            <td className="p-2 text-center">
                              <select 
                                value={selRpi2}
                                onChange={(e) => handleStep1Change(selRpi1, e.target.value)}
                                className={`w-full bg-[#02040b] border rounded p-1.5 text-xs outline-none transition-colors ${
                                  selRpi2 === 'ORI' 
                                    ? 'border-[#00ff66] text-[#00ff66] bg-[#00ff66]/10' 
                                    : 'border-[#12254d] text-white focus:border-[#00ffff]'
                                }`}
                              >
                                <option value="none">-- Seleccionar --</option>
                                <option value="RPI">RPI (Interrogante del Comandante)</option>
                                <option value="ORI">ORI (Requerimiento de Estado Mayor)</option>
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className={`text-xs font-mono mt-2 ${step1Feedback.isSuccess ? 'text-[#00ff66]' : 'text-[#ffaa00]'}`}>
                      {step1Feedback.msg}
                    </p>
                  </div>
                )}

                {/* PASO 2: BÚSQUEDA (SELECCIÓN DE FUENTES) */}
                {simStep === 2 && (
                  <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4 space-y-3">
                    <div className="text-sm font-bold text-[#00ffff] font-mono border-b border-[#12254d] pb-1.5 flex items-center justify-between">
                      <span>PASO 2: SELECCIÓN ESTRATÉGICA DE ÓRGANOS Y FUENTES</span>
                      <span className="text-xs text-[#cbd5e1] font-mono">+25 XP</span>
                    </div>
                    <p className="text-xs text-[#64748b]">
                      Para responder a la ciberamenaza SCADA detectada en el Sector Este, asigne los órganos de búsqueda correspondientes bajo el control de la seguridad nacional:
                    </p>

                    <div className="space-y-2.5">
                      <div 
                        onClick={() => toggleSourceOption(1)}
                        className={`p-3 rounded border text-xs cursor-pointer transition-all ${
                          selectedSources.includes(1)
                            ? 'border-[#00ff66] bg-[#00ff66]/10 text-white shadow-[0_0_10px_rgba(0,255,102,0.15)]'
                            : 'border-[#12254d] bg-white/[0.02] text-[#cbd5e1] hover:border-[#00ffff]'
                        }`}
                      >
                        <b>Opción A:</b> Explotar el espectro electromagnético mediante Medidas de Apoyo Electrónico (MAE) de Guerra Electrónica para interceptar el comando remoto hostil.
                      </div>

                      <div 
                        onClick={() => toggleSourceOption(2)}
                        className={`p-3 rounded border text-xs cursor-pointer transition-all ${
                          selectedSources.includes(2)
                            ? 'border-[#00ff66] bg-[#00ff66]/10 text-white shadow-[0_0_10px_rgba(0,255,102,0.15)]'
                            : 'border-[#12254d] bg-white/[0.02] text-[#cbd5e1] hover:border-[#00ffff]'
                        }`}
                      >
                        <b>Opción B:</b> Realizar encuestas sociométricas públicas informales a la población civil en el sector central del país.
                      </div>

                      <div 
                        onClick={() => toggleSourceOption(3)}
                        className={`p-3 rounded border text-xs cursor-pointer transition-all ${
                          selectedSources.includes(3)
                            ? 'border-[#00ff66] bg-[#00ff66]/10 text-white shadow-[0_0_10px_rgba(0,255,102,0.15)]'
                            : 'border-[#12254d] bg-white/[0.02] text-[#cbd5e1] hover:border-[#00ffff]'
                        }`}
                      >
                        <b>Opción C:</b> Explotar IMINT de apertura sintética (SAR) para verificar las coordenadas y actividades en el bosque del Sector Este.
                      </div>
                    </div>

                    {step2Feedback && (
                      <p className={`text-xs font-mono ${step2Feedback.isError ? 'text-[#ff0055]' : 'text-[#00ff66]'}`}>
                        {step2Feedback.msg}
                      </p>
                    )}

                    {selectedSources.length > 0 && (
                      <button 
                        onClick={validateStep2}
                        className="py-2.5 px-4 bg-[#00ff66] hover:bg-[#00e65a] text-[#02040a] font-bold font-mono text-xs rounded transition-colors cursor-pointer"
                      >
                        Enviar Órdenes de Búsqueda (+25 XP)
                      </button>
                    )}
                  </div>
                )}

                {/* PASO 3: PROCESAMIENTO (EVALUACIÓN DE EXACTITUD Y CONFIABILIDAD) */}
                {simStep === 3 && (
                  <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4 space-y-3">
                    <div className="text-sm font-bold text-[#00ffff] font-mono border-b border-[#12254d] pb-1.5 flex items-center justify-between">
                      <span>PASO 3: PROCESAMIENTO Y MATRIZ DE EVALUACIÓN DE INTELIGENCIA</span>
                      <span className="text-xs text-[#cbd5e1] font-mono">+25 XP</span>
                    </div>
                    <p className="text-xs text-[#64748b]">
                      Ha interceptado un reporte del enemigo. Califique de forma independiente la fiabilidad de la fuente y la exactitud del dato para neutralizar campañas de engaño:
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-xs border border-[#12254d]">
                        <thead>
                          <tr className="bg-[#030611] text-[#00ffff] font-mono border-b border-[#12254d]">
                            <th className="p-2 text-left border-r border-[#12254d]">Evidencia Recolectada</th>
                            <th className="p-2 text-center border-r border-[#12254d] w-[28%]">Confiabilidad de la Fuente</th>
                            <th className="p-2 text-center w-[28%]">Exactitud del Dato</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#12254d]">
                          <tr className="bg-[#02040b]">
                            <td className="p-2 text-slate-200 border-r border-[#12254d]">
                              <b>Dato 1:</b> Redes sociales (OSINT) muestran blindados aproximándose (visto en fintas pasadas).
                            </td>
                            <td className="p-2 border-r border-[#12254d]">
                              <select 
                                value={p3Conf1}
                                onChange={(e) => handleStep3Change(e.target.value, p3Ex1, p3Conf2, p3Ex2)}
                                className={`w-full bg-[#02040b] border rounded p-1.5 text-xs outline-none ${
                                  p3Conf1 === 'F' ? 'border-[#00ff66] text-[#00ff66]' : 'border-[#12254d] text-white focus:border-[#00ffff]'
                                }`}
                              >
                                <option value="none">-- Seleccionar --</option>
                                <option value="F">Confiabilidad F (No Fiable)</option>
                                <option value="A">Confiabilidad A (Excelente)</option>
                              </select>
                            </td>
                            <td className="p-2">
                              <select 
                                value={p3Ex1}
                                onChange={(e) => handleStep3Change(p3Conf1, e.target.value, p3Conf2, p3Ex2)}
                                className={`w-full bg-[#02040b] border rounded p-1.5 text-xs outline-none ${
                                  p3Ex1 === '5' ? 'border-[#00ff66] text-[#00ff66]' : 'border-[#12254d] text-white focus:border-[#00ffff]'
                                }`}
                              >
                                <option value="none">-- Seleccionar --</option>
                                <option value="5">5 (Improbable)</option>
                                <option value="1">1 (Confirmado)</option>
                              </select>
                            </td>
                          </tr>

                          <tr className="bg-[#02040b]">
                            <td className="p-2 text-slate-200 border-r border-[#12254d]">
                              <b>Dato 2:</b> Satélite SAR (IMINT) reporta firmas térmicas dinámicas en la subestación SCADA del Este.
                            </td>
                            <td className="p-2 border-r border-[#12254d]">
                              <select 
                                value={p3Conf2}
                                onChange={(e) => handleStep3Change(p3Conf1, p3Ex1, e.target.value, p3Ex2)}
                                className={`w-full bg-[#02040b] border rounded p-1.5 text-xs outline-none ${
                                  p3Conf2 === 'A' ? 'border-[#00ff66] text-[#00ff66]' : 'border-[#12254d] text-white focus:border-[#00ffff]'
                                }`}
                              >
                                <option value="none">-- Seleccionar --</option>
                                <option value="A">Confiabilidad A (Total Fiabilidad Técnica)</option>
                                <option value="F">Confiabilidad F (No Fiable)</option>
                              </select>
                            </td>
                            <td className="p-2">
                              <select 
                                value={p3Ex2}
                                onChange={(e) => handleStep3Change(p3Conf1, p3Ex1, p3Conf2, e.target.value)}
                                className={`w-full bg-[#02040b] border rounded p-1.5 text-xs outline-none ${
                                  p3Ex2 === '1' ? 'border-[#00ff66] text-[#00ff66]' : 'border-[#12254d] text-white focus:border-[#00ffff]'
                                }`}
                              >
                                <option value="none">-- Seleccionar --</option>
                                <option value="1">1 (Confirmado por otras fuentes)</option>
                                <option value="5">5 (Improbable)</option>
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className={`text-xs font-mono mt-2 ${step3Feedback.isSuccess ? 'text-[#00ff66]' : 'text-[#ffaa00]'}`}>
                      {step3Feedback.msg}
                    </p>
                  </div>
                )}

                {/* PASO 4: DIFUSIÓN CON CHATBOT LISA / GRAL OPERACIONES */}
                {simStep === 4 && (
                  <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4 space-y-3">
                    <div className="text-sm font-bold text-[#00ffff] font-mono border-b border-[#12254d] pb-1.5 flex items-center justify-between">
                      <span>PASO 4: DIFUSIÓN Y DEFENSA DEL INFORME ESTIMATIVO</span>
                      <span className="text-xs text-[#cbd5e1] font-mono">+25 XP</span>
                    </div>
                    <p className="text-xs text-[#64748b]">
                      El General del Comando Operacional exige la estimación final. Defienda su tesis mediante el léxico oficial de certeza estimativa de Sherman Kent.
                    </p>

                    <div className="flex flex-col h-[280px] bg-[#02040b] border border-[#12254d] rounded-md overflow-hidden">
                      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                        {chatMessages.map((msg) => (
                          <div 
                            key={msg.id}
                            className={`p-2.5 rounded text-xs max-w-[85%] leading-relaxed ${
                              msg.sender === 'ai'
                                ? 'bg-[#0f1c3a] border-l-3 border-[#00ffff] text-slate-100 self-start'
                                : msg.sender === 'user'
                                  ? 'bg-[#1c335e] text-slate-100 ml-auto'
                                  : 'bg-[#ff0055]/10 border-l-3 border-[#ff0055] text-slate-100 self-start'
                            }`}
                          >
                            <strong className={`block mb-1 text-[11px] font-mono ${
                              msg.sender === 'ai' ? 'text-[#00ffff]' : msg.sender === 'user' ? 'text-[#38bdf8]' : 'text-[#ff0055]'
                            }`}>
                              {msg.author}:
                            </strong>
                            <span>{msg.text}</span>
                          </div>
                        ))}
                        <div ref={chatBottomRef} />
                      </div>

                      <form onSubmit={handleSubmitChat} className="flex p-2 bg-[#050a17] border-t border-[#12254d] gap-2">
                        <input 
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Responda con certeza estimativa (ej: Altamente Probable, Este, finta)..."
                          className="flex-1 bg-[#02040b] border border-[#12254d] rounded text-xs px-3 py-2 text-white focus:border-[#00ffff] outline-none font-sans"
                        />
                        <button 
                          type="submit"
                          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded text-xs font-mono font-bold transition-colors cursor-pointer"
                        >
                          Transmitir
                        </button>
                      </form>
                    </div>

                    {step4Completed && (
                      <button 
                        onClick={handleGenerateScorecard}
                        className="w-full py-3 px-4 bg-[#00ff66] hover:bg-[#00e65a] text-[#02040a] font-bold font-mono text-xs rounded transition-all shadow-[0_0_15px_rgba(0,255,102,0.3)] cursor-pointer flex items-center justify-center gap-2 animate-pulse"
                      >
                        <Award className="w-4 h-4" />
                        <span>🎖️ Generar Boleta de Calificación del Ciclo</span>
                      </button>
                    )}
                  </div>
                )}

              </div>
            )}

          </div>

        </div>

        {/* ========================================================================= */}
        {/* PREVISUALIZACIÓN DE BOLETA DE ACREDITACIÓN / SCORECARD                     */}
        {/* ========================================================================= */}
        {showScorecard && (
          <div 
            ref={scorecardRef}
            className="p-4 sm:p-6 bg-[#060f24] border-t-2 border-[#00ff66] rounded-b-lg transition-all duration-300"
          >
            <div className="flex justify-between items-center border-b border-[#12254d] pb-2 mb-4">
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Award className="w-4 h-4 text-[#00ff66]" />
                <span>PREVISUALIZACIÓN DE BOLETA DE ACREDITACIÓN</span>
              </h3>
              <button 
                onClick={safePrint}
                className="px-3 py-1 bg-white text-black hover:bg-slate-200 rounded text-xs font-bold font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>🖨️ Imprimir Boleta en PDF</span>
              </button>
            </div>

            {/* Certificate Form */}
            <div className="p-6 bg-white text-black rounded max-w-2xl mx-auto shadow-2xl font-serif">
              <div className="text-center mb-3 border-b border-black pb-2">
                <h4 className="text-sm font-bold tracking-wide">ESCUELA DE COMANDO Y ESTADO MAYOR DEL EJÉRCITO</h4>
                <h5 className="text-xs font-normal italic">Mcal. Andrés de Santa Cruz</h5>
                <span className="text-[11px] font-mono block mt-1">SIMULADOR COGNITIVO DEL CICLO DE INTELIGENCIA</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-sans">
                <div><b>OFICIAL:</b> MY. DEM. ALUMNO DE ESTADO MAYOR</div>
                <div><b>FECHA:</b> {today}</div>
                <div><b>FASE EVALUADA:</b> CICLO DE PRODUCCIÓN DE INTELIGENCIA</div>
                <div><b>CALIFICACIÓN FINAL:</b> <span className="font-bold text-emerald-700">{xp} / 100 XP</span></div>
              </div>

              <table className="w-full border-collapse text-xs mb-3 font-sans">
                <thead>
                  <tr className="bg-slate-200 border border-black">
                    <th className="p-1.5 border border-black text-left">Fase del Ciclo</th>
                    <th className="p-1.5 border border-black text-center">Resultado Táctico</th>
                    <th className="p-1.5 border border-black text-center">Acreditación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-black">
                    <td className="p-1.5 border border-black">
                      <b>Fase 1 & 2:</b> Orientación y Búsqueda de Información
                    </td>
                    <td className="p-1.5 border border-black text-center">
                      RPI/ORI Clasificados, Sensores Asignados
                    </td>
                    <td className="p-1.5 border border-black text-center font-bold text-green-700">
                      COMPLETO
                    </td>
                  </tr>
                  <tr className="border border-black">
                    <td className="p-1.5 border border-black">
                      <b>Fase 3 & 4:</b> Procesamiento y Difusión Estimativa (Kent)
                    </td>
                    <td className="p-1.5 border border-black text-center">
                      Evaluación de Datos Realizada, Tesis Defendida
                    </td>
                    <td className="p-1.5 border border-black text-center font-bold text-green-700">
                      COMPLETO
                    </td>
                  </tr>
                  <tr className="bg-slate-100 border border-black font-bold">
                    <td className="p-1.5 border border-black text-right">ESTADO DE GRADUACIÓN:</td>
                    <td className="p-1.5 border border-black text-center text-emerald-800">
                      {xp >= 80 ? 'EXCELENTE // CERTIFICADO' : 'PENDIENTE'}
                    </td>
                    <td className="p-1.5 border border-black text-center text-green-700">
                      APROBADO
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="text-[10px] border-t border-dashed border-black pt-2 text-center italic">
                "Ser antes que Parecer" // Verificación Digital del Mando Militar de Bolivia
              </div>
            </div>
          </div>
        )}

      </div>

      {/* HIDDEN PRINT VIEW FOR DIRECT PDF GENERATION */}
      <div id="scorecard-print-area" className="hidden print:block font-serif p-10 bg-white text-black">
        <div className="text-center mb-6 border-b-2 border-black pb-3">
          <h2 className="text-xl font-bold uppercase">ESTADO PLURINACIONAL DE BOLIVIA</h2>
          <h3 className="text-lg font-bold">ESCUELA DE COMANDO Y ESTADO MAYOR DEL EJÉRCITO</h3>
          <h4 className="text-base italic">"Mcal. Andrés de Santa Cruz"</h4>
          <p className="font-mono text-xs mt-1">SISTEMA VIRTUAL DE ADIESTRAMIENTO DE INTELIGENCIA DE ESTADO MAYOR (CVIE)</p>
        </div>

        <div className="mb-6 text-sm leading-relaxed">
          <p><b>OFICIAL EVALUADO:</b> MY. DEM. EXAMINADO GENERAL</p>
          <p><b>EVALUACIÓN:</b> ACUMULATIVO: CICLO DE INTELIGENCIA ESTRATÉGICA (BOLIVIA)</p>
          <p><b>FECHA DE EMISIÓN:</b> {today}</p>
          <p><b>PUNTUACIÓN INTEGRAL CVIE:</b> {xp} / 100 XP</p>
        </div>

        <table className="w-full border-collapse border border-black text-sm my-4">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-black p-2 text-left">Eje Evaluativo de Competencias</th>
              <th className="border border-black p-2 text-left">Metodología Doctrinal</th>
              <th className="border border-black p-2 text-center">Desempeño / Puntos (XP)</th>
              <th className="border border-black p-2 text-center">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2"><b>Orientación y Búsqueda</b></td>
              <td className="border border-black p-2">Clasificación RPI/ORI y Selección de Fuentes Tácticas</td>
              <td className="border border-black p-2 text-center">50 / 50 XP</td>
              <td className="border border-black p-2 text-center font-bold text-green-700">APROBADO</td>
            </tr>
            <tr>
              <td className="border border-black p-2"><b>Procesamiento y Difusión</b></td>
              <td className="border border-black p-2">Matriz de Evaluación de Gibson e Inferencia de Sherman Kent</td>
              <td className="border border-black p-2 text-center">50 / 50 XP</td>
              <td className="border border-black p-2 text-center font-bold text-green-700">APROBADO</td>
            </tr>
            <tr className="font-bold bg-slate-100">
              <td colSpan={2} className="border border-black p-2 text-right">CALIFICACIÓN FINAL INTEGRADA:</td>
              <td className="border border-black p-2 text-center">100 / 100 XP</td>
              <td className="border border-black p-2 text-center text-green-700">SABER Y HACER ACREDITADO</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-16 flex justify-around text-center text-xs">
          <div>
            <div className="border-t border-black w-48 mx-auto pt-1">Firma del Analista Evaluado</div>
          </div>
          <div>
            <div className="border-t border-black w-48 mx-auto pt-1">Director de Evaluación CVIE</div>
          </div>
        </div>
      </div>

    </div>
  );
}
