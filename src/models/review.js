'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review= sequelize.define('Review', {
    review_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    review:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    created_on:{
        type: DataTypes.DATE,
        allowNull: false,
      },
  }, {
    timestamps: false,
    tableName: 'review'
  });
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};