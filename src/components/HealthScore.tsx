import { TrendingUp, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HealthScoreProps {
  score: number;
  trend: 'up' | 'down' | 'stable';
}

export const HealthScore = ({ score, trend }: HealthScoreProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = score / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [score]);

  const getScoreColor = () => {
    if (score >= 80) return 'from-emerald-500 to-teal-500';
    if (score >= 60) return 'from-blue-500 to-cyan-500';
    if (score >= 40) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  const getScoreLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Attention';
  };

  const getScoreTextColor = () => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-amber-400';
    return 'text-red-400';
  };

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Overall Health Score</h3>
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            trend === 'up' ? 'text-emerald-400' :
            trend === 'down' ? 'text-red-400' :
            'text-slate-400'
          }`}>
            <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
            <span>{trend === 'up' ? '+2%' : trend === 'down' ? '-1%' : '0%'}</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative">
            <svg className="transform -rotate-90 w-40 h-40">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-slate-700/50"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className={`${getScoreColor().split(' ')[0]}`} stopOpacity="1" />
                  <stop offset="100%" className={`${getScoreColor().split(' ')[2]}`} stopOpacity="1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-5xl font-bold ${getScoreTextColor()}`}>
                  {displayScore}
                </div>
                <div className="text-slate-400 text-sm">out of 100</div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className={`text-2xl font-bold mb-2 ${getScoreTextColor()}`}>
              {getScoreLabel()}
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {score >= 80 && "Your health metrics are in excellent condition. Keep up the great work with your healthy lifestyle!"}
              {score >= 60 && score < 80 && "Your health indicators are good overall. Consider minor improvements in stress management."}
              {score >= 40 && score < 60 && "Some health metrics need attention. Focus on regular monitoring and healthy habits."}
              {score < 40 && "Several health indicators require attention. Please consult with a healthcare professional."}
            </p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Cardiovascular</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${Math.min(100, score + 5)}%` }}></div>
                  </div>
                  <span className="text-white font-medium w-8">{Math.min(100, score + 5)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Respiratory</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${Math.min(100, score + 2)}%` }}></div>
                  </div>
                  <span className="text-white font-medium w-8">{Math.min(100, score + 2)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Stress Management</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500" style={{ width: `${Math.max(60, score - 10)}%` }}></div>
                  </div>
                  <span className="text-white font-medium w-8">{Math.max(60, score - 10)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
