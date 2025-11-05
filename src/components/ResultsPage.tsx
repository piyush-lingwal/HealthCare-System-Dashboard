import { Heart, Activity, Brain, Thermometer, Download, Database, Trophy, TrendingUp, Clock, CheckCircle2, Target, Zap } from 'lucide-react';
import { HealthScore } from './HealthScore';
import { AchievementBadges } from './AchievementBadges';
import { StatCard } from './StatCard';
import type { HealthReading } from '../hooks/useHealthData';

interface ResultsPageProps {
  readings: HealthReading[];
  healthScore: number;
  sessionDuration: number;
  averages: {
    avgHR: number;
    avgSpO2: number;
    avgTemp: string;
    avgStress: number;
  };
  onDownloadReport: () => void;
  onDownloadCSV: () => void;
  onNewSession: () => void;
  isDarkMode: boolean;
}

export const ResultsPage = ({
  readings,
  healthScore,
  sessionDuration,
  averages,
  onDownloadReport,
  onDownloadCSV,
  onNewSession,
  isDarkMode
}: ResultsPageProps) => {
  const latestReading = readings[0];

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-500 ${
      isDarkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
            : 'bg-gradient-to-br from-white via-blue-50 to-slate-100'
        }`}></div>

        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full transition-colors duration-500 ${
                isDarkMode ? 'bg-emerald-400/20' : 'bg-emerald-500/30'
              }`}
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
        <div className="text-center mb-12 animate-[fadeIn_0.8s_ease-out]">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mb-6 animate-[bounce_1s_ease-in-out]">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>

          <h1 className={`text-5xl md:text-6xl font-black mb-4 transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Monitoring Session Complete
          </h1>

          <p className={`text-xl transition-colors duration-500 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Your health data has been analyzed and is ready for review
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-500 ${
              isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/70 border-slate-200/50'
            }`}>
              <Clock className="w-5 h-5 text-emerald-400" />
              <span className={`text-sm font-semibold transition-colors duration-500 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>Session Duration: {formatDuration(sessionDuration)}</span>
            </div>

            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-500 ${
              isDarkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white/70 border-slate-200/50'
            }`}>
              <Database className="w-5 h-5 text-cyan-400" />
              <span className={`text-sm font-semibold transition-colors duration-500 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>{readings.length} Data Points</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <HealthScore score={healthScore} trend="stable" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Avg Heart Rate"
            value={averages.avgHR}
            subtitle="Session average"
            icon={Heart}
            color="text-red-400"
            bgColor="bg-red-500/10"
          />
          <StatCard
            title="Avg SpO2"
            value={`${averages.avgSpO2}%`}
            subtitle="Session average"
            icon={Activity}
            color="text-emerald-400"
            bgColor="bg-emerald-500/10"
          />
          <StatCard
            title="Avg Temp"
            value={`${averages.avgTemp}°C`}
            subtitle="Session average"
            icon={Thermometer}
            color="text-amber-400"
            bgColor="bg-amber-500/10"
          />
          <StatCard
            title="Avg Stress"
            value={averages.avgStress}
            subtitle="Session average"
            icon={Brain}
            color="text-violet-400"
            bgColor="bg-violet-500/10"
          />
        </div>

        <div className="mb-8">
          <AchievementBadges
            heartRate={latestReading?.heart_rate || 0}
            stressLevel={latestReading?.stress_level || 0}
            readingsCount={readings.length}
            isDarkMode={isDarkMode}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`p-8 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
            isDarkMode
              ? 'bg-slate-800/50 border-slate-700/50'
              : 'bg-white/70 border-slate-200/50'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold transition-colors duration-500 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Download Health Report</h3>
                <p className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>Complete analysis in HTML format</p>
              </div>
            </div>
            <button
              onClick={onDownloadReport}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 font-semibold"
            >
              <Download className="w-5 h-5" />
              <span>Download Report</span>
            </button>
          </div>

          <div className={`p-8 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
            isDarkMode
              ? 'bg-slate-800/50 border-slate-700/50'
              : 'bg-white/70 border-slate-200/50'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`text-lg font-semibold transition-colors duration-500 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>Export to CSV</h3>
                <p className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>Raw data for further analysis</p>
              </div>
            </div>
            <button
              onClick={onDownloadCSV}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-violet-500/20 transition-all hover:scale-105 font-semibold"
            >
              <Database className="w-5 h-5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onNewSession}
            className={`inline-flex items-center gap-3 px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl ${
              isDarkMode
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-400/40'
            }`}
          >
            <Zap className="w-6 h-6" />
            <span>Start New Session</span>
          </button>

          <p className={`mt-4 text-sm transition-colors duration-500 ${
            isDarkMode ? 'text-slate-500' : 'text-slate-600'
          }`}>
            Begin a new monitoring session to track your health metrics
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};
