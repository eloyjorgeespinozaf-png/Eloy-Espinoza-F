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
  Terminal as TerminalIcon, 
  Cpu, 
  Wifi, 
  WifiOff, 
  Server, 
  Key, 
  Database, 
  Layers, 
  Check, 
  EyeOff, 
  ArrowRight,
  Activity,
  Network
} from 'lucide-react';

interface FaseTecnologicaDetalleProps {
  onClose?: () => void;
  onEnterModule?: () => void;
}

interface CyberFeedItem {
  id: string;
  type: 'SIGINT' | 'SCADA' | 'EW' | 'MALWARE';
  typeLabel: string;
  threatLevel: string;
  threatColor: string;
  ringTarget: number;
  source: string;
  title: string;
  description: string;
  isBreached: boolean;
  isInject?: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'redteam' | 'user' | 'system';
  author: string;
  text: string;
  timestamp: string;
}

interface WardenRingState {
  id: number;
  name: string;
  shortName: string;
  category: string;
  vuln: number;
  defended: boolean;
  defenseType: string;
  mitigation: number;
}

export function FaseTecnologicaDetalle({ onClose, onEnterModule }: FaseTecnologicaDetalleProps) {
  // Threat Level / Escalation (1: Seguro, 2: Guerra Electrónica Activa, 3: Colapso Multidominio)
  const [difficulty, setDifficulty] = useState<1 | 2 | 3>(1);

  // Operational Stress Countdown Timer (in seconds)
  const [remainingSeconds, setRemainingSeconds] = useState<number>(240); // 04:00
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [isTimeExpired, setIsTimeExpired] = useState<boolean>(false);

  // Contrast Mode / Comparativa Didáctica
  const [showContrastModal, setShowContrastModal] = useState<boolean>(false);

  // Earned XP
  const [earnedXp, setEarnedXp] = useState<number>(0);

  // OPSEC Sanitization State
  const [opsecSanitized, setOpsecSanitized] = useState<boolean>(false);
  const [rotativeCrypted, setRotativeCrypted] = useState<boolean>(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '> Sistema OPSEC en línea...',
    '> Monitoreando transmisiones tácticas en espectro VHF/UHF.',
    '> Listo para sanitizar metadatos GEOINT/EXIF.',
    '> Metadatos EXIF de imagen satelital detectados en canal secundario.'
  ]);

  // Global Cognitive & Vulnerability Metrics
  const [metrics, setMetrics] = useState({
    opsecExposition: 80,
    scadaVuln: 90,
    resilience: 15
  });

  // Warden Rings State
  const [rings, setRings] = useState<Record<number, WardenRingState>>({
    1: {
      id: 1,
      name: 'Anillo 1: Liderazgo C4ISR',
      shortName: 'A1: C4ISR',
      category: 'Puesto de Mando y Dirección',
      vuln: 75,
      defended: false,
      defenseType: 'Criptografía Simétrica',
      mitigation: 20
    },
    2: {
      id: 2,
      name: 'Anillo 2: Elementos Esenciales',
      shortName: 'A2: Esenciales',
      category: 'Red Eléctrica SCADA y Combustible',
      vuln: 90,
      defended: false,
      defenseType: 'Aislamiento Físico (Air-Gap)',
      mitigation: 25
    },
    3: {
      id: 3,
      name: 'Anillo 3: Infraestructura Física',
      shortName: 'A3: Infraestructura',
      category: 'Líneas de Enlace y Nodos de Fibra',
      vuln: 50,
      defended: false,
      defenseType: 'Fibra Óptica Redundante',
      mitigation: 15
    },
    4: {
      id: 4,
      name: 'Anillo 4: Población / Terreno Humano',
      shortName: 'A4: Población',
      category: 'Cultura OPSEC y Concientización',
      vuln: 60,
      defended: false,
      defenseType: 'Protocolos Antiphishing & OPSEC',
      mitigation: 15
    },
    5: {
      id: 5,
      name: 'Anillo 5: Fuerzas Militares Desplegadas',
      shortName: 'A5: Fuerzas',
      category: 'Unidades de Maniobra y Sensores',
      vuln: 45,
      defended: false,
      defenseType: 'Salto de Frecuencia Militar',
      mitigation: 15
    }
  });

  // Cyber Feeds
  const [cyberFeeds, setCyberFeeds] = useState<CyberFeedItem[]>([
    {
      id: 'f1',
      type: 'SIGINT',
      typeLabel: 'SIGINT // C4ISR',
      threatLevel: 'AMENAZA: DDoS',
      threatColor: 'text-[#f59e0b]',
      ringTarget: 1,
      source: 'Cortafuegos Perimetral Central',
      title: 'F1: Intento de saturación de paquetes C4ISR',
      description: 'Detectado intento de denegación de servicio sobre el nodo de mando principal. Apunta a desconectar la toma de decisiones (Anillo 1).',
      isBreached: false
    },
    {
      id: 'f2',
      type: 'SCADA',
      typeLabel: 'SCADA // ENERGÍA',
      threatLevel: 'AMENAZA: INTRUSIÓN',
      threatColor: 'text-[#ff0055]',
      ringTarget: 2,
      source: 'Sensor Telemétrico Subestación Oeste',
      title: 'F2: Ecos anómalos de comandos SCADA industriales',
      description: 'Inyección de paquetes Modbus/TCP alterados en la subestación eléctrica del Sector Fronterizo para provocar corte de energía (Anillo 2).',
      isBreached: true
    },
    {
      id: 'f3',
      type: 'EW',
      typeLabel: 'EW // COMINT',
      threatLevel: 'AMENAZA: ESCUCHA',
      threatColor: 'text-[#00ffff]',
      ringTarget: 3,
      source: 'Estación de Guerra Electrónica TAC-1',
      title: 'F3: Emisión de barrido de frecuencias enemiga',
      description: 'La inteligencia enemiga intenta triangular las coordenadas de nuestra estación repetidora VHF mediante Medidas de Apoyo Electrónico (MAE) (Anillo 3).',
      isBreached: false
    }
  ]);

  // Chatbot / Red Team Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      author: 'TUTOR LISA',
      text: 'Oficial analista, he inicializado la Fase III en ventana táctica de 4 minutos. El adversario ha detectado nuestras coordenadas VHF mediante MAE (F3) y apunta a interrumpir la red SCADA del oeste (F2). ¿Qué contramedidas de OPSEC o blindaje concéntrico de Warden propone de inmediato? Justifique técnica y doctrinalmente.',
      timestamp: '00:00:01'
    }
  ]);

  const [analystInput, setAnalystInput] = useState<string>('');
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

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
            'RED TEAM ENEMIGO',
            'CRISIS CRÍTICA: La parálisis de ciberdefensa provocó el colapso total de la red de energía nacional.'
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, remainingSeconds]);

  // Auto-scroll chat and terminal
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines]);

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

  const printTerminalLine = (text: string) => {
    setTerminalLines((prev) => [...prev, text]);
  };

  // Defend Warden Ring Action
  const handleDefendRing = (ringId: number) => {
    const targetRing = rings[ringId];
    if (!targetRing) return;

    if (targetRing.defended) {
      addChatMessage('system', 'CVIE SISTEMA', `El Anillo ${ringId} ya cuenta con defensa activa.`);
      return;
    }

    const newVuln = Math.max(10, targetRing.vuln - targetRing.mitigation);

    setRings((prev) => ({
      ...prev,
      [ringId]: {
        ...prev[ringId],
        defended: true,
        vuln: newVuln
      }
    }));

    // Update global metrics
    setMetrics((prev) => {
      let newScada = prev.scadaVuln;
      if (ringId === 2) {
        newScada = Math.max(10, prev.scadaVuln - 45);
      }
      const newResilience = Math.min(100, prev.resilience + 20);
      return {
        ...prev,
        scadaVuln: newScada,
        resilience: newResilience
      };
    });

    setEarnedXp((xp) => xp + 15);

    printTerminalLine(`> Aplicando contramedida en ${targetRing.name}...`);
    printTerminalLine(`> Implementando: ${targetRing.defenseType.toUpperCase()}.`);
    printTerminalLine(`> Vulnerabilidad mitigada en -${targetRing.mitigation}%. Estado: PROTEGIDO (${newVuln}%).`);

    addChatMessage(
      'ai',
      'CVIE SISTEMA',
      `Anillo ${ringId} (${targetRing.name}) reforzado con éxito mediante ${targetRing.defenseType.toUpperCase()} (+15 XP).`
    );
  };

  // OPSEC Sanitizer Actions
  const handleSanitizeOpsecMetadata = () => {
    if (opsecSanitized) {
      addChatMessage('system', 'CVIE SISTEMA', 'Los metadatos EXIF ya han sido eliminados de los servidores.');
      return;
    }

    setOpsecSanitized(true);
    printTerminalLine('> [OPSEC ACTIVO] Ejecutando purga de metadatos EXIF en capas GEOINT...');
    printTerminalLine('> Coordenadas GPS del Sector Fronterizo REMOVIDAS.');
    printTerminalLine('> Marcas de tiempo y números de serie de sensores eliminados.');
    printTerminalLine('> Denegación de información táctica completada.');

    setMetrics((prev) => ({
      ...prev,
      opsecExposition: Math.max(10, prev.opsecExposition - 40),
      resilience: Math.min(100, prev.resilience + 20)
    }));

    setEarnedXp((xp) => xp + 20);

    addChatMessage(
      'ai',
      'OPSEC MONITOR',
      'Metadatos sanitizados con éxito (+20 XP). Las capturas satelitales y fotos en redes ya no delatan las posiciones de tropas ni puestos de mando.'
    );
  };

  const handleApplyRotativeEncryption = () => {
    if (rotativeCrypted) {
      addChatMessage('system', 'CVIE SISTEMA', 'La rotación criptográfica de 12 horas ya está activa.');
      return;
    }

    setRotativeCrypted(true);
    printTerminalLine('> [CRIPTOGRAFÍA] Generando llaves criptográficas militares asimétricas...');
    printTerminalLine('> Algoritmo militar activo: Curvas Elípticas Ed25519.');
    printTerminalLine('> Ciclo de rotación forzada programado: Cada 12 Horas.');
    printTerminalLine('> Enlaces de datos C4ISR encriptados de extremo a extremo.');

    setMetrics((prev) => ({
      ...prev,
      opsecExposition: Math.max(10, prev.opsecExposition - 30),
      resilience: Math.min(100, prev.resilience + 20)
    }));

    setEarnedXp((xp) => xp + 20);

    addChatMessage(
      'ai',
      'CIBERDEFENSA',
      'Encriptación rotativa en línea (+20 XP). Las escuchas electromagnéticas hostiles (SIGINT/COMINT) han sido neutralizadas.'
    );
  };

  // Active Cyber Attack (Stress Injector)
  const handleInjectCyberAttack = () => {
    setRemainingSeconds((prev) => Math.max(10, prev - 45));

    const nextId = `f${cyberFeeds.length + 1}`;
    const newFeed: CyberFeedItem = {
      id: nextId,
      type: 'MALWARE',
      typeLabel: 'MALWARE // ZERO-DAY',
      threatLevel: 'ATAQUE MASIVO',
      threatColor: 'text-[#ff0055]',
      ringTarget: 2,
      source: 'Centro Nacional de Despacho Eléctrico',
      title: 'ALERTA CRÍTICA: Intrusión SCADA activa en generadores',
      description: 'Ataque sincronizado contra controladores lógicos programables (PLC). El enemigo intenta apagar el soporte de energía de las bases fronterizas.',
      isBreached: true,
      isInject: true
    };

    setCyberFeeds((prev) => [newFeed, ...prev]);

    // Expose Rings 1 and 2
    setRings((prev) => ({
      ...prev,
      1: { ...prev[1], vuln: Math.min(100, prev[1].vuln + 15), defended: false },
      2: { ...prev[2], vuln: Math.min(100, prev[2].vuln + 25), defended: false }
    }));

    setMetrics((prev) => ({
      opsecExposition: Math.min(100, prev.opsecExposition + 15),
      scadaVuln: Math.min(100, prev.scadaVuln + 25),
      resilience: Math.max(5, prev.resilience - 15)
    }));

    printTerminalLine('> [ALERTA FLASH] Intrusión detectada en controladores SCADA...');
    printTerminalLine('> Parámetros de frecuencia eléctrica desviados.');
    printTerminalLine('> Tiempo de reacción colapsado (-45 segundos).');

    addChatMessage(
      'redteam',
      'RED TEAM ENEMIGO',
      '⚠️ ¡ALERTA ROJA! Ciberintrusión masiva SCADA detectada en la red eléctrica del oeste. Se ha reducido la ventana operativa en -45s.'
    );
  };

  // Preset: Simular Falla Crítica Típica (Enfoque Tradicional / Sin Defensa de Warden)
  const applyTraditionalFlawedPreset = () => {
    setRings({
      1: { ...rings[1], vuln: 85, defended: false },
      2: { ...rings[2], vuln: 95, defended: false },
      3: { ...rings[3], vuln: 70, defended: false },
      4: { ...rings[4], vuln: 80, defended: false },
      5: { ...rings[5], vuln: 65, defended: false }
    });
    setOpsecSanitized(false);
    setRotativeCrypted(false);
    setMetrics({
      opsecExposition: 85,
      scadaVuln: 95,
      resilience: 10
    });

    printTerminalLine('> [MODO DIDÁCTICO] Cargando arquitectura tradicional sin defensa de Warden...');
    printTerminalLine('> Perímetro único vulnerado. SCADA expuesto a Internet sin Air-Gap.');
    printTerminalLine('> Fuga masiva de metadatos GPS en fotos publicadas en redes abiertas.');

    addChatMessage(
      'redteam',
      'SIMULADOR DE FALLA CRÍTICA',
      'MODO DIDÁCTICO ILUSTRATIVO: Se muestra el error habitual de basarse solo en un firewall perimetral. Una vez comprometido el perímetro, los sistemas SCADA (Anillo 2) quedan totalmente expuestos y las filtraciones OPSEC revelan la ubicación del puesto de mando (Anillo 1).'
    );
  };

  // Preset: Aplicar Resiliencia Sistémica Óptima (Warden + OPSEC + Cripto)
  const applyOptimalWardenPreset = () => {
    setRings({
      1: { ...rings[1], vuln: 15, defended: true },
      2: { ...rings[2], vuln: 10, defended: true },
      3: { ...rings[3], vuln: 20, defended: true },
      4: { ...rings[4], vuln: 25, defended: true },
      5: { ...rings[5], vuln: 20, defended: true }
    });
    setOpsecSanitized(true);
    setRotativeCrypted(true);
    setMetrics({
      opsecExposition: 15,
      scadaVuln: 10,
      resilience: 95
    });
    setEarnedXp(80);

    printTerminalLine('> [MODO RESILIENCIA] Arquitectura concéntrica de Warden activada...');
    printTerminalLine('> Air-Gap físico en subestaciones SCADA.');
    printTerminalLine('> Metadatos sanitizados. Criptografía rotativa de 12H activa.');
    printTerminalLine('> Enlaces de fibra óptica redundantes y salto de frecuencia.');

    addChatMessage(
      'ai',
      'TUTOR LISA',
      'ARQUITECTURA DE RESILIENCIA ÓPTIMA APLICADA (+80 XP): Todos los anillos de Warden están blindados en profundidad. El adversario no puede alcanzar el Anillo 1 (Liderazgo) ni paralizar el Anillo 2 (Energía), neutralizando la sorpresa estratégica.'
    );
  };

  // Handle Analyst Chat Message & AI Socratic Evaluation
  const handleSendAnalystMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = analystInput.trim();
    if (!text) return;

    addChatMessage('user', 'ANALISTA TÁCTICO', text);
    setAnalystInput('');

    setTimeout(() => {
      evaluateCyberPedagogy(text.toLowerCase());
    }, 600);
  };

  const evaluateCyberPedagogy = (text: string) => {
    const hasCyberKeywords = 
      text.includes('airgap') || 
      text.includes('air-gap') || 
      text.includes('segreg') || 
      text.includes('redund') || 
      text.includes('warden') || 
      text.includes('anillo 2') || 
      text.includes('anillo 1') || 
      text.includes('cifrado') || 
      text.includes('exif') || 
      text.includes('scada') || 
      text.includes('opsec') || 
      text.includes('pic') || 
      text.includes('aislamiento');

    if (hasCyberKeywords) {
      addChatMessage(
        'ai',
        'TUTOR LISA',
        'Excelente aplicación de la doctrina de defensa de Warden. Aplicar Air-Gap en los sistemas SCADA y sanitización OPSEC rompe la capacidad del adversario de paralizar nuestros elementos esenciales. Escalando simulación táctica al siguiente nivel.'
      );

      setEarnedXp((xp) => xp + 25);

      if (difficulty === 1) {
        setDifficulty(2);
        addChatMessage(
          'redteam',
          'RED TEAM ENEMIGO',
          'NIVEL 2: El oponente inicia interferencias activas sobre enlaces VHF. Desplegando contramedidas de espectro y salto de frecuencia.'
        );
      } else if (difficulty === 2) {
        setDifficulty(3);
        setRemainingSeconds((prev) => Math.min(prev, 60));
        addChatMessage(
          'redteam',
          'RED TEAM ENEMIGO',
          'NIVEL 3 (VENTANA MÁXIMA): El oponente lanza un exploit zero-day contra el Comando Conjunto. Quedan 60 segundos para sanitizar y blindar los enlaces C4ISR.'
        );
      }
    } else {
      addChatMessage(
        'ai',
        'TUTOR LISA',
        'Su respuesta carece del rigor metodológico exigido por la directiva OPSEC. Reexamine el Anillo 2 de Warden: golpear el combustible y la energía tiene consecuencias desastrosas e inmediatas en la cadena de mando (Anillo 1). Debe implementar Air-Gap o encriptación rotativa.'
      );
    }
  };

  const getThreatBadge = () => {
    switch (difficulty) {
      case 1:
        return (
          <span className="px-3 py-1 bg-[#00e676]/10 border border-[#00e676] text-[#00e676] font-mono text-[11px] font-bold rounded-2xs tracking-wider uppercase">
            NIVEL 1: SEGURO
          </span>
        );
      case 2:
        return (
          <span className="px-3 py-1 bg-[#f59e0b]/10 border border-[#f59e0b] text-[#f59e0b] font-mono text-[11px] font-bold rounded-2xs tracking-wider uppercase animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.25)]">
            NIVEL 2: GUERRA ELECTRÓNICA ACTIVA
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

  return (
    <div 
      id="fase-tecnologica-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-3 lg:p-5 bg-[#030712]/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      {/* Contenedor Principal Dashboard CVIE Fase III */}
      <div 
        id="fase-tecnologica-container"
        className="relative w-full max-w-[1600px] bg-[#0b1329] border border-[#1e3a6c] rounded-xs shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden my-auto flex flex-col max-h-[96vh]"
      >
        {/* Retícula militar táctica en esquinas */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ffff] z-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ffff] z-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ffff] z-30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ffff] z-30 pointer-events-none" />

        {/* 1. OPERATIONAL TOP BAR */}
        <header className="relative z-20 bg-[#070c1b] border-b-2 border-[#1e3a6c] px-4 sm:px-6 py-3.5 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#00ffff]/10 border border-[#00ffff] text-[#00ffff] font-mono text-[11px] px-2.5 py-1 rounded-2xs tracking-widest uppercase shadow-[0_0_6px_rgba(0,255,255,0.3)]">
              CVIE FASE III // WAR GAME
            </span>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2">
                Operación Resiliencia: Blindaje de Infraestructuras Críticas
              </h1>
              <p className="text-xs text-[#64748b]">
                Sincronización de Ciberdefensa // Doctrina Warden // Monitoreo OPSEC [Doctrina Boliviana]
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 w-full xl:w-auto justify-between xl:justify-end">
            {/* Stress Clock */}
            <div className="flex items-center gap-2 bg-[#ff0055]/10 border border-[#ff0055] px-3 py-1.5 rounded-2xs shadow-[0_0_10px_rgba(255,0,85,0.15)]">
              <span className="text-[10px] font-mono text-[#fca5a5] font-bold uppercase tracking-wider">
                VENTANA OPERATIVA:
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
              <span className="text-[10px] font-mono text-[#64748b] uppercase hidden sm:inline">NIVEL AMENAZA:</span>
              {getThreatBadge()}
            </div>

            {/* Botón de Inyección de Ciberataque Masivo */}
            <button
              type="button"
              onClick={handleInjectCyberAttack}
              className="px-3 py-1.5 bg-[#ff0055] hover:bg-[#dc2626] text-white font-mono text-xs font-bold rounded-2xs transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:shadow-red-500/30 shrink-0"
              title="Acelera el reloj en -45s e inyecta malware en los sistemas SCADA de energía"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>+ Inyectar Ciberataque Masivo (SCADA)</span>
            </button>

            {/* Botón de Contraste Metodológico */}
            <button
              type="button"
              onClick={() => setShowContrastModal(!showContrastModal)}
              className="px-3 py-1.5 bg-[#3b82f6]/20 hover:bg-[#3b82f6]/30 border border-[#3b82f6] text-[#60a5fa] font-mono text-xs font-bold rounded-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
              title="Abre la comparativa interactiva entre el modelo tradicional perimetral y el modelo concéntrico de Warden"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>⚖️ Contrastar Metodología</span>
            </button>

            {onEnterModule && (
              <button
                type="button"
                onClick={onEnterModule}
                className="px-3 py-1.5 bg-[#00e676]/20 hover:bg-[#00e676]/30 border border-[#00e676] text-[#a7f3d0] font-mono text-xs font-bold rounded-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                title="Avanzar a Fase IV: Inmersión Operativa"
              >
                <span>Avanzar a Fase IV</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#00e676]" />
              </button>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar simulación"
                className="p-1.5 text-[#64748b] hover:text-white hover:bg-[#111e3f] border border-[#1e3a6c] rounded-2xs transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {/* BANNER DE CONTRASTE METODOLÓGICO DIDÁCTICO (SI ESTÁ ACTIVO) */}
        {showContrastModal && (
          <div className="bg-[#0c1630] border-b border-[#3b82f6]/40 p-3 sm:p-4 text-xs font-mono transition-all animate-fadeIn">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#3b82f6]/20 text-[#60a5fa] border border-[#3b82f6] rounded-2xs font-bold text-[11px]">
                  LABORATORIO COMPARATIVO
                </span>
                <span className="text-white font-bold">
                  Contraste Didáctico: Ciberdefensa Perimetral Tradicional vs. Blindaje Multicapa Warden + OPSEC Activo (CVIE)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={applyTraditionalFlawedPreset}
                  className="px-2.5 py-1 bg-[#ff0055]/20 hover:bg-[#ff0055]/30 text-[#fca5a5] border border-[#ff0055] rounded-2xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <AlertTriangle className="w-3 h-3 text-[#ff0055]" />
                  <span>Simular Falla Crítica Tradicional</span>
                </button>
                <button
                  type="button"
                  onClick={applyOptimalWardenPreset}
                  className="px-2.5 py-1 bg-[#00e676]/20 hover:bg-[#00e676]/30 text-[#a7f3d0] border border-[#00e676] rounded-2xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3 text-[#00e676]" />
                  <span>Aplicar Resiliencia Sistémica Óptima</span>
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
                  ENFOQUE REACTIVO TRADICIONAL (COLAPSO EN CADENA):
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">
                  Se confía en un único cortafuegos perimetral externo. La red SCADA industrial (Anillo 2) y el puesto de mando C4ISR (Anillo 1) comparten el mismo dominio de enrutamiento sin Air-Gap. Las fotos de operativos militares filtran metadatos EXIF con coordenadas GPS en canales públicos. <strong>Resultado:</strong> Una vulnerabilidad en el perímetro paraliza la red eléctrica nacional y expone la ubicación del Estado Mayor.
                </p>
              </div>

              <div className="p-2.5 bg-[#071915] border border-[#00e676]/30 rounded-2xs">
                <div className="font-mono font-bold text-[#a7f3d0] mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00e676]" />
                  ENFOQUE DE RESILIENCIA TECNOLÓGICA CVIE (DOCTRINA WARDEN):
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">
                  Defensa en profundidad concéntrica. Aislamiento físico estricto (Air-Gap) en los elementos esenciales SCADA (Anillo 2), sanitización automática de metadatos GEOINT/EXIF en la consola OPSEC, encriptación rotativa cada 12 horas y enlaces tácticos redundantes. <strong>Resultado:</strong> Aunque el adversario intente saturar las telecomunicaciones externas (Anillo 5), el núcleo C4ISR y la matriz energética permanecen inexpugnables.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. GRID WORKSPACE LAYOUT (3 COLUMNAS) */}
        <div className="relative z-10 flex-1 overflow-y-auto grid grid-cols-1 xl:grid-cols-12 min-h-[640px] bg-[#050811]">
          
          {/* ========================================================================= */}
          {/* COLUMNA 1: CIBERINTELIGENCIA TÁCTICA FEED & TERMINAL OPSEC (3.2/12)       */}
          {/* ========================================================================= */}
          <section className="xl:col-span-3 border-b xl:border-b-0 xl:border-r border-[#1e3a6c] flex flex-col bg-[#0b1329]">
            <div className="px-4 py-3 bg-[#081021] border-b border-[#1e3a6c] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00ffff] flex items-center gap-1.5 uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 text-[#00ffff]" />
                FEED CIBERINTELIGENCIA (MULTI-INT)
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-[#111e3f] text-[#64748b] border border-[#1e3a6c] rounded-2xs font-semibold">
                {cyberFeeds.length} REPORTES
              </span>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto space-y-3 flex-1">
              <p className="text-[11px] text-[#64748b] leading-relaxed">
                Señales interceptadas en tiempo real. Utilice el terminal OPSEC inferior para denegar información crítica al adversario.
              </p>

              {/* Feed Items */}
              {cyberFeeds.map((feed) => (
                <div
                  key={feed.id}
                  className={`p-3 rounded-2xs border transition-all duration-200 ${
                    feed.isBreached
                      ? 'bg-[#ff0055]/10 border-[#ff0055] shadow-[0_0_12px_rgba(255,0,85,0.2)]'
                      : 'bg-[#111e3f] border-[#1e3a6c] hover:border-[#3b82f6]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className={`px-1.5 py-0.5 rounded-2xs font-bold uppercase border ${
                      feed.type === 'SIGINT'
                        ? 'bg-[#3b82f6]/15 border-[#3b82f6] text-[#60a5fa]'
                        : feed.type === 'SCADA'
                        ? 'bg-[#f59e0b]/15 border-[#f59e0b] text-[#fbbf24]'
                        : feed.type === 'EW'
                        ? 'bg-[#a855f7]/15 border-[#a855f7] text-[#c084fc]'
                        : 'bg-[#ff0055]/15 border-[#ff0055] text-[#fca5a5]'
                    }`}>
                      {feed.typeLabel}
                    </span>
                    <span className={`font-bold font-mono text-[10px] ${feed.threatColor}`}>
                      {feed.threatLevel}
                    </span>
                  </div>

                  <h4 className="font-sans text-xs font-bold text-white mb-1 leading-snug">
                    {feed.title}
                  </h4>

                  <p className="text-[11px] text-[#cbd5e1] leading-relaxed mb-2 font-sans">
                    {feed.description}
                  </p>

                  <div className="pt-2 border-t border-[#1e3a6c]/70 flex items-center justify-between text-[9px] font-mono text-[#64748b]">
                    <span>ORIGEN: {feed.source}</span>
                    <span className="text-[#00ffff]">ANILLO OBJETIVO: A{feed.ringTarget}</span>
                  </div>
                </div>
              ))}

              {/* Terminal OPSEC Sanitizer Console */}
              <div className="bg-[#040813] border border-[#1e3a6c] rounded-2xs p-3 space-y-2.5 mt-3 shadow-inner">
                <div className="text-xs font-mono font-bold text-white flex items-center justify-between border-b border-[#1e3a6c] pb-2">
                  <span className="flex items-center gap-1.5 text-[#00e676]">
                    <TerminalIcon className="w-3.5 h-3.5 text-[#00e676]" />
                    CONSOLA DE SANITIZACIÓN OPSEC
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 bg-[#111e3f] text-[#64748b] rounded-2xs">
                    SHELL VIRTUAL
                  </span>
                </div>

                {/* Terminal Screen */}
                <div className="h-28 bg-[#02050c] border border-[#1e3a6c]/60 rounded-2xs p-2 overflow-y-auto font-mono text-[10.5px] space-y-1 text-[#00e676]">
                  {terminalLines.map((line, idx) => (
                    <div key={idx} className="leading-tight">
                      {line}
                    </div>
                  ))}
                  <div ref={terminalBottomRef} />
                </div>

                {/* Terminal Buttons */}
                <div className="space-y-1.5 pt-1">
                  <button
                    type="button"
                    onClick={handleSanitizeOpsecMetadata}
                    disabled={opsecSanitized}
                    className={`w-full py-1.5 px-2 text-[11px] font-mono font-bold rounded-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      opsecSanitized
                        ? 'bg-[#00e676]/20 border border-[#00e676] text-[#a7f3d0] cursor-default'
                        : 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-md'
                    }`}
                  >
                    {opsecSanitized ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00e676]" />
                        <span>✓ Metadatos EXIF Sanitizados</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Sanitizar Metadatos EXIF (Denegar GPS)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleApplyRotativeEncryption}
                    disabled={rotativeCrypted}
                    className={`w-full py-1.5 px-2 text-[11px] font-mono font-bold rounded-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      rotativeCrypted
                        ? 'bg-[#00e676]/20 border border-[#00e676] text-[#a7f3d0] cursor-default'
                        : 'bg-[#ff0055] hover:bg-[#dc2626] text-white shadow-md'
                    }`}
                  >
                    {rotativeCrypted ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00e676]" />
                        <span>✓ Encriptación Rotativa 12H Activa</span>
                      </>
                    ) : (
                      <>
                        <Key className="w-3.5 h-3.5" />
                        <span>Aplicar Encriptación Rotativa (Llaves 12H)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* COLUMNA 2: WARDEN MAP (CINCO ANILLOS INTERACTIVOS) (5.5/12)               */}
          {/* ========================================================================= */}
          <section className="xl:col-span-6 border-b xl:border-b-0 xl:border-r border-[#1e3a6c] flex flex-col bg-[#090f1e]">
            <div className="px-4 py-3 bg-[#081021] border-b border-[#1e3a6c] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00ffff] flex items-center gap-1.5 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-[#00ffff]" />
                MAPA SISTÉMICO DE LOS CINCO ANILLOS DE WARDEN
              </span>
              <span className="font-mono text-[10px] text-[#00e676] font-bold">
                PROTECCIÓN PIC (INFRAESTRUCTURA CRÍTICA)
              </span>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto space-y-4 flex-1 flex flex-col justify-between">
              
              {/* Warden Visual Diagram */}
              <div className="bg-[#040712] border border-[#1e3a6c] rounded-2xs p-4 flex flex-col items-center shadow-inner relative">
                <p className="text-[11px] text-[#64748b] text-center max-w-lg mb-2">
                  Presione &ldquo;Reforzar&rdquo; en la tabla inferior para blindar cada Anillo con contramedidas criptográficas, silos de red (Air-Gap) o redundancia de fibra óptica.
                </p>

                {/* Concentric Rings Visualization */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-2 select-none">
                  {/* Ring 5: Fuerzas Militares */}
                  <div className={`absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed transition-all flex items-start justify-center pt-1.5 ${
                    rings[5].defended
                      ? 'border-[#00e676] bg-[#00e676]/5 shadow-[0_0_15px_rgba(0,230,118,0.15)]'
                      : 'border-[#1e3a6c] bg-transparent'
                  }`}>
                    <span className="font-mono text-[10px] font-bold text-[#64748b] bg-[#040712]/90 px-1.5 rounded-2xs">
                      A5: Fuerzas ({rings[5].vuln}%)
                    </span>
                  </div>

                  {/* Ring 4: Población */}
                  <div className={`absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full border-2 border-dashed transition-all flex items-start justify-center pt-1.5 ${
                    rings[4].defended
                      ? 'border-[#00e676] bg-[#00e676]/5 shadow-[0_0_15px_rgba(0,230,118,0.15)]'
                      : 'border-[#1e3a6c] bg-transparent'
                  }`}>
                    <span className="font-mono text-[10px] font-bold text-[#64748b] bg-[#040712]/90 px-1.5 rounded-2xs">
                      A4: Población ({rings[4].vuln}%)
                    </span>
                  </div>

                  {/* Ring 3: Infraestructura Física */}
                  <div className={`absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-dashed transition-all flex items-start justify-center pt-1.5 ${
                    rings[3].defended
                      ? 'border-[#00e676] bg-[#00e676]/5 shadow-[0_0_15px_rgba(0,230,118,0.15)]'
                      : rings[3].vuln >= 50
                      ? 'border-[#f59e0b] bg-[#f59e0b]/5'
                      : 'border-[#1e3a6c] bg-transparent'
                  }`}>
                    <span className="font-mono text-[10px] font-bold text-[#64748b] bg-[#040712]/90 px-1.5 rounded-2xs">
                      A3: Infraestructura ({rings[3].vuln}%)
                    </span>
                  </div>

                  {/* Ring 2: Elementos Esenciales (SCADA) */}
                  <div className={`absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 transition-all flex items-start justify-center pt-1 ${
                    rings[2].defended
                      ? 'border-[#00e676] bg-[#00e676]/10 shadow-[0_0_20px_rgba(0,230,118,0.2)]'
                      : rings[2].vuln >= 70
                      ? 'border-[#ff0055] bg-[#ff0055]/10 animate-pulse shadow-[0_0_15px_rgba(255,0,85,0.4)]'
                      : 'border-[#1e3a6c]'
                  }`}>
                    <span className="font-mono text-[10px] font-bold text-[#fca5a5] bg-[#040712]/90 px-1.5 rounded-2xs">
                      A2: Esenciales ({rings[2].vuln}%)
                    </span>
                  </div>

                  {/* Ring 1: Liderazgo C4ISR (Centro) */}
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 flex flex-col items-center justify-center transition-all z-20 ${
                    rings[1].defended
                      ? 'border-[#00e676] bg-[#00e676]/20 shadow-[0_0_25px_rgba(0,230,118,0.4)]'
                      : rings[1].vuln >= 60
                      ? 'border-[#ff0055] bg-[#ff0055]/20 animate-pulse'
                      : 'border-[#00ffff] bg-[#0f172a]'
                  }`}>
                    <Cpu className={`w-4 h-4 sm:w-5 sm:h-5 ${rings[1].defended ? 'text-[#00e676]' : 'text-[#00ffff]'}`} />
                    <span className="font-mono text-[9px] font-bold text-white tracking-tighter mt-0.5">
                      A1: C4ISR
                    </span>
                  </div>
                </div>
              </div>

              {/* Warden Control Panel Cards */}
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((id) => {
                  const r = rings[id];
                  return (
                    <div
                      key={id}
                      className={`p-2.5 sm:p-3 rounded-2xs border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all ${
                        r.defended
                          ? 'bg-[#081a14] border-[#00e676]/40'
                          : r.vuln >= 70
                          ? 'bg-[#180914] border-[#ff0055]/40'
                          : 'bg-[#111e3f] border-[#1e3a6c]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-7 h-7 rounded-2xs flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                          r.defended
                            ? 'bg-[#00e676]/20 text-[#00e676] border border-[#00e676]'
                            : 'bg-[#1e3a6c]/40 text-[#64748b] border border-[#1e3a6c]'
                        }`}>
                          A{id}
                        </span>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-mono text-xs font-bold text-white">
                              {r.name}
                            </h4>
                            <span className="text-[10px] text-[#64748b] font-mono hidden md:inline">
                              • {r.category}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono flex items-center gap-2 pt-0.5">
                            <span className={r.defended ? 'text-[#00e676] font-bold' : r.vuln >= 70 ? 'text-[#fca5a5] font-bold' : 'text-[#cbd5e1]'}>
                              Vulnerabilidad: {r.defended ? 'Protegido' : 'Riesgo'} ({r.vuln}%)
                            </span>
                            {r.defended && (
                              <span className="text-[10px] text-[#a7f3d0]">
                                (Medida: {r.defenseType})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDefendRing(id)}
                        disabled={r.defended}
                        className={`px-3 py-1.5 rounded-2xs text-xs font-mono font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                          r.defended
                            ? 'bg-[#00e676]/20 border border-[#00e676] text-[#00e676] cursor-default'
                            : 'bg-[#3b82f6] hover:bg-[#2563eb] text-white shadow-md'
                        }`}
                      >
                        {r.defended ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#00e676]" />
                            <span>Blindado</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{r.defenseType}</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* COLUMNA 3: RADAR DE VULNERABILIDAD DIGITAL & ADAPTATIVE CHATBOT (3.3/12)   */}
          {/* ========================================================================= */}
          <section className="xl:col-span-3 border-b xl:border-b-0 flex flex-col bg-[#0b1329]">
            <div className="px-4 py-3 bg-[#081021] border-b border-[#1e3a6c] flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#00ffff] flex items-center gap-1.5 uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 text-[#00ffff]" />
                RADAR DIGITAL & RED TEAM
              </span>
              <span className="font-mono text-[10px] text-[#00e676] font-bold">
                MONITOR ACTIVO
              </span>
            </div>

            <div className="p-3 sm:p-4 overflow-y-auto space-y-3.5 flex-1 flex flex-col">
              
              {/* Radar de Riesgo de Infraestructura */}
              <div className="bg-[#111e3f] border border-[#1e3a6c] rounded-2xs p-3 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-white uppercase border-b border-[#1e3a6c] pb-1.5">
                  <span>ÍNDICES DE RIESGO PIC</span>
                  <span className="text-[10px] text-[#00ffff]">METRIC LOG</span>
                </div>

                {/* Exposición OPSEC */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#64748b]">Fuga OPSEC / Exposición de Datos</span>
                    <span className={`font-bold ${metrics.opsecExposition >= 50 ? 'text-[#ff0055]' : 'text-[#00e676]'}`}>
                      {metrics.opsecExposition >= 50 ? 'Crítica' : 'Baja'} ({metrics.opsecExposition}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        metrics.opsecExposition >= 50 ? 'bg-[#ff0055]' : 'bg-[#00e676]'
                      }`}
                      style={{ width: `${metrics.opsecExposition}%` }}
                    />
                  </div>
                </div>

                {/* Vulnerabilidad SCADA */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#64748b]">Vulnerabilidad SCADA (Energía)</span>
                    <span className={`font-bold ${metrics.scadaVuln >= 50 ? 'text-[#ff0055]' : 'text-[#00e676]'}`}>
                      {metrics.scadaVuln >= 50 ? 'Crítica' : 'Baja'} ({metrics.scadaVuln}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        metrics.scadaVuln >= 50 ? 'bg-[#ff0055]' : 'bg-[#00e676]'
                      }`}
                      style={{ width: `${metrics.scadaVuln}%` }}
                    />
                  </div>
                </div>

                {/* Resiliencia Tecnológica */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#64748b]">Índice de Resiliencia Tecnológica</span>
                    <span className={`font-bold ${metrics.resilience >= 80 ? 'text-[#00e676]' : 'text-[#f59e0b]'}`}>
                      {metrics.resilience >= 80 ? 'Excelente' : 'Insuficiente'} ({metrics.resilience}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        metrics.resilience >= 80 ? 'bg-[#00e676]' : 'bg-[#f59e0b]'
                      }`}
                      style={{ width: `${metrics.resilience}%` }}
                    />
                  </div>
                </div>

                {earnedXp > 0 && (
                  <div className="pt-2 border-t border-[#1e3a6c] flex items-center justify-between text-[10px] font-mono text-[#00e676]">
                    <span>DOMINIO CIBERDEFENSA:</span>
                    <span className="font-bold px-2 py-0.5 bg-[#00e676]/20 border border-[#00e676] rounded-2xs">
                      +{earnedXp} XP ACREDITADOS
                    </span>
                  </div>
                )}
              </div>

              {/* Chatbot Adaptativo LISA & Red Team */}
              <div className="bg-[#040813] border border-[#1e3a6c] rounded-2xs flex-1 flex flex-col overflow-hidden min-h-[340px]">
                <div className="px-3 py-2 bg-[#0b1329] border-b border-[#1e3a6c] flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-[#00ffff]" />
                    TUTOR ADAPTATIVO LISA
                  </span>
                  <span className="text-[10px] text-[#64748b]">SOCRÁTICO TÁCTICO</span>
                </div>

                {/* Message Log */}
                <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2.5 rounded-2xs leading-relaxed max-w-[88%] text-[11px] font-sans ${
                        msg.sender === 'user'
                          ? 'bg-[#1d3557] text-white ml-auto border border-[#3b82f6]/40'
                          : msg.sender === 'redteam'
                          ? 'bg-[#ff0055]/15 text-[#fca5a5] border-l-3 border-[#ff0055]'
                          : msg.sender === 'system'
                          ? 'bg-[#111e3f] text-[#a7f3d0] border-l-3 border-[#00e676]'
                          : 'bg-[#13223f] text-[#cbd5e1] border-l-3 border-[#00ffff]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[9.5px] mb-1 opacity-80">
                        <strong className="tracking-wider">{msg.author}</strong>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={handleSendAnalystMessage}
                  className="p-2 bg-[#0b1329] border-t border-[#1e3a6c] flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={analystInput}
                    onChange={(e) => setAnalystInput(e.target.value)}
                    placeholder="Justifique o consulte sobre Warden o SCADA..."
                    className="flex-1 bg-[#030611] border border-[#1e3a6c] rounded-2xs px-3 py-1.5 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#00ffff] font-sans"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-mono text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center gap-1 shadow-md shrink-0"
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
