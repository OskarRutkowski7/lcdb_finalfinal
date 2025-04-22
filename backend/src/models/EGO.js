const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EGO = sequelize.define('EGO', {
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
  category: {
    type: DataTypes.ENUM('ZAYIN', 'TETH', 'HE', 'WAW'),
    allowNull: false
  },
  sin: {
    type: DataTypes.ENUM('Wrath', 'Lust', 'Pride', 'Sloth', 'Gluttony', 'Envy', 'Greed'),
    allowNull: false
  },
  damage: {
    type: DataTypes.ENUM('Slash', 'Pierce', 'Blunt'),
    allowNull: false
  },
  character_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sinners',
      key: 'id'
    },
    field: 'character_id'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'egos',
  underscored: true
});

// Define associations
EGO.associate = (models) => {
  EGO.belongsTo(models.Sinner, { 
    foreignKey: 'character_id',
    as: 'Sinner'
  });
  EGO.belongsToMany(models.Team, { 
    through: models.TeamEgos,
    as: 'teams',
    foreignKey: 'ego_id'
  });
};

module.exports = EGO; 