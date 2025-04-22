const sequelize = require('../config/database');
const Sinner = require('./Sinner');
const EGO = require('./EGO');
const Team = require('./Team');
const User = require('./User');
const TeamSinners = require('./TeamSinners');
const TeamEgos = require('./TeamEgos');

// Initialize models
const models = {
  Sinner,
  EGO,
  Team,
  User,
  TeamSinners,
  TeamEgos
};

// Set up associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  sequelize,
  ...models,
  testConnection
}; 