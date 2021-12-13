import { Router } from "express";
import models from "../../models";

const router = Router();

router.get("/track", async (req, res) => {
  try {
    const taskInfoObj = await models.TaskInfo.findAll({});
    const taskInfo = taskInfoObj.map((task) => task.dataValues);

    const result = [];

    for (let i = 0; i < taskInfo.length; i++) {
      let taskName = taskInfo[i].taskName;

      let taskObjs = await models.TaskTrack.findAll({
        where: {
          taskInfoTaskName: taskName,
        },
      });

      let taskObj = taskObjs.map((task) => task.dataValues);
      let taskObjArr = [];

      for (let j = 0; j < taskObj.length; j++) {
        let date = taskObj[j].createdAt.toString();
        let goal = taskObj[j].goal;
        let achieved = taskObj[j].count;
        let taskName = taskObj[j].taskInfoTaskName;

        taskObjArr.push({
          date,
          goal,
          achieved,
          taskName,
        });
      }

      result.push({
        taskName,
        taskObjArr,
      });
    }

    res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
