'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetail= sequelize.define('OrderDetail', {
    item_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    attributes:{
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
    product_name:{
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    unit_cost:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      }
  }, {
    timestamps: false,
    tableName: 'order_detail'
  });
  OrderDetail.associate = function(models) {
    // associations can be defined here
  };
  return OrderDetail;
};
