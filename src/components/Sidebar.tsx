import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  LogOut, 
  ShieldAlert, 
  Radio, 
  ChevronRight,
  Terminal,
  Activity
} from 'lucide-react';
import { InstitutionalEmblem } from './InstitutionalEmblem';
import { OperatorProfile } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
  operator: OperatorProfile;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({
  currentTab,
  onSelectTab,
  onLogout,
  operator,
  isOpenMobile = false,
  onCloseMobile
}: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: 'EN VIVO',
      description: 'Centro de Comando'
    },
    {
      id: 'perfil',
      label: 'Perfil',
      icon: User,
      badge: null,
      description: 'Credenciales y Rango'
    },
    {
      id: 'configuraciones',
      label: 'Configuraciones',
      icon: Settings,
      badge: null,
      description: 'Parámetros del Sistema'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside 
        className={`fixed lg:static top-0 left-0 h-full w-64 sm:w-72 bg-[#04130d]/95 border-r border-[#153e2b] flex flex-col justify-between z-50 transition-transform duration-300 backdrop-blur-md shadow-2xl ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Section: ECEME Reduced Brand */}
        <div className="p-5 border-b border-[#123625]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-[#071e14] border border-[#1d593b] rounded-xs p-1">
              <InstitutionalEmblem size="sm" showHalo={false} />
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold tracking-[0.25em] text-[#34d399] uppercase block">
                ECEME • BOLIVIA
              </span>
              <h2 className="font-heading text-sm font-bold text-white uppercase tracking-wider leading-tight">
                CAMPUS VIRTUAL
              </h2>
              <p className="font-mono text-[10px] text-[#6b9982] uppercase tracking-tight">
                INTELIGENCIA ESTRATÉGICA
              </p>
            </div>
          </div>

          {/* System Security Tag */}
          <div className="mt-4 pt-3 border-t border-[#123625]/60 flex items-center justify-between text-[10px] font-mono">
            <span className="text-[#65917c] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
              NODO: TAC-ANDES
            </span>
            <span className="px-1.5 py-0.5 bg-[#0b291c] text-[#34d399] border border-[#1f6643] rounded-2xs font-semibold">
              SSL-256
            </span>
          </div>
        </div>

        {/* Middle Navigation Menu */}
        <div className="flex-1 py-5 px-3 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#55806c]">
            MÓDULOS DEL SISTEMA
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xs font-sans text-xs tracking-wider transition-all duration-200 group cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#0e3524] text-white border border-[#2d7d54] shadow-[0_0_15px_rgba(52,211,153,0.15)] font-semibold'
                    : 'text-[#9ebbb0] hover:bg-[#082217] hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-xs transition-colors ${
                    isActive ? 'bg-[#185338] text-[#34d399]' : 'text-[#608b77] group-hover:text-[#34d399]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block uppercase leading-none">{item.label}</span>
                    <span className="font-mono text-[10px] text-[#5b8471] block pt-1 font-normal">
                      {item.description}
                    </span>
                  </div>
                </div>

                {item.badge ? (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#144d32] text-[#86efac] border border-[#2b8a5a] rounded-2xs">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                    isActive ? 'text-[#34d399] translate-x-0.5' : 'text-[#3f5f50] group-hover:text-[#7ba693]'
                  }`} />
                )}
              </button>
            );
          })}

          {/* Emergency Alert Protocol */}
          <div className="pt-4 px-1 space-y-3">
            {/* Install / Download Application Button */}
            <PWAInstallButton variant="sidebar" />

            <div className="p-3 bg-[#081a13] border border-[#16412e] rounded-xs text-[11px] font-mono text-[#8cb0a0]">
              <div className="flex items-center gap-2 text-[#facc15] font-semibold mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>ESTADO OPERACIONAL</span>
              </div>
              <p className="text-[10px] text-[#638b77] leading-relaxed">
                Nivel de alerta: DEFCON 3. Protocolos de interdicción en frontera activos.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Operator Profile Card & Logout */}
        <div className="p-4 border-t border-[#123625] bg-[#03100a]">
          {/* Operator Identifier */}
          <div className="p-3 bg-[#071e14] border border-[#1c5438] rounded-xs mb-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#618c78] mb-1">
              <span>OPERADOR EN SERVICIO</span>
              <span className="flex items-center gap-1 text-[#34d399]">
                <Activity className="w-2.5 h-2.5 animate-pulse" />
                ONLINE
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#123a27] border border-[#2b7852] flex items-center justify-center text-[#86efac] font-bold text-xs font-mono">
                OP
              </div>
              <div className="overflow-hidden">
                <h4 className="font-mono text-xs font-bold text-white tracking-wider truncate">
                  {operator.code}
                </h4>
                <p className="font-mono text-[10px] text-[#facc15] truncate">
                  {operator.rank} • {operator.clearanceLevel}
                </p>
              </div>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={onLogout}
            className="w-full py-2.5 px-3 bg-[#170a0a] hover:bg-[#2b1010] active:bg-[#120707] border border-[#522020] hover:border-[#8f3232] text-[#fca5a5] hover:text-white rounded-xs font-mono text-xs tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="uppercase font-semibold">CERRAR SESIÓN</span>
          </button>
        </div>
      </aside>
    </>
  );
}
