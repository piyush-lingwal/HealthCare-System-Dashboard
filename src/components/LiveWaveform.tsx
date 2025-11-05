import { useEffect, useRef, useState } from 'react';

interface LiveWaveformProps {
  color: string;
  label: string;
  type: 'ecg' | 'gsr';
  height?: number;
  isActive: boolean;
}

export const LiveWaveform = ({ color, label, type, height = 140, isActive }: LiveWaveformProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dataRef = useRef<number[]>([]);
  const animationRef = useRef<number>();
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isActive) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const maxDataPoints = 150;
    const padding = 10;
    const chartHeight = rect.height - padding * 2;
    const chartWidth = rect.width - padding * 2;

    let time = 0;

    const generateValue = (t: number) => {
      if (type === 'ecg') {
        const baseFreq = 1.2;
        const heartbeat = Math.sin(t * baseFreq) * 30;

        const beatPhase = (t * baseFreq) % (Math.PI * 2);
        let qrsComplex = 0;

        if (beatPhase > 1.3 && beatPhase < 1.7) {
          qrsComplex = Math.sin((beatPhase - 1.3) * 7) * 60;
        } else if (beatPhase > 1.7 && beatPhase < 2.0) {
          qrsComplex = -Math.sin((beatPhase - 1.7) * 10) * 80;
        } else if (beatPhase > 2.0 && beatPhase < 2.5) {
          qrsComplex = Math.sin((beatPhase - 2.0) * 6) * 100;
        }

        const noise = (Math.random() - 0.5) * 3;
        return heartbeat + qrsComplex + noise;
      } else {
        const slow = Math.sin(t * 0.3) * 20;
        const medium = Math.sin(t * 0.8) * 10;
        const noise = (Math.random() - 0.5) * 5;
        return slow + medium + noise;
      }
    };

    const animate = () => {
      time += 0.05;
      const newValue = generateValue(time);

      dataRef.current.push(newValue);
      if (dataRef.current.length > maxDataPoints) {
        dataRef.current.shift();
      }

      setCurrentValue(Math.round(newValue + 50));

      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(rect.width - padding, y);
        ctx.stroke();
      }

      for (let i = 0; i <= 10; i++) {
        const x = padding + (chartWidth / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, rect.height - padding);
        ctx.stroke();
      }

      ctx.setLineDash([]);

      if (dataRef.current.length < 2) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const values = dataRef.current;
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min || 1;

      const gradient = ctx.createLinearGradient(0, padding, 0, rect.height - padding);
      gradient.addColorStop(0, color + '30');
      gradient.addColorStop(1, color + '00');

      ctx.beginPath();
      values.forEach((value, index) => {
        const x = padding + (chartWidth / maxDataPoints) * (maxDataPoints - values.length + index);
        const y = padding + chartHeight - ((value - min) / range) * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.lineTo(rect.width - padding, rect.height - padding);
      ctx.lineTo(padding + (chartWidth / maxDataPoints) * (maxDataPoints - values.length), rect.height - padding);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;

      values.forEach((value, index) => {
        const x = padding + (chartWidth / maxDataPoints) * (maxDataPoints - values.length + index);
        const y = padding + chartHeight - ((value - min) / range) * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
      ctx.shadowBlur = 0;

      if (values.length > 0) {
        const lastX = rect.width - padding;
        const lastY = padding + chartHeight - ((values[values.length - 1] - min) / range) * chartHeight;

        ctx.beginPath();
        ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
        ctx.strokeStyle = color + '60';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, type, isActive]);

  return (
    <div className="relative">
      <div className="absolute top-2 left-4 text-xs font-medium text-slate-400 z-10 flex items-center gap-3">
        <span>{label}</span>
        {isActive && (
          <span className="text-white font-mono bg-slate-900/70 px-2 py-0.5 rounded">
            {currentValue}
          </span>
        )}
      </div>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};
