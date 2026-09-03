import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Clock, 
  AlertTriangle, 
  Radio, 
  Send, 
  RotateCcw, 
  X, 
  Zap, 
  Scale, 
  Bot, 
  User, 
  Sparkles, 
  Lock, 
  Unlock, 
  Cpu, 
  Wifi, 
  Layers, 
  Check, 
  EyeOff, 
  ArrowRight,
  Activity,
  Compass,
  Crosshair,
  Satellite,
  Globe,
  Users,
  Maximize2,
  Radar,
  Flame,
  Plane
} from 'lucide-react';

interface FaseOperativaDetalleProps {
  onClose?: () => void;
  onEnterModule?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'redteam' | 'user' | 'system';
  author: string;
  text: string;
  timestamp: string;
}

export function FaseOperativaDetalle({ onClose }: FaseOperativaDetalleProps) {
  // Threat Escalation: 1 (Bajo/Inicial), 2 (Guerra Electrónica), 3 (Colapso Multidominio)
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);

  // Operational Stress Timer (in seconds, 04:00)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(240);
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [isTimeExpired, setIsTimeExpired] = useState<boolean>(false);

  // Contrast Mode / Laboratorio Didáctico
  const [showContrastModal, setShowContrastModal] = useState<boolean>(false);

  // Active Sensor Layers
  const [activeSensors, setActiveSensors] = useState({
    sigint: false,
    imint: false,
    osint: false,
    humint: false
  });

  // OPSEC Alert State
  const [showOpsecAlert, setShowOpsecAlert] = useState<boolean>(false);
  const [opsecSanitized, setOpsecSanitized] = useState<boolean>(false);

  // Selected Marker Intel Readout
  const [mapTelemetry, setMapTelemetry] = useState<string>(
    'SISTEMA LISTO // SELECCIONE SENSORES PARA GENERAR TELEMETRÍA'
  );
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  // Synchronized Matrix Selection
  const [syncMatrix, setSyncMatrix] = useState({
    rOeste: 'none',
    aOeste: 'none',
    rEste: 'none',
    aEste: 'none'
  });
  const [isSyncSuccess, setIsSyncSuccess] = useState<boolean>(false);

  // Cognitive & Risk Metrics
  const [metrics, setMetrics] = useState({
    confirmacion: 40,
    decepcion: 80,
    resiliencia: 10
  });

  // XP Tracker
  const [earnedXp, setEarnedXp] = useState<number>(0);

  // Chat Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      author: 'EVALUADOR LISA',
      text: 'Bienvenido analista a la Fase IV: Inmersión Operativa. En la pantalla táctica tenemos reportes divergentes: el canal OSINT (E1) muestra convoyes en el oeste, pero su firma térmica es nula en el radar satelital SAR (E3). Al mismo tiempo, se registra un ciberataque industrial en la red eléctrica del este (E2). ¿Cuál es su inferencia abductiva en base a los anillos de Warden?',
      timestamp: '00:00:01'
    }
  ]);

  const [analystInput, setAnalystInput] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Format time mm:ss
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
            'MISIÓN FALLIDA // TIEMPO AGOTADO: La parálisis cognitiva permitió que el oponente destruyera las subestaciones SCADA del este y consumara su finta en el oeste.'
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, remainingSeconds]);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

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

  // Toggle Sensor Layer
  const handleToggleSensor = (sensorId: 'sigint' | 'imint' | 'osint' | 'humint') => {
    const nextState = !activeSensors[sensorId];
    const updated = { ...activeSensors, [sensorId]: nextState };
    setActiveSensors(updated);

    // If both OSINT and IMINT are active, discrepancy is revealed!
    if (updated.osint && updated.imint) {
      setMetrics((prev) => ({
        ...prev,
        decepcion: Math.min(prev.decepcion, 30),
        confirmacion: Math.min(prev.confirmacion, 25)
      }));
      setMapTelemetry(
        'DISCREPANCIA DETECTADA: Señuelos de tanques inflables sin firma térmica en el oeste. ¡Finta táctica hostil al descubierto!'
      );
      setEarnedXp((xp) => xp + 20);
    } else if (nextState) {
      if (sensorId === 'osint') {
        setMapTelemetry('OSINT ACTIVO: Canal de fuentes abiertas reporta movimiento blindado en el Sector Oeste.');
      } else if (sensorId === 'imint') {
        setMapTelemetry('IMINT/SAR ACTIVO: Satélite de Apertura Sintética escaneando superficie con bandas radar.');
      } else if (sensorId === 'sigint') {
        setMapTelemetry('SIGINT ACTIVO: Interceptaciones electromagnéticas de radio y telecomunicaciones hostiles.');
      } else if (sensorId === 'humint') {
        setMapTelemetry('HUMINT ACTIVO: Informantes locales en terreno reportando convoyes clandestinos nocturnos.');
      }
    }
  };

  // Marker Intel Click
  const handleMarkerClick = (type: 'osint' | 'imint' | 'sigint') => {
    setSelectedMarkerId(type);
    if (type === 'osint') {
      setMapTelemetry(
        'OSINT Telemetría: Videos masivos de blindados (Oeste) con alta dispersión pero dudosa veracidad de origen.'
      );
    } else if (type === 'imint') {
      setMapTelemetry(
        'IMINT Satélite SAR: Siluetas de tanques confirmadas estáticas, firma térmica de 0.05% (SEÑUELOS INFLABLES DETECTADOS).'
      );
    } else if (type === 'sigint') {
      setMapTelemetry(
        'SIGINT Guerra Electrónica: Intento de denegación ciber-industrial en SCADA de energía (Sector Este).'
      );
    }
  };

  // OPSEC Sanitization
  const handleSanitizeOpsecGeo = () => {
    if (opsecSanitized) return;
    setOpsecSanitized(true);
    setShowOpsecAlert(false);

    setMetrics((prev) => ({
      ...prev,
      resiliencia: Math.min(100, prev.resiliencia + 40)
    }));
    setEarnedXp((xp) => xp + 25);

    addChatMessage(
      'ai',
      'CVIE SISTEMA',
      '✓ Sanitización OPSEC completada con éxito (+25 XP). Metadatos GPS eliminados. El oponente ha perdido el vector de fuego de precisión.'
    );
  };

  // Sincronización Operativa Matrix Evaluation
  const handleMatrixChange = (field: 'rOeste' | 'aOeste' | 'rEste' | 'aEste', value: string) => {
    const updated = { ...syncMatrix, [field]: value };
    setSyncMatrix(updated);

    // Correct tactical assignment:
    // Oeste: Anillo 3 (Infraestructura de líneas de finta) + Vuelo UAV de reconocimiento
    // Este: Anillo 2 (Elementos esenciales / SCADA) + Air-Gap Ciberdefensa
    if (
      updated.rOeste === 'anillo3' &&
      updated.aOeste === 'vuelo' &&
      updated.rEste === 'anillo2' &&
      updated.aEste === 'airgap'
    ) {
      setIsSyncSuccess(true);
      setMetrics({
        confirmacion: 10,
        decepcion: 15,
        resiliencia: 95
      });
      setEarnedXp((xp) => xp + 45);

      addChatMessage(
        'ai',
        'EVALUADOR LISA',
        '✓ Sincronización Estratégica PERFECTA (+45 XP). Ha asignado el Air-Gap de ciberdefensa en el Anillo 2 (Este) y reconocimiento UAV en el Anillo 3 (Oeste), mitigando la finta del adversario de manera óptima.'
      );
    } else {
      setIsSyncSuccess(false);
    }
  };

  // Inyección de Incidente Híbrido (Ruido Sintético)
  const handleInjectHybridIncident = () => {
    setRemainingSeconds((prev) => Math.max(10, prev - 40));
    setShowOpsecAlert(true);
    setMetrics((prev) => ({
      ...prev,
      decepcion: Math.min(100, prev.decepcion + 20),
      confirmacion: Math.min(100, prev.confirmacion + 15),
      resiliencia: Math.max(5, prev.resiliencia - 15)
    }));

    addChatMessage(
      'redteam',
      'RED TEAM ENEMIGO',
      '⚠️ ¡ATAQUE DE DESINFORMACIÓN MULTIDOMINIO! Se acelera la ventana de decisión (-40s). Se ha inyectado ruido informático y fotos con metadatos GPS en el canal de crisis.'
    );
  };

  // Comparativa didáctica: Simular Error de Sesgo Típico
  const applyFlawedConfirmationBiasPreset = () => {
    setActiveSensors({
      sigint: false,
      imint: false,
      osint: true,
      humint: false
    });
    setSyncMatrix({
      rOeste: 'anillo1',
      aOeste: 'fuegos',
      rEste: 'none',
      aEste: 'none'
    });
    setMetrics({
      confirmacion: 85,
      decepcion: 90,
      resiliencia: 15
    });
    setShowOpsecAlert(true);
    setOpsecSanitized(false);
    setMapTelemetry('ALERTA: Concentración masiva de artillería en el Oeste sobre señuelos plásticos sin firma térmica.');

    addChatMessage(
      'redteam',
      'SIMULADOR DE SESGO TÍPICO',
      'MODO DIDÁCTICO ILUSTRATIVO: Se muestra el error arquetípico en el que el analista se guía únicamente por redes sociales (OSINT), concentra su fuego en el Oeste creyendo atacar blindados reales, y descuida el ciberataque al SCADA del Este (Anillo 2).'
    );
  };

  // Comparativa didáctica: Aplicar Fusión Multi-Sensor Óptima
  const applyOptimalFusionPreset = () => {
    setActiveSensors({
      sigint: true,
      imint: true,
      osint: true,
      humint: true
    });
    setSyncMatrix({
      rOeste: 'anillo3',
      aOeste: 'vuelo',
      rEste: 'anillo2',
      aEste: 'airgap'
    });
    setIsSyncSuccess(true);
    setMetrics({
      confirmacion: 10,
      decepcion: 15,
      resiliencia: 95
    });
    setShowOpsecAlert(false);
    setOpsecSanitized(true);
    setEarnedXp(90);
    setMapTelemetry('FUSIÓN ISR TOTAL: 4 de 4 sensores integrados. Señuelos del Oeste neutralizados y red SCADA del Este blindada.');

    addChatMessage(
      'ai',
      'EVALUADOR LISA',
      'FUSIÓN MULTIDOMINIO ÓPTIMA APLICADA (+90 XP): Las 4 capas de sensores ISR revelan la finta. Se asignan los recursos de acuerdo a los Cinco Anillos de Warden, garantizando la superioridad en la toma de decisiones.'
    );
  };

  // Socratic Chat Decision
  const handleSendAnalystDecision = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = analystInput.trim();
    if (!text) return;

    addChatMessage('user', 'ANALISTA TÁCTICO', text);
    setAnalystInput('');

    setTimeout(() => {
      evaluateDialoguePedagogy(text.toLowerCase());
    }, 600);
  };

  const evaluateDialoguePedagogy = (text: string) => {
    const hasKeyConcepts =
      text.includes('finta') ||
      text.includes('señuelo') ||
      text.includes('este') ||
      text.includes('scada') ||
      text.includes('warden') ||
      text.includes('airgap') ||
      text.includes('air-gap') ||
      text.includes('exif') ||
      text.includes('sanitiz') ||
      text.includes('recon') ||
      text.includes('uav') ||
      text.includes('sar') ||
      text.includes('imint') ||
      text.includes('ockham');

    if (hasKeyConcepts) {
      addChatMessage(
        'ai',
        'EVALUADOR LISA',
        'Excelente nivel de discernimiento estratégico. Ha roto la fijación mental (Sesgo de Confirmación) sobre el oeste al correlacionar las lecturas frías del radar SAR y aislar la red SCADA del este. Incrementando complejidad operativa.'
      );

      setEarnedXp((xp) => xp + 25);

      if (difficulty === 1) {
        setDifficulty(2);
        addChatMessage(
          'redteam',
          'RED TEAM ENEMIGO',
          'FASE IV NIVEL 2: Desplegando interceptaciones electrónicas tácticas sobre la subestación de suministro energético en el Este.'
        );
      } else if (difficulty === 2) {
        setDifficulty(3);
        setRemainingSeconds((prev) => Math.min(prev, 60));
        addChatMessage(
          'redteam',
          'RED TEAM ENEMIGO',
          'FASE IV NIVEL 3 (COLAPSO): Ventana OODA colapsada a 60 segundos. Se requiere confirmación inmediata de la directiva de la ECEME para contrarrestar la ofensiva asimétrica.'
        );
      }
    } else {
      addChatMessage(
        'ai',
        'EVALUADOR LISA',
        'ADVERTENCIA: Su razonamiento es vulnerable. Concentrar fuerzas de fuego en el oeste es caer en el cebo de desinformación sembrado por el oponente en el canal OSINT sin verificar las firmas térmicas del radar SAR.'
      );
    }
  };

  const getThreatBadge = () => {
    switch (difficulty) {
      case 1:
        return (
          <span className="px-3 py-1 bg-[#10b981]/10 border border-[#10b981] text-[#10b981] font-mono text-[11px] font-bold rounded-2xs tracking-wider uppercase">
            NIVEL 1: BAJO
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
          <span className="px-3 py-1 bg-[#ff0055]/20 border border-[#ff0055] text-[#ff0055] font-mono text-[11px] font-bold rounded-2xs tracking-wider uppercase shadow-[0_0_15px_rgba(255,0,85,0.4)] animate-pulse">
            NIVEL 3: COLAPSO MULTIDOMINIO
          </span>
        );
    }
  };

  const activeSensorCount = Object.values(activeSensors).filter(Boolean).length;

  return (
    <div 
      id="fase-operativa-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-3 lg:p-5 bg-[#030712]/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      {/* Contenedor Principal Dashboard CVIE Fase IV */}
      <div 
        id="fase-operativa-container"
        className="relative w-full max-w-[1620px] bg-[#090f1f] border border-[#1e293b] rounded-xs shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden my-auto flex flex-col max-h-[96vh]"
      >
        {/* Retícula militar táctica en esquinas */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ffff] z-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ffff] z-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ffff] z-30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ffff] z-30 pointer-events-none" />

        {/* 1. OPERATIONAL TOP BAR */}
        <header className="relative z-20 bg-[#060b16] border-b-2 border-[#1e293b] px-4 sm:px-6 py-3.5 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#00ffff]/10 border border-[#00ffff] text-[#00ffff] font-mono text-[11px] px-2.5 py-1 rounded-2xs tracking-widest uppercase shadow-[0_0_6px_rgba(0,255,255,0.3)]">
              CVIE FASE IV // INMERSIÓN TOTAL
            </span>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                Operación Cóndor: Fusión ISR y Respuesta de Guerra Híbrida
              </h1>
              <p className="text-xs text-[#64748b]">
                Sincronización Multidominio // Teoría de Warden // Toma de Decisión Bajo Estrés Extremo [ECEME]
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 w-full xl:w-auto justify-between xl:justify-end">
            {/* Stress Clock */}
            <div className="flex items-center gap-2 bg-[#ff0055]/10 border border-[#ff0055] px-3 py-1.5 rounded-2xs shadow-[0_0_10px_rgba(255,0,85,0.15)]">
              <span className="text-[10px] font-mono text-[#fca5a5] font-bold uppercase tracking-wider">
                VENTANA CRÍTICA OODA:
              </span>
              <span className={`font-mono text-lg font-bold tracking-widest ${
                isTimeExpired 
                  ? 'text-[#ff0055] animate-bounce' 
                  : remainingSeconds <= 45 
                  ? 'text-[#ff0055] animate-pulse' 
                  : 'text-[#ff0055]'
              }`}>
                {isTimeExpired ? '00:00 // AGOTADO' : formatTime(remainingSeconds)}
              </span>
            </div>

            {/* Threat Level */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-[#64748b] uppercase hidden sm:inline">AMENAZA:</span>
              {getThreatBadge()}
            </div>

            {/* Inyector de Incidente Híbrido */}
            <button
              type="button"
              onClick={handleInjectHybridIncident}
              className="px-3 py-1.5 bg-[#ff0055] hover:bg-[#dc2626] text-white font-mono text-xs font-bold rounded-2xs transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:shadow-red-500/30 shrink-0"
              title="Acelera el reloj en -40s e inyecta ruido informático y desinformación en redes"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>+ Inyectar Incidente Híbrido (Ruido Sintético)</span>
            </button>

            {/* Botón de Contraste Metodológico */}
            <button
              type="button"
              onClick={() => setShowContrastModal(!showContrastModal)}
              className="px-3 py-1.5 bg-[#3b82f6]/20 hover:bg-[#3b82f6]/30 border border-[#3b82f6] text-[#60a5fa] font-mono text-xs font-bold rounded-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              title="Abre el laboratorio comparativo entre el análisis aislado tradicional y la fusión ISR concéntrica"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>⚖️ Contrastar Metodología</span>
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar simulación"
                className="p-1.5 text-[#64748b] hover:text-white hover:bg-[#0f172a] border border-[#1e293b] rounded-2xs transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {/* BANNER DE CONTRASTE METODOLÓGICO DIDÁCTICO */}
        {showContrastModal && (
          <div className="bg-[#0b1329] border-b border-[#3b82f6]/40 p-3 sm:p-4 text-xs font-mono transition-all animate-fadeIn">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#3b82f6]/20 text-[#60a5fa] border border-[#3b82f6] rounded-2xs font-bold text-[11px]">
                  LABORATORIO COMPARATIVO DE FUSIÓN ISR
                </span>
                <span className="text-white font-bold">
                  Contraste Didáctico: Análisis Compartimentado (Falla Típica) vs. Fusión Multi-Sensor ISR + Sincronización Warden (CVIE)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={applyFlawedConfirmationBiasPreset}
                  className="px-2.5 py-1 bg-[#ff0055]/20 hover:bg-[#ff0055]/30 text-[#fca5a5] border border-[#ff0055] rounded-2xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <AlertTriangle className="w-3 h-3 text-[#ff0055]" />
                  <span>Simular Sesgo de Confirmación / Falla Típica</span>
                </button>
                <button
                  type="button"
                  onClick={applyOptimalFusionPreset}
                  className="px-2.5 py-1 bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#a7f3d0] border border-[#10b981] rounded-2xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3 text-[#10b981]" />
                  <span>Aplicar Fusión ISR y Sincronización Óptima</span>
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
              <div className="p-2.5 bg-[#170a14] border border-[#ff0055]/30 rounded-2xs">
                <div className="font-mono font-bold text-[#fca5a5] mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff0055]" />
                  ANÁLISIS COMPARTIMENTADO (SESGO Y ENGAÑO TÁCTICO):
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">
                  El analista examina de forma aislada las redes sociales (OSINT), asume como real el convoy de blindados en el Sector Oeste y ordena fuego de artillería masivo. No activa el radar satelital SAR ni contrasta la falta de calor en los señuelos. Mientras tanto, la red SCADA del Este sufre una intrusión cibernética inadvertida. <strong>Resultado:</strong> Desperdicio de munición sobre maquetas plásticas y colapso de la infraestructura crítica nacional.
                </p>
              </div>

              <div className="p-2.5 bg-[#071915] border border-[#10b981]/30 rounded-2xs">
                <div className="font-mono font-bold text-[#a7f3d0] mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  FUSIÓN MULTI-SENSOR ISR + TEORÍA DE WARDEN (CVIE):
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">
                  Superposición inmediata de capas: El radar satelital SAR revela que los vehículos del Oeste carecen de motor térmico (señuelos inflables). La señal SIGINT alerta de un ciberataque simultáneo en el Este. El mando responde con reconocimiento UAV de bajo costo en el Oeste y aísla físicamente (Air-Gap) los elementos esenciales SCADA (Anillo 2) en el Este. <strong>Resultado:</strong> Decepción adversaria neutralizada y resiliencia estratégica garantizada.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. GRID WORKSPACE (3 COLUMNAS TÁCTICAS) */}
        <div className="relative z-10 flex-1 overflow-y-auto grid grid-cols-1 xl:grid-cols-12 min-h-[640px] bg-[#040711]">
          
          {/* ========================================================================= */}
          {/* COLUMNA 1: CONSOLA DE CAPAS DE SENSORES ISR (3.2/12)                       */}
          {/* ========================================================================= */}
          <section className="xl:col-span-3 border-b xl:border-b-0 xl:border-r border-[#1e293b] flex flex-col bg-[#090f1f]">
            <div className="px-4 py-3 bg-[#070d1a] border-b border-[#1e293b] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00ffff] flex items-center gap-1.5 uppercase tracking-wider">
                <Radar className="w-3.5 h-3.5 text-[#00ffff]" />
                CAPAS DE SENSORES ISR
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-[#0f172a] text-[#64748b] border border-[#1e293b] rounded-2xs font-semibold">
                {activeSensorCount} DE 4 ACTIVOS
              </span>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto space-y-3.5 flex-1">
              <p className="text-[11px] text-[#64748b] leading-relaxed">
                Habilite las capas de colección. La superposición de datos revela discrepancias térmicas o de radio que exponen la decepción táctica hostil.
              </p>

              {/* Sensor Toggles */}
              <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xs p-3 space-y-2">
                {/* SIGINT */}
                <button
                  type="button"
                  onClick={() => handleToggleSensor('sigint')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xs border font-mono text-xs transition-all cursor-pointer ${
                    activeSensors.sigint
                      ? 'bg-[#00ffff]/10 border-[#00ffff] text-white shadow-[0_0_10px_rgba(0,255,255,0.15)]'
                      : 'bg-[#070c16] border-[#1e293b] text-[#94a3b8] hover:border-[#3b82f6]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Radio className={`w-3.5 h-3.5 ${activeSensors.sigint ? 'text-[#00ffff]' : 'text-[#64748b]'}`} />
                    <span>📻 SIGINT (Emisiones VHF/HF)</span>
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeSensors.sigint ? 'bg-[#00ffff] shadow-[0_0_8px_#00ffff]' : 'bg-[#64748b]'
                  }`} />
                </button>

                {/* IMINT/SAR */}
                <button
                  type="button"
                  onClick={() => handleToggleSensor('imint')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xs border font-mono text-xs transition-all cursor-pointer ${
                    activeSensors.imint
                      ? 'bg-[#00ffff]/10 border-[#00ffff] text-white shadow-[0_0_10px_rgba(0,255,255,0.15)]'
                      : 'bg-[#070c16] border-[#1e293b] text-[#94a3b8] hover:border-[#3b82f6]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Satellite className={`w-3.5 h-3.5 ${activeSensors.imint ? 'text-[#00ffff]' : 'text-[#64748b]'}`} />
                    <span>📡 IMINT/SAR (Radar Satelital)</span>
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeSensors.imint ? 'bg-[#00ffff] shadow-[0_0_8px_#00ffff]' : 'bg-[#64748b]'
                  }`} />
                </button>

                {/* OSINT */}
                <button
                  type="button"
                  onClick={() => handleToggleSensor('osint')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xs border font-mono text-xs transition-all cursor-pointer ${
                    activeSensors.osint
                      ? 'bg-[#00ffff]/10 border-[#00ffff] text-white shadow-[0_0_10px_rgba(0,255,255,0.15)]'
                      : 'bg-[#070c16] border-[#1e293b] text-[#94a3b8] hover:border-[#3b82f6]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Globe className={`w-3.5 h-3.5 ${activeSensors.osint ? 'text-[#00ffff]' : 'text-[#64748b]'}`} />
                    <span>🌐 OSINT (Medios Sintéticos/Redes)</span>
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeSensors.osint ? 'bg-[#00ffff] shadow-[0_0_8px_#00ffff]' : 'bg-[#64748b]'
                  }`} />
                </button>

                {/* HUMINT */}
                <button
                  type="button"
                  onClick={() => handleToggleSensor('humint')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xs border font-mono text-xs transition-all cursor-pointer ${
                    activeSensors.humint
                      ? 'bg-[#00ffff]/10 border-[#00ffff] text-white shadow-[0_0_10px_rgba(0,255,255,0.15)]'
                      : 'bg-[#070c16] border-[#1e293b] text-[#94a3b8] hover:border-[#3b82f6]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Users className={`w-3.5 h-3.5 ${activeSensors.humint ? 'text-[#00ffff]' : 'text-[#64748b]'}`} />
                    <span>👤 HUMINT (Informantes Terreno)</span>
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeSensors.humint ? 'bg-[#00ffff] shadow-[0_0_8px_#00ffff]' : 'bg-[#64748b]'
                  }`} />
                </button>
              </div>

              {/* Ingesta de Reportes Recientes */}
              <div className="space-y-2.5">
                <div className="p-3 bg-[#0f172a] border border-[#1e293b] rounded-2xs text-xs">
                  <strong className="text-[#c084fc] font-mono text-[11px] block mb-1 uppercase tracking-wider">
                    REPORTE INICIAL:
                  </strong>
                  <p className="text-[#cbd5e1] leading-relaxed text-[11px]">
                    Múltiples cuentas abiertas de redes difunden videos de convoyes blindados avanzando masivamente por el sector Oeste.
                  </p>
                </div>

                {/* Alerta de Seguridad OPSEC Interceptada */}
                {showOpsecAlert && (
                  <div className="p-3 bg-[#ff0055]/10 border border-[#ff0055] rounded-2xs text-xs shadow-[0_0_12px_rgba(255,0,85,0.2)] animate-pulse">
                    <strong className="text-[#ff0055] font-mono text-[11px] block mb-1 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#ff0055]" />
                      ALERTA DE SEGURIDAD OPSEC:
                    </strong>
                    <p className="text-[#fca5a5] leading-relaxed text-[11px] mb-2">
                      Se ha interceptado una imagen de nuestra artillería con metadatos de geolocalización GPS expuestos. Riesgo inminente de contragolpe de fuego hostil.
                    </p>
                    <button
                      type="button"
                      onClick={handleSanitizeOpsecGeo}
                      disabled={opsecSanitized}
                      className="w-full py-1.5 px-2 bg-[#ff0055] hover:bg-[#dc2626] text-white font-mono text-[11px] font-bold rounded-2xs transition-all cursor-pointer flex items-center justify-center gap-1 shadow-md"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Sanitizar Metadatos GPS EXIF</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* COLUMNA 2: TACTICAL MAP DISPLAY & SYNC MATRIX (5.5/12)                    */}
          {/* ========================================================================= */}
          <section className="xl:col-span-6 border-b xl:border-b-0 xl:border-r border-[#1e293b] flex flex-col bg-[#090e1a]">
            <div className="px-4 py-3 bg-[#070d1a] border-b border-[#1e293b] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00ffff] flex items-center gap-1.5 uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-[#00ffff]" />
                MAPA DE SITUACIÓN Y FUSIÓN GEOCLICAL
              </span>
              <span className="font-mono text-[10px] text-[#10b981] font-bold">
                SITUACIÓN GEOGRÁFICA
              </span>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto space-y-4 flex-1 flex flex-col justify-between">
              
              {/* Tactical Map Display */}
              <div className="bg-[#03060f] border border-[#1e293b] rounded-2xs p-3 flex flex-col items-center shadow-inner relative">
                <div 
                  id="tactical-map"
                  className="w-full h-72 sm:h-80 bg-[radial-gradient(circle,#0e172e_10%,#03060f_100%)] border border-[#1e293b] rounded-2xs relative overflow-hidden flex justify-center items-center select-none"
                >
                  {/* Grid Lines Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(30, 41, 59, 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(30, 41, 59, 0.4) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px'
                    }}
                  />

                  {/* Concentric Radar Distance Rings */}
                  <div className="absolute w-64 h-64 rounded-full border border-[#1e293b]/50 pointer-events-none" />
                  <div className="absolute w-44 h-44 rounded-full border border-[#1e293b]/40 pointer-events-none" />
                  <div className="absolute w-24 h-24 rounded-full border border-[#1e293b]/30 pointer-events-none" />

                  {/* Map Sectors / Labels */}
                  <span className="absolute top-3 left-4 font-mono text-[10px] font-bold text-[#64748b] bg-[#03060f]/80 px-1.5 py-0.5 rounded-2xs border border-[#1e293b]">
                    SECTOR NORTE (A1: C4ISR)
                  </span>
                  <span className="absolute bottom-3 left-4 font-mono text-[10px] font-bold text-[#64748b] bg-[#03060f]/80 px-1.5 py-0.5 rounded-2xs border border-[#1e293b]">
                    SECTOR FRONTERA OESTE (A2)
                  </span>
                  <span className="absolute bottom-3 right-4 font-mono text-[10px] font-bold text-[#64748b] bg-[#03060f]/80 px-1.5 py-0.5 rounded-2xs border border-[#1e293b]">
                    SECTOR FRONTERA ESTE (A3)
                  </span>

                  {/* Dynamic Sensor Targets on Map */}
                  {/* Marker E1 (OSINT Convoy Visible, Purple) */}
                  {activeSensors.osint && (
                    <button
                      type="button"
                      onClick={() => handleMarkerClick('osint')}
                      className="absolute bottom-16 left-20 w-4 h-4 rounded-full bg-[#c084fc] flex items-center justify-center cursor-pointer group"
                      title="E1: Convoyes blindados reportados en OSINT (Click para ver telemetría)"
                    >
                      <span className="absolute inset-0 rounded-full bg-[#c084fc] animate-ping opacity-60 pointer-events-none" />
                      <span className="text-[9px] font-mono font-bold text-black group-hover:scale-125 transition-transform">
                        E1
                      </span>
                    </button>
                  )}

                  {/* Marker E3 (IMINT SAR Inflable Señuelo, Cyan) */}
                  {activeSensors.imint && (
                    <button
                      type="button"
                      onClick={() => handleMarkerClick('imint')}
                      className="absolute bottom-20 left-28 w-4 h-4 rounded-full bg-[#00ffff] flex items-center justify-center cursor-pointer group"
                      title="E3: Radar SAR satelital - Firma térmica fría (Click para ver telemetría)"
                    >
                      <span className="absolute inset-0 rounded-full bg-[#00ffff] animate-ping opacity-60 pointer-events-none" />
                      <span className="text-[9px] font-mono font-bold text-black group-hover:scale-125 transition-transform">
                        E3
                      </span>
                    </button>
                  )}

                  {/* Marker E2 (SIGINT/Ciberataque en el Este, Blue) */}
                  {activeSensors.sigint && (
                    <button
                      type="button"
                      onClick={() => handleMarkerClick('sigint')}
                      className="absolute bottom-20 right-24 w-4 h-4 rounded-full bg-[#3b82f6] flex items-center justify-center cursor-pointer group"
                      title="E2: SIGINT - Ciberataque en subestación eléctrica (Click para ver telemetría)"
                    >
                      <span className="absolute inset-0 rounded-full bg-[#3b82f6] animate-ping opacity-60 pointer-events-none" />
                      <span className="text-[9px] font-mono font-bold text-white group-hover:scale-125 transition-transform">
                        E2
                      </span>
                    </button>
                  )}
                </div>

                {/* Telemetry Bar */}
                <div 
                  id="map-telemetry"
                  className="w-full mt-2.5 p-2 bg-[#060c18] border border-[#1e293b] rounded-2xs font-mono text-[11px] text-[#94a3b8] text-center"
                >
                  {mapTelemetry}
                </div>
              </div>

              {/* Matriz de Sincronización Operativa (Fuegos y Colección) */}
              <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xs p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-white flex items-center gap-1.5 uppercase">
                    <Crosshair className="w-3.5 h-3.5 text-[#00ffff]" />
                    MATRIZ DE ASIGNACIÓN Y SINCRONIZACIÓN MULTIDOMINIO
                  </h3>
                  {isSyncSuccess && (
                    <span className="px-2 py-0.5 bg-[#10b981]/20 border border-[#10b981] text-[#10b981] font-mono text-[10px] font-bold rounded-2xs">
                      ✓ SINCRONIZADA
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#64748b]">
                  Asigne de manera sincronizada la respuesta defensiva sobre el terreno según la prioridad de los Cinco Anillos de Warden.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-mono">
                    <thead>
                      <tr className="border-b border-[#1e293b] text-[#00ffff] text-[10px]">
                        <th className="py-1.5 px-2 font-semibold">SECTOR</th>
                        <th className="py-1.5 px-2 font-semibold">ANILLO WARDEN AMENAZADO</th>
                        <th className="py-1.5 px-2 font-semibold">MANO DE RESPUESTA SINCRONIZADA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e293b] text-[11px]">
                      {/* Sector Oeste */}
                      <tr>
                        <td className="py-2 px-2 text-white font-bold">
                          Oeste (A2)
                        </td>
                        <td className="py-2 px-2">
                          <select
                            id="sync-r-oeste"
                            value={syncMatrix.rOeste}
                            onChange={(e) => handleMatrixChange('rOeste', e.target.value)}
                            className="w-full bg-[#030610] border border-[#1e293b] rounded-2xs px-2 py-1 text-white text-[11px] focus:outline-none focus:border-[#00ffff]"
                          >
                            <option value="none">-- Seleccionar --</option>
                            <option value="anillo1">Anillo 1: Mando C4ISR</option>
                            <option value="anillo2">Anillo 2: Combustible/SCADA</option>
                            <option value="anillo3">Anillo 3: Infraestructura</option>
                          </select>
                        </td>
                        <td className="py-2 px-2">
                          <select
                            id="sync-a-oeste"
                            value={syncMatrix.aOeste}
                            onChange={(e) => handleMatrixChange('aOeste', e.target.value)}
                            className="w-full bg-[#030610] border border-[#1e293b] rounded-2xs px-2 py-1 text-white text-[11px] focus:outline-none focus:border-[#00ffff]"
                          >
                            <option value="none">-- Seleccionar --</option>
                            <option value="fuegos">Contragolpe de Fuego (Artillería)</option>
                            <option value="decepcion">Falsa Retirada / Engaño Propio</option>
                            <option value="vuelo">Vuelo de Reconocimiento UAV</option>
                          </select>
                        </td>
                      </tr>

                      {/* Sector Este */}
                      <tr>
                        <td className="py-2 px-2 text-white font-bold">
                          Este (A3)
                        </td>
                        <td className="py-2 px-2">
                          <select
                            id="sync-r-este"
                            value={syncMatrix.rEste}
                            onChange={(e) => handleMatrixChange('rEste', e.target.value)}
                            className="w-full bg-[#030610] border border-[#1e293b] rounded-2xs px-2 py-1 text-white text-[11px] focus:outline-none focus:border-[#00ffff]"
                          >
                            <option value="none">-- Seleccionar --</option>
                            <option value="anillo1">Anillo 1: Mando C4ISR</option>
                            <option value="anillo2">Anillo 2: Combustible/SCADA</option>
                            <option value="anillo3">Anillo 3: Infraestructura</option>
                          </select>
                        </td>
                        <td className="py-2 px-2">
                          <select
                            id="sync-a-este"
                            value={syncMatrix.aEste}
                            onChange={(e) => handleMatrixChange('aEste', e.target.value)}
                            className="w-full bg-[#030610] border border-[#1e293b] rounded-2xs px-2 py-1 text-white text-[11px] focus:outline-none focus:border-[#00ffff]"
                          >
                            <option value="none">-- Seleccionar --</option>
                            <option value="airgap">Silos Físicos / Air-Gap Ciberdefensa</option>
                            <option value="fuegos">Masa de Reserva Blindada</option>
                            <option value="opsec">Rotación de Espectro VHF</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* COLUMNA 3: COGNITIVE RADAR & CHATBOT EVALUADOR ADAPTATIVO (3.3/12)         */}
          {/* ========================================================================= */}
          <section className="xl:col-span-3 border-b xl:border-b-0 flex flex-col bg-[#090f1f]">
            <div className="px-4 py-3 bg-[#070d1a] border-b border-[#1e293b] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00ffff] flex items-center gap-1.5 uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-[#00ffff]" />
                RADAR COGNITIVO & ADVISOR L.I.S.A.
              </span>
              <span className="font-mono text-[10px] text-[#10b981] font-bold">
                MONITOR EN LÍNEA
              </span>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto space-y-3.5 flex-1 flex flex-col">
              
              {/* Radar Metrics Panel */}
              <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xs p-3 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-white uppercase border-b border-[#1e293b] pb-1.5">
                  <span>ALERTAS DE SESGOS Y EXPOSICIÓN OPSEC</span>
                  <span className="text-[10px] text-[#00ffff]">COGNITIVE LOG</span>
                </div>

                {/* Sesgo de Confirmación */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#64748b]">Sesgo de Confirmación</span>
                    <span className={`font-bold ${metrics.confirmacion >= 50 ? 'text-[#ff0055]' : 'text-[#10b981]'}`}>
                      {metrics.confirmacion >= 50 ? 'Alto' : 'Bajo'} ({metrics.confirmacion}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        metrics.confirmacion >= 50 ? 'bg-[#ff0055]' : 'bg-[#10b981]'
                      }`}
                      style={{ width: `${metrics.confirmacion}%` }}
                    />
                  </div>
                </div>

                {/* Vulnerabilidad a Decepción */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#64748b]">Vulnerabilidad a Decepción</span>
                    <span className={`font-bold ${metrics.decepcion >= 50 ? 'text-[#ff0055]' : 'text-[#10b981]'}`}>
                      {metrics.decepcion >= 50 ? 'Crítica' : 'Baja'} ({metrics.decepcion}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        metrics.decepcion >= 50 ? 'bg-[#ff0055]' : 'bg-[#10b981]'
                      }`}
                      style={{ width: `${metrics.decepcion}%` }}
                    />
                  </div>
                </div>

                {/* Resiliencia OPSEC */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#64748b]">Resiliencia de Contrainteligencia</span>
                    <span className={`font-bold ${metrics.resiliencia >= 80 ? 'text-[#10b981]' : 'text-[#f59e0b]'}`}>
                      {metrics.resiliencia >= 80 ? 'Excelente' : 'Insuficiente'} ({metrics.resiliencia}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        metrics.resiliencia >= 80 ? 'bg-[#10b981]' : 'bg-[#f59e0b]'
                      }`}
                      style={{ width: `${metrics.resiliencia}%` }}
                    />
                  </div>
                </div>

                {earnedXp > 0 && (
                  <div className="pt-2 border-t border-[#1e293b] flex items-center justify-between text-[10px] font-mono text-[#10b981]">
                    <span>INMERSIÓN OPERATIVA:</span>
                    <span className="font-bold px-2 py-0.5 bg-[#10b981]/20 border border-[#10b981] rounded-2xs">
                      +{earnedXp} XP ACREDITADOS
                    </span>
                  </div>
                )}
              </div>

              {/* Chatbot Evaluador Socrático LISA & Red Team */}
              <div className="flex-1 min-h-[300px] flex flex-col bg-[#040813] border border-[#1e293b] rounded-2xs overflow-hidden shadow-inner">
                <div className="px-3 py-2 bg-[#0c1325] border-b border-[#1e293b] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-[#00ffff]" />
                    CANAL DE EVALUACIÓN COGNITIVA
                  </span>
                  <span className="text-[10px] font-mono text-[#64748b]">LISA v4.2</span>
                </div>

                {/* Message display container */}
                <div className="flex-1 p-3 overflow-y-auto space-y-2.5 font-sans text-xs">
                  {chatMessages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-2.5 rounded-2xs max-w-[90%] leading-relaxed ${
                        m.sender === 'user'
                          ? 'ml-auto bg-[#1c335e] text-white border border-[#3b82f6]/40'
                          : m.sender === 'redteam'
                          ? 'mr-auto bg-[#ff0055]/10 border-l-2 border-[#ff0055] text-[#fca5a5]'
                          : m.sender === 'system'
                          ? 'mx-auto text-center bg-[#0b1329] text-[#00e676] text-[11px] border border-[#00e676]/30'
                          : 'mr-auto bg-[#13223f] border-l-2 border-[#00ffff] text-[#cbd5e1]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1 text-[10px] font-mono font-bold opacity-80">
                        <span>{m.author}</span>
                        <span className="text-[9px] opacity-60">{m.timestamp}</span>
                      </div>
                      <p>{m.text}</p>
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={handleSendAnalystDecision}
                  className="p-2 bg-[#0c1325] border-t border-[#1e293b] flex gap-2"
                >
                  <input
                    type="text"
                    id="analyst-input-text"
                    value={analystInput}
                    onChange={(e) => setAnalystInput(e.target.value)}
                    placeholder="Escriba su curso de acción y justificación..."
                    className="flex-1 bg-[#030611] border border-[#1e293b] rounded-2xs px-2.5 py-1.5 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#00ffff] font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-mono text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <span>Enviar</span>
                    <Send className="w-3 h-3" />
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
