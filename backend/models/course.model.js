module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      credential_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'credentials',
          key: 'id'
        }
      },
      course_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      semester: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      timestamps: false,
      tableName: 'courses'
    });
  
    Course.associate = (models) => {
      Course.belongsTo(models.Credential, { foreignKey: 'credential_id' });
    };
  
    return Course;
  };
  