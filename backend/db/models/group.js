'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    Group.hasMany(models.User, {foreignKey: 'groupId'});
    Group.hasMany(models.Event, {foreignKey: 'eventId'});
  };
  return Group;
};
