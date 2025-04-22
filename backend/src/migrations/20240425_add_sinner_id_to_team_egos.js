'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('team_egos', 'sinner_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'sinners',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Add the composite unique index
    await queryInterface.addIndex('team_egos', ['team_id', 'ego_id', 'sinner_id'], { 
      unique: true,
      name: 'team_egos_team_ego_sinner_unique'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('team_egos', 'team_egos_team_ego_sinner_unique');
    await queryInterface.removeColumn('team_egos', 'sinner_id');
  }
}; 