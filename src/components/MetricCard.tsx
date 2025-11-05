import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  status: 'normal' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
  subtitle?: string;
  isDarkMode?: boolean;
}

export const MetricCard = ({
  title,
  value,
  unit,
  icon: Icon,
  status,
  trend,
  subtitle,
  isDarkMode = true
}: MetricCardProps) => {
  const statusColors = isDarkMode ? {
    normal: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40',
    warning: 'from-amber-500/20 to-orange-500/20 border-amber-500/40',
    critical: 'from-red-500/20 to-rose-500/20 border-red-500/40',
  } : {
    normal: 'from-emerald-100 to-teal-100 border-emerald-300',
    warning: 'from-amber-100 to-orange-100 border-amber-300',
    critical: 'from-red-100 to-rose-100 border-red-300',
  };

  const iconColors = isDarkMode ? {
    normal: 'text-emerald-400',
    warning: 'text-amber-400',
    critical: 'text-red-400',
  } : {
    normal: 'text-emerald-600',
    warning: 'text-amber-600',
    critical: 'text-red-600',
  };

  const pulseColors = {
    normal: 'bg-emerald-400',
    warning: 'bg-amber-400',
    critical: 'bg-red-400',
  };

  const glowColors = {
    normal: 'shadow-emerald-500/20',
    warning: 'shadow-amber-500/20',
    critical: 'shadow-red-500/20',
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${statusColors[status]} border backdrop-blur-xl transition-all duration-500 hover:scale-[1.03] shadow-xl ${glowColors[status]} hover:shadow-2xl`}>
      <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${
        isDarkMode ? 'from-white/5 to-transparent' : 'from-white/30 to-transparent'
      }`} />

      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <Icon className="w-full h-full" />
      </div>

      <div className="absolute top-2 right-2">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${statusColors[status]} opacity-30 blur-2xl animate-pulse`} />
      </div>

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl transition-colors duration-500 ${
              isDarkMode ? 'bg-slate-900/50' : 'bg-white/80'
            } ${iconColors[status]}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-sm font-medium transition-colors duration-500 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-700'
              }`}>{title}</h3>
              {subtitle && (
                <p className={`text-xs mt-0.5 transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-500' : 'text-slate-600'
                }`}>{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${pulseColors[status]} animate-pulse`} />
            <span className={`text-xs uppercase tracking-wider transition-colors duration-500 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-600'
            }`}>{status}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>{value}</span>
          <span className={`text-lg transition-colors duration-500 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>{unit}</span>
        </div>

        {trend && (
          <div className="mt-3 flex items-center gap-2">
            <div className={`flex items-center gap-1 text-xs ${
              trend === 'up' ? 'text-emerald-400' :
              trend === 'down' ? 'text-red-400' :
              'text-slate-400'
            }`}>
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {trend === 'stable' && '→'}
              <span>{trend === 'stable' ? 'Stable' : trend === 'up' ? 'Increasing' : 'Decreasing'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
