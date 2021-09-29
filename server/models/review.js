const review = (sequelize, DataTypes) => {
  const Review = sequelize.define("review", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      require: true,
    },
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Person);
  };

  return Review;
};

export default review;
