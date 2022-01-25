import { Router } from "express";
import models from "../../models";
import NotificationService from "../../services/notification";

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
        const notification = await models.Notification.create(obj);
        res.status(200).send(notification);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

router.post("/get", async (req, res) => {
    try {

        const { title } = req.body;

        const notification = await models.Notification.findOne({
            where: {
                title,
            },
        });

        res.status(200).send(notification);

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

router.post("/delete", async (req, res) => {
    try {

        const { title } = req.body;

        const notification = await models.Notification.destroy({
            where: {
                title,
            },
        });

        res.status(200).send();

    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
})

export default router;