'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        name: "Average Joe's",
        type: "Casual / New Players",
        description: "Led by Vince Vaughn, this team won in the movie, Dodgeball!",
        createdAt: new Date(Date.UTC(2016, 1, 1)),
        updatedAt: new Date(Date.UTC(2017, 1, 1)),
      },
      {
        name: "Purple Cobras",
        type: "Competitive / Experience Players",
        description: "Led by Ben Stiller, this team lost after Ben bled his own blood",
        createdAt: new Date(Date.UTC(2016, 1, 1)),
        updatedAt: new Date(Date.UTC(2017, 1, 1)),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
