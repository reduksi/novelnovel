'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserArticle = sequelize.define('UserArticle', {
    UserId: DataTypes.INTEGER,
    ArticleId: DataTypes.INTEGER
  }, {});
  UserArticle.associate = function(models) {
    // associations can be defined here
  };
  return UserArticle;
};