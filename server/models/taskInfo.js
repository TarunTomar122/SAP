const taskInfo = (sequelize, DataTypes) => {
  const TaskInfo = sequelize.define("taskInfo", {
    taskName: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Every taskinfo can have multiple tasktracks
  TaskInfo.associate = (models) => {
    TaskInfo.hasMany(models.TaskTrack, {
      onDelete: "CASCADE",
    });
  };

  return TaskInfo;
};

export default taskInfo;
