import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Monitor, 
  Smartphone, 
  Package, 
  CheckCircle2, 
  Laptop, 
  Apple, 
  Terminal, 
  ExternalLink,
  ShieldCheck,
  FileCode,
  Sparkles,
  Layers,
  ArrowDownToLine,
  HelpCircle,
  Share2
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  downloadWindowsInstaller,
  downloadDesktopShortcut,
  downloadLinuxMacInstaller,
  downloadAndroidConfig,
  downloadIOSProfile,
  downloadOfflineStandaloneHTML,
  downloadOfficialEmblem
} from '../utils/downloadInstallers';

interface ModalInstalacionAppProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalInstalacionApp({ isOpen, onClose }: ModalInstalacionAppProps) {
  const { isInstallable, isInstalled, isIOS, isAndroid, isDesktop, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'pc' | 'mobile' | 'offline'>('pc');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setDownloadSuccess(msg);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3500);
  };

  const handleInstallPWA = async () => {
    const success = await install();
    if (success) {
      showNotification('¡Instalación iniciada exitosamente!');
    }
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      
      {/* Modal Container with Emerald Tactical Border & Glassmorphism */}
      <div className="relative w-full max-w-4xl bg-[#04140e]/98 border border-[#10b981] rounded-xs shadow-[0_0_50px_rgba(16,185,129,0.3),0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Corner Crosshairs */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#34d399] z-20" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#34d399] z-20" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#34d399] z-20" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#34d399] z-20" />

        {/* Modal Header */}
        <header className="bg-[#020d08] border-b border-[#143e2b] px-5 py-4 flex items-center justify-between gap-4 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-[#072418] border border-[#1f6342] flex items-center justify-center text-[#34d399] shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#09291b] text-[#34d399] border border-[#1b5d3d] text-[9px] font-mono font-bold rounded-2xs uppercase tracking-wider">
                  INSTALADOR MULTIPLATAFORMA
                </span>
                <span className="text-[11px] font-mono text-[#52826e]">| VERSIÓN 2.5.0</span>
              </div>
              <h2 className="font-heading text-base sm:text-xl font-bold text-white uppercase tracking-wider">
                CENTRO DE DESCARGA E INSTALACIÓN CVIE
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#6e9b86] hover:text-white rounded-xs transition-colors hover:bg-[#072418] cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex bg-[#03110a] border-b border-[#143e2b] text-xs font-mono">
          <button
            onClick={() => setActiveTab('pc')}
            className={`flex-1 py-3 px-4 text-center font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border-b-2 ${
              activeTab === 'pc'
                ? 'bg-[#092e1e] border-[#34d399] text-[#86efac] shadow-[inset_0_-2px_8px_rgba(52,211,153,0.2)]'
                : 'border-transparent text-[#7aa492] hover:text-white hover:bg-[#051b12]'
            }`}
          >
            <Monitor className="w-4 h-4 text-[#34d399]" />
            <span>Computadora (PC / Laptop)</span>
          </button>

          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex-1 py-3 px-4 text-center font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border-b-2 ${
              activeTab === 'mobile'
                ? 'bg-[#092e1e] border-[#34d399] text-[#86efac] shadow-[inset_0_-2px_8px_rgba(52,211,153,0.2)]'
                : 'border-transparent text-[#7aa492] hover:text-white hover:bg-[#051b12]'
            }`}
          >
            <Smartphone className="w-4 h-4 text-[#34d399]" />
            <span>Dispositivo Móvil (Android / iOS)</span>
          </button>

          <button
            onClick={() => setActiveTab('offline')}
            className={`flex-1 py-3 px-4 text-center font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border-b-2 ${
              activeTab === 'offline'
                ? 'bg-[#092e1e] border-[#34d399] text-[#86efac] shadow-[inset_0_-2px_8px_rgba(52,211,153,0.2)]'
                : 'border-transparent text-[#7aa492] hover:text-white hover:bg-[#051b12]'
            }`}
          >
            <Package className="w-4 h-4 text-[#34d399]" />
            <span>Paquete Offline Portable</span>
          </button>
        </nav>

        {/* Success Toast */}
        {downloadSuccess && (
          <div className="bg-[#0b3321] border-b border-[#34d399] p-2.5 text-center text-xs font-mono text-[#86efac] flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-[#d1ded9]">
          
          {/* ===================================================================== */}
          {/* PRESENTACIÓN OFICIAL DEL ICONO: ESCRITORIO PC & DISPOSITIVO MÓVIL    */}
          {/* ===================================================================== */}
          <section className="p-4 sm:p-5 bg-gradient-to-r from-[#051710] via-[#072418] to-[#04160f] border border-[#1d6b47] rounded-xs shadow-[0_4px_20px_rgba(0,0,0,0.6)] space-y-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
              
              {/* Emblem Art and Details */}
              <div className="flex items-center gap-4">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 p-1.5 bg-[#020d08] border-2 border-[#34d399] rounded-xs shadow-[0_0_20px_rgba(52,211,153,0.3)] flex items-center justify-center overflow-hidden">
                    <img 
                      src="/Gemini_Generated_Image_h1ntq6h1ntq6h1nt.jpg" 
                      alt="Icono Oficial CVIE"
                      className="w-full h-full object-contain rounded-2xs group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-1 bg-[#10b981] text-[#021811] text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-2xs uppercase tracking-wider shadow">
                    OFICIAL
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#0a3120] text-[#34d399] border border-[#1b5e3d] text-[9px] font-mono font-bold rounded-2xs uppercase tracking-wider">
                      ICONO INSTITUCIONAL DE APLICACIÓN
                    </span>
                    <span className="text-[10px] font-mono text-[#4ade80]">512x512 HD</span>
                  </div>
                  <h3 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                    Inteligencia Estratégica Bolivia
                  </h3>
                  <p className="text-[11px] text-[#9ebcb0] max-w-md leading-relaxed">
                    Emblema oficial configurado como icono maestro del sistema para el acceso directo en el <strong>Escritorio de la PC</strong> y en la pantalla de inicio de <strong>Dispositivos Móviles</strong>.
                  </p>
                </div>
              </div>

              {/* Live Previews: PC Desktop Icon vs Mobile App Icon */}
              <div className="flex items-center gap-4 sm:gap-6 bg-[#020b07]/80 p-3 sm:p-4 rounded-xs border border-[#143e2b] shrink-0">
                
                {/* PC Desktop Icon Presentation */}
                <div className="flex flex-col items-center space-y-1.5 text-center group">
                  <div className="text-[9px] font-mono text-[#94a3b8] uppercase flex items-center gap-1">
                    <Monitor className="w-3 h-3 text-[#38bdf8]" />
                    <span>En PC Desktop</span>
                  </div>
                  
                  {/* Realistic Windows Desktop Icon Mockup */}
                  <div className="w-14 h-14 bg-[#0a1b24]/90 border border-[#38bdf8]/40 rounded-xs p-1.5 relative shadow-lg group-hover:border-[#38bdf8] transition-colors flex items-center justify-center">
                    <img 
                      src="/Gemini_Generated_Image_h1ntq6h1ntq6h1nt.jpg" 
                      alt="Icono PC"
                      className="w-full h-full object-contain rounded-2xs" 
                    />
                    {/* Windows Shortcut Arrow Overlay */}
                    <div className="absolute bottom-0.5 left-0.5 w-3.5 h-3.5 bg-white/90 rounded-2xs flex items-center justify-center shadow-xs">
                      <ArrowDownToLine className="w-2.5 h-2.5 text-[#0284c7] rotate-[-45deg]" />
                    </div>
                  </div>
                  
                  <span className="text-[9px] font-mono text-[#cbd5e1] max-w-[85px] truncate block leading-tight">
                    CVIE.url
                  </span>
                </div>

                <div className="h-12 w-px bg-[#143e2b]" />

                {/* Mobile App Icon Presentation */}
                <div className="flex flex-col items-center space-y-1.5 text-center group">
                  <div className="text-[9px] font-mono text-[#94a3b8] uppercase flex items-center gap-1">
                    <Smartphone className="w-3 h-3 text-[#34d399]" />
                    <span>En Móvil</span>
                  </div>
                  
                  {/* Realistic Mobile Squircle Icon Mockup */}
                  <div className="w-14 h-14 bg-[#021811] border-2 border-[#10b981] rounded-2xl p-1 relative shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden">
                    <img 
                      src="/Gemini_Generated_Image_h1ntq6h1ntq6h1nt.jpg" 
                      alt="Icono Móvil"
                      className="w-full h-full object-contain rounded-xl" 
                    />
                    {/* Notification dot */}
                    <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#ef4444] border border-[#021811]" />
                  </div>
                  
                  <span className="text-[9px] font-mono text-[#cbd5e1] block font-bold leading-tight">
                    CVIE
                  </span>
                </div>

              </div>

            </div>

            {/* Quick Icon Download Bar */}
            <div className="pt-2 border-t border-[#13432d] flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-[#78a491]">
                Descarga de archivos de icono para despliegue manual:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    downloadOfficialEmblem('ico');
                    showNotification('Icono (.ico) para Escritorio de Windows descargado.');
                  }}
                  className="px-2.5 py-1 bg-[#092218] hover:bg-[#124230] border border-[#23704b] text-[#86efac] hover:text-white rounded-2xs font-mono text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowDownToLine className="w-3 h-3 text-[#38bdf8]" />
                  <span>Icono PC (.ico)</span>
                </button>
                <button
                  onClick={() => {
                    downloadOfficialEmblem('png');
                    showNotification('Icono HD (.png) descargado.');
                  }}
                  className="px-2.5 py-1 bg-[#092218] hover:bg-[#124230] border border-[#23704b] text-[#86efac] hover:text-white rounded-2xs font-mono text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowDownToLine className="w-3 h-3 text-[#34d399]" />
                  <span>Icono HD (.png)</span>
                </button>
                <button
                  onClick={() => {
                    downloadOfficialEmblem('jpg');
                    showNotification('Emblema táctico original (.jpg) descargado.');
                  }}
                  className="px-2.5 py-1 bg-[#092218] hover:bg-[#124230] border border-[#23704b] text-[#86efac] hover:text-white rounded-2xs font-mono text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ArrowDownToLine className="w-3 h-3 text-[#facc15]" />
                  <span>Emblema Original (.jpg)</span>
                </button>
              </div>
            </div>
          </section>
          
          {/* ===================================================================== */}
          {/* TAB 1: COMPUTADORA (PC / LAPTOP)                                      */}
          {/* ===================================================================== */}
          {activeTab === 'pc' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Option 1: Direct PWA 1-Click Install */}
              <div className="p-4 sm:p-5 bg-[#061e14] border border-[#1d6342] rounded-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                    <h3 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                      Opción 1: Instalación Nativa PWA de Escritorio
                    </h3>
                  </div>
                  <p className="text-xs text-[#9ebcb0] max-w-xl leading-relaxed">
                    Instala el Campus Virtual como una aplicación de escritorio independiente con ventana dedicada sin barras de navegador, icono táctico en la barra de tareas y ejecución fluida.
                  </p>
                </div>

                {isInstalled ? (
                  <div className="px-4 py-2 bg-[#0a3120] border border-[#34d399] text-[#86efac] text-xs font-mono font-bold rounded-xs flex items-center gap-2 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>APP YA INSTALADA</span>
                  </div>
                ) : isInstallable ? (
                  <button
                    onClick={handleInstallPWA}
                    className="px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-[#021811] font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0 cursor-pointer flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>INSTALAR EN ESTA PC (1 CLIC)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      downloadWindowsInstaller();
                      showNotification('Descargando instalador por lotes para Windows...');
                    }}
                    className="px-4 py-2.5 bg-[#0b291d] hover:bg-[#124230] text-[#34d399] border border-[#23704b] font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shrink-0 cursor-pointer flex items-center gap-2"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>DESCARGAR INSTALADOR DIRECTO</span>
                  </button>
                )}
              </div>

              {/* Option 2: Downloadable Installation Files for PC */}
              <div>
                <h3 className="font-heading text-sm font-bold text-[#86efac] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-[#34d399]" />
                  <span>Archivos de Instalación Descargables para PC:</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Windows Batch Installer */}
                  <div className="p-4 bg-[#051a12] border border-[#154630] rounded-xs flex flex-col justify-between space-y-3 hover:border-[#34d399] transition-colors">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-heading text-xs font-bold text-white uppercase flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-[#38bdf8]" />
                          <span>Instalador Windows (.bat)</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#38bdf8] bg-[#0c2a38] px-2 py-0.5 rounded-2xs border border-[#1b4b63]">
                          WINDOWS 10 / 11
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9ebcb0] leading-relaxed">
                        Crea de forma automática el acceso directo en el <strong>Escritorio</strong> de Windows con icono oficial y ejecuta el Campus Virtual en modo aplicación táctica.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        downloadWindowsInstaller();
                        showNotification('Instalador Windows (.bat) descargado exitosamente.');
                      }}
                      className="w-full py-2 px-3 bg-[#082218] hover:bg-[#0e3b28] border border-[#1b5d3d] text-[#86efac] hover:text-white font-mono text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowDownToLine className="w-3.5 h-3.5" />
                      <span>Descargar "Instalar_CVIE_PC.bat"</span>
                    </button>
                  </div>

                  {/* Linux & Mac Shell Installer */}
                  <div className="p-4 bg-[#051a12] border border-[#154630] rounded-xs flex flex-col justify-between space-y-3 hover:border-[#34d399] transition-colors">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-heading text-xs font-bold text-white uppercase flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-[#a855f7]" />
                          <span>Lanzador Linux & Mac (.sh)</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#a855f7] bg-[#291338] px-2 py-0.5 rounded-2xs border border-[#522373]">
                          LINUX / MACOS
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9ebcb0] leading-relaxed">
                        Crea el lanzador <strong>.desktop</strong> en el menú de aplicaciones del sistema operativo con categorías de seguridad militar y navegación segura.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        downloadLinuxMacInstaller();
                        showNotification('Lanzador Linux/Mac (.sh) descargado exitosamente.');
                      }}
                      className="w-full py-2 px-3 bg-[#082218] hover:bg-[#0e3b28] border border-[#1b5d3d] text-[#86efac] hover:text-white font-mono text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowDownToLine className="w-3.5 h-3.5" />
                      <span>Descargar "Instalar_CVIE_Linux.sh"</span>
                    </button>
                  </div>

                  {/* Windows Internet Shortcut (.url) */}
                  <div className="p-4 bg-[#051a12] border border-[#154630] rounded-xs flex flex-col justify-between space-y-3 hover:border-[#34d399] transition-colors">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-heading text-xs font-bold text-white uppercase flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5 text-[#facc15]" />
                          <span>Acceso Directo Portable (.url)</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#facc15] bg-[#29220c] px-2 py-0.5 rounded-2xs border border-[#574714]">
                          PORTABLE
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9ebcb0] leading-relaxed">
                        Archivo ligero de acceso directo listo para colocar en el escritorio de cualquier computadora o transferir en unidades USB tácticas.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        downloadDesktopShortcut();
                        showNotification('Acceso directo (.url) descargado exitosamente.');
                      }}
                      className="w-full py-2 px-3 bg-[#082218] hover:bg-[#0e3b28] border border-[#1b5d3d] text-[#86efac] hover:text-white font-mono text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowDownToLine className="w-3.5 h-3.5" />
                      <span>Descargar "CVIE.url"</span>
                    </button>
                  </div>

                  {/* Standalone HTML Package */}
                  <div className="p-4 bg-[#051a12] border border-[#154630] rounded-xs flex flex-col justify-between space-y-3 hover:border-[#34d399] transition-colors">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-heading text-xs font-bold text-white uppercase flex items-center gap-1.5">
                          <Package className="w-3.5 h-3.5 text-[#34d399]" />
                          <span>Lanzador Autónomo (.html)</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#34d399] bg-[#072418] px-2 py-0.5 rounded-2xs border border-[#1a5a3a]">
                          UNIVERSAL
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9ebcb0] leading-relaxed">
                        Archivo HTML autocontenido con diseño militar que puede ser ejecutado con doble clic en cualquier explorador sin requerir comandos adicionales.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        downloadOfflineStandaloneHTML();
                        showNotification('Lanzador HTML autónomo descargado exitosamente.');
                      }}
                      className="w-full py-2 px-3 bg-[#082218] hover:bg-[#0e3b28] border border-[#1b5d3d] text-[#86efac] hover:text-white font-mono text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ArrowDownToLine className="w-3.5 h-3.5" />
                      <span>Descargar "CVIE_Lanzador_Offline.html"</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 2: DISPOSITIVO MÓVIL (ANDROID / iOS)                              */}
          {/* ===================================================================== */}
          {activeTab === 'mobile' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* ANDROID SECTION */}
                <div className="p-5 bg-[#051a12] border border-[#164a33] rounded-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#143e2b] pb-2.5">
                    <span className="font-heading text-sm font-bold text-white uppercase flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#34d399]" />
                      <span>Android (Smartphone / Tablet)</span>
                    </span>
                    <span className="px-2 py-0.5 bg-[#072418] text-[#86efac] border border-[#1f6342] text-[10px] font-mono font-bold rounded-2xs">
                      APK / WEBAPK
                    </span>
                  </div>

                  <p className="text-xs text-[#9ebcb0] leading-relaxed">
                    Android admite la instalación de aplicaciones web progresivas (PWA) generando un paquete nativo <strong>WebAPK</strong> con icono en el cajón de aplicaciones, pantalla de carga y acceso fuera de línea.
                  </p>

                  {/* Android 1-Click Install if prompt available */}
                  {isInstallable && (
                    <button
                      onClick={handleInstallPWA}
                      className="w-full py-2.5 px-4 bg-[#10b981] hover:bg-[#059669] text-[#021811] font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>INSTALAR DIRECTO EN ANDROID</span>
                    </button>
                  )}

                  {/* Download Android Manifest / Package */}
                  <button
                    onClick={() => {
                      downloadAndroidConfig();
                      showNotification('Paquete de configuración Android descargado.');
                    }}
                    className="w-full py-2 px-3 bg-[#082218] hover:bg-[#0e3b28] border border-[#1b5d3d] text-[#86efac] hover:text-white font-mono text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ArrowDownToLine className="w-3.5 h-3.5" />
                    <span>Descargar "CVIE_Android_Package.json"</span>
                  </button>

                  {/* Step by step manual guide */}
                  <div className="p-3 bg-[#03110b] border border-[#133c29] rounded-xs space-y-1.5 text-[11px] font-mono text-[#cbd5e1]">
                    <span className="text-[#facc15] font-bold block mb-1">INSTRUCCIONES MANUALES EN ANDROID:</span>
                    <p>1. Abra este enlace en <strong>Google Chrome</strong> en su móvil.</p>
                    <p>2. Toque el menú de tres puntos (<strong>⋮</strong>) en la esquina superior.</p>
                    <p>3. Seleccione <strong>"Instalar aplicación"</strong> o <strong>"Agregar a pantalla principal"</strong>.</p>
                  </div>
                </div>

                {/* iOS SECTION (iPhone / iPad) */}
                <div className="p-5 bg-[#051a12] border border-[#164a33] rounded-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#143e2b] pb-2.5">
                    <span className="font-heading text-sm font-bold text-white uppercase flex items-center gap-2">
                      <Apple className="w-4 h-4 text-[#38bdf8]" />
                      <span>Apple iOS (iPhone / iPad)</span>
                    </span>
                    <span className="px-2 py-0.5 bg-[#0a2333] text-[#38bdf8] border border-[#174e6f] text-[10px] font-mono font-bold rounded-2xs">
                      WEBCLIP / SAFARI
                    </span>
                  </div>

                  <p className="text-xs text-[#9ebcb0] leading-relaxed">
                    En dispositivos Apple con Safari, la instalación se realiza mediante el sistema nativo <strong>WebClip</strong> para obtener experiencia de pantalla completa sin interfaz de navegador.
                  </p>

                  {/* Download Apple Configuration Profile (.mobileconfig) */}
                  <button
                    onClick={() => {
                      downloadIOSProfile();
                      showNotification('Perfil de configuración iOS (.mobileconfig) descargado.');
                    }}
                    className="w-full py-2.5 px-3 bg-[#082218] hover:bg-[#0e3b28] border border-[#1b5d3d] text-[#86efac] hover:text-white font-mono text-xs font-bold rounded-2xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ArrowDownToLine className="w-3.5 h-3.5" />
                    <span>Descargar Perfil iOS (.mobileconfig)</span>
                  </button>

                  {/* Visual Step-by-step for iOS Safari */}
                  <div className="p-3 bg-[#03110b] border border-[#133c29] rounded-xs space-y-2 text-[11px] font-mono text-[#cbd5e1]">
                    <span className="text-[#38bdf8] font-bold block mb-1">INSTALACIÓN EN SAFARI (PASO A PASO):</span>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#0a2838] border border-[#38bdf8] text-[#38bdf8] flex items-center justify-center text-[10px] shrink-0 font-bold">1</span>
                      <span>Abra esta página en <strong>Safari</strong> en su iPhone o iPad.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#0a2838] border border-[#38bdf8] text-[#38bdf8] flex items-center justify-center text-[10px] shrink-0 font-bold">2</span>
                      <span>Toque el botón <strong>Compartir</strong> (<Share2 className="w-3 h-3 inline text-[#38bdf8]" />) en la barra inferior.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#0a2838] border border-[#38bdf8] text-[#38bdf8] flex items-center justify-center text-[10px] shrink-0 font-bold">3</span>
                      <span>Deslice hacia abajo y seleccione <strong>"Agregar a inicio"</strong>.</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* TAB 3: PAQUETE OFFLINE & PORTABLE                                     */}
          {/* ===================================================================== */}
          {activeTab === 'offline' && (
            <div className="space-y-5 animate-fadeIn">
              
              <div className="p-5 bg-[#061e14] border border-[#1d6342] rounded-xs space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-[#34d399]" />
                  <div>
                    <h3 className="font-heading text-sm sm:text-base font-bold text-white uppercase">
                      Paquete Autónomo de Despliegue en Campo
                    </h3>
                    <p className="text-xs text-[#9ebcb0]">
                      Para salas de mando, operaciones de despliegue rápido o equipos de reserva sin conexión continua a Internet.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                  <div className="p-3 bg-[#04140e] border border-[#143e2b] rounded-2xs">
                    <span className="text-[#34d399] font-bold block mb-1">SERVICIO WORKER</span>
                    <span className="text-[#86efac]">Activo (Pre-caché de activos)</span>
                  </div>
                  <div className="p-3 bg-[#04140e] border border-[#143e2b] rounded-2xs">
                    <span className="text-[#34d399] font-bold block mb-1">PROTOCOLO</span>
                    <span className="text-[#86efac]">PWA Standalone</span>
                  </div>
                  <div className="p-3 bg-[#04140e] border border-[#143e2b] rounded-2xs">
                    <span className="text-[#34d399] font-bold block mb-1">SEGURIDAD</span>
                    <span className="text-[#86efac]">SSL-TAC-256</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      downloadOfflineStandaloneHTML();
                      showNotification('Descargando lanzador portable (.html)...');
                    }}
                    className="flex-1 py-3 px-4 bg-[#10b981] hover:bg-[#059669] text-[#021811] font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>DESCARGAR LANZADOR AUTÓNOMO (.HTML)</span>
                  </button>

                  <button
                    onClick={() => {
                      downloadWindowsInstaller();
                      downloadDesktopShortcut();
                      showNotification('Descargando lote de archivos para PC...');
                    }}
                    className="py-3 px-4 bg-[#092b1d] hover:bg-[#0f402c] border border-[#206945] text-[#86efac] font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>DESCARGAR LOTE WINDOWS (.BAT + .URL)</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#04130d] border border-[#143e2b] rounded-xs text-xs font-mono text-[#80a995] space-y-1.5">
                <span className="font-bold text-white block">NOTA TÉCNICA DE INSTALACIÓN:</span>
                <p>
                  Una vez que la aplicación se instala o se abre en el dispositivo por primera vez, el motor Service Worker de PWA almacena en caché local las interfaces, gráficos y simuladores para permitir el entrenamiento y la consulta táctica incluso en condiciones de desconexión temporal o ancho de banda restringido.
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <footer className="bg-[#020d08] border-t border-[#143e2b] px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#6e9b86] z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#34d399]" />
            <span>CERTIFICACIÓN DE SEGURIDAD DIGITAL // ECEME BOLIVIA</span>
          </div>

          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-[#09291b] hover:bg-[#124230] text-[#cbd5e1] hover:text-white border border-[#1b5d3d] rounded-xs transition-colors cursor-pointer uppercase text-[11px] font-bold"
          >
            Cerrar Ventana
          </button>
        </footer>

      </div>
    </div>
  );
}
