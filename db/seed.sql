-- Overcome Wellness App - Seed Data
-- Run with: psql -U postgres -d overcome_wellness -f seed.sql
-- Ensure schema.sql has been run first.

-- Clear existing data (respects foreign key order)
TRUNCATE user_progress, curriculum_steps, curriculum_modules, mentors, users RESTART IDENTITY CASCADE;

-- Seed mentors
INSERT INTO mentors (name, role, specialty, bio, rating, is_professional) VALUES
  ('Dr. Sarah Chen', 'Licensed Therapist', 'Specializes in Trauma', '15+ years helping individuals and couples navigate recovery with compassion.', 4.9, true),
  ('James Miller', 'Certified Counselor', 'Addiction Specialist', 'CSAT-certified with a focus on evidence-based recovery methods.', 4.8, true),
  ('Maria Gonzalez', 'Recovery Coach', 'Behavioral Patterns', 'Empowering change through accountability and structured goal-setting.', 4.7, true),
  ('David Park', 'Peer Mentor', 'Lived Experience', '5 years in recovery. Here to walk alongside you with understanding.', 4.9, false),
  ('Rachel Adams', 'Peer Mentor', 'Partner Support', 'Supporting spouses and partners through betrayal trauma healing.', 4.8, false);

-- Seed curriculum modules
INSERT INTO curriculum_modules (title, sort_order) VALUES
  ('Understanding Yourself', 1),
  ('Identifying Triggers', 2),
  ('Building Resilience', 3),
  ('Restoring Relationships', 4);

-- Seed curriculum steps
INSERT INTO curriculum_steps (module_id, title, type, sort_order) VALUES
  (1, 'What is Addiction?', 'video', 1),
  (1, 'Your Brain on Habits', 'reading', 2),
  (1, 'Personal Reflection', 'notes', 3),
  (2, 'Common Trigger Patterns', 'video', 1),
  (2, 'Building Awareness', 'reading', 2),
  (2, 'My Trigger Map', 'notes', 3),
  (3, 'Coping Mechanisms', 'video', 1),
  (3, 'Healthy Alternatives', 'reading', 2),
  (3, 'Action Plan', 'notes', 3),
  (4, 'Trust & Vulnerability', 'video', 1),
  (4, 'Communication Skills', 'reading', 2),
  (4, 'Letter Exercise', 'notes', 3);
