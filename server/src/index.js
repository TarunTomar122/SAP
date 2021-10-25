import cors from "cors";
import express from "express";

import models, { sequelize } from "../models";
import bodyParser from 'body-parser';

import routes from "../routes";

const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use("/api/task", routes.task);

const PORT = 4040;

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
