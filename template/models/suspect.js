'use strict';
module.exports = (sequelize, DataTypes) => {
  class Suspect extends sequelize.Sequelize.Model { }
  Suspect.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    family_number: DataTypes.STRING,
    symptom: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Suspect"
  })
  Suspect.associate = function (models) {
    // associations can be defined here
    Suspect.belongsToMany(models.Hospital, {
      through: 'HospitalReferences',
    });
  };
  return Suspect;
};