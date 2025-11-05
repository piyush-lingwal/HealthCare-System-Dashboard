import { AlertTriangle, X, Info, AlertCircle } from 'lucide-react';
import { HealthAlert } from '../lib/supabase';

interface AlertPanelProps {
  alerts: HealthAlert[];
  onAcknowledge: (alertId: string) => void;
}

export const AlertPanel = ({ alerts, onAcknowledge }: AlertPanelProps) => {
  if (alerts.length === 0) return null;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return AlertCircle;
      case 'warning':
        return AlertTriangle;
      default:
        return Info;
    }
  };

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'warning':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      default:
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    }
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert) => {
        const Icon = getAlertIcon(alert.alert_type);
        const styles = getAlertStyles(alert.alert_type);

        return (
          <div
            key={alert.id}
            className={`${styles} border rounded-xl p-4 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">
                      {alert.sensor.toUpperCase()} Alert
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(alert.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">{alert.message}</p>
                  {alert.value && (
                    <p className="text-xs text-slate-400 mt-1">
                      Current value: {alert.value}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => onAcknowledge(alert.id)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                aria-label="Acknowledge alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
