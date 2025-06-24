const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    // Insert message into database
    await db.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    
    res.status(201).json({ message: 'Your message has been sent successfully' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ message: 'Server error while submitting contact form' });
  }
});

// Admin - Get all contact messages
router.get('/messages', authenticateToken, isAdmin, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM contact_messages ORDER BY submitted_at DESC'
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Contact messages fetch error:', error);
    res.status(500).json({ message: 'Server error while fetching contact messages' });
  }
});

// Admin - Mark message as read
router.put('/messages/:id/read', authenticateToken, isAdmin, async (req, res) => {
  try {
    const messageId = req.params.id;
    
    const result = await db.query(
      'UPDATE contact_messages SET is_read = true WHERE id = $1 RETURNING *',
      [messageId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Message update error:', error);
    res.status(500).json({ message: 'Server error while updating message' });
  }
});

// Admin - Delete message
router.delete('/messages/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const messageId = req.params.id;
    
    const result = await db.query(
      'DELETE FROM contact_messages WHERE id = $1 RETURNING id',
      [messageId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Message deletion error:', error);
    res.status(500).json({ message: 'Server error while deleting message' });
  }
});

module.exports = router; 