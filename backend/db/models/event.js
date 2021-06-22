'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    date: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    description: DataTypes.STRING,
    hostId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    const columnMapping1 = {
      through: 'RSVP',
      foreignKey: 'eventId',
      otherKey: 'userId'
    }

    Event.belongsToMany(models.User, columnMapping);
    Event.belongsTo(models.User, {foreignKey: 'hostId'});
    Event.belongsTo(models.Group, {foreignKey: 'groupId'});
    Event.belongsTo(models.Venue, {foreignKey: 'venueId'});
  };
  return Event;
};
