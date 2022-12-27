'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */


let users = [
  {
    username: 'admin',
    password: '',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'andi',
    password: '',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    username: 'alia',
    password: '',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const profiles = [
  {
    name: 'Admin',
    phone_number: '089811110001',
    address: 'jln setia budi no 1',
    user_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Andi Adinata',
    phone_number: '089811110002',
    address: 'jln setia budi no 2',
    user_id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Alia Adelia',
    phone_number: '089811110003',
    address: 'jln setia budi no 2',
    user_id: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const salt = await bcrypt.genSalt(10)
    const passwordAdmin = await bcrypt.hash('admin', salt);
    const passwordUser = await bcrypt.hash('password', salt);

    const userAdmin = users[0]
    userAdmin.password = passwordAdmin

    users = users.filter(user => user.role !== 'admin').map(user => ({
      ...user,
      password: passwordUser,
    }))
    users = [userAdmin, ...users]

    await queryInterface.bulkInsert('users', users);
    await queryInterface.bulkInsert('profiles', profiles);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('profiles', null, {});
    await queryInterface.bulkDelete('users', null, {});

  }
};
