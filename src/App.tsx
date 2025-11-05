import { Activity, Heart, Thermometer, Brain, Zap, Bell, Download, FileText, Database, TrendingUp, Clock, Play, Square, Timer } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useHealthData } from './hooks/useHealthData';
import { MetricCard } from './components/MetricCard';
import { WaveChart } from './components/WaveChart';
import { LiveWaveform } from './components/LiveWaveform';
import { HistoricalChart } from './components/HistoricalChart';
import { AlertPanel } from './components/AlertPanel';
import { UserProfile } from './components/UserProfile';
import { AnimatedBackground } from './components/AnimatedBackground';
import { HealthScore } from './components/HealthScore';
import { StatCard } from './components/StatCard';
import { QuickInsights } from './components/QuickInsights';
import { TopNavigation } from './components/TopNavigation';
import { PulsingHeart } from './components/PulsingHeart';
import { AIInsights } from './components/AIInsights';
import { WellnessRecommendations } from './components/WellnessRecommendations';
import { EmotionStatus } from './components/EmotionStatus';
import { AchievementBadges } from './components/AchievementBadges';
import { AnomalyDetector } from './components/AnomalyDetector';
import { StartPage } from './components/StartPage';
import { ResultsPage } from './components/ResultsPage';
import { startDataSimulation, generateHistoricalData } from './utils/dataSimulator';
import { generateHealthReport, downloadReport, downloadCSV } from './utils/reportGenerator';

