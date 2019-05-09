'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type:DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
        type:DataTypes.STRING(1000),
        allowNull: false,
    },
    price:{
        type:DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discounted_price:{
        type:DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: '0.00'
    },
    image: DataTypes.STRING(150),
    image_2: DataTypes.STRING(150),
    thumbnail: DataTypes.STRING(150),
    display:{
        type:DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '0'
    },
  },
  {
    timestamps: false,
    tableName: 'product',
  }
  );
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.ProductAttribute,{
      foreignKey:'product_id',
      as:'productAttributes'
    })
    Product.belongsToMany(models.Category, {
      foreignKey: 'product_id',
      through: 'product_category',
    });
  };
  return Product;
};
