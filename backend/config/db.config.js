const Sequelize = require('sequelize');

const dbName = 'Credential_Database';
const dbUser = 'root';
const dbPassword = '';
const dbHost = 'localhost'; 
const dbPort = '3306'; 
const dbDialect = 'mysql'; 

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
