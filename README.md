# Fake News Detector

A modern web application for detecting fake news using artificial intelligence and machine learning technologies.

## 📋 Project Overview

The Fake News Detector application allows users to verify the credibility of news using advanced AI algorithms. The system analyzes news text and provides results about their authenticity with a certain confidence percentage.

## 🏗️ Project Architecture

The project is divided into two main parts:

### Frontend (React)

- Modern user interface built with React 19
- Styling using Tailwind CSS
- Animations using Framer Motion and Lottie
- Multi-language support via LanguageContext
- Dark/light theme via ThemeContext
- User authentication via AuthContext

### Backend (Node.js)

- REST API on Express.js
- Authentication using JWT
- PostgreSQL database
- Integration with Hugging Face API for news analysis
- Role system (user/administrator)

## ✨ Main Features

- **News Verification**: Analysis of news headline and description using AI
- **Authentication**: Registration, login, logout, profile management
- **Check History**: Saving all verified news
- **Admin Panel**: User management and statistics viewing
- **Multi-language**: Support for multiple interface languages
- **Dark/Light Theme**: Application appearance selection
- **Responsive Design**: Correct display on mobile devices

## 🚀 Technologies

### Frontend
- React 19
- React Router 7
- Axios
- Tailwind CSS
- Framer Motion
- Lottie
- React Intersection Observer
- AOS (Animate On Scroll)

### Backend
- Node.js
- Express 5
- PostgreSQL
- JWT (JSON Web Tokens)
- Bcrypt
- Axios
- Hugging Face API

## 🛠️ Installation and Setup

### Prerequisites
- Node.js (v14+)
- PostgreSQL
- Hugging Face API key (for news analysis)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/fake-news-detector.git
   cd fake-news-detector
   ```

2. Install dependencies:
   ```
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Create `.env` file in the `backend` directory:
   ```
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=fake_news_detector
   JWT_SECRET=your_secure_jwt_secret
   HUGGINGFACE_API_KEY=your_huggingface_api_key
   ```

4. Set up the database:
   ```
   cd backend
   node setup-db.js
   ```

### Running

1. Start the backend (from the `backend` directory):
   ```
   npm run dev
   ```

2. Start the frontend (from the `frontend` directory):
   ```
   npm start
   ```

3. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## 📱 Screenshots and Demo

*[Screenshots of the application can be added here]*

## 👥 User Roles

### Regular User
- Registration and login to the system
- News verification using AI
- Viewing history of their checks
- Profile updates
- Sending messages through contact form

### Administrator
- All regular user capabilities
- Viewing list of all users
- Viewing all news checks
- Access to system usage statistics
- User management (role changes)

## 🧠 AI for News Analysis

The project uses a Hugging Face model for news text analysis:
- Model: `facebook/bart-large-mnli`
- Method: Text classification by categories "reliable news", "fake news", "misleading information"
- Result: Credibility determination with confidence percentage

## 🗄️ Database Structure

- **users**: Storage of user information
- **news_checks**: News check history
- **contact_messages**: Messages from users

## 🔒 Security

- Password hashing using bcrypt
- Authentication verification using JWT
- Protected routes for administrators
- Input validation on frontend and backend

## 📝 TODO and Development Plans

- Integration with other APIs for cross-checking news
- Ability to check news by URL
- Mobile application
- Browser extension
- Advanced analysis with explanation of classification reasons
- Support for more languages for news analysis
