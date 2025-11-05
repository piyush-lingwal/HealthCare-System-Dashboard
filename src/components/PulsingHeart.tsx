import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PulsingHeartProps {
  bpm: number;
  isActive: boolean;
}

export const PulsingHeart = ({ bpm, isActive }: PulsingHeartProps) => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (!isActive || bpm === 0) return;

    const interval = 60000 / bpm;

    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 200);
    }, interval);

    return () => clearInterval(pulseInterval);
  }, [bpm, isActive]);

  return (
    <div className="relative">
      <Heart
        className={`w-8 h-8 text-red-500 transition-all duration-200 ${
          isPulsing && isActive ? 'scale-125 fill-red-500' : 'scale-100'
        }`}
        style={{
          filter: isPulsing && isActive ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))' : 'none'
        }}
      />
      {isActive && (
        <>
          <div
            className={`absolute inset-0 rounded-full bg-red-500/30 transition-all duration-300 ${
              isPulsing ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
            }`}
          />
          <div
            className={`absolute inset-0 rounded-full bg-red-500/20 transition-all duration-500 delay-100 ${
              isPulsing ? 'scale-[2] opacity-0' : 'scale-100 opacity-100'
            }`}
          />
        </>
      )}
    </div>
  );
};
