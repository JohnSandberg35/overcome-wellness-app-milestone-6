-- ==========================================
-- Core Entities
-- ==========================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Onboarding Choices
    account_type VARCHAR(50) NOT NULL, -- e.g., 'recovering', 'affected'
    is_anonymous BOOLEAN DEFAULT true,
    display_name VARCHAR(100), 
    real_name VARCHAR(255),    
    location_region VARCHAR(100), 
    
    -- Foreign key to mentors added via ALTER TABLE below
    assigned_mentor_id UUID, 
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE onboarding_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL, 
    answer_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mentors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    mentor_type VARCHAR(50) NOT NULL, -- 'peer' or 'professional'
    bio TEXT,
    rating DECIMAL(3,2) DEFAULT 0.00, 
    hourly_rate DECIMAL(10,2),        
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Establish the circular relationship between users and mentors
ALTER TABLE users 
ADD CONSTRAINT fk_assigned_mentor 
FOREIGN KEY (assigned_mentor_id) REFERENCES mentors(id) ON DELETE SET NULL;


-- ==========================================
-- Group & Messaging Entities
-- ==========================================

CREATE TABLE location_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL, 
    region VARCHAR(100) NOT NULL
);

CREATE TABLE group_members (
    group_id UUID REFERENCES location_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, user_id)
);

CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL, -- 'group' or 'dm'
    group_id UUID REFERENCES location_groups(id) ON DELETE CASCADE, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conversation_participants (
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ==========================================
-- Content & Module Entities
-- ==========================================

CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INT NOT NULL, 
    is_published BOOLEAN DEFAULT false
);

CREATE TABLE module_contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content_type VARCHAR(50) NOT NULL, -- 'video', 'reading', 'assignment'
    media_url VARCHAR(555),            
    text_body TEXT,                    
    order_index INT NOT NULL
);

CREATE TABLE user_progress (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content_id UUID REFERENCES module_contents(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'completed',
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, content_id)
);