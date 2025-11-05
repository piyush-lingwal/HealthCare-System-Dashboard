import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

export const StatCard = ({ title, value, subtitle, icon: Icon, color, bgColor }: StatCardProps) => {
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 backdrop-blur-sm p-5 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm font-medium text-slate-300 mb-1">{title}</div>
      <div className="text-xs text-slate-500">{subtitle}</div>
    </div>
  );
};
