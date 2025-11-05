import { Smile, Meh, Frown, Zap, Heart } from 'lucide-react';

interface EmotionStatusProps {
  heartRate: number;
  stressLevel: number;
  isDarkMode?: boolean;
}

export const EmotionStatus = ({ heartRate, stressLevel, isDarkMode = true }: EmotionStatusProps) => {
  const getEmotionData = () => {
    if (stressLevel < 30 && heartRate >= 60 && heartRate <= 80) {
      return {
        emotion: 'Calm',
        icon: Smile,
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/20',
        borderColor: 'border-emerald-500/50',
        glowColor: 'shadow-emerald-500/30',
        description: 'You are in a relaxed and peaceful state',
        emoji: '😌'
      };
    }

    if (stressLevel > 60 || heartRate > 100) {
      return {
        emotion: 'Stressed',
        icon: Frown,
        color: 'text-red-400',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500/50',
        glowColor: 'shadow-red-500/30',
        description: 'Elevated stress indicators detected',
        emoji: '😰'
      };
    }

    if (heartRate > 80 && heartRate <= 100 && stressLevel < 60) {
      return {
        emotion: 'Excited',
        icon: Zap,
        color: 'text-amber-400',
        bgColor: 'bg-amber-500/20',
        borderColor: 'border-amber-500/50',
        glowColor: 'shadow-amber-500/30',
        description: 'Elevated heart rate with low stress',
        emoji: '🤗'
      };
    }

    if (stressLevel >= 30 && stressLevel <= 50) {
      return {
        emotion: 'Focused',
        icon: Meh,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/20',
        borderColor: 'border-blue-500/50',
        glowColor: 'shadow-blue-500/30',
        description: 'Moderate alertness, good for productivity',
        emoji: '🧐'
      };
    }

    return {
      emotion: 'Neutral',
      icon: Heart,
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/20',
      borderColor: 'border-violet-500/50',
      glowColor: 'shadow-violet-500/30',
      description: 'Balanced emotional state',
      emoji: '😊'
    };
  };

  const emotionData = getEmotionData();
  const Icon = emotionData.icon;

  return (
    <div className={`rounded-2xl border backdrop-blur-sm p-6 shadow-lg transition-all duration-500 ${emotionData.borderColor} ${emotionData.glowColor} ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50'
        : 'bg-gradient-to-br from-white/90 to-slate-50/90'
    }`}>
      <div className="text-center">
        <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl ${emotionData.bgColor} border ${emotionData.borderColor} flex items-center justify-center animate-pulse`}>
          <Icon className={`w-10 h-10 ${emotionData.color}`} />
        </div>

        <div className="text-5xl mb-2">{emotionData.emoji}</div>

        <h3 className={`text-2xl font-bold mb-2 ${emotionData.color}`}>
          {emotionData.emotion}
        </h3>

        <p className="text-sm text-slate-400 mb-4">
          {emotionData.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className={`rounded-lg p-2 border transition-all duration-500 ${
            isDarkMode
              ? 'bg-slate-900/50 border-slate-700/30'
              : 'bg-white/70 border-slate-200/50'
          }`}>
            <div className={`transition-colors duration-500 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-600'
            }`}>Heart Rate</div>
            <div className={`font-bold transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>{heartRate} BPM</div>
          </div>
          <div className={`rounded-lg p-2 border transition-all duration-500 ${
            isDarkMode
              ? 'bg-slate-900/50 border-slate-700/30'
              : 'bg-white/70 border-slate-200/50'
          }`}>
            <div className={`transition-colors duration-500 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-600'
            }`}>Stress</div>
            <div className={`font-bold transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>{stressLevel}/100</div>
          </div>
        </div>
      </div>
    </div>
  );
};
