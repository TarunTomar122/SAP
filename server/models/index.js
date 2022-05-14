import Sequelize from "sequelize";

const sequelize = new Sequelize(
  "postgres://gjnogsmk:G2CKVv5h1bjBcvze1kco6IE2nBCIJhfi@satao.db.elephantsql.com/gjnogsmk",
  {
    dialect: "postgres",
  }
);

const models = {
  Person: sequelize.import("./person"),
  Thought: sequelize.import("./thought"),
  TaskInfo: sequelize.import("./taskInfo"),
  TaskTrack: sequelize.import("./taskTrack"),
  Tag: sequelize.import("./tag"),
  User: sequelize.import("./user"),
  Todo: sequelize.import("./todo"),
  Notification: sequelize.import("./notification"),
  Reminder: sequelize.import("./reminder"),
  Journal: sequelize.import("./journal"),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
