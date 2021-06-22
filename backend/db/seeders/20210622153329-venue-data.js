'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Venues', [
      {
        name: "Globo Gym",
        address: "1234 Place Street",
        city: "Seattle",
        state: "WA",
        zipCode: 11111,
        createdAt: new Date(Date.UTC(2016, 1, 1)),
        updatedAt: new Date(Date.UTC(2017, 1, 1)),
      },
      {
        name: "Generic High School",
        address: "1234 Location Lane",
        city: "New York City",
        state: "New York",
        zipCode: 22222,
        createdAt: new Date(Date.UTC(2016, 1, 1)),
        updatedAt: new Date(Date.UTC(2017, 1, 1)),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Venues', null, {});
  }
};
