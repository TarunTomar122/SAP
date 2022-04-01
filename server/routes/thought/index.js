import { Router } from "express";
import models from "../../models";

const router = Router();

// Add thought
router.post("/add", async (req, res) => {
  try {
    const { name, thought, rating, title } = req.body;

    // if name is not person, create person
    const person = await models.Person.findOne({
      where: { name },
    });

    if (!person) {
      const newPerson = await models.Person.create({
        name,
      });
    }


    // Add thought to person
    await models.Thought.create({
      thought: thought,
      rating: rating,
      personName: name,
      title: title,
    });

    res.status(200).json({ response: "Thought added" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Get all the thoughts for some person
router.post("/get", async (req, res) => {
  try {
    const thoughts = await models.Thought.findAll({});
    const tags = await models.Person.findAll({});
    res.json({ journals: thoughts.slice(thoughts.length - 2, thoughts.length), tags });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


export default router;
