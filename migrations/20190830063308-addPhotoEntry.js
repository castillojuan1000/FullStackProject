'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'photo_url', {
      type: Sequelize.STRING,
      defaultValue: '/images/profileDefault.png'
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'photo_url')

  }
};
