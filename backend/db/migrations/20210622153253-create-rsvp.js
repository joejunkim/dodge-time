'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RSVPs', {
      id: {
        allowNull: false,
        onDelete: 'CASCADE',
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      eventId: {
        allowNull: false,
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: { model: 'Events' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY                    
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RSVPs');
  }
};
