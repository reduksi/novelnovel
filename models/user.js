'use strict';
const pwdGenerator = require('../helper/pass')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {
    getFullName(){
      return this.first_name + ' ' + this.last_name
    }
    static encrypt(secret, pass){
      return pwdGenerator(secret,pass)
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {hooks:{
    beforeCreate: (instance,options) => {
      let secret = 'hacktiv8'
      instance.password = User.encrypt(secret, instance.password)
    }
  },sequelize});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Article)
    // User.belongsToMany(models.Article,{through:models.UserArticle})
  };
  return User;
};