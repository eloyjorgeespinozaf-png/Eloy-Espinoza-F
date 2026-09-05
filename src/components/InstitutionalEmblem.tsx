import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showHalo?: boolean;
  className?: string;
}

export function InstitutionalEmblem({ size = 'md', showHalo = true, className = '' }: Props) {
  const [loadError, setLoadError] = useState(false);
  const [imgSrc, setImgSrc] = useState('/Gemini_Generated_Image_h1ntq6h1ntq6h1nt.jpg');

  const sizeClasses = {
    sm: "w-12 h-12 max-w-[56px] max-h-[56px]",
    md: "w-36 h-36 max-w-[150px] max-h-[150px]",
    lg: "w-48 h-48 max-w-[210px] max-h-[210px]",
    xl: "w-64 h-64 max-w-[280px] max-h-[280px]"
  };

  const haloClasses = {
    sm: "w-16 h-16",
    md: "w-44 h-44",
    lg: "w-56 h-56",
    xl: "w-72 h-72"
  };

  const handleImgError = () => {
    if (imgSrc === '/Gemini_Generated_Image_h1ntq6h1ntq6h1nt.jpg') {
      setImgSrc('/pwa-512x512.png');
    } else if (imgSrc === '/pwa-512x512.png') {
      setImgSrc('/icon.svg');
    } else {
      setLoadError(true);
    }
  };

  if (loadError) {
    return (
      <div className={`inline-flex items-center justify-center rounded-xs bg-[#092218] border border-[#1d6b47] text-[#34d399] shadow-inner shadow-[#02110a] ${sizeClasses[size]} ${className}`}>
        <ShieldCheck className={size === 'sm' ? 'w-6 h-6' : 'w-12 h-12'} />
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {showHalo && (
        <div className={`absolute inset-0 m-auto rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.30)_0%,rgba(0,229,255,0.12)_45%,transparent_75%)] pointer-events-none blur-md ${haloClasses[size]}`} />
      )}
      
      <img
        src={imgSrc}
        alt="Emblema Oficial Inteligencia Estratégica Bolivia - Escuela de Comando y Estado Mayor"
        referrerPolicy="no-referrer"
        loading="eager"
        className={`relative z-10 ${sizeClasses[size]} object-contain block mx-auto transition-transform duration-300 filter drop-shadow-[0_8px_25px_rgba(0,0,0,0.95)] contrast-[1.08] brightness-[1.02] hover:scale-[1.03] rounded-xs`}
        onError={handleImgError}
      />
    </div>
  );
}
