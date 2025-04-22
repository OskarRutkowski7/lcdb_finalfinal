const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Team extends Model {}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      field: 'user_id'
    },
  },
  {
    sequelize,
    modelName: 'Team',
    tableName: 'teams',
    underscored: true,
  }
);

// Define associations
Team.associate = (models) => {
  Team.belongsTo(models.User, { foreignKey: 'user_id' });
  Team.belongsToMany(models.Sinner, { 
    through: models.TeamSinners,
    as: 'sinners',
    foreignKey: 'team_id',
    otherKey: 'sinner_id'
  });
  Team.belongsToMany(models.EGO, { 
    through: models.TeamEgos,
    as: 'egos',
    foreignKey: 'team_id',
    otherKey: 'ego_id'
  });
};

module.exports = Team; 