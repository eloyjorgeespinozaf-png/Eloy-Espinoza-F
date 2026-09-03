import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Brain, 
  Cpu, 
  Award, 
  CheckCircle2, 
  X, 
  Send, 
  Sparkles, 
  Radio, 
  Layers, 
  Scale, 
  Shield, 
  Target, 
  Bot, 
  User, 
  Zap, 
  ChevronRight, 
  AlertTriangle,
  RotateCcw,
  Check
} from 'lucide-react';

interface DoctrinaMilitarDetalleProps {
  onClose: () => void;
  onUpdateXp?: (newXp: number) => void;
  initialXp?: number;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export function DoctrinaMilitarDetalle({ onClose, onUpdateXp, initialXp = 40 }: DoctrinaMilitarDetalleProps) {
  // Workflow Tab: 0 = Aprender, 1 = Comprender, 2 = Desarrollar, 3 = Evaluar
  const [activeTab, setActiveTab] = useState<number>(0);

  // Doctrinal XP state
  const [doctrinalXP, setDoctrinalXP] = useState<number>(initialXp);
  const [claimedUnits, setClaimedUnits] = useState<Record<string, boolean>>({});

  // CAMS Simulator State
  const [camsNai1, setCamsNai1] = useState<string>('none');
  const [camsNai2, setCamsNai2] = useState<string>('none');
  const [camsNai3, setCamsNai3] = useState<string>('none');
  const [camsResult, setCamsResult] = useState<{
    evaluated: boolean;
    isSuccess: boolean;
    messages: string[];
    errors: string[];
  }>({
    evaluated: false,
    isSuccess: false,
    messages: [],
    errors: []
  });

  // AI Tutor LISA Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Oficial analista, he cargado los manuales de IPB (ATP 2-01.3) y gestión de sensores CAMS. Planteo un dilema doctrinario de Estado Mayor: En el Paso 4 del IPB, suponga que el mando exige concentrar el 100% de los sensores de vigilancia exclusivamente en el Curso de Acción Más Probable (MLCOA). ¿Cuál es la vulnerabilidad crítica que introduce esta decisión y qué principio doctrinal se vulnera?',
      timestamp: '00:00:01'
    }
  ]);
  const [aiInputText, setAiInputText] = useState<string>('');
  const [aiThinking, setAiThinking] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Micro-Quiz Evaluation State
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number>(0);

  // Auto-scroll chat log
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, aiThinking]);

  const handleClaimUnitXP = (amount: number, unitKey: string, unitName: string) => {
    if (claimedUnits[unitKey]) {
      return;
    }
    const nextXp = Math.min(100, doctrinalXP + amount);
    setDoctrinalXP(nextXp);
    setClaimedUnits(prev => ({ ...prev, [unitKey]: true }));
    if (onUpdateXp) onUpdateXp(nextXp);
  };

  // Submit AI Socratic Response
  const handleSendAiMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const userText = aiInputText.trim();
    if (!userText || aiThinking) return;

    const d = new Date();
    const ts = d.toTimeString().split(' ')[0];

    const newUserMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: ts
    };

    setChatMessages(prev => [...prev, newUserMsg]);
    setAiInputText('');
    setAiThinking(true);

    setTimeout(() => {
      setAiThinking(false);
      const lower = userText.toLowerCase();
      const hitsKeywords = 
        lower.includes('mdcoa') || 
        lower.includes('peligroso') || 
        lower.includes('catastrófic') || 
        lower.includes('sorpresa') || 
        lower.includes('engaño') || 
        lower.includes('finta') ||
        lower.includes('falsac') ||
        lower.includes('sesgo');

      let replyText = "";
      if (hitsKeywords) {
        replyText = "¡Excelente criterio táctico! Si el Comandante concentra todos los sensores exclusivamente en el MLCOA, el enemigo puede ejecutar una maniobra de engaño (finta) y desencadenar el MDCOA sin que existan indicios tempranos, provocando una sorpresa estratégica irreparable. La doctrina exige mantener vigilancia sobre los NAIs que discriminan ambos cursos de acción. Ha acreditado +10 XP de Dominio.";
        if (!claimedUnits['LISA_TUTOR']) {
          const nextXp = Math.min(100, doctrinalXP + 10);
          setDoctrinalXP(nextXp);
          setClaimedUnits(prev => ({ ...prev, LISA_TUTOR: true }));
          if (onUpdateXp) onUpdateXp(nextXp);
        }
      } else {
        replyText = "Recuerde el principio de Heuer y del IPB: el adversario no siempre ejecuta la doctrina estándar más lógica. Ignorar el MDCOA deja ciegas a las fuerzas de maniobra ante su mayor capacidad de daño y facilita el engaño militar táctico. Reexamine las plantillas doctrinales de eventos antes de su próxima decisión.";
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toTimeString().split(' ')[0]
        }
      ]);
    }, 750);
  };

  // Evaluate CAMS Sincronization
  const handleEvaluateCams = () => {
    const successes: string[] = [];
    const errors: string[] = [];

    // NAI-1: Requiere SAR (desfiladero, noche, nubes)
    if (camsNai1 === 'sar') {
      successes.push("NAI-1 (Khyber): Correcto. El radar satelital SAR/GMTI penetra la densa nubosidad y la oscuridad nocturna donde las cámaras ópticas FMV quedarían ciegas.");
    } else {
      errors.push("NAI-1 (Khyber): Inadecuado. Las condiciones meteorológicas adversas y nocturnas anulan las cámaras electroópticas FMV convencionales o exploradores a pie.");
    }

    // NAI-2: Requiere SIGINT (emisiones de artillería)
    if (camsNai2 === 'sigint') {
      successes.push("NAI-2 (Puesto Mando): Correcto. El interceptor SIGINT/COMINT detectará las transmisiones de control de tiro y órdenes de red antes de que las piezas disparen.");
    } else {
      errors.push("NAI-2 (Puesto Mando): Error doctrinal. Para anticipar órdenes de fuego encubiertas en puestos de mando se requiere detección electromagnética (SIGINT/COMINT).");
    }

    // NAI-3: Requiere HUMINT (terreno humano, milicias urbanas)
    if (camsNai3 === 'humint') {
      successes.push("NAI-3 (Ciudad): Correcto. El terreno humano y la complicidad de milicias locales solo pueden penetrarse eficazmente mediante redes de inteligencia humana (HUMINT).");
    } else {
      errors.push("NAI-3 (Ciudad): Ineficaz. Los radares o sensores satelitales no pueden determinar lealtades políticas ni movimientos civiles encubiertos en interiores.");
    }

    const isAllOk = errors.length === 0;
    setCamsResult({
      evaluated: true,
      isSuccess: isAllOk,
      messages: successes,
      errors: errors
    });

    if (isAllOk && !claimedUnits['CAMS_PERFECT']) {
      const nextXp = Math.min(100, doctrinalXP + 25);
      setDoctrinalXP(nextXp);
      setClaimedUnits(prev => ({ ...prev, CAMS_PERFECT: true }));
      if (onUpdateXp) onUpdateXp(nextXp);
    }
  };

  // Grade Doctrinal Quiz
  const handleGradeQuiz = () => {
    const keyAnswers: Record<string, string> = {
      q1: 'B',
      q2: 'A',
      q3: 'B'
    };

    let score = 0;
    if (examAnswers['q1'] === keyAnswers['q1']) score++;
    if (examAnswers['q2'] === keyAnswers['q2']) score++;
    if (examAnswers['q3'] === keyAnswers['q3']) score++;

    setExamScore(score);
    setExamSubmitted(true);

    if (score >= 2 && !claimedUnits['QUIZ_PASSED']) {
      const nextXp = Math.min(100, doctrinalXP + 15);
      setDoctrinalXP(nextXp);
      setClaimedUnits(prev => ({ ...prev, QUIZ_PASSED: true }));
      if (onUpdateXp) onUpdateXp(nextXp);
    }
  };

  return (
    <div 
      id="doctrina-militar-overlay"
      className="fixed inset-0 z-70 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-[#020704]/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div 
        id="doctrina-militar-container"
        className="relative w-full max-w-6xl bg-[#04140e]/98 border border-[#10b981] rounded-xs shadow-[0_0_60px_rgba(16,185,129,0.25),0_30px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden my-auto flex flex-col max-h-[94vh]"
      >
        {/* Retícula táctica en las 4 esquinas */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#34d399] z-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#34d399] z-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#34d399] z-30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#34d399] z-30 pointer-events-none" />

        {/* 1. Header Operacional con Medidor de XP */}
        <header className="relative z-20 bg-[#020e09] border-b border-[#143e2b] px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-[#0b291d] text-[#34d399] border border-[#1e6141] font-mono text-[10px] font-bold rounded-2xs tracking-widest uppercase">
                CVIE // FASE I: SOPORTE TEÓRICO
              </span>
              <span className="text-[11px] font-mono text-[#52826e]">| NÚCLEO 1: DOCTRINA MILITAR DE INTELIGENCIA</span>
            </div>
            <h1 className="font-heading text-lg sm:text-2xl font-bold uppercase tracking-wider text-white leading-tight">
              Marco Doctrinal, IPB/IPOE y Gestión de Sensores Multi-INT
            </h1>
            <p className="font-sans text-xs text-[#9ebcb0] hidden sm:block">
              Estandarización OTAN / DoD en Operaciones Multidominio (MDO), C4ISR y Simetría de Decisión
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            {/* Medidor de Dominio Doctrinario (XP) */}
            <div className="min-w-[210px] sm:min-w-[240px] bg-[#051a12] p-2.5 rounded-xs border border-[#164b33]">
              <div className="flex justify-between text-[10px] font-mono mb-1 text-[#6e9b86]">
                <span>DOMINIO DOCTRINARIO (XP):</span>
                <span className="font-bold text-[#86efac]">{doctrinalXP} / 100 XP ({doctrinalXP}%)</span>
              </div>
              <div className="w-full bg-[#020a06] h-2.5 rounded-full overflow-hidden border border-[#143c29]">
                <div 
                  className="h-full bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#86efac] rounded-full transition-all duration-400 shadow-[0_0_10px_rgba(52,211,153,0.55)]"
                  style={{ width: `${doctrinalXP}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar módulo doctrinal"
              className="p-2 text-[#729e8b] hover:text-[#86efac] hover:bg-[#072418] border border-[#133c2a] hover:border-[#34d399] rounded-xs transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* 2. Navegación por Fases Pedagógicas */}
        <nav className="relative z-20 flex bg-[#03110b] border-b border-[#143e2b] overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className={`flex-1 py-3 px-4 text-center font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 border-b-2 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 0
                ? 'bg-[#092e1e] border-[#34d399] text-[#86efac] shadow-[inset_0_-2px_8px_rgba(52,211,153,0.2)]'
                : 'bg-transparent border-transparent text-[#7aa492] hover:text-white hover:bg-[#051b12]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#34d399]" />
            <span>1. APRENDER (Fundamentos)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`flex-1 py-3 px-4 text-center font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 border-b-2 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 1
                ? 'bg-[#092e1e] border-[#34d399] text-[#86efac] shadow-[inset_0_-2px_8px_rgba(52,211,153,0.2)]'
                : 'bg-transparent border-transparent text-[#7aa492] hover:text-white hover:bg-[#051b12]'
            }`}
          >
            <Brain className="w-4 h-4 text-[#34d399]" />
            <span>2. COMPRENDER (IPB & Tutor LISA)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(2)}
            className={`flex-1 py-3 px-4 text-center font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 border-b-2 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 2
                ? 'bg-[#092e1e] border-[#34d399] text-[#86efac] shadow-[inset_0_-2px_8px_rgba(52,211,153,0.2)]'
                : 'bg-transparent border-transparent text-[#7aa492] hover:text-white hover:bg-[#051b12]'
            }`}
          >
            <Cpu className="w-4 h-4 text-[#34d399]" />
            <span>3. DESARROLLAR (Simulador CAMS)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(3)}
            className={`flex-1 py-3 px-4 text-center font-heading text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 border-b-2 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 3
                ? 'bg-[#092e1e] border-[#34d399] text-[#86efac] shadow-[inset_0_-2px_8px_rgba(52,211,153,0.2)]'
                : 'bg-transparent border-transparent text-[#7aa492] hover:text-white hover:bg-[#051b12]'
            }`}
          >
            <Award className="w-4 h-4 text-[#34d399]" />
            <span>4. EVALUAR (Certificación)</span>
          </button>
        </nav>

        {/* 3. Área de Contenido de los Paneles */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6 text-[#d1ded9]">
          
          {/* ========================================================================= */}
          {/* PANE 1: APRENDER (Fundamentos Doctrinales)                                 */}
          {/* ========================================================================= */}
          {activeTab === 0 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="flex items-center gap-2 border-l-4 border-[#34d399] pl-3 mb-1.5">
                  <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                    Unidades Temáticas Fundacionales
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#9ebcb0] leading-relaxed">
                  Adquisición rigurosa de las taxonomías y directrices doctrinales de inteligencia de combate según estándares OTAN y JADC2.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
                {/* Unidad 1.1 */}
                <div className="p-5 rounded-xs border bg-[#061e14]/90 border-[#143e2b] hover:border-[#34d399] transition-all flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-2 py-0.5 bg-[#0a2b1c] text-[#34d399] border border-[#1b613e] text-[10px] font-mono font-bold rounded-2xs uppercase">
                        UNIDAD 1.1
                      </span>
                      <span className="text-xs font-mono text-[#86efac] font-bold">+15 XP</span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-white uppercase tracking-wide mb-2 text-[#86efac]">
                      Niveles de Inteligencia & MDO (JADC2)
                    </h3>

                    <p className="text-xs text-[#cbd5e1] leading-relaxed mb-3">
                      La inteligencia militar opera en tres niveles sincronizados dentro de las Operaciones Multidominio:
                    </p>

                    <ul className="text-xs text-[#cbd5e1] space-y-2 pl-3 list-disc marker:text-[#34d399] mb-4">
                      <li><strong className="text-white">Estratégica:</strong> Asiste a la alta conducción nacional y al Estado Mayor Conjunto (capacidades industriales, alianzas, centros de gravedad CoG).</li>
                      <li><strong className="text-white">Operacional:</strong> Orienta a comandantes de teatro (JTF), modelando campañas y líneas de comunicaciones (LOCs).</li>
                      <li><strong className="text-white">Táctica:</strong> Provee ventaja en el escalón brigada y batallón (blancos inmediatos y líneas de tiro).</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClaimUnitXP(15, 'u1_1', 'Unidad 1.1')}
                    className={`w-full py-2 px-3 text-xs font-mono font-bold rounded-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      claimedUnits['u1_1']
                        ? 'bg-[#0f3d2a] border-[#34d399] text-[#86efac]'
                        : 'bg-[#0e3b26] hover:bg-[#155437] border-[#207a4a] text-white'
                    }`}
                  >
                    {claimedUnits['u1_1'] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>UNIDAD 1.1 ASIMILADA (+15 XP)</span>
                      </>
                    ) : (
                      <span>VALIDAR APRENDIZAJE (+15 XP)</span>
                    )}
                  </button>
                </div>

                {/* Unidad 1.2 */}
                <div className="p-5 rounded-xs border bg-[#061e14]/90 border-[#143e2b] hover:border-[#34d399] transition-all flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-2 py-0.5 bg-[#0a2b1c] text-[#34d399] border border-[#1b613e] text-[10px] font-mono font-bold rounded-2xs uppercase">
                        UNIDAD 1.2
                      </span>
                      <span className="text-xs font-mono text-[#86efac] font-bold">+15 XP</span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-white uppercase tracking-wide mb-2 text-[#86efac]">
                      Orden de Batalla Situacional (SIOB)
                    </h3>

                    <p className="text-xs text-[#cbd5e1] leading-relaxed mb-3">
                      Descomposición de la anatomía del adversario bajo el estándar militar (MIL-STD-2525 / OTAN APP-6):
                    </p>

                    <ul className="text-xs text-[#cbd5e1] space-y-2 pl-3 list-disc marker:text-[#34d399] mb-4">
                      <li><strong className="text-white">Composición y Disposición:</strong> Escalonamiento táctico (vanguardia, masa de maniobra, reservas y apoyo de fuegos).</li>
                      <li><strong className="text-white">Eficacia Combativa:</strong> Dotación de personal, combustible, munición y moral de combate.</li>
                      <li><strong className="text-white">Simbología Unificada:</strong> Azul (amigas), Rojo (hostiles), Verde (neutrales) y Amarillo (desconocidas).</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClaimUnitXP(15, 'u1_2', 'Unidad 1.2')}
                    className={`w-full py-2 px-3 text-xs font-mono font-bold rounded-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      claimedUnits['u1_2']
                        ? 'bg-[#0f3d2a] border-[#34d399] text-[#86efac]'
                        : 'bg-[#0e3b26] hover:bg-[#155437] border-[#207a4a] text-white'
                    }`}
                  >
                    {claimedUnits['u1_2'] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>UNIDAD 1.2 ASIMILADA (+15 XP)</span>
                      </>
                    ) : (
                      <span>VALIDAR APRENDIZAJE (+15 XP)</span>
                    )}
                  </button>
                </div>

                {/* Unidad 1.3 */}
                <div className="p-5 rounded-xs border bg-[#061e14]/90 border-[#143e2b] hover:border-[#34d399] transition-all flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-2 py-0.5 bg-[#0a2b1c] text-[#34d399] border border-[#1b613e] text-[10px] font-mono font-bold rounded-2xs uppercase">
                        UNIDAD 1.3
                      </span>
                      <span className="text-xs font-mono text-[#86efac] font-bold">+15 XP</span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-white uppercase tracking-wide mb-2 text-[#86efac]">
                      El Terreno Militar: OCOKA
                    </h3>

                    <p className="text-xs text-[#cbd5e1] leading-relaxed mb-3">
                      El ambiente físico impone restricciones y multiplicadores de combate decisivos:
                    </p>

                    <ul className="text-xs text-[#cbd5e1] space-y-1.5 pl-3 list-disc marker:text-[#34d399] mb-4">
                      <li><strong className="text-white">O - Obstáculos:</strong> Canalizan o desvían el avance.</li>
                      <li><strong className="text-white">C - Cobertura/Encubrimiento:</strong> Protección balística y visual/térmica contra ISR.</li>
                      <li><strong className="text-white">O - Observación & Fuegos:</strong> Zonas dominantes.</li>
                      <li><strong className="text-white">K - Terreno Clave:</strong> Ventaja marcada.</li>
                      <li><strong className="text-white">A - Avenidas:</strong> Corredores de movilidad.</li>
                      <li><strong className="text-white">Terreno Humano:</strong> Lealtades locales y PSYOPS.</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClaimUnitXP(15, 'u1_3', 'Unidad 1.3')}
                    className={`w-full py-2 px-3 text-xs font-mono font-bold rounded-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      claimedUnits['u1_3']
                        ? 'bg-[#0f3d2a] border-[#34d399] text-[#86efac]'
                        : 'bg-[#0e3b26] hover:bg-[#155437] border-[#207a4a] text-white'
                    }`}
                  >
                    {claimedUnits['u1_3'] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>UNIDAD 1.3 ASIMILADA (+15 XP)</span>
                      </>
                    ) : (
                      <span>VALIDAR APRENDIZAJE (+15 XP)</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Botón de Siguiente Fase Pedagógica */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab(1)}
                  className="px-5 py-2.5 bg-[#0e3b26] hover:bg-[#155437] border border-[#34d399] text-white font-heading text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>IR A COMPRENDER (METODOLOGÍA IPB & TUTOR IA)</span>
                  <ChevronRight className="w-4 h-4 text-[#34d399]" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PANE 2: COMPRENDER (Proceso IPB & Tutor Socrático LISA con IA)             */}
          {/* ========================================================================= */}
          {activeTab === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="flex items-center gap-2 border-l-4 border-[#34d399] pl-3 mb-1.5">
                  <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                    Metodología IPB & Dinámica Operacional
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#9ebcb0] leading-relaxed">
                  Profundización en el proceso de 4 pasos del IPB/IPOE y la sincronización de sensores de búsqueda, guiada por el Copiloto Socrático IA.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
                {/* Unidad 2.1 */}
                <div className="p-5 rounded-xs border bg-[#061e14]/90 border-[#143e2b] hover:border-[#34d399] transition-all flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-2 py-0.5 bg-[#0a2b1c] text-[#34d399] border border-[#1b613e] text-[10px] font-mono font-bold rounded-2xs uppercase">
                        UNIDAD 2.1
                      </span>
                      <span className="text-xs font-mono text-[#86efac] font-bold">+15 XP</span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-white uppercase tracking-wide mb-2 text-[#86efac]">
                      Proceso Formal de 4 Pasos IPB / IPOE
                    </h3>

                    <ol className="text-xs text-[#cbd5e1] space-y-2 pl-4 list-decimal marker:text-[#34d399] marker:font-mono mb-4">
                      <li><strong className="text-white">Definir el Entorno Operativo:</strong> Delimitar el Área de Operaciones (AO) y de Interés (AOI).</li>
                      <li><strong className="text-white">Describir los Efectos del Entorno:</strong> Calco modificado de obstáculos (MCOO), clima y factores socioculturales.</li>
                      <li><strong className="text-white">Evaluar la Amenaza:</strong> Modelos doctrinales, matrices de capacidades y blancos de alto valor (HVT).</li>
                      <li><strong className="text-white">Determinar Cursos de Acción (COA):</strong> Prever el MLCOA y el MDCOA con matrices de eventos.</li>
                    </ol>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClaimUnitXP(15, 'u2_1', 'Unidad 2.1')}
                    className={`w-full py-2 px-3 text-xs font-mono font-bold rounded-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      claimedUnits['u2_1']
                        ? 'bg-[#0f3d2a] border-[#34d399] text-[#86efac]'
                        : 'bg-[#0e3b26] hover:bg-[#155437] border-[#207a4a] text-white'
                    }`}
                  >
                    {claimedUnits['u2_1'] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>UNIDAD 2.1 ASIMILADA (+15 XP)</span>
                      </>
                    ) : (
                      <span>VALIDAR COMPRENSIÓN (+15 XP)</span>
                    )}
                  </button>
                </div>

                {/* Unidad 2.2 */}
                <div className="p-5 rounded-xs border bg-[#061e14]/90 border-[#143e2b] hover:border-[#34d399] transition-all flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-2 py-0.5 bg-[#0a2b1c] text-[#34d399] border border-[#1b613e] text-[10px] font-mono font-bold rounded-2xs uppercase">
                        UNIDAD 2.2
                      </span>
                      <span className="text-xs font-mono text-[#86efac] font-bold">+15 XP</span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-white uppercase tracking-wide mb-2 text-[#86efac]">
                      Doctrina de Fusión & Colección (CAMS)
                    </h3>

                    <p className="text-xs text-[#cbd5e1] leading-relaxed mb-3">
                      Principios rectores para sincronizar sensores en el teatro de operaciones:
                    </p>

                    <ul className="text-xs text-[#cbd5e1] space-y-2 pl-3 list-disc marker:text-[#34d399] mb-4">
                      <li><strong className="text-white">Cross-Cueing:</strong> Un sensor de área (SIGINT o radar SAR) alerta y reorienta de inmediato a un sensor de precisión (cámara FMV) para confirmar el blanco.</li>
                      <li><strong className="text-white">Mezcla (Mixing):</strong> Emplear disciplinas INT distintas sobre una misma zona (HUMINT + IMINT) para evitar ceguera por engaño.</li>
                      <li><strong className="text-white">Redundancia:</strong> Asignar sensores paralelos para garantizar continuidad operativa.</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleClaimUnitXP(15, 'u2_2', 'Unidad 2.2')}
                    className={`w-full py-2 px-3 text-xs font-mono font-bold rounded-xs border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      claimedUnits['u2_2']
                        ? 'bg-[#0f3d2a] border-[#34d399] text-[#86efac]'
                        : 'bg-[#0e3b26] hover:bg-[#155437] border-[#207a4a] text-white'
                    }`}
                  >
                    {claimedUnits['u2_2'] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>UNIDAD 2.2 ASIMILADA (+15 XP)</span>
                      </>
                    ) : (
                      <span>VALIDAR COMPRENSIÓN (+15 XP)</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Asistente Socrático LISA con IA */}
              <div className="bg-[#051c13] border border-[#164a33] rounded-xs overflow-hidden shadow-lg flex flex-col">
                <div className="bg-[#072418] px-4 py-2.5 border-b border-[#164a33] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-[#34d399]" />
                    <span className="font-mono text-xs font-bold text-[#86efac] uppercase tracking-wider">
                      TUTOR SOCRÁTICO MILITAR (LISA) // INTELIGENCIA ARTIFICIAL DOCTRINAL
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#0a3321] text-[#34d399] border border-[#1b613e] rounded-2xs font-bold">
                    SOPORTE DOCTRINAL ACTIVO
                  </span>
                </div>

                {/* Chat Log */}
                <div className="p-4 overflow-y-auto max-h-[260px] space-y-3 bg-[#03110b]">
                  {chatMessages.map((msg) => {
                    const isAi = msg.sender === 'ai';
                    return (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-xs text-xs leading-relaxed ${
                          isAi
                            ? 'bg-[#072418] border-l-3 border-[#34d399] text-[#d1ded9]'
                            : 'bg-[#12422e] text-white ml-8 border border-[#207a4a]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1 opacity-80">
                          <span className="font-bold uppercase text-[#86efac]">
                            {isAi ? '🤖 LISA (TUTOR DOCTRINAL IA)' : '👤 OFICIAL ANALISTA'}
                          </span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p>{msg.text}</p>
                      </div>
                    );
                  })}
                  {aiThinking && (
                    <div className="p-2.5 bg-[#072418] border-l-2 border-[#34d399] text-xs text-[#86efac] font-mono flex items-center gap-2 animate-pulse">
                      <Sparkles className="w-3.5 h-3.5 text-[#34d399]" />
                      <span>LISA analizando respuesta doctrinal con manuales de Estado Mayor...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendAiMessage} className="p-2.5 bg-[#072418] border-t border-[#164a33] flex gap-2">
                  <input
                    type="text"
                    value={aiInputText}
                    onChange={(e) => setAiInputText(e.target.value)}
                    placeholder="Escriba su justificación doctrinal basada en OCOKA, PIR o MDCOA..."
                    className="flex-1 bg-[#020a06] border border-[#184e36] focus:border-[#34d399] rounded-xs px-3 py-2 text-xs text-white outline-none font-sans"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0e3b26] hover:bg-[#155437] border border-[#207a4a] text-[#86efac] hover:text-white font-mono text-xs font-bold rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Responder</span>
                  </button>
                </form>
              </div>

              {/* Botón de Siguiente Fase Pedagógica */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab(2)}
                  className="px-5 py-2.5 bg-[#0e3b26] hover:bg-[#155437] border border-[#34d399] text-white font-heading text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>IR A DESARROLLAR (SIMULADOR DE ASIGNACIÓN CAMS)</span>
                  <ChevronRight className="w-4 h-4 text-[#34d399]" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PANE 3: DESARROLLAR (Laboratorio Práctico: Sincronizador CAMS)           */}
          {/* ========================================================================= */}
          {activeTab === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="flex items-center gap-2 border-l-4 border-[#34d399] pl-3 mb-1.5">
                  <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                    Taller Práctico: Sincronización de Sensores y Áreas NAI (CAMS)
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#9ebcb0] leading-relaxed">
                  <strong>Misión del Oficial de Colección:</strong> Asigne el sensor óptimo para cada Área de Interés Designada (NAI) a fin de satisfacer los Requerimientos Prioritarios de Inteligencia (PIR) del Comandante de Brigada.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Columna Izquierda: Configuración de los 3 NAIs */}
                <div className="lg:col-span-7 space-y-4">
                  {/* NAI 1 */}
                  <div className="p-4 bg-[#061e14] border border-[#164a33] rounded-xs space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <strong className="text-white uppercase">NAI-1: Desfiladero Rocoso &quot;Khyber&quot;</strong>
                      <span className="px-2 py-0.5 bg-[#261d06] text-[#facc15] border border-[#78590c] text-[10px] rounded-2xs font-bold uppercase">
                        PIR 1
                      </span>
                    </div>
                    <p className="text-xs text-[#cbd5e1] leading-relaxed">
                      <strong>PIR 1:</strong> ¿Intentará el enemigo infiltrar blindados por el corredor montañoso nocturno bajo densa nubosidad?
                    </p>
                    <div>
                      <label className="text-[11px] font-mono text-[#6e9b86] block mb-1">
                        Sensor Primario Asignado:
                      </label>
                      <select
                        value={camsNai1}
                        onChange={(e) => setCamsNai1(e.target.value)}
                        className="w-full bg-[#020b07] border border-[#1a553b] text-white rounded-2xs px-3 py-1.5 text-xs outline-none focus:border-[#34d399]"
                      >
                        <option value="none">-- Seleccionar Sensor --</option>
                        <option value="sar">Radar Satelital SAR / GMTI (Capacidad Todo Tiempo / Penetrador de Nubes)</option>
                        <option value="fmv">UAV Electroóptico FMV Diurno (Cámara visual HD)</option>
                        <option value="humint">Vigilante HUMINT Local a pie</option>
                      </select>
                    </div>
                  </div>

                  {/* NAI 2 */}
                  <div className="p-4 bg-[#061e14] border border-[#164a33] rounded-xs space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <strong className="text-white uppercase">NAI-2: Puesto de Mando y Red Eléctrica</strong>
                      <span className="px-2 py-0.5 bg-[#0a203a] text-[#38bdf8] border border-[#1e4d7a] text-[10px] rounded-2xs font-bold uppercase">
                        PIR 2
                      </span>
                    </div>
                    <p className="text-xs text-[#cbd5e1] leading-relaxed">
                      <strong>PIR 2:</strong> ¿Está emitiendo órdenes el escalón de artillería pesada hostil antes de abrir fuego de saturación?
                    </p>
                    <div>
                      <label className="text-[11px] font-mono text-[#6e9b86] block mb-1">
                        Sensor Primario Asignado:
                      </label>
                      <select
                        value={camsNai2}
                        onChange={(e) => setCamsNai2(e.target.value)}
                        className="w-full bg-[#020b07] border border-[#1a553b] text-white rounded-2xs px-3 py-1.5 text-xs outline-none focus:border-[#34d399]"
                      >
                        <option value="none">-- Seleccionar Sensor --</option>
                        <option value="sigint">Receptor Táctico SIGINT / COMINT de Guerra Electrónica</option>
                        <option value="fmv">UAV Diurno FMV sobrevolando a baja cota</option>
                        <option value="osint">Monitoreo de redes sociales abiertas (OSINT)</option>
                      </select>
                    </div>
                  </div>

                  {/* NAI 3 */}
                  <div className="p-4 bg-[#061e14] border border-[#164a33] rounded-xs space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <strong className="text-white uppercase">NAI-3: Ciudad Fronteriza / Terreno Humano</strong>
                      <span className="px-2 py-0.5 bg-[#0b2b1d] text-[#34d399] border border-[#1e6141] text-[10px] rounded-2xs font-bold uppercase">
                        PIR 3
                      </span>
                    </div>
                    <p className="text-xs text-[#cbd5e1] leading-relaxed">
                      <strong>PIR 3:</strong> ¿Existen preparativos de la población civil y milicias locales para apoyar una finta en el casco urbano?
                    </p>
                    <div>
                      <label className="text-[11px] font-mono text-[#6e9b86] block mb-1">
                        Sensor Primario Asignado:
                      </label>
                      <select
                        value={camsNai3}
                        onChange={(e) => setCamsNai3(e.target.value)}
                        className="w-full bg-[#020b07] border border-[#1a553b] text-white rounded-2xs px-3 py-1.5 text-xs outline-none focus:border-[#34d399]"
                      >
                        <option value="none">-- Seleccionar Sensor --</option>
                        <option value="humint">Red HUMINT de Agentes e Informantes Civiles</option>
                        <option value="sar">Radar Satelital SAR espacial</option>
                        <option value="sigint">Interceptación de radares de navegación costera</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleEvaluateCams}
                    className="w-full py-3 px-4 bg-[#10b981] hover:bg-[#059669] text-black font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-950"
                  >
                    <Zap className="w-4 h-4 text-black" />
                    <span>⚡ VALIDAR MATRIZ DE SINCRONIZACIÓN DOCTRINAL (+25 XP)</span>
                  </button>
                </div>

                {/* Columna Derecha: Diagnóstico MICCC y Principio de Colección */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="p-4 bg-[#061a12] border border-[#164a33] rounded-xs flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-2 text-[#86efac]">
                        DIAGNÓSTICO DEL PLAN DE COLECCIÓN (MICCC)
                      </h3>

                      {!camsResult.evaluated ? (
                        <p className="text-xs text-[#9ebcb0] leading-relaxed">
                          Configure los sensores en cada NAI y presione el botón de validación para calcular la cobertura de inteligencia, evitar pérdidas de activos y comprobar la correlación cruzada (*Cross-Cueing*).
                        </p>
                      ) : camsResult.isSuccess ? (
                        <div className="space-y-3 animate-fadeIn">
                          <div className="p-2.5 bg-[#0b3321] border border-[#34d399] rounded-2xs text-[#86efac] font-bold text-xs font-mono flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                            <span>PLAN DE COLECCIÓN PERFECTAMENTE SINCRONIZADO (100% EFICACIA)</span>
                          </div>
                          <ul className="text-xs text-[#cbd5e1] space-y-2 pl-3 list-disc marker:text-[#34d399]">
                            {camsResult.messages.map((m, idx) => (
                              <li key={idx}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="space-y-3 animate-fadeIn">
                          <div className="p-2.5 bg-[#360909] border border-[#ef4444] rounded-2xs text-[#fca5a5] font-bold text-xs font-mono flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
                            <span>FALLOS EN LA DISTRIBUCIÓN DE SENSORES</span>
                          </div>
                          <ul className="text-xs text-[#fca5a5] space-y-2 pl-3 list-disc marker:text-[#ef4444]">
                            {camsResult.errors.map((e, idx) => (
                              <li key={idx}>{e}</li>
                            ))}
                          </ul>
                          <p className="text-[11px] font-mono text-[#9ebcb0] pt-1">
                            Ajuste los sensores basándose en la física meteorológica y el tipo de emisión del objetivo.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="p-3 bg-[#030e09] border border-[#143c29] rounded-xs mt-4">
                      <strong className="text-[11px] font-mono text-[#34d399] uppercase block mb-1">
                        PRINCIPIO CAMS DE FORT HUACHUCA:
                      </strong>
                      <p className="text-xs text-[#cbd5e1] leading-relaxed italic">
                        &quot;Si se asigna el sensor erróneo al lugar o momento equivocado, no se generará inteligencia utilizable y se dejará a la fuerza propia ciega ante el Curso de Acción Más Peligroso del enemigo.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de Siguiente Fase Pedagógica */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab(3)}
                  className="px-5 py-2.5 bg-[#0e3b26] hover:bg-[#155437] border border-[#34d399] text-white font-heading text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>IR A EVALUAR (CERTIFICACIÓN DOCTRINARIA)</span>
                  <ChevronRight className="w-4 h-4 text-[#34d399]" />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PANE 4: EVALUAR (Certificación Formal de Dominio Doctrinario)              */}
          {/* ========================================================================= */}
          {activeTab === 3 && (
            <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn">
              <div>
                <div className="flex items-center gap-2 border-l-4 border-[#34d399] pl-3 mb-1.5">
                  <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                    Examen Estandarizado de Certificación en Doctrina
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#9ebcb0] leading-relaxed">
                  Responda correctamente los 3 reactivos doctrinarios para certificar el dominio del Núcleo 1 y registrar los créditos en el expediente del oficial.
                </p>
              </div>

              <div className="space-y-4">
                {/* Reactivo 1 */}
                <div className="p-4 bg-[#061e14] border border-[#164a33] rounded-xs space-y-2.5">
                  <div className="font-sans text-xs sm:text-sm font-bold text-white leading-relaxed">
                    1. ¿Qué producto gráfico se obtiene fundamentalmente al finalizar el Paso 2 del proceso IPB (Describir los efectos del entorno)?
                  </div>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2.5 p-2 rounded-2xs bg-[#030e09] hover:bg-[#072418] cursor-pointer border border-[#143c29]">
                      <input
                        type="radio"
                        name="q1"
                        value="A"
                        checked={examAnswers['q1'] === 'A'}
                        onChange={(e) => setExamAnswers(prev => ({ ...prev, q1: e.target.value }))}
                      />
                      <span>A) El Orden de Batalla detallado de las divisiones acorazadas del oponente.</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded-2xs bg-[#030e09] hover:bg-[#072418] cursor-pointer border border-[#143c29]">
                      <input
                        type="radio"
                        name="q1"
                        value="B"
                        checked={examAnswers['q1'] === 'B'}
                        onChange={(e) => setExamAnswers(prev => ({ ...prev, q1: e.target.value }))}
                      />
                      <span>B) El Calco Modificado de Obstáculos (MCOO) y la identificación de corredores de movilidad.</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded-2xs bg-[#030e09] hover:bg-[#072418] cursor-pointer border border-[#143c29]">
                      <input
                        type="radio"
                        name="q1"
                        value="C"
                        checked={examAnswers['q1'] === 'C'}
                        onChange={(e) => setExamAnswers(prev => ({ ...prev, q1: e.target.value }))}
                      />
                      <span>C) La lista final de requerimientos prioritarios de información (PIR).</span>
                    </label>
                  </div>
                </div>

                {/* Reactivo 2 */}
                <div className="p-4 bg-[#061e14] border border-[#164a33] rounded-xs space-y-2.5">
                  <div className="font-sans text-xs sm:text-sm font-bold text-white leading-relaxed">
                    2. ¿Cuál es el propósito del principio doctrinal de &quot;Cross-Cueing&quot; en la gestión de sensores C4ISR?
                  </div>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2.5 p-2 rounded-2xs bg-[#030e09] hover:bg-[#072418] cursor-pointer border border-[#143c29]">
                      <input
                        type="radio"
                        name="q2"
                        value="A"
                        checked={examAnswers['q2'] === 'A'}
                        onChange={(e) => setExamAnswers(prev => ({ ...prev, q2: e.target.value }))}
                      />
                      <span>A) Utilizar un sensor de amplio espectro para alertar y reorientar a un sensor de precisión que confirme el blanco.</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded-2xs bg-[#030e09] hover:bg-[#072418] cursor-pointer border border-[#143c29]">
                      <input
                        type="radio"
                        name="q2"
                        value="B"
                        checked={examAnswers['q2'] === 'B'}
                        onChange={(e) => setExamAnswers(prev => ({ ...prev, q2: e.target.value }))}
                      />
                      <span>B) Reemplazar todos los sensores tripulados por sistemas autónomos sin intervención humana.</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded-2xs bg-[#030e09] hover:bg-[#072418] cursor-pointer border border-[#143c29]">
                      <input
                        type="radio"
                        name="q2"
                        value="C"
                        checked={examAnswers['q2'] === 'C'}
                        onChange={(e) => setExamAnswers(prev => ({ ...prev, q2: e.target.value }))}
                      />
                      <span>C) Transmitir en frecuencias civiles abiertas para desinformar a la población neutral.</span>
                    </label>
                  </div>
                </div>

                {/* Reactivo 3 */}
                <div className="p-4 bg-[#061e14] border border-[#164a33] rounded-xs space-y-2.5">
                  <div className="font-sans text-xs sm:text-sm font-bold text-white leading-relaxed">
                    3. En la metodología IPB, ¿por qué es imperativo formular el Curso de Acción Más Peligroso (MDCOA) además del Más Probable (MLCOA)?
                  </div>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-center gap-2.5 p-2 rounded-2xs bg-[#030e09] hover:bg-[#072418] cursor-pointer border border-[#143c29]">
                      <input
                        type="radio"
                        name="q3"
                        value="A"
                        checked={examAnswers['q3'] === 'A'}
                        onChange={(e) => setExamAnswers(prev => ({ ...prev, q3: e.target.value }))}
                      />
                      <span>A) Porque el MDCOA es siempre la maniobra que el enemigo ejecutará según sus manuales reglamentarios.</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded-2xs bg-[#030e09] hover:bg-[#072418] cursor-pointer border border-[#143c29]">
                      <input
                        type="radio"
                        name="q3"
                        value="B"
                        checked={examAnswers['q3'] === 'B'}
                        onChange={(e) => setExamAnswers(prev => ({ ...prev, q3: e.target.value }))}
                      />
                      <span>B) Para garantizar que el mando no sufra una sorpresa catastrófica si el adversario decide emplear su capacidad de máximo daño.</span>
                    </label>

                    <label className="flex items-center gap-2.5 p-2 rounded-2xs bg-[#030e09] hover:bg-[#072418] cursor-pointer border border-[#143c29]">
                      <input
                        type="radio"
                        name="q3"
                        value="C"
                        checked={examAnswers['q3'] === 'C'}
                        onChange={(e) => setExamAnswers(prev => ({ ...prev, q3: e.target.value }))}
                      />
                      <span>C) Porque el MDCOA concierne exclusivamente a las operaciones de paz de Naciones Unidas.</span>
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGradeQuiz}
                  className="w-full py-3 px-4 bg-[#0e3b26] hover:bg-[#155437] border border-[#34d399] text-white font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                >
                  ENVIAR RESPUESTAS Y CALIFICAR DOMINIO (+15 XP)
                </button>

                {examSubmitted && (
                  <div className="p-4 bg-[#030e09] border border-[#1b5d3d] rounded-xs text-center space-y-2 animate-fadeIn">
                    <h3 className="font-heading text-base font-bold text-white uppercase tracking-wider">
                      RESULTADO DE LA EVALUACIÓN
                    </h3>
                    <div className="font-mono text-2xl font-bold text-[#86efac]">
                      {Math.round((examScore / 3) * 100)}% ({examScore}/3 ACIERTOS)
                    </div>
                    <p className="text-xs text-[#cbd5e1]">
                      {examScore >= 2
                        ? 'CERTIFICACIÓN APROBADA: Ha acreditado el conocimiento conceptual exigido para la toma de decisiones estratégicas. (+15 XP sumados).'
                        : 'NO ACREDITADO: Vuelva a repasar las unidades de APRENDER y COMPRENDER antes de continuar.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* 4. Footer Modal */}
        <footer className="relative z-20 bg-[#020e09] border-t border-[#143e2b] px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="text-[11px] font-mono text-[#6e9b86]">
            CVIE • INTEL SUITE // NÚCLEO 1 DOCTRINA MILITAR DE INTELIGENCIA
          </div>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 bg-[#0e3b26] hover:bg-[#155437] border border-[#34d399] text-white font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
          >
            REGISTRAR ASIMILACIÓN Y VOLVER
          </button>
        </footer>
      </div>
    </div>
  );
}
