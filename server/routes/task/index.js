import { Router } from "express";
import models from "../../models";

const router = Router();

// Get all the taskInfos
router.get("/get", async (req, res) => {
  try {
    // Get all the taskInfos
    const tasks = await models.TaskInfo.findAll(
      {},
      {
        include: [models.TaskTrack],
      }
    );

    // Include section not working here FIX IT

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Add Task Router
router.post("/add", async (req, res) => {
  try {
    const { taskName, goal } = req.body;

    // If there is no task with task name then add it to TaskInfo table
    const taskInfo = await models.TaskInfo.findOne({
      where: { taskName: taskName },
    });

    if (!taskInfo) {
      await models.TaskInfo.create({
        taskName: taskName,
      });
    }

    // Add today's goal to the taskTrack table
    await models.TaskTrack.create({
      taskName: taskName,
      goal: goal,
      date: new Date().toISOString().slice(0, 10),
      taskInfoTaskName: taskName,
    });

    res.status(200).json({
      message: "Task added successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
});

// Add count to the TaskTrack table
router.post("/addCount", async (req, res) => {
  try {
    const { count, taskName } = req.body;

    await models.TaskTrack.increment("count", {
      by: count,
      where: { taskInfoTaskName: taskName },
    });

    return res.status(200).json({ message: "Updated Successfully" });
  } catch (er) {
    console.error(er);
    return res.status(500).json({ error: er });
  }
});

// Get latest entries from the TaskTrack table
router.get("/getLatest", async (req, res) => {
  try {
    const { taskName } = req.body;

    const tasks = await models.TaskTrack.findAll(
      {
        limit: 5,
        order: [["date", "DESC"]],
      },
      { where: { taskInfoTaskName: taskName } }
    );

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
