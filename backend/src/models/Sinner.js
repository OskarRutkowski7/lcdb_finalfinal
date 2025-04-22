const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sinner = sequelize.define('Sinner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  rarity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 3
    }
  },
  sin: {
    type: DataTypes.ENUM('Wrath', 'Lust', 'Pride', 'Sloth', 'Gluttony', 'Envy', 'Greed'),
    allowNull: false
  },
  damage: {
    type: DataTypes.ENUM('Slash', 'Pierce', 'Blunt'),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'sinners',
  underscored: true
});

// Define associations
Sinner.associate = (models) => {
  Sinner.belongsToMany(models.Team, { 
    through: models.TeamSinners,
    as: 'teams',
    foreignKey: 'sinner_id'
  });
  Sinner.hasMany(models.EGO, { 
    foreignKey: 'characterId',
    as: 'egos'
  });
};

module.exports = Sinner; 