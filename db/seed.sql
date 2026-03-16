-- Overcome Wellness App - Seed Data

TRUNCATE mentors RESTART IDENTITY CASCADE;

INSERT INTO mentors (name, role, specialty, bio, rating, is_professional) VALUES
  ('Dr. Sarah Chen', 'Licensed Therapist', 'Specializes in Trauma', '15+ years helping individuals and couples navigate recovery with compassion.', 4.9, true),
  ('James Miller', 'Certified Counselor', 'Addiction Specialist', 'CSAT-certified with a focus on evidence-based recovery methods.', 4.8, true),
  ('Maria Gonzalez', 'Recovery Coach', 'Behavioral Patterns', 'Empowering change through accountability and structured goal-setting.', 4.7, true),
  ('David Park', 'Peer Mentor', 'Lived Experience', '5 years in recovery. Here to walk alongside you with understanding.', 4.9, false),
  ('Rachel Adams', 'Peer Mentor', 'Partner Support', 'Supporting spouses and partners through betrayal trauma healing.', 4.8, false);
