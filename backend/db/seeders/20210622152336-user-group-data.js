'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserGroups', [
      {
        userId: 1,
        groupId: 1
      },
      {
        userId: 2,
        groupId: 1
      },
      {
        userId: 3,
        groupId: 2
      },
      {
        userId: 4,
        groupId: 2
      },
      {
        userId: 5,
        groupId: 1
      },
      {
        userId: 5,
        groupId: 2
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserGroups', null, {});
  }
};
