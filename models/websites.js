"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Websites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Websites.init(
    {
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      isFav: DataTypes.BOOLEAN,
      wordCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Websites",
    }
  );
  return Websites;
};
