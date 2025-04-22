'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('egos', [
      {
        name: 'Red Eyes',
        category: 'TETH',
        sin: 'Wrath',
        damage: 'Slash',
        character_id: 1, // Yi Sang
        image: '/images/egos/red_eyes.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Pale Tonight',
        category: 'HE',
        sin: 'Lust',
        damage: 'Pierce',
        character_id: 2, // Faust
        image: '/images/egos/pale_tonight.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Golden Heart',
        category: 'WAW',
        sin: 'Pride',
        damage: 'Blunt',
        character_id: 3, // Don Quixote
        image: '/images/egos/golden_heart.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sleeping Beauty',
        category: 'TETH',
        sin: 'Sloth',
        damage: 'Slash',
        character_id: 4, // Ryoshu
        image: '/images/egos/sleeping_beauty.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Feast',
        category: 'HE',
        sin: 'Gluttony',
        damage: 'Blunt',
        character_id: 5, // Meursault
        image: '/images/egos/feast.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mirror Image',
        category: 'WAW',
        sin: 'Envy',
        damage: 'Pierce',
        character_id: 6, // Hong Lu
        image: '/images/egos/mirror_image.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Golden Apple',
        category: 'TETH',
        sin: 'Greed',
        damage: 'Blunt',
        character_id: 7, // Heathcliff
        image: '/images/egos/golden_apple.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'White Whale',
        category: 'HE',
        sin: 'Wrath',
        damage: 'Slash',
        character_id: 8, // Ishmael
        image: '/images/egos/white_whale.png',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('egos', null, {});
  }
}; 