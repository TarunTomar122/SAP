import { Router } from "express";
import models from "../../models";

const router = Router();

import startSchedule from "../../services/cronModule";

router.post("/add", async (req, res) => {
    try {
        const { description, title } = req.body;
        const todo = await models.Todo.create({
            description,
            title,
            date: Date.now(),
        });
        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.get("/get", async (req, res) => {
    try {
        const todos = await models.Todo.findAll();
        const reversedTodos = todos.reverse();
        res.json(reversedTodos);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

router.post("/delete", async (req, res) => {
    try {
        const { title } = req.body;
        const todo = await models.Todo.destroy({
            where: {
                title
            }
        });

        const notification = await models.Notification.findOne({
            where: {
                title,
            },
        });

        if (notification) {

            await models.Notification.destroy({
                where: {
                    title,
                },
            });

            await startSchedule();
        }
        else {

            const reminder = await models.Reminder.findOne({
                where: {
                    title,
                },
            });

            const intervalId = reminder.dataValues.intervalId;

            clearInterval(String(intervalId));

            await models.Reminder.destroy({
                where: {
                    title,
                },
            });

        }

        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})



export default router;