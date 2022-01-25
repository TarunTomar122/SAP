import { client } from './index';

export async function setReminder(obj) {
    try {
        const response = await client.post(`/notif/add`, obj);
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getReminder(title) {
    try {
        const response = await client.post(`/notif/get`, { title });
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function deleteReminder(title) {
    try {
        const response = await client.post(`/notif/delete`, { title });
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
}