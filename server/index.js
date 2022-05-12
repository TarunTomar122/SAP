import cors from "cors";
import express from "express";

import models, { sequelize } from "./models";
import bodyParser from "body-parser";

import routes from "./routes";

import notify from "./services/notify";
import startSchedule from './services/cronModule';

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
app.use('/api/journal', routes.journal);

const PORT = 4040;

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {

  // Drop the User Table from the database
  // await models.Notification.drop();
  // await models.Journal.drop();
  await dummyOperations();
  await startSchedule();
  setIntervals();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


const dummyOperations = async () => {

  // const answers = [
  //   "Ok so i feel pretty good right now. I have just finished working on SAP journal feature uwu",
  //   "I don't think i want to change anything right now",
  //   "I am kind of worried about upcoming intern and current relationship",
  //   "I am super grateful for the upcoming internship and current relationship",
  //   "4"
  // ]

  // const date = new Date();

  // const journal = await models.Journal.create({
  //   answers: answers,
  //   date: date,
  // });

}

const setIntervals = async () => {

  const intervals = await models.Reminder.findAll();

  for (var interval of intervals) {
    const timeInterval = interval.dataValues.timeInterval;

    const time = parseInt(timeInterval.split(" ")[0]);
    const unit = timeInterval.split(" ")[1];

    if (unit == "hrs" || unit == "hr") {
      time = time * 60;
    }

    time = time * 60 * 1000;

    const intervalObj = setInterval(async () => {
      const payload = {
        title: interval.dataValues.title,
        body: interval.dataValues.description,
      }
      await notify(payload);
    }, time);

    // get interval id from intrervalObj
    const intervalId = parseInt(String(intervalObj));

    console.log(intervalId, String(intervalObj));

    interval.intervalId = intervalId;
    await interval.save();

  }

}