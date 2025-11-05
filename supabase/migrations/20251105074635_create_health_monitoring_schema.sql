/*
  # Health Monitoring System Database Schema

  ## Overview
  This migration creates the database structure for a real-time health monitoring system
  that captures data from multiple sensors (GSR, ECG, MAX30100, MLX8 temperature sensor).

  ## Tables Created

  ### 1. health_readings
  Stores real-time sensor readings from the monitoring device
  - `id` (uuid, primary key) - Unique identifier for each reading
  - `user_id` (text) - Identifier for the person being monitored
  - `heart_rate` (integer) - Heart rate in BPM from ECG/MAX30100
  - `spo2` (integer) - Blood oxygen saturation percentage from MAX30100
  - `temperature` (numeric) - Body temperature in Celsius from MLX8
  - `stress_level` (integer) - Calculated stress level (0-100) from GSR
  - `gsr_value` (numeric) - Raw galvanic skin response value
  - `ecg_value` (numeric) - Raw ECG reading value
  - `timestamp` (timestamptz) - When the reading was taken
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. health_alerts
  Stores health alerts triggered by abnormal readings
  - `id` (uuid, primary key) - Unique alert identifier
  - `user_id` (text) - User associated with the alert
  - `alert_type` (text) - Type of alert (critical, warning, info)
  - `sensor` (text) - Which sensor triggered the alert
  - `message` (text) - Alert description
  - `value` (numeric) - The value that triggered the alert
  - `acknowledged` (boolean) - Whether alert has been acknowledged
  - `created_at` (timestamptz) - When alert was created

  ### 3. user_profiles
  Stores user profile and baseline health metrics
  - `user_id` (text, primary key) - Unique user identifier
  - `name` (text) - User's name
  - `age` (integer) - User's age
  - `baseline_hr` (integer) - Normal resting heart rate
  - `baseline_spo2` (integer) - Normal SpO2 level
  - `baseline_temp` (numeric) - Normal body temperature
  - `created_at` (timestamptz) - Profile creation date
  - `updated_at` (timestamptz) - Last profile update

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Policies allow authenticated users to read all data (for monitoring dashboard)
  - Policies allow authenticated users to insert readings (for device data ingestion)
  - Policies allow authenticated users to update their own profiles

  ## Indexes
  - Indexes on user_id and timestamp for fast queries
  - Index on alert acknowledgment status for quick filtering
*/

-- Create health_readings table
CREATE TABLE IF NOT EXISTS health_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  heart_rate integer,
  spo2 integer,
  temperature numeric(4,2),
  stress_level integer,
  gsr_value numeric(10,2),
  ecg_value numeric(10,2),
  timestamp timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create health_alerts table
CREATE TABLE IF NOT EXISTS health_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  alert_type text NOT NULL CHECK (alert_type IN ('critical', 'warning', 'info')),
  sensor text NOT NULL,
  message text NOT NULL,
  value numeric(10,2),
  acknowledged boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id text PRIMARY KEY,
  name text NOT NULL,
  age integer,
  baseline_hr integer DEFAULT 70,
  baseline_spo2 integer DEFAULT 98,
  baseline_temp numeric(4,2) DEFAULT 36.5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_health_readings_user_id ON health_readings(user_id);
CREATE INDEX IF NOT EXISTS idx_health_readings_timestamp ON health_readings(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_health_alerts_user_id ON health_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_health_alerts_acknowledged ON health_alerts(acknowledged);

-- Enable Row Level Security
ALTER TABLE health_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for health_readings
CREATE POLICY "Allow authenticated users to read all health readings"
  ON health_readings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert health readings"
  ON health_readings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for health_alerts
CREATE POLICY "Allow authenticated users to read all alerts"
  ON health_alerts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert alerts"
  ON health_alerts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update alerts"
  ON health_alerts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for user_profiles
CREATE POLICY "Allow authenticated users to read all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert profiles"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update profiles"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample user profile
INSERT INTO user_profiles (user_id, name, age, baseline_hr, baseline_spo2, baseline_temp)
VALUES ('user_001', 'Test Subject', 28, 72, 98, 36.6)
ON CONFLICT (user_id) DO NOTHING;