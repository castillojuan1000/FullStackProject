'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING
      },
      surveys_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'surveys', // this is refering to surveys ID , in order for the tables to be connected 
          key: 'id'
        }
      },
      answer: {
        type: Sequelize.STRING
      },
      require: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('answers');
  }
};