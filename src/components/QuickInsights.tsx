import { Lightbulb, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface InsightItemProps {
  type: 'success' | 'warning' | 'info';
  message: string;
}

const InsightItem = ({ type, message }: InsightItemProps) => {
  const config = {
    success: {
      icon: CheckCircle,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
    },
    info: {
      icon: Info,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
    },
  };

  const { icon: Icon, color, bg, border } = config[type];

  return (
    <div className={`${bg} ${border} border rounded-lg p-4 flex items-start gap-3`}>
      <Icon className={`w-5 h-5 ${color} flex-shrink-0 mt-0.5`} />
      <p className="text-sm text-slate-300 leading-relaxed">{message}</p>
    </div>
  );
};

interface QuickInsightsProps {
  heartRate: number;
  spo2: number;
  temperature: number;
  stressLevel: number;
}

export const QuickInsights = ({ heartRate, spo2, temperature, stressLevel }: QuickInsightsProps) => {
  const insights: InsightItemProps[] = [];

  if (heartRate >= 60 && heartRate <= 100) {
    insights.push({
      type: 'success',
      message: 'Your heart rate is within the healthy range. Your cardiovascular system is functioning optimally.',
    });
  } else {
    insights.push({
      type: 'warning',
      message: 'Heart rate is outside the normal range. Consider taking a break and practicing deep breathing exercises.',
    });
  }

  if (spo2 >= 95) {
    insights.push({
      type: 'success',
      message: 'Blood oxygen levels are excellent. Your lungs are efficiently oxygenating your blood.',
    });
  } else {
    insights.push({
      type: 'warning',
      message: 'Blood oxygen saturation is below optimal levels. Ensure you are breathing deeply and regularly.',
    });
  }

  if (temperature >= 36.0 && temperature <= 37.5) {
    insights.push({
      type: 'success',
      message: 'Body temperature is stable and within normal range. No concerns detected.',
    });
  } else {
    insights.push({
      type: 'warning',
      message: 'Body temperature is outside normal range. Monitor closely and stay hydrated.',
    });
  }

  if (stressLevel <= 40) {
    insights.push({
      type: 'success',
      message: 'Stress levels are low. You are maintaining good emotional balance and relaxation.',
    });
  } else if (stressLevel <= 60) {
    insights.push({
      type: 'info',
      message: 'Moderate stress detected. Consider taking short breaks and practicing mindfulness techniques.',
    });
  } else {
    insights.push({
      type: 'warning',
      message: 'Elevated stress levels detected. Try relaxation techniques like meditation, yoga, or a short walk.',
    });
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">Quick Health Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <InsightItem key={index} {...insight} />
        ))}
      </div>

      <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
        <p className="text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Note:</strong> These insights are based on real-time sensor data and general health guidelines.
          Always consult with healthcare professionals for personalized medical advice.
        </p>
      </div>
    </div>
  );
};
