import cors from "cors";
import express from "express";

import models, { sequelize } from "../models";

const app = express();

app.use(cors());

const PORT = 4040;

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  await dummyOperations();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

const dummyOperations = async () => {
  // Insert a Dummy person into the database
  // const person = await models.Person.create({
  //   name: "Tarun Tomar",
  //   email: "tomartarun2001@gmail.com",
  //   contact: ["8959350440"],
  //   address: "Gwalior",
  //   dob: "01/01/2001",
  //   tags: ["Myself"],
  // });

  // Insert Review for person with name "Tarun Tomar"
  // await models.Review.create({
  //   personId: 1,
  //   content: "This is a dummy review",
  //   rating: 5,
  // });
};
