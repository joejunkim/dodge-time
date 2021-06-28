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
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Generic High School",
        address: "1234 Location Lane",
        city: "New York City",
        state: "NY",
        zipCode: 22222,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Place Gym",
        address: "1234 Venue Location",
        city: "Los Angeles",
        state: "CA",
        zipCode: 33333,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Venues', null, {});
  }
};
