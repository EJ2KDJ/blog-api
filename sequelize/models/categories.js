'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Posts is the correct key (modelName: 'Posts') exported by models/index
      // foreignKey should match the field name in the join model (postcategory.js uses categoriesId)
      Categories.belongsToMany(models.Posts, {
        through: 'PostCategory',
        foreignKey: 'categoryId'
      });
    }
  }
  Categories.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};