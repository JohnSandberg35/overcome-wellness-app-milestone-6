-- ==========================================
-- Clear Existing Data (Optional but recommended for a seed file)
-- ==========================================
TRUNCATE TABLE 
    users, onboarding_responses, mentors, 
    location_groups, group_members, conversations, 
    conversation_participants, messages, 
    modules, module_contents, user_progress 
CASCADE;

-- ==========================================
-- 1. Create Location Groups
-- ==========================================
INSERT INTO location_groups (id, name, region) VALUES
('11111111-1111-1111-1111-111111111111', 'Utah County Support Group', 'Utah County'),
('22222222-2222-2222-2222-222222222222', 'Salt Lake Valley Affected Partners', 'Salt Lake City');

-- ==========================================
-- 2. Create Modules & Content
-- ==========================================
INSERT INTO modules (id, title, description, order_index, is_published) VALUES
('33333333-3333-3333-3333-333333333333', 'Week 1: Understanding Triggers', 'Identifying what leads to relapse.', 1, true),
('44444444-4444-4444-4444-444444444444', 'Week 2: Rebuilding Trust', 'For users and affected partners alike.', 2, true);

INSERT INTO module_contents (id, module_id, title, content_type, media_url, text_body, order_index) VALUES
('55555555-5555-5555-5555-555555555551', '33333333-3333-3333-3333-333333333333', 'The Science of Addiction', 'video', 'https://example.com/video1', NULL, 1),
('55555555-5555-5555-5555-555555555552', '33333333-3333-3333-3333-333333333333', 'Trigger Identification Journal', 'assignment', NULL, 'List 3 environments where you feel most tempted.', 2),
('55555555-5555-5555-5555-555555555553', '44444444-4444-4444-4444-444444444444', 'Communication Strategies', 'reading', NULL, 'Open communication is the foundation of rebuilding trust...', 1);

-- ==========================================
-- 3. Create Users (Mentors & Standard Users)
-- ==========================================
-- Create the Professional Mentor User
INSERT INTO users (id, email, password_hash, account_type, is_anonymous, display_name, real_name, location_region) VALUES
('66666666-6666-6666-6666-666666666661', 'dr.smith@example.com', 'hashedpassword123', 'mentor', false, 'Dr. Smith', 'Sarah Smith', 'Salt Lake City');

-- Create the Peer Mentor User
INSERT INTO users (id, email, password_hash, account_type, is_anonymous, display_name, real_name, location_region) VALUES
('66666666-6666-6666-6666-666666666662', 'peer.mark@example.com', 'hashedpassword123', 'recovering', false, 'Mark T.', 'Mark Taylor', 'Utah County');

-- Create Standard Users
INSERT INTO users (id, email, password_hash, account_type, is_anonymous, display_name, real_name, location_region) VALUES
('66666666-6666-6666-6666-666666666663', 'anon_user1@example.com', 'hashedpassword123', 'recovering', true, 'Phoenix', NULL, 'Utah County'),
('66666666-6666-6666-6666-666666666664', 'affected_spouse@example.com', 'hashedpassword123', 'affected', false, 'Jane D.', 'Jane Doe', 'Salt Lake City');

-- ==========================================
-- 4. Create Mentor Profiles
-- ==========================================
INSERT INTO mentors (id, user_id, mentor_type, bio, rating, hourly_rate) VALUES
('77777777-7777-7777-7777-777777777771', '66666666-6666-6666-6666-666666666661', 'professional', 'Licensed therapist specializing in addiction recovery.', 4.95, 120.00),
('77777777-7777-7777-7777-777777777772', '66666666-6666-6666-6666-666666666662', 'peer', 'Sober for 5 years. Here to listen and guide.', 4.80, NULL);

-- ==========================================
-- 5. Assign Mentors to Users
-- ==========================================
UPDATE users SET assigned_mentor_id = '77777777-7777-7777-7777-777777777772' WHERE id = '66666666-6666-6666-6666-666666666663'; -- Phoenix gets Peer Mark
UPDATE users SET assigned_mentor_id = '77777777-7777-7777-7777-777777777771' WHERE id = '66666666-6666-6666-6666-666666666664'; -- Jane gets Dr. Smith

-- ==========================================
-- 6. Add Onboarding Responses
-- ==========================================
INSERT INTO onboarding_responses (user_id, question_text, answer_text) VALUES
('66666666-6666-6666-6666-666666666663', 'Why are you trying to quit?', 'I want to be more present in my daily life and improve my mental health.'),
('66666666-6666-6666-6666-666666666664', 'What support are you looking for?', 'I need resources to understand how to process betrayal trauma.');

-- ==========================================
-- 7. Add Users to Location Groups
-- ==========================================
INSERT INTO group_members (group_id, user_id) VALUES
('11111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666662'), -- Mark in Utah County
('11111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666663'), -- Phoenix in Utah County
('22222222-2222-2222-2222-222222222222', '66666666-6666-6666-6666-666666666664'); -- Jane in SLC

-- ==========================================
-- 8. Create Conversations & Messages
-- ==========================================
-- Group Chat for Utah County
INSERT INTO conversations (id, type, group_id) VALUES
('88888888-8888-8888-8888-888888888881', 'group', '11111111-1111-1111-1111-111111111111');

INSERT INTO conversation_participants (conversation_id, user_id) VALUES
('88888888-8888-8888-8888-888888888881', '66666666-6666-6666-6666-666666666662'),
('88888888-8888-8888-8888-888888888881', '66666666-6666-6666-6666-666666666663');

INSERT INTO messages (conversation_id, sender_id, content) VALUES
('88888888-8888-8888-8888-888888888881', '66666666-6666-6666-6666-666666666662', 'Welcome everyone to the local support group!'),
('88888888-8888-8888-8888-888888888881', '66666666-6666-6666-6666-666666666663', 'Thanks Mark, glad to be here.');

-- 1-on-1 DM between Jane and Dr. Smith
INSERT INTO conversations (id, type, group_id) VALUES
('88888888-8888-8888-8888-888888888882', 'dm', NULL);

INSERT INTO conversation_participants (conversation_id, user_id) VALUES
('88888888-8888-8888-8888-888888888882', '66666666-6666-6666-6666-666666666661'),
('88888888-8888-8888-8888-888888888882', '66666666-6666-6666-6666-666666666664');

INSERT INTO messages (conversation_id, sender_id, content) VALUES
('88888888-8888-8888-8888-888888888882', '66666666-6666-6666-6666-666666666664', 'Hi Dr. Smith, I just watched the Week 2 video and had a question.'),
('88888888-8888-8888-8888-888888888882', '66666666-6666-6666-6666-666666666661', 'Hello Jane! I am here. What is on your mind?');

-- ==========================================
-- 9. Track User Progress
-- ==========================================
INSERT INTO user_progress (user_id, content_id, status) VALUES
('66666666-6666-6666-6666-666666666663', '55555555-5555-5555-5555-555555555551', 'completed'),
('66666666-6666-6666-6666-666666666664', '55555555-5555-5555-5555-555555555553', 'completed');