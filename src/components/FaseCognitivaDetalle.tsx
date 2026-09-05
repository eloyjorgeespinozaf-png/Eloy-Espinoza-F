import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  Sparkles, 
  Gamepad2, 
  X, 
  Printer, 
  Award, 
  Send, 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { safePrint } from '../utils/safePrint';

interface FaseCognitivaDetalleProps {
  onClose?: () => void;
  onEnterModule?: () => void;
}

interface MorphState {
  p1: string | null;
  p2: string | null;
  p3: string | null;
}

interface ChatMessage {
  author: string;
  text: string;
  type: 'ai' | 'user' | 'system';
}

export const FaseCognitivaDetalle: React.FC<FaseCognitivaDetalleProps> = ({ onClose, onEnterModule }) => {
  // State
  const [activeTab, setActiveTab] = useState<number>(0);
  const [saberXP, setSaberXP] = useState<number>(0);
  const [hacerXP, setHacerXP] = useState<number>(0);
  const [crc, setCrc] = useState<number>(0);
  const [gibsonCount, setGibsonCount] = useState<number>(0);
  
  // Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(180);
  const [timerExpired, setTimerExpired] = useState<boolean>(false);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  // ACH Matrix State (E1, E2, E3 for H1, H2, H3)
  const [achMatrix, setAchMatrix] = useState<{ [key: string]: 'C' | 'I' | 'N' }>({
    'e1-h1': 'C',
    'e1-h2': 'C',
    'e1-h3': 'C',
    'e2-h1': 'C',
    'e2-h2': 'C',
    'e2-h3': 'C',
    'e3-h1': 'C',
    'e3-h2': 'C',
    'e3-h3': 'C'
  });

  // Gibson Stepper State (phases 1 to 7)
  const [gibsonPhases, setGibsonPhases] = useState<{ [key: number]: 'active' | 'completed' | 'pending' }>({
    1: 'active',
    2: 'pending',
    3: 'pending',
    4: 'pending',
    5: 'pending',
    6: 'pending',
    7: 'pending'
  });

  // Morphological State
  const [morphState, setMorphState] = useState<MorphState>({ p1: null, p2: null, p3: null });
  const [morphSaved, setMorphSaved] = useState<boolean>(false);

  // Simulation Chat State
  const [simStep, setSimStep] = useState<number>(0);
  const [chatInput, setChatInput] = useState<string>('');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      author: 'EVALUADOR LISA (RED TEAM)',
      text: 'Analista, iniciamos su examen final. Con base en la superposición de datos de la finta en el Oeste (tanques señuelos sin firma térmica detectados por satélite SAR) y el ciberataque SCADA en el Este: ¿Cuál es el Curso de Acción más probable que usted defenderá ante el Estado Mayor y qué nivel de certeza estimativa de Sherman Kent le asignará?',
      type: 'ai'
    }
  ]);
  const chatScrollerRef = useRef<HTMLDivElement>(null);

  // Scorecard View
  const [showScorecard, setShowScorecard] = useState<boolean>(false);

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollerRef.current) {
      chatScrollerRef.current.scrollTop = chatScrollerRef.current.scrollHeight;
    }
  }, [chatLog]);

  // Master XP & CRC calculation
  const globalXP = saberXP + hacerXP;

  useEffect(() => {
    const calculatedCrc = Math.round(((saberXP + hacerXP) / 100) * 100);
    setCrc(calculatedCrc);
  }, [saberXP, hacerXP]);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setTimerExpired(true);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerSeconds]);

  // ACH Inconsistency Calculation
  const calculateInconsistencies = () => {
    const rows = ['e1', 'e2', 'e3'];
    const inconsistencies = [0, 0, 0]; // H1, H2, H3

    rows.forEach((r) => {
      for (let h = 1; h <= 3; h++) {
        if (achMatrix[`${r}-h${h}`] === 'I') {
          inconsistencies[h - 1]++;
        }
      }
    });

    return inconsistencies;
  };

  const inconsistencies = calculateInconsistencies();
  const minI = Math.min(...inconsistencies);
  const bestHypotheses: string[] = [];
  if (inconsistencies[0] === minI) bestHypotheses.push('H1 (Ofensiva Norte)');
  if (inconsistencies[1] === minI) bestHypotheses.push('H2 (Finta / Engaño)');
  if (inconsistencies[2] === minI) bestHypotheses.push('H3 (Penetración Este)');

  let kentVerdictText = 'RIESGO EQUILIBRADO / INCIERTO [45%-55%]';
  let kentVerdictColor = 'text-[#f59e0b]';

  if (inconsistencies[0] > 0 && inconsistencies[1] === 0) {
    kentVerdictText = 'ALTAMENTE PROBABLE [75%-85%]';
    kentVerdictColor = 'text-[#00e676]';
  }

  const handleAchChange = (key: string, value: 'C' | 'I' | 'N') => {
    setAchMatrix((prev) => {
      const updated = { ...prev, [key]: value };
      
      // Check if correct configuration
      const rows = ['e1', 'e2', 'e3'];
      let h1I = 0;
      let h2I = 0;
      rows.forEach((r) => {
        if (updated[`${r}-h1`] === 'I') h1I++;
        if (updated[`${r}-h2`] === 'I') h2I++;
      });

      if (h1I > 0 && h2I === 0) {
        setSaberXP((prevXp) => Math.max(prevXp, 25));
      }
      return updated;
    });
  };

  // Gibson Validation Handler
  const validateGibsonStep = (step: number, xpAmount: number) => {
    setGibsonPhases((prev) => {
      const updated = { ...prev };
      updated[step] = 'completed';
      if (step < 7) {
        updated[step + 1] = 'active';
      }
      return updated;
    });

    setGibsonCount(step);

    if (step < 7) {
      setSaberXP((prev) => Math.min(50, prev + Math.round(xpAmount / 2)));
    } else {
      setSaberXP(50);
    }
  };

  // Morphological Selection Handler
  const selectMorphOption = (paramId: 'p1' | 'p2' | 'p3', text: string) => {
    setMorphState((prev) => ({ ...prev, [paramId]: text }));
  };

  const saveMorphScenario = () => {
    if (!morphSaved) {
      setHacerXP((prev) => Math.min(50, prev + 20));
      setMorphSaved(true);
    }
  };

  // Chat Simulation Handler
  const handleChatSubmit = () => {
    const text = chatInput.trim();
    if (!text) return;

    setChatLog((prev) => [...prev, { author: 'ANALISTA TÁCTICO', text, type: 'user' }]);
    setChatInput('');

    setTimeout(() => {
      const lower = text.toLowerCase();
      if (simStep === 0) {
        if (lower.includes('finta') || lower.includes('engaño') || lower.includes('engano') || lower.includes('este')) {
          setChatLog((prev) => [
            ...prev,
            {
              author: 'EVALUADOR LISA (RED TEAM)',
              text: 'Correcto. El análisis cruzado demuestra la finta en el Oeste. Segunda pregunta de validación: ¿Bajo qué principio del método de Gibson se clasificó la fiabilidad de las imágenes (IMINT) para contrarrestar la desinformación en redes?',
              type: 'ai'
            }
          ]);
          setHacerXP((prev) => Math.min(50, prev + 15));
          setSimStep(1);
        } else {
          setChatLog((prev) => [
            ...prev,
            {
              author: 'EVALUADOR LISA (RED TEAM)',
              text: 'Incorrecto. Se está aferrando al sesgo de anclaje de los blindados visibles (Oeste). Reevalúe las lecturas térmicas del satélite SAR.',
              type: 'ai'
            }
          ]);
        }
      } else if (simStep === 1) {
        if (lower.includes('reunión') || lower.includes('reunion') || lower.includes('datos') || lower.includes('fase 3')) {
          setChatLog((prev) => [
            ...prev,
            {
              author: 'EVALUADOR LISA (RED TEAM)',
              text: 'Excelente. Se realizó en la Fase 3: Reunión de Datos. Última pregunta: ¿Cómo se combinan las variables morfológicas para predecir si el escenario derivará en la movilización total del poder militar?',
              type: 'ai'
            }
          ]);
          setHacerXP((prev) => Math.min(50, prev + 15));
          setSimStep(2);
        } else {
          setChatLog((prev) => [
            ...prev,
            {
              author: 'EVALUADOR LISA (RED TEAM)',
              text: 'Incorrecto. La clasificación de fiabilidad y exactitud se ejecuta bajo la Fase 3 de Gibson (Reunión de Datos).',
              type: 'ai'
            }
          ]);
        }
      } else if (simStep === 2) {
        setChatLog((prev) => [
          ...prev,
          {
            author: 'EVALUADOR LISA (RED TEAM)',
            text: 'Simulación Completada. Ha demostrado robusto dominio de las competencias analíticas exigidas por la doctrina de la ECEME. La Consola de Calificaciones ya está habilitada para su acreditación e impresión.',
            type: 'ai'
          }
        ]);
        setHacerXP(50);
        setSimStep(3);
      }
    }, 600);
  };

  const handlePrint = () => {
    safePrint();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#040814]/95 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center"
    >
      {/* Container matching user markup */}
      <div className="w-full max-w-7xl bg-[#0a1126] border border-[#1e356c] rounded-lg overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.85)] max-h-[96vh]">
        
        {/* Top Operational Bar */}
        <header className="bg-[#060b1b] border-b-2 border-[#1e356c] p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-[#00ffff]/10 border border-[#00ffff] text-[#00ffff] font-mono text-xs px-2.5 py-1 rounded tracking-wider uppercase font-bold">
              CVIE FASE II // WAR GAME COGNITIVO
            </span>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Entrenamiento Analítico y Mitigación de Sesgos
              </h1>
              <p className="text-xs text-[#64748b]">
                Calibración Sherman Kent, Metodología Gibson y Predicción Morfológica [Doctrina Bolivia]
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right font-mono text-xs text-[#00e676] font-bold">
              REGISTRO DE PROGRESO: <span className="text-white text-sm">{globalXP}</span> / 100 XP
            </div>

            {onClose && (
              <button 
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded bg-[#13223f] hover:bg-[#1f3765] border border-[#1e356c] text-[#cbd5e1] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Cerrar consola"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {/* Work Navigation Tabs */}
        <nav className="flex bg-[#050a18] border-b border-[#1e356c] overflow-x-auto select-none">
          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className={`flex-1 min-w-[200px] py-3 px-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-2 border-b-3 transition-all ${
              activeTab === 0
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>1. Análisis de Hipótesis (ACH - Kent)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`flex-1 min-w-[200px] py-3 px-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-2 border-b-3 transition-all ${
              activeTab === 1
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>2. Detección de Decepción (Gibson)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(2)}
            className={`flex-1 min-w-[200px] py-3 px-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-2 border-b-3 transition-all ${
              activeTab === 2
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>3. Juicio Predictivo (Morfológico)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(3)}
            className={`flex-1 min-w-[200px] py-3 px-3 text-xs font-semibold cursor-pointer flex items-center justify-center gap-2 border-b-3 transition-all ${
              activeTab === 3
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>4. Simulación Evaluativa (Saber y Hacer)</span>
          </button>
        </nav>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* WINDOW 1: ACH & SHERMAN KENT */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-[#0f1a3a] border border-[#1e356c] rounded-md p-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-2 pb-1.5 border-b border-[#1e356c] flex items-center justify-between">
                    <span>LIENZO DE CALIBRACIÓN DE HIPÓTESIS COMPETIDORAS</span>
                    <span className="text-[10px] text-[#94a3b8] font-normal">MÉTODO RICHARDS HEUER</span>
                  </div>
                  <p className="text-xs text-[#64748b] mb-3">
                    De acuerdo a Richards Heuer, identifique la inconsistencia de cada indicio técnico o humano frente a las hipótesis alternativas. La hipótesis de menor refutación estructural es la ganadora.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#070d1c] text-[#00ffff] font-mono">
                          <th className="border border-[#1e356c] p-2 text-left w-2/5">Indicio Recolectado</th>
                          <th className="border border-[#1e356c] p-2 text-center w-1/5">H1: Ofensiva Principal (Sector Oeste)</th>
                          <th className="border border-[#1e356c] p-2 text-center w-1/5">H2: Maniobra de Engaño / Finta Táctica</th>
                          <th className="border border-[#1e356c] p-2 text-center w-1/5">H3: Penetración Silenciosa (Sector Este)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-[#1e356c] p-2 text-white bg-[#0a1226]/50">
                            <b>E1:</b> Avance de blindados ruidosos en redes (Oeste)
                          </td>
                          <td className="border border-[#1e356c] p-2">
                            <select
                              value={achMatrix['e1-h1']}
                              onChange={(e) => handleAchChange('e1-h1', e.target.value as any)}
                              className={`w-full bg-[#030611] text-white border rounded p-1.5 font-mono text-xs cursor-pointer ${
                                achMatrix['e1-h1'] === 'I' ? 'border-[#ff0055] bg-[#ff0055]/15 text-[#fca5a5]' : 'border-[#1e356c]'
                              }`}
                            >
                              <option value="C">Consistente (C)</option>
                              <option value="I">Inconsistente (I)</option>
                              <option value="N">Neutro (N)</option>
                            </select>
                          </td>
                          <td className="border border-[#1e356c] p-2">
                            <select
                              value={achMatrix['e1-h2']}
                              onChange={(e) => handleAchChange('e1-h2', e.target.value as any)}
                              className={`w-full bg-[#030611] text-white border rounded p-1.5 font-mono text-xs cursor-pointer ${
                                achMatrix['e1-h2'] === 'I' ? 'border-[#ff0055] bg-[#ff0055]/15 text-[#fca5a5]' : 'border-[#1e356c]'
                              }`}
                            >
                              <option value="C">Consistente (C)</option>
                              <option value="I">Inconsistente (I)</option>
                              <option value="N">Neutro (N)</option>
                            </select>
                          </td>
                          <td className="border border-[#1e356c] p-2">
                            <select
                              value={achMatrix['e1-h3']}
                              onChange={(e) => handleAchChange('e1-h3', e.target.value as any)}
                              className={`w-full bg-[#030611] text-white border rounded p-1.5 font-mono text-xs cursor-pointer ${
                                achMatrix['e1-h3'] === 'I' ? 'border-[#ff0055] bg-[#ff0055]/15 text-[#fca5a5]' : 'border-[#1e356c]'
                              }`}
                            >
                              <option value="C">Consistente (C)</option>
                              <option value="I">Inconsistente (I)</option>
                              <option value="N">Neutro (N)</option>
                            </select>
                          </td>
                        </tr>

                        <tr>
                          <td className="border border-[#1e356c] p-2 text-white bg-[#0a1226]/50">
                            <b>E2:</b> Satélite SAR detecta señuelos sin calor (Oeste)
                          </td>
                          <td className="border border-[#1e356c] p-2">
                            <select
                              value={achMatrix['e2-h1']}
                              onChange={(e) => handleAchChange('e2-h1', e.target.value as any)}
                              className={`w-full bg-[#030611] text-white border rounded p-1.5 font-mono text-xs cursor-pointer ${
                                achMatrix['e2-h1'] === 'I' ? 'border-[#ff0055] bg-[#ff0055]/15 text-[#fca5a5]' : 'border-[#1e356c]'
                              }`}
                            >
                              <option value="C">Consistente (C)</option>
                              <option value="I">Inconsistente (I)</option>
                              <option value="N">Neutro (N)</option>
                            </select>
                          </td>
                          <td className="border border-[#1e356c] p-2">
                            <select
                              value={achMatrix['e2-h2']}
                              onChange={(e) => handleAchChange('e2-h2', e.target.value as any)}
                              className={`w-full bg-[#030611] text-white border rounded p-1.5 font-mono text-xs cursor-pointer ${
                                achMatrix['e2-h2'] === 'I' ? 'border-[#ff0055] bg-[#ff0055]/15 text-[#fca5a5]' : 'border-[#1e356c]'
                              }`}
                            >
                              <option value="C">Consistente (C)</option>
                              <option value="I">Inconsistente (I)</option>
                              <option value="N">Neutro (N)</option>
                            </select>
                          </td>
                          <td className="border border-[#1e356c] p-2">
                            <select
                              value={achMatrix['e2-h3']}
                              onChange={(e) => handleAchChange('e2-h3', e.target.value as any)}
                              className={`w-full bg-[#030611] text-white border rounded p-1.5 font-mono text-xs cursor-pointer ${
                                achMatrix['e2-h3'] === 'I' ? 'border-[#ff0055] bg-[#ff0055]/15 text-[#fca5a5]' : 'border-[#1e356c]'
                              }`}
                            >
                              <option value="C">Consistente (C)</option>
                              <option value="I">Inconsistente (I)</option>
                              <option value="N">Neutro (N)</option>
                            </select>
                          </td>
                        </tr>

                        <tr>
                          <td className="border border-[#1e356c] p-2 text-white bg-[#0a1226]/50">
                            <b>E3:</b> Interrupción DDoS en subestaciones SCADA (Este)
                          </td>
                          <td className="border border-[#1e356c] p-2">
                            <select
                              value={achMatrix['e3-h1']}
                              onChange={(e) => handleAchChange('e3-h1', e.target.value as any)}
                              className={`w-full bg-[#030611] text-white border rounded p-1.5 font-mono text-xs cursor-pointer ${
                                achMatrix['e3-h1'] === 'I' ? 'border-[#ff0055] bg-[#ff0055]/15 text-[#fca5a5]' : 'border-[#1e356c]'
                              }`}
                            >
                              <option value="C">Consistente (C)</option>
                              <option value="I">Inconsistente (I)</option>
                              <option value="N">Neutro (N)</option>
                            </select>
                          </td>
                          <td className="border border-[#1e356c] p-2">
                            <select
                              value={achMatrix['e3-h2']}
                              onChange={(e) => handleAchChange('e3-h2', e.target.value as any)}
                              className={`w-full bg-[#030611] text-white border rounded p-1.5 font-mono text-xs cursor-pointer ${
                                achMatrix['e3-h2'] === 'I' ? 'border-[#ff0055] bg-[#ff0055]/15 text-[#fca5a5]' : 'border-[#1e356c]'
                              }`}
                            >
                              <option value="C">Consistente (C)</option>
                              <option value="I">Inconsistente (I)</option>
                              <option value="N">Neutro (N)</option>
                            </select>
                          </td>
                          <td className="border border-[#1e356c] p-2">
                            <select
                              value={achMatrix['e3-h3']}
                              onChange={(e) => handleAchChange('e3-h3', e.target.value as any)}
                              className={`w-full bg-[#030611] text-white border rounded p-1.5 font-mono text-xs cursor-pointer ${
                                achMatrix['e3-h3'] === 'I' ? 'border-[#ff0055] bg-[#ff0055]/15 text-[#fca5a5]' : 'border-[#1e356c]'
                              }`}
                            >
                              <option value="C">Consistente (C)</option>
                              <option value="I">Inconsistente (I)</option>
                              <option value="N">Neutro (N)</option>
                            </select>
                          </td>
                        </tr>

                        <tr className="bg-[#050a18] font-mono font-bold">
                          <td className="border border-[#1e356c] p-2 text-white">REFUTACIONES TOTALES (I):</td>
                          <td className="border border-[#1e356c] p-2 text-center text-[#ff0055]">{inconsistencies[0]}</td>
                          <td className="border border-[#1e356c] p-2 text-center text-[#00e676]">{inconsistencies[1]}</td>
                          <td className="border border-[#1e356c] p-2 text-center text-[#f59e0b]">{inconsistencies[2]}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#091228] border border-[#1e356c] rounded-md p-4">
                  <div className="font-mono text-xs text-[#00ffff] mb-1 font-bold">
                    VEREDICTO DE PROBABILIDAD SHERMAN KENT:
                  </div>
                  <p className="text-sm">
                    Hipótesis menos refutada: <strong className="text-[#00ffff]">{bestHypotheses.join(' o ')}</strong> con solo <strong>{minI}</strong> refutación(es).
                    <br />
                    Escala de Estimación de Kent: <strong className={kentVerdictColor}>{kentVerdictText}</strong>
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-[#ff0055]/10 border border-[#ff0055] p-3 rounded-md text-center">
                  <div className="text-[11px] font-mono text-[#fca5a5] mb-1">TIEMPO DE OPERACIÓN ACH:</div>
                  <div className="font-mono text-3xl font-bold text-[#ff0055]">
                    {timerExpired ? (
                      <span className="text-xs text-[#ff0055]">00:00 // CADUCADO</span>
                    ) : (
                      `${Math.floor(timerSeconds / 60).toString().padStart(2, '0')}:${(timerSeconds % 60).toString().padStart(2, '0')}`
                    )}
                  </div>
                </div>

                <div className="bg-[#0f1a3a] border border-[#1e356c] rounded-md p-4">
                  <div className="text-xs font-bold text-[#00ffff] font-mono mb-2 pb-1 border-b border-[#1e356c]">
                    MÉTODO SHERMAN KENT
                  </div>
                  <p className="text-xs text-[#cbd5e1] mb-2 leading-relaxed">
                    La rigurosidad técnica exige reemplazar expresiones ambiguas con probabilidades porcentuales estandarizadas:
                  </p>
                  <ul className="text-xs text-[#64748b] space-y-1 font-mono">
                    <li><span className="text-white">Casi Seguro:</span> 90% - 99%</li>
                    <li><span className="text-white">Altamente Probable:</span> 75% - 85%</li>
                    <li><span className="text-white">Probable:</span> 55% - 70%</li>
                    <li><span className="text-white">Riesgo Equilibrado:</span> 45% - 55%</li>
                    <li><span className="text-white">Poco Probable:</span> 20% - 35%</li>
                    <li><span className="text-white">Remoto:</span> 1% - 10%</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* WINDOW 2: GIBSON METHOD */}
          {activeTab === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-white">
                  Detección de Decepción mediante Metodología R.E. Gibson
                </h2>
                <p className="text-xs text-[#64748b]">
                  Siga y valide secuencialmente las 7 fases del método de investigación científica adaptadas al procesamiento de inteligencia táctica.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 space-y-3">
                  
                  {/* Fase 1 */}
                  <div className={`p-3 rounded-md border-l-4 transition-all ${
                    gibsonPhases[1] === 'completed'
                      ? 'border-l-[#00e676] bg-white/[0.02]'
                      : gibsonPhases[1] === 'active'
                      ? 'border-l-[#00ffff] bg-[#00ffff]/[0.03]'
                      : 'border-l-[#1e356c] bg-white/[0.01]'
                  }`}>
                    <div className="flex justify-between items-center">
                      <strong className="text-xs text-white">Fase 1: Examen General (Encuadre del Problema)</strong>
                      <button
                        type="button"
                        onClick={() => validateGibsonStep(1, 10)}
                        disabled={gibsonPhases[1] === 'completed'}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer ${
                          gibsonPhases[1] === 'completed'
                            ? 'bg-[#00e676]/20 text-[#00e676] cursor-default'
                            : 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
                        }`}
                      >
                        {gibsonPhases[1] === 'completed' ? '✓ Validado' : 'Validar Fase'}
                      </button>
                    </div>
                    <p className="text-xs text-[#64748b] mt-1">
                      Identificar el escenario multidominio de frontera y aislar los vacíos informativos iniciales evaluando las variables operacionales PEMSITIM.
                    </p>
                  </div>

                  {/* Fase 2 */}
                  <div className={`p-3 rounded-md border-l-4 transition-all ${
                    gibsonPhases[2] === 'completed'
                      ? 'border-l-[#00e676] bg-white/[0.02]'
                      : gibsonPhases[2] === 'active'
                      ? 'border-l-[#00ffff] bg-[#00ffff]/[0.03]'
                      : 'border-l-[#1e356c] bg-white/[0.01]'
                  }`}>
                    <div className="flex justify-between items-center">
                      <strong className="text-xs text-white">Fase 2: Definiciones (Marco Semántico)</strong>
                      <button
                        type="button"
                        onClick={() => validateGibsonStep(2, 10)}
                        disabled={gibsonPhases[2] !== 'active'}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer ${
                          gibsonPhases[2] === 'completed'
                            ? 'bg-[#00e676]/20 text-[#00e676] cursor-default'
                            : gibsonPhases[2] === 'active'
                            ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
                            : 'bg-[#1e356c]/40 text-[#64748b] cursor-not-allowed'
                        }`}
                      >
                        {gibsonPhases[2] === 'completed' ? '✓ Validado' : 'Validar Fase'}
                      </button>
                    </div>
                    <p className="text-xs text-[#64748b] mt-1">
                      Unificar la terminología. Definir claramente la línea divisoria entre "finta táctica" (maniobra de fijación) y "ataque de diversión" para evitar malas interpretaciones del mando.
                    </p>
                  </div>

                  {/* Fase 3 */}
                  <div className={`p-3 rounded-md border-l-4 transition-all ${
                    gibsonPhases[3] === 'completed'
                      ? 'border-l-[#00e676] bg-white/[0.02]'
                      : gibsonPhases[3] === 'active'
                      ? 'border-l-[#00ffff] bg-[#00ffff]/[0.03]'
                      : 'border-l-[#1e356c] bg-white/[0.01]'
                  }`}>
                    <div className="flex justify-between items-center">
                      <strong className="text-xs text-white">Fase 3: Reunión de Datos (Calificación Multi-INT)</strong>
                      <button
                        type="button"
                        onClick={() => validateGibsonStep(3, 10)}
                        disabled={gibsonPhases[3] !== 'active'}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer ${
                          gibsonPhases[3] === 'completed'
                            ? 'bg-[#00e676]/20 text-[#00e676] cursor-default'
                            : gibsonPhases[3] === 'active'
                            ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
                            : 'bg-[#1e356c]/40 text-[#64748b] cursor-not-allowed'
                        }`}
                      >
                        {gibsonPhases[3] === 'completed' ? '✓ Validado' : 'Validar Fase'}
                      </button>
                    </div>
                    <p className="text-xs text-[#64748b] mt-1">
                      Clasificar los indicios técnicos (SIGINT, IMINT/SAR) y humanos (HUMINT) de acuerdo a la matriz estandarizada de Confiabilidad de la Fuente (A-F) y Exactitud del Dato (1-6).
                    </p>
                  </div>

                  {/* Fase 4 */}
                  <div className={`p-3 rounded-md border-l-4 transition-all ${
                    gibsonPhases[4] === 'completed'
                      ? 'border-l-[#00e676] bg-white/[0.02]'
                      : gibsonPhases[4] === 'active'
                      ? 'border-l-[#00ffff] bg-[#00ffff]/[0.03]'
                      : 'border-l-[#1e356c] bg-white/[0.01]'
                  }`}>
                    <div className="flex justify-between items-center">
                      <strong className="text-xs text-white">Fase 4: Interpretación de Datos (Falsación)</strong>
                      <button
                        type="button"
                        onClick={() => validateGibsonStep(4, 10)}
                        disabled={gibsonPhases[4] !== 'active'}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer ${
                          gibsonPhases[4] === 'completed'
                            ? 'bg-[#00e676]/20 text-[#00e676] cursor-default'
                            : gibsonPhases[4] === 'active'
                            ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
                            : 'bg-[#1e356c]/40 text-[#64748b] cursor-not-allowed'
                        }`}
                      >
                        {gibsonPhases[4] === 'completed' ? '✓ Validado' : 'Validar Fase'}
                      </button>
                    </div>
                    <p className="text-xs text-[#64748b] mt-1">
                      Ejecutar el proceso analítico cruzando evidencias dispersas. Identificar las incongruencias físicas entre las lecturas electromagnéticas y visuales.
                    </p>
                  </div>

                  {/* Fase 5 */}
                  <div className={`p-3 rounded-md border-l-4 transition-all ${
                    gibsonPhases[5] === 'completed'
                      ? 'border-l-[#00e676] bg-white/[0.02]'
                      : gibsonPhases[5] === 'active'
                      ? 'border-l-[#00ffff] bg-[#00ffff]/[0.03]'
                      : 'border-l-[#1e356c] bg-white/[0.01]'
                  }`}>
                    <div className="flex justify-between items-center">
                      <strong className="text-xs text-white">Fase 5: Formulación de Hipótesis (ACH Heuer)</strong>
                      <button
                        type="button"
                        onClick={() => validateGibsonStep(5, 10)}
                        disabled={gibsonPhases[5] !== 'active'}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer ${
                          gibsonPhases[5] === 'completed'
                            ? 'bg-[#00e676]/20 text-[#00e676] cursor-default'
                            : gibsonPhases[5] === 'active'
                            ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
                            : 'bg-[#1e356c]/40 text-[#64748b] cursor-not-allowed'
                        }`}
                      >
                        {gibsonPhases[5] === 'completed' ? '✓ Validado' : 'Validar Fase'}
                      </button>
                    </div>
                    <p className="text-xs text-[#64748b] mt-1">
                      Estructurar explicaciones alternativas que cubran todo el abanico de posibilidades, evitando el sesgo de apegarse a una hipótesis favorita.
                    </p>
                  </div>

                  {/* Fase 6 */}
                  <div className={`p-3 rounded-md border-l-4 transition-all ${
                    gibsonPhases[6] === 'completed'
                      ? 'border-l-[#00e676] bg-white/[0.02]'
                      : gibsonPhases[6] === 'active'
                      ? 'border-l-[#00ffff] bg-[#00ffff]/[0.03]'
                      : 'border-l-[#1e356c] bg-white/[0.01]'
                  }`}>
                    <div className="flex justify-between items-center">
                      <strong className="text-xs text-white">Fase 6: Extracción de Conclusiones (Léxico Kent)</strong>
                      <button
                        type="button"
                        onClick={() => validateGibsonStep(6, 10)}
                        disabled={gibsonPhases[6] !== 'active'}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer ${
                          gibsonPhases[6] === 'completed'
                            ? 'bg-[#00e676]/20 text-[#00e676] cursor-default'
                            : gibsonPhases[6] === 'active'
                            ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white'
                            : 'bg-[#1e356c]/40 text-[#64748b] cursor-not-allowed'
                        }`}
                      >
                        {gibsonPhases[6] === 'completed' ? '✓ Validado' : 'Validar Fase'}
                      </button>
                    </div>
                    <p className="text-xs text-[#64748b] mt-1">
                      Aislar e identificar el Curso de Acción Más Peligroso (MDCOA) y definir la estimación definitiva con certeza analítica auditable.
                    </p>
                  </div>

                  {/* Fase 7 */}
                  <div className={`p-3 rounded-md border-l-4 transition-all ${
                    gibsonPhases[7] === 'completed'
                      ? 'border-l-[#00e676] bg-white/[0.02]'
                      : gibsonPhases[7] === 'active'
                      ? 'border-l-[#00ffff] bg-[#00ffff]/[0.03]'
                      : 'border-l-[#1e356c] bg-white/[0.01]'
                  }`}>
                    <div className="flex justify-between items-center">
                      <strong className="text-xs text-white">Fase 7: Presentación (Difusión Estratégica)</strong>
                      <button
                        type="button"
                        onClick={() => validateGibsonStep(7, 15)}
                        disabled={gibsonPhases[7] !== 'active'}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer ${
                          gibsonPhases[7] === 'completed'
                            ? 'bg-[#00e676]/20 text-[#00e676] cursor-default'
                            : gibsonPhases[7] === 'active'
                            ? 'bg-[#00e676] hover:bg-[#059669] text-black font-black'
                            : 'bg-[#1e356c]/40 text-[#64748b] cursor-not-allowed'
                        }`}
                      >
                        {gibsonPhases[7] === 'completed' ? '✓ Validado' : 'Cerrar Ciclo Gibson'}
                      </button>
                    </div>
                    <p className="text-xs text-[#64748b] mt-1">
                      Redactar y difundir el boletín estratégico de crisis al mando con niveles de clasificación de contrainteligencia pertinentes.
                    </p>
                  </div>

                </div>

                {/* Info Panel */}
                <div className="bg-[#0f1a3a] border border-[#1e356c] rounded-md p-4 h-fit space-y-3">
                  <div className="text-xs font-bold text-[#00ffff] font-mono pb-1 border-b border-[#1e356c]">
                    EL DIAGRAMA GIBSON
                  </div>
                  <p className="text-xs text-[#64748b] leading-relaxed">
                    Formulado por R.E. Gibson e introducido a la doctrina militar por el General Washington Platt, este esquema sistematiza la producción de inteligencia de alto nivel como un proceso científico e iterativo con bucles de retroalimentación activa.
                  </p>
                  <div className="bg-[#070d1a] p-3 rounded font-mono text-xs text-[#00ffff] border border-dashed border-[#1e356c]">
                    PROGRESO METODOLÓGICO:<br />
                    <span className="text-[#00e676] font-bold">Fases Completadas: {gibsonCount} / 7</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WINDOW 3: MORPHOLOGICAL MATRIX */}
          {activeTab === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-white">
                  Juicio Predictivo mediante Análisis Morfológico Estratégico
                </h2>
                <p className="text-xs text-[#64748b]">
                  Sistematice escenarios alternativos combinando diferentes hipótesis tácticas por cada parámetro clave.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Parámetro 1 */}
                <div className="bg-[#081024] border border-[#1e356c] rounded-md p-3.5 space-y-2">
                  <strong className="text-xs text-[#00ffff] font-mono block">P1: Seguridad y Gobernabilidad</strong>
                  <div
                    onClick={() => selectMorphOption('p1', 'Serán empleadas fuerzas para contener disturbios en fronteras.')}
                    className={`p-2.5 rounded border text-xs cursor-pointer transition-all ${
                      morphState.p1 === 'Serán empleadas fuerzas para contener disturbios en fronteras.'
                        ? 'bg-[#c084fc]/15 border-[#c084fc] text-white font-semibold'
                        : 'bg-white/[0.02] border-[#1e356c] text-[#cbd5e1] hover:border-[#00ffff]'
                    }`}
                  >
                    H1: Contención policial/militar activa de desórdenes.
                  </div>
                  <div
                    onClick={() => selectMorphOption('p1', 'No se requerirá despliegue especial de fuerzas físicas.')}
                    className={`p-2.5 rounded border text-xs cursor-pointer transition-all ${
                      morphState.p1 === 'No se requerirá despliegue especial de fuerzas físicas.'
                        ? 'bg-[#c084fc]/15 border-[#c084fc] text-white font-semibold'
                        : 'bg-white/[0.02] border-[#1e356c] text-[#cbd5e1] hover:border-[#00ffff]'
                    }`}
                  >
                    H2: Empleo innecesario de fuerzas.
                  </div>
                  <div
                    onClick={() => selectMorphOption('p1', 'Alta probabilidad de despliegue nacional extraordinario.')}
                    className={`p-2.5 rounded border text-xs cursor-pointer transition-all ${
                      morphState.p1 === 'Alta probabilidad de despliegue nacional extraordinario.'
                        ? 'bg-[#c084fc]/15 border-[#c084fc] text-white font-semibold'
                        : 'bg-white/[0.02] border-[#1e356c] text-[#cbd5e1] hover:border-[#00ffff]'
                    }`}
                  >
                    H3: Movilización masiva por crisis crítica.
                  </div>
                </div>

                {/* Parámetro 2 */}
                <div className="bg-[#081024] border border-[#1e356c] rounded-md p-3.5 space-y-2">
                  <strong className="text-xs text-[#f59e0b] font-mono block">P2: Transparencia y Legitimidad</strong>
                  <div
                    onClick={() => selectMorphOption('p2', 'La legitimidad del proceso electoral se mantendrá intacta.')}
                    className={`p-2.5 rounded border text-xs cursor-pointer transition-all ${
                      morphState.p2 === 'La legitimidad del proceso electoral se mantendrá intacta.'
                        ? 'bg-[#c084fc]/15 border-[#c084fc] text-white font-semibold'
                        : 'bg-white/[0.02] border-[#1e356c] text-[#cbd5e1] hover:border-[#00ffff]'
                    }`}
                  >
                    H1: Total aceptación ciudadana del escrutinio.
                  </div>
                  <div
                    onClick={() => selectMorphOption('p2', 'Cuestionamiento civil severo en redes e impugnación formal.')}
                    className={`p-2.5 rounded border text-xs cursor-pointer transition-all ${
                      morphState.p2 === 'Cuestionamiento civil severo en redes e impugnación formal.'
                        ? 'bg-[#c084fc]/15 border-[#c084fc] text-white font-semibold'
                        : 'bg-white/[0.02] border-[#1e356c] text-[#cbd5e1] hover:border-[#00ffff]'
                    }`}
                  >
                    H2: Impugnaciones y reclamos generalizados.
                  </div>
                  <div
                    onClick={() => selectMorphOption('p2', 'Anulación del proceso como excusa para ruptura del orden.')}
                    className={`p-2.5 rounded border text-xs cursor-pointer transition-all ${
                      morphState.p2 === 'Anulación del proceso como excusa para ruptura del orden.'
                        ? 'bg-[#c084fc]/15 border-[#c084fc] text-white font-semibold'
                        : 'bg-white/[0.02] border-[#1e356c] text-[#cbd5e1] hover:border-[#00ffff]'
                    }`}
                  >
                    H3: Crisis de legitimidad y anulación exigida.
                  </div>
                </div>

                {/* Parámetro 3 */}
                <div className="bg-[#081024] border border-[#1e356c] rounded-md p-3.5 space-y-2">
                  <strong className="text-xs text-[#c084fc] font-mono block">P3: Comportamiento del Electorado</strong>
                  <div
                    onClick={() => selectMorphOption('p3', 'Votación transcurrida bajo total armonía nacional.')}
                    className={`p-2.5 rounded border text-xs cursor-pointer transition-all ${
                      morphState.p3 === 'Votación transcurrida bajo total armonía nacional.'
                        ? 'bg-[#c084fc]/15 border-[#c084fc] text-white font-semibold'
                        : 'bg-white/[0.02] border-[#1e356c] text-[#cbd5e1] hover:border-[#00ffff]'
                    }`}
                  >
                    H1: Armonía y estabilidad en urnas.
                  </div>
                  <div
                    onClick={() => selectMorphOption('p3', 'Enfrentamientos físicos abiertos entre simpatizantes en centros.')}
                    className={`p-2.5 rounded border text-xs cursor-pointer transition-all ${
                      morphState.p3 === 'Enfrentamientos físicos abiertos entre simpatizantes en centros.'
                        ? 'bg-[#c084fc]/15 border-[#c084fc] text-white font-semibold'
                        : 'bg-white/[0.02] border-[#1e356c] text-[#cbd5e1] hover:border-[#00ffff]'
                    }`}
                  >
                    H2: Alta polarización y fricciones de calle.
                  </div>
                  <div
                    onClick={() => selectMorphOption('p3', 'Retraimiento general del electorado e inasistencia masiva.')}
                    className={`p-2.5 rounded border text-xs cursor-pointer transition-all ${
                      morphState.p3 === 'Retraimiento general del electorado e inasistencia masiva.'
                        ? 'bg-[#c084fc]/15 border-[#c084fc] text-white font-semibold'
                        : 'bg-white/[0.02] border-[#1e356c] text-[#cbd5e1] hover:border-[#00ffff]'
                    }`}
                  >
                    H3: Abstención drástica por temor o apatía.
                  </div>
                </div>

              </div>

              {/* Output Card */}
              <div className="bg-[#0a132c] border border-[#1e356c] rounded-md p-4 space-y-2">
                <div className="font-mono text-xs text-[#00ffff] font-bold">
                  ESCENARIO PROSPECTIVO CONSTRUIDO EN TIEMPO REAL:
                </div>
                <p className="text-xs sm:text-sm text-[#cbd5e1] italic">
                  {morphState.p1 && morphState.p2 && morphState.p3
                    ? `[ESCENARIO GENERADO]: ${morphState.p1} ${morphState.p2} ${morphState.p3}`
                    : 'Seleccione un estado para cada parámetro para generar la combinación morfológica.'}
                </p>
                {morphState.p1 && morphState.p2 && morphState.p3 && !morphSaved && (
                  <button
                    type="button"
                    onClick={saveMorphScenario}
                    className="bg-[#00e676] hover:bg-[#059669] text-black font-bold text-xs px-4 py-2 rounded font-mono cursor-pointer transition-colors mt-2"
                  >
                    Guardar Escenario Morfológico (+20 XP)
                  </button>
                )}
                {morphSaved && (
                  <span className="inline-block text-xs font-mono text-[#00e676] bg-[#00e676]/10 px-3 py-1 rounded border border-[#00e676]/40 mt-2">
                    ✓ Escenario morfológico registrado (+20 XP)
                  </span>
                )}
              </div>
            </div>
          )}

          {/* WINDOW 4: COMPETENCY SIMULATION (KNOWING & DOING) */}
          {activeTab === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-bold text-white">
                  Evaluación Sumativa por Competencias (Saber & Hacer)
                </h2>
                <p className="text-xs text-[#64748b]">
                  Defienda sus análisis metodológicos frente al Red Team interactivo y obtenga su boleta final de acreditación.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                {/* Chat Interface */}
                <div className="lg:col-span-2 flex flex-col h-[400px] bg-[#030610] border border-[#1e356c] rounded-md overflow-hidden">
                  <div ref={chatScrollerRef} className="flex-1 overflow-y-auto p-3.5 space-y-2.5">
                    {chatLog.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-md text-xs max-w-[85%] leading-relaxed ${
                          msg.type === 'ai'
                            ? 'bg-[#13223f] border-l-3 border-l-[#00ffff] text-white self-start'
                            : msg.type === 'user'
                            ? 'bg-[#1c335e] text-white ml-auto'
                            : 'bg-[#f59e0b]/10 border border-[#f59e0b] text-[#fde68a] text-center mx-auto'
                        }`}
                      >
                        <strong className="block mb-0.5 text-[11px] font-mono text-[#00ffff]">{msg.author}:</strong>
                        <span>{msg.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex p-2 bg-[#0a1125] border-t border-[#1e356c] gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleChatSubmit()}
                      placeholder="Responda considerando fintas, frentes o la escala Kent..."
                      className="flex-1 bg-[#030610] border border-[#1e356c] rounded px-3 py-2 text-xs text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#00ffff]"
                    />
                    <button
                      type="button"
                      onClick={handleChatSubmit}
                      className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 text-xs font-mono font-bold rounded cursor-pointer transition-colors"
                    >
                      Enviar
                    </button>
                  </div>
                </div>

                {/* Live Metrics Panel */}
                <div className="space-y-4">
                  <div className="bg-[#0f1a3a] border border-[#1e356c] rounded-md p-4">
                    <div className="text-xs font-bold text-[#00ffff] font-mono mb-2 pb-1 border-b border-[#1e356c]">
                      COEFICIENTE DE RIGOR CIENTÍFICO (CRC)
                    </div>
                    <div className="text-center py-2">
                      <div className="text-4xl font-mono font-bold text-[#00ffff]">
                        {crc}%
                      </div>
                      <p className="text-[11px] text-[#64748b] mt-1">
                        Índice de precisión metodológica y mitigación de sesgos analíticos.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowScorecard(true)}
                    className="w-full py-3 px-4 bg-[#00e676] hover:bg-[#059669] text-black font-bold font-mono text-xs rounded shadow-lg cursor-pointer transition-colors"
                  >
                    🎖️ Generar Boleta de Calificación CVIE
                  </button>

                  {onEnterModule && (
                    <button
                      type="button"
                      onClick={onEnterModule}
                      className="w-full py-2.5 px-4 bg-[#11264c] hover:bg-[#1a386d] border border-[#2b5299] text-[#93c5fd] font-mono text-xs rounded flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>Avanzar a Fase III</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Interactive On-Screen Report Card Viewer (Pre-Print Preview) */}
              {showScorecard && (
                <div className="bg-[#060f24] border border-[#00e676] rounded-md p-4 space-y-4 mt-6">
                  <div className="flex justify-between items-center border-b border-[#1e356c] pb-2">
                    <h3 className="text-xs sm:text-sm font-mono text-white font-bold flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#00e676]" />
                      PREVISUALIZACIÓN DE BOLETA DE CALIFICACIONES
                    </h3>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="px-3 py-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-mono font-bold rounded flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimir Boleta en PDF</span>
                    </button>
                  </div>

                  <div className="bg-white text-black p-4 sm:p-6 rounded max-w-xl mx-auto font-serif text-xs shadow-2xl">
                    <div className="text-center mb-3 pb-2 border-b border-black">
                      <h4 className="text-sm font-bold tracking-wider uppercase">ESCUELA DE COMANDO Y ESTADO MAYOR</h4>
                      <h5 className="text-xs font-normal italic">Mcal. Andrés de Santa Cruz</h5>
                      <span className="text-[10px] font-mono block mt-0.5 text-gray-700">SISTEMA DE CAPACITACIÓN CVIE</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                      <div><b>OFICIAL:</b> MY. DEM. ALUMNO</div>
                      <div><b>FECHA:</b> {today}</div>
                      <div><b>FASE EVALUADA:</b> FASE II: ENTRENAMIENTO COGNITIVO</div>
                      <div><b>COEFICIENTE CRC:</b> {crc}%</div>
                    </div>

                    <table className="w-full border-collapse border border-black text-[11px] mb-3">
                      <thead>
                        <tr className="bg-gray-200 border border-black">
                          <th className="border border-black p-1.5 text-left">Dimensión Evaluada</th>
                          <th className="border border-black p-1.5 text-center">Puntaje (XP)</th>
                          <th className="border border-black p-1.5 text-center">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border border-black">
                          <td className="border border-black p-1.5"><b>SABER:</b> Metodologías ACH y Gibson</td>
                          <td className="border border-black p-1.5 text-center">{saberXP} / 50</td>
                          <td className="border border-black p-1.5 text-center font-bold text-green-700">
                            {saberXP >= 35 ? 'Acreditado' : 'Pendiente'}
                          </td>
                        </tr>
                        <tr className="border border-black">
                          <td className="border border-black p-1.5"><b>HACER:</b> Análisis Morfológico y Toma de Decisiones</td>
                          <td className="border border-black p-1.5 text-center">{hacerXP} / 50</td>
                          <td className="border border-black p-1.5 text-center font-bold text-green-700">
                            {hacerXP >= 35 ? 'Acreditado' : 'Pendiente'}
                          </td>
                        </tr>
                        <tr className="bg-gray-100 border border-black font-bold">
                          <td className="border border-black p-1.5 text-right">NOTA TOTAL INTEGRAL:</td>
                          <td className="border border-black p-1.5 text-center">{globalXP} / 100</td>
                          <td className="border border-black p-1.5 text-center text-green-800">
                            {globalXP >= 75 ? 'CERTIFICACIÓN APROBADA' : 'EN PROCESO'}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="text-[9px] border-t border-dashed border-black pt-2 text-center italic text-gray-600">
                      "Ser antes que Parecer" // Verificación Digital de Firma mediante Protocolos CVIE
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* Hidden Document Print Template for Browser window.print() */}
      <div className="hidden print:block fixed inset-0 bg-white text-black p-8 font-serif z-[9999]">
        <div className="text-center mb-6 pb-3 border-b-2 border-black">
          <h2 className="text-xl font-bold uppercase">ESTADO PLURINACIONAL DE BOLIVIA</h2>
          <h3 className="text-base font-semibold">ESCUELA DE COMANDO Y ESTADO MAYOR DEL EJÉRCITO</h3>
          <h4 className="text-sm italic">"Mcal. Andrés de Santa Cruz"</h4>
          <p className="font-mono text-xs mt-1">SISTEMA VIRTUAL DE ADIESTRAMIENTO DE INTELIGENCIA DE ESTADO MAYOR (CVIE)</p>
        </div>

        <div className="mb-6 text-sm space-y-1">
          <p><b>OFICIAL EVALUADO:</b> MY. DEM. EXAMINADO GENERAL</p>
          <p><b>EVALUACIÓN:</b> FASE II: ENTRENAMIENTO COGNITIVO Y MITIGACIÓN DE SESGOS</p>
          <p><b>FECHA DE EMISIÓN:</b> {today}</p>
          <p><b>COEFICIENTE DE RIGOR CIENTÍFICO (CRC):</b> {crc}%</p>
        </div>

        <table className="w-full border-collapse border border-black text-sm my-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-black p-2 text-left">Eje Evaluativo de Competencias</th>
              <th className="border border-black p-2 text-left">Metodología Utilizada</th>
              <th className="border border-black p-2 text-center">Desempeño / Puntos (XP)</th>
              <th className="border border-black p-2 text-center">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2"><b>Dimensión del Saber (Cognición)</b></td>
              <td className="border border-black p-2">Hipótesis en Competencia (ACH Kent) & Flujo de Gibson</td>
              <td className="border border-black p-2 text-center">{saberXP} / 50 XP</td>
              <td className="border border-black p-2 text-center font-bold">{saberXP >= 35 ? 'APROBADO' : 'NO ACREDITADO'}</td>
            </tr>
            <tr>
              <td className="border border-black p-2"><b>Dimensión del Hacer (Práctica)</b></td>
              <td className="border border-black p-2">Análisis Morfológico & Simulación de Red Team</td>
              <td className="border border-black p-2 text-center">{hacerXP} / 50 XP</td>
              <td className="border border-black p-2 text-center font-bold">{hacerXP >= 35 ? 'APROBADO' : 'NO ACREDITADO'}</td>
            </tr>
            <tr className="font-bold bg-gray-100">
              <td colSpan={2} className="border border-black p-2 text-right">CALIFICACIÓN FINAL INTEGRADA:</td>
              <td className="border border-black p-2 text-center">{globalXP} / 100 XP</td>
              <td className="border border-black p-2 text-center">{globalXP >= 75 ? 'CERTIFICACIÓN OTORGADA' : 'NO CERTIFICADO'}</td>
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
};
