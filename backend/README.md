# Fake News Detector - Backend

This is the backend for the Fake News Detector application, which analyzes news articles using Gemini API to determine if they're real or fake.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- JWT for authentication
- bcrypt for password hashing
- Gemini API for news analysis

## Setup Instructions

1. **Clone the repository**

2. **Install dependencies**
   ```
   npm install
   ```

3. **Setup PostgreSQL database**
   - Create a database named `fake_news_detector`
   - Run the SQL commands in `db.sql` to create the necessary tables

4. **Configure environment variables**
   - Create a `.env` file based on the provided `.env.example`
   - Add your database credentials and Gemini API key

5. **Start the server**
   - Development mode: `npm run dev`
   - Production mode: `npm start`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user

### User Management
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/all` - Get all users (admin only)
- `DELETE /api/users/:id` - Delete a user (admin only)

### News
- `POST /api/news/check` - Check a news article
- `GET /api/news/history` - Get user's news check history
- `GET /api/news/all` - Get all news checks (admin only)
- `GET /api/news/statistics` - Get statistics (admin only)

### Contact
- `POST /api/contact` - Submit a contact form
- `GET /api/contact/messages` - Get all contact messages (admin only)
- `PUT /api/contact/messages/:id/read` - Mark a message as read (admin only)
- `DELETE /api/contact/messages/:id` - Delete a message (admin only)

## Database Schema

### Tables
- `users` - User information (nickname, email, password, role)
- `news_checks` - News check history (title, description, result, confidence percentage)
- `contact_messages` - Contact form submissions (name, email, message)

## API-интеграция:

Gemini API (анализ новостей) 