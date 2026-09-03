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
  CheckCircle2
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { SimulationGrid } from './SimulationGrid';
import { SituationalAwarenessWidget } from './SituationalAwarenessWidget';
import { OperatorProfile, TrainingPhase } from '../types';

interface CentroDeOperacionesProps {
  onLogout: () => void;
  operatorCode?: string;
}

export function CentroDeOperaciones({ onLogout, operatorCode = 'OP-7490-ALFA' }: CentroDeOperacionesProps) {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  const operator: OperatorProfile = {
    code: operatorCode || 'OP-7490-ALFA',
    rank: 'MAYOR DE INTELIGENCIA',
    unit: 'ESTADO MAYOR • SECCIÓN II',
    clearanceLevel: 'NIVEL 4 (TOP SECRET)',
    status: 'ONLINE',
    terminalId: 'TER-BOL-994'
  };

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toTimeString().split(' ')[0] + ' BOT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full tactical-emerald-bg text-[#d1ded9] font-sans flex flex-col relative overflow-x-hidden selection:bg-[#20523a] selection:text-[#a7f3d0]">
      
      {/* Background Image Layer (Subtle tactical texture from Google Drive) */}
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
                  <span className="text-[#34d399] font-bold">CENTRO DE OPERACIONES</span>
                </div>
                <h1 className="font-heading text-lg sm:text-2xl font-bold text-white uppercase tracking-wider leading-none pt-0.5">
                  CENTRO DE OPERACIONES MULTIDOMINIO
                </h1>
              </div>
            </div>

            {/* Right Telemetry Information */}
            <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 px-2.5 py-1 bg-[#071f14] border border-[#194c34] rounded-xs text-[#9acbb4]">
                <Clock className="w-3.5 h-3.5 text-[#34d399]" />
                <span>{currentTime || '14:40:00 BOT'}</span>
              </div>

              <div className="flex items-center gap-2 px-2.5 py-1 bg-[#071f14] border border-[#194c34] rounded-xs text-[#facc15]">
                <span className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse" />
                <span className="font-bold">RED CIFRADA MIL-COM</span>
              </div>
            </div>
          </header>

          {/* Body Content Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
            
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
                        <span className="text-[#86efac]">DEFCON 3</span>
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

            {currentTab === 'perfil' && (
              <div className="bg-[#051811]/95 border border-[#1b4d36] rounded-xs p-6 sm:p-8 backdrop-blur-md max-w-3xl space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-[#143e2b]">
                  <div className="w-16 h-16 rounded-full bg-[#0b291d] border border-[#2b7e56] flex items-center justify-center text-[#86efac] font-mono text-xl font-bold">
                    OP
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#facc15] tracking-widest uppercase">
                      HOJA DE SERVICIO DIGITAL
                    </span>
                    <h2 className="font-heading text-2xl font-bold text-white uppercase">
                      {operator.code}
                    </h2>
                    <p className="font-mono text-xs text-[#7ea895]">
                      {operator.rank} • {operator.unit}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 bg-[#071e15] border border-[#174630] rounded-xs">
                    <span className="text-[#598471] block mb-1">NIVEL DE HABILITACIÓN:</span>
                    <span className="text-[#86efac] font-bold text-sm">{operator.clearanceLevel}</span>
                  </div>
                  <div className="p-3.5 bg-[#071e15] border border-[#174630] rounded-xs">
                    <span className="text-[#598471] block mb-1">TERMINAL ASIGNADA:</span>
                    <span className="text-white font-bold text-sm">{operator.terminalId}</span>
                  </div>
                  <div className="p-3.5 bg-[#071e15] border border-[#174630] rounded-xs">
                    <span className="text-[#598471] block mb-1">ESTADO DE REGISTRO:</span>
                    <span className="text-[#34d399] font-bold text-sm">AUTENTICADO CON TOKEN MIL-SEC</span>
                  </div>
                  <div className="p-3.5 bg-[#071e15] border border-[#174630] rounded-xs">
                    <span className="text-[#598471] block mb-1">REGISTRO DE SESIONES:</span>
                    <span className="text-white font-bold text-sm">128 HORAS EN SIMULADOR</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentTab('dashboard')}
                    className="px-5 py-2.5 bg-[#14422e] hover:bg-[#1b583e] border border-[#2b7a54] text-white font-heading text-sm font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                  >
                    VOLVER AL DASHBOARD
                  </button>
                </div>
              </div>
            )}

            {currentTab === 'configuraciones' && (
              <div className="bg-[#051811]/95 border border-[#1b4d36] rounded-xs p-6 sm:p-8 backdrop-blur-md max-w-3xl space-y-6">
                <div className="pb-4 border-b border-[#143e2b]">
                  <span className="font-mono text-xs font-bold text-[#facc15] tracking-widest uppercase">
                    PARÁMETROS DE LA TERMINAL
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-white uppercase">
                    CONFIGURACIÓN DE ENLACE Y SIMULACIÓN
                  </h2>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="p-4 bg-[#071e15] border border-[#174630] rounded-xs flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">PROTOCOLO DE ENCRIPTACIÓN TÁCTICA</span>
                      <span className="text-[#648f7c]">Cifrado simétrico AES-256 en canal seguro de datos.</span>
                    </div>
                    <span className="px-2 py-1 bg-[#0d3322] text-[#34d399] border border-[#1d6b46] rounded-2xs font-bold">
                      ACTIVO
                    </span>
                  </div>

                  <div className="p-4 bg-[#071e15] border border-[#174630] rounded-xs flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">TELEMETRÍA EN TIEMPO REAL (ISR)</span>
                      <span className="text-[#648f7c]">Recepción de vectores fronterizos y reportes de interdicción.</span>
                    </div>
                    <span className="px-2 py-1 bg-[#0d3322] text-[#34d399] border border-[#1d6b46] rounded-2xs font-bold">
                      SINCRONIZADO
                    </span>
                  </div>

                  <div className="p-4 bg-[#071e15] border border-[#174630] rounded-xs flex items-center justify-between">
                    <div>
                      <span className="text-white font-bold block">RESOLUCIÓN DE SIMULADORES COGNITIVOS</span>
                      <span className="text-[#648f7c]">Renderizado de matrices de hipótesis y entornos multidominio.</span>
                    </div>
                    <span className="px-2 py-1 bg-[#0d3322] text-[#86efac] border border-[#1d6b46] rounded-2xs font-bold">
                      ULTRA-HD TAC
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentTab('dashboard')}
                    className="px-5 py-2.5 bg-[#14422e] hover:bg-[#1b583e] border border-[#2b7a54] text-white font-heading text-sm font-bold uppercase tracking-wider rounded-xs cursor-pointer"
                  >
                    GUARDAR Y VOLVER
                  </button>
                </div>
              </div>
            )}

          </main>

          {/* Footer */}
          <footer className="w-full py-4 px-4 sm:px-6 lg:px-8 border-t border-[#123927] bg-[#020e08]/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#5b8270] mt-auto">
            <div className="flex items-center space-x-3">
              <span>SISTEMA: CENTRO-OPS-CIV-v4.2</span>
              <span>•</span>
              <span className="text-[#86efac]">CANAL CIFRADO SEGURO</span>
            </div>
            <div className="text-center sm:text-right text-[#4a6b5c]">
              CAMPUS VIRTUAL DE INTELIGENCIA ESTRATÉGICA &copy; {new Date().getFullYear()}
            </div>
          </footer>

        </div>
      </div>

    </div>
  );
}
