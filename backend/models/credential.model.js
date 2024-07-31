module.exports = (sequelize, DataTypes) => {
  const Credential = sequelize.define('Credential', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'students',
        key: 'student_id'
      }
    },
    recipient_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipient_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credential_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certificate_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    issue_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    timestamps: false,
    tableName: 'credentials'
    
  });

  Credential.associate = (models) => {
    Credential.belongsTo(models.Student, { foreignKey: 'student_id' });
    Credential.hasMany(models.Course, { foreignKey: 'credential_id' });
  };

  return Credential;
};
