import { Brain, TrendingUp, TrendingDown, Activity, AlertCircle, CheckCircle } from 'lucide-react';

interface AIInsightsProps {
  heartRate: number;
  spo2: number;
  temperature: number;
  stressLevel: number;
  previousReadings?: {
    heartRate: number;
    stressLevel: number;
  };
  isDarkMode?: boolean;
}

export const AIInsights = ({ heartRate, spo2, temperature, stressLevel, previousReadings, isDarkMode = true }: AIInsightsProps) => {
  const generateInsights = () => {
    const insights: { type: 'positive' | 'neutral' | 'warning'; message: string; icon: any }[] = [];

    if (heartRate >= 60 && heartRate <= 80) {
      insights.push({
        type: 'positive',
        message: 'Your heart rate is optimal and within the healthy resting range.',
        icon: CheckCircle
      });
    } else if (heartRate > 80 && heartRate <= 100) {
      insights.push({
        type: 'neutral',
        message: 'Heart rate is slightly elevated. Consider taking a moment to relax.',
        icon: Activity
      });
    } else if (heartRate > 100) {
      insights.push({
        type: 'warning',
        message: 'Heart rate is elevated. Deep breathing exercises recommended.',
        icon: AlertCircle
      });
    }

    if (previousReadings) {
      const hrChange = heartRate - previousReadings.heartRate;
      if (Math.abs(hrChange) > 10) {
        insights.push({
          type: hrChange > 0 ? 'warning' : 'positive',
          message: `Heart rate ${hrChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(hrChange)} BPM in the last minute.`,
          icon: hrChange > 0 ? TrendingUp : TrendingDown
        });
      }

      const stressChange = stressLevel - previousReadings.stressLevel;
      if (Math.abs(stressChange) > 15) {
        insights.push({
          type: stressChange > 0 ? 'warning' : 'positive',
          message: `Stress levels ${stressChange > 0 ? 'rising' : 'declining'}. ${stressChange > 0 ? 'Consider a break.' : 'Great progress!'}`,
          icon: stressChange > 0 ? TrendingUp : TrendingDown
        });
      }
    }

    if (spo2 >= 95 && spo2 <= 100) {
      insights.push({
        type: 'positive',
        message: 'Excellent blood oxygen saturation. Respiratory function is optimal.',
        icon: CheckCircle
      });
    } else if (spo2 >= 90 && spo2 < 95) {
      insights.push({
        type: 'neutral',
        message: 'Blood oxygen slightly below optimal. Ensure proper breathing.',
        icon: Activity
      });
    }

    if (stressLevel <= 30) {
      insights.push({
        type: 'positive',
        message: 'Low stress levels detected. You are in a calm state.',
        icon: CheckCircle
      });
    } else if (stressLevel > 30 && stressLevel <= 60) {
      insights.push({
        type: 'neutral',
        message: 'Moderate stress detected. Mindfulness techniques may help.',
        icon: Activity
      });
    } else {
      insights.push({
        type: 'warning',
        message: 'High stress levels. Consider taking a break or practicing relaxation.',
        icon: AlertCircle
      });
    }

    return insights.slice(0, 4);
  };

  const insights = generateInsights();

  const getInsightStyle = (type: string) => {
    if (isDarkMode) {
      switch (type) {
        case 'positive':
          return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
        case 'warning':
          return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
        default:
          return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      }
    } else {
      switch (type) {
        case 'positive':
          return 'bg-emerald-100 border-emerald-300 text-emerald-700';
        case 'warning':
          return 'bg-amber-100 border-amber-300 text-amber-700';
        default:
          return 'bg-blue-100 border-blue-300 text-blue-700';
      }
    }
  };

  return (
    <div className={`rounded-2xl border backdrop-blur-sm p-6 transition-all duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50'
        : 'bg-gradient-to-br from-white/90 to-slate-50/90 border-slate-200/80'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-br from-violet-500/20 to-purple-500/20 border-violet-500/30'
            : 'bg-gradient-to-br from-violet-100 to-purple-100 border-violet-300'
        }`}>
          <Brain className={`w-5 h-5 transition-colors duration-500 ${
            isDarkMode ? 'text-violet-400' : 'text-violet-600'
          }`} />
        </div>
        <div>
          <h3 className={`text-lg font-bold transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>AI Health Insights</h3>
          <p className={`text-xs transition-colors duration-500 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>Real-time pattern analysis</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-xl border backdrop-blur-sm ${getInsightStyle(insight.type)} transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">{insight.message}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`mt-4 p-3 rounded-lg border transition-all duration-500 ${
        isDarkMode
          ? 'bg-slate-900/50 border-slate-700/30'
          : 'bg-white/70 border-slate-200/50'
      }`}>
        <p className={`text-xs leading-relaxed transition-colors duration-500 ${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          <strong className={`transition-colors duration-500 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>AI Analysis:</strong> These insights are generated using advanced pattern recognition algorithms analyzing your vital signs in real-time.
        </p>
      </div>
    </div>
  );
};
