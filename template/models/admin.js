'use strict';
module.exports = (sequelize, DataTypes) => {
  class Admin extends sequelize.Sequelize.Model { }
  Admin.init({
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `first name can't leave empty`
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `email can't leave empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `password can't leave empty`
        }
      }
    },
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Admin"
  })
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};