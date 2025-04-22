const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TeamEgos = sequelize.define('TeamEgos', {
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
  ego_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'egos',
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
  }
}, {
  timestamps: true,
  tableName: 'team_egos',
  underscored: true
});

module.exports = TeamEgos; 