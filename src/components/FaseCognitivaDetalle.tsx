import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Clock, 
  AlertTriangle, 
  Radio, 
  Send, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  Zap, 
  Scale, 
  Bot, 
  User, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Compass,
  ChevronRight,
  Lightbulb,
  Check,
  Layers
} from 'lucide-react';

interface FaseCognitivaDetalleProps {
  onClose?: () => void;
  onEnterModule?: () => void;
}

interface IntelItem {
  id: string;
  type: 'SIGINT' | 'OSINT' | 'IMINT' | 'HUMINT';
  typeLabel: string;
  doctrineCode: string;
  doctrineColor: string;
  source: string;
  title: string;
  description: string;
  isDeception: boolean;
  isInject?: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'redteam' | 'user' | 'system';
  author: string;
  text: string;
  timestamp: string;
}

export function FaseCognitivaDetalle({ onClose, onEnterModule }: FaseCognitivaDetalleProps) {
  // Threat Level / Escalation (1: Estándar, 2: Guerra Electrónica, 3: Crisis Crítica)
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);

  // Critical Countdown Timer (in seconds)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(240); // 04:00
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [isTimeExpired, setIsTimeExpired] = useState<boolean>(false);

  // Active selected evidence card
  const [selectedCardId, setSelectedCardId] = useState<string>('e1');

  // Lateral Thinking / Abduction Lab State
  const [lateralTab, setLateralTab] = useState<number>(0);
  const [abductionStepCompleted, setAbductionStepCompleted] = useState<number>(0);
  const [earnedXp, setEarnedXp] = useState<number>(0);

  // Contrast Mode / Comparativa Didáctica
  const [showContrastModal, setShowContrastModal] = useState<boolean>(false);
  const [contrastViewMode, setContrastViewMode] = useState<'both' | 'intuitive' | 'structured'>('both');

  // Intel Feed Items according to doctrine
  const [intelItems, setIntelItems] = useState<IntelItem[]>([
    {
      id: 'e1',
      type: 'OSINT',
      typeLabel: 'OSINT // REDES SOCIALES',
      doctrineCode: 'DOCTRINA: C-3',
      doctrineColor: 'text-[#f59e0b]',
      source: 'Canales abiertos de mensajería y video',
      title: 'E1: Videos virales en canales abiertos',
      description: 'Muestran convoyes de blindados pesados avanzando en el Sector Fronterizo Oeste en pleno día y con alta visibilidad deliberada.',
      isDeception: false
    },
    {
      id: 'e2',
      type: 'SIGINT',
      typeLabel: 'SIGINT // CIBER DEFENSA',
      doctrineCode: 'DOCTRINA: A-2',
      doctrineColor: 'text-[#00ffff]',
      source: 'Centro de Operaciones de Ciberdefensa',
      title: 'E2: Ataque de denegación de servicio (DDoS)',
      description: 'Interrumpe de forma sincronizada las redes de energía y comunicaciones tácticas en el Sector Fronterizo Este.',
      isDeception: false
    },
    {
      id: 'e3',
      type: 'IMINT',
      typeLabel: 'IMINT // RADAR SAR',
      doctrineCode: 'DOCTRINA: B-1',
      doctrineColor: 'text-[#00e676]',
      source: 'Constelación Satelital SAR Multibanda',
      title: 'E3: Satélite SAR detecta siluetas de tanques estáticas',
      description: 'Presentan bajísima o nula firma térmica infrarroja en la línea fronteriza del oeste, sugiriendo señuelos inflables o maquetas.',
      isDeception: false
    },
    {
      id: 'e4',
      type: 'HUMINT',
      typeLabel: 'HUMINT // FUENTE HUMANA',
      doctrineCode: 'DOCTRINA: B-2',
      doctrineColor: 'text-[#a855f7]',
      source: 'Red de observadores civiles transfronterizos',
      title: 'E4: Personal civil en frontera oriental',
      description: 'Reporta acopio nocturno clandestino de armamento portátil, municiones y transferencias monetarias a camioneros locales.',
      isDeception: false
    }
  ]);

  // ACH Matrix Consistency Values (C = Consistente, I = Inconsistente, N = Neutro)
  // Default values illustrate initial biased perception (E1 and E3 marked C with H1 to trigger bias warnings)
  const [achMatrix, setAchMatrix] = useState<Record<string, 'C' | 'I' | 'N'>>({
    'e1-h1': 'C',
    'e1-h2': 'C',
    'e1-h3': 'N',
    'e2-h1': 'N',
    'e2-h2': 'C',
    'e2-h3': 'C',
    'e3-h1': 'C', // Inicia con sesgo de confirmación deliberado para provocar advertencia
    'e3-h2': 'C',
    'e3-h3': 'I',
    'e4-h1': 'I',
    'e4-h2': 'C',
    'e4-h3': 'C'
  });

  // Cognitive Biases Radar Metrics
  const [biasMetrics, setBiasMetrics] = useState({
    confirmacion: { pct: 85, level: 'Alerta: Alto (85%)', alert: true },
    anclaje: { pct: 60, level: 'Moderado (60%)', alert: true },
    decepcion: { pct: 80, level: 'Crítica (80%)', alert: true }
  });

  // Chatbot / Red Team Messages State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      author: 'TUTOR COGNITIVO LISA',
      text: 'Oficial analista, se ha iniciado la simulación en ventana de 4 minutos. Si el oponente está mostrando convoyes masivos en redes (E1) pero el satélite detecta que carecen de calor (E3), ¿cómo evalúa la hipótesis de ataque principal por el oeste? Justifique su respuesta doctrinariamente.',
      timestamp: '00:00:01'
    }
  ]);

  const [analystInput, setAnalystInput] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Format mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Timer Effect
  useEffect(() => {
    if (!timerActive || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimeExpired(true);
          setTimerActive(false);
          addChatMessage(
            'redteam',
            'RED TEAM ADVERSARIO',
            'TIEMPO EXTREMO EXPIRADO. La parálisis por análisis provocó la sorpresa táctica propia en el este.'
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, remainingSeconds]);

  // Auto-scroll chat log
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Calculate Inconsistencies for H1, H2, H3
  const calculateInconsistencies = () => {
    let incH1 = 0;
    let incH2 = 0;
    let incH3 = 0;

    intelItems.forEach((item) => {
      if (achMatrix[`${item.id}-h1`] === 'I') incH1++;
      if (achMatrix[`${item.id}-h2`] === 'I') incH2++;
      if (achMatrix[`${item.id}-h3`] === 'I') incH3++;
    });

    return [incH1, incH2, incH3];
  };

  const inconsistencies = calculateInconsistencies();
  const minInconsistency = Math.min(...inconsistencies);

  // Get Sherman Kent Estimative Probability
  const getHeuerDiagnosis = () => {
    const bestHyp: string[] = [];
    if (inconsistencies[0] === minInconsistency) bestHyp.push('H1 (Ofensiva Convencional)');
    if (inconsistencies[1] === minInconsistency) bestHyp.push('H2 (Decepción / Finta Táctica)');
    if (inconsistencies[2] === minInconsistency) bestHyp.push('H3 (Penetración Asimétrica)');

    let probabilityKent = 'ALTAMENTE PROBABLE [75%-85%]';
    if (minInconsistency > 1) probabilityKent = 'PROBABLE [55%-70%]';
    if (bestHyp.length > 1) probabilityKent = 'RIESGO EQUILIBRADO [50%]';

    return {
      bestHypName: bestHyp.join(' o '),
      minI: minInconsistency,
      probabilityKent
    };
  };

  const heuerVerdict = getHeuerDiagnosis();

  // Helper to append message
  const addChatMessage = (sender: ChatMessage['sender'], author: string, text: string) => {
    const d = new Date();
    const ts = d.toTimeString().split(' ')[0];
    setChatMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}-${Math.random()}`,
        sender,
        author,
        text,
        timestamp: ts
      }
    ]);
  };

  // Toggle Deception Flag on Evidence Card
  const handleToggleDeception = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setIntelItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isDeception;
          if (nextState) {
            addChatMessage(
              'system',
              'CVIE SISTEMA',
              `Señal ${id.toUpperCase()} clasificada como potencial cebo táctico enemigo.`
            );
            // Drop deception vulnerability
            setBiasMetrics((bm) => ({
              ...bm,
              decepcion: {
                pct: Math.max(10, bm.decepcion.pct - 35),
                level: bm.decepcion.pct - 35 >= 60 ? 'Crítica' : 'Baja (25%)',
                alert: bm.decepcion.pct - 35 >= 60
              }
            }));
          } else {
            addChatMessage(
              'system',
              'CVIE SISTEMA',
              `Señal ${id.toUpperCase()} desmarcada como cebo táctico.`
            );
          }
          return { ...item, isDeception: nextState };
        }
        return item;
      })
    );
  };

  // ACH Cell Change & Cognitive Gap Audit
  const handleAchCellChange = (itemId: string, hIdx: number, val: 'C' | 'I' | 'N') => {
    const updated = { ...achMatrix, [`${itemId}-h${hIdx}`]: val };
    setAchMatrix(updated);

    // Audit Cognitive Gaps
    const e3_h1 = updated['e3-h1'] || 'N';
    let incH1 = 0;
    let incH2 = 0;
    let incH3 = 0;
    intelItems.forEach((it) => {
      if (updated[`${it.id}-h1`] === 'I') incH1++;
      if (updated[`${it.id}-h2`] === 'I') incH2++;
      if (updated[`${it.id}-h3`] === 'I') incH3++;
    });

    let newConf = 15;
    if (e3_h1 === 'C') {
      newConf = 85;
      addChatMessage(
        'redteam',
        'ALERTA COGNITIVA LISA',
        'PRECAUCIÓN: Está calificando la evidencia de señuelos (E3) como consistente con una ofensiva real (H1). Esto indica un posible Sesgo de Confirmación para validar su sospecha preconcebida.'
      );
    }

    let newAnch = 15;
    if (incH1 === 0 && incH3 > 1) {
      newAnch = 70;
    }

    setBiasMetrics((bm) => ({
      ...bm,
      confirmacion: {
        pct: newConf,
        level: newConf >= 60 ? 'Alerta: Alto (85%)' : 'Bajo (15%)',
        alert: newConf >= 60
      },
      anclaje: {
        pct: newAnch,
        level: newAnch >= 60 ? 'Alerta: Alto (70%)' : 'Moderado (15%)',
        alert: newAnch >= 60
      }
    }));
  };

  // Reset ACH Table
  const handleResetAch = () => {
    const cleared: Record<string, 'C' | 'I' | 'N'> = {};
    intelItems.forEach((it) => {
      cleared[`${it.id}-h1`] = 'N';
      cleared[`${it.id}-h2`] = 'N';
      cleared[`${it.id}-h3`] = 'N';
    });
    setAchMatrix(cleared);
    addChatMessage('system', 'CVIE SISTEMA', 'Matriz ACH restablecida a valores neutros.');
  };

  // Preset: Simular Sesgo Típico (Enfoque Intuitivo)
  const applyBiasedPreset = () => {
    setAchMatrix({
      'e1-h1': 'C',
      'e1-h2': 'I',
      'e1-h3': 'I',
      'e2-h1': 'N',
      'e2-h2': 'I',
      'e2-h3': 'N',
      'e3-h1': 'C', // Error de sesgo de confirmación: creer que son tanques reales
      'e3-h2': 'I',
      'e3-h3': 'I',
      'e4-h1': 'I',
      'e4-h2': 'I',
      'e4-h3': 'C'
    });
    setBiasMetrics({
      confirmacion: { pct: 85, level: 'Crítico (85%)', alert: true },
      anclaje: { pct: 75, level: 'Alto (75%)', alert: true },
      decepcion: { pct: 80, level: 'Crítica (80%)', alert: true }
    });
    addChatMessage(
      'redteam',
      'SIMULADOR DE SESGO TÍPICO',
      'MODO ILUSTRATIVO: Se ha cargado el patrón erróneo habitual. El analista se ancla en los videos virales (E1) y fuerza consistencia en H1 ignorando la falta de calor en SAR (E3).'
    );
  };

  // Preset: Aplicar Rigor Heuer + Pensamiento Lateral
  const applyOptimalPreset = () => {
    setAchMatrix({
      'e1-h1': 'C',
      'e1-h2': 'C',
      'e1-h3': 'N',
      'e2-h1': 'I',
      'e2-h2': 'C',
      'e2-h3': 'C',
      'e3-h1': 'I', // Clave: el señuelo refuta H1
      'e3-h2': 'C',
      'e3-h3': 'N',
      'e4-h1': 'I',
      'e4-h2': 'C',
      'e4-h3': 'C'
    });
    setIntelItems((prev) =>
      prev.map((it) => (it.id === 'e1' || it.id === 'e3' ? { ...it, isDeception: true } : it))
    );
    setBiasMetrics({
      confirmacion: { pct: 10, level: 'Bajo (10%)', alert: false },
      anclaje: { pct: 15, level: 'Bajo (15%)', alert: false },
      decepcion: { pct: 10, level: 'Mínima (10%)', alert: false }
    });
    addChatMessage(
      'ai',
      'TUTOR COGNITIVO LISA',
      'MODO RIGUROSO APLICADO: H1 es refutada dos veces por la evidencia técnica de señuelos y el vector asimétrico del este. H2 y H3 emergen como explicaciones parsimoniosas coincidentes.'
    );
  };

  // Inject Tactical Noise / Stress Surge
  const handleInjectStress = () => {
    setRemainingSeconds((prev) => Math.max(15, prev - 40));
    const nextIdx = intelItems.length + 1;
    const newInjectId = `e${nextIdx}`;

    const newInjectItem: IntelItem = {
      id: newInjectId,
      type: 'SIGINT',
      typeLabel: 'ALERTA CAMS // GUERRA ELECTRÓNICA',
      doctrineCode: 'RUIDO INYECTADO',
      doctrineColor: 'text-[#ff003c]',
      source: 'Puesto de Escucha Frontera Norte',
      title: 'ALERTA FLASH: Perturbaciones activas de GPS y feeds sintéticos',
      description: 'El enemigo realiza perturbaciones de geolocalización y siembra múltiples feeds de audio falsificados en canales OSINT.',
      isDeception: true,
      isInject: true
    };

    setIntelItems((prev) => [newInjectItem, ...prev]);
    setSelectedCardId(newInjectId);

    setAchMatrix((prev) => ({
      ...prev,
      [`${newInjectId}-h1`]: 'C',
      [`${newInjectId}-h2`]: 'C',
      [`${newInjectId}-h3`]: 'I'
    }));

    addChatMessage(
      'redteam',
      'RED TEAM ENEMIGO',
      '⚠️ ¡GUERRA COGNITIVA ACTIVA! Hemos inyectado ruido para saturar su canal de procesamiento. El tiempo se agota (-40s).'
    );
  };

  // Lateral Thinking / Abductive Assistant Step
  const solveAbductionStep = (step: number) => {
    if (step === 1 && abductionStepCompleted === 0) {
      setAbductionStepCompleted(1);
      setLateralTab(1);
      addChatMessage(
        'ai',
        'INFERENCIA COGNITIVA',
        'Paso 1 Completado: Anomalía registrada en la bitácora de CVIE. La ausencia de firmas térmicas en el radar SAR (E3) es físicamente incongruente con un despliegue de tanques reales.'
      );
    } else if (step === 2 && abductionStepCompleted === 1) {
      setAbductionStepCompleted(2);
      setLateralTab(2);
      addChatMessage(
        'ai',
        'INFERENCIA COGNITIVA',
        'Paso 2 Completado: Hipótesis de decepción táctica generada. Se modela la posibilidad de una finta (H2) para encubrir la infiltración asimétrica por el este (H3).'
      );
    } else if (step === 3 && abductionStepCompleted === 2) {
      setAbductionStepCompleted(3);
      setLateralTab(3);
      addChatMessage(
        'ai',
        'INFERENCIA COGNITIVA',
        'Paso 3 Completado: Navaja de Ockham aplicada. La hipótesis de finta asimétrica requiere la menor cantidad de suposiciones secundarias al conectar ciberataque y señuelos.'
      );
    } else if (step === 4 && abductionStepCompleted === 3) {
      setAbductionStepCompleted(4);
      setEarnedXp(30);
      setBiasMetrics((bm) => ({
        ...bm,
        decepcion: { pct: 10, level: 'Baja (10%)', alert: false }
      }));
      addChatMessage(
        'ai',
        'INFERENCIA COGNITIVA',
        '✓ PROCESO COMPLETO (+30 XP): Ha culminado la inferencia abductiva. Ha demostrado pensamiento lateral y resiliencia cognitiva, reduciendo la vulnerabilidad a la decepción táctica al mínimo.'
      );
    }
  };

  // Send Analyst Answer & Evaluate Socratic Feedback
  const handleSendAnalystAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = analystInput.trim();
    if (!text) return;

    addChatMessage('user', 'ANALISTA TÁCTICO', text);
    setAnalystInput('');

    setTimeout(() => {
      const lower = text.toLowerCase();
      const hasDeceptionKeywords = 
        lower.includes('engaño') || 
        lower.includes('decepción') || 
        lower.includes('finta') || 
        lower.includes('señuelo') || 
        lower.includes('abducción') || 
        lower.includes('cebo') || 
        lower.includes('ockham') || 
        lower.includes('refut') || 
        lower.includes('sar') || 
        lower.includes('inflable');

      if (hasDeceptionKeywords) {
        addChatMessage(
          'ai',
          'TUTOR COGNITIVO LISA',
          'Excelente agudeza analítica. Ha reconocido la maniobra de decepción (finta) rompiendo el anclaje inicial de H1. Procedo a escalar el escenario táctico.'
        );

        if (difficulty === 1) {
          setDifficulty(2);
          addChatMessage(
            'redteam',
            'RED TEAM ENEMIGO',
            'Fase II Nivel 2: El adversario detecta su redireccionamiento. Desplegando perturbación de sensores IMINT para enmascarar firmas térmicas.'
          );
        } else if (difficulty === 2) {
          setDifficulty(3);
          setRemainingSeconds((prev) => Math.min(prev, 60));
          addChatMessage(
            'redteam',
            'RED TEAM ENEMIGO',
            'Fase II Nivel 3: Ventana de decisión colapsada a 60 segundos. Se requiere dictamen inmediato empleando la probabilidad estimativa de Sherman Kent.'
          );
        }
      } else {
        addChatMessage(
          'ai',
          'TUTOR COGNITIVO LISA',
          'Cuidado analista. Su razonamiento muestra síntomas de Sesgo de Confirmación al asimilar únicamente el reporte de blindados visibles. Recuerde que el enemigo puede usar los Cinco Anillos de Warden y señuelos para engañar.'
        );
      }
    }, 600);
  };

  const getDifficultyBadge = () => {
    switch (difficulty) {
      case 1:
        return (
          <span className="px-3 py-1 bg-[#00e676]/10 border border-[#00e676] text-[#00e676] font-mono text-[11px] font-bold rounded-2xs tracking-wider uppercase">
            NIVEL 1: ESTÁNDAR
          </span>
        );
      case 2:
        return (
          <span className="px-3 py-1 bg-[#f59e0b]/10 border border-[#f59e0b] text-[#f59e0b] font-mono text-[11px] font-bold rounded-2xs tracking-wider uppercase animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.25)]">
            NIVEL 2: GUERRA ELECTRÓNICA
          </span>
        );
      case 3:
        return (
          <span className="px-3 py-1 bg-[#ff003c]/20 border border-[#ff003c] text-[#ff003c] font-mono text-[11px] font-bold rounded-2xs tracking-wider uppercase shadow-[0_0_15px_rgba(255,0,60,0.4)] animate-pulse">
            NIVEL 3: CRISIS CRÍTICA MULTIDOMINIO
          </span>
        );
    }
  };

  return (
    <div 
      id="fase-cognitiva-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-3 lg:p-5 bg-[#050811]/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      {/* Contenedor Principal Dashboard CVIE Fase II */}
      <div 
        id="fase-cognitiva-container"
        className="relative w-full max-w-[1600px] bg-[#0b1220] border border-[#1e2e4a] rounded-xs shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden my-auto flex flex-col max-h-[96vh]"
      >
        {/* Retícula militar táctica en esquinas */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ffff] z-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ffff] z-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ffff] z-30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ffff] z-30 pointer-events-none" />

        {/* 1. BARRA SUPERIOR DE MISIÓN */}
        <header className="relative z-20 bg-[#080d19] border-b-2 border-[#1e2e4a] px-4 sm:px-6 py-3.5 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#00ffff]/10 border border-[#00ffff] text-[#00ffff] font-mono text-[11px] px-2.5 py-1 rounded-2xs tracking-widest uppercase shadow-[0_0_6px_rgba(0,255,255,0.3)]">
              CVIE FASE II // WAR GAME COGNITIVO
            </span>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                Operación Cóndor-Asimétrica: Inferencia Bajo Niebla y Decepción
              </h1>
              <p className="text-xs text-[#64748b]">
                Calibración Heuer ACH // Detección de Decepción // Auditoría Adaptativa
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 w-full xl:w-auto justify-between xl:justify-end">
            {/* Critical Countdown Timer */}
            <div className="flex items-center gap-2 bg-[#ff003c]/10 border border-[#ff003c] px-3 py-1.5 rounded-2xs shadow-[0_0_10px_rgba(255,0,60,0.15)]">
              <span className="text-[10px] font-mono text-[#fca5a5] font-bold uppercase tracking-wider">
                VENTANA CRÍTICA DECISIÓN:
              </span>
              <span className={`font-mono text-lg font-bold tracking-widest ${
                isTimeExpired 
                  ? 'text-[#ff003c] animate-bounce' 
                  : remainingSeconds <= 45 
                  ? 'text-[#ff003c] animate-pulse' 
                  : 'text-[#ff003c]'
              }`}>
                {isTimeExpired ? '00:00 // AGOTADO' : formatTime(remainingSeconds)}
              </span>
            </div>

            {/* Threat Level */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#64748b] uppercase hidden sm:inline">NIVEL DE AMENAZA:</span>
              {getDifficultyBadge()}
            </div>

            {/* Inyectar Ruido Táctico */}
            <button
              type="button"
              onClick={handleInjectStress}
              className="px-3 py-1.5 bg-[#ff003c] hover:bg-[#dc2626] text-white font-mono text-xs font-bold rounded-2xs transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:shadow-red-500/30 shrink-0"
              title="Acelera el reloj en -40s e inyecta perturbaciones informativas"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>+ Simular Ataque Informacional (Ruido)</span>
            </button>

            {/* Botón de Comparativa Didáctica / Contraste */}
            <button
              type="button"
              onClick={() => setShowContrastModal(!showContrastModal)}
              className="px-3 py-1.5 bg-[#3b82f6]/20 hover:bg-[#3b82f6]/30 border border-[#3b82f6] text-[#60a5fa] font-mono text-xs font-bold rounded-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              title="Abre la comparativa interactiva entre sesgo intuitivo y método Heuer estructurado"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>⚖️ Contrastar Metodología</span>
            </button>

            {onEnterModule && (
              <button
                type="button"
                onClick={onEnterModule}
                className="px-3 py-1.5 bg-[#00e676]/20 hover:bg-[#00e676]/30 border border-[#00e676] text-[#a7f3d0] font-mono text-xs font-bold rounded-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                title="Avanzar a Fase III: Resiliencia Tecnológica"
              >
                <span>Avanzar a Fase III</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00e676]" />
              </button>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar simulación"
                className="p-1.5 text-[#64748b] hover:text-white hover:bg-[#111a2e] border border-[#1e2e4a] rounded-2xs transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {/* BANNER DE CONTRASTE METODOLÓGICO RÁPIDO (SI ESTÁ ACTIVO) */}
        {showContrastModal && (
          <div className="bg-[#0e1628] border-b border-[#3b82f6]/40 p-3 sm:p-4 text-xs font-mono transition-all animate-fadeIn">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#3b82f6]/20 text-[#60a5fa] border border-[#3b82f6] rounded-2xs font-bold text-[11px]">
                  LABORATORIO COMPARATIVO
                </span>
                <span className="text-white font-bold">
                  Contraste Didáctico: Pensamiento Intuitivo (Sistema 1) vs. Heuer ACH & Abducción (Sistema 2)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={applyBiasedPreset}
                  className="px-2.5 py-1 bg-[#ff003c]/20 hover:bg-[#ff003c]/30 text-[#fca5a5] border border-[#ff003c] rounded-2xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <AlertTriangle className="w-3 h-3 text-[#ff003c]" />
                  <span>Simular Error Cognitivo Típico</span>
                </button>
                <button
                  type="button"
                  onClick={applyOptimalPreset}
                  className="px-2.5 py-1 bg-[#00e676]/20 hover:bg-[#00e676]/30 text-[#a7f3d0] border border-[#00e676] rounded-2xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3 text-[#00e676]" />
                  <span>Aplicar Rigor Heuer Óptimo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowContrastModal(false)}
                  className="p-1 text-[#64748b] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] font-sans">
              <div className="p-2.5 bg-[#140b10] border border-[#ff003c]/30 rounded-2xs">
                <div className="font-mono font-bold text-[#fca5a5] mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff003c]" />
                  ENFOQUE INTUITIVO / RÁPIDO (TRAMPA DEL CEBO):
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">
                  El analista ve los videos virales (E1) y asume que el ataque será en el Oeste. Ignora que las siluetas no emiten calor en el satélite SAR (E3) o fuerza consistencia diciendo que "los motores están apagados". Resultado: vulnerabilidad del 80% y sorpresa estratégica en el Este.
                </p>
              </div>

              <div className="p-2.5 bg-[#081512] border border-[#00e676]/30 rounded-2xs">
                <div className="font-mono font-bold text-[#a7f3d0] mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00e676]" />
                  ENFOQUE ESTRUCTURADO HEUER ACH + ABDUCCIÓN (SISTEMA CVIE):
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">
                  La ausencia de firma térmica (E3) <strong>refuta activamente</strong> una ofensiva blindada real (H1). Mediante la Navaja de Ockham, la presencia de señuelos en el Oeste y ciberataques en el Este apuntan coherentemente a una finta (H2) que encubre la penetración asimétrica (H3).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. CUERPO DEL ENTORNO VIRTUAL EN 3 COLUMNAS */}
        <div className="relative z-10 flex-1 overflow-y-auto grid grid-cols-1 xl:grid-cols-12 min-h-[640px] bg-[#060912]">
          
          {/* ========================================================================= */}
          {/* COLUMNA 1: INGESTA MULTI-INT & VALORACIÓN (3.2/12 en Desktop)             */}
          {/* ========================================================================= */}
          <section className="xl:col-span-3 border-b xl:border-b-0 xl:border-r border-[#1e2e4a] flex flex-col bg-[#0b1220]">
            <div className="px-4 py-3 bg-[#090f1a] border-b border-[#1e2e4a] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00ffff] flex items-center gap-1.5 uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 text-[#00ffff]" />
                INGESTA MULTI-INT & VALORACIÓN
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-[#111a2e] text-[#64748b] border border-[#1e2e4a] rounded-2xs font-semibold">
                {intelItems.length} REPORTES
              </span>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto space-y-3 flex-1">
              <p className="text-[11px] text-[#64748b] leading-relaxed">
                Examine cada indicio. Si sospecha que una señal técnica o humana ha sido sembrada intencionalmente por el adversario, clasifíquela como <strong className="text-[#ff003c]">DECEPCIÓN / CEBO</strong>.
              </p>

              {intelItems.map((item) => {
                const isSelected = selectedCardId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCardId(item.id)}
                    className={`p-3 rounded-2xs border transition-all duration-200 cursor-pointer relative ${
                      item.isDeception
                        ? 'bg-[#ff003c]/10 border-[#ff003c] shadow-[0_0_12px_rgba(255,0,60,0.2)]'
                        : isSelected
                        ? 'bg-[#111a2e] border-[#00ffff] shadow-[0_0_12px_rgba(0,255,255,0.15)] translate-x-1'
                        : 'bg-[#111a2e] border-[#1e2e4a] hover:border-[#3b82f6] hover:translate-x-0.5'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                      <span className={`px-1.5 py-0.5 rounded-2xs font-bold uppercase border ${
                        item.type === 'SIGINT' 
                          ? 'bg-[#3b82f6]/15 border-[#3b82f6] text-[#60a5fa]'
                          : item.type === 'OSINT'
                          ? 'bg-[#a855f7]/15 border-[#a855f7] text-[#c084fc]'
                          : item.type === 'IMINT'
                          ? 'bg-[#10b981]/15 border-[#10b981] text-[#34d399]'
                          : 'bg-[#f59e0b]/15 border-[#f59e0b] text-[#fbbf24]'
                      }`}>
                        {item.typeLabel}
                      </span>
                      <span className={`font-bold font-mono text-[10px] ${item.doctrineColor}`}>
                        {item.doctrineCode}
                      </span>
                    </div>

                    <h4 className="font-sans text-xs font-bold text-white mb-1 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-[11px] text-[#cbd5e1] leading-relaxed mb-2 font-sans">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-[#1e2e4a]/70 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-[#64748b]">
                        ORIGEN: {item.source}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleToggleDeception(e, item.id)}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-2xs border transition-all cursor-pointer ${
                          item.isDeception
                            ? 'bg-[#ff003c]/20 border-[#ff003c] text-[#fca5a5] font-bold'
                            : 'bg-transparent border-[#1e2e4a] text-[#64748b] hover:border-[#ff003c] hover:text-[#ff003c]'
                        }`}
                      >
                        {item.isDeception ? '✓ Marcado como Decepción' : '⚠️ Clasificar como Decepción Táctica'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* COLUMNA 2: LIENZO DE ANÁLISIS ESTRUCTURADO (ACH) & ABDUCCIÓN (5.5/12)     */}
          {/* ========================================================================= */}
          <section className="xl:col-span-6 border-b xl:border-b-0 xl:border-r border-[#1e2e4a] flex flex-col bg-[#090e18]">
            <div className="px-4 py-3 bg-[#090f1a] border-b border-[#1e2e4a] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00ffff] flex items-center gap-1.5 uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5 text-[#00ffff]" />
                LIENZO DE ANÁLISIS ESTRUCTURADO (ACH HEUER)
              </span>
              <button
                type="button"
                onClick={handleResetAch}
                className="text-[10px] font-mono px-2 py-0.5 bg-[#111a2e] hover:bg-[#1e2e4a] border border-[#1e2e4a] text-[#64748b] hover:text-white rounded-2xs transition-colors cursor-pointer"
              >
                Limpiar Matriz
              </button>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto space-y-4 flex-1">
              {/* Matriz ACH Table */}
              <div className="overflow-x-auto border border-[#1e2e4a] rounded-2xs shadow-md">
                <table className="w-full border-collapse text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-[#0f1829] text-white border-b border-[#1e2e4a]">
                      <th className="p-2.5 w-[34%] text-[10px] uppercase font-bold text-[#00ffff]">
                        Indicio de Entrada
                      </th>
                      <th className="p-2.5 w-[22%] text-center text-[10px] text-white uppercase">
                        H1: Ofensiva Principal Oeste (MLCOA)
                      </th>
                      <th className="p-2.5 w-[22%] text-center text-[10px] text-white uppercase">
                        H2: Maniobra de Engaño / Finta Táctica
                      </th>
                      <th className="p-2.5 w-[22%] text-center text-[10px] text-white uppercase">
                        H3: Penetración Asimétrica (Este)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2e4a] bg-[#0b1220]">
                    {intelItems.map((item) => (
                      <tr key={item.id} className="hover:bg-[#111a2e] transition-colors">
                        <td className="p-2 text-[10px] text-[#cbd5e1] font-sans font-medium">
                          <strong className="text-[#00ffff] font-mono">{item.id.toUpperCase()}:</strong>{' '}
                          {item.title.split(':')[1] || item.title}
                        </td>

                        {/* H1 Select */}
                        <td className="p-1.5 text-center">
                          <select
                            value={achMatrix[`${item.id}-h1`] || 'N'}
                            onChange={(e) =>
                              handleAchCellChange(
                                item.id,
                                1,
                                e.target.value as 'C' | 'I' | 'N'
                              )
                            }
                            className={`w-full text-[11px] font-mono rounded-2xs px-1.5 py-1 outline-none cursor-pointer border transition-colors ${
                              achMatrix[`${item.id}-h1`] === 'I'
                                ? 'bg-[#ff003c]/20 border-[#ff003c] text-[#fca5a5] font-bold'
                                : achMatrix[`${item.id}-h1`] === 'C'
                                ? 'bg-[#00e676]/15 border-[#00e676] text-[#a7f3d0] font-semibold'
                                : 'bg-[#070c16] border-[#1e2e4a] text-white'
                            }`}
                          >
                            <option value="C">C</option>
                            <option value="I">I</option>
                            <option value="N">N</option>
                          </select>
                        </td>

                        {/* H2 Select */}
                        <td className="p-1.5 text-center">
                          <select
                            value={achMatrix[`${item.id}-h2`] || 'N'}
                            onChange={(e) =>
                              handleAchCellChange(
                                item.id,
                                2,
                                e.target.value as 'C' | 'I' | 'N'
                              )
                            }
                            className={`w-full text-[11px] font-mono rounded-2xs px-1.5 py-1 outline-none cursor-pointer border transition-colors ${
                              achMatrix[`${item.id}-h2`] === 'I'
                                ? 'bg-[#ff003c]/20 border-[#ff003c] text-[#fca5a5] font-bold'
                                : achMatrix[`${item.id}-h2`] === 'C'
                                ? 'bg-[#00e676]/15 border-[#00e676] text-[#a7f3d0] font-semibold'
                                : 'bg-[#070c16] border-[#1e2e4a] text-white'
                            }`}
                          >
                            <option value="C">C</option>
                            <option value="I">I</option>
                            <option value="N">N</option>
                          </select>
                        </td>

                        {/* H3 Select */}
                        <td className="p-1.5 text-center">
                          <select
                            value={achMatrix[`${item.id}-h3`] || 'N'}
                            onChange={(e) =>
                              handleAchCellChange(
                                item.id,
                                3,
                                e.target.value as 'C' | 'I' | 'N'
                              )
                            }
                            className={`w-full text-[11px] font-mono rounded-2xs px-1.5 py-1 outline-none cursor-pointer border transition-colors ${
                              achMatrix[`${item.id}-h3`] === 'I'
                                ? 'bg-[#ff003c]/20 border-[#ff003c] text-[#fca5a5] font-bold'
                                : achMatrix[`${item.id}-h3`] === 'C'
                                ? 'bg-[#00e676]/15 border-[#00e676] text-[#a7f3d0] font-semibold'
                                : 'bg-[#070c16] border-[#1e2e4a] text-white'
                            }`}
                          >
                            <option value="C">C</option>
                            <option value="I">I</option>
                            <option value="N">N</option>
                          </select>
                        </td>
                      </tr>
                    ))}

                    {/* Summary Row */}
                    <tr className="bg-[#0d1526] font-bold border-t-2 border-[#1e2e4a]">
                      <td className="p-2 text-right text-[10px] text-[#00ffff] font-mono">
                        TOTAL INCONSISTENCIAS (I):
                      </td>
                      <td className="p-2 text-center text-xs text-[#00e676] font-mono font-bold">
                        {inconsistencies[0]}
                      </td>
                      <td className="p-2 text-center text-xs text-[#f59e0b] font-mono font-bold">
                        {inconsistencies[1]}
                      </td>
                      <td className="p-2 text-center text-xs text-[#ff003c] font-mono font-bold">
                        {inconsistencies[2]}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Real-time Heuer Verdict Card */}
              <div className="bg-[#111a2e] border border-[#1e2e4a] rounded-2xs p-3 space-y-1">
                <div className="text-[11px] font-mono text-[#00ffff] font-bold uppercase flex items-center justify-between">
                  <span>VEREDICTO HEUER EN TIEMPO REAL:</span>
                  <span className="text-[10px] text-[#64748b]">METODOLOGÍA POOPER / SHERMAN KENT</span>
                </div>
                <p className="text-xs text-[#cbd5e1] leading-relaxed">
                  Hipótesis menos refutada:{' '}
                  <strong className="text-[#00ffff] underline">{heuerVerdict.bestHypName}</strong>{' '}
                  con solo <strong>{heuerVerdict.minI}</strong> refutaciones.
                </p>
                <p className="text-xs text-[#cbd5e1]">
                  Estimación de Sherman Kent:{' '}
                  <strong className="text-[#00e676]">{heuerVerdict.probabilityKent}</strong>.
                </p>
                <p className="text-[10px] text-[#64748b] pt-1 border-t border-[#1e2e4a]/60">
                  Asigne consistencias. Recuerde: en el método Heuer, la hipótesis con menos refutaciones (I) es metodológicamente la candidata más sólida.
                </p>
              </div>

              {/* SECCIÓN: PENSAMIENTO LATERAL (ASISTENTE DE ABDUCCIÓN) */}
              <div className="pt-2 border-t border-[#1e2e4a]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-[#00ffff]" />
                    LABORATORIO DE PENSAMIENTO LATERAL (ASISTENTE ABDUCTIVO)
                  </h3>
                  {earnedXp > 0 && (
                    <span className="px-2 py-0.5 bg-[#00e676]/20 border border-[#00e676] text-[#00e676] font-mono text-[10px] font-bold rounded-2xs">
                      +{earnedXp} XP ACREDITADOS
                    </span>
                  )}
                </div>

                {/* Lateral Tabs */}
                <div className="flex border-b border-[#1e2e4a] gap-1">
                  {[
                    { title: 'Paso 1: Anomalía', color: 'text-[#f59e0b]' },
                    { title: 'Paso 2: Hipótesis', color: 'text-[#a855f7]' },
                    { title: 'Paso 3: Parsimonia', color: 'text-[#00ffff]' },
                    { title: 'Paso 4: Verificación', color: 'text-[#00e676]' }
                  ].map((tab, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setLateralTab(idx)}
                      className={`flex-1 py-1.5 px-2 text-[11px] font-mono border-t border-x border-[#1e2e4a] rounded-t-2xs transition-colors cursor-pointer ${
                        lateralTab === idx
                          ? 'bg-[#111a2e] text-[#00ffff] border-b-transparent font-bold'
                          : 'bg-[#090f1b] text-[#64748b] hover:text-[#cbd5e1]'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>

                {/* Lateral Tab Panes */}
                <div className="bg-[#111a2e] border border-t-0 border-[#1e2e4a] p-3.5 rounded-b-2xs min-h-[140px] flex flex-col justify-between">
                  {lateralTab === 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-mono text-[#f59e0b] font-bold">
                        [OBSERVACIÓN DE LA ANOMALÍA]
                      </p>
                      <p className="text-xs text-[#cbd5e1] leading-relaxed">
                        ¿Por qué el enemigo expondría masivamente convoyes de blindados (E1) a plena luz del día en redes, mientras detectamos que carecen de firmas térmicas (E3) mediante radar satelital?
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => solveAbductionStep(1)}
                          className="px-3 py-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-mono font-bold rounded-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Registrar Anomalía de Señuelo</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {lateralTab === 1 && (
                    <div className="space-y-2">
                      <p className="text-xs font-mono text-[#a855f7] font-bold">
                        [GENERACIÓN DE HIPÓTESIS CREATIVAS]
                      </p>
                      <p className="text-xs text-[#cbd5e1] leading-relaxed">
                        La anomalía sugiere que E1 es un cebo. Generamos H2 (Finta en Oeste) y H3 (Penetración real silenciosa por el Este mediante redes de tráfico de armas y soporte cibernético).
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => solveAbductionStep(2)}
                          className="px-3 py-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-mono font-bold rounded-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Mapear Intención Asimétrica</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {lateralTab === 2 && (
                    <div className="space-y-2">
                      <p className="text-xs font-mono text-[#00ffff] font-bold">
                        [SELECCIÓN POR PARSIMONIA (NAVAJA DE OCKHAM)]
                      </p>
                      <p className="text-xs text-[#cbd5e1] leading-relaxed">
                        La explicación más simple que conecta todos los puntos (ciberataque en el este, señuelos inflables en el oeste) es que el enemigo ejecuta una finta en el Oeste para fijar nuestros recursos y penetrar por el Este.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => solveAbductionStep(3)}
                          className="px-3 py-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-mono font-bold rounded-2xs transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span>Aplicar Criterio Ockham</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {lateralTab === 3 && (
                    <div className="space-y-2">
                      <p className="text-xs font-mono text-[#00e676] font-bold">
                        [VERIFICACIÓN & TRIANGULACIÓN]
                      </p>
                      <p className="text-xs text-[#cbd5e1] leading-relaxed">
                        Validado: Llamamos a los sensores de frontera para coordinar cross-cueing y verificar el sector oriental de forma táctica.
                      </p>
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => solveAbductionStep(4)}
                          className="px-3 py-1.5 bg-[#00e676] hover:bg-[#00c853] text-[#050811] text-xs font-mono font-bold rounded-2xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-md hover:shadow-green-500/20"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Completar Inferencia Abductiva (+30 XP)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* COLUMNA 3: RADAR COGNITIVO & CHAT RED TEAM (3.5/12 en Desktop)            */}
          {/* ========================================================================= */}
          <section className="xl:col-span-3 flex flex-col bg-[#0b1220]">
            <div className="px-4 py-3 bg-[#090f1a] border-b border-[#1e2e4a] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00ffff] flex items-center gap-1.5 uppercase tracking-wider">
                <Brain className="w-3.5 h-3.5 text-[#00ffff]" />
                RADAR COGNITIVO & CHAT RED TEAM
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-[#00e676]/15 text-[#00e676] border border-[#00e676] rounded-2xs font-bold">
                MONITOR ACTIVO
              </span>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto space-y-3 flex-1 flex flex-col justify-between">
              
              {/* Radar de Sesgos en Tiempo Real */}
              <div className="bg-[#111a2e] border border-[#1e2e4a] rounded-2xs p-3 space-y-2.5">
                <div className="text-[11px] font-bold text-white font-mono flex items-center justify-between">
                  <span>DETECTOR DE SESGOS (PIR / SATE):</span>
                  <span className="text-[9px] text-[#64748b]">AUTO-AUDITORÍA</span>
                </div>

                {/* 1. Sesgo de Confirmación */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#64748b]">Sesgo de Confirmación:</span>
                    <span className={`font-bold ${biasMetrics.confirmacion.alert ? 'text-[#ff003c]' : 'text-[#00ffff]'}`}>
                      {biasMetrics.confirmacion.level}
                    </span>
                  </div>
                  <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-400 ${
                        biasMetrics.confirmacion.alert ? 'bg-[#ff003c]' : 'bg-[#00ffff]'
                      }`}
                      style={{ width: `${biasMetrics.confirmacion.pct}%` }}
                    />
                  </div>
                </div>

                {/* 2. Sesgo de Anclaje */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#64748b]">Sesgo de Anclaje (H1):</span>
                    <span className={`font-bold ${biasMetrics.anclaje.alert ? 'text-[#f59e0b]' : 'text-[#00ffff]'}`}>
                      {biasMetrics.anclaje.level}
                    </span>
                  </div>
                  <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-400 ${
                        biasMetrics.anclaje.alert ? 'bg-[#f59e0b]' : 'bg-[#00ffff]'
                      }`}
                      style={{ width: `${biasMetrics.anclaje.pct}%` }}
                    />
                  </div>
                </div>

                {/* 3. Vulnerabilidad a Decepción */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#64748b]">Vulnerabilidad a Decepción:</span>
                    <span className={`font-bold ${biasMetrics.decepcion.alert ? 'text-[#ff003c]' : 'text-[#00e676]'}`}>
                      {biasMetrics.decepcion.level}
                    </span>
                  </div>
                  <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-400 ${
                        biasMetrics.decepcion.alert ? 'bg-[#ff003c]' : 'bg-[#00e676]'
                      }`}
                      style={{ width: `${biasMetrics.decepcion.pct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Chatbot Interface Adaptativa */}
              <div className="flex-1 flex flex-col min-h-[300px] max-h-[380px] bg-[#070c15] border border-[#1e2e4a] rounded-2xs overflow-hidden">
                <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs font-sans">
                  {chatMessages.map((msg) => {
                    const isAi = msg.sender === 'ai';
                    const isRedTeam = msg.sender === 'redteam';
                    const isUser = msg.sender === 'user';

                    return (
                      <div
                        key={msg.id}
                        className={`p-2.5 rounded-2xs leading-relaxed max-w-[90%] ${
                          isAi
                            ? 'bg-[#13223d] border-l-2 border-[#00ffff] text-[#cbd5e1]'
                            : isRedTeam
                            ? 'bg-[#ff003c]/10 border-l-2 border-[#ff003c] text-[#fca5a5]'
                            : isUser
                            ? 'bg-[#1e3a5f] text-white ml-auto border border-[#3b82f6]'
                            : 'bg-[#111a2e] text-[#64748b] text-[11px] font-mono'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1 opacity-80">
                          <span className="font-bold uppercase tracking-wider">{msg.author}</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p>{msg.text}</p>
                      </div>
                    );
                  })}
                  <div ref={chatBottomRef} />
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendAnalystAnswer} className="p-2 bg-[#0d1424] border-t border-[#1e2e4a] flex gap-2">
                  <input
                    type="text"
                    value={analystInput}
                    onChange={(e) => setAnalystInput(e.target.value)}
                    placeholder="Justifique o defina sospecha de decepción..."
                    className="flex-1 bg-[#050810] border border-[#1e2e4a] focus:border-[#00ffff] rounded-2xs px-2.5 py-1.5 text-xs text-white outline-none font-sans"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-mono text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar</span>
                  </button>
                </form>
              </div>

            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
