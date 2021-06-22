'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        name: "Average Joe's",
        type: "Casual / New Players",
        description: "Led by Vince Vaughn, this team won in the movie, Dodgeball!"
      },
      {
        name: "Purple Cobras",
        type: "Competitive / Experience Players",
        description: "Led by Ben Stiller, this team lost after Ben bled his own blood"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
