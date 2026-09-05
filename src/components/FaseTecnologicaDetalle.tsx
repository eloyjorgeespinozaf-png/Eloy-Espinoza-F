import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Shield, 
  AlertTriangle, 
  Radio, 
  Send, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  X, 
  Award, 
  ArrowRight, 
  Clock, 
  Activity, 
  FileText, 
  RefreshCw,
  Sliders,
  Check
} from 'lucide-react';
import { safePrint } from '../utils/safePrint';

interface FaseTecnologicaDetalleProps {
  onClose?: () => void;
  onEnterModule?: () => void;
}

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  type: 'ai' | 'user' | 'red';
}

export function FaseTecnologicaDetalle({ onClose, onEnterModule }: FaseTecnologicaDetalleProps) {
  // Global Application State
  const [activeTab, setActiveTab] = useState<number>(0);
  const [saberXP, setSaberXP] = useState<number>(0);
  const [hacerXP, setHacerXP] = useState<number>(0);

  // Tab 1: Ciberinteligencia & OSINT
  const [selectedCOA, setSelectedCOA] = useState<number | null>(null);
  const [w1Timer, setW1Timer] = useState<number>(90);

  // Tab 2: Seguridad de Operaciones (OPSEC)
  const [opsecInput, setOpsecInput] = useState<string[]>([]);
  const [opsecValidated, setOpsecValidated] = useState<boolean>(false);
  const [w2Timer, setW2Timer] = useState<number>(90);
  const [opsecFeedback, setOpsecFeedback] = useState<{ msg: string; type: 'success' | 'error' | 'idle' }>({
    msg: 'Establezca la prioridad de los procedimientos tácticos haciendo clic en ellos.',
    type: 'idle'
  });

  // Tab 3: Análisis de la Amenaza (ECEME)
  const [ecemeSel1, setEcemeSel1] = useState<string>('none');
  const [ecemeSel2, setEcemeSel2] = useState<string>('none');
  const [ecemeSel3, setEcemeSel3] = useState<string>('none');
  const [ecemeSel4, setEcemeSel4] = useState<string>('none');
  const [ecemeValidated, setEcemeValidated] = useState<boolean>(false);
  const [w3Timer, setW3Timer] = useState<number>(90);

  // Tab 4: Resiliencia & Evaluación Sumativa
  const [simStep, setSimStep] = useState<number>(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'init-msg',
      author: 'TUTOR LISA (CYBER-RED)',
      text: 'Oficial analista, de acuerdo con la Metodología de Análisis de la Amenaza de la ECEME (EM-MI-AA-02), el oponente aprovecha nuestras vulnerabilidades de falta de aislamiento SCADA y nuestra exposición OPSEC. ¿Qué medida correctiva de ciberdefensa táctica implementará para blindar el suministro de energía nacional y qué procedimiento prioritario denegará la geolocalización de nuestra artillería?',
      type: 'ai'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [w4Timer, setW4Timer] = useState<number>(240);
  const [isFinalCertified, setIsFinalCertified] = useState<boolean>(false);
  const [showScorecard, setShowScorecard] = useState<boolean>(false);

  // Radar metrics
  const [scadaRisk, setScadaRisk] = useState<number>(90);
  const [opsecRisk, setOpsecRisk] = useState<number>(80);
  const [resilienceScore, setResilienceScore] = useState<number>(0);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date().toISOString().split('T')[0];

  const globalXP = saberXP + hacerXP;

  // Timers countdown per tab
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTab === 0) {
        setW1Timer((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (activeTab === 1) {
        setW2Timer((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (activeTab === 2) {
        setW3Timer((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (activeTab === 3) {
        setW4Timer((prev) => (prev > 0 ? prev - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Tab 1 Handler
  const handleSelectCOA = (coaId: number) => {
    setSelectedCOA(coaId);
    if (coaId === 2) {
      if (saberXP < 25) {
        setSaberXP(25);
      }
    }
  };

  // Tab 2 OPSEC Handler
  const handleToggleOpsecOrder = (actionText: string) => {
    setOpsecInput((prev) => {
      if (prev.includes(actionText)) {
        return prev.filter((x) => x !== actionText);
      } else {
        return [...prev, actionText];
      }
    });
    setOpsecFeedback({
      msg: 'Establezca la prioridad de los procedimientos tácticos y luego presione Validar.',
      type: 'idle'
    });
  };

  const handleValidateOpsec = () => {
    const isCorrect =
      opsecInput[0]?.startsWith('A.') &&
      opsecInput[1]?.startsWith('B.') &&
      opsecInput[2]?.startsWith('C.');

    if (isCorrect) {
      setOpsecValidated(true);
      setHacerXP((prev) => Math.min(50, prev + 25));
      setOpsecRisk(15);
      setOpsecFeedback({
        msg: '¡Medidas OPSEC validadas con éxito! Ha reducido la huella radioeléctrica y electromagnética del Ejército de Bolivia.',
        type: 'success'
      });
    } else {
      setOpsecFeedback({
        msg: 'Falla de Seguridad. El desorden en las medidas permite que la contrainteligencia enemiga triangule nuestras coordenadas tácticas.',
        type: 'error'
      });
    }
  };

  // Tab 3 ECEME Handler
  const handleEvaluateEcemeMatrix = (s1: string, s2: string, s3: string, s4: string) => {
    setEcemeSel1(s1);
    setEcemeSel2(s2);
    setEcemeSel3(s3);
    setEcemeSel4(s4);

    if (s1 === 'scada' && s2 === 'abandono' && s3 === 'digital' && s4 === 'paralisis') {
      setEcemeValidated(true);
      setSaberXP(50);
      setScadaRisk(10);
    } else {
      setEcemeValidated(false);
    }
  };

  // Tab 4 Chat Dialogue Handler
  const handleSendChat = () => {
    const text = chatInput.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      author: 'ANALISTA DE DEFENSA',
      text,
      type: 'user'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      processDialogueEvaluation(text.toLowerCase());
    }, 600);
  };

  const processDialogueEvaluation = (lowerText: string) => {
    if (simStep === 0) {
      const hasGeo = lowerText.includes('sanitiz') || lowerText.includes('exif');
      const hasScada = lowerText.includes('airgap') || lowerText.includes('aislamiento') || lowerText.includes('segregacion');

      if (hasGeo && hasScada) {
        const reply: ChatMessage = {
          id: `ai-${Date.now()}`,
          author: 'TUTOR LISA (CYBER-RED)',
          text: 'Correcto. El aislamiento SCADA (Air-Gap) evita el control malicioso externo, mientras que la sanitización EXIF deniega las coordenadas geográficas de la artillería. Siguiente escenario de crisis: El enemigo realiza un barrido SIGINT masivo en el frente norte. ¿Qué contramedida de comunicaciones aplica de inmediato?',
          type: 'ai'
        };
        setChatMessages((prev) => [...prev, reply]);
        setHacerXP((prev) => Math.min(50, prev + 15));
        setSimStep(1);
      } else {
        const reply: ChatMessage = {
          id: `red-${Date.now()}`,
          author: 'TUTOR LISA (CYBER-RED)',
          text: 'Vulnerable. Sus directivas no aseguran las variables críticas. Debe sanitizar metadatos de coordenadas y aplicar un aislamiento riguroso (Air-Gap) a la red SCADA.',
          type: 'red'
        };
        setChatMessages((prev) => [...prev, reply]);
      }
    } else if (simStep === 1) {
      const hasEmcon =
        lowerText.includes('emcon') ||
        lowerText.includes('silencio') ||
        lowerText.includes('espectro') ||
        lowerText.includes('frecuencia');

      if (hasEmcon) {
        const reply: ChatMessage = {
          id: `ai-${Date.now()}`,
          author: 'TUTOR LISA (CYBER-RED)',
          text: 'Excelente. Aplicar EMCON y rotación de espectro/salto de frecuencias neutraliza el barrido de triangulación. Ha superado con distinción académica todas las fases de Resiliencia Tecnológica de la CVIE.',
          type: 'ai'
        };
        setChatMessages((prev) => [...prev, reply]);
        setHacerXP(50);
        setResilienceScore(100);
        setIsFinalCertified(true);
      } else {
        const reply: ChatMessage = {
          id: `red-${Date.now()}`,
          author: 'TUTOR LISA (CYBER-RED)',
          text: 'Grave error. Sin silencio EMCON o rotación dinámica, el adversario triangulará la posición del Comando Táctico en segundos.',
          type: 'red'
        };
        setChatMessages((prev) => [...prev, reply]);
      }
    }
  };

  const triggerPrint = () => {
    safePrint();
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-4 text-slate-100"
    >
      {/* Container Box matching user code specifications */}
      <div className="max-w-[1600px] w-full mx-auto my-auto bg-[#070d1e] border border-[#162a56] rounded-lg overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
        
        {/* TOP OPERATIONAL BAR */}
        <header className="bg-[#040816] border-b-2 border-[#162a56] px-4 sm:px-6 py-3.5 flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-[#00ffff]/10 border border-[#00ffff] text-[#00ffff] font-mono text-xs px-2.5 py-1 rounded tracking-wider uppercase">
              CVIE FASE III // RESILIENCIA TECNOLÓGICA
            </span>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white leading-snug">
                Gestión de Riesgo, Ciberdefensa y Análisis de Amenazas (Doctrina ECEME)
              </h1>
              <p className="text-[11px] text-[#64748b]">
                Modelo EM-MI-AA-02 // Seguridad de Operaciones OPSEC [Ejército de Bolivia]
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-[#00e676] font-bold bg-[#00e676]/10 px-3 py-1.5 rounded border border-[#00e676]/30">
              SISTEMA ACTIVO // XP ACUMULADO: <span className="text-white font-black">{globalXP}</span> / 100
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1.5 hover:bg-slate-800 rounded transition-colors"
                title="Cerrar módulo"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {/* NAVIGATION WINDOW WORKFLOW */}
        <nav className="flex bg-[#030611] border-b border-[#162a56] flex-wrap">
          <button
            onClick={() => setActiveTab(0)}
            className={`flex-1 min-w-[170px] py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 0
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-4 h-4 text-[#00ffff]" />
            <span>1. Ciberinteligencia & OSINT</span>
          </button>

          <button
            onClick={() => setActiveTab(1)}
            className={`flex-1 min-w-[170px] py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 1
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <Shield className="w-4 h-4 text-[#38bdf8]" />
            <span>2. Seguridad de Operaciones (OPSEC)</span>
          </button>

          <button
            onClick={() => setActiveTab(2)}
            className={`flex-1 min-w-[170px] py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 2
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
            <span>3. Análisis de la Amenaza (ECEME)</span>
          </button>

          <button
            onClick={() => setActiveTab(3)}
            className={`flex-1 min-w-[170px] py-3.5 px-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 3
                ? 'text-[#00ffff] border-b-[#00ffff] bg-[#00ffff]/5'
                : 'text-[#64748b] border-b-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <Radio className="w-4 h-4 text-[#00e676]" />
            <span>4. Resiliencia & Evaluación Sumativa</span>
          </button>
        </nav>

        {/* WINDOW 1: CIBERINTELIGENCIA ESTRATÉGICA & OSINT */}
        {activeTab === 0 && (
          <section className="p-4 sm:p-6 min-h-[560px] animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
              <div>
                <div className="bg-[#0c152b] border border-[#162a56] rounded-md p-4 mb-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-3 pb-1.5 border-b border-[#162a56]">
                    ASESORAMIENTO AL ESCALÓN SUPERIOR (PLANIFICACIÓN DE OPERACIONES)
                  </div>
                  <p className="text-xs text-[#94a3b8] mb-3">
                    Con base en el análisis de la amenaza asimétrica, diseñe su recomendación formal para el Comando Conjunto evaluando el impacto sobre el Poder Militar.
                  </p>

                  <strong className="text-xs text-[#00ffff] block mb-2 font-mono">Escenario Operacional:</strong>
                  <p className="text-xs text-[#cbd5e1] mb-4 bg-black/30 p-3 rounded border-l-4 border-[#00ffff] leading-relaxed">
                    <strong className="text-white">Riesgo en Zonas Fronterizas:</strong> El adversario emplea operaciones psicológicas sintéticas en redes (OSINT) y barridos electromagnéticos hostiles (SIGINT) para perturbar el dispositivo y despliegue del Ejército de Bolivia.
                  </p>

                  <div className="space-y-2.5">
                    {/* COA 1 */}
                    <div
                      onClick={() => handleSelectCOA(1)}
                      className={`p-3 rounded-md border cursor-pointer transition-all ${
                        selectedCOA === 1
                          ? 'border-[#ff0055] bg-[#ff0055]/10'
                          : 'border-[#162a56] bg-white/[0.02] hover:border-[#00ffff] hover:bg-[#00ffff]/5'
                      }`}
                    >
                      <strong className="text-xs text-white block">
                        COA 1: Movilización inmediata de blindados en el eje vial central y difusión de desmentidos públicos abiertos.
                      </strong>
                      <p className="text-[11px] text-[#94a3b8] mt-1">
                        Elevada firma electromagnética táctica; alta exposición a interceptación y vulnerabilidad de coordenadas GPS.
                      </p>
                    </div>

                    {/* COA 2 (Recommended) */}
                    <div
                      onClick={() => handleSelectCOA(2)}
                      className={`p-3 rounded-md border cursor-pointer transition-all ${
                        selectedCOA === 2
                          ? 'border-[#00e676] bg-[#00e676]/10'
                          : 'border-[#162a56] bg-white/[0.02] hover:border-[#00ffff] hover:bg-[#00ffff]/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-white block">
                          COA 2: Implementación de encriptación rotativa (llaves de 12H), control estricto de emisiones EMCON y contramedidas radioeléctricas pasivas.
                        </strong>
                        {selectedCOA === 2 && <Check className="w-4 h-4 text-[#00e676] shrink-0" />}
                      </div>
                      <p className="text-[11px] text-[#94a3b8] mt-1">
                        Eleva la resiliencia en redes tácticas militares y deniega indicios de geolocalización al oponente asimétrico.
                      </p>
                    </div>

                    {/* COA 3 */}
                    <div
                      onClick={() => handleSelectCOA(3)}
                      className={`p-3 rounded-md border cursor-pointer transition-all ${
                        selectedCOA === 3
                          ? 'border-[#ff0055] bg-[#ff0055]/10'
                          : 'border-[#162a56] bg-white/[0.02] hover:border-[#00ffff] hover:bg-[#00ffff]/5'
                      }`}
                    >
                      <strong className="text-xs text-white block">
                        COA 3: Desconexión total de radioenlaces tácticos en el Comando Fronterizo de manera permanente.
                      </strong>
                      <p className="text-[11px] text-[#94a3b8] mt-1">
                        Provoca parálisis operativa autoinfligida por falta de comunicaciones C4ISR.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#091228] border border-[#162a56] rounded-md p-3.5">
                  <div className="font-mono text-xs text-[#00ffff] mb-1 font-bold">
                    ESTADO DE LA RECOMENDACIÓN ESTRATÉGICA:
                  </div>
                  {selectedCOA === null && (
                    <p className="text-xs font-semibold text-slate-400">
                      Seleccione un Curso de Acción para el Escalón Superior.
                    </p>
                  )}
                  {selectedCOA === 2 && (
                    <p className="text-xs font-bold text-[#00e676]">
                      COA 2 Seleccionado: Recomendación aprobada (+25 XP Saber). El control estricto EMCON y encriptación rotativa conserva el Poder Militar frente al barrido hostil.
                    </p>
                  )}
                  {selectedCOA !== null && selectedCOA !== 2 && (
                    <p className="text-xs font-bold text-[#ff0055]">
                      COA Crítico: Altamente vulnerable al fuego de contrabatería electromagnética del adversario.
                    </p>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-[#ff0055]/10 border border-[#ff0055] p-3 rounded-md text-center mb-4">
                  <div className="text-[11px] font-mono text-slate-300 mb-1 flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#ff0055]" />
                    TIEMPO LÍMITE DE ASESORAMIENTO:
                  </div>
                  <div className="font-mono text-2xl font-bold text-[#ff0055]">
                    {formatTime(w1Timer)}
                  </div>
                </div>

                <div className="bg-[#0c152b] border border-[#162a56] rounded-md p-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-2 pb-1 border-b border-[#162a56]">
                    PODER MILITAR COMPONENTE
                  </div>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    El Poder Militar, como parte del Poder Nacional, es concebido y aplicado para la conservación de la soberanía nacional y la integridad territorial. Las operaciones tácticas exigen resiliencia e inteligencia oportuna frente a agresiones híbridas.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* WINDOW 2: SEGURIDAD DE OPERACIONES (OPSEC) */}
        {activeTab === 1 && (
          <section className="p-4 sm:p-6 min-h-[560px] animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
              <div>
                <div className="bg-[#0c152b] border border-[#162a56] rounded-md p-4 mb-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-3 pb-1.5 border-b border-[#162a56]">
                    PROCEDIMIENTOS DE MEDIDAS OPSEC
                  </div>
                  <p className="text-xs text-[#94a3b8] mb-3">
                    Estructure secuencialmente las directrices obligatorias de contrainteligencia de acuerdo con el protocolo boliviano de seguridad de transmisiones.
                  </p>

                  <div className="space-y-2.5">
                    {/* Item A */}
                    <div
                      onClick={() => handleToggleOpsecOrder('A. Sanitización de metadatos GPS (EXIF) en imágenes GEOINT.')}
                      className={`p-3 rounded-md border cursor-pointer transition-all ${
                        opsecInput.includes('A. Sanitización de metadatos GPS (EXIF) en imágenes GEOINT.')
                          ? 'border-[#00e676] bg-[#00e676]/10'
                          : 'border-[#162a56] bg-white/[0.02] hover:border-[#00ffff] hover:bg-[#00ffff]/5'
                      }`}
                    >
                      <b className="text-xs text-[#00ffff]">Procedimiento A:</b>{' '}
                      <span className="text-xs text-slate-200">
                        Sanitizar y eliminar metadatos lógicos GPS (EXIF) en imágenes satelitales GEOINT.
                      </span>
                    </div>

                    {/* Item B */}
                    <div
                      onClick={() => handleToggleOpsecOrder('B. Aplicar silencio EMCON radioeléctrico en el Comando Táctico.')}
                      className={`p-3 rounded-md border cursor-pointer transition-all ${
                        opsecInput.includes('B. Aplicar silencio EMCON radioeléctrico en el Comando Táctico.')
                          ? 'border-[#00e676] bg-[#00e676]/10'
                          : 'border-[#162a56] bg-white/[0.02] hover:border-[#00ffff] hover:bg-[#00ffff]/5'
                      }`}
                    >
                      <b className="text-xs text-[#00ffff]">Procedimiento B:</b>{' '}
                      <span className="text-xs text-slate-200">
                        Iniciar estricto Control de Emisiones (EMCON) para neutralizar barridos de triangulación hostiles.
                      </span>
                    </div>

                    {/* Item C */}
                    <div
                      onClick={() => handleToggleOpsecOrder('C. Ejecutar salto de frecuencias cifrado cada 12 horas.')}
                      className={`p-3 rounded-md border cursor-pointer transition-all ${
                        opsecInput.includes('C. Ejecutar salto de frecuencias cifrado cada 12 horas.')
                          ? 'border-[#00e676] bg-[#00e676]/10'
                          : 'border-[#162a56] bg-white/[0.02] hover:border-[#00ffff] hover:bg-[#00ffff]/5'
                      }`}
                    >
                      <b className="text-xs text-[#00ffff]">Procedimiento C:</b>{' '}
                      <span className="text-xs text-slate-200">
                        Forzar salto cíclico de frecuencias y rotación criptográfica simétrica.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#091228] border border-[#162a56] rounded-md p-4">
                  <div className="font-mono text-xs text-[#00ffff] mb-1 font-bold">
                    PROTOCOLO OPSEC ESTABLECIDO:
                  </div>
                  {opsecInput.length === 0 ? (
                    <p className="text-xs italic text-slate-400">
                      Establezca la prioridad de los procedimientos tácticos haciendo clic en ellos.
                    </p>
                  ) : (
                    <div className="text-xs space-y-1 my-2">
                      <strong className="text-[#38bdf8] block">Secuencia seleccionada:</strong>
                      {opsecInput.map((step, idx) => (
                        <div key={idx} className="text-slate-300 font-mono text-[11px]">
                          {idx + 1}. {step}
                        </div>
                      ))}
                    </div>
                  )}

                  {opsecFeedback.type !== 'idle' && (
                    <div
                      className={`p-2 rounded mt-2 text-xs font-bold ${
                        opsecFeedback.type === 'success'
                          ? 'bg-[#00e676]/15 text-[#00e676] border border-[#00e676]/40'
                          : 'bg-[#ff0055]/15 text-[#ff0055] border border-[#ff0055]/40'
                      }`}
                    >
                      {opsecFeedback.msg}
                    </div>
                  )}

                  {opsecInput.length > 0 && !opsecValidated && (
                    <button
                      onClick={handleValidateOpsec}
                      className="mt-3 bg-[#00e676] hover:bg-[#059669] text-black font-mono text-xs font-bold px-4 py-2 rounded transition-colors"
                    >
                      Validar Medidas OPSEC (+25 XP)
                    </button>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-[#ff0055]/10 border border-[#ff0055] p-3 rounded-md text-center mb-4">
                  <div className="text-[11px] font-mono text-slate-300 mb-1 flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#ff0055]" />
                    TIEMPO DE IMPLEMENTACIÓN:
                  </div>
                  <div className="font-mono text-2xl font-bold text-[#ff0055]">
                    {formatTime(w2Timer)}
                  </div>
                </div>

                <div className="bg-[#0c152b] border border-[#162a56] rounded-md p-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-2 pb-1 border-b border-[#162a56]">
                    MEDIDAS DE CONTRA-ESPIONAJE
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    Las medidas de contrainteligencia táctica, de acuerdo con la doctrina de la Escuela de Comando y Estado Mayor, protegen la confidencialidad de la fuerza y neutralizan las capacidades SIGINT/IMINT del oponente en el teatro de operaciones.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* WINDOW 3: METODOLOGÍA DE ANÁLISIS DE LA AMENAZA (ECEME) */}
        {activeTab === 2 && (
          <section className="p-4 sm:p-6 min-h-[560px] animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
              <div>
                <div className="bg-[#0c152b] border border-[#162a56] rounded-md p-4 mb-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-3 pb-1.5 border-b border-[#162a56]">
                    LIENZO OPERATIVO EM-MI-AA-02: ANÁLISIS DE LA AMENAZA
                  </div>
                  <p className="text-xs text-[#94a3b8] mb-3">
                    Sustituya los modelos convencionales y estructure la matriz oficial de la ECEME para evaluar las vulnerabilidades, riesgos y predicciones frente a ataques no tradicionales.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mt-3">
                    {/* Bloque 1: Amenaza */}
                    <div
                      className={`bg-[#091228] border rounded-md p-3.5 min-h-[160px] flex flex-col justify-between relative transition-all ${
                        ecemeValidated ? 'border-[#00e676] bg-[#00e676]/5' : 'border-[#162a56]'
                      }`}
                    >
                      <span className="absolute top-2.5 right-3 font-mono text-xs text-[#64748b]">01</span>
                      <div>
                        <strong className="text-xs text-[#00ffff] block mb-1">La Amenaza Híbrida</strong>
                        <span className="text-[11px] text-[#94a3b8] block leading-tight">
                          Definición de Actores, Intenciones y Capacidades
                        </span>
                      </div>
                      <select
                        value={ecemeSel1}
                        onChange={(e) => handleEvaluateEcemeMatrix(e.target.value, ecemeSel2, ecemeSel3, ecemeSel4)}
                        className="bg-[#030611] border border-[#162a56] text-white p-2 rounded w-full text-xs cursor-pointer mt-2.5 focus:border-[#00ffff] focus:outline-hidden"
                      >
                        <option value="none">-- Seleccionar --</option>
                        <option value="scada">Sabotaje SCADA a Energía / Espionaje SIGINT</option>
                        <option value="fuerzas">Incursión de Infantería Pesada</option>
                      </select>
                    </div>

                    {/* Bloque 2: Vulnerabilidades */}
                    <div
                      className={`bg-[#091228] border rounded-md p-3.5 min-h-[160px] flex flex-col justify-between relative transition-all ${
                        ecemeValidated ? 'border-[#00e676] bg-[#00e676]/5' : 'border-[#162a56]'
                      }`}
                    >
                      <span className="absolute top-2.5 right-3 font-mono text-xs text-[#64748b]">02</span>
                      <div>
                        <strong className="text-xs text-[#f59e0b] block mb-1">Vulnerabilidad y Riesgo</strong>
                        <span className="text-[11px] text-[#94a3b8] block leading-tight">
                          Debilidades en el Estado y Sistemas del País
                        </span>
                      </div>
                      <select
                        value={ecemeSel2}
                        onChange={(e) => handleEvaluateEcemeMatrix(ecemeSel1, e.target.value, ecemeSel3, ecemeSel4)}
                        className="bg-[#030611] border border-[#162a56] text-white p-2 rounded w-full text-xs cursor-pointer mt-2.5 focus:border-[#f59e0b] focus:outline-hidden"
                      >
                        <option value="none">-- Seleccionar --</option>
                        <option value="abandono">Falta de protección en SCADA / Enlaces desguarnecidos</option>
                        <option value="moral">Baja moral en reclutamiento convencional</option>
                      </select>
                    </div>

                    {/* Bloque 3: Tendencias */}
                    <div
                      className={`bg-[#091228] border rounded-md p-3.5 min-h-[160px] flex flex-col justify-between relative transition-all ${
                        ecemeValidated ? 'border-[#00e676] bg-[#00e676]/5' : 'border-[#162a56]'
                      }`}
                    >
                      <span className="absolute top-2.5 right-3 font-mono text-xs text-[#64748b]">03</span>
                      <div>
                        <strong className="text-xs text-[#c084fc] block mb-1">Tendencias en Bolivia</strong>
                        <span className="text-[11px] text-[#94a3b8] block leading-tight">
                          Dirección del cambio en el Estado Plurinacional
                        </span>
                      </div>
                      <select
                        value={ecemeSel3}
                        onChange={(e) => handleEvaluateEcemeMatrix(ecemeSel1, ecemeSel2, e.target.value, ecemeSel4)}
                        className="bg-[#030611] border border-[#162a56] text-white p-2 rounded w-full text-xs cursor-pointer mt-2.5 focus:border-[#c084fc] focus:outline-hidden"
                      >
                        <option value="none">-- Seleccionar --</option>
                        <option value="digital">Incremento sostenido de agresiones en infraestructura clave</option>
                        <option value="conv">Equilibrio armamentístico regional de artillería</option>
                      </select>
                    </div>

                    {/* Bloque 4: Predicción */}
                    <div
                      className={`bg-[#091228] border rounded-md p-3.5 min-h-[160px] flex flex-col justify-between relative transition-all ${
                        ecemeValidated ? 'border-[#00e676] bg-[#00e676]/5' : 'border-[#162a56]'
                      }`}
                    >
                      <span className="absolute top-2.5 right-3 font-mono text-xs text-[#64748b]">04</span>
                      <div>
                        <strong className="text-xs text-[#ff0055] block mb-1">Predicción Táctica</strong>
                        <span className="text-[11px] text-[#94a3b8] block leading-tight">
                          Impacto proyectado a mediano/corto plazo
                        </span>
                      </div>
                      <select
                        value={ecemeSel4}
                        onChange={(e) => handleEvaluateEcemeMatrix(ecemeSel1, ecemeSel2, ecemeSel3, e.target.value)}
                        className="bg-[#030611] border border-[#162a56] text-white p-2 rounded w-full text-xs cursor-pointer mt-2.5 focus:border-[#ff0055] focus:outline-hidden"
                      >
                        <option value="none">-- Seleccionar --</option>
                        <option value="paralisis">Parálisis estratégica si no se aíslan las redes (Air-Gap)</option>
                        <option value="asimetria">Derrota táctica convencional en el frente</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-[#091228] border border-[#162a56] rounded-md p-4">
                  <div className="font-mono text-xs text-[#00ffff] mb-1 font-bold">
                    VERIFICACIÓN DOCTRINARIA DE LA MATRIZ DE AMENAZA:
                  </div>
                  {ecemeValidated ? (
                    <p className="text-xs font-bold text-[#00e676] leading-relaxed">
                      <strong>Modelo EM-MI-AA-02 Validado (+25 XP Saber):</strong> Su modelado de la amenaza híbrida identifica correctamente las intenciones y capacidades del oponente frente a nuestras vulnerabilidades lógicas.
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400 italic">
                      Configure los 4 parámetros caracterizadores del modelo EM-MI-AA-02 de la ECEME para validar la doctrina.
                    </p>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-[#ff0055]/10 border border-[#ff0055] p-3 rounded-md text-center mb-4">
                  <div className="text-[11px] font-mono text-slate-300 mb-1 flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#ff0055]" />
                    TIEMPO DE MODELADO DE AMENAZAS:
                  </div>
                  <div className="font-mono text-2xl font-bold text-[#ff0055]">
                    {formatTime(w3Timer)}
                  </div>
                </div>

                <div className="bg-[#0c152b] border border-[#162a56] rounded-md p-4">
                  <div className="text-sm font-bold text-[#00ffff] font-mono mb-2 pb-1 border-b border-[#162a56]">
                    MÉTODO EM-MI-AA-02
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    El análisis sistemático de la amenaza de la Escuela de Comando y Estado Mayor desglosa el problema asimétrico correlacionando los <strong>Actores, Intenciones y Capacidades</strong> con las <strong>Vulnerabilidades y Riesgos</strong> estructurales del Estado, formulando predicciones de estricto rigor metodológico.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* WINDOW 4: RESILIENCIA & EVALUACIÓN SUMATIVA */}
        {activeTab === 3 && (
          <section className="p-4 sm:p-6 min-h-[560px] animate-fadeIn">
            <div className="mb-4">
              <h2 className="text-base font-bold text-white">Resiliencia ante Amenazas No Tradicionales y Certificación Final</h2>
              <p className="text-xs text-[#94a3b8]">
                Defienda sus decisiones analíticas basadas en el Poder Militar y la metodología oficial de la ECEME frente al Red Team.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
              {/* Chat Interface */}
              <div className="flex flex-col h-[460px] bg-[#02040b] border border-[#162a56] rounded-md overflow-hidden">
                <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-2.5">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2.5 px-3 rounded-md text-xs leading-relaxed max-w-[85%] ${
                        msg.type === 'ai'
                          ? 'bg-[#0f1c3a] border-l-4 border-[#00ffff] self-start text-slate-200'
                          : msg.type === 'red'
                          ? 'bg-[#ff0055]/15 border-l-4 border-[#ff0055] self-start text-[#ff4d6d]'
                          : 'bg-[#1c335e] self-end text-white'
                      }`}
                    >
                      <strong className="font-bold block text-[11px] mb-0.5 opacity-90">{msg.author}:</strong>
                      <span>{msg.text}</span>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="flex p-2 bg-[#050a17] border-t border-[#162a56] gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="Escriba su curso de acción (ej. Air-Gap, sanitización EXIF, EMCON)..."
                    className="flex-1 bg-[#02040b] border border-[#162a56] rounded px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-[#00ffff]"
                  />
                  <button
                    onClick={handleSendChat}
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-mono text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar</span>
                  </button>
                </div>
              </div>

              {/* Radar and Scorecard generation */}
              <div>
                <div className="bg-[#0c152b] border border-[#162a56] rounded-md p-3.5 mb-4">
                  <div className="text-xs font-bold text-white mb-2.5 font-mono">
                    INDICADORES COGNITIVOS DE AMENAZA
                  </div>

                  {/* SCADA metric */}
                  <div className="mb-2.5">
                    <div className="flex justify-between text-[11px] text-[#94a3b8] mb-1 font-mono">
                      <span>Riesgo en Infraestructura (SCADA)</span>
                      <span className={scadaRisk <= 15 ? 'text-[#00e676]' : 'text-[#ff0055]'}>
                        {scadaRisk <= 15 ? 'Mitigado (10%)' : 'Crítica (90%)'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#0b1122] rounded overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${scadaRisk <= 15 ? 'bg-[#00e676]' : 'bg-[#ff0055]'}`}
                        style={{ width: `${scadaRisk}%` }}
                      />
                    </div>
                  </div>

                  {/* OPSEC metric */}
                  <div className="mb-2.5">
                    <div className="flex justify-between text-[11px] text-[#94a3b8] mb-1 font-mono">
                      <span>Exposición de Datos (OPSEC)</span>
                      <span className={opsecRisk <= 20 ? 'text-[#00e676]' : 'text-[#ff0055]'}>
                        {opsecRisk <= 20 ? 'Baja (15%)' : 'Alta (80%)'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#0b1122] rounded overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${opsecRisk <= 20 ? 'bg-[#00e676]' : 'bg-[#ff0055]'}`}
                        style={{ width: `${opsecRisk}%` }}
                      />
                    </div>
                  </div>

                  {/* Resilience metric */}
                  <div className="mb-2">
                    <div className="flex justify-between text-[11px] text-[#94a3b8] mb-1 font-mono">
                      <span>Coeficiente de Resiliencia Táctica</span>
                      <span className={resilienceScore >= 80 ? 'text-[#00e676]' : 'text-[#00ffff]'}>
                        {resilienceScore >= 80 ? 'Excelente (100%)' : `${resilienceScore}%`}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#0b1122] rounded overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${resilienceScore >= 80 ? 'bg-[#00e676]' : 'bg-[#00ffff]'}`}
                        style={{ width: `${resilienceScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Button to Generate Scorecard */}
                {isFinalCertified && (
                  <button
                    onClick={() => setShowScorecard(true)}
                    className="w-full bg-[#00e676] hover:bg-[#059669] text-black font-mono font-bold text-xs p-3.5 rounded flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,230,118,0.3)] animate-bounce"
                  >
                    <Award className="w-4 h-4" />
                    <span>🎖️ Generar Boleta de Calificación CVIE</span>
                  </button>
                )}
              </div>
            </div>

            {/* Pre-print Scorecard Viewer */}
            {showScorecard && (
              <div className="mt-5 border border-[#00e676] bg-[#060f24] rounded-md p-4 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-[#162a56] pb-2 mb-3">
                  <h3 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#00e676]" />
                    PREVISUALIZACIÓN DE BOLETA DE CAPACITACIÓN ACADÉMICA
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={triggerPrint}
                      className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-mono text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>🖨️ Imprimir Boleta Táctica</span>
                    </button>
                    {onEnterModule && (
                      <button
                        onClick={onEnterModule}
                        className="bg-[#00e676] hover:bg-[#059669] text-black font-mono text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
                      >
                        <span>Avanzar a Fase IV</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Scorecard Card */}
                <div className="p-5 bg-white text-black rounded max-w-xl mx-auto font-sans shadow-lg">
                  <div className="text-center mb-3 border-b-2 border-black pb-2">
                    <h4 className="text-sm font-bold tracking-wide">ESCUELA DE COMANDO Y ESTADO MAYOR DEL EJÉRCITO</h4>
                    <h5 className="text-xs font-medium text-slate-700">Mcal. Andrés de Santa Cruz</h5>
                    <span className="text-[11px] font-mono text-slate-600 block mt-0.5 font-bold">
                      CVIE - FASE III: RESILIENCIA TECNOLÓGICA
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3 text-slate-800">
                    <div><b>OFICIAL:</b> MY. DEM. EXAMINADO GENERAL</div>
                    <div><b>FECHA:</b> {currentDate}</div>
                    <div><b>NÚCLEO:</b> Gestión de Riesgo y Ciberdefensa</div>
                    <div><b>RESILIENCIA FINAL:</b> <span className="font-bold text-green-700">{globalXP}%</span></div>
                  </div>

                  <table className="w-full border-collapse text-xs mb-3">
                    <thead>
                      <tr className="bg-slate-200 border border-black">
                        <th className="p-2 border border-black text-left">Eje Temático Acreditado</th>
                        <th className="p-2 border border-black text-center">Puntaje (XP)</th>
                        <th className="p-2 border border-black text-center">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-black">
                        <td className="p-2 border border-black">
                          <b>SABER:</b> Ciberinteligencia & OSINT Estratégico (Doctrina ECEME)
                        </td>
                        <td className="p-2 border border-black text-center font-mono">{saberXP} / 50</td>
                        <td className="p-2 border border-black text-center font-bold text-green-700">
                          {saberXP >= 35 ? 'ACREDITADO' : 'PENDIENTE'}
                        </td>
                      </tr>
                      <tr className="border border-black">
                        <td className="p-2 border border-black">
                          <b>HACER:</b> Análisis de la Amenaza & Procedimientos OPSEC
                        </td>
                        <td className="p-2 border border-black text-center font-mono">{hacerXP} / 50</td>
                        <td className="p-2 border border-black text-center font-bold text-green-700">
                          {hacerXP >= 35 ? 'ACREDITADO' : 'PENDIENTE'}
                        </td>
                      </tr>
                      <tr className="bg-slate-100 border border-black font-bold">
                        <td className="p-2 border border-black text-right">NOTA TOTAL INTEGRAL:</td>
                        <td className="p-2 border border-black text-center font-mono">{globalXP} / 100</td>
                        <td className="p-2 border border-black text-center text-green-700">
                          {globalXP >= 75 ? 'CERTIFICACIÓN APROBADA' : 'REPROBADO'}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="text-[10px] border-t border-dashed border-black pt-2 text-center italic text-slate-600">
                    "Seguridad, Resiliencia y Defensa del Territorio Nacional" // Firma Digital CVIE
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

      </div>

      {/* HIDDEN DOCUMENT PRINT TEMPLATE (Activated via window.print()) */}
      <div id="scorecard-print-area" className="hidden">
        <div className="text-center mb-5 border-b-2 border-black pb-3">
          <h2 className="text-xl font-bold">ESTADO PLURINACIONAL DE BOLIVIA</h2>
          <h3 className="text-lg font-semibold">ESCUELA DE COMANDO Y ESTADO MAYOR DEL EJÉRCITO</h3>
          <h4 className="text-base italic">"Mcal. Andrés de Santa Cruz"</h4>
          <p className="font-mono text-xs mt-1">SISTEMA VIRTUAL DE ADIESTRAMIENTO DE INTELIGENCIA DE ESTADO MAYOR (CVIE)</p>
        </div>

        <div className="mb-5 text-sm leading-relaxed">
          <p><b>OFICIAL EVALUADO:</b> MY. DEM. EXAMINADO GENERAL</p>
          <p><b>EVALUACIÓN:</b> FASE III: RESILIENCIA TECNOLÓGICA Y GESTIÓN DE RIESGO (ECEME)</p>
          <p><b>FECHA DE EMISIÓN:</b> {currentDate}</p>
          <p><b>COEFICIENTE DE RESILIENCIA TÁCTICA:</b> {globalXP}%</p>
        </div>

        <table className="w-full border-collapse my-4 text-sm">
          <thead>
            <tr className="bg-slate-100 border border-black">
              <th className="border border-black p-2 text-left">Eje Evaluativo de Competencias</th>
              <th className="border border-black p-2 text-left">Metodología Utilizada</th>
              <th className="border border-black p-2 text-center">Desempeño / Puntos (XP)</th>
              <th className="border border-black p-2 text-center">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-black">
              <td className="border border-black p-2"><b>Dimensión del Saber (Ciberinteligencia & OSINT)</b></td>
              <td className="border border-black p-2">Análisis de Amenazas No Tradicionales y del Poder Militar</td>
              <td className="border border-black p-2 text-center font-mono">{saberXP} / 50 XP</td>
              <td className="border border-black p-2 text-center font-bold">
                {saberXP >= 35 ? 'APROBADO' : 'NO ACREDITADO'}
              </td>
            </tr>
            <tr className="border border-black">
              <td className="border border-black p-2"><b>Dimensión del Hacer (Medidas OPSEC & Ciberdefensa)</b></td>
              <td className="border border-black p-2">Metodología ECEME EM-MI-AA-02 y Aislamiento SCADA</td>
              <td className="border border-black p-2 text-center font-mono">{hacerXP} / 50 XP</td>
              <td className="border border-black p-2 text-center font-bold">
                {hacerXP >= 35 ? 'APROBADO' : 'NO ACREDITADO'}
              </td>
            </tr>
            <tr className="border border-black font-bold bg-slate-100">
              <td colSpan={2} className="border border-black p-2 text-right">CALIFICACIÓN FINAL INTEGRADA:</td>
              <td className="border border-black p-2 text-center font-mono">{globalXP} / 100 XP</td>
              <td className="border border-black p-2 text-center text-green-800">
                {globalXP >= 75 ? 'CERTIFICACIÓN OTORGADA' : 'NO CERTIFICADO'}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-14 flex justify-around text-center text-sm">
          <div>
            <div className="border-t border-black w-48 mx-auto pt-1 font-semibold">Firma del Analista Evaluado</div>
            <span className="text-xs text-slate-600">MY. DEM. EXAMINADO GENERAL</span>
          </div>
          <div>
            <div className="border-t border-black w-48 mx-auto pt-1 font-semibold">Director de Evaluación CVIE</div>
            <span className="text-xs text-slate-600">Escuela de Comando y Estado Mayor</span>
          </div>
        </div>
      </div>
    </div>
  );
}
