-- Database schema for Fake News Detector

-- Users table to store user information
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News checks table to store history of news checks
CREATE TABLE news_checks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    result BOOLEAN NOT NULL,
    confidence_percentage DECIMAL(5, 2) NOT NULL,
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table to store contact form submissions
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Create admin user (password: Admin123!)
INSERT INTO users (nickname, email, password, role) 
VALUES ('admin', 'admin@example.com', '$2b$10$2/7VvQRcwQUvBYZKvUXQw.XJbEVfIjqKMW92Kv4.gSKkpT6TcqnAC', 'admin'); 