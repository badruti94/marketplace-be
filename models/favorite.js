'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favorite.belongsTo(models.item, {
        as: 'item',
        foreignKey: 'item_id'
      })
    }
  }
  favorite.init({
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'favorite',
  });
  return favorite;
};