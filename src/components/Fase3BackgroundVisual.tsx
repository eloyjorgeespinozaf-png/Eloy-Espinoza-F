import React from 'react';

interface Fase3BackgroundVisualProps {
  className?: string;
}

export const Fase3BackgroundVisual: React.FC<Fase3BackgroundVisualProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* 1. Base Bunker Atmosphere (Harmonized with Card 3's Military Green Base) */}
      <div className="absolute inset-0 bg-[#020b08]" />

      {/* 2. SVG Vector Art: Exact Reproduction of "resilenciA tecnologica.jpg" */}
      <svg
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-80 group-hover:opacity-100"
      >
        <defs>
          {/* Cyan Holographic Neon Glow Filter */}
          <filter id="hudCyanGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Red Attack / Combat Alert Glow Filter */}
          <filter id="combatRedGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Spark High-Voltage Discharge Glow */}
          <filter id="sparkGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Linear Gradients for Bunker Lighting */}
          <linearGradient id="bunkerWallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1813" />
            <stop offset="50%" stopColor="#05120d" />
            <stop offset="100%" stopColor="#020805" />
          </linearGradient>

          <linearGradient id="hologramGlassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.18" />
            <stop offset="40%" stopColor="#032a24" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#004d40" stopOpacity="0.12" />
          </linearGradient>

          <linearGradient id="sparksGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#ffea00" />
            <stop offset="70%" stopColor="#ff6600" />
            <stop offset="100%" stopColor="#ff0044" />
          </linearGradient>

          <linearGradient id="bolivianFlagGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="33%" stopColor="#dc2626" />
            <stop offset="34%" stopColor="#facc15" />
            <stop offset="66%" stopColor="#facc15" />
            <stop offset="67%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>

          <linearGradient id="blastDoorGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="80%" stopColor="#93c5fd" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
          </linearGradient>

          {/* Pattern for Hazard Stripes on Blast Door */}
          <pattern id="hazardStripes" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="10" height="20" fill="#facc15" fillOpacity="0.75" />
            <rect x="10" width="10" height="20" fill="#000000" fillOpacity="0.85" />
          </pattern>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* SECTION A: BUNKER ARCHITECTURE & BACKGROUND WALLS             */}
        {/* ------------------------------------------------------------- */}
        <rect width="1280" height="720" fill="url(#bunkerWallGrad)" />

        {/* Structural Steel Beams (Top Ceiling) */}
        <path d="M0,45 L1280,45 M0,90 L1280,90 M320,0 L320,90 M960,0 L960,90" stroke="#102a20" strokeWidth="3" />
        <rect x="0" y="0" width="1280" height="35" fill="#061610" />
        
        {/* Hanging Industrial Cables / Data Conduits */}
        <path d="M120,35 Q180,85 240,40 Q300,90 380,35" fill="none" stroke="#003d2b" strokeWidth="4" />
        <path d="M150,35 Q220,110 320,45" fill="none" stroke="#00ffff" strokeWidth="1.5" opacity="0.6" />
        <path d="M700,35 Q780,105 880,45" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.5" />
        <path d="M820,35 Q920,120 1020,40" fill="none" stroke="#102a20" strokeWidth="5" />

        {/* Bullet & Shrapnel Impact Marks on Walls */}
        <g opacity="0.5">
          <circle cx="160" cy="240" r="14" fill="#020805" stroke="#1a3d30" strokeWidth="1.5" />
          <line x1="146" y1="240" x2="135" y2="242" stroke="#102a20" strokeWidth="1" />
          <line x1="174" y1="240" x2="188" y2="238" stroke="#102a20" strokeWidth="1" />
          <line x1="160" y1="226" x2="162" y2="214" stroke="#102a20" strokeWidth="1" />
          <circle cx="790" cy="180" r="9" fill="#020805" stroke="#1a3d30" strokeWidth="1.2" />
        </g>

        {/* Perspective Floor Metal Grid */}
        <path
          d="M0,520 L1280,520 M0,570 L1280,570 M0,630 L1280,630 M0,700 L1280,700"
          stroke="#0b291d"
          strokeWidth="1.5"
        />
        <path
          d="M0,720 L300,500 M240,720 L420,500 M500,720 L580,500 M780,720 L700,500 M1040,720 L860,500 M1280,720 L980,500"
          stroke="#0b291d"
          strokeWidth="1.2"
        />

        {/* ------------------------------------------------------------- */}
        {/* SECTION B: LEFT SERVER RACKS WITH ILLUMINATED STATUS LEDS      */}
        {/* ------------------------------------------------------------- */}
        <g id="leftServerRacks">
          {/* Main Server Tower Frame */}
          <rect x="30" y="90" width="170" height="420" fill="#04120c" stroke="#15402f" strokeWidth="2" rx="4" />
          {/* Rack Shelf Dividers */}
          <line x1="30" y1="160" x2="200" y2="160" stroke="#15402f" strokeWidth="1.5" />
          <line x1="30" y1="230" x2="200" y2="230" stroke="#15402f" strokeWidth="1.5" />
          <line x1="30" y1="300" x2="200" y2="300" stroke="#15402f" strokeWidth="1.5" />
          <line x1="30" y1="370" x2="200" y2="370" stroke="#15402f" strokeWidth="1.5" />
          <line x1="30" y1="440" x2="200" y2="440" stroke="#15402f" strokeWidth="1.5" />

          {/* Flashing Status LED Arrays (Cyan, Emerald, Yellow, Red) */}
          <g>
            {/* Shelf 1 LEDs */}
            <rect x="42" y="110" width="30" height="5" fill="#00e5ff" filter="url(#hudCyanGlow)" />
            <rect x="80" y="110" width="30" height="5" fill="#10b981" />
            <rect x="120" y="110" width="20" height="5" fill="#00e5ff" />
            <rect x="150" y="110" width="35" height="5" fill="#ef4444" className="animate-pulse" />
            
            {/* Shelf 2 LEDs */}
            <rect x="42" y="180" width="40" height="5" fill="#10b981" />
            <rect x="90" y="180" width="25" height="5" fill="#facc15" />
            <rect x="125" y="180" width="55" height="5" fill="#00e5ff" />

            {/* Shelf 3 LEDs */}
            <rect x="42" y="250" width="50" height="5" fill="#00e5ff" />
            <rect x="100" y="250" width="40" height="5" fill="#10b981" />
            <rect x="150" y="250" width="30" height="5" fill="#ef4444" className="animate-pulse" />

            {/* Shelf 4 LEDs */}
            <rect x="42" y="320" width="35" height="5" fill="#10b981" />
            <rect x="85" y="320" width="45" height="5" fill="#00e5ff" />
            <rect x="140" y="320" width="40" height="5" fill="#facc15" />

            {/* Shelf 5 LEDs */}
            <rect x="42" y="390" width="60" height="5" fill="#00e5ff" />
            <rect x="110" y="390" width="30" height="5" fill="#10b981" />
            <rect x="150" y="390" width="30" height="5" fill="#00e5ff" />
          </g>

          {/* Server Unit 2 (Next column) */}
          <rect x="205" y="130" width="50" height="380" fill="#030f0a" stroke="#0e3023" strokeWidth="1.5" />
          <rect x="215" y="150" width="30" height="4" fill="#00e5ff" opacity="0.6" />
          <rect x="215" y="190" width="30" height="4" fill="#10b981" opacity="0.7" />
          <rect x="215" y="230" width="30" height="4" fill="#facc15" opacity="0.5" />
          <rect x="215" y="270" width="30" height="4" fill="#00e5ff" opacity="0.6" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* SECTION C: RIGHT WALL - BLAST DOOR, ARMED SOLDIER, SHIELD     */}
        {/* ------------------------------------------------------------- */}
        <g id="rightBlastDoorSection">
          {/* Heavy Armored Blast Doorway Frame */}
          <polygon points="1010,120 1250,120 1250,600 1010,600" fill="#030c08" stroke="#1f4f3c" strokeWidth="3" />
          {/* Inner Light Breach (Swirling Combat Haze / Steam) */}
          <polygon points="1040,150 1230,150 1230,590 1040,590" fill="url(#blastDoorGlow)" />
          {/* Hazard Warning Stripes Top of Door */}
          <rect x="1010" y="120" width="240" height="15" fill="url(#hazardStripes)" />
          
          {/* Glowing Red Emergency Door Sign: "DEFENSA KINÉTICA DE NODO - ACTIVADA" */}
          <g filter="url(#combatRedGlow)" className="animate-combat-alert">
            <rect x="980" y="180" width="130" height="42" fill="#1a0305" stroke="#ef4444" strokeWidth="2" rx="3" />
            <text x="1045" y="198" fill="#ff4d6d" fontSize="9" fontWeight="900" fontFamily="monospace" textAnchor="middle" letterSpacing="0.8">
              DEFENSA KINÉTICA DE NODO
            </text>
            <text x="1045" y="212" fill="#ffffff" fontSize="9.5" fontWeight="900" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">
              • ACTIVADA •
            </text>
          </g>

          {/* Armed Soldier Standing Guard at Blast Door with Assault Rifle */}
          <g id="armedSoldier" transform="translate(1070, 260)">
            {/* Tactical Combat Helmet */}
            <path d="M48,55 Q56,38 72,38 Q88,38 96,55 Q96,68 88,72 L56,72 Q48,68 48,55 Z" fill="#133325" stroke="#2a664d" strokeWidth="1.5" />
            {/* Night Vision / Goggles Strap */}
            <rect x="52" y="52" width="40" height="8" rx="2" fill="#000000" stroke="#00e5ff" strokeWidth="1" />
            {/* Head & Neck */}
            <path d="M58,72 L86,72 L84,86 L60,86 Z" fill="#2d281e" />
            {/* Heavy Tactical Camouflage Plate Carrier / Torso (Back-facing breach) */}
            <path d="M42,86 L102,86 L108,180 L36,180 Z" fill="#163829" stroke="#2a664d" strokeWidth="2" />
            {/* Camo Spots on Armor */}
            <circle cx="56" cy="110" r="8" fill="#0f261c" />
            <circle cx="84" cy="130" r="10" fill="#224d38" />
            <circle cx="62" cy="155" r="9" fill="#091811" />
            <circle cx="88" cy="102" r="7" fill="#1d4533" />
            {/* Tactical Back Holster / Hydration Pack */}
            <rect x="58" y="96" width="28" height="50" rx="3" fill="#0d241a" stroke="#2a664d" strokeWidth="1" />
            {/* Legs & Combat Pants */}
            <path d="M38,180 L68,180 L66,280 L42,280 Z" fill="#173d2d" stroke="#0e261c" strokeWidth="1.5" />
            <path d="M76,180 L106,180 L102,280 L78,280 Z" fill="#173d2d" stroke="#0e261c" strokeWidth="1.5" />
            {/* Heavy Combat Boots */}
            <rect x="40" y="278" width="28" height="18" fill="#07120c" rx="3" />
            <rect x="76" y="278" width="28" height="18" fill="#07120c" rx="3" />

            {/* Tactical Assault Rifle Aimed Outward into Breach */}
            <g transform="translate(15, 95) rotate(-12)">
              {/* Rifle Receiver and Barrel */}
              <rect x="0" y="20" width="115" height="10" fill="#050d09" stroke="#1d4233" strokeWidth="1" />
              <rect x="115" y="22" width="22" height="6" fill="#000000" />
              <rect x="137" y="20" width="10" height="10" fill="#ff4400" filter="url(#combatRedGlow)" opacity="0.8" />
              {/* Scope & Magazine */}
              <rect x="35" y="12" width="30" height="8" rx="2" fill="#0a1a13" stroke="#00e5ff" strokeWidth="0.8" />
              <polygon points="50,30 62,30 58,54 46,54" fill="#08140f" />
              {/* Soldier Hands Holding Rifle */}
              <circle cx="32" cy="26" r="6" fill="#2d281e" />
              <circle cx="78" cy="25" r="6" fill="#2d281e" />
            </g>
          </g>

          {/* Wall Equipment: Fire Extinguisher (Red cylinder) & Fire Axe */}
          <g transform="translate(980, 115)">
            {/* Red Fire Extinguisher */}
            <rect x="0" y="0" width="16" height="52" rx="7" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
            <rect x="4" y="-8" width="8" height="8" fill="#000000" />
            <line x1="8" y1="-8" x2="16" y2="-4" stroke="#000000" strokeWidth="2" />
            <rect x="3" y="16" width="10" height="12" fill="#ffffff" rx="1" />
            {/* Emergency Fire Axe Mounted Beside */}
            <line x1="22" y1="-5" x2="22" y2="48" stroke="#facc15" strokeWidth="3" />
            <path d="M22,0 L36,-6 L38,10 L22,4 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
          </g>

          {/* Ceremonial Golden Bolivian Army Coat of Arms Shield on Upper Wall */}
          <g transform="translate(1060, 65)">
            {/* Shield Outline in Gold with Outer Glow */}
            <path
              d="M0,0 L90,0 Q95,45 80,85 Q45,120 45,120 Q45,120 10,85 Q-5,45 0,0 Z"
              fill="#081c15"
              stroke="#facc15"
              strokeWidth="3.5"
              filter="drop-shadow(0 0 12px rgba(250,204,21,0.5))"
            />
            {/* Inner Tricolor Rosette / Flag Bands (Red, Yellow, Green) */}
            <circle cx="45" cy="55" r="28" fill="url(#bolivianFlagGrad)" stroke="#facc15" strokeWidth="2" />
            <circle cx="45" cy="55" r="15" fill="#04120c" stroke="#facc15" strokeWidth="1.5" />
            {/* Andean Condor Silhouette atop Crest */}
            <path d="M25,28 Q45,12 65,28 Q55,34 45,30 Q35,34 25,28 Z" fill="#facc15" />
            <circle cx="45" cy="22" r="3.5" fill="#ffffff" />
            {/* Shield Title Banner */}
            <text x="45" y="98" fill="#facc15" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
              EJÉRCITO
            </text>
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* SECTION D: CENTERPIECE - THE GIANT HOLOGRAPHIC GLASS HUD      */}
        {/* ------------------------------------------------------------- */}
        <g id="centerHologramHUD" transform="translate(290, 70)">
          {/* Main Holographic Glass Frame with Cyan Neon Bevels */}
          <rect
            x="0"
            y="0"
            width="680"
            height="460"
            rx="12"
            fill="url(#hologramGlassGrad)"
            stroke="#00e5ff"
            strokeWidth="2.5"
            filter="url(#hudCyanGlow)"
          />

          {/* Inner Corner Cyber Brackets */}
          <path d="M15,35 L15,15 L35,15" fill="none" stroke="#00e5ff" strokeWidth="2.5" />
          <path d="M665,35 L665,15 L645,15" fill="none" stroke="#00e5ff" strokeWidth="2.5" />
          <path d="M15,425 L15,445 L35,445" fill="none" stroke="#00e5ff" strokeWidth="2.5" />
          <path d="M665,425 L665,445 L645,445" fill="none" stroke="#00e5ff" strokeWidth="2.5" />

          {/* Scanline Sweep Animation */}
          <line x1="5" y1="50" x2="675" y2="50" stroke="#00ffff" strokeWidth="2" opacity="0.6" className="animate-laser-sweep" />

          {/* D.1: TOP HEADER - EJÉRCITO DE BOLIVIA // CIBERDEFENSA Y RESILIENCIA */}
          <g id="hudHeader">
            {/* Left Bolivian Coat of Arms Mini Badge */}
            <circle cx="42" cy="40" r="18" fill="url(#bolivianFlagGrad)" stroke="#facc15" strokeWidth="1.5" />
            <circle cx="42" cy="40" r="8" fill="#002419" stroke="#ffffff" strokeWidth="1" />
            <text x="42" y="42" fill="#ffffff" fontSize="6" fontWeight="bold" textAnchor="middle">BO</text>

            {/* Primary Luminous Title Text */}
            <text
              x="340"
              y="32"
              fill="#ffffff"
              fontSize="18"
              fontWeight="900"
              fontFamily="monospace"
              letterSpacing="3"
              textAnchor="middle"
              filter="drop-shadow(0 0 8px rgba(0,229,255,0.9))"
            >
              EJÉRCITO DE BOLIVIA
            </text>

            {/* Subtitle */}
            <text
              x="340"
              y="52"
              fill="#00e5ff"
              fontSize="12.5"
              fontWeight="800"
              fontFamily="monospace"
              letterSpacing="2.5"
              textAnchor="middle"
              filter="drop-shadow(0 0 6px rgba(0,229,255,0.8))"
            >
              CIBERDEFENSA Y RESILIENCIA TECNOLÓGICA
            </text>

            {/* Right Unit Roundel */}
            <circle cx="638" cy="40" r="16" fill="#021c15" stroke="#00e5ff" strokeWidth="1.5" />
            <polygon points="638,28 648,45 628,45" fill="#10b981" />

            {/* Red Alert Pill Banner: [ ESTADO DE COMBATE ACTIVO ] */}
            <g transform="translate(230, 64)" filter="url(#combatRedGlow)" className="animate-combat-alert">
              <rect x="0" y="0" width="220" height="26" rx="13" fill="#30050c" stroke="#ef4444" strokeWidth="2" />
              <circle cx="22" cy="13" r="5.5" fill="#ef4444" className="animate-ping" />
              <circle cx="22" cy="13" r="5" fill="#ff0044" />
              <text x="122" y="18" fill="#ffffff" fontSize="11" fontWeight="900" fontFamily="monospace" letterSpacing="2" textAnchor="middle">
                ESTADO DE COMBATE ACTIVO
              </text>
            </g>
          </g>

          {/* D.2: TACTICAL MAP OF SOUTH AMERICA & BOLIVIA DEFENSE GRID */}
          <g id="tacticalMap" transform="translate(190, 95)">
            {/* South America Continental Boundary (Tactical Deep Blue-Green Fill) */}
            <path
              d="M70,18 Q140,5 210,18 Q275,45 295,115 Q305,175 270,225 Q225,270 170,265 Q115,225 85,160 Q60,95 70,18 Z"
              fill="#021c17"
              stroke="#0a4034"
              strokeWidth="2"
            />

            {/* Coordinate Grid Over South America */}
            <g stroke="#08382d" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.6">
              <line x1="70" y1="70" x2="280" y2="70" />
              <line x1="70" y1="130" x2="295" y2="130" />
              <line x1="70" y1="190" x2="260" y2="190" />
              <line x1="130" y1="20" x2="130" y2="250" />
              <line x1="190" y1="20" x2="190" y2="250" />
            </g>

            {/* Adversarial Red Attack Threat Zone (Eastern / Neighboring Border) */}
            <path
              d="M210,65 Q250,85 265,130 Q240,165 205,145 Q195,115 190,85 Z"
              fill="#ef4444"
              fillOpacity="0.28"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="4,2"
              filter="url(#combatRedGlow)"
            />
            <text x="215" y="125" fill="#ff4d6d" fontSize="6.5" fontWeight="bold" fontFamily="monospace" letterSpacing="0.5">
              ZONA DE ATAQUE
            </text>
            <text x="215" y="134" fill="#ff4d6d" fontSize="6" fontWeight="bold" fontFamily="monospace" letterSpacing="0.5">
              TÁCTICO COORDENADO
            </text>

            {/* BOLIVIA Territorial Mesh Polygon (Bright Neon Emerald/Cyan) */}
            <polygon
              points="130,75 168,70 196,92 208,135 186,172 152,180 120,158 112,118 118,88"
              fill="rgba(0, 229, 255, 0.22)"
              stroke="#00e5ff"
              strokeWidth="2.5"
              filter="url(#hudCyanGlow)"
            />

            {/* Internal Topology Lines of Bolivia */}
            <line x1="112" y1="118" x2="208" y2="135" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />
            <line x1="152" y1="72" x2="152" y2="180" stroke="#10b981" strokeWidth="1" strokeDasharray="2,2" opacity="0.7" />

            {/* Core Cyber Defense Nodes Across Bolivia */}
            {/* 1. La Paz (C4ISR HQ) */}
            <circle cx="132" cy="102" r="6" fill="#00e5ff" className="animate-pulse" filter="url(#hudCyanGlow)" />
            <circle cx="132" cy="102" r="3" fill="#ffffff" />
            <text x="75" y="100" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="monospace">LA PAZ [C4ISR]</text>

            {/* 2. Cochabamba (Core Telecom Node) */}
            <circle cx="155" cy="122" r="5" fill="#10b981" />
            <circle cx="155" cy="122" r="2.5" fill="#ffffff" />
            <text x="145" y="135" fill="#6ee7b7" fontSize="7" fontWeight="bold" fontFamily="monospace">CBBA</text>

            {/* 3. Santa Cruz (SCADA Energy Grid) */}
            <circle cx="184" cy="132" r="5.5" fill="#facc15" />
            <circle cx="184" cy="132" r="2.5" fill="#ffffff" />
            <text x="192" y="132" fill="#fde047" fontSize="7.5" fontWeight="bold" fontFamily="monospace">STA. CRUZ</text>

            {/* 4. Pando / Norte */}
            <circle cx="145" cy="82" r="4" fill="#00e5ff" />
            <text x="148" y="80" fill="#a5f3fc" fontSize="6.5" fontFamily="monospace">PANDO</text>

            {/* 5. Tarija / Sur */}
            <circle cx="158" cy="162" r="4" fill="#10b981" />
            <text x="164" y="165" fill="#6ee7b7" fontSize="6.5" fontFamily="monospace">TARIJA</text>

            {/* Green Internal Secure Interconnection Vector Links */}
            <path d="M132,102 Q144,112 155,122" fill="none" stroke="#00e5ff" strokeWidth="2" />
            <path d="M155,122 Q170,127 184,132" fill="none" stroke="#00e5ff" strokeWidth="2" />
            <path d="M155,122 Q156,142 158,162" fill="none" stroke="#10b981" strokeWidth="1.8" strokeDasharray="3,2" />
            <path d="M132,102 Q140,92 145,82" fill="none" stroke="#10b981" strokeWidth="1.8" strokeDasharray="3,2" />

            {/* RED DASHED CYBER ATTACK TRAJECTORY VECTORS (From user's image) */}
            <g stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" filter="url(#combatRedGlow)">
              {/* Attack from East */}
              <path d="M255,110 Q220,118 184,132" fill="none" />
              <polygon points="184,132 192,128 191,135" fill="#ff0044" />
              {/* Attack from South-East */}
              <path d="M245,185 Q200,165 158,162" fill="none" />
              {/* Attack from North-East */}
              <path d="M230,55 Q190,80 155,122" fill="none" />
              {/* Attack from Pacific / West Vector */}
              <path d="M80,85 Q105,95 132,102" fill="none" />
            </g>
          </g>

          {/* D.3: LEFT HUD TELEMETRY WINDOW (Globe & Threat Metrics) */}
          <g id="leftHudWindow" transform="translate(20, 100)">
            <rect x="0" y="0" width="155" height="240" fill="#01140e" stroke="#00e5ff" strokeWidth="1.2" rx="4" />
            
            {/* Window Header */}
            <rect x="0" y="0" width="155" height="20" fill="#00e5ff" fillOpacity="0.15" />
            <text x="10" y="14" fill="#00e5ff" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
              ESTADO DEL NODO
            </text>

            {/* 3D Wireframe Globe with Warning Hotspots */}
            <g transform="translate(77, 65)">
              <circle cx="0" cy="0" r="32" fill="none" stroke="#00e5ff" strokeWidth="1.2" opacity="0.6" />
              <ellipse cx="0" cy="0" rx="32" ry="12" fill="none" stroke="#00e5ff" strokeWidth="0.8" opacity="0.5" />
              <ellipse cx="0" cy="0" rx="12" ry="32" fill="none" stroke="#00e5ff" strokeWidth="0.8" opacity="0.5" />
              <line x1="-32" y1="0" x2="32" y2="0" stroke="#00e5ff" strokeWidth="0.8" opacity="0.5" />
              <line x1="0" y1="-32" x2="0" y2="32" stroke="#00e5ff" strokeWidth="0.8" opacity="0.5" />
              {/* Hotspots */}
              <circle cx="5" cy="-2" r="3" fill="#ef4444" filter="url(#combatRedGlow)" className="animate-ping" />
              <circle cx="-12" cy="8" r="2.5" fill="#facc15" />
              <circle cx="15" cy="14" r="2.5" fill="#ef4444" />
            </g>

            {/* Live Telemetry Lines */}
            <g transform="translate(10, 115)">
              <text x="0" y="10" fill="#6ee7b7" fontSize="7.5" fontFamily="monospace">PAQUETES/S: 4.8 GB/S</text>
              <text x="0" y="24" fill="#ef4444" fontSize="7.5" fontWeight="bold" fontFamily="monospace">INTRUSIÓN: NIVEL 5</text>
              <text x="0" y="38" fill="#facc15" fontSize="7.5" fontFamily="monospace">ANOMALÍA PROTOCOLO: 92%</text>
              <text x="0" y="52" fill="#00e5ff" fontSize="7.5" fontFamily="monospace">FIREWALL C4ISR: ACTIVO</text>
              <text x="0" y="66" fill="#a7f3d0" fontSize="7.5" fontFamily="monospace">ENLACE SATELITAL: OK</text>
              <text x="0" y="80" fill="#ff4d6d" fontSize="7.5" fontWeight="bold" fontFamily="monospace">ESTADO AMENAZAS: CRÍTICO</text>
              <text x="0" y="94" fill="#00e5ff" fontSize="7.5" fontFamily="monospace">DISPOSITIVOS SCADA: 1,480</text>
              <text x="0" y="108" fill="#6ee7b7" fontSize="7.5" fontFamily="monospace">SUBESTACIONES: BAJO ATAQUE</text>
            </g>
          </g>

          {/* D.4: BOTTOM HUD STATUS READOUTS (Exact text from user's image) */}
          <g id="bottomHudBar" transform="translate(20, 360)">
            {/* Background container for readouts */}
            <rect x="0" y="0" width="640" height="85" fill="#01110b" stroke="#00e5ff" strokeWidth="1.2" rx="4" />

            {/* Status Item 1: RESILIENCIA DEL NODO: 64% Y DECRECIENDO (Flashing Red Alert) */}
            <g transform="translate(12, 12)" filter="url(#combatRedGlow)">
              <rect x="0" y="0" width="230" height="28" fill="#2d050a" stroke="#ef4444" strokeWidth="1.5" rx="2" />
              <text x="10" y="18" fill="#ffffff" fontSize="8.5" fontWeight="900" fontFamily="monospace" letterSpacing="0.8">
                RESILIENCIA DEL NODO: <tspan fill="#ff2244">64% Y DECRECIENDO</tspan>
              </text>
            </g>

            {/* Status Item 2: INTEGRIDAD FÍSICA DE RED: 72% - INTRUSIÓN DETECTADA */}
            <g transform="translate(250, 12)">
              <rect x="0" y="0" width="220" height="28" fill="#031f17" stroke="#facc15" strokeWidth="1.2" rx="2" />
              <text x="10" y="18" fill="#fde047" fontSize="8" fontWeight="bold" fontFamily="monospace">
                INTEGRIDAD DE RED: 72% [INTRUSIÓN]
              </text>
            </g>

            {/* Status Item 3: PROTOCOLO DE RESILIENCIA ACTIVO */}
            <g transform="translate(478, 12)">
              <rect x="0" y="0" width="150" height="28" fill="#021c17" stroke="#00e5ff" strokeWidth="1.2" rx="2" />
              <text x="12" y="18" fill="#00e5ff" fontSize="8" fontWeight="bold" fontFamily="monospace">
                • PROTOCOLO ACTIVO
              </text>
            </g>

            {/* Degradation Graph (Line showing resilience descent curve) */}
            <g transform="translate(12, 48)">
              <text x="0" y="18" fill="#699680" fontSize="7" fontFamily="monospace">HISTÓRICO SLA RESILIENCIA:</text>
              {/* Axis */}
              <line x1="120" y1="20" x2="350" y2="20" stroke="#134e3a" strokeWidth="1" />
              {/* Plunging resilience curve */}
              <path
                d="M120,6 L160,8 L200,7 L230,12 L260,10 L280,18 L320,16 L350,19"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                filter="url(#combatRedGlow)"
              />
              <circle cx="350" cy="19" r="3" fill="#ff0044" className="animate-ping" />
            </g>

            {/* Secondary telemetry tags */}
            <g transform="translate(380, 52)">
              <text x="0" y="14" fill="#a7f3d0" fontSize="7.5" fontFamily="monospace">ESTADÍO AMENAZAS: ATAQUE CRÍTICO</text>
              <text x="145" y="14" fill="#00e5ff" fontSize="7.5" fontFamily="monospace">| DEFCON: TÁCTICO 2</text>
            </g>
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* SECTION E: CENTER-RIGHT FOREGROUND OPERATOR & SPARKS          */}
        {/* ------------------------------------------------------------- */}
        <g id="femaleCyberOfficer" transform="translate(680, 290)">
          {/* Glowing Translucent Tactical Console Table */}
          <polygon
            points="0,320 280,320 260,230 40,230"
            fill="rgba(0, 229, 255, 0.16)"
            stroke="#00e5ff"
            strokeWidth="2"
            filter="url(#hudCyanGlow)"
          />

          {/* Glowing Illuminated Keyboard Matrix */}
          <g transform="translate(70, 245)">
            <rect x="0" y="0" width="160" height="40" rx="3" fill="#021f18" stroke="#00e5ff" strokeWidth="1.2" />
            {/* Keyboard grid keys (orange/cyan glowing lights) */}
            <line x1="8" y1="12" x2="152" y2="12" stroke="#f97316" strokeWidth="2" strokeDasharray="4,2" />
            <line x1="8" y1="22" x2="152" y2="22" stroke="#00e5ff" strokeWidth="2" strokeDasharray="5,2" />
            <line x1="8" y1="32" x2="152" y2="32" stroke="#facc15" strokeWidth="2" strokeDasharray="3,2" />
          </g>

          {/* Female Military Cyber Officer (In Bolivian Camouflage Uniform) */}
          <g transform="translate(80, 20)">
            {/* Dark Hair Bun & Tactical Headset */}
            <ellipse cx="64" cy="42" rx="20" ry="22" fill="#140f09" />
            <circle cx="86" cy="40" r="10" fill="#0b0805" />
            {/* Headset Arc and Earcups */}
            <path d="M44,40 Q64,15 84,40" fill="none" stroke="#000000" strokeWidth="4" />
            <rect x="42" y="36" width="7" height="16" rx="3" fill="#00e5ff" filter="url(#hudCyanGlow)" />
            <line x1="45" y1="46" x2="30" y2="58" stroke="#000000" strokeWidth="2.5" />
            <circle cx="28" cy="60" r="3" fill="#00e5ff" />

            {/* Officer Face Profile (Urgent & Focused) */}
            <path
              d="M48,36 Q56,36 60,42 Q62,48 58,54 L52,58 Q46,62 44,60 Z"
              fill="#bf8c66"
            />
            {/* Collar & Uniform Shoulders (Bolivian Camouflage Digital Green/Brown) */}
            <path
              d="M20,68 L110,68 L130,220 L0,220 Z"
              fill="#193b2a"
              stroke="#2e6349"
              strokeWidth="2"
            />
            {/* Digital Camouflage Spots */}
            <g opacity="0.8">
              <rect x="30" y="90" width="18" height="12" fill="#0f261a" rx="2" />
              <rect x="70" y="85" width="22" height="14" fill="#29593f" rx="2" />
              <rect x="45" y="120" width="24" height="16" fill="#112d1f" rx="2" />
              <rect x="85" y="130" width="20" height="15" fill="#387a56" rx="2" />
              <rect x="25" y="160" width="30" height="18" fill="#10261a" rx="2" />
            </g>

            {/* Left Arm / Shoulder with Bolivian Flag Tricolor Patch */}
            <g transform="translate(98, 92)">
              <rect x="0" y="0" width="22" height="14" rx="2" fill="url(#bolivianFlagGrad)" stroke="#facc15" strokeWidth="1" />
            </g>

            {/* Arms and Hands Typing Urgently on the Keyboard Console */}
            <path d="M22,120 Q5,170 30,210 L50,220" fill="none" stroke="#193b2a" strokeWidth="18" strokeLinecap="round" />
            <circle cx="48" cy="225" r="9" fill="#bf8c66" />
            <path d="M105,120 Q125,170 100,210 L85,222" fill="none" stroke="#193b2a" strokeWidth="18" strokeLinecap="round" />
            <circle cx="85" cy="225" r="9" fill="#bf8c66" />
          </g>

          {/* SPECTACULAR BURST OF ELECTRICAL SPARKS & ARCS (From short-circuited console) */}
          <g id="electricSparksAndBlast" transform="translate(190, 235)">
            {/* Crack lines across terminal glass */}
            <path d="M0,0 L-25,-15 L-40,-8 M-25,-15 L-30,-30 M0,0 L-15,15" stroke="#ffffff" strokeWidth="1.5" />
            
            {/* Jagged High-Voltage Electric Arc Filaments */}
            <g stroke="#ffffff" strokeWidth="2.5" filter="url(#hudCyanGlow)">
              <path d="M0,0 L-12,-20 L4,-35 L-8,-55 L10,-75" fill="none" />
              <path d="M0,0 L18,-15 L10,-32 L26,-48" fill="none" />
              <path d="M0,0 L-18,-8 L-30,-22 L-22,-40" fill="none" />
            </g>

            {/* Glowing Golden / Orange Sparks Exploding Outward */}
            <g filter="url(#sparkGlow)" className="animate-spark">
              {/* Large Burst Sparks */}
              <circle cx="-14" cy="-28" r="5" fill="url(#sparksGrad)" />
              <circle cx="8" cy="-42" r="4.5" fill="url(#sparksGrad)" />
              <circle cx="-25" cy="-55" r="4" fill="#ffffff" />
              <circle cx="24" cy="-30" r="3.5" fill="#ffea00" />
              <circle cx="-4" cy="-70" r="3" fill="#ff4400" />
              <circle cx="32" cy="-60" r="4" fill="#ffea00" />
              <circle cx="-38" cy="-35" r="3.5" fill="#ff6600" />

              {/* Smaller Spark Particle Stream */}
              <circle cx="-18" cy="-85" r="2" fill="#ffffff" />
              <circle cx="16" cy="-90" r="2.5" fill="#ffea00" />
              <circle cx="-32" cy="-75" r="2" fill="#ff6600" />
              <circle cx="42" cy="-45" r="2" fill="#ffea00" />
              <circle cx="-8" cy="-105" r="2" fill="#ffffff" />
              <circle cx="28" cy="-80" r="2.5" fill="#ff4400" />
            </g>

            {/* Smoke / Combat Steam Wisps Rising from Sparks */}
            <path
              d="M-10,-30 Q-35,-80 5,-130 Q-20,-180 20,-220"
              fill="none"
              stroke="#a7f3d0"
              strokeWidth="12"
              opacity="0.2"
              strokeLinecap="round"
            />
            <path
              d="M10,-20 Q40,-70 15,-120 Q35,-170 0,-210"
              fill="none"
              stroke="#ffffff"
              strokeWidth="8"
              opacity="0.15"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* ------------------------------------------------------------- */}
        {/* SECTION F: LEFT OPERATOR, CRACKED SCREEN & TACTICAL DRONE    */}
        {/* ------------------------------------------------------------- */}
        <g id="maleCyberOfficer" transform="translate(140, 360)">
          {/* Seated Male Soldier Operator (Back/Profile View) */}
          <g transform="translate(40, 40)">
            {/* Combat Helmet */}
            <path d="M28,32 Q42,16 62,18 Q76,28 74,45 L30,45 Z" fill="#143627" stroke="#255940" strokeWidth="1.5" />
            {/* Camouflage Shoulders & Back */}
            <path d="M10,50 L95,50 L110,180 L0,180 Z" fill="#173b2a" stroke="#2a664d" strokeWidth="2" />
            <circle cx="35" cy="80" r="10" fill="#0d2419" />
            <circle cx="70" cy="95" r="12" fill="#255940" />
            <circle cx="45" cy="130" r="14" fill="#0f291d" />
            {/* Arm Forward to Console */}
            <path d="M15,80 Q5,130 35,145" fill="none" stroke="#173b2a" strokeWidth="16" strokeLinecap="round" />
          </g>

          {/* Operator Terminal Monitor with SPIDERWEB BULLET IMPACT CRATER */}
          <g transform="translate(0, 10)">
            {/* Monitor Housing */}
            <rect x="0" y="0" width="105" height="75" rx="3" fill="#04120c" stroke="#00e5ff" strokeWidth="1.5" />
            <rect x="5" y="5" width="95" height="65" fill="#01140e" />

            {/* Radar / Tactical Grid on Screen */}
            <circle cx="52" cy="37" r="22" fill="none" stroke="#00e5ff" strokeWidth="0.8" opacity="0.6" />
            <line x1="52" y1="15" x2="52" y2="59" stroke="#00e5ff" strokeWidth="0.8" opacity="0.6" />
            <line x1="30" y1="37" x2="74" y2="37" stroke="#00e5ff" strokeWidth="0.8" opacity="0.6" />

            {/* Circular Spiderweb Bullet / Shrapnel Hole on Screen Glass */}
            <g transform="translate(52, 37)">
              <circle cx="0" cy="0" r="6" fill="#000000" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="12" fill="none" stroke="#00e5ff" strokeWidth="1" strokeDasharray="3,2" />
              <circle cx="0" cy="0" r="18" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4,3" />
              {/* Radiating Impact Crack Fractures */}
              <line x1="0" y1="-6" x2="-8" y2="-26" stroke="#ffffff" strokeWidth="1.2" />
              <line x1="4" y1="-4" x2="22" y2="-20" stroke="#ffffff" strokeWidth="1.2" />
              <line x1="6" y1="2" x2="32" y2="8" stroke="#ffffff" strokeWidth="1.2" />
              <line x1="2" y1="6" x2="16" y2="24" stroke="#ffffff" strokeWidth="1.2" />
              <line x1="-5" y1="4" x2="-24" y2="20" stroke="#ffffff" strokeWidth="1.2" />
              <line x1="-6" y1="-2" x2="-30" y2="-8" stroke="#ffffff" strokeWidth="1.2" />
            </g>
          </g>

          {/* Small Tactical Quadcopter Recon Drone on Table Desk */}
          <g transform="translate(-100, 75)">
            {/* Drone Body */}
            <rect x="25" y="20" width="30" height="12" rx="4" fill="#0a1f17" stroke="#00e5ff" strokeWidth="1" />
            <circle cx="40" cy="26" r="3" fill="#00e5ff" />
            {/* Drone 4 Rotor Arms */}
            <line x1="12" y1="12" x2="30" y2="22" stroke="#1b4534" strokeWidth="2.5" />
            <line x1="68" y1="12" x2="50" y2="22" stroke="#1b4534" strokeWidth="2.5" />
            <line x1="12" y1="40" x2="30" y2="30" stroke="#1b4534" strokeWidth="2.5" />
            <line x1="68" y1="40" x2="50" y2="30" stroke="#1b4534" strokeWidth="2.5" />
            {/* Rotor Blades */}
            <line x1="4" y1="12" x2="20" y2="12" stroke="#00e5ff" strokeWidth="1.5" />
            <line x1="60" y1="12" x2="76" y2="12" stroke="#00e5ff" strokeWidth="1.5" />
            <line x1="4" y1="40" x2="20" y2="40" stroke="#00e5ff" strokeWidth="1.5" />
            <line x1="60" y1="40" x2="76" y2="40" stroke="#00e5ff" strokeWidth="1.5" />
            {/* Tactical Antenna */}
            <line x1="40" y1="20" x2="40" y2="6" stroke="#facc15" strokeWidth="1.5" />
            <circle cx="40" cy="5" r="1.5" fill="#ef4444" className="animate-pulse" />
          </g>
        </g>
      </svg>

      {/* ------------------------------------------------------------- */}
      {/* 3. OPTIMAL CARD CONTRAST & LEGIBILITY PROTECTION SCRIM       */}
      {/* "contrastado con el color de la tarjeta"                      */}
      {/* ------------------------------------------------------------- */}
      {/* Bottom Scrim: protects the card action buttons & progress bar while letting the bunker floor glow */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#03150e] via-[#03150e]/80 to-transparent pointer-events-none" />

      {/* Top Header Scrim: gives high-contrast dark backdrop for Card Title, Subtitle, and Tag Badges */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#02100a]/92 via-[#02100a]/60 to-transparent pointer-events-none" />

      {/* Left/Right Edge Vignette for dimensional cinematic frame */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#020b08]/85 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#020b08]/85 to-transparent pointer-events-none" />

      {/* Outer Tactical Border Inset Glow */}
      <div className="absolute inset-0 shadow-[inset_0_0_24px_rgba(0,229,255,0.18)] pointer-events-none" />
    </div>
  );
};
