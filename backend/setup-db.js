const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  // Create connection to PostgreSQL
  const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres' // Connect to default database first
  });
  
  try {
    // Check if our database exists
    const dbName = process.env.DB_NAME || 'fake_news_detector';
    const dbCheckResult = await pool.query(
      `SELECT 1 FROM pg_catalog.pg_database WHERE datname = $1`,
      [dbName]
    );
    
    // Create database if it doesn't exist
    if (dbCheckResult.rows.length === 0) {
      console.log(`Creating database: ${dbName}`);
      await pool.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully`);
    } else {
      console.log(`Database ${dbName} already exists`);
    }
    
    // Close the connection to postgres database
    await pool.end();
    
    // Connect to our database
    const appPool = new Pool({
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: dbName
    });
    
    // Read the SQL file content
    const sqlFilePath = path.join(__dirname, 'db.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Split SQL commands by semicolon
    const sqlCommands = sqlContent
      .split(';')
      .filter(command => command.trim().length > 0);
    
    // Execute each SQL command
    for (const command of sqlCommands) {
      try {
        await appPool.query(command);
      } catch (err) {
        // Skip if table already exists or other non-critical errors
        if (!err.message.includes('already exists')) {
          console.error(`Error executing SQL: ${command}`);
          console.error(err);
        }
      }
    }
    
    console.log('Database setup completed successfully');
    await appPool.end();
    
  } catch (err) {
    console.error('Database setup error:', err);
    process.exit(1);
  }
}

// Run the setup
setupDatabase(); 