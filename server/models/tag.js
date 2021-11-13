const tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define("tag", {
    name: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Person, {
      through: "peopletag",
    });
  };

  return Tag;
};

export default tag;
