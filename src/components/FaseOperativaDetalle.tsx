import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Radio, 
  Satellite, 
  Shield, 
  Send, 
  Printer, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Activity, 
  FileText, 
  Check, 
  Eye, 
  Radar,
  ArrowRight,
  Sparkles,
  Lock,
  Flame,
  Globe
} from 'lucide-react';
import { safePrint } from '../utils/safePrint';

interface FaseOperativaDetalleProps {
  onClose?: () => void;
  onEnterModule?: () => void;
  onCompletePhase?: () => void;
}

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  type: 'ai' | 'user' | 'red';
}

export function FaseOperativaDetalle({ onClose, onCompletePhase }: FaseOperativaDetalleProps) {
  // Global Application State
  const [activeTab, setActiveTab] = useState<number>(0);
  const [saberXP, setSaberXP] = useState<number>(0);
  const [hacerXP, setHacerXP] = useState<number>(0);

  // Tab 1: Centro de Fusión ISR (Sensors)
  const [activeSensor, setActiveSensor] = useState<'osint' | 'imint' | 'sigint' | 'humint'>('osint');

  // Tab 2: El Método Gibson (Gibson Matrix)
  const [gibConf1, setGibConf1] = useState<string>('none');
  const [gibEx1, setGibEx1] = useState<string>('none');
  const [gibConf2, setGibConf2] = useState<string>('none');
  const [gibEx2, setGibEx2] = useState<string>('none');
  const [gibsonValidated, setGibsonValidated] = useState<boolean>(false);
  const [gibsonXPClaimed, setGibsonXPClaimed] = useState<boolean>(false);

  // Tab 3: Resguardo OPSEC de Campaña
  const [emconActive, setEmconActive] = useState<boolean>(false);
  const [geointSanitized, setGeointSanitized] = useState<boolean>(false);

  // Tab 4: Red Team (LISA) & Evaluación Final
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      author: 'TUTOR LISA (CYBER-RED)',
      text: 'Oficial analista, iniciamos su examen final sumativo para la acreditación en la CVIE. Al integrar los flujos Multi-INT en tiempo real de la frontera norte boliviana: ¿Hacia qué sector geográfico orientará los refuerzos tácticos defensivos y bajo qué justificación científica basada en el satélite SAR desvirtúa el convoy del oeste?',
      type: 'ai'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [simStep, setSimStep] = useState<number>(0);
  const [resilienceScore, setResilienceScore] = useState<number>(0);
  const [showScorecard, setShowScorecard] = useState<boolean>(false);

  // Operational Timers (4 minutes per stage)
  const [timers, setTimers] = useState<{ [key: string]: number }>({
    w1: 240,
    w2: 240,
    w3: 240,
    w4: 240
  });

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const scorecardRef = useRef<HTMLDivElement>(null);

  // Global XP calculation
  const globalXP = Math.min(100, saberXP + hacerXP);

  // Countdown timer for the currently active tab
  useEffect(() => {
    const key = `w${activeTab + 1}`;
    const timerInterval = setInterval(() => {
      setTimers((prev) => {
        if (prev[key] <= 0) return prev;
        return { ...prev, [key]: prev[key] - 1 };
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [activeTab]);

  // Scroll chat to bottom
  useEffect(() => {
    if (activeTab === 3 && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

  // Helper to format seconds as mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Evaluate Gibson Matrix inputs
  const isOsintCorrect = gibConf1 === 'F' && gibEx1 === '5';
  const isImintCorrect = gibConf2 === 'A' && gibEx2 === '1';

  useEffect(() => {
    if (isOsintCorrect && isImintCorrect) {
      setGibsonValidated(true);
    } else {
      setGibsonValidated(false);
    }
  }, [isOsintCorrect, isImintCorrect]);

  const handleSaveGibsonXP = () => {
    if (!gibsonXPClaimed) {
      setSaberXP((prev) => Math.max(prev, 30));
      setGibsonXPClaimed(true);
    }
  };

  // Evaluate OPSEC actions
  const handleToggleEmcon = () => {
    const nextVal = !emconActive;
    setEmconActive(nextVal);
    if (nextVal && geointSanitized) {
      setHacerXP((prev) => Math.max(prev, 30));
    }
  };

  const handleSanitizeGeoint = () => {
    setGeointSanitized(true);
    if (emconActive) {
      setHacerXP((prev) => Math.max(prev, 30));
    }
  };

  // Submit response in Red Team Chat
  const handleSubmitChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const txt = chatInput.trim();
    if (!txt) return;

    // Append user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      author: 'ANALISTA DE INTELIGENCIA',
      text: txt,
      type: 'user'
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    const lower = txt.toLowerCase();

    setTimeout(() => {
      if (simStep === 0) {
        const sectorMatched = lower.includes('este') || lower.includes('scada') || lower.includes('fluvial');
        const reasonMatched = lower.includes('calor') || lower.includes('térmic') || lower.includes('termic') || lower.includes('sar') || lower.includes('señuel') || lower.includes('senuel');

        if (sectorMatched && reasonMatched) {
          const aiMsg: ChatMessage = {
            id: `ai-${Date.now()}`,
            author: 'TUTOR LISA (CYBER-RED)',
            text: 'Excelente deducción analítica. El satélite SAR demuestra firma térmica nula (temperatura ambiente) en el Oeste, delatando los señuelos inflables hostiles. Por ende, la verdadera penetración asimétrica es en el Sector Este. Segunda pregunta: ¿Qué protocolos OPSEC activó para denegar la interceptación electromagnética de nuestra artillería y evitar un contragolpe hostil?',
            type: 'ai'
          };
          setChatMessages((prev) => [...prev, aiMsg]);
          setSaberXP(50);
          setHacerXP((prev) => Math.min(50, prev + 10));
          setSimStep(1);
        } else {
          const redMsg: ChatMessage = {
            id: `red-${Date.now()}`,
            author: 'TUTOR LISA (CYBER-RED)',
            text: 'Respuesta vulnerable. Se está anclando en la masa de blindados falsos del Oeste (propaganda OSINT). Reevalúe los informes del satélite SAR y recuerde el principio de falsación.',
            type: 'red'
          };
          setChatMessages((prev) => [...prev, redMsg]);
        }
      } else if (simStep === 1) {
        const opsecMatched = lower.includes('emcon') || lower.includes('silencio') || lower.includes('sanitiz') || lower.includes('exif') || lower.includes('gps');

        if (opsecMatched) {
          const aiMsg: ChatMessage = {
            id: `ai-${Date.now()}`,
            author: 'TUTOR LISA (CYBER-RED)',
            text: 'Correcto. La combinación del silencio EMCON y la sanitización de metadatos GEOINT EXIF protege de forma hermética el despliegue del Ejército de Bolivia. Examen completado con distinción en la ECEME.',
            type: 'ai'
          };
          setChatMessages((prev) => [...prev, aiMsg]);
          setHacerXP(50);
          setResilienceScore(100);
          if (onCompletePhase) onCompletePhase();
        } else {
          const redMsg: ChatMessage = {
            id: `red-${Date.now()}`,
            author: 'TUTOR LISA (CYBER-RED)',
            text: 'Vulnerable analista. Sin silencio EMCON de transmisiones o sin sanitización EXIF, sus radares y piezas de artillería quedarán expuestos a contrabatería táctica en minutos.',
            type: 'red'
          };
          setChatMessages((prev) => [...prev, redMsg]);
        }
      }
    }, 600);
  };

  const handleGenerateScorecard = () => {
    setShowScorecard(true);
    setTimeout(() => {
      scorecardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-4 text-slate-100 print:bg-white print:p-0 print:m-0"
    >
      
      {/* Embedded Styles for Radar Animation and Media Print */}
      <style>{`
        @keyframes radar-sweep {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .radar-line-anim {
          position: absolute;
          width: 100%;
          height: 2px;
          background: rgba(0, 255, 255, 0.6);
          top: 0;
          left: 0;
          animation: radar-sweep 4s linear infinite;
        }
        @keyframes pulse-blip {
          from { opacity: 0.3; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1.3); }
        }
        .blip-pulse-red {
          animation: pulse-blip 1s infinite alternate;
        }
        .blip-pulse-amber {
          animation: pulse-blip 1.5s infinite alternate;
        }
        @media print {
          body * { visibility: hidden !important; }
          #scorecard-print-area, #scorecard-print-area * { visibility: visible !important; }
          #scorecard-print-area {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            color: #000 !important;
            background: #fff !important;
            padding: 40px;
            font-family: "Times New Roman", Times, serif;
          }
        }
      `}</style>

      {/* Main Container Box */}
      <div className="max-w-[1600px] w-full mx-auto my-auto bg-[#070d1e] border border-[#12254d] rounded-lg overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.85)] print:hidden">
        
        {/* TOP OPERATIONAL BAR */}
        <header className="bg-[#030612] border-b-2 border-[#12254d] px-4 sm:px-6 py-3.5 flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-[#00ffff]/10 border border-[#00ffff] text-[#00ffff] font-mono text-[11px] sm:text-xs px-2.5 py-1 rounded tracking-widest uppercase font-bold">
              CVIE FASE IV // INMERSIÓN OPERATIVA
            </span>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white leading-tight">
                Fusión de Sensores ISR en Tiempo Real (Multi-INT)
              </h1>
              <p className="text-[11px] text-[#64748b]">
                Modelo de Amenazas EM-MI-AA-02 de la ECEME [Doctrina de Bolivia]
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-[#00ff66] font-bold bg-[#00ff66]/10 px-3 py-1.5 rounded border border-[#00ff66]/30">
              SISTEMA ACTIVO // XP ACUMULADO: <span className="text-white font-black">{globalXP}</span> / 100
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1.5 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Cerrar módulo"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {/* NAVIGATION WINDOW WORKFLOW */}
        <nav className="flex bg-[#030510] border-b border-[#12254d] flex-wrap">
          <button
            onClick={() => setActiveTab(0)}
            className={`flex-1 min-w-[170px] py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-3 transition-all cursor-pointer ${
              activeTab === 0
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>📡</span>
            <span>1. Centro de Fusión ISR</span>
          </button>

          <button
            onClick={() => setActiveTab(1)}
            className={`flex-1 min-w-[170px] py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-3 transition-all cursor-pointer ${
              activeTab === 1
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>🔬</span>
            <span>2. El Método Gibson</span>
          </button>

          <button
            onClick={() => setActiveTab(2)}
            className={`flex-1 min-w-[170px] py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-3 transition-all cursor-pointer ${
              activeTab === 2
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>🛡️</span>
            <span>3. Resguardo OPSEC de Campaña</span>
          </button>

          <button
            onClick={() => setActiveTab(3)}
            className={`flex-1 min-w-[170px] py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-3 transition-all cursor-pointer ${
              activeTab === 3
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <span>🎯</span>
            <span>4. Red Team & Evaluación Final</span>
          </button>
        </nav>

        {/* WINDOW 1: CENTRO DE FUSIÓN ISR */}
        {activeTab === 0 && (
          <div className="p-4 sm:p-6 min-h-[620px] transition-opacity duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-3 border-b border-[#12254d] pb-1.5 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-[#00ffff]" />
                    <span>ALIMENTACIÓN MULTI-INT DE SENSORES EN TIEMPO REAL</span>
                  </div>
                  <p className="text-xs text-[#64748b] mb-3">
                    Examine de manera sistemática los sensores tácticos disponibles en la frontera fluvial para resolver la discrepancia de las fuerzas hostiles.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    <button 
                      onClick={() => setActiveSensor('osint')}
                      className={`py-3 px-2 rounded font-mono text-xs transition-all cursor-pointer border text-center ${
                        activeSensor === 'osint'
                          ? 'bg-[#00ffff]/10 border-[#00ffff] text-[#00ffff] font-bold shadow-[0_0_12px_rgba(0,255,255,0.2)]'
                          : 'bg-[#030612] border-[#12254d] text-[#64748b] hover:border-[#00ffff] hover:text-white'
                      }`}
                    >
                      OSINT (Abierta)
                    </button>
                    <button 
                      onClick={() => setActiveSensor('imint')}
                      className={`py-3 px-2 rounded font-mono text-xs transition-all cursor-pointer border text-center ${
                        activeSensor === 'imint'
                          ? 'bg-[#00ffff]/10 border-[#00ffff] text-[#00ffff] font-bold shadow-[0_0_12px_rgba(0,255,255,0.2)]'
                          : 'bg-[#030612] border-[#12254d] text-[#64748b] hover:border-[#00ffff] hover:text-white'
                      }`}
                    >
                      IMINT / SAR (Satélite)
                    </button>
                    <button 
                      onClick={() => setActiveSensor('sigint')}
                      className={`py-3 px-2 rounded font-mono text-xs transition-all cursor-pointer border text-center ${
                        activeSensor === 'sigint'
                          ? 'bg-[#00ffff]/10 border-[#00ffff] text-[#00ffff] font-bold shadow-[0_0_12px_rgba(0,255,255,0.2)]'
                          : 'bg-[#030612] border-[#12254d] text-[#64748b] hover:border-[#00ffff] hover:text-white'
                      }`}
                    >
                      SIGINT (Señales)
                    </button>
                    <button 
                      onClick={() => setActiveSensor('humint')}
                      className={`py-3 px-2 rounded font-mono text-xs transition-all cursor-pointer border text-center ${
                        activeSensor === 'humint'
                          ? 'bg-[#00ffff]/10 border-[#00ffff] text-[#00ffff] font-bold shadow-[0_0_12px_rgba(0,255,255,0.2)]'
                          : 'bg-[#030612] border-[#12254d] text-[#64748b] hover:border-[#00ffff] hover:text-white'
                      }`}
                    >
                      HUMINT (Humana)
                    </button>
                  </div>

                  <div className="bg-[#02040a] border border-dashed border-[#12254d] rounded-md p-4 min-h-[220px]">
                    {activeSensor === 'osint' && (
                      <div className="font-mono text-xs space-y-2">
                        <span className="text-[#00ffff] font-bold block">[OSINT ALERTA DE FLUX / REDES DIGITALES]:</span>
                        <div className="bg-white/[0.02] p-3 rounded text-slate-100 border-l-3 border-[#00ffff] leading-relaxed">
                          <b>Viral en Red 'X' (Frontera Norte):</b> Cuentas extranjeras publican videos de alta resolución de un convoy de 40 tanques pesados movilizándose por la autopista del Sector Oeste. Pánico social en aumento.
                        </div>
                      </div>
                    )}

                    {activeSensor === 'imint' && (
                      <div className="font-mono text-xs space-y-2">
                        <span className="text-[#00ffff] font-bold block">[IMINT / SAR INTERCEPTACIÓN SATELITAL ACTIVA]:</span>
                        <div className="bg-white/[0.02] p-3 rounded text-slate-100 border-l-3 border-[#ff0055] space-y-2.5 leading-relaxed">
                          <div>
                            <p className="text-[#ff0055] font-bold">Sector Oeste:</p>
                            <p>Se verifica el relieve de las siluetas blindadas reportadas en OSINT. Sin embargo, el sensor térmico del satélite reporta: <b className="text-amber-400">LECTURA DE EMISIÓN DE CALOR: 0%</b> (Temperatura ambiente). Tanques estáticos lógicamente imposibles. <b className="text-red-400">[SEÑUELOS DE PLÁSTICO INFLABLES DETECTADOS]</b>.</p>
                          </div>
                          <div>
                            <p className="text-[#00ff66] font-bold">Sector Este (Bosque Fluvial SCADA):</p>
                            <p>El barrido de apertura sintética revela <b>múltiples firmas térmicas dinámicas dispersas</b> moviéndose de forma silenciosa entre el follaje hacia la subestación SCADA de bombeo de combustible. <b className="text-emerald-400">[DESPLIEGUE INFANTRÍA HOSTIL]</b>.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSensor === 'sigint' && (
                      <div className="font-mono text-xs space-y-2">
                        <span className="text-[#00ffff] font-bold block">[SIGINT MONITOREO DE ESPECTRO EM]:</span>
                        <div className="bg-white/[0.02] p-3 rounded text-slate-100 border-l-3 border-[#3b82f6] leading-relaxed">
                          <b>Estación de Escucha:</b> Captura de ráfaga de datos militares cifrados de alta velocidad en la frecuencia de 435.2 MHz. Triangulación de antena localiza el transmisor de origen exactamente en el <b className="text-[#38bdf8]">Sector Este (Bosque Fluvial)</b>. Intenciones de comando remoto de malware SCADA inminente.
                        </div>
                      </div>
                    )}

                    {activeSensor === 'humint' && (
                      <div className="font-mono text-xs space-y-2">
                        <span className="text-[#00ffff] font-bold block">[HUMINT REPORTES DE TERRENO]:</span>
                        <div className="bg-white/[0.02] p-3 rounded text-slate-100 border-l-3 border-[#ffaa00] space-y-2 leading-relaxed">
                          <p><b>Reporte Informante Local (Sector Oeste):</b> Agricultores de la frontera observaron a ingenieros hostiles armando y desarmando grandes globos de plástico verde de forma cilíndrica.</p>
                          <p><b>Reporte Patrulla 4 (Sector Este):</b> Patrulla de reconocimiento fluvial reporta cercados perimetrales saboteados y cables de telecomunicación cortados cerca de la subestación SCADA de bombeo de combustible.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Situation Map Mockup */}
                <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-3 border-b border-[#12254d] pb-1.5 flex items-center gap-2">
                    <Radar className="w-4 h-4 text-[#00ffff]" />
                    <span>CARTA DE SITUACIÓN EN TIEMPO REAL</span>
                  </div>
                  <div className="w-full h-48 bg-[radial-gradient(circle,#0c1c3f_10%,#02040a_90%)] border border-[#12254d] rounded relative overflow-hidden">
                    <div className="radar-line-anim" />
                    <div className="absolute top-[30%] left-[20%] w-2.5 h-2.5 rounded-full bg-[#ff0055] shadow-[0_0_10px_#ff0055] blip-pulse-red" />
                    <div className="absolute top-[70%] left-[75%] w-2.5 h-2.5 rounded-full bg-[#ffaa00] shadow-[0_0_10px_#ffaa00] blip-pulse-amber" />
                    <span className="absolute top-3 left-3 text-[11px] font-mono text-[#ff0055] bg-black/60 px-2 py-0.5 rounded border border-[#ff0055]/40">
                      Sector Oeste: Blindados Visibles
                    </span>
                    <span className="absolute bottom-3 right-3 text-[11px] font-mono text-[#ffaa00] bg-black/60 px-2 py-0.5 rounded border border-[#ffaa00]/40">
                      Sector Este: Área Forestal SCADA
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-4">
                <div className="bg-[#ff0055]/10 border border-[#ff0055] p-3.5 rounded-md text-center">
                  <div className="text-[11px] font-mono text-[#cbd5e1] mb-1">VENTANA CRÍTICA DE PLANIFICACIÓN:</div>
                  <div className="font-mono text-3xl font-bold text-[#ff0055] tracking-wider">
                    {formatTime(timers.w1)}
                  </div>
                </div>

                <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-3 border-b border-[#12254d] pb-1.5">
                    REQUERIMIENTOS
                  </div>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    De acuerdo con Richards Heuer, la inteligencia no debe anclarse en la evidencia visual inicial. OSINT presenta alta vulnerabilidad a campañas de desinformación. El análisis de imágenes de radar satelital (IMINT/SAR) es imperativo para validar firmas térmicas reales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WINDOW 2: EL MÉTODO GIBSON (7 PASOS) */}
        {activeTab === 1 && (
          <div className="p-4 sm:p-6 min-h-[620px] transition-opacity duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-2 border-b border-[#12254d] pb-1.5">
                    MATRIZ GIBSON - FASE 3: CALIFICACIÓN DE SENSORES
                  </div>
                  <p className="text-xs text-[#64748b] mb-4">
                    Aplique rigor científico. Califique de forma institucional la fiabilidad y exactitud de las fuentes analizadas en el Centro de Fusión:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-xs border border-[#12254d]">
                      <thead>
                        <tr className="bg-[#030611] text-[#00ffff] font-mono border-b border-[#12254d]">
                          <th className="p-2.5 text-left border-r border-[#12254d]">Fuente / Sensor</th>
                          <th className="p-2.5 text-center border-r border-[#12254d]">Confiabilidad de la Fuente (A-F)</th>
                          <th className="p-2.5 text-center border-r border-[#12254d]">Exactitud del Dato (1-6)</th>
                          <th className="p-2.5 text-center">Valor Metodológico</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#12254d]">
                        {/* OSINT Row */}
                        <tr className="bg-[#02040b]">
                          <td className="p-2.5 font-semibold text-slate-200 border-r border-[#12254d]">
                            OSINT (Video de Blindados en Oeste)
                          </td>
                          <td className="p-2 border-r border-[#12254d]">
                            <select 
                              value={gibConf1}
                              onChange={(e) => setGibConf1(e.target.value)}
                              className="w-full bg-[#02040a] text-white border border-[#12254d] rounded p-1.5 text-xs focus:border-[#00ffff] outline-none"
                            >
                              <option value="none">-- Seleccionar --</option>
                              <option value="A">Confiabilidad A (Excelente)</option>
                              <option value="F">Confiabilidad F (Improbable / No calificado)</option>
                            </select>
                          </td>
                          <td className="p-2 border-r border-[#12254d]">
                            <select 
                              value={gibEx1}
                              onChange={(e) => setGibEx1(e.target.value)}
                              className="w-full bg-[#02040a] text-white border border-[#12254d] rounded p-1.5 text-xs focus:border-[#00ffff] outline-none"
                            >
                              <option value="none">-- Seleccionar --</option>
                              <option value="1">1 (Confirmado por otras fuentes)</option>
                              <option value="5">5 (Dudoso / No corroborado)</option>
                            </select>
                          </td>
                          <td className="p-2.5 text-center font-bold font-mono">
                            {isOsintCorrect ? (
                              <span className="text-[#00ff66]">Correcto (F-5)</span>
                            ) : (
                              <span className="text-slate-500">Pendiente</span>
                            )}
                          </td>
                        </tr>

                        {/* IMINT/SAR Row */}
                        <tr className="bg-[#02040b]">
                          <td className="p-2.5 font-semibold text-slate-200 border-r border-[#12254d]">
                            IMINT/SAR (Firma Térmica Cero)
                          </td>
                          <td className="p-2 border-r border-[#12254d]">
                            <select 
                              value={gibConf2}
                              onChange={(e) => setGibConf2(e.target.value)}
                              className="w-full bg-[#02040a] text-white border border-[#12254d] rounded p-1.5 text-xs focus:border-[#00ffff] outline-none"
                            >
                              <option value="none">-- Seleccionar --</option>
                              <option value="A">Confiabilidad A (Total Fiabilidad Técnica)</option>
                              <option value="E">Confiabilidad E (No Fiable)</option>
                            </select>
                          </td>
                          <td className="p-2 border-r border-[#12254d]">
                            <select 
                              value={gibEx2}
                              onChange={(e) => setGibEx2(e.target.value)}
                              className="w-full bg-[#02040a] text-white border border-[#12254d] rounded p-1.5 text-xs focus:border-[#00ffff] outline-none"
                            >
                              <option value="none">-- Seleccionar --</option>
                              <option value="1">1 (Veracidad física absoluta)</option>
                              <option value="6">6 (Sin base para juzgar)</option>
                            </select>
                          </td>
                          <td className="p-2.5 text-center font-bold font-mono">
                            {isImintCorrect ? (
                              <span className="text-[#00ff66]">Correcto (A-1)</span>
                            ) : (
                              <span className="text-slate-500">Pendiente</span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ACH Dynamic Section */}
                <div className="bg-[#091228] border border-[#12254d] rounded-md p-4">
                  <div className="font-mono text-xs text-[#00ffff] mb-1 font-bold">
                    FASE 4 Y 5: INTERPRETACIÓN DE DISCREPANCIAS (ACH)
                  </div>
                  {gibsonValidated ? (
                    <div>
                      <p className="text-xs text-[#00ff66] leading-relaxed mb-3">
                        <b>Fase 3 Validada con Éxito.</b> Ha registrado la procedencia metodológica de forma impecable. Habilitando la Fase 4 y 5 de Heuer ACH en tiempo real para resolver el teatro de operaciones.
                      </p>
                      <div className="mt-3 border-t border-[#12254d] pt-3">
                        <p className="text-xs text-[#ffaa00] mb-3 leading-relaxed">
                          <b>Resultado ACH:</b> Las firmas térmicas del satélite SAR confirman que el convoy del Oeste no emite calor (señuelos). El verdadero esfuerzo de penetración asimétrica es en el Este.
                        </p>
                        <button 
                          onClick={handleSaveGibsonXP}
                          disabled={gibsonXPClaimed}
                          className={`px-4 py-2 rounded text-xs font-bold font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                            gibsonXPClaimed
                              ? 'bg-[#00ff66]/20 text-[#00ff66] border border-[#00ff66]/40 cursor-default'
                              : 'bg-[#00ff66] hover:bg-[#00e65a] text-[#02040a]'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                          <span>{gibsonXPClaimed ? 'Conclusiones Gibson Validadas (+30 XP)' : 'Validar Conclusiones de Gibson (+30 XP)'}</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs italic text-slate-400">
                      Complete la calificación de la Fase 3 de Gibson para habilitar Heuer ACH.
                    </p>
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-4">
                <div className="bg-[#ff0055]/10 border border-[#ff0055] p-3.5 rounded-md text-center">
                  <div className="text-[11px] font-mono text-[#cbd5e1] mb-1">TIEMPO GIBSON DISPONIBLE:</div>
                  <div className="font-mono text-3xl font-bold text-[#ff0055] tracking-wider">
                    {formatTime(timers.w2)}
                  </div>
                </div>

                <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-3 border-b border-[#12254d] pb-1.5">
                    MÉTODO CIENTÍFICO
                  </div>
                  <p className="text-xs text-[#64748b] leading-relaxed">
                    El Método Gibson exige registrar metódicamente la procedencia y calidad del dato (Fase 3: Reunión), para luego compararlo físicamente y aplicar la falsación heurística (Fase 4: Interpretación).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WINDOW 3: RESGUARDO OPSEC DE CAMPAÑA */}
        {activeTab === 2 && (
          <div className="p-4 sm:p-6 min-h-[620px] transition-opacity duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-2 border-b border-[#12254d] pb-1.5">
                    PROTOCOLOS DE CONTRA-INTERCEPTACIÓN ACTIVA
                  </div>
                  <p className="text-xs text-[#64748b] mb-4">
                    El adversario dispone de interceptación SIGINT de gran capacidad. Debe ejecutar de forma urgente los resguardos OPSEC para proteger las posiciones del Ejército de Bolivia.
                  </p>

                  <div className="flex items-center gap-3 bg-[#ffaa00]/10 border border-[#ffaa00] p-3 rounded mb-4">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <strong className="text-[#ffaa00] text-xs sm:text-sm block">EXPOSICIÓN DE FRECUENCIAS DEL COMANDO</strong>
                      <p className="text-xs text-[#64748b]">
                        Las emisiones electromagnéticas tácticas están al 95%. Alto riesgo de geolocalización.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* EMCON Control */}
                    <div className="bg-white/[0.01] border border-[#12254d] rounded p-4 text-center">
                      <h4 className="text-xs font-bold text-white mb-2">Control de Emisiones (EMCON)</h4>
                      <button 
                        onClick={handleToggleEmcon}
                        className={`w-full py-2.5 px-3 rounded text-xs font-bold font-mono transition-colors cursor-pointer ${
                          emconActive
                            ? 'bg-[#00ff66] hover:bg-[#00e65a] text-[#02040a]'
                            : 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
                        }`}
                      >
                        {emconActive ? 'Desactivar EMCON' : 'Iniciar Silencio EMCON'}
                      </button>
                      <p className={`text-[11px] mt-2 font-mono ${emconActive ? 'text-[#00ff66]' : 'text-[#64748b]'}`}>
                        {emconActive ? 'Estado: SILENCIO EMCON ACTIVO // Triangulación Hostil Bloqueada' : 'Estado: Emisión Continua'}
                      </p>
                    </div>

                    {/* GEOINT Sanitization */}
                    <div className="bg-white/[0.01] border border-[#12254d] rounded p-4 text-center">
                      <h4 className="text-xs font-bold text-white mb-2">Sanitización de Imágenes GEOINT</h4>
                      <button 
                        onClick={handleSanitizeGeoint}
                        disabled={geointSanitized}
                        className={`w-full py-2.5 px-3 rounded text-xs font-bold font-mono transition-colors cursor-pointer ${
                          geointSanitized
                            ? 'bg-[#00ff66] text-[#02040a] cursor-default'
                            : 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
                        }`}
                      >
                        {geointSanitized ? 'GEOINT Sanitizado' : 'Sanitizar Metadatos GPS EXIF'}
                      </button>
                      <p className={`text-[11px] mt-2 font-mono ${geointSanitized ? 'text-[#00ff66]' : 'text-[#64748b]'}`}>
                        {geointSanitized ? 'Estado: Metadatos EXIF limpios' : 'Estado: Archivos Expuestos'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Protection Status */}
                <div className="bg-[#091228] border border-[#12254d] rounded-md p-4">
                  <div className="font-mono text-xs text-[#00ffff] mb-1 font-bold">
                    COEFICIENTE DE PROTECCIÓN ELECTROMAGNÉTICA:
                  </div>
                  <p className={`text-sm font-bold ${
                    emconActive && geointSanitized
                      ? 'text-[#00ff66]'
                      : emconActive || geointSanitized
                        ? 'text-[#ffaa00]'
                        : 'text-[#ff0055]'
                  }`}>
                    {emconActive && geointSanitized
                      ? 'SEGURO // Resguardo OPSEC de Campaña al 100%'
                      : emconActive || geointSanitized
                        ? 'Parcial // Vulnerabilidades OPSEC persistentes'
                        : 'Inseguro // Exposición Crítica'}
                  </p>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-4">
                <div className="bg-[#ff0055]/10 border border-[#ff0055] p-3.5 rounded-md text-center">
                  <div className="text-[11px] font-mono text-[#cbd5e1] mb-1">TIEMPO DE BLINDAJE TÁCTICO:</div>
                  <div className="font-mono text-3xl font-bold text-[#ff0055] tracking-wider">
                    {formatTime(timers.w3)}
                  </div>
                </div>

                <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-3 border-b border-[#12254d] pb-1.5">
                    MEDIDAS OPSEC
                  </div>
                  <p className="text-xs text-[#64748b] leading-relaxed">
                    La negligencia en la sanitización lógica de coordenadas GPS permite que el oponente asimétrico dirija fuegos de precisión devastadores. El silencio de transmisiones EMCON protege el Poder Militar nacional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WINDOW 4: EVALUACIÓN SUMATIVA CON LISA (RED TEAM) */}
        {activeTab === 3 && (
          <div className="p-4 sm:p-6 min-h-[620px] transition-opacity duration-300">
            <div className="mb-4">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Resiliencia y Evaluación Sumativa Final por Competencias
              </h2>
              <p className="text-xs text-[#64748b]">
                Defienda sus decisiones analíticas basadas en el Poder Militar y la metodología oficial de la ECEME frente al Red Team.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
              {/* Left Column: Chat Box */}
              <div className="flex flex-col h-[450px] bg-[#02040b] border border-[#12254d] rounded-md overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded text-xs max-w-[85%] leading-relaxed ${
                        msg.type === 'ai'
                          ? 'bg-[#0f1c3a] border-l-3 border-[#00ffff] text-slate-100 self-start'
                          : msg.type === 'user'
                            ? 'bg-[#1c335e] text-slate-100 ml-auto'
                            : 'bg-[#ff0055]/10 border-l-3 border-[#ff0055] text-slate-100 self-start'
                      }`}
                    >
                      <strong className={`block mb-1 text-[11px] font-mono ${
                        msg.type === 'ai' ? 'text-[#00ffff]' : msg.type === 'user' ? 'text-[#38bdf8]' : 'text-[#ff0055]'
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
                    placeholder="Justifique su decisión (ej. Sector Este, firma térmica cero, finta)..."
                    className="flex-1 bg-[#02040b] border border-[#12254d] rounded text-xs px-3 py-2 text-white focus:border-[#00ffff] outline-none font-sans"
                  />
                  <button 
                    type="submit"
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Enviar Decisiones</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              {/* Right Column: Radar Metrics */}
              <div className="space-y-4">
                <div className="bg-[#0c152a] border border-[#12254d] rounded-md p-4">
                  <div className="text-xs font-bold text-white font-mono mb-3">
                    INDICADORES COGNITIVOS DE AMENAZA
                  </div>

                  {/* Metric 1 */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[11px] font-mono text-[#64748b] mb-1">
                      <span>Detección de Decepción Táctica</span>
                      <span className="text-slate-300">Crítica (90% Exposición)</span>
                    </div>
                    <div className="h-1.5 bg-[#0b1122] rounded-full overflow-hidden">
                      <div className="h-full bg-[#ff0055] transition-all duration-400" style={{ width: '90%' }} />
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[11px] font-mono text-[#64748b] mb-1">
                      <span>Exposición OPSEC</span>
                      <span className="text-slate-300">
                        {emconActive && geointSanitized ? 'Mínima (5% Exposición)' : 'Alta (80% Exposición)'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#0b1122] rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-400 ${
                          emconActive && geointSanitized ? 'bg-[#00ff66]' : 'bg-[#ff0055]'
                        }`}
                        style={{ width: emconActive && geointSanitized ? '5%' : '80%' }} 
                      />
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="mb-2">
                    <div className="flex justify-between text-[11px] font-mono text-[#64748b] mb-1">
                      <span>Coeficiente de Rigor Científico (CRC)</span>
                      <span className="text-slate-300">
                        {resilienceScore === 100 ? 'Excelente (100% Rigor)' : `${globalXP}%`}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#0b1122] rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-400 ${
                          resilienceScore === 100 ? 'bg-[#00ff66]' : 'bg-[#00ffff]'
                        }`}
                        style={{ width: `${resilienceScore === 100 ? 100 : globalXP}%` }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Scorecard CTA Button */}
                {resilienceScore === 100 && (
                  <button 
                    onClick={handleGenerateScorecard}
                    className="w-full py-3.5 px-4 bg-[#00ff66] hover:bg-[#00e65a] text-[#02040a] font-bold font-mono text-sm rounded transition-all shadow-[0_0_20px_rgba(0,255,102,0.4)] flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                  >
                    <span>🎖️ Generar Boleta de Calificación CVIE</span>
                  </button>
                )}
              </div>
            </div>

            {/* PREVISUALIZACIÓN DE BOLETA DE CAPACITACIÓN */}
            {showScorecard && (
              <div 
                ref={scorecardRef}
                className="mt-6 p-4 sm:p-6 bg-[#060f24] border border-[#00ff66] rounded-md transition-all duration-300"
              >
                <div className="flex justify-between items-center border-b border-[#12254d] pb-2 mb-4">
                  <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#00ff66]" />
                    <span>PREVISUALIZACIÓN DE BOLETA DE CAPACITACIÓN</span>
                  </h3>
                  <button 
                    onClick={safePrint}
                    className="px-3 py-1 bg-white text-black hover:bg-slate-200 rounded text-xs font-bold font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>🖨️ Imprimir Boleta Táctica</span>
                  </button>
                </div>

                {/* Certificate Card Body */}
                <div className="p-6 bg-white text-black rounded max-w-xl mx-auto shadow-2xl font-serif">
                  <div className="text-center mb-3 border-b border-black pb-2">
                    <h4 className="text-sm font-bold tracking-wide">ESCUELA DE COMANDO Y ESTADO MAYOR DEL EJÉRCITO</h4>
                    <h5 className="text-xs font-normal italic">Mcal. Andrés de Santa Cruz</h5>
                    <span className="text-[11px] font-mono block mt-1">CVIE - FASE IV: INMERSIÓN OPERATIVA</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-sans">
                    <div><b>OFICIAL:</b> MY. DEM. EXAMINADO GENERAL</div>
                    <div><b>FECHA:</b> {today}</div>
                    <div><b>NÚCLEO:</b> Fusión de Sensores Multi-INT & OPSEC</div>
                    <div><b>COEFICIENTE CRC FINAL:</b> {globalXP}%</div>
                  </div>

                  <table className="w-full border-collapse text-xs mb-3 font-sans">
                    <thead>
                      <tr className="bg-slate-200 border border-black">
                        <th className="p-1.5 border border-black text-left">Eje Temático Acreditado</th>
                        <th className="p-1.5 border border-black text-center">Puntaje (XP)</th>
                        <th className="p-1.5 border border-black text-center">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-black">
                        <td className="p-1.5 border border-black font-semibold">
                          <b>SABER:</b> Fusión Multi-INT y Criterio Gibson (Fases 1-7)
                        </td>
                        <td className="p-1.5 border border-black text-center font-mono">{saberXP} / 50</td>
                        <td className="p-1.5 border border-black text-center font-bold text-emerald-700">
                          {saberXP >= 35 ? 'ACREDITADO' : 'PENDIENTE'}
                        </td>
                      </tr>
                      <tr className="border border-black">
                        <td className="p-1.5 border border-black font-semibold">
                          <b>HACER:</b> Contramedidas OPSEC Activas y Falsación Táctica
                        </td>
                        <td className="p-1.5 border border-black text-center font-mono">{hacerXP} / 50</td>
                        <td className="p-1.5 border border-black text-center font-bold text-emerald-700">
                          {hacerXP >= 35 ? 'ACREDITADO' : 'PENDIENTE'}
                        </td>
                      </tr>
                      <tr className="bg-slate-100 border border-black font-bold">
                        <td className="p-1.5 border border-black text-right">NOTA TOTAL INTEGRAL:</td>
                        <td className="p-1.5 border border-black text-center font-mono">{globalXP} / 100</td>
                        <td className="p-1.5 border border-black text-center text-emerald-800">
                          {globalXP >= 75 ? 'CERTIFICACIÓN APROBADA' : 'REPROBADO'}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="text-[10px] border-t border-dashed border-black pt-2 text-center italic">
                    "Seguridad, Resiliencia y Defensa del Territorio Nacional" // Firma Digital CVIE
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* HIDDEN DOCUMENT PRINT TEMPLATE (FOR WEB PRINT) */}
      <div id="scorecard-print-area" className="hidden print:block text-black bg-white p-10 font-serif">
        <div className="text-center mb-6 border-b-2 border-black pb-3">
          <h2 className="text-xl font-bold">ESTADO PLURINACIONAL DE BOLIVIA</h2>
          <h3 className="text-lg font-bold">ESCUELA DE COMANDO Y ESTADO MAYOR DEL EJÉRCITO</h3>
          <h4 className="text-base italic">"Mcal. Andrés de Santa Cruz"</h4>
          <p className="font-mono text-xs mt-1">SISTEMA VIRTUAL DE ADIESTRAMIENTO DE INTELIGENCIA DE ESTADO MAYOR (CVIE)</p>
        </div>

        <div className="mb-6 text-sm space-y-1">
          <p><b>OFICIAL EVALUADO:</b> MY. DEM. EXAMINADO GENERAL</p>
          <p><b>EVALUACIÓN:</b> FASE IV: INMERSIÓN OPERATIVA Y FUSIÓN DE SENSORES ISR</p>
          <p><b>FECHA DE EMISIÓN:</b> {today}</p>
          <p><b>COEFICIENTE DE RIGOR CIENTÍFICO (CRC):</b> {globalXP}%</p>
        </div>

        <table className="w-full border-collapse text-sm mb-12 border border-black">
          <thead>
            <tr className="bg-slate-100 border border-black">
              <th className="p-2.5 border border-black text-left">Eje Evaluativo de Competencias</th>
              <th className="p-2.5 border border-black text-left">Metodología Utilizada</th>
              <th className="p-2.5 border border-black text-center">Desempeño / Puntos (XP)</th>
              <th className="p-2.5 border border-black text-center">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-black">
              <td className="p-2.5 border border-black font-bold">Dimensión del Saber (Fusión Multi-INT)</td>
              <td className="p-2.5 border border-black">Análisis de Sensores ISR y Aplicación del Flujo Gibson</td>
              <td className="p-2.5 border border-black text-center font-mono">{saberXP} / 50 XP</td>
              <td className="p-2.5 border border-black text-center font-bold">
                {saberXP >= 35 ? 'APROBADO' : 'NO ACREDITADO'}
              </td>
            </tr>
            <tr className="border border-black">
              <td className="p-2.5 border border-black font-bold">Dimensión del Hacer (Medidas OPSEC & Falsación)</td>
              <td className="p-2.5 border border-black">Criptografía, Silencio EMCON y Sanitización de Datos</td>
              <td className="p-2.5 border border-black text-center font-mono">{hacerXP} / 50 XP</td>
              <td className="p-2.5 border border-black text-center font-bold">
                {hacerXP >= 35 ? 'APROBADO' : 'NO ACREDITADO'}
              </td>
            </tr>
            <tr className="border border-black bg-slate-100 font-bold">
              <td colSpan={2} className="p-2.5 border border-black text-right">CALIFICACIÓN FINAL INTEGRADA:</td>
              <td className="p-2.5 border border-black text-center font-mono">{globalXP} / 100 XP</td>
              <td className="p-2.5 border border-black text-center font-bold">
                {globalXP >= 75 ? 'CERTIFICACIÓN OTORGADA' : 'NO CERTIFICADO'}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-16 flex justify-around text-center text-xs">
          <div>
            <div className="border-t border-black w-48 mx-auto pt-1 font-semibold">Firma del Analista Evaluado</div>
          </div>
          <div>
            <div className="border-t border-black w-48 mx-auto pt-1 font-semibold">Director de Evaluación CVIE</div>
          </div>
        </div>
      </div>

    </div>
  );
}
