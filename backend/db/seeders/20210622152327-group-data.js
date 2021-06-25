'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        name: "Average Joe's",
        ownerId: 2,
        type: "Casual / New Players",
        description: "Led by Vince Vaughn, this team won in the movie, Dodgeball!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Purple Cobras",
        ownerId: 3,
        type: "Competitive / Experience Players",
        description: "Led by Ben Stiller, this team lost after Ben bled his own blood",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
