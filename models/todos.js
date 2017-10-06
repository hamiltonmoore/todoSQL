'use strict';
module.exports = function (sequelize, DataTypes) {
  var todos = sequelize.define('todos', {
    task: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
      classMethods: {
        associate: function (models) {
        }
      }
    });
  return todos;
};