const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/users');
const newsRoutes = require('./routes/news');
const contactRoutes = require('./routes/contact');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Fake News Detector API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
}); 