function App() {
  const userId = 'user_001';
  const { latestReading, readings, alerts, profile, loading, acknowledgeAlert } = useHealthData(userId);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [cleanupFunction, setCleanupFunction] = useState<(() => void) | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const previousReadings = useRef({ heartRate: 0, stressLevel: 0 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isMonitoring) {
      interval = setInterval(() => {
        setSessionDuration((prev) => prev + 1);
        setBatteryLevel(prev => Math.max(20, prev - 0.01));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring]);

  useEffect(() => {
    if (latestReading) {
      setLastUpdate(new Date());
      if (previousReadings.current.heartRate !== 0) {
        previousReadings.current = {
          heartRate: latestReading.heart_rate,
          stressLevel: latestReading.stress_level
        };
      } else {
        previousReadings.current = {
          heartRate: latestReading.heart_rate,
          stressLevel: latestReading.stress_level
        };
      }
    }
  }, [latestReading]);

  const startMonitoring = async () => {
    setIsMonitoring(true);
    setSessionDuration(0);

    await generateHistoricalData(userId, 10);
    const cleanup = startDataSimulation(userId);
    setCleanupFunction(() => cleanup);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    if (cleanupFunction) {
      cleanupFunction();
      setCleanupFunction(null);
    }
    setShowResults(true);
  };

  const startNewSession = () => {
    setShowResults(false);
    startMonitoring();
  };

  const calculateHealthScore = () => {
    if (!latestReading) return 75;

    let score = 100;

    if (latestReading.heart_rate < 60 || latestReading.heart_rate > 100) score -= 10;
    if (latestReading.heart_rate < 50 || latestReading.heart_rate > 110) score -= 15;

    if (latestReading.spo2 < 95) score -= 10;
    if (latestReading.spo2 < 90) score -= 20;

    if (latestReading.temperature < 36 || latestReading.temperature > 37.5) score -= 10;
    if (latestReading.temperature < 35 || latestReading.temperature > 38.5) score -= 20;

    if (latestReading.stress_level > 50) score -= 10;
    if (latestReading.stress_level > 70) score -= 15;

    return Math.max(0, Math.min(100, score));
  };

  const getHeartRateStatus = (hr: number) => {
    if (hr < 60 || hr > 100) return 'warning';
    if (hr < 50 || hr > 110) return 'critical';
    return 'normal';
  };

  const getSpo2Status = (spo2: number) => {
    if (spo2 < 95) return 'warning';
    if (spo2 < 90) return 'critical';
    return 'normal';
  };

  const getTemperatureStatus = (temp: number) => {
    if (temp < 36 || temp > 37.5) return 'warning';
    if (temp < 35 || temp > 38.5) return 'critical';
    return 'normal';
  };

  const getStressStatus = (stress: number) => {
    if (stress > 50) return 'warning';
    if (stress > 70) return 'critical';
    return 'normal';
  };

  const handleDownloadReport = () => {
    if (!profile || readings.length === 0) return;

    const healthScore = calculateHealthScore();
    const report = generateHealthReport(profile, readings, healthScore);
    const filename = `health-report-${new Date().toISOString().split('T')[0]}.html`;
    downloadReport(report, filename);
  };

  const handleDownloadCSV = () => {
    if (readings.length === 0) return;

    const filename = `health-data-${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(readings, filename);
  };

  const calculateAverages = () => {
    if (readings.length === 0) return { avgHR: 0, avgSpO2: 0, avgTemp: 0, avgStress: 0 };

    const last24h = readings.slice(0, 24);
    return {
      avgHR: Math.round(last24h.reduce((sum, r) => sum + r.heart_rate, 0) / last24h.length),
      avgSpO2: Math.round(last24h.reduce((sum, r) => sum + r.spo2, 0) / last24h.length),
      avgTemp: (last24h.reduce((sum, r) => sum + r.temperature, 0) / last24h.length).toFixed(1),
      avgStress: Math.round(last24h.reduce((sum, r) => sum + r.stress_level, 0) / last24h.length),
    };
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isDarkMode ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-slate-50 to-blue-50'
      }`}>
        <AnimatedBackground isDarkMode={isDarkMode} />
        <div className="text-center relative z-10">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mb-4"></div>
          <p className={`text-lg transition-colors duration-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Initializing Health Monitor...</p>
          <p className={`text-sm mt-2 transition-colors duration-500 ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>Loading sensor data and analytics...</p>
        </div>
      </div>
    );
  }

  if (!isMonitoring && !showResults && readings.length === 0) {
    return <StartPage onStart={startMonitoring} isDarkMode={isDarkMode} />;
  }

  const healthScore = calculateHealthScore();
  const averages = calculateAverages();

  if (showResults) {
    return (
      <ResultsPage
        readings={readings}
        healthScore={healthScore}
        sessionDuration={sessionDuration}
        averages={averages}
        onDownloadReport={handleDownloadReport}
        onDownloadCSV={handleDownloadCSV}
        onNewSession={startNewSession}
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen relative transition-colors duration-500 ${
      isDarkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-slate-50 to-blue-50'
    }`}>
      <AnimatedBackground isDarkMode={isDarkMode} />

      <TopNavigation
        isConnected={isMonitoring}
        batteryLevel={batteryLevel}
        lastUpdate={lastUpdate}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {latestReading && (
        <AnomalyDetector
          heartRate={latestReading.heart_rate}
          spo2={latestReading.spo2}
          temperature={latestReading.temperature}
          stressLevel={latestReading.stress_level}
          gsrValue={latestReading.gsr_value}
          isMonitoring={isMonitoring}
          isDarkMode={isDarkMode}
        />
      )}

      <div className="relative z-10 container mx-auto px-6 py-8 max-w-[1920px]">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden transition-all duration-500 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-2 border-cyan-500/30'
                  : 'bg-gradient-to-br from-white/90 to-slate-100/90 border-2 border-cyan-400/40'
              }`}>
                <img
                  src="/doctor_6093321.png"
                  alt="Health Robot"
                  className="w-12 h-12 object-contain relative z-10"
                />

                {isMonitoring && (
                  <>
                    <div className={`absolute inset-0 ${
                      isDarkMode ? 'bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent' : 'bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent'
                    }`}
                      style={{
                        animation: 'scanDown 2s ease-in-out infinite',
                      }}
                    />
                    <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-2xl animate-pulse"></div>
                  </>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Health Monitoring System
                </h1>
                <p className={`text-sm transition-colors duration-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Real-time physiological data dashboard with AI-powered insights</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isMonitoring ? (
                <button
                  onClick={stopMonitoring}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl shadow-lg shadow-red-500/30 transition-all hover:scale-105 font-semibold"
                >
                  <Square className="w-5 h-5" />
                  <span>Stop Monitoring</span>
                </button>
              ) : (
                <button
                  onClick={startMonitoring}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 font-semibold animate-pulse"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Monitoring</span>
                </button>
              )}

              {isMonitoring && (
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 rounded-xl border border-emerald-500/50">
                  <Timer className="w-5 h-5 text-emerald-400" />
                  <div className="text-sm">
                    <div className="text-emerald-400 font-mono font-bold">{formatDuration(sessionDuration)}</div>
                  </div>
                </div>
              )}

              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                isMonitoring
                  ? 'bg-emerald-500/10 border-emerald-500/50'
                  : 'bg-slate-800/50 border-slate-700/50'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isMonitoring
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-slate-500'
                }`}></div>
                <span className={`text-sm ${
                  isMonitoring
                    ? 'text-emerald-400 font-semibold'
                    : 'text-slate-400'
                }`}>{isMonitoring ? 'Live' : 'Idle'}</span>
              </div>

              {alerts.length > 0 && (
                <div className="relative">
                  <Bell className="w-6 h-6 text-amber-400 animate-pulse" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {alerts.length}
                  </span>
                </div>
              )}
            </div>
          </div>

          <UserProfile profile={profile} />
        </header>

        {alerts.length > 0 && (
          <div className="mb-8">
            <AlertPanel alerts={alerts} onAcknowledge={acknowledgeAlert} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Heart Rate"
            subtitle="ECG & MAX30100"
            value={latestReading?.heart_rate ?? '--'}
            unit="BPM"
            icon={Heart}
            status={latestReading ? getHeartRateStatus(latestReading.heart_rate) : 'normal'}
            isDarkMode={isDarkMode}
          />

          <MetricCard
            title="Blood Oxygen"
            subtitle="MAX30100"
            value={latestReading?.spo2 ?? '--'}
            unit="%"
            icon={Activity}
            status={latestReading ? getSpo2Status(latestReading.spo2) : 'normal'}
            isDarkMode={isDarkMode}
          />

          <MetricCard
            title="Temperature"
            subtitle="MLX8 Sensor"
            value={latestReading?.temperature?.toFixed(1) ?? '--'}
            unit="°C"
            icon={Thermometer}
            status={latestReading ? getTemperatureStatus(latestReading.temperature) : 'normal'}
            isDarkMode={isDarkMode}
          />

          <MetricCard
            title="Stress Level"
            subtitle="GSR Sensor"
            value={latestReading?.stress_level ?? '--'}
            unit="/100"
            icon={Brain}
            status={latestReading ? getStressStatus(latestReading.stress_level) : 'normal'}
            isDarkMode={isDarkMode}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">ECG Waveform</h3>
                <div className="ml-auto flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`}></div>
                  <span className="text-xs text-slate-400">{isMonitoring ? 'Live Signal' : 'Standby'}</span>
                </div>
              </div>
              <LiveWaveform
                color="#06b6d4"
                label="Electrocardiogram"
                type="ecg"
                height={140}
                isActive={isMonitoring}
              />
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-violet-400" />
                <h3 className="text-lg font-semibold text-white">GSR Activity</h3>
                <div className="ml-auto flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-violet-400 animate-pulse' : 'bg-slate-500'}`}></div>
                  <span className="text-xs text-slate-400">{isMonitoring ? 'Live Signal' : 'Standby'}</span>
                </div>
              </div>
              <LiveWaveform
                color="#a78bfa"
                label="Galvanic Skin Response"
                type="gsr"
                height={140}
                isActive={isMonitoring}
              />
            </div>
          </div>

          <div>
            {latestReading && (
              <EmotionStatus
                heartRate={latestReading.heart_rate}
                stressLevel={latestReading.stress_level}
                isDarkMode={isDarkMode}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {latestReading && (
            <>
              <AIInsights
                heartRate={latestReading.heart_rate}
                spo2={latestReading.spo2}
                temperature={latestReading.temperature}
                stressLevel={latestReading.stress_level}
                previousReadings={previousReadings.current}
                isDarkMode={isDarkMode}
              />
              <WellnessRecommendations
                heartRate={latestReading.heart_rate}
                stressLevel={latestReading.stress_level}
                temperature={latestReading.temperature}
                spo2={latestReading.spo2}
                isDarkMode={isDarkMode}
              />
            </>
          )}
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Historical Trends</h2>
            <span className="text-sm text-slate-400 ml-2">Last 20 readings</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              Heart Rate Trend
            </h3>
            <HistoricalChart
              readings={readings}
              metric="heart_rate"
              color="#ef4444"
              label="Last 20 readings"
            />
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              Blood Oxygen Trend
            </h3>
            <HistoricalChart
              readings={readings}
              metric="spo2"
              color="#10b981"
              label="Last 20 readings"
            />
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-amber-400" />
              Temperature Trend
            </h3>
            <HistoricalChart
              readings={readings}
              metric="temperature"
              color="#f59e0b"
              label="Last 20 readings"
            />
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet-400" />
              Stress Level Trend
            </h3>
            <HistoricalChart
              readings={readings}
              metric="stress_level"
              color="#8b5cf6"
              label="Last 20 readings"
            />
          </div>
        </div>

        <footer className="mt-12 text-center pb-8">
          <div className="inline-block bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl px-8 py-4">
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Health Monitoring System v1.0</span>
              </div>
              <div className="w-px h-4 bg-slate-700"></div>
              <span>GSR • ECG • MAX30100 • MLX8</span>
              <div className="w-px h-4 bg-slate-700"></div>
              <span>Real-time Sensor Integration</span>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes scanDown {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}

export default App;
