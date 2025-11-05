import { useEffect, useState } from 'react';
import { supabase, HealthReading, HealthAlert, UserProfile } from '../lib/supabase';

export const useHealthData = (userId: string) => {
  const [latestReading, setLatestReading] = useState<HealthReading | null>(null);
  const [readings, setReadings] = useState<HealthReading[]>([]);
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
    subscribeToRealtimeUpdates();
  }, [userId]);

  const fetchInitialData = async () => {
    try {
      const [readingsRes, alertsRes, profileRes] = await Promise.all([
        supabase
          .from('health_readings')
          .select('*')
          .eq('user_id', userId)
          .order('timestamp', { ascending: false })
          .limit(50),
        supabase
          .from('health_alerts')
          .select('*')
          .eq('user_id', userId)
          .eq('acknowledged', false)
          .order('created_at', { ascending: false }),
        supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle(),
      ]);

      if (readingsRes.data && readingsRes.data.length > 0) {
        setLatestReading(readingsRes.data[0]);
        setReadings(readingsRes.data);
      }

      if (alertsRes.data) {
        setAlerts(alertsRes.data);
      }

      if (profileRes.data) {
        setProfile(profileRes.data);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching health data:', error);
      setLoading(false);
    }
  };

  const subscribeToRealtimeUpdates = () => {
    const readingsChannel = supabase
      .channel('health_readings_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'health_readings',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newReading = payload.new as HealthReading;
          setLatestReading(newReading);
          setReadings((prev) => [newReading, ...prev.slice(0, 49)]);
        }
      )
      .subscribe();

    const alertsChannel = supabase
      .channel('health_alerts_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'health_alerts',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newAlert = payload.new as HealthAlert;
          setAlerts((prev) => [newAlert, ...prev]);
        }
      )
      .subscribe();

    return () => {
      readingsChannel.unsubscribe();
      alertsChannel.unsubscribe();
    };
  };

  const acknowledgeAlert = async (alertId: string) => {
    await supabase
      .from('health_alerts')
      .update({ acknowledged: true })
      .eq('id', alertId);

    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  };

  return {
    latestReading,
    readings,
    alerts,
    profile,
    loading,
    acknowledgeAlert,
  };
};
