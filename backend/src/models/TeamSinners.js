const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TeamSinners = sequelize.define('TeamSinners', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  team_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id'
    }
  },
  sinner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sinners',
      key: 'id'
    }
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'team_sinners',
  underscored: true
});

module.exports = TeamSinners; 