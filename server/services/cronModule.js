import schedule from 'node-schedule';
import models, { sequelize } from '../models';

import NotificationService from './notification';

function convertTime12To24(time) {
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM === "PM" && hours < 12) hours = hours + 12;
    if (AMPM === "AM" && hours === 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return (sHours + ":" + sMinutes);
}


const startSchedule = async () => {

    for (const job in schedule.scheduledJobs) schedule.cancelJob(job);

    var notifications = await models.Notification.findAll({});

    // let endOfDay = "00 00 * * *";

    // cron job to run per minutes
    let endOfDay = "* * * * *";

    schedule.scheduleJob(endOfDay, async () => {

        // Get all the reminders having description as get up and workout mfker
        const reminders = await models.Reminder.findAll({
            where: {
                description: "get up and workout mfker"
            }
        });

        // Get all the notifications having description as get up and workout mfker
        const notifications = await models.Notification.findAll({
            where: {
                description: "get up and workout mfker"
            }
        });

        console.log("reminders", reminders);
        console.log("notifications", notifications);

        // remove all the reminders and notifications
        for (const reminder of reminders) {
            await models.Reminder.destroy({
                where: {
                    id: reminder.id
                }
            });
        }

        for (const notification of notifications) {
            await models.Notification.destroy({
                where: {
                    id: notification.id
                }
            });
        }

    })

    for (var notification of notifications) {

        const obj = notification.dataValues;


        // Schedule for exact time
        const time = obj.exactTime;
        const timeIn24 = convertTime12To24(time);

        const hours = timeIn24.split(":")[0];
        const minutes = timeIn24.split(":")[1];

        // Convert minutes to integer and add 30 to it
        const mnsUpdates = parseInt(minutes) + 30;

        // Convert hours to integer and subtract 6 from it 
        const hrsUpdates = parseInt(hours) - 6;

        const stime = mnsUpdates.toString() + " " + hrsUpdates.toString() + " * * *";

        schedule.scheduleJob(stime, async () => {

            const payload = {
                title: obj.title,
                body: obj.description,
            }

            // get all the notificationToken from users and send notifications
            const users = await models.User.findAll({});

            const tokens = [];

            for (const user of users) {
                const token = user.dataValues.notificationToken;
                if (token) tokens.push(token);
            }

            NotificationService.send(tokens, payload).then(() => {
                console.log("Notification sent");
            }).catch(err => {
                console.log(err);
            });

        })
    }
}


module.exports = startSchedule;