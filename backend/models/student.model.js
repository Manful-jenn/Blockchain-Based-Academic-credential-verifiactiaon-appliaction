const { sequelize, Sequelize } = require('../config/db.config.js');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true 
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    enrollment_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    graduation_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    major_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'majors',
        key: 'major_id'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'students',
    hooks: {
      beforeCreate: async (student) => {
        if (student.password) {
          const salt = await bcrypt.genSalt(10);
          student.password = await bcrypt.hash(student.password, salt);
        }
      },
      beforeUpdate: async (student) => {
        if (student.password) {
          const salt = await bcrypt.genSalt(10);
          student.password = await bcrypt.hash(student.password, salt);
        }
      }
    }
  });
  
  return Student;
};
 