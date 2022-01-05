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

router.get("/contribanal", async (req, res) => {
  try {
    const result = [];

    const taskTrackObj = await models.TaskTrack.findAll({});

    // sort taskTrack by date
    const sorted_by_date = taskTrackObj.sort((a, b) => {
      if (new Date(a.createdAt) > new Date(b.createdAt)) {
        return 1;
      } else {
        return -1;
      }
    });

    // remove first 4 entries
    const taskTrack = sorted_by_date.slice(6, sorted_by_date.length);

    let tempObj = {};

    for (let i = 0; i < taskTrack.length; i++) {
      let date = taskTrack[i].createdAt.toString().slice(0, 10);
      let goal = taskTrack[i].goal;
      let achieved = taskTrack[i].count;

      if (tempObj[date]) {
        tempObj[date].push({
          goal,
          achieved,
        });
      } else {
        tempObj[date] = [
          {
            goal,
            achieved,
          },
        ];
      }
    }

    const mainTemp = {};

    const maxTaskInADay = 6;

    for (let key in tempObj) {
      let temp = tempObj[key];

      let total = 0;

      for (let i = 0; i < temp.length; i++) {
        if (temp[i].achieved <= temp[i].goal) {
          total += temp[i].achieved / temp[i].goal;
        } else {
          total += 1;
          let extra = (temp[i].achieved - temp[i].goal) / temp[i].goal;
          // Normalize extra by the number of tasks
          extra = extra / temp.length;
          total += extra;
        }
      }

      let entry = (total * temp.length) / maxTaskInADay;

      // Normalize by the number of tasks
      entry = entry / temp.length;

      mainTemp[key] = entry;
    }

    res.status(200).json({ mainTemp });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

export default router;
