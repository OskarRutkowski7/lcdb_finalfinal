'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create Users table
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('user', 'admin'),
        defaultValue: 'user'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create Sinners table
    await queryInterface.createTable('sinners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      rarity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sin: {
        type: Sequelize.ENUM('Wrath', 'Lust', 'Pride', 'Sloth', 'Gluttony', 'Envy', 'Greed'),
        allowNull: false
      },
      damage: {
        type: Sequelize.ENUM('Slash', 'Pierce', 'Blunt'),
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create EGOs table
    await queryInterface.createTable('egos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      category: {
        type: Sequelize.ENUM('ZAYIN', 'TETH', 'HE', 'WAW'),
        allowNull: false
      },
      sin: {
        type: Sequelize.ENUM('Wrath', 'Lust', 'Pride', 'Sloth', 'Gluttony', 'Envy', 'Greed'),
        allowNull: false
      },
      damage: {
        type: Sequelize.ENUM('Slash', 'Pierce', 'Blunt'),
        allowNull: false
      },
      character_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sinners',
          key: 'id'
        }
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create Teams table
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create TeamSinners table
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
        }
      },
      sinner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sinners',
          key: 'id'
        }
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create TeamEgos table
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
        }
      },
      ego_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'egos',
          key: 'id'
        }
      },
      sinner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sinners',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add indexes
    await queryInterface.addIndex('team_sinners', ['team_id', 'sinner_id'], { unique: true });
    await queryInterface.addIndex('team_sinners', ['team_id', 'position'], { unique: true });
    await queryInterface.addIndex('team_egos', ['team_id', 'ego_id', 'sinner_id'], { unique: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('team_egos');
    await queryInterface.dropTable('team_sinners');
    await queryInterface.dropTable('teams');
    await queryInterface.dropTable('egos');
    await queryInterface.dropTable('sinners');
    await queryInterface.dropTable('users');
  }
}; 