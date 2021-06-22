'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Venues', [
      {
        name: "Globo Gym",
        address: "1234 Place Street",
        city: "Seattle",
        state: "WA",
        zipCode: 11111
      },
      {
        name: "Generic High School",
        address: "1234 Location Lane",
        city: "New York City",
        state: "New York",
        zipCode: 22222
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Venues', null, {});
  }
};
