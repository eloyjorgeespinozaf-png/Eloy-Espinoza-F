import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xs bg-[#b45309] border border-[#f59e0b] px-3.5 py-2 text-xs font-mono text-white shadow-2xl animate-bounce">
      <WifiOff className="w-4 h-4 text-[#fef08a]" />
      <span>Modo Sin Conexión — Datos tácticos cacheados en memoria local.</span>
    </div>
  );
}
