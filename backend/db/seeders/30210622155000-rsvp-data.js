'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RSVPs', [
      {
        userId: 1,
        eventId: 2,
        createdAt: new Date(Date.UTC(2016, 1, 1)),
        updatedAt: new Date(Date.UTC(2017, 1, 1)),
      },
      {
        userId: 2,
        eventId: 1,
        createdAt: new Date(Date.UTC(2016, 1, 1)),
        updatedAt: new Date(Date.UTC(2017, 1, 1)),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RSVPs', null, {});
  }
};
