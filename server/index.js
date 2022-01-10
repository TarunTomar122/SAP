import cors from "cors";
import express from "express";

import models, { sequelize } from "./models";
import bodyParser from "body-parser";

import routes from "./routes";

import { reg_id } from "./config";
import NotificationService from "./services/notification";

const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/notif", routes.notif);
app.use("/api/task", routes.task);
app.use("/api/people", routes.people);
app.use("/api/thought", routes.thought);
app.use("/api/analyze", routes.analyze);
app.use('/api/todo', routes.todo);

const PORT = 4040;

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {

  // Drop the User Table from the database
  // await models.Todo.drop();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
