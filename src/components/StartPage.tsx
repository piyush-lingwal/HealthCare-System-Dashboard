import { Activity, Heart, Brain, Zap, Cpu, Waves, Shield, Sparkles, ChevronRight, Power } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StartPageProps {
  onStart: () => void;
  isDarkMode: boolean;
}

export const StartPage = ({ onStart, isDarkMode }: StartPageProps) => {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(featureInterval);
  }, []);

  const features = [
    { icon: Cpu, label: 'AI-Powered Analysis', color: 'from-cyan-500 to-blue-500', glow: 'shadow-cyan-500/50' },
    { icon: Waves, label: 'Real-time Monitoring', color: 'from-violet-500 to-purple-500', glow: 'shadow-violet-500/50' },
    { icon: Shield, label: 'Medical Grade Sensors', color: 'from-emerald-500 to-teal-500', glow: 'shadow-emerald-500/50' },
    { icon: Sparkles, label: 'Predictive Analytics', color: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/50' }
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-all duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
            : 'bg-gradient-to-br from-white via-blue-50 to-slate-100'
        }`}></div>

        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full transition-colors duration-500 ${
                isDarkMode ? 'bg-cyan-400/20' : 'bg-cyan-500/30'
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

        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full blur-3xl transition-all duration-500 ${
                isDarkMode ? 'bg-cyan-500/10' : 'bg-cyan-300/20'
              }`}
              style={{
                width: '600px',
                height: '600px',
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12 animate-[fadeIn_0.8s_ease-out]">
            <div className="relative inline-block mb-8">
              <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${
                isDarkMode ? 'bg-gradient-to-r from-cyan-500/30 to-violet-500/30' : 'bg-gradient-to-r from-cyan-400/40 to-violet-400/40'
              }`}></div>

              <div className="relative">
                <div className={`w-40 h-40 mx-auto rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden transition-all duration-500 ${
                  isDarkMode
                    ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-cyan-500/30'
                    : 'bg-gradient-to-br from-white/90 to-slate-100/90 border-2 border-cyan-400/40'
                }`}>
                  <img
                    src="/doctor_6093321.png"
                    alt="Health Robot"
                    className="w-32 h-32 object-contain relative z-10"
                  />

                  <div className={`absolute inset-0 ${
                    isDarkMode ? 'bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent' : 'bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent'
                  }`}
                    style={{
                      animation: 'scanDown 2s ease-in-out infinite',
                    }}
                  />
                  <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-3xl animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h1 className={`text-6xl md:text-7xl font-black transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-blue-500 bg-clip-text text-transparent animate-[gradientShift_3s_ease-in-out_infinite]">
                  Next-Gen
                </span>
                <br />
                Health Monitoring
              </h1>

              <p className={`text-xl md:text-2xl font-light transition-colors duration-500 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                AI-Powered Physiological Robot Dashboard
              </p>

              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className={`text-sm transition-colors duration-500 ${
                    isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>All Systems Online</span>
                </div>
                <span className={`mx-2 transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-600' : 'text-slate-400'
                }`}>•</span>
                <span className={`text-sm transition-colors duration-500 ${
                  isDarkMode ? 'text-slate-500' : 'text-slate-600'
                }`}>v2.0.1</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeFeature === index;

                return (
                  <div
                    key={index}
                    className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
                      isDarkMode
                        ? 'bg-slate-800/50 border-slate-700/50'
                        : 'bg-white/70 border-slate-200/50'
                    } ${isActive ? `scale-105 shadow-xl ${feature.glow}` : 'scale-100'}`}
                  >
                    <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg ${isActive ? 'animate-pulse' : ''}`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <p className={`text-sm font-medium transition-colors duration-500 ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>{feature.label}</p>

                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50 animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={onStart}
              className={`group relative inline-flex items-center gap-3 px-10 py-5 text-xl font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-2xl ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white shadow-cyan-500/30'
                  : 'bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-cyan-400/40'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <Activity className="w-7 h-7 animate-pulse" />
              <span>Start Monitoring</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className={`mt-6 text-sm transition-colors duration-500 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-600'
            }`}>
              Click to begin real-time physiological data collection with AI-powered insights
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              { icon: Heart, label: 'ECG', value: 'MAX30100', color: 'text-red-400' },
              { icon: Activity, label: 'SpO2', value: 'Oxygen Sat.', color: 'text-emerald-400' },
              { icon: Brain, label: 'GSR', value: 'Stress Monitor', color: 'text-violet-400' },
              { icon: Zap, label: 'Temp', value: 'MLX90614', color: 'text-amber-400' }
            ].map((sensor, index) => {
              const Icon = sensor.icon;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border backdrop-blur-sm transition-all duration-500 ${
                    isDarkMode
                      ? 'bg-slate-900/50 border-slate-700/30'
                      : 'bg-white/60 border-slate-200/50'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className={`w-8 h-8 ${sensor.color} mb-2`} />
                  <div className={`text-sm font-bold mb-1 transition-colors duration-500 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>{sensor.label}</div>
                  <div className={`text-xs transition-colors duration-500 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>{sensor.value}</div>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-emerald-400">Ready</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes scanDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};
