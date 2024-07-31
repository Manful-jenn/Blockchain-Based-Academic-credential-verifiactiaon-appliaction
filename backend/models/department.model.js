const { sequelize, Sequelize } = require('../config/db.config.js');

module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    department_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    department_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true 
    }
  }, {
    timestamps: false,
    tableName: 'departments'
  });

  return Department;
};
