'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShoppingRegion= sequelize.define('ShoppingRegion', {
    shipping_region_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    shipping_region:{
        type: DataTypes.STRING(100),
        allowNull: false
      }
  }, {
    timestamps: false,
    tableName: 'shipping_region'
  });
  ShoppingRegion.associate = function(models) {
    // associations can be defined here
  };
  return ShoppingRegion;
};
