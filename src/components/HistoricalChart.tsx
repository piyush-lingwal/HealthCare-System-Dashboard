import { HealthReading } from '../lib/supabase';

interface HistoricalChartProps {
  readings: HealthReading[];
  metric: 'heart_rate' | 'spo2' | 'temperature' | 'stress_level';
  color: string;
  label: string;
}

export const HistoricalChart = ({ readings, metric, color, label }: HistoricalChartProps) => {
  let data = readings.slice(0, 20).reverse();

  // Add dummy data if no readings available
  if (data.length === 0) {
    const now = Date.now();
    const dummyData: HealthReading[] = [];

    for (let i = 0; i < 20; i++) {
      const timestamp = new Date(now - (20 - i) * 60000).toISOString();
      dummyData.push({
        id: `dummy-${i}`,
        user_id: 'dummy',
        timestamp,
        heart_rate: 70 + Math.sin(i / 3) * 15 + Math.random() * 5,
        spo2: 96 + Math.sin(i / 4) * 2 + Math.random() * 2,
        temperature: 36.6 + Math.sin(i / 5) * 0.5 + Math.random() * 0.3,
        stress_level: 40 + Math.sin(i / 2) * 20 + Math.random() * 10,
        ecg_value: 0,
        gsr_value: 0,
        created_at: timestamp,
        acknowledged: false
      });
    }
    data = dummyData;
  }

  const values = data.map((r) => r[metric] as number);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return (
    <div className="relative h-48">
      <div className="absolute top-0 left-0 text-xs font-medium text-slate-400">
        {label}
      </div>

      <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${metric}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d={data
            .map((reading, index) => {
              const x = (index / (data.length - 1)) * 400;
              const value = reading[metric] as number;
              const y = 140 - ((value - min) / range) * 120;
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ')}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        <path
          d={`${data
            .map((reading, index) => {
              const x = (index / (data.length - 1)) * 400;
              const value = reading[metric] as number;
              const y = 140 - ((value - min) / range) * 120;
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ')} L 400 160 L 0 160 Z`}
          fill={`url(#gradient-${metric})`}
        />

        {data.map((reading, index) => {
          const x = (index / (data.length - 1)) * 400;
          const value = reading[metric] as number;
          const y = 140 - ((value - min) / range) * 120;

          return (
            <circle
              key={reading.id}
              cx={x}
              cy={y}
              r="3"
              fill={color}
              opacity="0.8"
            />
          );
        })}
      </svg>

      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500 px-2">
        <span>{data.length > 0 ? new Date(data[0].timestamp).toLocaleTimeString() : ''}</span>
        <span>{data.length > 0 ? new Date(data[data.length - 1].timestamp).toLocaleTimeString() : ''}</span>
      </div>
    </div>
  );
};
