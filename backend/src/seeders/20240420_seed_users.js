'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    await queryInterface.bulkInsert('users', [
      {
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
}; 