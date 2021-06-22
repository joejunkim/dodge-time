'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        name: "PNW Tournament",
        type: "Tournament",
        date: 06-22-2021,
        capacity: 100,
        description: "Annual Pacific Northwest Tournament. All skill levels allowed!",
        hostId: 1,
        groupId: 1,
        venueId: 1
      },
      {
        name: "Saturday Training Drills",
        type: "Training",
        date: 06-26-2021,
        capacity: 15,
        description: "Come practice throwing drills",
        hostId: 2,
        groupId: 2,
        venueId: 2
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
