import { Sparkles, Wind, Droplets, Coffee, Moon as MoonIcon, Dumbbell } from 'lucide-react';

interface WellnessRecommendationsProps {
  heartRate: number;
  stressLevel: number;
  temperature: number;
  spo2: number;
  isDarkMode?: boolean;
}

export const WellnessRecommendations = ({ heartRate, stressLevel, temperature, spo2, isDarkMode = true }: WellnessRecommendationsProps) => {
  const getRecommendations = () => {
    const recommendations: { icon: any; text: string; color: string; bgColor: string }[] = [];

    if (stressLevel > 50) {
      recommendations.push({
        icon: Wind,
        text: 'Try 4-7-8 breathing: Inhale for 4s, hold for 7s, exhale for 8s',
        color: 'text-cyan-400',
        bgColor: 'bg-cyan-500/10'
      });
    }

    if (heartRate > 90) {
      recommendations.push({
        icon: MoonIcon,
        text: 'Your heart rate is elevated. Consider taking a 5-minute meditation break',
        color: 'text-violet-400',
        bgColor: 'bg-violet-500/10'
      });
    }

    if (spo2 < 95) {
      recommendations.push({
        icon: Wind,
        text: 'Practice deep breathing exercises to improve oxygen saturation',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10'
      });
    }

    if (temperature > 37.5) {
      recommendations.push({
        icon: Droplets,
        text: 'Stay hydrated! Drink a glass of water to help regulate body temperature',
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10'
      });
    }

    if (stressLevel < 30 && heartRate < 80) {
      recommendations.push({
        icon: Sparkles,
        text: 'Your vitals are great! This is a good time for light exercise or stretching',
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/10'
      });
    }

    if (heartRate < 60) {
      recommendations.push({
        icon: Coffee,
        text: 'Low heart rate detected. Consider having a warm beverage if feeling sluggish',
        color: 'text-orange-400',
        bgColor: 'bg-orange-500/10'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        icon: Dumbbell,
        text: 'All vitals normal! Consider maintaining activity with regular movement',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10'
      });
    }

    return recommendations.slice(0, 3);
  };

  const recommendations = getRecommendations();

  return (
    <div className={`rounded-2xl border backdrop-blur-sm p-6 transition-all duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50'
        : 'bg-gradient-to-br from-white/90 to-slate-50/90 border-slate-200/80'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/30'
            : 'bg-gradient-to-br from-amber-100 to-orange-100 border-amber-300'
        }`}>
          <Sparkles className={`w-5 h-5 transition-colors duration-500 ${
            isDarkMode ? 'text-amber-400' : 'text-amber-600'
          }`} />
        </div>
        <div>
          <h3 className={`text-lg font-bold transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>Wellness Tips</h3>
          <p className={`text-xs transition-colors duration-500 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>Personalized recommendations</p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] ${
                isDarkMode
                  ? `border-slate-700/30 ${rec.bgColor}`
                  : 'border-slate-200/50 bg-white/70'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  isDarkMode ? rec.bgColor : 'bg-slate-100'
                }`}>
                  <Icon className={`w-4 h-4 ${rec.color}`} />
                </div>
                <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>{rec.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
