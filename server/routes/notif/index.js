import { Router } from "express";
import models from "../../models";
import NotificationService from "../../services/notification";
import notify from "../../services/notify";

import startSchedule from "../../services/cronModule";

const router = Router();

router.post("/saveToken", async (req, res) => {
    try {
        const { notificationToken, userType } = req.body;
        const user = await models.User.create({
            notificationToken,
            userType,
        });
        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

router.get("/test", async (req, res) => {
    try {
        const payload = {
            title: "Test Notification",
            body: "This is the body of the notification",
        }

        const reg_ids = [];

        const users = await models.User.findAll({});
        users.forEach(user => {
            reg_ids.push(user.notificationToken);
        })

        const notification = NotificationService.send(reg_ids, payload);
        res.status(200).send({ notification, reg_ids });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.post("/add", async (req, res) => {
    try {

        const obj = req.body;

        if (obj.isExact) {

            const notification = await models.Notification.create(obj);
            await startSchedule();
            res.status(200).send(notification);

        }
        else {

            var interval = parseInt(obj.timeInterval.split(" ")[0]);
            var unit = obj.timeInterval.split(" ")[1];

            if (unit == "hrs") {
                interval = interval * 60;
            }

            interval = interval * 60 * 1000;

            const intervalId = setInterval(async () => {
                const payload = {
                    title: obj.title,
                    body: obj.description,
                }
                await notify(payload);
            }, interval);

            const reminder = await models.Reminder.create({
                intervalId: parseInt(String(intervalId)),
                title: obj.title,
                description: obj.description,
                timeInterval: obj.timeInterval,
                permanent: obj.permanent,
            });

            res.status(200).send(reminder);

        }

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

router.post("/get", async (req, res) => {
    try {

        const { title } = req.body;
        const reminder = await models.Reminder.findOne({
            where: {
                title,
            },
        });
        if (reminder) {
            res.status(200).send(reminder);
        }
        else {
            const notification = await models.Notification.findOne({
                where: {
                    title,
                },
            })
            res.status(200).send(notification);
        }

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

router.post("/delete", async (req, res) => {
    try {

        const { title } = req.body;

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

        res.status(200).send();

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

router.post("/getAllReminders", async (req, res) => {
    try {

        const reminders = await models.Reminder.findAll({
            where: {
                permanent: true
            }
        });
        const notifications = await models.Notification.findAll({
            where: {
                permanent: true
            }
        });

        res.status(200).send({ reminders, notifications });

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

export default router;