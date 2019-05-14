module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    product_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, { freezeTableName: true, tableName: 'product_category', timestamps: false });
  ProductCategory.associate = (models) => {
    // associations can be defined here
    // ProductCategory.belongsTo(models.Product, {
    //   foreignKey: 'product_id',
    //   targetKey: 'product_id',
    //   onDelete: 'CASCADE'
    // });
    // ProductCategory.belongsTo(models.Category, {
    //   foreignKey: 'category_id',
    //   targetKey: 'category_id',
    //   onDelete: 'CASCADE'
    // });
  };
  return ProductCategory;
};