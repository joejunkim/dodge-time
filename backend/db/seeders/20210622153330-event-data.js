'use strict';

const { time } = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        name: "PNW Tournament",
        type: "Tournament",
        date: new Date(),
        capacity: 100,
        city: "Seattle",
        state: "WA",
        time: "2:00pm PST",
        description: "Annual Pacific Northwest Tournament. All skill levels allowed!",
        hostId: 1,
        groupId: 1,
        venueId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Saturday Training Drills",
        type: "Training / Drills",
        date: new Date(),
        capacity: 20,
        city: "New York City",
        state: "NY",
        time: "5:00pm EST",
        description: "Weekly event! Come practice throwing drills to get gud",
        hostId: 2,
        groupId: 2,
        venueId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Wednesday Night Pick Up Games",
        type: "Casual Pick-Up",
        date: new Date(),
        capacity: 30,
        city: "Los Angeles",
        state: "CA",
        time: "11:00am PST",
        description: "Come practice throwing drills to get gud",
        hostId: 3,
        groupId: 3,
        venueId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Rainbow League",
        type: "Tournament",
        date: new Date(),
        capacity: 60,
        city: "Seattle",
        state: "WA",
        time: "7:30pm PST",
        description: "Seasonal tournament for mid-experienced players",
        hostId: 1,
        groupId: 1,
        venueId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
