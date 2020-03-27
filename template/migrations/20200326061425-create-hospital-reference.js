'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HospitalReferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SuspectId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Suspects",
          key: "id"
        },
        onDelete: 'Cascade',
        onUpdate: 'Cascade'
      },
      HospitalId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Hospitals",
          key: "id"
        },
        onDelete: 'Cascade',
        onUpdate: 'Cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('HospitalReferences');
  }
};