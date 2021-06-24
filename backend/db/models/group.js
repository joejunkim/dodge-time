'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    const columnMapping = {
      through: 'UserGroup',
      foreignKey: 'groupId',
      otherKey: 'userId'
    }

    Group.belongsToMany(models.User, columnMapping, { onDelete: 'CASCADE' } );
    Group.hasMany(models.Event, {foreignKey: 'groupId', onDelete: 'CASCADE'});
  };
  return Group;
};
