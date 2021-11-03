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

    // If there is no taskTrack with the given task name and date

    const taskTrackObj = await models.TaskTrack.findOne({
      where: {
        taskInfoTaskName: taskName,
        date: new Date().toISOString().slice(0, 10),
      },
    });

    if (!taskTrackObj) {
      await models.TaskTrack.create({
        taskInfoTaskName: taskName,
        date: new Date().toISOString().slice(0, 10),
      });
    }
    await models.TaskTrack.increment("goal", {
      where: {
        taskInfoTaskName: taskName,
        date: new Date().toISOString().slice(0, 10),
      },
      by: goal,
    });

    res.status(200).json({
      message: "Task Track Updated successfully",
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
router.post("/getLatest", async (req, res) => {
  try {
    const { taskName } = req.body;

    // Get all the TaskTrack object for corresponding taskName
    const tasks = await models.TaskTrack.findAll(
      {
        where: { taskInfoTaskName: taskName },
        order: [["date", "DESC"]],
      },
      {
        include: [models.TaskInfo],
      }
    );

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get("/getTodaysTasks", async (req, res) => {
  try {
    const tasks = await models.TaskTrack.findAll({
      where: { date: new Date().toISOString().slice(0, 10) },
      order: [["date", "ASC"]],
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post("/deleteTodaysTask", async (req, res) => {
  try {
    const { taskName } = req.body;

    await models.TaskTrack.destroy({
      where: {
        taskInfoTaskName: taskName,
        date: new Date().toISOString().slice(0, 10),
      },
    });

    res.status(200).send("done");
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
