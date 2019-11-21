'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
    // Article.belongsToMany(models.User,{through:models.UserArticle})
  };
  return Article;
};