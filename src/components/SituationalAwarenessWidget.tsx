import React, { useState, useEffect } from 'react';
import { 
  Radar, 
  ShieldCheck, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  RefreshCw, 
  Radio, 
  Crosshair, 
  Layers, 
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { SituationalProject } from '../types';

export function SituationalAwarenessWidget() {
  const [lastSyncTime, setLastSyncTime] = useState<string>('14:38:22 UTC');
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLastSyncTime(
        now.toTimeString().split(' ')[0] + ' UTC'
      );
      setPulse(prev => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const projectData: SituationalProject = {
    id: 'SIE-BOL-2026',
    name: 'SISTEMA DE INTELIGENCIA ESTRATÉGICA',
    code: 'SIE-MULTI-DOMINIO',
    status: 'OPERATIVO AL 100%',
    lastUpdate: lastSyncTime,
    metrics: {
      contraband: {
        title: 'Lucha Contra el Contrabando',
        percentage: 86,
        interdictions: 14,
        efficiency: '91.4% Tasa de Intercepción',
        status: 'SECTOR OCCIDENTE ACTIVO'
      },
      borderPosts: {
        title: 'Control de Puestos Fronterizos',
        percentage: 94,
        activePosts: 18,
        totalPosts: 20,
        status: 'ENLACE SATELITAL ESTABLE'
      },
      illegalRoutes: {
        title: 'Monitoreo de Rutas Ilegales',
        percentage: 79,
        vectorsTracked: 8,
        riskLevel: 'MEDIO-ALTO',
        status: 'VECTORES CLANDESTINOS IDENTIFICADOS'
      }
    }
  };

  return (
    <div 
      id="situational-awareness-widget"
      className="relative bg-[#051711]/92 border border-[#1a4a35] rounded-xs p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,10,6,0.9)] backdrop-blur-md overflow-hidden transition-all duration-300"
    >
      {/* Tactical Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#34d399]" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#34d399]" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#34d399]" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#34d399]" />

      {/* Header of Situational Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#143d2c]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xs bg-[#0b291d] border border-[#206845] flex items-center justify-center text-[#34d399] shadow-inner">
            <Radar className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-[#facc15] tracking-[0.2em] uppercase">
                PROYECTO ACTIVO
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 bg-[#123e2a] text-[#86efac] font-mono text-[9px] border border-[#25754f] rounded-2xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                VIGILANCIA PERMANENTE
              </span>
            </div>
            <h2 className="font-heading text-base sm:text-lg font-bold text-white tracking-wider uppercase">
              {projectData.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-[#719c88]">
          <RefreshCw className={`w-3.5 h-3.5 text-[#34d399] ${pulse ? 'rotate-180' : ''} transition-transform duration-700`} />
          <span>SINCRONIZACIÓN: <strong className="text-white">{projectData.lastUpdate}</strong></span>
        </div>
      </div>

      {/* Grid of Situational Awareness Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
        
        {/* Metric 1: Lucha Contra el Contrabando */}
        <div className="p-4 bg-[#071d15]/90 border border-[#164932] rounded-xs hover:border-[#2f885b] transition-all group">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#dcfce7]">
              <ShieldCheck className="w-4 h-4 text-[#34d399]" />
              <span className="font-sans uppercase tracking-wider">{projectData.metrics.contraband.title}</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#34d399]">
              {projectData.metrics.contraband.percentage}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#04110c] h-2 rounded-full overflow-hidden border border-[#163f2b] my-2.5">
            <div 
              className="bg-gradient-to-r from-[#10b981] to-[#34d399] h-full rounded-full transition-all duration-1000"
              style={{ width: `${projectData.metrics.contraband.percentage}%` }}
            />
          </div>

          <div className="space-y-1 text-[11px] font-mono text-[#81a896] pt-1">
            <div className="flex justify-between">
              <span>Operativos Interdicción:</span>
              <span className="text-white font-bold">{projectData.metrics.contraband.interdictions} Sectores</span>
            </div>
            <div className="flex justify-between">
              <span>Efectividad Operativa:</span>
              <span className="text-[#a7f3d0] font-semibold">{projectData.metrics.contraband.efficiency}</span>
            </div>
            <div className="flex items-center gap-1.5 pt-1 text-[10px] text-[#facc15]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]" />
              <span className="uppercase">{projectData.metrics.contraband.status}</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Control de Puestos Fronterizos */}
        <div className="p-4 bg-[#071d15]/90 border border-[#164932] rounded-xs hover:border-[#2f885b] transition-all group">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#dcfce7]">
              <MapPin className="w-4 h-4 text-[#34d399]" />
              <span className="font-sans uppercase tracking-wider">{projectData.metrics.borderPosts.title}</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#34d399]">
              {projectData.metrics.borderPosts.percentage}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#04110c] h-2 rounded-full overflow-hidden border border-[#163f2b] my-2.5">
            <div 
              className="bg-gradient-to-r from-[#10b981] to-[#34d399] h-full rounded-full transition-all duration-1000"
              style={{ width: `${projectData.metrics.borderPosts.percentage}%` }}
            />
          </div>

          <div className="space-y-1 text-[11px] font-mono text-[#81a896] pt-1">
            <div className="flex justify-between">
              <span>Puestos Monitoreados:</span>
              <span className="text-white font-bold">{projectData.metrics.borderPosts.activePosts} / {projectData.metrics.borderPosts.totalPosts} Enlace Activo</span>
            </div>
            <div className="flex justify-between">
              <span>Cobertura Fronteriza:</span>
              <span className="text-[#a7f3d0] font-semibold">99.1% Perimetral</span>
            </div>
            <div className="flex items-center gap-1.5 pt-1 text-[10px] text-[#86efac]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span className="uppercase">{projectData.metrics.borderPosts.status}</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Monitoreo de Rutas Ilegales */}
        <div className="p-4 bg-[#071d15]/90 border border-[#164932] rounded-xs hover:border-[#2f885b] transition-all group">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#dcfce7]">
              <Navigation className="w-4 h-4 text-[#facc15]" />
              <span className="font-sans uppercase tracking-wider">{projectData.metrics.illegalRoutes.title}</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#facc15]">
              {projectData.metrics.illegalRoutes.percentage}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#04110c] h-2 rounded-full overflow-hidden border border-[#163f2b] my-2.5">
            <div 
              className="bg-gradient-to-r from-[#eab308] to-[#facc15] h-full rounded-full transition-all duration-1000"
              style={{ width: `${projectData.metrics.illegalRoutes.percentage}%` }}
            />
          </div>

          <div className="space-y-1 text-[11px] font-mono text-[#81a896] pt-1">
            <div className="flex justify-between">
              <span>Vectores Rastreados:</span>
              <span className="text-white font-bold">{projectData.metrics.illegalRoutes.vectorsTracked} Corredores</span>
            </div>
            <div className="flex justify-between">
              <span>Nivel de Riesgo Táctico:</span>
              <span className="text-[#fca5a5] font-semibold">{projectData.metrics.illegalRoutes.riskLevel}</span>
            </div>
            <div className="flex items-center gap-1.5 pt-1 text-[10px] text-[#facc15]">
              <AlertTriangle className="w-3 h-3 text-[#facc15]" />
              <span className="uppercase">{projectData.metrics.illegalRoutes.status}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Live Tactical Stream Footer Note */}
      <div className="mt-4 pt-3 border-t border-[#133c2a] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-[#587e6c]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
          <span>FUSIÓN ISR TERRESTRE Y SATELITAL EN EJECUCIÓN CONTINUA</span>
        </div>
        <div className="text-[#96beab]">
          AUTORIZACIÓN EM-DIR-INTEL • BOLIVIA
        </div>
      </div>
    </div>
  );
}
