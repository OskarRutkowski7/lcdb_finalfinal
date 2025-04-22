'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop existing tables
    await queryInterface.dropTable('team_egos');
    await queryInterface.dropTable('team_sinners');

    // Recreate TeamSinners table with correct column names
    await queryInterface.createTable('team_sinners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      sinner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sinners',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Recreate TeamEgos table with correct column names
    await queryInterface.createTable('team_egos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ego_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'egos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add indexes
    await queryInterface.addIndex('team_sinners', ['team_id', 'sinner_id'], { unique: true });
    await queryInterface.addIndex('team_sinners', ['team_id', 'position'], { unique: true });
    await queryInterface.addIndex('team_egos', ['team_id', 'ego_id'], { unique: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('team_egos');
    await queryInterface.dropTable('team_sinners');
  }
}; 