const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const External = sequelize.define('External', {
    external_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'externals', // Ensure table name is correct
    hooks: {
      beforeCreate: async (external) => {
        if (external.password) {
          const salt = await bcrypt.genSalt(10);
          external.password = await bcrypt.hash(external.password, salt);
        }
      },
      beforeUpdate: async (external) => {
        if (external.password) {
          const salt = await bcrypt.genSalt(10);
          external.password = await bcrypt.hash(external.password, salt);
        }
      }
    }
  });

  return External;
};
