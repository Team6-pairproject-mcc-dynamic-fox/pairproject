'use strict';
const fs = require("fs")
let hospitals = JSON.parse(fs.readFileSync("./hospitals.json", "utf8"))
hospitals.forEach(hospital => {
  hospital.createdAt = new Date()
  hospital.updatedAt = new Date()
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Hospitals', hospitals, {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Hospitals', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
