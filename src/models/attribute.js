'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attribute= sequelize.define('Attribute', {
    attribute_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type:DataTypes.STRING(100),
        allowNull: false,
      },
  }, {
    timestamps: false,
    tableName: 'attribute'
  });
  Attribute.associate = function(models) {
    // associations can be defined here
  };
  return Attribute;
};
