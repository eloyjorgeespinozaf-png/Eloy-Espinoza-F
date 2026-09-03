import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  showHalo?: boolean;
}

export function InstitutionalEmblem({ size = 'md', showHalo = true }: Props) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  const directGoogleDriveUrl = "https://lh3.googleusercontent.com/d/1sA9yj2uw0EjX0gndp81Orj908zIIIqPs";
  const thumbnailGoogleDriveUrl = "https://drive.google.com/thumbnail?id=1sA9yj2uw0EjX0gndp81Orj908zIIIqPs&sz=w1000";
  const exportViewUrl = "https://drive.google.com/uc?export=view&id=1sA9yj2uw0EjX0gndp81Orj908zIIIqPs";

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const w = img.naturalWidth || img.width || 400;
        const h = img.naturalHeight || img.height || 400;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        if (!ctx) {
          setProcessedSrc(img.src);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;

        // Sample background from borders
        const borderSamples: number[][] = [];
        for (let x = 0; x < w; x += Math.max(1, Math.floor(w / 10))) {
          borderSamples.push([x, 0], [x, h - 1]);
        }
        for (let y = 0; y < h; y += Math.max(1, Math.floor(h / 10))) {
          borderSamples.push([0, y], [w - 1, y]);
        }

        let bgR = 0, bgG = 0, bgB = 0;
        borderSamples.forEach(([x, y]) => {
          const idx = (y * w + x) * 4;
          bgR += data[idx];
          bgG += data[idx + 1];
          bgB += data[idx + 2];
        });
        bgR /= borderSamples.length;
        bgG /= borderSamples.length;
        bgB /= borderSamples.length;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const distToBg = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
          const distToWhite = Math.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2);
          const minDistance = Math.min(distToBg, distToWhite);

          if (minDistance < 50) {
            data[i + 3] = 0;
          } else if (minDistance < 85) {
            data[i + 3] = Math.floor(((minDistance - 50) / 35) * 255);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setProcessedSrc(canvas.toDataURL('image/png'));
      } catch {
        setProcessedSrc(img.src);
      }
    };

    img.onerror = () => {
      if (img.src === directGoogleDriveUrl) {
        img.src = thumbnailGoogleDriveUrl;
      } else if (img.src === thumbnailGoogleDriveUrl) {
        img.src = exportViewUrl;
      } else {
        setLoadError(true);
      }
    };

    img.src = directGoogleDriveUrl;
  }, []);

  const sizeClasses = {
    sm: "max-w-[70px] max-h-[60px]",
    md: "max-w-[170px] max-h-[135px]",
    lg: "max-w-[220px] max-h-[175px]"
  };

  if (loadError) {
    return (
      <div className={`inline-flex items-center justify-center rounded-full bg-[#092218] border border-[#1d6b47] text-[#34d399] shadow-inner shadow-[#02110a] ${size === 'sm' ? 'w-10 h-10' : 'w-16 h-16'}`}>
        <ShieldCheck className={size === 'sm' ? 'w-5 h-5' : 'w-8 h-8'} />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center select-none">
      {showHalo && (
        <div className={`absolute inset-0 m-auto rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.22)_0%,rgba(16,185,129,0.05)_50%,transparent_75%)] pointer-events-none blur-md ${size === 'sm' ? 'w-16 h-16' : 'w-36 h-36'}`} />
      )}
      
      <img
        src={processedSrc || directGoogleDriveUrl}
        alt="Escudo Institucional ECEME"
        referrerPolicy="no-referrer"
        loading="eager"
        className={`relative z-10 w-full ${sizeClasses[size]} h-auto object-contain block mx-auto transition-all duration-300 filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)] contrast-[1.12] brightness-[1.04] hover:scale-[1.03]`}
        style={{
          backgroundColor: 'transparent',
          mixBlendMode: processedSrc ? 'normal' : 'multiply'
        }}
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.dataset.fallbackStage) {
            target.dataset.fallbackStage = '1';
            target.src = thumbnailGoogleDriveUrl;
          } else if (target.dataset.fallbackStage === '1') {
            target.dataset.fallbackStage = '2';
            target.src = exportViewUrl;
          } else {
            setLoadError(true);
          }
        }}
      />
    </div>
  );
}
