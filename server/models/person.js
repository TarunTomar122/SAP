const person = (sequelize, DataTypes) => {
  const Person = sequelize.define("person", {
    name: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    contacts: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
    },
    address: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATE,
    },
  });

  // Relate person to thought with one to many relationship
  Person.associate = (models) => {
    Person.hasMany(models.Thought, {
      onDelete: "CASCADE",
    });
    Person.belongsToMany(models.Tag, {
      through: "peopletag",
    });
  };

  return Person;
};

export default person;
