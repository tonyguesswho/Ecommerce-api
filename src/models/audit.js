'use strict';
module.exports = (sequelize, DataTypes) => {
  const Audit= sequelize.define('Audit', {
    audit_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    created_on:{
        type: DataTypes.DATE,
        allowNull: false
      },
    message:{
        type: DataTypes.TEXT,
        allowNull: false
      },
    code:{
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {
    timestamps: false,
    tableName: 'audit'
  });
  Audit.associate = function(models) {
    // associations can be defined here
  };
  return Audit;
};
