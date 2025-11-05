import { supabase } from '../lib/supabase';

const baselineMetrics = {
  heart_rate: 72,
  spo2: 98,
  temperature: 36.6,
  stress_level: 30,
};

const getRealisticValue = (base: number, variance: number, min: number, max: number) => {
  const change = (Math.random() - 0.5) * variance;
  return Math.max(min, Math.min(max, base + change));
};

let currentValues = { ...baselineMetrics };

export const generateHealthReading = (userId: string) => {
  currentValues.heart_rate = getRealisticValue(currentValues.heart_rate, 5, 55, 110);
  currentValues.spo2 = getRealisticValue(currentValues.spo2, 2, 92, 100);
  currentValues.temperature = getRealisticValue(currentValues.temperature, 0.2, 35.5, 38.0);
  currentValues.stress_level = getRealisticValue(currentValues.stress_level, 8, 10, 85);

  const ecgBase = Math.sin(Date.now() / 100) * 50;
  const ecgValue = ecgBase + (Math.random() - 0.5) * 20;

  const gsrBase = currentValues.stress_level * 2;
  const gsrValue = gsrBase + (Math.random() - 0.5) * 10;

  return {
    user_id: userId,
    heart_rate: Math.round(currentValues.heart_rate),
    spo2: Math.round(currentValues.spo2),
    temperature: Number(currentValues.temperature.toFixed(1)),
    stress_level: Math.round(currentValues.stress_level),
    gsr_value: Number(gsrValue.toFixed(2)),
    ecg_value: Number(ecgValue.toFixed(2)),
    timestamp: new Date().toISOString(),
  };
};

export const startDataSimulation = (userId: string) => {
  const interval = setInterval(async () => {
    const reading = generateHealthReading(userId);

    const { error } = await supabase
      .from('health_readings')
      .insert([reading]);

    if (error) {
      console.error('Error inserting simulated data:', error);
    }

    const shouldAlert = Math.random() < 0.05;
    if (shouldAlert) {
      const alerts = [
        {
          user_id: userId,
          alert_type: 'warning',
          sensor: 'heart_rate',
          message: 'Heart rate slightly elevated. Consider taking a short break.',
          value: reading.heart_rate,
          acknowledged: false,
        },
        {
          user_id: userId,
          alert_type: 'info',
          sensor: 'stress',
          message: 'Stress levels detected. Deep breathing recommended.',
          value: reading.stress_level,
          acknowledged: false,
        },
      ];

      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];

      await supabase
        .from('health_alerts')
        .insert([randomAlert]);
    }
  }, 2000);

  return () => clearInterval(interval);
};

export const generateHistoricalData = async (userId: string, count: number = 50) => {
  const readings = [];
  const now = Date.now();

  for (let i = count - 1; i >= 0; i--) {
    const timestamp = new Date(now - i * 60000);
    const reading = generateHealthReading(userId);
    reading.timestamp = timestamp.toISOString();
    readings.push(reading);
  }

  const { error } = await supabase
    .from('health_readings')
    .insert(readings);

  if (error) {
    console.error('Error generating historical data:', error);
  }
};
