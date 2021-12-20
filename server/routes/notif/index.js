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
        res.status(200).send(notification);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

export default router;