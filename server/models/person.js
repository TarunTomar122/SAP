const person = (sequelize, DataTypes) => {
  const Person = sequelize.define("person", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  });

  // Relate person to review with one to many relationship
  Person.associate = (models) => {
    Person.hasMany(models.Review, {
      onDelete: "CASCADE",
    });
  };

  return Person;
};

export default person;
