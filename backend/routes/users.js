const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    
    // Validate input
    if (!nickname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters and include uppercase, lowercase, number and special character' 
      });
    }

    // Check if email or nickname already exists
    const existingUser = await db.query(
      'SELECT * FROM users WHERE email = $1 OR nickname = $2',
      [email, nickname]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email or nickname already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const result = await db.query(
      'INSERT INTO users (nickname, email, password) VALUES ($1, $2, $3) RETURNING id, nickname, email, role',
      [nickname, email, hashedPassword]
    );

    const user = result.rows[0];
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, nickname: user.nickname, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fake_news_detector_secret_key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Hard-coded admin credentials for fallback
    const adminEmail = 'admin@example.com';
    const adminPassword = 'Admin123!';
    
    // Check if using admin login
    if (email === adminEmail && password === adminPassword) {
      // Generate JWT token for admin
      const adminUser = {
        id: 9999,
        nickname: 'Administrator',
        email: adminEmail,
        role: 'admin'
      };
      
      const token = jwt.sign(
        adminUser,
        process.env.JWT_SECRET || 'fake_news_detector_secret_key',
        { expiresIn: '24h' }
      );

      return res.json({
        message: 'Admin login successful',
        token,
        user: adminUser
      });
    }

    // For regular users, continue with database lookup
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, nickname: user.nickname, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fake_news_detector_secret_key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await db.query(
      'SELECT id, nickname, email, role, created_at FROM users WHERE id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { nickname, currentPassword, newPassword } = req.body;
    
    // Get current user data
    const userResult = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const user = userResult.rows[0];
    let updateFields = [];
    let values = [];
    let paramCount = 1;
    
    // Check if nickname is being updated
    if (nickname && nickname !== user.nickname) {
      // Check if nickname is already taken
      const nicknameCheck = await db.query(
        'SELECT id FROM users WHERE nickname = $1 AND id != $2',
        [nickname, userId]
      );
      
      if (nicknameCheck.rows.length > 0) {
        return res.status(400).json({ message: 'Nickname is already taken' });
      }
      
      updateFields.push(`nickname = $${paramCount}`);
      values.push(nickname);
      paramCount++;
    }
    
    // Check if password is being updated
    if (currentPassword && newPassword) {
      // Validate password strength
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({ 
          message: 'New password must be at least 8 characters and include uppercase, lowercase, number and special character' 
        });
      }
      
      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
      
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      updateFields.push(`password = $${paramCount}`);
      values.push(hashedPassword);
      paramCount++;
    }
    
    // If nothing to update
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No changes to update' });
    }
    
    // Build and execute update query
    const updateQuery = `
      UPDATE users 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, nickname, email, role
    `;
    values.push(userId);
    
    const updateResult = await db.query(updateQuery, values);
    const updatedUser = updateResult.rows[0];
    
    // Generate new token with updated user data
    const token = jwt.sign(
      { 
        id: updatedUser.id, 
        nickname: updatedUser.nickname, 
        email: updatedUser.email, 
        role: updatedUser.role 
      },
      process.env.JWT_SECRET || 'fake_news_detector_secret_key',
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Profile updated successfully',
      token,
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
});

// Admin routes - Get all users
router.get('/all', authenticateToken, isAdmin, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, nickname, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

// Admin routes - Delete user
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Prevent admin from deleting their own account
    if (userId == req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }
    
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [userId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
});

// Admin routes - Make a user admin
router.put('/:id/make-admin', authenticateToken, isAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    
    const result = await db.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, nickname, email, role',
      ['admin', userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ 
      message: 'User role updated to admin successfully',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Server error while updating user role' });
  }
});

// Special route for development - automatically make logged in user admin
router.post('/dev/make-me-admin', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const result = await db.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, nickname, email, role',
      ['admin', userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate new token with updated role
    const updatedUser = result.rows[0];
    const token = jwt.sign(
      { 
        id: updatedUser.id, 
        nickname: updatedUser.nickname, 
        email: updatedUser.email, 
        role: updatedUser.role 
      },
      process.env.JWT_SECRET || 'fake_news_detector_secret_key',
      { expiresIn: '24h' }
    );
    
    res.json({ 
      message: 'Your role has been updated to admin',
      token,
      user: updatedUser
    });
  } catch (error) {
    console.error('Error making user admin:', error);
    res.status(500).json({ message: 'Server error while updating role' });
  }
});

module.exports = router; 