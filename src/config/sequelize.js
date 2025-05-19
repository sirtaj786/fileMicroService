const { Sequelize } = require('sequelize');
const path = require('path');
const config = require('./config');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: config.NODE_ENV === 'development' ? console.log : false
});

module.exports = sequelize;