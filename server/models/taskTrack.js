const taskTrack = (sequelize, DataTypes) => {
  const TaskTrack = sequelize.define("taskTrack", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    goal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return TaskTrack;
};

export default taskTrack;
