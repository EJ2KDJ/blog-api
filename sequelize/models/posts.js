'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.belongsTo(models.Users, {foreignKey: 'userId'});
      Posts.belongsToMany(models.Categories, {
        through: 'PostCategory',
        foreignKey: 'postsId'
      });
    }
  }
  Posts.init({
    userId: DataTypes.INTEGER,
    postTitle: DataTypes.STRING,
    body: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};