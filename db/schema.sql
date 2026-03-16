-- Overcome Wellness App - Database Schema

CREATE TABLE IF NOT EXISTS mentors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  rating DECIMAL(2, 1) NOT NULL DEFAULT 4.5,
  is_professional BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS curriculum_modules (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS curriculum_steps (
  id SERIAL PRIMARY KEY,
  module_id INTEGER NOT NULL REFERENCES curriculum_modules(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('video', 'reading', 'notes')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  step_id INTEGER NOT NULL REFERENCES curriculum_steps(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, step_id)
);

CREATE INDEX IF NOT EXISTS idx_mentors_is_professional ON mentors(is_professional);
CREATE INDEX IF NOT EXISTS idx_curriculum_steps_module_id ON curriculum_steps(module_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
