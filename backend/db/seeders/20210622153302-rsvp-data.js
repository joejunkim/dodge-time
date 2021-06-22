'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RSVPs', [
      {
        userId: 1,
        eventId: 2
      },
      {
        userId: 2,
        eventId: 1
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RSVPs', null, {});
  }
};
