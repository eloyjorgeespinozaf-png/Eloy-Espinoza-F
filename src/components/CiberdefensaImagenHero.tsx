import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  Maximize2, 
  Minimize2, 
  Sliders, 
  Sparkles, 
  Activity, 
  Radio, 
  Server, 
  Cpu, 
  Zap, 
  Layers, 
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Flame,
  Info
} from 'lucide-react';

interface CiberdefensaImagenHeroProps {
  onSelectHotspot?: (hotspotKey: string) => void;
  compact?: boolean;
}

type ContrastPreset = 'neon' | 'gold' | 'flir' | 'oled';

export function CiberdefensaImagenHero({ onSelectHotspot, compact = false }: CiberdefensaImagenHeroProps) {
  const [imageError, setImageError] = useState(false);
  const [contrastPreset, setContrastPreset] = useState<ContrastPreset>('neon');
  const [contrastValue, setContrastValue] = useState<number>(135);
  const [brightnessValue, setBrightnessValue] = useState<number>(110);
  const [saturationValue, setSaturationValue] = useState<number>(120);
  const [backlightActive, setBacklightActive] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);

  // Apply preset adjustments
  const applyPreset = (preset: ContrastPreset) => {
    setContrastPreset(preset);
    switch (preset) {
      case 'neon':
        setContrastValue(135);
        setBrightnessValue(110);
        setSaturationValue(125);
        setBacklightActive(true);
        break;
      case 'gold':
        setContrastValue(125);
        setBrightnessValue(105);
        setSaturationValue(140);
        setBacklightActive(true);
        break;
      case 'flir':
        setContrastValue(170);
        setBrightnessValue(95);
        setSaturationValue(60);
        setBacklightActive(true);
        break;
      case 'oled':
        setContrastValue(160);
        setBrightnessValue(115);
        setSaturationValue(110);
        setBacklightActive(false);
        break;
    }
  };

  const resetFilters = () => {
    applyPreset('neon');
  };

  // Preset styles for the frame boundary and outer glow (isolating against dark background)
  const getPresetContainerStyles = () => {
    switch (contrastPreset) {
      case 'neon':
        return {
          border: 'border-2 border-[#00ffff]',
          shadow: backlightActive 
            ? 'shadow-[0_0_45px_rgba(0,255,255,0.45),0_0_90px_rgba(0,255,255,0.15)]' 
            : 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]',
          cornerColor: 'border-[#00ffff]',
          headerBadge: 'bg-[#00ffff]/20 border-[#00ffff] text-[#00ffff]',
          haloGradient: 'from-[#00ffff]/15 via-transparent to-[#00e676]/10'
        };
      case 'gold':
        return {
          border: 'border-2 border-[#facc15]',
          shadow: backlightActive 
            ? 'shadow-[0_0_45px_rgba(250,204,21,0.4),0_0_90px_rgba(250,204,21,0.15)]' 
            : 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]',
          cornerColor: 'border-[#facc15]',
          headerBadge: 'bg-[#facc15]/20 border-[#facc15] text-[#facc15]',
          haloGradient: 'from-[#facc15]/15 via-transparent to-[#f59e0b]/10'
        };
      case 'flir':
        return {
          border: 'border-2 border-[#00e676]',
          shadow: backlightActive 
            ? 'shadow-[0_0_45px_rgba(0,230,118,0.4),0_0_90px_rgba(0,230,118,0.15)]' 
            : 'shadow-[0_10px_30px_rgba(0,0,0,0.8)]',
          cornerColor: 'border-[#00e676]',
          headerBadge: 'bg-[#00e676]/20 border-[#00e676] text-[#00e676]',
          haloGradient: 'from-[#00e676]/20 via-transparent to-[#10b981]/10'
        };
      case 'oled':
        return {
          border: 'border-2 border-white',
          shadow: 'shadow-[0_0_30px_rgba(255,255,255,0.25)]',
          cornerColor: 'border-white',
          headerBadge: 'bg-white/20 border-white text-white',
          haloGradient: 'from-white/10 via-transparent to-transparent'
        };
    }
  };

  const styles = getPresetContainerStyles();

  // CSS Filter string for the image/display
  const filterStyle: React.CSSProperties = {
    filter: `contrast(${contrastValue}%) brightness(${brightnessValue}%) saturate(${saturationValue}%)`,
    transition: 'filter 0.25s ease'
  };

  return (
    <div className={`relative w-full ${isFullscreen ? 'fixed inset-0 z-50 p-4 sm:p-8 bg-black/95 backdrop-blur-xl flex flex-col justify-center items-center overflow-y-auto' : 'my-2 sm:my-3'}`}>
      
      {/* Dynamic Backlight Halo (CONTRAST WITH BACKGROUND) */}
      {backlightActive && (
        <div 
          className={`absolute -inset-1.5 sm:-inset-2 rounded-xs bg-gradient-to-r ${styles.haloGradient} blur-xl opacity-80 pointer-events-none transition-all duration-500`}
        />
      )}

      {/* Main Container */}
      <div 
        className={`relative w-full bg-[#030712] ${styles.border} ${styles.shadow} rounded-2xs overflow-hidden transition-all duration-300 flex flex-col ${isFullscreen ? 'max-w-6xl max-h-[92vh]' : ''}`}
      >
        {/* Tactical Corner Brackets for High-Contrast Silhouette */}
        <div className={`absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 ${styles.cornerColor} z-20 pointer-events-none`} />
        <div className={`absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 ${styles.cornerColor} z-20 pointer-events-none`} />
        <div className={`absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 ${styles.cornerColor} z-20 pointer-events-none`} />
        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 ${styles.cornerColor} z-20 pointer-events-none`} />

        {/* 1. TOP HEADER & CONTRAST BAR */}
        <div className="bg-[#070e20] border-b border-[#1e3a6c] px-3 sm:px-4 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-2.5 z-20 relative">
          
          {/* Institutional Titles */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className={`px-2 py-0.5 rounded-2xs border font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5 ${styles.headerBadge}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>EJÉRCITO DE BOLIVIA</span>
            </span>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <span>CIBERDEFENSA Y RESILIENCIA TECNOLÓGICA</span>
                <span className="text-[10px] font-mono font-normal px-1.5 py-0.2 bg-[#1e3a6c]/60 text-[#38bdf8] rounded-2xs hidden md:inline">
                  GESTIÓN DE RIESGO DE RED
                </span>
              </h2>
            </div>
          </div>

          {/* Quick Contrast Controls Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {/* Presets */}
            <div className="flex items-center bg-[#0b162e] border border-[#1e3a6c] p-0.5 rounded-2xs">
              <button
                type="button"
                onClick={() => applyPreset('neon')}
                className={`px-2 py-0.5 font-mono text-[10px] rounded-2xs transition-all cursor-pointer font-semibold ${
                  contrastPreset === 'neon' 
                    ? 'bg-[#00ffff] text-[#030712] font-bold shadow-[0_0_8px_rgba(0,255,255,0.4)]' 
                    : 'text-[#64748b] hover:text-[#00ffff]'
                }`}
                title="Contraste Neón Ciberdefensa (Recomendado)"
              >
                ⚡ Neón
              </button>
              <button
                type="button"
                onClick={() => applyPreset('gold')}
                className={`px-2 py-0.5 font-mono text-[10px] rounded-2xs transition-all cursor-pointer font-semibold ${
                  contrastPreset === 'gold' 
                    ? 'bg-[#facc15] text-[#030712] font-bold shadow-[0_0_8px_rgba(250,204,21,0.4)]' 
                    : 'text-[#64748b] hover:text-[#facc15]'
                }`}
                title="Contraste Dorado Ejército de Bolivia"
              >
                🛡️ Dorado
              </button>
              <button
                type="button"
                onClick={() => applyPreset('flir')}
                className={`px-2 py-0.5 font-mono text-[10px] rounded-2xs transition-all cursor-pointer font-semibold ${
                  contrastPreset === 'flir' 
                    ? 'bg-[#00e676] text-[#030712] font-bold shadow-[0_0_8px_rgba(0,230,118,0.4)]' 
                    : 'text-[#64748b] hover:text-[#00e676]'
                }`}
                title="Visión Táctica FLIR / Alto Contraste"
              >
                👁️ FLIR
              </button>
              <button
                type="button"
                onClick={() => applyPreset('oled')}
                className={`px-2 py-0.5 font-mono text-[10px] rounded-2xs transition-all cursor-pointer font-semibold ${
                  contrastPreset === 'oled' 
                    ? 'bg-white text-[#030712] font-bold shadow-[0_0_8px_rgba(255,255,255,0.4)]' 
                    : 'text-[#64748b] hover:text-white'
                }`}
                title="Contraste Aislado Fondo Negro"
              >
                🌑 Stealth
              </button>
            </div>

            {/* Toggle Sliders Panel */}
            <button
              type="button"
              onClick={() => setShowControls(!showControls)}
              className={`p-1 sm:px-2 sm:py-1 rounded-2xs border font-mono text-[11px] transition-all cursor-pointer flex items-center gap-1 ${
                showControls 
                  ? 'bg-[#00ffff]/20 border-[#00ffff] text-[#00ffff]' 
                  : 'bg-[#0b162e] border-[#1e3a6c] text-[#94a3b8] hover:text-white'
              }`}
              title="Ajustar parámetros manuales de contraste, brillo y luz de fondo"
            >
              <Sliders className="w-3 h-3" />
              <span className="hidden sm:inline">Ajustar Contraste</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 sm:px-2 sm:py-1 bg-[#0b162e] hover:bg-[#15274d] border border-[#1e3a6c] text-[#94a3b8] hover:text-white rounded-2xs font-mono text-[11px] transition-all cursor-pointer flex items-center gap-1"
              title={isFullscreen ? 'Reducir tamaño' : 'Ver en Pantalla Completa / Alta Definición'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Minimizar' : 'Ampliar'}</span>
            </button>
          </div>
        </div>

        {/* 2. MANUAL CONTRAST SLIDERS ACCORDION (WHEN TOGGLED) */}
        {showControls && (
          <div className="bg-[#050b18] border-b border-[#1e3a6c] px-3 sm:px-4 py-2 sm:py-2.5 grid grid-cols-1 sm:grid-cols-4 gap-3 text-[11px] font-mono z-20 relative animate-fadeIn">
            {/* Contraste */}
            <div className="space-y-1">
              <div className="flex justify-between text-[#94a3b8]">
                <span>CONTRASTE DINÁMICO:</span>
                <span className="text-[#00ffff] font-bold">{contrastValue}%</span>
              </div>
              <input
                type="range"
                min="100"
                max="200"
                step="5"
                value={contrastValue}
                onChange={(e) => setContrastValue(Number(e.target.value))}
                className="w-full accent-[#00ffff] cursor-pointer h-1.5 bg-[#111e3f] rounded-lg"
              />
            </div>

            {/* Brillo */}
            <div className="space-y-1">
              <div className="flex justify-between text-[#94a3b8]">
                <span>LUMINOSIDAD / BRILLO:</span>
                <span className="text-[#facc15] font-bold">{brightnessValue}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="150"
                step="5"
                value={brightnessValue}
                onChange={(e) => setBrightnessValue(Number(e.target.value))}
                className="w-full accent-[#facc15] cursor-pointer h-1.5 bg-[#111e3f] rounded-lg"
              />
            </div>

            {/* Saturación */}
            <div className="space-y-1">
              <div className="flex justify-between text-[#94a3b8]">
                <span>SATURACIÓN COLOR:</span>
                <span className="text-[#00e676] font-bold">{saturationValue}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="180"
                step="5"
                value={saturationValue}
                onChange={(e) => setSaturationValue(Number(e.target.value))}
                className="w-full accent-[#00e676] cursor-pointer h-1.5 bg-[#111e3f] rounded-lg"
              />
            </div>

            {/* Luz de Fondo LED Toggle & Reset */}
            <div className="flex items-center justify-between sm:justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setBacklightActive(!backlightActive)}
                className={`px-2 py-1 border rounded-2xs text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
                  backlightActive 
                    ? 'bg-[#00ffff]/20 border-[#00ffff] text-[#00ffff]' 
                    : 'bg-[#111e3f] border-[#1e3a6c] text-[#64748b]'
                }`}
                title="Enciende un halo perimetral que acentúa el contraste con el fondo general"
              >
                <Sparkles className="w-3 h-3" />
                <span>Halo LED: {backlightActive ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="px-2 py-1 bg-[#111e3f] hover:bg-[#1a2e5c] border border-[#1e3a6c] text-[#cbd5e1] rounded-2xs text-[10px] flex items-center gap-1 cursor-pointer"
                title="Restablecer filtros recomendados"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. VISUAL DISPLAY CANVAS (IMAGE WITH HOTSPOTS & CONTRASTED HUD) */}
        <div className="relative w-full bg-[#02050e] overflow-hidden select-none group aspect-video max-h-[560px] flex items-center justify-center">
          
          {/* A. REAL PHOTOGRAPHIC IMAGE (with onError fallback to High-Fidelity SVG visual) */}
          {!imageError ? (
            <img
              src="/Gemini_Generated_Image_pqy5ffpqy5ffpqy5.jpg"
              alt="Ejército de Bolivia - Ciberdefensa y Resiliencia Tecnológica - Gestión de Riesgo de Red"
              style={filterStyle}
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
          ) : (
            /* B. HIGH-FIDELITY VECTORIAL TACTICAL REPRODUCTION OF THE EXACT COMMAND CENTER SCENE */
            <div 
              style={filterStyle}
              className="w-full h-full relative bg-gradient-to-b from-[#060c1d] via-[#040814] to-[#020409] flex flex-col justify-between p-3 sm:p-6 overflow-hidden"
            >
              {/* Background server racks & cyan ambient lighting */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,255,0.15),transparent_70%)] pointer-events-none" />
              
              {/* Perspective Grid Floor */}
              <div 
                className="absolute inset-x-0 bottom-0 h-1/2 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                  transform: 'perspective(300px) rotateX(60deg)',
                  transformOrigin: 'bottom'
                }}
              />

              {/* TOP WALL: INSTITUTIONAL COAT OF ARMS & HOLOGRAPHIC TITLES */}
              <div className="relative z-10 flex items-start justify-between">
                
                {/* Left: Tactical Room Status */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#00ffff] bg-[#00ffff]/10 border border-[#00ffff]/40 px-2 py-0.5 rounded-2xs backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ffff] animate-ping" />
                    <span>SALA DE OPERACIONES // COMANDO C4ISR</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#64748b]">
                    LAT: -16.4897° // LON: -68.1193° [LA PAZ, BOLIVIA]
                  </div>
                </div>

                {/* Center: Holographic Room Title */}
                <div className="text-center">
                  <div className="font-mono text-xs sm:text-sm font-black text-white tracking-[0.25em] drop-shadow-[0_0_12px_rgba(0,255,255,0.8)]">
                    EJÉRCITO DE BOLIVIA
                  </div>
                  <div className="font-mono text-[10px] sm:text-xs font-bold text-[#00ffff] tracking-widest drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]">
                    CIBERDEFENSA Y RESILIENCIA TECNOLÓGICA
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-[#facc15] tracking-wider uppercase">
                    GESTIÓN DE RIESGO DE RED
                  </div>
                </div>

                {/* Right: Bolivian Army Golden Illuminated Emblem */}
                <div className="flex items-center gap-2 bg-[#09142b]/80 border border-[#facc15]/50 px-2.5 py-1 rounded-2xs shadow-[0_0_15px_rgba(250,204,21,0.25)]">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#dc2626] via-[#facc15] to-[#16a34a] p-0.5 flex items-center justify-center shadow-md">
                    <ShieldCheck className="w-4 h-4 text-[#030712]" />
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[9px] font-bold text-[#facc15]">ESCUDO DE ARMAS</div>
                    <div className="font-mono text-[8px] text-[#94a3b8]">DOCTRINA MILITAR</div>
                  </div>
                </div>
              </div>

              {/* CENTER: MASSIVE FLOATING HOLOGRAPHIC MAP OF BOLIVIA & RESILIENCE NODES */}
              <div className="relative z-10 flex-1 flex items-center justify-center my-2">
                <div className="relative w-72 sm:w-96 h-48 sm:h-64 flex items-center justify-center">
                  
                  {/* Outer Holographic Glow Arc */}
                  <div className="absolute inset-0 rounded-full border border-[#00ffff]/30 shadow-[0_0_30px_rgba(0,255,255,0.2)] animate-pulse" />
                  <div className="absolute inset-4 rounded-full border border-[#00e676]/20 border-dashed" />
                  
                  {/* SVG Holographic Map of Bolivia & South America Data Links */}
                  <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]">
                    {/* South America Continental Silhouette faint outline */}
                    <path
                      d="M120,40 Q160,20 220,30 Q280,60 300,120 Q310,180 280,240 Q240,290 200,280 Q160,260 140,200 Q110,140 120,40 Z"
                      fill="none"
                      stroke="#1e3a6c"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                      opacity="0.4"
                    />

                    {/* Bolivia National Polygon (Geometric Tactical Style) */}
                    <polygon
                      points="170,95 210,90 240,110 250,150 230,195 200,205 165,185 155,140 160,110"
                      fill="rgba(0, 255, 255, 0.08)"
                      stroke="#00ffff"
                      strokeWidth="2"
                    />

                    {/* Tactical Grid over Bolivia */}
                    <line x1="160" y1="140" x2="245" y2="140" stroke="#00ffff" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.6" />
                    <line x1="200" y1="95" x2="200" y2="200" stroke="#00ffff" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.6" />

                    {/* Major Strategic Nodes in Bolivia */}
                    {/* 1. La Paz (C4ISR / Estado Mayor) */}
                    <circle cx="175" cy="125" r="5" fill="#00ffff" className="animate-ping" opacity="0.75" />
                    <circle cx="175" cy="125" r="3.5" fill="#ffffff" stroke="#00ffff" strokeWidth="1.5" />
                    <text x="145" y="122" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">LA PAZ [C4ISR]</text>

                    {/* 2. Cochabamba (Hub de Telecomunicaciones) */}
                    <circle cx="200" cy="145" r="4" fill="#00e676" />
                    <text x="207" y="147" fill="#a7f3d0" fontSize="7" fontFamily="monospace">COCHABAMBA</text>

                    {/* 3. Santa Cruz (Matriz Energética / Industrial SCADA) */}
                    <circle cx="230" cy="155" r="4.5" fill="#facc15" />
                    <text x="238" y="157" fill="#fef08a" fontSize="7" fontFamily="monospace" fontWeight="bold">STA. CRUZ [SCADA]</text>

                    {/* 4. Sucre / Tarija (Red de Enlace Sur) */}
                    <circle cx="205" cy="180" r="3.5" fill="#00ffff" />
                    <text x="180" y="195" fill="#67e8f9" fontSize="6.5" fontFamily="monospace">SUR (TARIJA/POTOSÍ)</text>

                    {/* Resilience Interconnection Links (Active Glowing Arcs) */}
                    <path d="M175,125 Q188,135 200,145" fill="none" stroke="#00ffff" strokeWidth="2" />
                    <path d="M200,145 Q215,150 230,155" fill="none" stroke="#00ffff" strokeWidth="2" />
                    <path d="M200,145 Q202,165 205,180" fill="none" stroke="#00e676" strokeWidth="1.5" strokeDasharray="3,2" />
                    <path d="M175,125 Q200,110 230,155" fill="none" stroke="#facc15" strokeWidth="1" strokeDasharray="4,4" opacity="0.8" />

                    {/* External International Cable Resiliency Arcs */}
                    <path d="M175,125 Q130,130 90,140" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
                    <path d="M230,155 Q270,160 320,150" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
                    <text x="210" y="115" fill="#00ffff" fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="2">RESILIENCIA</text>
                  </svg>

                  {/* Left military operator silhouette */}
                  <div className="absolute left-2 bottom-1 flex items-end gap-1.5 opacity-90">
                    <div className="bg-[#09152a] border border-[#1e3a6c] px-2 py-1 rounded-2xs text-[9px] font-mono text-[#94a3b8] backdrop-blur-md">
                      <div className="text-white font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00ffff]" />
                        <span>OPERADOR SIGINT</span>
                      </div>
                      <div className="text-[8px] text-[#38bdf8]">Suboficial Comunicaciones</div>
                    </div>
                  </div>

                  {/* Right military officer silhouette */}
                  <div className="absolute right-2 bottom-1 flex items-end gap-1.5 opacity-90">
                    <div className="bg-[#09152a] border border-[#1e3a6c] px-2 py-1 rounded-2xs text-[9px] font-mono text-[#94a3b8] backdrop-blur-md text-right">
                      <div className="text-white font-bold flex items-center justify-end gap-1">
                        <span>ANALISTA RED TEAM</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00e676]" />
                      </div>
                      <div className="text-[8px] text-[#a7f3d0]">Oficial Ciberinteligencia</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM TELEMETRY STATUS MONITORS (MATCHING USER IMAGE READOUTS) */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#1e3a6c]/60">
                {/* 1. Threat Status */}
                <div className="bg-[#040a18]/90 border border-[#00e676]/40 p-1.5 sm:p-2 rounded-2xs">
                  <div className="font-mono text-[8px] sm:text-[9px] text-[#64748b] uppercase">ESTADO DE AMENAZAS</div>
                  <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[#00e676] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#00e676]" />
                    <span>SEGURO // NINGUNA VULN.</span>
                  </div>
                </div>

                {/* 2. Resilience Protocol */}
                <div className="bg-[#040a18]/90 border border-[#00ffff]/40 p-1.5 sm:p-2 rounded-2xs">
                  <div className="font-mono text-[8px] sm:text-[9px] text-[#64748b] uppercase">PROTOCOLO DE RESILIENCIA</div>
                  <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[#00ffff] flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#00ffff]" />
                    <span>ACTIVO // AIR-GAP SCADA</span>
                  </div>
                </div>

                {/* 3. Tactical Data Monitoring */}
                <div className="bg-[#040a18]/90 border border-[#facc15]/40 p-1.5 sm:p-2 rounded-2xs">
                  <div className="font-mono text-[8px] sm:text-[9px] text-[#64748b] uppercase">MONITOREO TÁCTICO</div>
                  <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[#facc15] flex items-center gap-1">
                    <Activity className="w-3 h-3 text-[#facc15]" />
                    <span>DATOS EN VIVO: 99.98%</span>
                  </div>
                </div>

                {/* 4. Critical Infrastructure */}
                <div className="bg-[#040a18]/90 border border-[#38bdf8]/40 p-1.5 sm:p-2 rounded-2xs">
                  <div className="font-mono text-[8px] sm:text-[9px] text-[#64748b] uppercase">DEFENSA INFRAESTRUCTURA</div>
                  <div className="font-mono text-[10px] sm:text-[11px] font-bold text-[#38bdf8] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#38bdf8]" />
                    <span>CRÍTICA // BLINDADA</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* C. INTERACTIVE TACTICAL HOTSPOTS OVERLAY */}
          {/* Hotspot 1: Bolivia Holographic Core Map */}
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 'map' ? null : 'map')}
            className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 group/spot p-2 cursor-pointer"
            title="Nodo Central: Mapa Holográfico de Bolivia y Topología de Resiliencia"
          >
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffff] opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#00ffff]/80 border-2 border-white items-center justify-center text-[9px] font-bold text-black font-mono shadow-[0_0_10px_#00ffff]">
                1
              </span>
            </span>
          </button>

          {/* Hotspot 2: Operador Militar de Ciberdefensa */}
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 'operator' ? null : 'operator')}
            className="absolute top-[58%] right-[18%] z-30 group/spot p-2 cursor-pointer"
            title="Estación de Operador: Suboficial de Comunicaciones C4ISR y Teclado Holográfico"
          >
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e676] opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#00e676]/80 border-2 border-white items-center justify-center text-[9px] font-bold text-black font-mono shadow-[0_0_10px_#00e676]">
                2
              </span>
            </span>
          </button>

          {/* Hotspot 3: Escudo Institucional Ejército de Bolivia */}
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 'crest' ? null : 'crest')}
            className="absolute top-[22%] right-[16%] z-30 group/spot p-2 cursor-pointer"
            title="Escudo Institucional: Ejército de Bolivia y Doctrina de Seguridad Nacional"
          >
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#facc15] opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#facc15]/80 border-2 border-white items-center justify-center text-[9px] font-bold text-black font-mono shadow-[0_0_10px_#facc15]">
                3
              </span>
            </span>
          </button>

          {/* Hotspot 4: Monitores de Riesgo SCADA y Servidores */}
          <button
            type="button"
            onClick={() => setActiveHotspot(activeHotspot === 'scada' ? null : 'scada')}
            className="absolute bottom-[16%] left-[22%] z-30 group/spot p-2 cursor-pointer"
            title="Telemetría de Riesgo SCADA y Monitoreo de Infraestructuras Críticas"
          >
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff0055] opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#ff0055]/80 border-2 border-white items-center justify-center text-[9px] font-bold text-white font-mono shadow-[0_0_10px_#ff0055]">
                4
              </span>
            </span>
          </button>

          {/* D. HOTSPOT DETAIL FLOATING POPOVER */}
          {activeHotspot && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md bg-[#081226]/95 border-2 border-[#00ffff] p-3 sm:p-4 rounded-2xs shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(0,255,255,0.3)] backdrop-blur-md z-40 animate-fadeIn font-mono">
              <div className="flex items-center justify-between border-b border-[#1e3a6c] pb-2 mb-2">
                <span className="text-xs font-bold text-[#00ffff] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#00ffff]" />
                  {activeHotspot === 'map' && 'PUNTO 1: TOPOLOGÍA HOLOGRÁFICA DE BOLIVIA'}
                  {activeHotspot === 'operator' && 'PUNTO 2: ESTACIÓN TÁCTICA DEL OPERADOR'}
                  {activeHotspot === 'crest' && 'PUNTO 3: DOCTRINA DEL EJÉRCITO DE BOLIVIA'}
                  {activeHotspot === 'scada' && 'PUNTO 4: MONITOREO DE RIESGO DE RED SCADA'}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="text-[#64748b] hover:text-white text-xs px-1.5 py-0.5 bg-[#111e3f] rounded-2xs cursor-pointer"
                >
                  ✕ Cerrar
                </button>
              </div>

              <div className="text-[11px] text-[#cbd5e1] space-y-1.5 font-sans leading-relaxed">
                {activeHotspot === 'map' && (
                  <>
                    <p>
                      <strong>Red de Troncales y Nodos Soberanos:</strong> El mapa holográfico central muestra los enlaces redundantes de fibra óptica y microondas entre La Paz (C4ISR Central), Cochabamba (Conectividad Interoceánica) y Santa Cruz (Matriz de Hidrocarburos y Electricidad).
                    </p>
                    <div className="p-1.5 bg-[#040a18] border border-[#00ffff]/30 rounded-2xs text-[10px] font-mono text-[#00ffff]">
                      Ruta Táctica Activa: Enlace de fibra óptica cifrado AES-256 GCM con salto por satélite TKSAT-1.
                    </div>
                  </>
                )}

                {activeHotspot === 'operator' && (
                  <>
                    <p>
                      <strong>Personal Militar Especializado:</strong> Oficiales y suboficiales del arma de Comunicaciones e Inteligencia operan con consolas holográficas y auriculares encriptados bajo protocolos OPSEC rigurosos.
                    </p>
                    <div className="p-1.5 bg-[#040a18] border border-[#00e676]/30 rounded-2xs text-[10px] font-mono text-[#a7f3d0]">
                      Protocolo: Sanitización biométrica y cero emisión electromagnética TEMPEST en sala cerrada.
                    </div>
                  </>
                )}

                {activeHotspot === 'crest' && (
                  <>
                    <p>
                      <strong>Identidad Institucional y Doctrina:</strong> El escudo del Ejército de Bolivia simboliza la custodia soberana del ciberespacio nacional como quinto dominio de la guerra moderna (Tierra, Mar, Aire, Espacio y Ciberespacio).
                    </p>
                    <div className="p-1.5 bg-[#040a18] border border-[#facc15]/30 rounded-2xs text-[10px] font-mono text-[#fef08a]">
                      Misión: Garantizar la continuidad operativa del Estado ante ataques cibernéticos a gran escala.
                    </div>
                  </>
                )}

                {activeHotspot === 'scada' && (
                  <>
                    <p>
                      <strong>Aislamiento de Infraestructuras Críticas:</strong> Los paneles inferiores monitorean en tiempo real presiones, frecuencias de red y flujos de datos en subestaciones eléctricas y gasoductos de exportación.
                    </p>
                    <div className="p-1.5 bg-[#040a18] border border-[#ff0055]/30 rounded-2xs text-[10px] font-mono text-[#fca5a5]">
                      Estado: Air-Gap estricto activado en Anillo 2 de Warden. Vectores externos repelidos al 100%.
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 4. FOOTER STATUS BAR WITH CONTRAST CONFIRMATION */}
        <div className="bg-[#070e20] border-t border-[#1e3a6c] px-3 sm:px-4 py-1.5 sm:py-2 flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-mono">
          <div className="flex items-center gap-2 text-[#94a3b8]">
            <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
            <span className="text-white font-semibold">CONTRASTE VISUAL CON EL FONDO:</span>
            <span className={`px-1.5 py-0.2 rounded-2xs font-bold text-[10px] ${
              contrastPreset === 'neon' 
                ? 'bg-[#00ffff]/20 text-[#00ffff] border border-[#00ffff]/50' 
                : contrastPreset === 'gold' 
                ? 'bg-[#facc15]/20 text-[#facc15] border border-[#facc15]/50' 
                : contrastPreset === 'flir' 
                ? 'bg-[#00e676]/20 text-[#00e676] border border-[#00e676]/50' 
                : 'bg-white/20 text-white border border-white/50'
            }`}>
              {contrastPreset === 'neon' && 'ALTO CONTRASTE NEÓN // PERÍMETRO AISLANTE'}
              {contrastPreset === 'gold' && 'CONTRASTE DORADO MILITAR // RESPLANDOR TÁCTICO'}
              {contrastPreset === 'flir' && 'CONTRASTE FLIR // ALTA DEFINICIÓN'}
              {contrastPreset === 'oled' && 'CONTRASTE STEALTH // FONDO NEGRO PURO'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[#64748b]">
            <span className="hidden sm:inline">
              Filtro: C={contrastValue}% | B={brightnessValue}% | S={saturationValue}%
            </span>
            <span className="text-[#38bdf8] font-bold">
              [PULSE LOS NÚMEROS 1-4 EN LA IMAGEN PARA TELEMETRÍA]
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
