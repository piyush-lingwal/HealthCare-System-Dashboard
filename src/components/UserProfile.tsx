import { User, Calendar } from 'lucide-react';
import { UserProfile as UserProfileType } from '../lib/supabase';

interface UserProfileProps {
  profile: UserProfileType | null;
}

export const UserProfile = ({ profile }: UserProfileProps) => {
  if (!profile) return null;

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold text-white mb-1">{profile.name}</h2>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Calendar className="w-4 h-4" />
            <span>{profile.age} years old</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">Baseline HR</div>
              <div className="text-lg font-semibold text-white">{profile.baseline_hr}</div>
              <div className="text-xs text-slate-400">BPM</div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">Baseline SpO2</div>
              <div className="text-lg font-semibold text-white">{profile.baseline_spo2}</div>
              <div className="text-xs text-slate-400">%</div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">Baseline Temp</div>
              <div className="text-lg font-semibold text-white">{profile.baseline_temp}</div>
              <div className="text-xs text-slate-400">°C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
