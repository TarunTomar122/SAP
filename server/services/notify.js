import NotificationService from "./notification";
import models from "../models";

const notify = async (payload) => {

    const users = await models.User.findAll({});
    const reg_ids = [];

    for (var user of users) {
        reg_ids.push(user.dataValues.notificationToken);
    }

    NotificationService.send(reg_ids, payload).then(() => {
        console.log("Notification sent");
    }).catch(err => {
        console.log(err);
    });

}

module.exports = notify;