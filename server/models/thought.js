const thought = (sequelize, DataTypes) => {
  const Thought = sequelize.define("thought", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    thought: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Thought.associate = (models) => {
    Thought.belongsTo(models.Person);
  };

  return Thought;
};

export default thought;
