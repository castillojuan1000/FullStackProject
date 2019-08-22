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
      surveyID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'survey', // this is refering to survey ID , in order for the tables to be connected 
          key: 'id'
        }
      },
      questions: {
        type: Sequelize.STRING
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