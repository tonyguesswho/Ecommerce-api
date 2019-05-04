'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Department',
          key: 'department_id',
        }
      },
    name: {
      type:DataTypes.STRING(100),
      allowNull: false,
    },
    description: DataTypes.STRING(1000),
  }, {
    timestamps: false,
    tableName: 'category'
  });
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsTo(models.Department, {
        foreignKey: 'department_id',
        sourceKey: 'department_id',
        as: 'department'
      })
  };
  return Category ;
};
