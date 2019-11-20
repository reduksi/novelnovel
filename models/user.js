'use strict';
const pwdGenerator = require('../helper/pass')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {hooks:{
    beforeCreate: (instance,options) => {
      let secret = 'hacktiv8'
      instance.password = pwdGenerator(secret,instance.password)
    }
  },sequelize});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};