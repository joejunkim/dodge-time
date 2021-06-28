'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Group.associate = function(models) {
    const columnMapping = {
      through: 'UserGroup',
      foreignKey: 'groupId',
      otherKey: 'userId'
    }

    Group.belongsToMany(models.User, columnMapping, { onDelete: 'CASCADE' } );
    Group.belongsTo(models.User, { foreignKey: 'ownerId' })
    Group.hasMany(models.Event, { foreignKey: 'groupId', onDelete: 'CASCADE' });
  };
  return Group;
};
