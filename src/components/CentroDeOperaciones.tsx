import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Radio, 
  ShieldCheck, 
  Activity, 
  Clock, 
  Globe2, 
  Terminal, 
  Layers, 
  User, 
  Settings as SettingsIcon,
  Bell,
  Search,
  Filter,
  CheckCircle2,
  Play,
  Award,
  BookOpen,
  Cpu,
  Radar,
  Shield,
  Zap,
  Sliders,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Lock,
  ArrowRight,
  Check
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { SimulationGrid } from './SimulationGrid';
import { SituationalAwarenessWidget } from './SituationalAwarenessWidget';
import { OperatorProfile, TrainingPhase } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { OfflineIndicator } from './OfflineIndicator';
import { FaseTeoricaDetalle } from './FaseTeoricaDetalle';
import { FaseCognitivaDetalle } from './FaseCognitivaDetalle';
import { FaseTecnologicaDetalle } from './FaseTecnologicaDetalle';
import { FaseOperativaDetalle } from './FaseOperativaDetalle';
import { CicloInteligenciaDetalle } from './CicloInteligenciaDetalle';
import { DoctrinaMilitarDetalle } from './DoctrinaMilitarDetalle';

interface CentroDeOperacionesProps {
  onLogout: () => void;
  operatorCode?: string;
}

