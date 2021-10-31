import Sequelize from "sequelize";

const sequelize = new Sequelize(
  // "postgres://postgres:Tarun@2001@127.0.0.1:3000/sap",
  "postgres://gjnogsmk:G2CKVv5h1bjBcvze1kco6IE2nBCIJhfi@satao.db.elephantsql.com/gjnogsmk",
  {
    dialect: "postgres",
  }
);

const models = {
  Person: sequelize.import("./person"),
  Review: sequelize.import("./review"),
  TaskInfo: sequelize.import("./taskInfo"),
  TaskTrack: sequelize.import("./taskTrack"),
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };
export default models;
