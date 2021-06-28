'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', [
      {
        name: "Average Joe's",
        ownerId: 2,
        type: "🟢 Casual / New Players",
        city: "Seattle",
        state: "WA",
        description: "Led by Vince Vaughn, this team won in the movie, Dodgeball!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Purple Cobras",
        ownerId: 3,
        type: "🔴 Competitive / Experienced Players",
        city: "New York City",
        state: "NY",
        description: "Led by Ben Stiller, this team lost after Ben bled his own blood",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "LA Dodgers",
        ownerId: 4,
        type: "🟡 Competitive / New Players",
        city: "Los Angeles",
        state: "CA",
        description: "Deciding to more properly match their name, the baseball team has now transitioned to become a dodgeball team instead!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Rage Cage",
        ownerId: 3,
        type: "🔵 Casual / New Players",
        city: "Seattle",
        state: "WA",
        description: "A local Seattle group focused on having casual games for new to mid level players. Mainly focused on training and pickup sessions!",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
