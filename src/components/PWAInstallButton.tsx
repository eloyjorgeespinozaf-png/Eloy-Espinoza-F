import React, { useState } from 'react';
import { Download, MonitorSmartphone, Smartphone, Laptop } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { ModalInstalacionApp } from './ModalInstalacionApp';

interface PWAInstallButtonProps {
  variant?: 'header' | 'sidebar' | 'banner' | 'login';
}

export function PWAInstallButton({ variant = 'header' }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = async () => {
    // If standard browser PWA install prompt is ready, offer modal with download files as well
    setIsModalOpen(true);
  };

  if (variant === 'sidebar') {
    return (
      <>
        <button
          onClick={handleClick}
          type="button"
          className="w-full mt-2 p-3 bg-gradient-to-r from-[#07281a] to-[#041a11] hover:from-[#0b3825] hover:to-[#082619] border border-[#1d6b46] hover:border-[#34d399] rounded-xs text-[#86efac] flex items-center justify-between transition-all group cursor-pointer shadow-md"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-2xs bg-[#0b3321] border border-[#237c52] flex items-center justify-center text-[#34d399] group-hover:scale-105 transition-transform">
              <Download className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="font-heading text-xs font-bold text-white uppercase tracking-wider block">
                Descargar / Instalar
              </span>
              <span className="font-mono text-[9px] text-[#71a38c] uppercase">
                PC & Móvil (Instalador)
              </span>
            </div>
          </div>
          <span className="px-1.5 py-0.5 bg-[#0e3b27] border border-[#34d399]/40 text-[#a7f3d0] text-[9px] font-mono font-bold rounded-2xs">
            PWA
          </span>
        </button>

        <ModalInstalacionApp
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  if (variant === 'login') {
    return (
      <>
        <button
          onClick={handleClick}
          type="button"
          className="w-full mt-4 py-2.5 px-4 bg-[#061f15] hover:bg-[#0b3322] border border-[#1d6342] hover:border-[#34d399] text-[#86efac] font-heading text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <MonitorSmartphone className="w-4 h-4 text-[#34d399]" />
          <span>Descargar e Instalar en PC / Celular</span>
        </button>

        <ModalInstalacionApp
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  // Variant 'header' (default)
  return (
    <>
      <button
        onClick={handleClick}
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 bg-[#092e1e] hover:bg-[#0e402b] border border-[#237850] hover:border-[#34d399] text-[#86efac] hover:text-white rounded-xs text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm"
        title="Descargar instalador o instalar app para Computadora y Móvil"
      >
        <Download className="w-3.5 h-3.5 text-[#34d399] animate-pulse" />
        <span className="hidden sm:inline">DESCARGAR APP (PC/MÓVIL)</span>
        <span className="sm:hidden">INSTALAR</span>
      </button>

      <ModalInstalacionApp
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
