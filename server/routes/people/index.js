import { Router } from "express";
import models from "../../models";

const router = Router();

// Get all the people
router.get("/get", async (req, res) => {
  try {
    // Get all the people and their tags
    const people = await models.Person.findAll({
      include: [
        {
          model: models.Tag,
          as: "tags",
          attributes: ["name"],
        },
      ],
    });

    res.json(people);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Get all tags
router.get("/getTags", async (req, res) => {
  try {
    // Get all the tags
    const tags = await models.Tag.findAll();
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Add a new person
router.post("/add", async (req, res) => {
  try {
    // Get the person data
    const { name, email, contacts, tags, dob, address } = req.body;

    // Create the person
    const person = await models.Person.create({
      name,
      email,
      contacts,
      address,
      dob: new Date(dob).toISOString().slice(0, 10),
    });

    tags.forEach(async (tag) => {
      const newTag = await models.Tag.findOrCreate({
        where: {
          name: tag,
        },
      });

      await person.addTag(newTag[0]);
    });

    res.json(person);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
