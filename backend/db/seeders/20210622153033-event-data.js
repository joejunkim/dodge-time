'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        name: "PNW Tournament",
        type: "Tournament",
        date: new Date(Date.UTC(2021, 06, 2)),
        capacity: 100,
        description: "Annual Pacific Northwest Tournament. All skill levels allowed!",
        hostId: 1,
        groupId: 1,
        venueId: 1
      },
      {
        name: "Saturday Training Drills",
        type: "Training",
        date: new Date(Date.UTC(2021, 06, 6)),
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
