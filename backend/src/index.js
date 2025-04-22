const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Load environment variables
dotenv.config();

console.log('Environment variables loaded');

// Import routes
const sinnerRoutes = require('./routes/sinners');
const egoRoutes = require('./routes/egos');
const teamRoutes = require('./routes/teams');
const authRoutes = require('./routes/auth');

console.log('Routes imported');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('Middleware configured');

// Connect to PostgreSQL
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL');
    // Sync all models
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized');
    
    // Routes
    app.use('/api/sinners', sinnerRoutes);
    app.use('/api/egos', egoRoutes);
    app.use('/api/teams', teamRoutes);
    app.use('/api/auth', authRoutes);
    
    console.log('Routes configured');

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Error:', err.stack);
      res.status(500).json({ error: 'Internal server error' });
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Try accessing: http://localhost:${PORT}/api/sinners`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  }); 