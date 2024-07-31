module.exports = (sequelize, DataTypes) => {
  const AccessControl = sequelize.define('AccessControl', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    external_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    access_granted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'access_controls',
    timestamps: true,
  });

  AccessControl.associate = function(models) {
    // Define relationships here
    AccessControl.belongsTo(models.Student, { foreignKey: 'student_id' });
    AccessControl.belongsTo(models.External, { foreignKey: 'external_id' });
  };

  return AccessControl;
};
