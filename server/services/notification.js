const PushNotification = require('node-pushnotifications');

const config = {
    gcm: {
        id: "AAAAvN0qC_c:APA91bG7SFD_LpjnqYbbdBw0b1qTDPWwhSjCRVFDLpOStH1IU-W3wlYBjuJ4DsdUnwdPkFbJ6vA-uVm7aoWa9Y7XhLALza6-uaG_MeUEEefkKQbQIs9dsDJ85jAyBZC7-GYUunI6DsfY"
    },
    isAlwaysUseFCM: true,
}

const NotificationService = new PushNotification(config);

module.exports = NotificationService;