'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shipping= sequelize.define('Shipping', {
    shipping_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    shipping_type:{
        type: DataTypes.STRING(100),
        allowNull: false
      },
    shipping_cost:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
    shipping_region_id:{
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {
    timestamps: false,
    tableName: 'shipping'
  });
  Shipping.associate = function(models) {
    // associations can be defined here
  };
  return Shipping;
};
