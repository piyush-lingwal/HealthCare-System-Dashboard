import { AlertTriangle, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Anomaly {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

interface AnomalyDetectorProps {
  heartRate: number;
  spo2: number;
  temperature: number;
  stressLevel: number;
  gsrValue: number;
  isMonitoring: boolean;
  isDarkMode?: boolean;
}

export const AnomalyDetector = ({
  heartRate,
  spo2,
  temperature,
  stressLevel,
  gsrValue,
  isMonitoring,
  isDarkMode = true
}: AnomalyDetectorProps) => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [previousValues, setPreviousValues] = useState({ heartRate, stressLevel, gsrValue });

  useEffect(() => {
    if (!isMonitoring) return;

    const newAnomalies: Anomaly[] = [];

    if (heartRate > 100) {
      newAnomalies.push({
        id: `hr-${Date.now()}`,
        type: 'warning',
        title: 'High Heart Rate',
        message: `Heart rate is elevated at ${heartRate} BPM. Consider resting.`,
        timestamp: new Date()
      });
    }

    if (heartRate < 50 && heartRate > 0) {
      newAnomalies.push({
        id: `hr-low-${Date.now()}`,
        type: 'warning',
        title: 'Low Heart Rate',
        message: `Heart rate is below normal at ${heartRate} BPM.`,
        timestamp: new Date()
      });
    }

    if (spo2 < 90) {
      newAnomalies.push({
        id: `spo2-${Date.now()}`,
        type: 'critical',
        title: 'Critical SpO2 Level',
        message: `Blood oxygen is critically low at ${spo2}%. Seek immediate attention.`,
        timestamp: new Date()
      });
    } else if (spo2 < 95) {
      newAnomalies.push({
        id: `spo2-low-${Date.now()}`,
        type: 'warning',
        title: 'Low SpO2 Level',
        message: `Blood oxygen is below optimal at ${spo2}%. Practice deep breathing.`,
        timestamp: new Date()
      });
    }

    if (temperature > 38.5) {
      newAnomalies.push({
        id: `temp-${Date.now()}`,
        type: 'critical',
        title: 'High Temperature',
        message: `Body temperature is elevated at ${temperature}°C. Monitor closely.`,
        timestamp: new Date()
      });
    } else if (temperature < 35.5 || temperature > 37.5) {
      newAnomalies.push({
        id: `temp-abnormal-${Date.now()}`,
        type: 'warning',
        title: 'Temperature Variation',
        message: `Body temperature is ${temperature}°C, outside normal range.`,
        timestamp: new Date()
      });
    }

    const stressDelta = Math.abs(stressLevel - previousValues.stressLevel);
    if (stressDelta > 20) {
      newAnomalies.push({
        id: `stress-spike-${Date.now()}`,
        type: 'warning',
        title: 'Stress Event Detected',
        message: `Sudden ${stressLevel > previousValues.stressLevel ? 'increase' : 'decrease'} in stress levels detected.`,
        timestamp: new Date()
      });
    }

    const gsrDelta = Math.abs(gsrValue - previousValues.gsrValue);
    if (gsrDelta > 30) {
      newAnomalies.push({
        id: `gsr-spike-${Date.now()}`,
        type: 'info',
        title: 'GSR Spike Detected',
        message: 'Sudden change in galvanic skin response. Possible emotional response.',
        timestamp: new Date()
      });
    }

    if (newAnomalies.length > 0) {
      setAnomalies(prev => {
        const combined = [...newAnomalies, ...prev];
        return combined.slice(0, 5);
      });

      if (newAnomalies.some(a => a.type === 'critical' || a.type === 'warning')) {
        try {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYHGGm98OihUhELTKXh8bllHgU2jdXzzn0vBSh+zPLaizsKE12z6OyrWBMJRp/h8r1vIAUrhc/y2oo4aBhlv/Hpo1QRCkyl4vG7aB8EMIzT8tGANAYnfsz');
          audio.volume = 0.3;
          audio.play().catch(() => {});
        } catch (e) {}
      }
    }

    setPreviousValues({ heartRate, stressLevel, gsrValue });
  }, [heartRate, spo2, temperature, stressLevel, gsrValue, isMonitoring]);

  const removeAnomaly = (id: string) => {
    setAnomalies(prev => prev.filter(a => a.id !== id));
  };

  if (anomalies.length === 0) return null;

  return (
    <div className="fixed top-24 right-6 z-50 space-y-3 max-w-sm">
      {anomalies.map(anomaly => {
        const config = {
          critical: {
            icon: AlertTriangle,
            bgColor: 'bg-red-500/20',
            borderColor: 'border-red-500/50',
            textColor: 'text-red-400',
            iconBg: 'bg-red-500/30'
          },
          warning: {
            icon: AlertCircle,
            bgColor: 'bg-amber-500/20',
            borderColor: 'border-amber-500/50',
            textColor: 'text-amber-400',
            iconBg: 'bg-amber-500/30'
          },
          info: {
            icon: CheckCircle,
            bgColor: 'bg-blue-500/20',
            borderColor: 'border-blue-500/50',
            textColor: 'text-blue-400',
            iconBg: 'bg-blue-500/30'
          }
        }[anomaly.type];

        const Icon = config.icon;

        return (
          <div
            key={anomaly.id}
            className={`backdrop-blur-md border rounded-xl p-4 shadow-xl animate-[slideIn_0.3s_ease-out] transition-all duration-500 ${config.borderColor} ${
              isDarkMode ? config.bgColor : 'bg-white/95'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 ${config.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${config.textColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className={`text-sm font-bold ${config.textColor}`}>
                    {anomaly.title}
                  </h4>
                  <button
                    onClick={() => removeAnomaly(anomaly.id)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {anomaly.message}
                </p>
                <p className="text-[10px] text-slate-500 mt-2">
                  {anomaly.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
