const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const deepseek = require('../services/deepseek');

// Check news
router.post('/check', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description } = req.body;
    
    // Validate input
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    
    // Вызываем API для анализа новостей
    const analysis = await deepseek.analyzeNews(title, description);
    
    // Save the check to database
    await db.query(
      'INSERT INTO news_checks (user_id, title, description, result, confidence_percentage) VALUES ($1, $2, $3, $4, $5)',
      [userId, title, description, analysis.result, analysis.confidencePercentage]
    );
    
    res.json({
      title,
      description,
      result: analysis.result,
      confidencePercentage: analysis.confidencePercentage,
      analysis: analysis.analysis
    });
  } catch (error) {
    console.error('News check error:', error);
    res.status(500).json({ message: 'Error checking news: ' + error.message });
  }
});

// Get user's news check history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await db.query(
      'SELECT id, title, description, result, confidence_percentage, checked_at FROM news_checks WHERE user_id = $1 ORDER BY checked_at DESC',
      [userId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ message: 'Server error while fetching history' });
  }
});

// Admin - Get all news checks
router.get('/all', authenticateToken, isAdmin, async (req, res) => {
  try {
    const result = await db.query(`
      SELECT nc.id, nc.title, nc.description, nc.result, nc.confidence_percentage, nc.checked_at, 
             u.nickname, u.email 
      FROM news_checks nc
      JOIN users u ON nc.user_id = u.id
      ORDER BY nc.checked_at DESC
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('All news checks fetch error:', error);
    res.status(500).json({ message: 'Server error while fetching all news checks' });
  }
});

// Admin - Get statistics
router.get('/statistics', authenticateToken, isAdmin, async (req, res) => {
  try {
    // Get user count
    const userCountResult = await db.query('SELECT COUNT(*) as user_count FROM users');
    const userCount = parseInt(userCountResult.rows[0].user_count);
    
    // Get check count
    const checkCountResult = await db.query('SELECT COUNT(*) as check_count FROM news_checks');
    const checkCount = parseInt(checkCountResult.rows[0].check_count);
    
    // Get average fake percentage
    const avgFakeResult = await db.query(`
      SELECT AVG(CASE WHEN result = false THEN confidence_percentage ELSE 0 END) as avg_fake_percentage
      FROM news_checks
    `);
    const avgFakePercentage = parseFloat(avgFakeResult.rows[0].avg_fake_percentage || 0).toFixed(2);
    
    // Get top 5 users
    const topUsersResult = await db.query(`
      SELECT u.nickname, COUNT(nc.id) as check_count
      FROM users u
      JOIN news_checks nc ON u.id = nc.user_id
      GROUP BY u.id, u.nickname
      ORDER BY check_count DESC
      LIMIT 5
    `);
    
    res.json({
      userCount,
      checkCount,
      avgFakePercentage,
      topUsers: topUsersResult.rows
    });
  } catch (error) {
    console.error('Statistics fetch error:', error);
    res.status(500).json({ message: 'Server error while fetching statistics' });
  }
});

module.exports = router; 