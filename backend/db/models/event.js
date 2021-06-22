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
    Event.hasMany(models.User, {foreignKey: 'userId'});
    Event.belongsTo(models.Group, {foreignKey: 'groupId'});
    Event.belongsTo(models.Venue, {foreignKey: 'venueId'});
  };
  return Event;
};
