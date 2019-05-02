'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductAttribute= sequelize.define('ProductAttribute', {
    product_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    attribute_value_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
  }, {
    timestamps: false,
    tableName: 'product_attribute'
  });
  ProductAttribute.associate = function(models) {
    // associations can be defined here

  };
  return ProductAttribute;
};
