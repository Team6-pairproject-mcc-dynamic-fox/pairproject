'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Hospital = sequelize.define('Hospital', {
  //   name: DataTypes.STRING,
  //   address: DataTypes.STRING,
  //   city: DataTypes.STRING,
  //   suspect_total: DataTypes.INTEGER,
  //   suspect_quota: DataTypes.INTEGER,
  //   hotline: DataTypes.STRING
  // }, {});
  class Hospital extends sequelize.Sequelize.Model { }
  Hospital.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    link_map: DataTypes.STRING,
    suspect_total: DataTypes.INTEGER,
    suspect_quota: DataTypes.INTEGER,
    hotline: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Hospital"
  })
  Hospital.associate = function (models) {
    // associations can be defined here
    
    Hospital.belongsToMany(models.Suspect, {
      through: 'HospitalReferences',
    });
  };
  return Hospital;
};