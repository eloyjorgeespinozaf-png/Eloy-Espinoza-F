import React from 'react';

interface Fase4BackgroundVisualProps {
  className?: string;
}

export const Fase4BackgroundVisual: React.FC<Fase4BackgroundVisualProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* 1. Deep Tactical Base Canvas with Emerald & Sunset Undertones */}
      <div className="absolute inset-0 bg-[#021811]" />

      {/* 2. SVG Vector Art: Exact Reproduction of "Inmersión Operativa C4I" */}
      <svg
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-85 group-hover:opacity-100"
      >
        <defs>
          {/* Emerald HUD Glow Filter */}
          <filter id="hudEmeraldGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Cyan Tactical Glow */}
          <filter id="hudCyanGlow4" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Red Hostile Threat Alert Glow */}
          <filter id="threatRedGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Amber AR Visor Glow */}
          <filter id="visorAmberGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Golden Hour Sunset Sky Gradient */}
          <linearGradient id="sunsetSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b3b4c" />
            <stop offset="35%" stopColor="#684234" />
            <stop offset="60%" stopColor="#b45309" />
            <stop offset="78%" stopColor="#d97706" />
            <stop offset="92%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>

          {/* Mountain Ridge Gradient */}
          <linearGradient id="mountainRidgeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#08101e" />
          </linearGradient>

          {/* Concrete Ruin / Bunker Wall Gradient */}
          <linearGradient id="concreteWallGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#262f2d" />
            <stop offset="40%" stopColor="#1a2321" />
            <stop offset="85%" stopColor="#0f1715" />
            <stop offset="100%" stopColor="#080e0c" />
          </linearGradient>

          {/* Emerald LiDAR Hemisphere Dome Radial Gradient */}
          <radialGradient id="lidarDomeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#059669" stopOpacity="0.2" />
            <stop offset="80%" stopColor="#047857" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0.0" />
          </radialGradient>

          {/* Tactical HUD Glass Panel Gradient */}
          <linearGradient id="hudPanelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#021f17" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#01140e" stopOpacity="0.94" />
          </linearGradient>

          {/* Camouflage Pattern Defs */}
          <pattern id="bolivianDigiCamo" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect width="30" height="30" fill="#314436" />
            <rect x="0" y="0" width="8" height="8" fill="#1b2a1e" />
            <rect x="8" y="4" width="7" height="9" fill="#4a5d45" />
            <rect x="18" y="0" width="12" height="6" fill="#1e261a" />
            <rect x="15" y="8" width="6" height="8" fill="#58674d" />
            <rect x="22" y="12" width="8" height="9" fill="#253526" />
            <rect x="3" y="15" width="10" height="8" fill="#3f4e3c" />
            <rect x="12" y="20" width="9" height="10" fill="#131e15" />
            <rect x="0" y="24" width="7" height="6" fill="#4b5d49" />
          </pattern>
        </defs>

        {/* ======================================================== */}
        {/* LAYER 1: SKY, MOUNTAINS, AND URBAN VALLEY (LA PAZ / CBBA) */}
        {/* ======================================================== */}
        {/* Sky with Sunset Horizon */}
        <rect x="0" y="0" width="1280" height="460" fill="url(#sunsetSkyGrad)" />
        
        {/* Distant Sun Glow */}
        <circle cx="950" cy="340" r="140" fill="#fef08a" opacity="0.45" filter="url(#hudCyanGlow4)" />
        <circle cx="950" cy="340" r="60" fill="#fffbeb" opacity="0.65" />

        {/* Distant Andean Mountain Ridges */}
        <path d="M0,320 L120,290 L240,310 L380,265 L520,300 L680,250 L820,295 L960,270 L1100,305 L1280,280 L1280,480 L0,480 Z" fill="url(#mountainRidgeGrad)" opacity="0.85" />
        <path d="M0,345 L150,325 L310,340 L450,305 L590,335 L740,295 L900,325 L1060,300 L1200,335 L1280,320 L1280,500 L0,500 Z" fill="#0b1716" opacity="0.9" />

        {/* City Valley Buildings & Structures (Midground) */}
        <g fill="#14211e" opacity="0.85">
          {/* Dense urban skyline */}
          <rect x="180" y="380" width="35" height="70" />
          <rect x="220" y="360" width="40" height="90" />
          <rect x="265" y="390" width="30" height="60" />
          <rect x="300" y="370" width="45" height="80" />
          <rect x="350" y="400" width="55" height="50" />
          <rect x="410" y="385" width="40" height="65" />
          <rect x="455" y="365" width="50" height="85" />
          <rect x="510" y="395" width="35" height="55" />
          
          <rect x="25" y="420" width="60" height="90" />
          <rect x="90" y="430" width="50" height="80" />
          <rect x="145" y="440" width="55" height="70" />
          <rect x="55" y="470" width="70" height="60" />

          {/* Distant right buildings */}
          <rect x="980" y="380" width="45" height="70" />
          <rect x="1030" y="360" width="55" height="90" />
          <rect x="1090" y="375" width="40" height="75" />
          <rect x="1135" y="390" width="60" height="60" />
        </g>

        {/* Smoke Plumes Rising from Combat Impact Zones */}
        <path d="M48,460 Q55,410 70,370 Q85,330 80,280 Q75,230 110,180" stroke="#334155" strokeWidth="26" strokeLinecap="round" fill="none" opacity="0.35" filter="blur(8px)" />
        <path d="M235,390 Q245,350 255,300 Q265,250 250,210 Q240,170 270,120" stroke="#1e293b" strokeWidth="22" strokeLinecap="round" fill="none" opacity="0.4" filter="blur(6px)" />
        <path d="M780,380 Q790,340 805,300 Q820,260 810,210" stroke="#334155" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.3" filter="blur(6px)" />

        {/* Distant Fire & Impact Sparks in City */}
        <circle cx="58" cy="465" r="8" fill="#f97316" filter="url(#threatRedGlow)" opacity="0.8" />
        <circle cx="62" cy="463" r="4" fill="#fef08a" />
        <circle cx="240" cy="400" r="10" fill="#ea580c" filter="url(#threatRedGlow)" opacity="0.75" />
        <circle cx="242" cy="398" r="5" fill="#fde047" />

        {/* ======================================================== */}
        {/* LAYER 2: CONCRETE BUNKER RUINS & OUTLOOK STRUCTURE       */}
        {/* ======================================================== */}
        {/* Top Heavy Concrete Roof Slab */}
        <polygon points="0,0 1280,0 1280,110 980,105 760,95 640,60 0,65" fill="url(#concreteWallGrad)" />
        <polygon points="0,65 640,60 760,95 980,105 1280,110 1280,135 980,125 750,115 630,78 0,82" fill="#131b19" />

        {/* Vertical Left Arch Concrete Pillar */}
        <polygon points="0,65 45,70 50,720 0,720" fill="url(#concreteWallGrad)" />

        {/* Central Concrete Structural Column (Frames the view) */}
        <polygon points="460,60 540,60 535,720 450,720" fill="url(#concreteWallGrad)" />
        {/* Concrete column texture and lighting highlight from sunset */}
        <line x1="535" y1="60" x2="530" y2="720" stroke="#f59e0b" strokeWidth="2.5" opacity="0.4" />
        <rect x="465" y="140" width="12" height="40" fill="#0d1412" rx="2" />
        <rect x="495" y="240" width="18" height="25" fill="#0d1412" rx="2" />

        {/* Right Concrete Wall with Ruined Window/Portal Opening */}
        <polygon points="800,100 1280,110 1280,720 780,720 790,440 820,380 825,240 805,180" fill="url(#concreteWallGrad)" />
        <polygon points="805,180 825,240 820,380 790,440 760,450 755,200" fill="#111816" opacity="0.85" />
        {/* Rebar exposed in concrete */}
        <line x1="820" y1="210" x2="845" y2="195" stroke="#78350f" strokeWidth="2" />
        <line x1="823" y1="225" x2="855" y2="215" stroke="#78350f" strokeWidth="2" />
        <line x1="815" y1="360" x2="835" y2="350" stroke="#78350f" strokeWidth="2" />

        {/* Concrete Floor / Parapet Barrier */}
        <polygon points="0,580 480,560 620,580 1280,570 1280,720 0,720" fill="#0b1311" />
        <polygon points="0,575 480,555 620,575 1280,565 1280,580 620,590 480,570 0,590" fill="#1a2522" />

        {/* ======================================================== */}
        {/* LAYER 3: 3D LIDAR SENSOR DOME & TACTICAL UAV DRONE GRID  */}
        {/* ======================================================== */}
        {/* Hemispherical LiDAR Scan Dome centered over city basin */}
        <ellipse cx="250" cy="460" rx="140" ry="85" fill="url(#lidarDomeGrad)" className="animate-lidar-pulse" />
        
        {/* 3D Wireframe Grid Rings & Arcs (Emerald & Cyan) */}
        <g stroke="#10b981" strokeWidth="1.2" opacity="0.7" fill="none">
          <ellipse cx="250" cy="460" rx="130" ry="78" strokeDasharray="5,4" />
          <ellipse cx="250" cy="460" rx="100" ry="58" />
          <ellipse cx="250" cy="460" rx="70" ry="40" strokeDasharray="3,3" />
          <ellipse cx="250" cy="460" rx="35" ry="20" />
          
          {/* Radial scanning rays connecting to city terrain */}
          <line x1="250" y1="380" x2="250" y2="460" stroke="#34d399" strokeWidth="1.5" />
          <line x1="250" y1="460" x2="140" y2="480" />
          <line x1="250" y1="460" x2="360" y2="480" />
          <line x1="250" y1="460" x2="190" y2="420" />
          <line x1="250" y1="460" x2="310" y2="420" />
          <line x1="250" y1="460" x2="210" y2="510" />
          <line x1="250" y1="460" x2="290" y2="510" />
        </g>

        {/* LiDAR Ground-mapping Point Cloud Mesh */}
        <g fill="#34d399" opacity="0.6">
          <circle cx="160" cy="470" r="1.5" />
          <circle cx="180" cy="455" r="1.5" />
          <circle cx="210" cy="445" r="1.5" />
          <circle cx="230" cy="465" r="1.5" />
          <circle cx="260" cy="450" r="1.5" />
          <circle cx="285" cy="460" r="1.5" />
          <circle cx="310" cy="440" r="1.5" />
          <circle cx="330" cy="475" r="1.5" />
          <circle cx="195" cy="490" r="1.5" />
          <circle cx="240" cy="505" r="1.5" />
          <circle cx="275" cy="495" r="1.5" />
          <circle cx="305" cy="485" r="1.5" />
        </g>

        {/* UAV Drone Node Icon on Sensor Dome Apex */}
        <g transform="translate(250, 390)">
          <circle cx="0" cy="0" r="14" fill="#022c22" stroke="#10b981" strokeWidth="1.8" filter="url(#hudEmeraldGlow)" />
          {/* Drone 4 arms & rotors */}
          <line x1="-12" y1="-8" x2="12" y2="8" stroke="#34d399" strokeWidth="1.5" />
          <line x1="-12" y1="8" x2="12" y2="-8" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="-12" cy="-8" r="3" fill="none" stroke="#6ee7b7" strokeWidth="1" />
          <circle cx="12" cy="8" r="3" fill="none" stroke="#6ee7b7" strokeWidth="1" />
          <circle cx="-12" cy="8" r="3" fill="none" stroke="#6ee7b7" strokeWidth="1" />
          <circle cx="12" cy="-8" r="3" fill="none" stroke="#6ee7b7" strokeWidth="1" />
          <circle cx="0" cy="0" r="3" fill="#10b981" />
          <text x="20" y="4" fill="#34d399" fontFamily="monospace" fontSize="11" fontWeight="bold" letterSpacing="1">
            UAVs
          </text>
        </g>

        {/* Laser links from UAV to friendly and hostile pins */}
        <line x1="250" y1="390" x2="195" y2="445" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" filter="url(#threatRedGlow)" opacity="0.85" />
        <line x1="250" y1="390" x2="70" y2="500" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,2" filter="url(#hudEmeraldGlow)" opacity="0.85" />
        <line x1="250" y1="390" x2="840" y2="350" stroke="#10b981" strokeWidth="1.2" strokeDasharray="4,2" filter="url(#hudEmeraldGlow)" opacity="0.75" />

        {/* ======================================================== */}
        {/* LAYER 4: TACTICAL TARGETING PINS & FRIEND-OR-FOE HUD     */}
        {/* ======================================================== */}
        {/* PIN 1: Hostil Infantería (Red Threat Pin on City Building) */}
        <g transform="translate(195, 445)">
          <line x1="0" y1="0" x2="0" y2="-45" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="#ef4444" />
          <circle cx="0" cy="-45" r="14" fill="#450a0a" stroke="#ef4444" strokeWidth="2" filter="url(#threatRedGlow)" />
          <circle cx="0" cy="-45" r="5" fill="#ef4444" />
          
          {/* Target telemetry label card */}
          <g transform="translate(18, -62)">
            <rect width="135" height="34" rx="2" fill="#200404" stroke="#ef4444" strokeWidth="1.2" opacity="0.9" />
            <text x="6" y="12" fill="#ef4444" fontFamily="sans-serif" fontSize="8.5" fontWeight="bold">
              HOSTIL INFANTERÍA (5)
            </text>
            <text x="6" y="22" fill="#fca5a5" fontFamily="monospace" fontSize="8">
              RANGO: 150M
            </text>
            <text x="6" y="30" fill="#f87171" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold">
              AMENAZA: ALTA
            </text>
          </g>
        </g>

        {/* PIN 2: Fuerza Amiga a Alerta Alta (Emerald Green Pin Left) */}
        <g transform="translate(70, 505)">
          <line x1="0" y1="0" x2="0" y2="-35" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3.5" fill="#10b981" />
          <polygon points="0,-48 10,-33 -10,-33" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" filter="url(#hudEmeraldGlow)" />
          <circle cx="0" cy="-38" r="3" fill="#34d399" />
          
          {/* Friendly label card */}
          <g transform="translate(16, -48)">
            <rect width="90" height="24" rx="2" fill="#022c22" stroke="#10b981" strokeWidth="1" opacity="0.92" />
            <text x="5" y="10" fill="#34d399" fontFamily="sans-serif" fontSize="7.5" fontWeight="bold">
              FUERZA AMIGA
            </text>
            <text x="5" y="19" fill="#a7f3d0" fontFamily="sans-serif" fontSize="7">
              A ALERTA ALTA
            </text>
          </g>
        </g>

        {/* PIN 3: Fuerza Amiga Abierta Alta (Emerald Green Pin Right Background) */}
        <g transform="translate(845, 345)">
          <line x1="0" y1="0" x2="0" y2="-28" stroke="#10b981" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="3" fill="#10b981" />
          <polygon points="0,-38 8,-26 -8,-26" fill="#064e3b" stroke="#10b981" strokeWidth="1.2" filter="url(#hudEmeraldGlow)" />
          <circle cx="0" cy="-30" r="2.5" fill="#34d399" />
          
          <g transform="translate(14, -40)">
            <rect width="84" height="22" rx="2" fill="#022c22" stroke="#10b981" strokeWidth="1" opacity="0.9" />
            <text x="5" y="9" fill="#34d399" fontFamily="sans-serif" fontSize="7" fontWeight="bold">
              FUERZA AMIGA
            </text>
            <text x="5" y="18" fill="#a7f3d0" fontFamily="sans-serif" fontSize="6.8">
              ABIERTA ALTA
            </text>
          </g>
        </g>

        {/* ======================================================== */}
        {/* LAYER 5: SOLDIERS OF EJÉRCITO DE BOLIVIA                 */}
        {/* ======================================================== */}

        {/* SOLDIER 1: REAR SECURITY OPERATOR (Background Right) */}
        <g transform="translate(805, 370) scale(0.68)">
          {/* Shadow */}
          <ellipse cx="60" cy="270" rx="35" ry="12" fill="#040907" opacity="0.75" />
          
          {/* Body / Legs */}
          <path d="M40,160 L28,260 L45,262 L55,190 L70,260 L88,260 L75,155 Z" fill="url(#bolivianDigiCamo)" stroke="#1a2e22" strokeWidth="1.5" />
          {/* Combat Boots */}
          <polygon points="25,255 48,258 48,272 20,270" fill="#78350f" />
          <polygon points="68,255 90,258 92,272 65,270" fill="#78350f" />
          
          {/* Torso & Tactical Vest */}
          <path d="M30,85 L85,85 L90,165 L25,165 Z" fill="url(#bolivianDigiCamo)" />
          <rect x="35" y="92" width="46" height="65" fill="#2d3b2f" stroke="#162319" rx="3" />
          
          {/* Arms holding rifle aiming left-outward */}
          <path d="M32,95 L-10,130 L-5,145 L35,115 Z" fill="url(#bolivianDigiCamo)" />
          <path d="M80,95 L40,140 L50,150 L90,115 Z" fill="url(#bolivianDigiCamo)" />
          {/* Rifle */}
          <rect x="-45" y="125" width="90" height="10" fill="#0f172a" rx="1" />
          <rect x="-55" y="128" width="16" height="4" fill="#020617" />
          
          {/* Helmet with Camo & Shroud */}
          <path d="M40,55 Q60,25 80,55 Q85,75 75,85 L45,85 Z" fill="#364939" stroke="#1a2e22" strokeWidth="2" />
          {/* Bolivian Flag Patch on Shoulder */}
          <g transform="translate(82, 100)">
            <rect width="14" height="9" fill="#18181b" rx="1" />
            <rect x="1" y="1" width="12" height="2.3" fill="#dc2626" />
            <rect x="1" y="3.3" width="12" height="2.3" fill="#eab308" />
            <rect x="1" y="5.6" width="12" height="2.3" fill="#16a34a" />
          </g>
          {/* Glowing Cyan AR Eyepiece */}
          <rect x="42" y="65" width="16" height="6" fill="#00e5ff" rx="1.5" filter="url(#hudCyanGlow4)" />
        </g>

        {/* SOLDIER 2: CROUCHING SQUADMATE (Center-Left) */}
        <g transform="translate(230, 520) scale(0.95)">
          {/* Shadow */}
          <ellipse cx="140" cy="185" rx="90" ry="25" fill="#020805" opacity="0.85" />
          
          {/* Crouched Legs & Knees */}
          <path d="M50,110 Q90,140 120,180 L80,185 Q50,150 35,130 Z" fill="url(#bolivianDigiCamo)" stroke="#1a2e22" strokeWidth="1.5" />
          <path d="M120,130 Q170,145 220,180 L180,185 Q130,150 100,140 Z" fill="url(#bolivianDigiCamo)" stroke="#1a2e22" strokeWidth="1.5" />
          {/* Tactical Boots with laces */}
          <polygon points="70,175 105,178 100,195 60,190" fill="#78350f" />
          <polygon points="170,175 220,178 215,195 160,190" fill="#78350f" />

          {/* Torso & Back Unit */}
          <path d="M70,50 L160,55 L150,145 L60,135 Z" fill="url(#bolivianDigiCamo)" />
          <rect x="75" y="58" width="70" height="75" fill="#2d3b2f" stroke="#162319" rx="3" />
          
          {/* Wearable Tactical Battle-Computer on Upper Back/Shoulder */}
          <g transform="translate(125, 62)">
            <rect width="28" height="20" rx="2" fill="#022c22" stroke="#00e5ff" strokeWidth="1.5" filter="url(#hudCyanGlow4)" />
            <line x1="4" y1="6" x2="24" y2="6" stroke="#34d399" strokeWidth="1" />
            <line x1="4" y1="10" x2="18" y2="10" stroke="#00e5ff" strokeWidth="1" />
            <line x1="4" y1="14" x2="22" y2="14" stroke="#34d399" strokeWidth="1" />
          </g>

          {/* Tactical Helmet with Visor */}
          <path d="M85,25 Q120,-5 145,25 Q150,50 135,58 L95,55 Z" fill="#364939" stroke="#1a2e22" strokeWidth="2" />
          <rect x="82" y="32" width="22" height="8" rx="2" fill="#00e5ff" filter="url(#hudCyanGlow4)" />
          
          {/* Arms and Assault Rifle pointing out window */}
          <path d="M100,60 L40,95 L48,110 L115,75 Z" fill="url(#bolivianDigiCamo)" />
          {/* M4 Rifle */}
          <rect x="-10" y="88" width="110" height="12" fill="#0f172a" rx="1.5" />
          <rect x="-30" y="92" width="24" height="5" fill="#020617" />
          <rect x="25" y="100" width="14" height="24" fill="#1e293b" />
          <rect x="35" y="80" width="18" height="9" fill="#0369a1" />
        </g>

        {/* SOLDIER 3: LEAD TACTICAL OPERATOR (Center-Right Hero Character) */}
        <g transform="translate(560, 100)">
          {/* Sunset Backlight Rim Lighting on Soldier's Outline */}
          <path
            d="M95,20 Q180,-15 250,20 Q285,60 270,110 L350,180 L420,300 L390,620 L80,620 L90,260 Z"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            opacity="0.5"
            filter="url(#visorAmberGlow)"
          />

          {/* Full Body Shadow */}
          <ellipse cx="260" cy="620" rx="160" ry="30" fill="#020805" opacity="0.9" />

          {/* CAMOUFLAGE UNIFORM - TORSO & CHEST RIG */}
          <path d="M120,200 L320,195 L340,480 L110,480 Z" fill="url(#bolivianDigiCamo)" stroke="#1a2e22" strokeWidth="2" />
          
          {/* Molle Tactical Plate Carrier / Armor Vest */}
          <path d="M140,210 L300,205 L315,440 L130,440 Z" fill="#2d3b2f" stroke="#17241a" strokeWidth="2.5" />
          {/* Mag pouches & webbing */}
          <g fill="#212d22" stroke="#141c15" strokeWidth="1">
            <rect x="150" y="320" width="36" height="60" rx="3" />
            <rect x="195" y="320" width="36" height="60" rx="3" />
            <rect x="240" y="320" width="36" height="60" rx="3" />
            <rect x="150" y="270" width="125" height="12" rx="2" fill="#39483b" />
            <rect x="150" y="290" width="125" height="12" rx="2" fill="#39483b" />
          </g>

          {/* Bolivian Flag Patch on Chest Rig */}
          <g transform="translate(180, 230)">
            <rect width="32" height="20" fill="#18181b" rx="2" />
            <rect x="2" y="2" width="28" height="5.3" fill="#dc2626" />
            <rect x="2" y="7.3" width="28" height="5.3" fill="#eab308" />
            <rect x="2" y="12.6" width="28" height="5.3" fill="#16a34a" />
          </g>

          {/* RIGHT ARM & SLEEVE (Forward / Foreground) */}
          <path d="M290,210 L380,310 L340,490 L260,460 L295,330 Z" fill="url(#bolivianDigiCamo)" stroke="#1a2e22" strokeWidth="2" />
          
          {/* Official Emblem: EJÉRCITO DE BOLIVIA Arm Patch */}
          <g transform="translate(310, 310)">
            <path d="M0,0 L60,0 L65,30 Q30,65 0,30 Z" fill="#18181b" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Tricolor Arc */}
            <rect x="8" y="6" width="44" height="4" fill="#dc2626" />
            <rect x="8" y="10" width="44" height="4" fill="#eab308" />
            <rect x="8" y="14" width="44" height="4" fill="#16a34a" />
            <text x="30" y="26" fill="#fef08a" fontFamily="sans-serif" fontSize="6.2" fontWeight="bold" textAnchor="middle">
              EJÉRCITO DE BOLIVIA
            </text>
            {/* Coat of arms shield symbol */}
            <circle cx="30" cy="40" r="8" fill="#78350f" stroke="#eab308" strokeWidth="1" />
            <path d="M26,40 L34,40 M30,36 L30,44" stroke="#fde047" strokeWidth="1.5" />
          </g>

          {/* Bolivian Flag Patch on Shoulder Upper Sleeve */}
          <g transform="translate(325, 260)">
            <rect width="38" height="24" fill="#18181b" rx="2" stroke="#000" strokeWidth="1" />
            <rect x="3" y="3" width="32" height="6" fill="#dc2626" />
            <rect x="3" y="9" width="32" height="6" fill="#eab308" />
            <rect x="3" y="15" width="32" height="6" fill="#16a34a" />
          </g>

          {/* Tactical Operator Gloves */}
          <polygon points="120,380 90,410 80,440 125,430" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          <polygon points="10,330 -15,350 -10,385 20,370" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />

          {/* ASSAULT RIFLE: M4 TACTICAL CARBINE (Hero Prop) */}
          <g transform="translate(-140, 310)">
            {/* Shadow & sunset glow along top rail */}
            <rect x="0" y="12" width="280" height="24" fill="#0f172a" rx="2" />
            <line x1="30" y1="12" x2="270" y2="12" stroke="#f59e0b" strokeWidth="1.5" opacity="0.6" />
            {/* Barrel & Flash Hider */}
            <rect x="-60" y="18" width="65" height="11" fill="#020617" />
            <rect x="-80" y="16" width="22" height="15" fill="#090d16" stroke="#1e293b" strokeWidth="1" />
            {/* Front Sight Post */}
            <polygon points="-25,18 -15,0 -5,18" fill="#0f172a" />
            {/* Picatinny Rail & Handguard */}
            <rect x="10" y="15" width="130" height="22" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
            <line x1="20" y1="20" x2="130" y2="20" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />
            {/* Holographic Red-Dot / Reflex Sight with Amber Glass */}
            <rect x="150" y="-12" width="48" height="25" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <circle cx="174" cy="0" r="8" fill="#f59e0b" opacity="0.75" filter="url(#visorAmberGlow)" />
            <circle cx="174" cy="0" r="2" fill="#ef4444" />
            {/* Receiver & Magazine */}
            <rect x="180" y="24" width="70" height="30" fill="#0f172a" />
            <polygon points="190,45 220,45 210,120 175,115" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
            {/* Pistol Grip */}
            <polygon points="250,45 275,45 285,110 260,110" fill="#090d16" />
            {/* Stock */}
            <polygon points="275,20 370,22 365,70 320,65 275,35" fill="#1e293b" />
          </g>

          {/* OPERATOR'S HEAD, FACE & ADVANCED AR HUD HELMET */}
          {/* Neck & Balaclava */}
          <path d="M165,150 L210,150 L215,210 L155,205 Z" fill="#c49774" />
          <path d="M158,160 Q185,190 215,160 L215,205 L155,205 Z" fill="#2d3748" />

          {/* Head & Face (Confident Female Operator Features) */}
          <path d="M140,70 Q160,50 200,60 Q240,75 235,130 Q225,170 190,175 Q155,170 145,135 Z" fill="#c49774" />
          {/* Lips / Jawline / Ear */}
          <path d="M165,145 Q178,142 190,145" stroke="#9a3412" strokeWidth="2.5" fill="none" />
          <path d="M175,125 L182,132 L172,135" stroke="#9a3412" strokeWidth="1.5" fill="none" />
          {/* Comms Headset Earcup & Boom Mic */}
          <circle cx="232" cy="115" r="22" fill="#1e293b" stroke="#0f172a" strokeWidth="2.5" />
          <path d="M232,125 Q200,165 175,150" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="173" cy="150" r="5" fill="#334155" />

          {/* TACTICAL COMBAT HELMET (FAST / MICH style) */}
          <path d="M125,25 Q185,-15 255,20 Q275,65 255,100 L130,95 Q115,60 125,25 Z" fill="url(#bolivianDigiCamo)" stroke="#1a2e22" strokeWidth="2.5" />
          {/* NVG Shroud & Helmet Rails */}
          <polygon points="120,45 135,38 135,65 120,58" fill="#1e293b" />
          <path d="M140,90 L245,95 L242,104 L138,98 Z" fill="#0f172a" />
          {/* Helmet Bolivian Flag Mini Patch */}
          <g transform="translate(195, 30)">
            <rect width="26" height="16" fill="#18181b" rx="2" stroke="#0f172a" strokeWidth="1" />
            <rect x="2" y="2" width="22" height="4" fill="#dc2626" />
            <rect x="2" y="6" width="22" height="4" fill="#eab308" />
            <rect x="2" y="10" width="22" height="4" fill="#16a34a" />
          </g>

          {/* ADVANCED AR HUD HOLOGRAPHIC EYE VISOR (Hero Tech Element) */}
          {/* Visor Mount Brackets from helmet */}
          <rect x="110" y="65" width="25" height="8" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <circle cx="122" cy="69" r="2" fill="#34d399" />
          
          {/* Curved Transparent Holographic HUD Glass */}
          <polygon
            points="115,75 220,72 230,122 135,128"
            fill="#00ffff"
            opacity="0.28"
            stroke="#00ffff"
            strokeWidth="1.8"
            filter="url(#hudCyanGlow4)"
          />
          {/* Amber Outer Reticle Frame */}
          <polygon
            points="110,72 225,68 235,126 130,132"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            filter="url(#visorAmberGlow)"
          />

          {/* Holographic Tactical Telemetry Projected on Visor */}
          <g transform="translate(130, 80)">
            {/* Eye Targeting Reticle */}
            <circle cx="45" cy="22" r="14" fill="none" stroke="#00ffff" strokeWidth="1.2" strokeDasharray="3,2" />
            <circle cx="45" cy="22" r="6" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
            <line x1="45" y1="5" x2="45" y2="39" stroke="#00ffff" strokeWidth="1" />
            <line x1="28" y1="22" x2="62" y2="22" stroke="#00ffff" strokeWidth="1" />
            
            {/* Digital Telemetry stream */}
            <text x="0" y="8" fill="#34d399" fontFamily="monospace" fontSize="6.5" fontWeight="bold">
              DST: 150M
            </text>
            <text x="0" y="16" fill="#00ffff" fontFamily="monospace" fontSize="6.5" fontWeight="bold">
              LOCK: HOSTIL
            </text>
            <text x="0" y="38" fill="#f59e0b" fontFamily="monospace" fontSize="6" fontWeight="bold">
              EMCON: ACTIVO
            </text>
          </g>
        </g>

        {/* ======================================================== */}
        {/* LAYER 6: TACTICAL HUD OVERLAYS, BANNERS, AND BRACKETS   */}
        {/* ======================================================== */}

        {/* 1. TOP-LEFT DOCTRINAL HEADER & TRICOLOR BAR */}
        <g transform="translate(25, 25)">
          {/* Bolivian Flag Vertical Accent Bar */}
          <rect x="0" y="0" width="7" height="42" fill="#dc2626" rx="1" />
          <rect x="0" y="42" width="7" height="42" fill="#eab308" />
          <rect x="0" y="84" width="7" height="42" fill="#16a34a" rx="1" />

          {/* Text Titles */}
          <text x="22" y="24" fill="#f8fafc" fontFamily="sans-serif" fontSize="18" fontWeight="bold" letterSpacing="2">
            EJÉRCITO DE BOLIVIA
          </text>
          <text x="22" y="62" fill="#ffffff" fontFamily="Oswald, sans-serif" fontSize="40" fontWeight="900" letterSpacing="1.5">
            INMERSIÓN OPERATIVA C4I
          </text>
          <text x="22" y="94" fill="#6ee7b7" fontFamily="sans-serif" fontSize="17" fontWeight="bold" letterSpacing="1">
            SIMULACIÓN DE SENSORES Y OPERACIONES HÍBRIDAS
          </text>

          {/* ESTADO COMBATE ACTIVO Banner */}
          <g transform="translate(22, 115)">
            <rect width="210" height="32" rx="3" fill="#022c22" stroke="#00e5ff" strokeWidth="1.8" filter="url(#hudCyanGlow4)" />
            <line x1="0" y1="0" x2="5" y2="32" stroke="#f59e0b" strokeWidth="4" />
            <text x="14" y="21" fill="#f8fafc" fontFamily="monospace" fontSize="13" fontWeight="bold" letterSpacing="1.5">
              ESTADO COMBATE <tspan fill="#f59e0b">ACTIVO</tspan>
            </text>
          </g>
        </g>

        {/* 2. TOP-LEFT HOSTILE THREAT OVERLAY BOX */}
        <g transform="translate(25, 195)">
          <rect width="200" height="98" rx="4" fill="url(#hudPanelGrad)" stroke="#1e3a2f" strokeWidth="1.2" opacity="0.95" />
          
          {/* Red diamond alert symbol */}
          <g transform="translate(14, 18)">
            <polygon points="0,-7 7,0 0,7 -7,0" fill="#ef4444" filter="url(#threatRedGlow)" />
            <text x="14" y="4" fill="#ef4444" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold" letterSpacing="0.5">
              HOSTIL INFANTERÍA (5)
            </text>
          </g>

          <text x="28" y="39" fill="#e2e8f0" fontFamily="monospace" fontSize="9.5">
            RANGO: 150M
          </text>
          <text x="28" y="53" fill="#34d399" fontFamily="monospace" fontSize="9.5" fontWeight="bold">
            AMENAZA: <tspan fill="#ef4444">ALTA</tspan>
          </text>
          <text x="28" y="67" fill="#6ee7b7" fontFamily="monospace" fontSize="9.5">
            FUERZA AMIGA: <tspan fill="#34d399">CUBIERTA</tspan>
          </text>

          {/* Cyberdefense subrow */}
          <g transform="translate(14, 84)">
            <polygon points="0,-5 5,0 0,5 -5,0" fill="#ef4444" />
            <text x="14" y="3" fill="#f87171" fontFamily="sans-serif" fontSize="9" fontWeight="bold">
              CIBERDEFENSA
            </text>
          </g>
          <text x="110" y="87" fill="#6ee7b7" fontFamily="monospace" fontSize="8.5">
            FUERZA AMIGA: CUBIERTA
          </text>
        </g>

        {/* 3. BOTTOM-LEFT RED TÁCTICA TELEMETRY PANEL */}
        <g transform="translate(25, 495)">
          <rect width="280" height="195" rx="4" fill="url(#hudPanelGrad)" stroke="#00e5ff" strokeWidth="1.5" filter="url(#hudCyanGlow4)" opacity="0.94" />
          
          {/* Header Title Tab */}
          <rect x="0" y="0" width="130" height="28" rx="3" fill="#00e5ff" />
          <text x="12" y="19" fill="#021811" fontFamily="monospace" fontSize="12" fontWeight="bold" letterSpacing="1.5">
            RED TÁCTICA
          </text>

          {/* Tactical Status Items */}
          <g transform="translate(16, 48)" className="animate-hud-flicker">
            <text x="0" y="0" fill="#f8fafc" fontFamily="monospace" fontSize="11" fontWeight="bold">
              UAVs: <tspan fill="#34d399">3 ACTIVOS (D-1, D-2, D-3)</tspan>
            </text>
            <text x="0" y="22" fill="#f8fafc" fontFamily="monospace" fontSize="11" fontWeight="bold">
              SATÉLITE: <tspan fill="#34d399">CONECTADO</tspan>
            </text>
            <text x="0" y="44" fill="#f8fafc" fontFamily="monospace" fontSize="11" fontWeight="bold">
              LIDAR TERRESTRE: <tspan fill="#00e5ff">MAPEANDO</tspan>
            </text>
            <text x="0" y="66" fill="#f8fafc" fontFamily="monospace" fontSize="11" fontWeight="bold">
              CIBERDEFENSA: <tspan fill="#ef4444">ALERTA ALTA</tspan>
            </text>

            <line x1="0" y1="80" x2="245" y2="80" stroke="#134e4a" strokeWidth="1" />

            <g transform="translate(0, 98)">
              <rect x="-6" y="-12" width="255" height="38" rx="2" fill="#022c22" stroke="#00e5ff" strokeWidth="1" />
              <line x1="-6" y1="-12" x2="-2" y2="26" stroke="#00e5ff" strokeWidth="3" />
              <text x="6" y="4" fill="#34d399" fontFamily="monospace" fontSize="10" fontWeight="bold" letterSpacing="1">
                COMUNICACIONES CIFRADAS
              </text>
              <text x="6" y="20" fill="#f8fafc" fontFamily="monospace" fontSize="10" fontWeight="bold" letterSpacing="1">
                SOPORTE LOGÍSTICO: <tspan fill="#34d399">REDUNDANTE</tspan>
              </text>
            </g>
          </g>
        </g>

        {/* 4. HIGH-TECH HUD FRAMING BRACKETS & RETICLES (Edges) */}
        {/* Top-Right Bracket with Tick Marks and Aiming Reticle */}
        <g transform="translate(1240, 25)">
          <path d="M-80,0 L0,0 L0,80" fill="none" stroke="#00e5ff" strokeWidth="3" filter="url(#hudCyanGlow4)" />
          {/* Tick ruler */}
          <line x1="-70" y1="8" x2="-20" y2="8" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3,2" />
          {/* Reticle icon */}
          <g transform="translate(-35, 35)">
            <circle cx="0" cy="0" r="10" fill="none" stroke="#00e5ff" strokeWidth="1.5" />
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#00e5ff" strokeWidth="1" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#00e5ff" strokeWidth="1" />
          </g>
        </g>

        {/* Bottom-Right Corner Bracket */}
        <g transform="translate(1240, 695)">
          <path d="M-80,0 L0,0 L0,-80" fill="none" stroke="#00e5ff" strokeWidth="3" filter="url(#hudCyanGlow4)" />
          <line x1="-70" y1="-8" x2="-20" y2="-8" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,2" />
        </g>

        {/* Top-Left Corner Bracket */}
        <g transform="translate(40, 25)">
          <path d="M80,0 L0,0 L0,80" fill="none" stroke="#00e5ff" strokeWidth="2.5" opacity="0.6" />
        </g>
      </svg>

      {/* 3. High-Contrast Gradient Scrims: Emerald Military Contrast */}
      {/* Protects text clarity across headers, chips, and buttons */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#021811] via-[#021811]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#021811]/90 via-[#021811]/45 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#021811]/40 to-[#01140e]/90 pointer-events-none" />

      {/* 4. Subtle Emerald HUD Grid Mesh Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: 'linear-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};
