'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    product_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  },
  {
    timestamps: false,
    tableName: 'product_category',
  }
  );
  ProductCategory.associate = function(models) {
    // associations can be defined here

   ProductCategory.belongsTo(models.Product, {
    foreignKey: 'product_id',
    targetKey: 'product_id',
    onDelete: 'CASCADE'
  });
  ProductCategory.belongsTo(models.Category, {
    foreignKey: 'category_id',
    targetKey: 'category_id',
    onDelete: 'CASCADE'
  });
  };
  return ProductCategory;
};
