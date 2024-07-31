const { sequelize, Sequelize } = require('../config/db.config.js');

module.exports = (sequelize, DataTypes) => {
  const Major = sequelize.define('Major', {
    major_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    major_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true // Assuming major names should be unique
    },
    department_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'department_id'
      }
    }
  }, {
    timestamps: false,
    tableName: 'majors'
  });

  // Define the association with the Department model
  Major.associate = (models) => {
    Major.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department' });
  };

  

  return Major;
};
