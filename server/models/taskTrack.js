const taskTrack = (sequelize, DataTypes) => {
  const TaskTrack = sequelize.define("taskTrack", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    goal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return TaskTrack;
};

export default taskTrack;
