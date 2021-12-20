import { client } from './index';

export async function setNotifToken({ userType, notificationToken }) {
    try {
        const response = await client.post(`/notif/saveToken`, { userType, notificationToken });
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
}