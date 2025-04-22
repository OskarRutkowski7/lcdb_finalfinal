'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sinners', [
      {
        name: 'Yi Sang',
        rarity: 3,
        sin: 'Wrath',
        damage: 'Slash',
        image: '/images/sinners/yi_sang.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Faust',
        rarity: 3,
        sin: 'Lust',
        damage: 'Pierce',
        image: '/images/sinners/faust.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Don Quixote',
        rarity: 3,
        sin: 'Pride',
        damage: 'Blunt',
        image: '/images/sinners/don_quixote.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ryoshu',
        rarity: 3,
        sin: 'Sloth',
        damage: 'Slash',
        image: '/images/sinners/ryoshu.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Meursault',
        rarity: 3,
        sin: 'Gluttony',
        damage: 'Blunt',
        image: '/images/sinners/meursault.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Hong Lu',
        rarity: 3,
        sin: 'Envy',
        damage: 'Pierce',
        image: '/images/sinners/hong_lu.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Heathcliff',
        rarity: 3,
        sin: 'Greed',
        damage: 'Blunt',
        image: '/images/sinners/heathcliff.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ishmael',
        rarity: 3,
        sin: 'Wrath',
        damage: 'Slash',
        image: '/images/sinners/ishmael.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Rodion',
        rarity: 3,
        sin: 'Lust',
        damage: 'Pierce',
        image: '/images/sinners/rodion.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sinclair',
        rarity: 3,
        sin: 'Pride',
        damage: 'Slash',
        image: '/images/sinners/sinclair.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Outis',
        rarity: 3,
        sin: 'Sloth',
        damage: 'Pierce',
        image: '/images/sinners/outis.png',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Gregor',
        rarity: 3,
        sin: 'Gluttony',
        damage: 'Blunt',
        image: '/images/sinners/gregor.png',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sinners', null, {});
  }
}; 