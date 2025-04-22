'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First, remove existing egos
    await queryInterface.bulkDelete('egos', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });

    // Insert the correct egos
    await queryInterface.bulkInsert('egos', [
      {
        name: 'Don\'t Fear The Reaper',
        image: '/dontfearthereaper.png',
        sin: 'Wrath',
        damage: 'Slash',
        character_id: 1, // Yi Sang
        category: 'HE',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Pale Rider',
        image: '/palerider.png',
        sin: 'Wrath',
        damage: 'Slash',
        character_id: 1, // Yi Sang
        category: 'WAW',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'The Crimson Scar',
        image: '/crimsonscar.png',
        sin: 'Lust',
        damage: 'Pierce',
        character_id: 2, // Faust
        category: 'TETH',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Windmill',
        image: '/windmill.png',
        sin: 'Pride',
        damage: 'Slash',
        character_id: 3, // Don Quixote
        category: 'WAW',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'La Sangre',
        image: '/lasangre.png',
        sin: 'Pride',
        damage: 'Blunt',
        character_id: 3, // Don Quixote
        category: 'HE',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bamboo Cutter',
        image: '/bamboocutter.png',
        sin: 'Sloth',
        damage: 'Slash',
        character_id: 4, // Ryōshū
        category: 'WAW',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Moonlight',
        image: '/moonlight.png',
        sin: 'Sloth',
        damage: 'Pierce',
        character_id: 4, // Ryōshū
        category: 'WAW',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sunshower',
        image: '/sunshower.png',
        sin: 'Gluttony',
        damage: 'Blunt',
        character_id: 5, // Meursault
        category: 'WAW',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Stranger',
        image: '/stranger.png',
        sin: 'Gluttony',
        damage: 'Blunt',
        character_id: 5, // Meursault
        category: 'WAW',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Revert by removing all egos
    await queryInterface.bulkDelete('egos', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
}; 