import { HealthReading, UserProfile } from '../lib/supabase';

export const generateHealthReport = (
  profile: UserProfile,
  readings: HealthReading[],
  healthScore: number
) => {
  const latest = readings[0];
  const avgHR = Math.round(readings.reduce((sum, r) => sum + r.heart_rate, 0) / readings.length);
  const avgSpO2 = Math.round(readings.reduce((sum, r) => sum + r.spo2, 0) / readings.length);
  const avgTemp = (readings.reduce((sum, r) => sum + r.temperature, 0) / readings.length).toFixed(1);
  const avgStress = Math.round(readings.reduce((sum, r) => sum + r.stress_level, 0) / readings.length);

  const reportData = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 40px;
      background: #f8fafc;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #06b6d4;
    }
    .header h1 {
      color: #0e7490;
      margin: 0;
      font-size: 32px;
    }
    .header p {
      color: #64748b;
      margin: 10px 0 0 0;
    }
    .patient-info {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .patient-info h2 {
      color: #0f172a;
      margin-top: 0;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 10px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-top: 15px;
    }
    .info-item {
      padding: 10px;
      background: #f1f5f9;
      border-radius: 5px;
    }
    .info-label {
      color: #64748b;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 600;
    }
    .info-value {
      color: #0f172a;
      font-size: 18px;
      font-weight: bold;
      margin-top: 5px;
    }
    .metrics-section {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .metrics-section h2 {
      color: #0f172a;
      margin-top: 0;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 10px;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-top: 20px;
    }
    .metric-card {
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid;
    }
    .metric-card.normal {
      background: #ecfdf5;
      border-color: #10b981;
    }
    .metric-card.warning {
      background: #fef3c7;
      border-color: #f59e0b;
    }
    .metric-card.critical {
      background: #fee2e2;
      border-color: #ef4444;
    }
    .metric-title {
      color: #64748b;
      font-size: 14px;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .metric-value {
      color: #0f172a;
      font-size: 28px;
      font-weight: bold;
    }
    .metric-unit {
      color: #64748b;
      font-size: 16px;
      margin-left: 5px;
    }
    .metric-avg {
      color: #64748b;
      font-size: 12px;
      margin-top: 8px;
    }
    .health-score {
      background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
      margin-bottom: 30px;
      box-shadow: 0 4px 12px rgba(6,182,212,0.3);
    }
    .health-score h2 {
      margin: 0 0 10px 0;
      font-size: 20px;
    }
    .score-value {
      font-size: 64px;
      font-weight: bold;
      margin: 10px 0;
    }
    .score-label {
      font-size: 18px;
      opacity: 0.9;
    }
    .insights {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .insights h2 {
      color: #0f172a;
      margin-top: 0;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 10px;
    }
    .insight-item {
      padding: 15px;
      margin: 10px 0;
      background: #f8fafc;
      border-radius: 5px;
      border-left: 3px solid #06b6d4;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      color: #64748b;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Health Monitoring Report</h1>
    <p>Generated on ${new Date().toLocaleString()}</p>
  </div>

  <div class="patient-info">
    <h2>Patient Information</h2>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-label">Patient Name</div>
        <div class="info-value">${profile.name}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Age</div>
        <div class="info-value">${profile.age} years</div>
      </div>
      <div class="info-item">
        <div class="info-label">Report Period</div>
        <div class="info-value">Last ${readings.length} readings</div>
      </div>
      <div class="info-item">
        <div class="info-label">User ID</div>
        <div class="info-value">${profile.user_id}</div>
      </div>
    </div>
  </div>

  <div class="health-score">
    <h2>Overall Health Score</h2>
    <div class="score-value">${healthScore}</div>
    <div class="score-label">out of 100</div>
  </div>

  <div class="metrics-section">
    <h2>Current Vital Signs</h2>
    <div class="metrics-grid">
      <div class="metric-card ${latest.heart_rate >= 60 && latest.heart_rate <= 100 ? 'normal' : 'warning'}">
        <div class="metric-title">Heart Rate</div>
        <div class="metric-value">${latest.heart_rate}<span class="metric-unit">BPM</span></div>
        <div class="metric-avg">Average: ${avgHR} BPM</div>
      </div>
      <div class="metric-card ${latest.spo2 >= 95 ? 'normal' : 'warning'}">
        <div class="metric-title">Blood Oxygen (SpO2)</div>
        <div class="metric-value">${latest.spo2}<span class="metric-unit">%</span></div>
        <div class="metric-avg">Average: ${avgSpO2}%</div>
      </div>
      <div class="metric-card ${latest.temperature >= 36.0 && latest.temperature <= 37.5 ? 'normal' : 'warning'}">
        <div class="metric-title">Body Temperature</div>
        <div class="metric-value">${latest.temperature}<span class="metric-unit">°C</span></div>
        <div class="metric-avg">Average: ${avgTemp}°C</div>
      </div>
      <div class="metric-card ${latest.stress_level <= 50 ? 'normal' : 'warning'}">
        <div class="metric-title">Stress Level</div>
        <div class="metric-value">${latest.stress_level}<span class="metric-unit">/100</span></div>
        <div class="metric-avg">Average: ${avgStress}/100</div>
      </div>
    </div>
  </div>

  <div class="insights">
    <h2>Health Insights & Recommendations</h2>
    <div class="insight-item">
      <strong>Heart Health:</strong> ${
        avgHR >= 60 && avgHR <= 100
          ? 'Your heart rate is within the normal range. Continue maintaining regular physical activity.'
          : 'Your heart rate shows some variation. Consider consulting with a healthcare provider.'
      }
    </div>
    <div class="insight-item">
      <strong>Oxygen Levels:</strong> ${
        avgSpO2 >= 95
          ? 'Your blood oxygen levels are excellent. Your respiratory system is functioning well.'
          : 'Your oxygen levels need attention. Ensure proper breathing and consult a doctor if persistent.'
      }
    </div>
    <div class="insight-item">
      <strong>Stress Management:</strong> ${
        avgStress <= 50
          ? 'Your stress levels are well-managed. Keep up with your current stress management techniques.'
          : 'Consider incorporating relaxation techniques such as meditation, deep breathing, or yoga.'
      }
    </div>
    <div class="insight-item">
      <strong>Temperature:</strong> ${
        avgTemp >= 36.0 && avgTemp <= 37.5
          ? 'Your body temperature is normal and stable.'
          : 'Monitor your temperature regularly. Consult a healthcare provider if abnormalities persist.'
      }
    </div>
  </div>

  <div class="footer">
    <p><strong>Health Monitoring System v1.0</strong></p>
    <p>This report is generated automatically based on sensor data from GSR, ECG, MAX30100, and MLX8 Temperature sensors.</p>
    <p>Always consult with healthcare professionals for medical advice.</p>
  </div>
</body>
</html>
  `;

  return reportData;
};

export const downloadReport = (htmlContent: string, filename: string) => {
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadCSV = (readings: HealthReading[], filename: string) => {
  const headers = ['Timestamp', 'Heart Rate (BPM)', 'SpO2 (%)', 'Temperature (°C)', 'Stress Level', 'GSR Value', 'ECG Value'];
  const rows = readings.map(r => [
    new Date(r.timestamp).toLocaleString(),
    r.heart_rate,
    r.spo2,
    r.temperature,
    r.stress_level,
    r.gsr_value,
    r.ecg_value,
  ]);

  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
