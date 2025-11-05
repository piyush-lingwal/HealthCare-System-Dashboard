import { Award, Heart, TrendingDown, Zap, Shield, Star } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  earned: boolean;
  color: string;
  bgColor: string;
}

interface AchievementBadgesProps {
  heartRate: number;
  stressLevel: number;
  readingsCount: number;
  isDarkMode?: boolean;
}

export const AchievementBadges = ({ heartRate, stressLevel, readingsCount, isDarkMode = true }: AchievementBadgesProps) => {
  const achievements: Achievement[] = [
    {
      id: 'calm_day',
      name: 'Calm Day',
      description: 'Maintained low stress for extended period',
      icon: Shield,
      earned: stressLevel < 30,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    },
    {
      id: 'stable_heart',
      name: 'Stable Heart',
      description: 'Heart rate in optimal range',
      icon: Heart,
      earned: heartRate >= 60 && heartRate <= 80,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      id: 'stress_warrior',
      name: 'Stress Warrior',
      description: 'Successfully lowered stress levels',
      icon: TrendingDown,
      earned: stressLevel < 40,
      color: 'text-violet-400',
      bgColor: 'bg-violet-500/20'
    },
    {
      id: 'early_bird',
      name: 'Data Champion',
      description: 'Collected 50+ health readings',
      icon: Star,
      earned: readingsCount >= 50,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20'
    },
    {
      id: 'zen_master',
      name: 'Zen Master',
      description: 'Perfect vital signs balance',
      icon: Zap,
      earned: heartRate >= 60 && heartRate <= 80 && stressLevel < 30,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/20'
    },
    {
      id: 'health_guardian',
      name: 'Health Guardian',
      description: 'Consistent monitoring streak',
      icon: Award,
      earned: readingsCount >= 100,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <div className={`rounded-2xl border backdrop-blur-sm p-6 transition-all duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50'
        : 'bg-gradient-to-br from-white/90 to-slate-50/90 border-slate-200/80'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/30'
            : 'bg-gradient-to-br from-amber-100 to-yellow-100 border-amber-300'
        }`}>
          <Award className={`w-5 h-5 transition-colors duration-500 ${
            isDarkMode ? 'text-amber-400' : 'text-amber-600'
          }`} />
        </div>
        <div>
          <h3 className={`text-lg font-bold transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>Achievements</h3>
          <p className={`text-xs transition-colors duration-500 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {earnedAchievements.length} of {achievements.length} earned
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`p-3 rounded-xl border transition-all ${
                achievement.earned
                  ? `${achievement.bgColor} border-${achievement.color.replace('text-', '')}/30 hover:scale-105`
                  : 'bg-slate-900/30 border-slate-700/30 opacity-40'
              }`}
            >
              <div className="text-center">
                <div
                  className={`w-12 h-12 mx-auto mb-2 rounded-xl ${
                    achievement.earned ? achievement.bgColor : 'bg-slate-800/50'
                  } flex items-center justify-center border ${
                    achievement.earned
                      ? `border-${achievement.color.replace('text-', '')}/30`
                      : 'border-slate-700/30'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      achievement.earned ? achievement.color : 'text-slate-600'
                    }`}
                  />
                </div>
                <div
                  className={`text-xs font-bold mb-1 ${
                    achievement.earned ? 'text-white' : 'text-slate-600'
                  }`}
                >
                  {achievement.name}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  {achievement.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {earnedAchievements.length > 0 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-lg border border-amber-500/20">
          <p className="text-xs text-amber-400 text-center">
            🎉 Great job! You've unlocked {earnedAchievements.length} achievement{earnedAchievements.length > 1 ? 's' : ''}!
          </p>
        </div>
      )}
    </div>
  );
};
