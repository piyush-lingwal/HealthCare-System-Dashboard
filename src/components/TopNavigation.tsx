import { Wifi, WifiOff, Battery, BatteryCharging, Clock, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

interface TopNavigationProps {
  isConnected: boolean;
  batteryLevel: number;
  lastUpdate: Date | null;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const TopNavigation = ({
  isConnected,
  batteryLevel,
  lastUpdate,
  isDarkMode,
  onToggleDarkMode
}: TopNavigationProps) => {
  const getBatteryColor = () => {
    if (batteryLevel > 60) return 'text-emerald-400';
    if (batteryLevel > 30) return 'text-amber-400';
    return 'text-red-400';
  };

  const formatTime = (date: Date | null) => {
    if (!date) return '--:--:--';
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className={`backdrop-blur-md border-b px-6 py-3 transition-all duration-500 ${
      isDarkMode
        ? 'bg-slate-900/80 border-slate-700/50'
        : 'bg-white/90 border-slate-200/80'
    }`}>
      <div className="container mx-auto max-w-[1920px] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-500 ${
            isConnected
              ? 'bg-emerald-500/10 border border-emerald-500/30'
              : 'bg-red-500/10 border border-red-500/30'
          }`}>
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-emerald-400">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">Disconnected</span>
              </>
            )}
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-500 ${
            isDarkMode
              ? 'bg-slate-800/50 border-slate-700/30'
              : 'bg-white/70 border-slate-200/50'
          }`}>
            {batteryLevel > 20 ? (
              <BatteryCharging className={`w-4 h-4 ${getBatteryColor()}`} />
            ) : (
              <Battery className={`w-4 h-4 ${getBatteryColor()}`} />
            )}
            <span className={`text-sm font-medium ${getBatteryColor()}`}>
              {batteryLevel}%
            </span>
          </div>

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-500 ${
            isDarkMode
              ? 'bg-slate-800/50 border-slate-700/30'
              : 'bg-white/70 border-slate-200/50'
          }`}>
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className={`text-sm font-medium transition-colors duration-500 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {formatTime(lastUpdate)}
            </span>
          </div>
        </div>

        <button
          onClick={onToggleDarkMode}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-500 ${
            isDarkMode
              ? 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-700/30'
              : 'bg-white/70 hover:bg-slate-100/70 border-slate-200/50'
          }`}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span className={`text-sm font-medium transition-colors duration-500 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-violet-400" />
              <span className={`text-sm font-medium transition-colors duration-500 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
