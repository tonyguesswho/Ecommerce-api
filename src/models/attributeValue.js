'use strict';
module.exports = (sequelize, DataTypes) => {
  const AttributeValue= sequelize.define('AttributeValue', {
    attribute_value_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    attribute_id:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      value: {
        type:DataTypes.STRING(100),
        allowNull: false,
      },
  }, {
    timestamps: false,
    tableName: 'attribute_value'
  });
  AttributeValue.associate = function(models) {
    // associations can be defined here
    AttributeValue.belongsTo(models.Attribute, {
        foreignKey: 'attribute_id',
        sourceKey: 'attribute_id',
        as: 'attribute'
      })
  };
  return AttributeValue;
};
