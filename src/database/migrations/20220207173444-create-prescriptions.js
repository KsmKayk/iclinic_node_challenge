'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('prescriptions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
      },
      clinic_id: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      physician_id: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      patient_id: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      text: {
        type: Sequelize.STRING,
        allowNull:false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("prescriptions")
  }
};