export function CentroDeOperaciones({ onLogout, operatorCode = 'OP-7490-ALFA' }: CentroDeOperacionesProps) {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Modals launched directly from Hubs
  const [showFase1Modal, setShowFase1Modal] = useState(false);
  const [showFase2Modal, setShowFase2Modal] = useState(false);
  const [showFase3Modal, setShowFase3Modal] = useState(false);
  const [showFase4Modal, setShowFase4Modal] = useState(false);
  const [showCicloModal, setShowCicloModal] = useState(false);
  const [showDoctrinaModal, setShowDoctrinaModal] = useState(false);

  // Operator State with Local Storage persistence
  const [operator, setOperator] = useState<OperatorProfile>(() => {
    const saved = localStorage.getItem('cvie_operator_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Error reading saved profile:', e);
      }
    }
    return {
      code: operatorCode || 'OP-7490-ALFA',
      rank: 'MAYOR DE INTELIGENCIA',
      unit: 'ESTADO MAYOR • SECCIÓN II (INTELIGENCIA)',
      clearanceLevel: 'NIVEL 4 (TOP SECRET / RESERVADO)',
      status: 'ONLINE',
      terminalId: 'TER-BOL-994'
    };
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    code: operator.code,
    rank: operator.rank,
    unit: operator.unit
  });

  // Settings State with Local Storage persistence
  const [configSettings, setConfigSettings] = useState(() => {
    const saved = localStorage.getItem('cvie_system_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Error reading saved config:', e);
      }
    }
    return {
      audioAlerts: true,
      highContrastHud: true,
      telemetryRefresh: '4s',
      encryptionProtocol: 'AES-256-MIL-GCM',
      autoSaveTelemetry: true
    };
  });

  const [configFeedback, setConfigFeedback] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toTimeString().split(' ')[0] + ' BOT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...operator,
      code: profileForm.code.trim() || operator.code,
      rank: profileForm.rank.trim() || operator.rank,
      unit: profileForm.unit.trim() || operator.unit
    };
    setOperator(updated);
    localStorage.setItem('cvie_operator_profile', JSON.stringify(updated));
    setIsEditingProfile(false);
    showConfigToast('Hoja de servicio actualizada correctamente');
  };

  const toggleConfig = (key: keyof typeof configSettings) => {
    const updated = {
      ...configSettings,
      [key]: typeof configSettings[key] === 'boolean' ? !configSettings[key] : configSettings[key]
    };
    setConfigSettings(updated);
    localStorage.setItem('cvie_system_config', JSON.stringify(updated));
    showConfigToast('Configuración sincronizada');
  };

  const showConfigToast = (msg: string) => {
    setConfigFeedback(msg);
    setTimeout(() => setConfigFeedback(null), 3000);
  };

  const handleClearCache = () => {
    localStorage.removeItem('cvie_intelligence_cycle_xp');
    localStorage.removeItem('cvie_cams_claimed');
    localStorage.removeItem('cvie_quiz_passed');
    showConfigToast('Caché y datos locales del simulador restablecidos');
  };

  const getTabTitle = () => {
    switch (currentTab) {
      case 'fases': return 'FASES DE INSTRUCCIÓN DOCTRINARIA';
      case 'simulaciones': return 'CENTRO DE SIMULACIÓN MULTIDOMINIO';
      case 'perfil': return 'HOJA DE SERVICIO DEL OPERADOR';
      case 'configuraciones': return 'CONFIGURACIÓN Y PARÁMETROS DEL SISTEMA';
      default: return 'CENTRO DE OPERACIONES MULTIDOMINIO';
    }
  };

  const getTabBreadcrumb = () => {
    switch (currentTab) {
      case 'fases': return 'FASES DE INSTRUCCIÓN';
      case 'simulaciones': return 'SIMULACIONES TÁCTICAS';
      case 'perfil': return 'PERFIL DEL OPERADOR';
      case 'configuraciones': return 'CONFIGURACIONES';
      default: return 'CENTRO DE OPERACIONES';
    }
  };

  return (
    <div className="min-h-screen w-full tactical-emerald-bg text-[#d1ded9] font-sans flex flex-col relative overflow-x-hidden selection:bg-[#20523a] selection:text-[#a7f3d0]">
      
      {/* Background Image Layer */}
      <div 
        className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat opacity-[0.20] filter contrast-125 brightness-90 saturate-75 mix-blend-luminosity"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/d/1J1GAxXx4uZDkoayKNNyBXZL2NHV4011r'), url('https://drive.google.com/thumbnail?id=1J1GAxXx4uZDkoayKNNyBXZL2NHV4011r&sz=w2560')`
        }}
      />

      {/* Global Vignette */}
      <div className="pointer-events-none fixed inset-0 security-vignette" />

      {/* Top Security Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#10b981] to-transparent opacity-80 z-50" />

      {/* Main Structural Layout: Sidebar + Main Content */}
      <div className="flex-1 flex relative z-10">
        
        {/* Left Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onLogout={onLogout}
          operator={operator}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Bar for Main Area */}
          <header className="sticky top-0 z-30 bg-[#04130e]/95 border-b border-[#143e2b] px-4 sm:px-6 lg:px-8 py-3.5 backdrop-blur-md flex items-center justify-between gap-4">
            
            {/* Mobile Menu Toggle & Breadcrumbs */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 bg-[#071f15] border border-[#1d593c] text-[#86efac] rounded-xs cursor-pointer hover:bg-[#0d2e20]"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#66917e] uppercase">
                  <span>CAMPUS VIRTUAL</span>
                  <span>/</span>
                  <span className="text-[#34d399] font-bold">{getTabBreadcrumb()}</span>
                </div>
                <h1 className="font-heading text-lg sm:text-2xl font-bold text-white uppercase tracking-wider leading-none pt-0.5">
                  {getTabTitle()}
                </h1>
              </div>
            </div>

            {/* Right Telemetry Information & Download PWA Button */}
            <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-mono">
              <PWAInstallButton variant="header" />

              <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-[#071f14] border border-[#194c34] rounded-xs text-[#9acbb4]">
                <Clock className="w-3.5 h-3.5 text-[#34d399]" />
                <span>{currentTime || '14:40:00 BOT'}</span>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#071f14] border border-[#194c34] rounded-xs text-[#facc15]">
                <span className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse" />
                <span className="font-bold">RED CIFRADA MIL-COM</span>
              </div>
            </div>
          </header>

          {/* Toast Notification */}
          {configFeedback && (
            <div className="bg-[#10b981] text-[#022c1d] px-4 py-2 font-mono text-xs font-bold flex items-center justify-between transition-all animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{configFeedback}</span>
              </div>
              <button 
                onClick={() => setConfigFeedback(null)}
                className="text-[#022c1d] hover:text-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Body Content Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
            
            {/* ========================================================================= */}
            {/* TAB: DASHBOARD PRINCIPAL                                                 */}
            {/* ========================================================================= */}
            {currentTab === 'dashboard' && (
              <>
                {/* Operations Header Banner */}
                <div className="relative bg-[#051811]/90 border border-[#194b34] rounded-xs p-4 sm:p-5 backdrop-blur-md overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xs bg-[#0b291d] border border-[#23704b] flex items-center justify-center text-[#34d399] shrink-0 shadow-inner">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[10px] text-[#facc15] font-bold tracking-widest uppercase">
                        <span>ESTADO GENERAL DEL SISTEMA</span>
                        <span className="text-[#55816e]">•</span>
                        <span className="text-[#86efac]">DEFCON 3 (VIGILANCIA REFORZADA)</span>
                      </div>
                      <h2 className="font-heading text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                        PANEL DE ENTRENAMIENTO Y VIGILANCIA ESTRATÉGICA
                      </h2>
                      <p className="text-xs text-[#8cb0a1]">
                        Acceda a los módulos formativos secuenciales o supervise la telemetría del proyecto nacional activo.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0 font-mono text-[11px]">
                    <span className="px-3 py-1.5 bg-[#09271c] border border-[#1d6342] text-[#86efac] rounded-xs font-semibold">
                      OPERADOR: {operator.code}
                    </span>
                  </div>
                </div>

                {/* 1. Módulos de Simulación (Grid Central con las 4 Fases) */}
                <section id="simulation-modules-section">
                  <SimulationGrid />
                </section>

                {/* 2. Panel de Conciencia Situacional (Widget Inferior) */}
                <section id="situational-awareness-section">
                  <SituationalAwarenessWidget />
                </section>
              </>
            )}

            {/* ========================================================================= */}
            {/* TAB: FASES DE INSTRUCCIÓN (Nivelación Doctrinaria y Metodológica)         */}
            {/* ========================================================================= */}
            {currentTab === 'fases' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Header Banner */}
                <div className="bg-[#051811]/95 border border-[#1d5c3f] rounded-xs p-5 sm:p-6 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xs bg-[#092a1c] border border-[#2b865a] flex items-center justify-center text-[#34d399] shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-[#facc15] font-bold tracking-widest uppercase flex items-center gap-2">
                        <span>PROGRAMA ACADÉMICO MILITAR</span>
                        <span className="text-[#3c6b56]">•</span>
                        <span className="text-[#86efac]">DOCTRINA ECEME</span>
                      </div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                        FASES FORMATIVAS Y NIVELACIÓN DOCTRINARIA
                      </h2>
                      <p className="text-xs text-[#8cb0a1] max-w-3xl mt-1">
                        Estructura curricular de 4 niveles progresivos: Fundamentación Teórica, Entrenamiento Cognitivo, Resiliencia Tecnológica e Inmersión Operativa en Fronteras.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                    <button
                      onClick={() => setShowDoctrinaModal(true)}
                      className="px-4 py-2 bg-[#123e2b] hover:bg-[#185338] border border-[#2d8357] text-[#a7f3d0] hover:text-white font-mono text-xs font-bold uppercase rounded-xs cursor-pointer flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(52,211,153,0.15)]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#facc15]" />
                      <span>ABRIR DOCTRINA AVANZADA</span>
                    </button>
                  </div>
                </div>

                {/* Progress Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono text-xs">
                  <div 
                    onClick={() => setShowFase1Modal(true)}
                    className="p-4 bg-[#061c12] border border-[#1a4a34] hover:border-[#34d399] rounded-xs cursor-pointer transition-all group"
                  >
                    <div className="flex justify-between items-center text-[10px] text-[#6b9683] mb-1">
                      <span>FASE I</span>
                      <span className="text-[#34d399] font-bold">100% COMPLETADO</span>
                    </div>
                    <div className="font-bold text-white group-hover:text-[#34d399] text-sm truncate">SOPORTE TEÓRICO</div>
                    <div className="text-[11px] text-[#86a899] mt-1">Sherman Kent, SAT, ACH Heuer</div>
                  </div>

                  <div 
                    onClick={() => setShowFase2Modal(true)}
                    className="p-4 bg-[#061c12] border border-[#1a4a34] hover:border-[#34d399] rounded-xs cursor-pointer transition-all group"
                  >
                    <div className="flex justify-between items-center text-[10px] text-[#6b9683] mb-1">
                      <span>FASE II</span>
                      <span className="text-[#facc15] font-bold">65% EN CURSO</span>
                    </div>
                    <div className="font-bold text-white group-hover:text-[#34d399] text-sm truncate">ENTRENAMIENTO COGNITIVO</div>
                    <div className="text-[11px] text-[#86a899] mt-1">Sesgos, Matriz Morfológica</div>
                  </div>

                  <div 
                    onClick={() => setShowFase3Modal(true)}
                    className="p-4 bg-[#061c12] border border-[#1a4a34] hover:border-[#00e5ff] rounded-xs cursor-pointer transition-all group"
                  >
                    <div className="flex justify-between items-center text-[10px] text-[#6b9683] mb-1">
                      <span>FASE III</span>
                      <span className="text-[#00e5ff] font-bold">25% EN CURSO</span>
                    </div>
                    <div className="font-bold text-white group-hover:text-[#00e5ff] text-sm truncate">RESILIENCIA TECNOLÓGICA</div>
                    <div className="text-[11px] text-[#86a899] mt-1">Ciberdefensa, OPSEC, SCADA</div>
                  </div>

                  <div 
                    onClick={() => setShowFase4Modal(true)}
                    className="p-4 bg-[#061c12] border border-[#1a4a34] hover:border-[#10b981] rounded-xs cursor-pointer transition-all group"
                  >
                    <div className="flex justify-between items-center text-[10px] text-[#6b9683] mb-1">
                      <span>FASE IV</span>
                      <span className="text-[#10b981] font-bold">DISPONIBLE</span>
                    </div>
                    <div className="font-bold text-white group-hover:text-[#10b981] text-sm truncate">INMERSIÓN OPERATIVA</div>
                    <div className="text-[11px] text-[#86a899] mt-1">Sensores ISR, Guerra Híbrida</div>
                  </div>
                </div>

                {/* Embedded Simulation Grid */}
                <section>
                  <SimulationGrid />
                </section>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: SIMULACIONES TÁCTICAS MULTIDOMINIO                                   */}
            {/* ========================================================================= */}
            {currentTab === 'simulaciones' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Header Banner */}
                <div className="bg-[#051811]/95 border border-[#1d5c3f] rounded-xs p-5 sm:p-6 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xs bg-[#092a1c] border border-[#2b865a] flex items-center justify-center text-[#34d399] shrink-0">
                      <Radar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-[#facc15] font-bold tracking-widest uppercase flex items-center gap-2">
                        <span>SIMULACIÓN TÁCTICA MULTIDOMINIO</span>
                        <span className="text-[#3c6b56]">•</span>
                        <span className="text-[#86efac]">CENTRO DE EJECUCIÓN EN VIVO</span>
                      </div>
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                        LABORATORIOS Y SIMULADORES ACTIVOS
                      </h2>
                      <p className="text-xs text-[#8cb0a1] max-w-3xl mt-1">
                        Ejecute escenarios operacionales en tiempo real, análisis heurístico de hipótesis, simulación de crisis y ciberdefensa de infraestructura crítica.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-3 py-1.5 bg-[#0a2f20] border border-[#1f734b] text-[#34d399] font-bold rounded-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                      <span>MOTOR TÁCTICO EN LÍNEA</span>
                    </span>
                  </div>
                </div>

                {/* Quick Simulation Launchers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Card 1: Ciclo de Inteligencia Estratégica (ECEME) */}
                  <div className="bg-[#051a13]/90 border border-[#1b5037] hover:border-[#34d399] rounded-xs p-5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 bg-[#0c3121] text-[#34d399] border border-[#195236] text-[10px] font-mono font-bold rounded-2xs uppercase">
                          DOCTRINA ECEME
                        </span>
                        <Award className="w-4 h-4 text-[#facc15]" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-[#86efac] transition-colors uppercase">
                        CICLO DE PRODUCCIÓN DE INTELIGENCIA
                      </h3>
                      <p className="text-xs text-[#89b19e] mt-2">
                        Simulador del ciclo formal: Planificación y Dirección, Búsqueda, Procesamiento y Difusión. Incluye generación de Boleta de Acreditación PDF.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowCicloModal(true)}
                      className="mt-4 w-full py-2.5 bg-[#0e3825] hover:bg-[#165035] border border-[#27784f] text-white font-mono text-xs font-bold rounded-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(52,211,153,0.1)]"
                    >
                      <Play className="w-3.5 h-3.5 text-[#34d399]" />
                      <span>INICIAR SIMULADOR DE CICLO</span>
                    </button>
                  </div>

                  {/* Card 2: Fase IV Inmersión Operativa */}
                  <div className="bg-[#051a13]/90 border border-[#1b5037] hover:border-[#10b981] rounded-xs p-5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 bg-[#0c3121] text-[#10b981] border border-[#195236] text-[10px] font-mono font-bold rounded-2xs uppercase">
                          OPERACIONES ISR
                        </span>
                        <Radar className="w-4 h-4 text-[#10b981]" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-[#86efac] transition-colors uppercase">
                        FUSIÓN DE SENSORES Y GUERRA HÍBRIDA
                      </h3>
                      <p className="text-xs text-[#89b19e] mt-2">
                        Consola radar en tiempo real para detección de tráfico aéreo ilícito, rutas clandestinas de contrabando y despliegue de patrullas de interdicción.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowFase4Modal(true)}
                      className="mt-4 w-full py-2.5 bg-[#0e3825] hover:bg-[#165035] border border-[#27784f] text-white font-mono text-xs font-bold rounded-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.1)]"
                    >
                      <Play className="w-3.5 h-3.5 text-[#10b981]" />
                      <span>DESPLEGAR RADAR ISR (FASE IV)</span>
                    </button>
                  </div>

                  {/* Card 3: Fase II Entrenamiento Cognitivo & ACH */}
                  <div className="bg-[#051a13]/90 border border-[#1b5037] hover:border-[#34d399] rounded-xs p-5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 bg-[#0c3121] text-[#34d399] border border-[#195236] text-[10px] font-mono font-bold rounded-2xs uppercase">
                          MÉTODOS SAT // HEUER
                        </span>
                        <Cpu className="w-4 h-4 text-[#34d399]" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-[#86efac] transition-colors uppercase">
                        ANÁLISIS DE HIPÓTESIS COMPETIDAS (ACH)
                      </h3>
                      <p className="text-xs text-[#89b19e] mt-2">
                        Laboratorio interactivo de falsación matemática, matriz morfológica y mitigación de sesgos cognitivos en estimaciones de seguridad nacional.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowFase2Modal(true)}
                      className="mt-4 w-full py-2.5 bg-[#0e3825] hover:bg-[#165035] border border-[#27784f] text-white font-mono text-xs font-bold rounded-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(52,211,153,0.1)]"
                    >
                      <Play className="w-3.5 h-3.5 text-[#34d399]" />
                      <span>ABRIR MOTOR COGNITIVO (FASE II)</span>
                    </button>
                  </div>

                  {/* Card 4: Fase III Ciberdefensa & OPSEC */}
                  <div className="bg-[#051a13]/90 border border-[#1b5037] hover:border-[#00e5ff] rounded-xs p-5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 bg-[#052924] text-[#00e5ff] border border-[#12584d] text-[10px] font-mono font-bold rounded-2xs uppercase">
                          INFRAESTRUCTURA CRÍTICA
                        </span>
                        <Shield className="w-4 h-4 text-[#00e5ff]" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-[#00e5ff] transition-colors uppercase">
                        GESTIÓN DE CIBERDEFENSA Y OPSEC
                      </h3>
                      <p className="text-xs text-[#89b19e] mt-2">
                        Simulador de defensa de redes SCADA, contramedidas ante intrusiones electromagnéticas y protocolos de seguridad operacional OPSEC.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowFase3Modal(true)}
                      className="mt-4 w-full py-2.5 bg-[#062c26] hover:bg-[#0a3d35] border border-[#136657] text-white font-mono text-xs font-bold rounded-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(0,229,255,0.15)]"
                    >
                      <Play className="w-3.5 h-3.5 text-[#00e5ff]" />
                      <span>INICIAR SIMULADOR CIBER (FASE III)</span>
                    </button>
                  </div>

                  {/* Card 5: Fase I Soporte Teórico */}
                  <div className="bg-[#051a13]/90 border border-[#1b5037] hover:border-[#34d399] rounded-xs p-5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 bg-[#0c3121] text-[#34d399] border border-[#195236] text-[10px] font-mono font-bold rounded-2xs uppercase">
                          FUNDAMENTACIÓN
                        </span>
                        <BookOpen className="w-4 h-4 text-[#34d399]" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-[#86efac] transition-colors uppercase">
                        SOPORTE TEÓRICO Y MÉTODOS SAT
                      </h3>
                      <p className="text-xs text-[#89b19e] mt-2">
                        Doctrina de inteligencia estratégica, análisis prospectivo, teoría de escenarios y tutor virtual militar asistido por IA.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowFase1Modal(true)}
                      className="mt-4 w-full py-2.5 bg-[#0e3825] hover:bg-[#165035] border border-[#27784f] text-white font-mono text-xs font-bold rounded-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(52,211,153,0.1)]"
                    >
                      <Play className="w-3.5 h-3.5 text-[#34d399]" />
                      <span>ABRIR SOPORTE TEÓRICO (FASE I)</span>
                    </button>
                  </div>

                  {/* Card 6: Nivelación Doctrinaria Completa */}
                  <div className="bg-[#051a13]/90 border border-[#1b5037] hover:border-[#facc15] rounded-xs p-5 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-0.5 bg-[#26240d] text-[#facc15] border border-[#524915] text-[10px] font-mono font-bold rounded-2xs uppercase">
                          EVALUACIÓN CAMS
                        </span>
                        <Sparkles className="w-4 h-4 text-[#facc15]" />
                      </div>
                      <h3 className="font-heading text-base font-bold text-white group-hover:text-[#facc15] transition-colors uppercase">
                        DOCTRINA Y SIMULADOR CAMS
                      </h3>
                      <p className="text-xs text-[#89b19e] mt-2">
                        Simulador de Criterios de Aceptabilidad, Factibilidad y Adecuabilidad (CAMS) y evaluación de aptitud táctica.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDoctrinaModal(true)}
                      className="mt-4 w-full py-2.5 bg-[#2b2708] hover:bg-[#3d380e] border border-[#6b5f19] text-white font-mono text-xs font-bold rounded-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(250,204,21,0.1)]"
                    >
                      <Play className="w-3.5 h-3.5 text-[#facc15]" />
                      <span>ABRIR DOCTRINA CAMS</span>
                    </button>
                  </div>
                </div>

                {/* Situational Awareness Real-Time Telemetry */}
                <section>
                  <SituationalAwarenessWidget />
                </section>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: PERFIL DEL OPERADOR                                                 */}
            {/* ========================================================================= */}
            {currentTab === 'perfil' && (
              <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
                <div className="bg-[#051811]/95 border border-[#1b4d36] rounded-xs p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#143e2b]">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xs bg-[#0b291d] border border-[#2b7e56] flex items-center justify-center text-[#86efac] font-mono text-2xl font-bold shadow-inner">
                        OP
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#facc15] tracking-widest uppercase">
                            HOJA DE SERVICIO DIGITAL
                          </span>
                          <span className="px-1.5 py-0.2 bg-[#0c3322] border border-[#1f734b] text-[#34d399] font-mono text-[9px] rounded-2xs">
                            ACTIVO
                          </span>
                        </div>
                        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase">
                          {operator.code}
                        </h2>
                        <p className="font-mono text-xs text-[#7ea895] mt-0.5">
                          {operator.rank} • {operator.unit}
                        </p>
                      </div>
                    </div>

                    <div>
                      {!isEditingProfile ? (
                        <button
                          onClick={() => {
                            setProfileForm({
                              code: operator.code,
                              rank: operator.rank,
                              unit: operator.unit
                            });
                            setIsEditingProfile(true);
                          }}
                          className="px-4 py-2 bg-[#0c3121] hover:bg-[#12422c] border border-[#23704b] text-[#86efac] font-mono text-xs font-bold uppercase rounded-xs cursor-pointer transition-colors"
                        >
                          EDITAR DATOS
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditingProfile(false)}
                          className="px-4 py-2 bg-[#1f2937] hover:bg-[#374151] border border-[#4b5563] text-white font-mono text-xs font-bold uppercase rounded-xs cursor-pointer transition-colors"
                        >
                          CANCELAR
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Profile Form (if editing) */}
                  {isEditingProfile ? (
                    <form onSubmit={saveProfile} className="bg-[#03110b] border border-[#16432f] rounded-xs p-5 space-y-4 font-mono text-xs">
                      <div className="font-bold text-[#34d399] uppercase text-sm">
                        ACTUALIZAR DATOS DE LA HOJA DE SERVICIO
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[#84a997] block">CÓDIGO DE OPERADOR TÁCTICO:</label>
                        <input
                          type="text"
                          value={profileForm.code}
                          onChange={(e) => setProfileForm({ ...profileForm, code: e.target.value })}
                          className="w-full bg-[#061b11] border border-[#205e3e] text-white px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#34d399]"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[#84a997] block">GRADO / RANGO MILITAR:</label>
                        <input
                          type="text"
                          value={profileForm.rank}
                          onChange={(e) => setProfileForm({ ...profileForm, rank: e.target.value })}
                          className="w-full bg-[#061b11] border border-[#205e3e] text-white px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#34d399]"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[#84a997] block">UNIDAD MILITAR ASIGNADA:</label>
                        <input
                          type="text"
                          value={profileForm.unit}
                          onChange={(e) => setProfileForm({ ...profileForm, unit: e.target.value })}
                          className="w-full bg-[#061b11] border border-[#205e3e] text-white px-3 py-2 rounded-xs focus:outline-hidden focus:border-[#34d399]"
                          required
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#123e2b] hover:bg-[#1a553b] border border-[#2f885a] text-white font-bold rounded-xs cursor-pointer"
                        >
                          GUARDAR CAMBIOS
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="px-4 py-2 bg-[#1c2e26] hover:bg-[#273f34] text-[#a7c5b8] rounded-xs cursor-pointer"
                        >
                          CANCELAR
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Profile Metrics Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="p-4 bg-[#071e15] border border-[#174630] rounded-xs">
                        <span className="text-[#598471] block mb-1">NIVEL DE HABILITACIÓN:</span>
                        <span className="text-[#86efac] font-bold text-sm">{operator.clearanceLevel}</span>
                      </div>
                      <div className="p-4 bg-[#071e15] border border-[#174630] rounded-xs">
                        <span className="text-[#598471] block mb-1">TERMINAL ASIGNADA:</span>
                        <span className="text-white font-bold text-sm">{operator.terminalId}</span>
                      </div>
                      <div className="p-4 bg-[#071e15] border border-[#174630] rounded-xs">
                        <span className="text-[#598471] block mb-1">ESTADO DE REGISTRO:</span>
                        <span className="text-[#34d399] font-bold text-sm flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                          AUTENTICADO CON TOKEN MIL-SEC
                        </span>
                      </div>
                      <div className="p-4 bg-[#071e15] border border-[#174630] rounded-xs">
                        <span className="text-[#598471] block mb-1">REGISTRO DE SESIONES:</span>
                        <span className="text-white font-bold text-sm">128 HORAS EN SIMULADOR</span>
                      </div>
                    </div>
                  )}

                  {/* Certifications and Badges Section */}
                  <div className="pt-2 border-t border-[#143e2b]">
                    <h3 className="font-mono text-xs font-bold text-[#86efac] tracking-wider uppercase mb-3">
                      CERTIFICACIONES Y ACREDITACIONES ACTIVAS
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
                      <div className="p-3 bg-[#061b11] border border-[#174630] rounded-xs">
                        <div className="text-[#34d399] font-bold">FASE I: TEÓRICA</div>
                        <div className="text-[#6d9684] text-[10px]">Acreditación Doctrinal ECEME</div>
                        <div className="text-white font-bold mt-1">100 / 100 PTS</div>
                      </div>
                      <div className="p-3 bg-[#061b11] border border-[#174630] rounded-xs">
                        <div className="text-[#facc15] font-bold">FASE II: COGNITIVA</div>
                        <div className="text-[#6d9684] text-[10px]">Matriz Heuer & Mitigación</div>
                        <div className="text-white font-bold mt-1">65 / 100 PTS</div>
                      </div>
                      <div className="p-3 bg-[#061b11] border border-[#174630] rounded-xs">
                        <div className="text-[#00e5ff] font-bold">FASE III: CIBERDEFENSA</div>
                        <div className="text-[#6d9684] text-[10px]">Defensa SCADA & OPSEC</div>
                        <div className="text-white font-bold mt-1">25 / 100 PTS</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentTab('dashboard')}
                      className="px-5 py-2.5 bg-[#14422e] hover:bg-[#1b583e] border border-[#2b7a54] text-white font-heading text-sm font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
                    >
                      VOLVER AL DASHBOARD
                    </button>
                    
                    <button
                      onClick={() => setShowCicloModal(true)}
                      className="px-4 py-2 bg-[#082217] hover:bg-[#0e3524] border border-[#1e583d] text-[#86efac] font-mono text-xs rounded-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5 text-[#facc15]" />
                      <span>VER BOLETA DE ACREDITACIÓN</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB: CONFIGURACIONES DEL SISTEMA                                          */}
            {/* ========================================================================= */}
            {currentTab === 'configuraciones' && (
              <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
                <div className="bg-[#051811]/95 border border-[#1b4d36] rounded-xs p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                  <div className="pb-4 border-b border-[#143e2b]">
                    <span className="font-mono text-xs font-bold text-[#facc15] tracking-widest uppercase">
                      PARÁMETROS DE LA TERMINAL TÁCTICA
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-white uppercase">
                      CONFIGURACIÓN DE ENLACE Y SIMULACIÓN
                    </h2>
                    <p className="text-xs text-[#79a18f] font-mono mt-1">
                      Ajuste los parámetros del entorno de simulación, telemetría y seguridad de la terminal.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-mono">
                    {/* Setting 1: Encryption */}
                    <div className="p-4 bg-[#071e15] border border-[#174630] rounded-xs flex items-center justify-between gap-4">
                      <div>
                        <span className="text-white font-bold block">PROTOCOLO DE ENCRIPTACIÓN TÁCTICA</span>
                        <span className="text-[#648f7c]">Cifrado simétrico AES-256 en canal seguro militar.</span>
                      </div>
                      <span className="px-2.5 py-1 bg-[#0d3322] text-[#34d399] border border-[#1d6b46] rounded-2xs font-bold shrink-0">
                        {configSettings.encryptionProtocol}
                      </span>
                    </div>

                    {/* Setting 2: High Contrast HUD */}
                    <div className="p-4 bg-[#071e15] border border-[#174630] rounded-xs flex items-center justify-between gap-4">
                      <div>
                        <span className="text-white font-bold block">MODO ALTO CONTRASTE TÁCTICO (HUD ESMERALDA)</span>
                        <span className="text-[#648f7c]">Optimización de legibilidad para ambientes operacionales con baja luminosidad.</span>
                      </div>
                      <button
                        onClick={() => toggleConfig('highContrastHud')}
                        className={`px-3 py-1 rounded-2xs font-bold border transition-colors cursor-pointer shrink-0 ${
                          configSettings.highContrastHud
                            ? 'bg-[#10b981] text-[#031d13] border-[#10b981]'
                            : 'bg-[#11241c] text-[#7a9d8d] border-[#1f4e38]'
                        }`}
                      >
                        {configSettings.highContrastHud ? 'ACTIVADO' : 'DESACTIVADO'}
                      </button>
                    </div>

                    {/* Setting 3: Audio Alerts */}
                    <div className="p-4 bg-[#071e15] border border-[#174630] rounded-xs flex items-center justify-between gap-4">
                      <div>
                        <span className="text-white font-bold block">ALERTAS SONORAS DE EMERGENCIA TÁCTICA</span>
                        <span className="text-[#648f7c]">Emisión de pitidos acústicos en incidentes fronterizos o vectores no identificados.</span>
                      </div>
                      <button
                        onClick={() => toggleConfig('audioAlerts')}
                        className={`px-3 py-1 rounded-2xs font-bold border transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                          configSettings.audioAlerts
                            ? 'bg-[#10b981] text-[#031d13] border-[#10b981]'
                            : 'bg-[#11241c] text-[#7a9d8d] border-[#1f4e38]'
                        }`}
                      >
                        {configSettings.audioAlerts ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                        {configSettings.audioAlerts ? 'SONIDO ACTIVO' : 'SILENCIADO'}
                      </button>
                    </div>

                    {/* Setting 4: Telemetry Refresh */}
                    <div className="p-4 bg-[#071e15] border border-[#174630] rounded-xs flex items-center justify-between gap-4">
                      <div>
                        <span className="text-white font-bold block">FRECUENCIA DE MUESTREO ISR</span>
                        <span className="text-[#648f7c]">Ciclo de actualización de telemetría de sensores fronterizos.</span>
                      </div>
                      <span className="px-2.5 py-1 bg-[#0d3322] text-[#86efac] border border-[#1d6b46] rounded-2xs font-bold shrink-0">
                        {configSettings.telemetryRefresh} (EN VIVO)
                      </span>
                    </div>

                    {/* Setting 5: Clear Cache */}
                    <div className="p-4 bg-[#0c1410] border border-[#3b2a1a] rounded-xs flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[#f87171] font-bold block">RESTABLECER DATOS DE ENTRENAMIENTO</span>
                        <span className="text-[#849a90]">Borra el progreso local, respuestas cacheadas y reinicia los simuladores a estado inicial.</span>
                      </div>
                      <button
                        onClick={handleClearCache}
                        className="px-3 py-1.5 bg-[#2b1111] hover:bg-[#3d1818] text-[#fca5a5] border border-[#6b2525] rounded-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>REINICIAR DATOS</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setCurrentTab('dashboard')}
                      className="px-5 py-2.5 bg-[#14422e] hover:bg-[#1b583e] border border-[#2b7a54] text-white font-heading text-sm font-bold uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
                    >
                      VOLVER AL DASHBOARD
                    </button>

                    <span className="text-[10px] font-mono text-[#527d6b]">
                      IDENTIFICADOR DISPOSITIVO: {operator.terminalId}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </main>

          {/* Footer */}
          <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 border-t border-[#123927] bg-[#020e08]/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#5b8270] mt-auto">
            <div className="flex items-center space-x-3">
              <span>SISTEMA: CENTRO-OPS-CIV-v4.3</span>
              <span>•</span>
              <span className="text-[#86efac]">CANAL CIFRADO SEGURO</span>
            </div>
            <div className="text-center sm:text-right text-[#4a6b5c]">
              CAMPUS VIRTUAL DE INTELIGENCIA ESTRATÉGICA &copy; {new Date().getFullYear()}
            </div>
          </footer>

        </div>
      </div>

      {/* Offline Status Connectivity Banner */}
      <OfflineIndicator />

      {/* Direct Modals for Tactical Launchers */}
      {showFase1Modal && (
        <FaseTeoricaDetalle 
          onClose={() => setShowFase1Modal(false)}
          onEnterModule={() => {
            setShowFase1Modal(false);
            setShowFase2Modal(true);
          }}
        />
      )}

      {showFase2Modal && (
        <FaseCognitivaDetalle 
          onClose={() => setShowFase2Modal(false)}
          onEnterModule={() => {
            setShowFase2Modal(false);
            setShowFase3Modal(true);
          }}
        />
      )}

      {showFase3Modal && (
        <FaseTecnologicaDetalle 
          onClose={() => setShowFase3Modal(false)}
          onEnterModule={() => {
            setShowFase3Modal(false);
            setShowFase4Modal(true);
          }}
        />
      )}

      {showFase4Modal && (
        <FaseOperativaDetalle 
          onClose={() => setShowFase4Modal(false)}
        />
      )}

      {showCicloModal && (
        <CicloInteligenciaDetalle 
          onClose={() => setShowCicloModal(false)}
        />
      )}

      {showDoctrinaModal && (
        <DoctrinaMilitarDetalle 
          onClose={() => setShowDoctrinaModal(false)}
        />
      )}

    </div>
  );
}
