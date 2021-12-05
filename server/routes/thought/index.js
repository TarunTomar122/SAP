import { Router } from "express";
import models from "../../models";

const router = Router();

// Add thought
router.post("/add", async (req, res) => {
  try {
    const { name, thought, rating } = req.body;

    // Add thought to person
    await models.Thought.create({
      thought: thought,
      rating: rating,
      personName: name,
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
    const { name } = req.body;
    const thoughts = await models.Thought.findAll({
      where: {
        personName: name,
      },
    });
    res.status(200).json({ thoughts });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
