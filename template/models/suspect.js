'use strict';
module.exports = (sequelize, DataTypes) => {
  class Suspect extends sequelize.Sequelize.Model { 
    get fullName() {
      return this.first_name + ' ' + this.last_name;
    }
  }
  Suspect.init({
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
    code: DataTypes.STRING,
    // username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `password can't leave empty`
        }
      }
    },
    // age: DataTypes.INTEGER,
    // address: DataTypes.STRING,
    city: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `email can't leave empty`
        }
      }
    },
    // phone_number: DataTypes.STRING,
    // family_number: DataTypes.STRING,
    // symptom: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (Suspect, option) => {
        if (Suspect.last_name == '') {
          Suspect.last_name == Suspect.first_name
        }
        Suspect.code = `${Suspect.city}_${Suspect.fullName}`
      }
    },
    validate: {
      checkEmpty() {
        if (this.first_name == '' || this.last_name == '' || this.password == '' || this.email == '' || this.city == '' ) {
          throw new Error('all field must be filled')
        }
      }
    },
    modelName: "Suspect"
  })
  Suspect.associate = function (models) {
    // associations can be defined here
    Suspect.belongsToMany(models.Hospital, {through: 'HospitalReferences'});
  };
  return Suspect;
};