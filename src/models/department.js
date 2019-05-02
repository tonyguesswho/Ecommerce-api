'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    department_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type:DataTypes.STRING(100),
      allowNull: false,
    },
    description: DataTypes.STRING(1000)
  }, {
    timestamps: false,
    tableName: 'department'
  });
  Department.associate = function(models) {
    // associations can be defined here
  };
  return Department;
};
