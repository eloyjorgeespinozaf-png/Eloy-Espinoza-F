import React, { useState } from 'react';
import { 
  KeyRound, 
  UserCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  Cpu, 
  AlertCircle,
  ShieldCheck,
  Radio,
  ArrowRight
} from 'lucide-react';
import { InstitutionalEmblem } from './components/InstitutionalEmblem';
import { CentroDeOperaciones } from './components/CentroDeOperaciones';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  // Authentication & View State (Defaults directly to the Centro de Operaciones Dashboard)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [operatorCode, setOperatorCode] = useState('OP-7490-ALFA');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStatus, setAuthStatus] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!operatorCode.trim() || !password.trim()) {
      setAuthStatus('error');
      return;
    }
    
    setIsAuthenticating(true);
    setAuthStatus(null);
    
    setTimeout(() => {
      setIsAuthenticating(false);
      setIsAuthenticated(true);
    }, 600);
  };

  // If user is authenticated, render the Centro de Operaciones Main Dashboard
  if (isAuthenticated) {
    return (
      <CentroDeOperaciones 
        onLogout={() => {
          setIsAuthenticated(false);
          setAuthStatus(null);
        }}
        operatorCode={operatorCode || 'OP-7490-ALFA'}
      />
    );
  }

  // Otherwise, render the Login Screen with Full Institutional Identity & Emerald Glassmorphism
  return (
    <div className="min-h-screen w-full tactical-emerald-bg text-[#d1ded9] font-sans flex flex-col justify-between items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-[#20523a] selection:text-[#a7f3d0]">
      
      {/* Background Image Layer (Subtle tactical texture with Google Drive source) */}
      <div 
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.20] filter contrast-125 brightness-90 saturate-75 mix-blend-luminosity transition-opacity duration-700"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/d/1J1GAxXx4uZDkoayKNNyBXZL2NHV4011r'), url('https://drive.google.com/thumbnail?id=1J1GAxXx4uZDkoayKNNyBXZL2NHV4011r&sz=w2560')`
        }}
      />

      {/* Security Vignette Layer */}
      <div className="pointer-events-none absolute inset-0 security-vignette" />
      <div className="pointer-events-none absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#10b981] to-transparent opacity-70" />

      {/* Top Security Status Bar */}
      <header className="w-full max-w-4xl flex items-center justify-between py-2 border-b border-[#133d2b] text-[11px] font-mono tracking-wider text-[#7ea894] z-10">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
          <span className="uppercase text-[#9acbb4] font-semibold">TERMINAL DE ENLACE SEGURO</span>
          <span className="hidden sm:inline text-[#20523b]">|</span>
          <span className="hidden sm:inline text-[#6f9e87]">CANAL: SSL-TAC-256</span>
        </div>
        <div className="flex items-center space-x-3 text-[#6f9e87]">
          <span className="px-2 py-0.5 border border-[#1f6145] bg-[#07241a] text-[#86efac] text-[10px] rounded-xs font-bold uppercase tracking-wider">
            NIVEL 4
          </span>
        </div>
      </header>

      {/* Main Authentication Card Container (Dark Glassmorphism) */}
      <main className="w-full max-w-xl my-auto py-6 z-10">
        <div 
          id="login-card"
          className="relative bg-[#051711]/92 border border-[#1a4a35] rounded-xs p-6 sm:p-9 shadow-[0_20px_50px_rgba(0,10,6,0.92)] backdrop-blur-md transition-all duration-300"
        >
          {/* Tactical Corner Accents */}
          <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#34d399]" />
          <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#34d399]" />
          <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#34d399]" />
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#34d399]" />

          {/* Institutional Header & Visual Identity Section */}
          <div className="text-center mb-6">
            
            {/* Centered Institutional Emblem Container (Max 250px) */}
            <div id="institutional-emblem-container" className="flex justify-center items-center mb-4 min-h-[120px]">
              <InstitutionalEmblem size="lg" showHalo={true} />
            </div>

            {/* Hierarchical Institutional Texts */}
            <div className="space-y-1 text-center border-b border-[#18402f] pb-4 mb-4">
              <h2 className="font-heading text-xs sm:text-sm font-semibold tracking-wider text-white uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                FACULTAD DE CIENCIAS Y ARTES MILITARES TERRESTRES
              </h2>
              <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold tracking-wide text-white uppercase leading-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                ESCUELA DE COMANDO Y ESTADO MAYOR DEL EJÉRCITO
              </h3>
              <p className="font-heading text-xs sm:text-sm font-semibold tracking-widest text-[#e2ede8] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                “MCAL. ANDRÉS DE SANTA CRUZ”
              </p>
              <p className="font-mono text-xs sm:text-sm font-bold tracking-[0.4em] text-[#facc15] uppercase pt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                BOLIVIA
              </p>
            </div>

            {/* System Title in Oswald/Teko Heading Typography */}
            <div className="pt-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5e8271] font-semibold block mb-1">
                PORTAL CENTRAL DE CONTROL Y ACCESO
              </span>
              <h1 
                id="system-main-title" 
                className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
              >
                CAMPUS VIRTUAL DE INTELIGENCIA ESTRATÉGICA
              </h1>
            </div>
          </div>

          {/* Access Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-5" noValidate>
            
            {/* Operator Code Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label 
                  htmlFor="operator-code"
                  className="font-sans font-semibold text-[#c0d4cb] flex items-center gap-1.5 uppercase tracking-wider text-[11px]"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#34d399]" />
                  CÓDIGO DE OPERADOR
                </label>
                <span className="font-mono text-[10px] text-[#4d6b5c]">ID-OFICIAL</span>
              </div>
              <div className="relative group">
                <input
                  id="operator-code"
                  type="text"
                  value={operatorCode}
                  onChange={(e) => setOperatorCode(e.target.value)}
                  placeholder="EJ. OP-7490-ALFA"
                  autoComplete="username"
                  required
                  className="w-full bg-[#04110d] border border-[#1c4533] focus:border-[#34d399] focus:ring-1 focus:ring-[#34d399] rounded-xs px-3.5 py-3 text-white placeholder-[#415a4e] font-mono text-sm tracking-wider outline-none transition-colors"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#3b594b]">
                  <Cpu className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Operator Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label 
                  htmlFor="operator-password"
                  className="font-sans font-semibold text-[#c0d4cb] flex items-center gap-1.5 uppercase tracking-wider text-[11px]"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#34d399]" />
                  CONTRASEÑA
                </label>
                <span className="font-mono text-[10px] text-[#4d6b5c]">PIN-SEGURO</span>
              </div>
              <div className="relative group">
                <input
                  id="operator-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full bg-[#04110d] border border-[#1c4533] focus:border-[#34d399] focus:ring-1 focus:ring-[#34d399] rounded-xs px-3.5 py-3 text-white placeholder-[#415a4e] font-mono text-sm tracking-widest outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#4d705f] hover:text-[#88a897] focus:outline-none transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Form Validation Feedback */}
            {authStatus === 'error' && (
              <div 
                id="auth-error-message"
                className="p-3 bg-[#1e0e0e] border border-[#5c2121] rounded-xs flex items-center gap-2 text-xs text-[#fca5a5] font-mono"
              >
                <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0" />
                <span>INGRESE CÓDIGO DE OPERADOR Y CONTRASEÑA VÁLIDOS.</span>
              </div>
            )}

            {/* Primary Action Button (Prominent with brighter green hover) */}
            <div className="pt-2">
              <button
                id="auth-submit-btn"
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-[#164430] hover:bg-[#1f5c42] active:bg-[#113525] border border-[#2d7350] hover:border-[#34d399] hover:shadow-[0_0_18px_rgba(52,211,153,0.35)] text-[#f0fdf4] font-heading text-base sm:text-lg font-bold uppercase tracking-widest py-3.5 px-6 rounded-xs transition-all duration-200 shadow-md shadow-[#020b07] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isAuthenticating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#dcfce7] border-t-transparent rounded-full animate-spin" />
                    <span>AUTENTICANDO ACCESO...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#34d399]" />
                    <span>AUTENTICAR</span>
                  </>
                )}
              </button>
              {/* Install and Download Button on Login Screen */}
              <PWAInstallButton variant="login" />
            </div>
          </form>

          {/* Institutional Security Notice */}
          <div className="mt-7 pt-4 border-t border-[#143626] text-center">
            <p className="text-[10px] font-sans uppercase tracking-wider text-[#527363] leading-relaxed">
              AVISO DE SEGURIDAD: ESTE SISTEMA ES DE USO EXCLUSIVO PARA PERSONAL AUTORIZADO. TODA ACTIVIDAD QUEDA REGISTRADA Y AUDITADA.
            </p>
          </div>
        </div>
      </main>

      {/* Offline Status Connectivity Banner */}
      <OfflineIndicator />

      {/* Bottom Tactical Footer */}
      <footer className="w-full max-w-4xl py-3 border-t border-[#123626] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#527363] z-10">
        <div className="flex items-center space-x-3">
          <span>SISTEMA: CIV-INTEL-v4.2</span>
          <span>•</span>
          <span className="text-[#86efac]">TERMINAL EN LÍNEA</span>
        </div>
        <div className="text-center sm:text-right text-[#425e50]">
          CAMPUS VIRTUAL DE INTELIGENCIA ESTRATÉGICA &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
