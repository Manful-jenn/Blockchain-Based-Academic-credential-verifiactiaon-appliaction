'use strict';

const fs = require('fs');
const path = require('path');
const { sequelize, Sequelize } = require('../config/db.config.js');
const basename = path.basename(__filename);
const db = {};

// Dynamically import all models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Define relationships for tables
Object.keys(db).forEach(modelName => {
  console.log(`Loaded model: ${modelName}`); 
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Define associations
if (db.Department && db.AdminStaff) {
  db.Department.hasMany(db.AdminStaff, { foreignKey: 'department_id' });
  db.AdminStaff.belongsTo(db.Department, { foreignKey: 'department_id' });
}

if (db.Department && db.Major) {
  db.Department.hasMany(db.Major, { foreignKey: 'department_id' });
  db.Major.belongsTo(db.Department, { foreignKey: 'department_id' });
}

if (db.Major && db.Student) {
  db.Major.hasMany(db.Student, { foreignKey: 'major_id' });
  db.Student.belongsTo(db.Major, { foreignKey: 'major_id' });
}

if (db.Student && db.Credential) {
  db.Student.hasMany(db.Credential, { foreignKey: 'student_id' });
  db.Credential.belongsTo(db.Student, { foreignKey: 'student_id' });
}

if (db.Credential && db.Course) {
  db.Credential.hasMany(db.Course, { foreignKey: 'credential_id' });
  db.Course.belongsTo(db.Credential, { foreignKey: 'credential_id' });
}

if (db.Student && db.AccessControl) {
  db.Student.hasMany(db.AccessControl, { foreignKey: 'student_id' });
  db.AccessControl.belongsTo(db.Student, { foreignKey: 'student_id' });
}

if (db.External && db.AccessControl) {
  db.External.hasMany(db.AccessControl, { foreignKey: 'external_id' });
  db.AccessControl.belongsTo(db.External, { foreignKey: 'external_id' });
}

// if (db.Credential && db.Accesscontrol) {
//   db.Credential.hasMany(db.Accesscontrol, { foreignKey: 'credential_id' });
//   db.Accesscontrol.belongsTo(db.Credential, { foreignKey: 'credential_id' });
// }

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
