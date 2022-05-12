import { client } from './index';

export async function addJournalEntry(data) {
    try {
        const response = await client.post(`/journal/add`, { answers: data, date: new Date() });
        return response.data;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getRandomEntry() {
    try {
        const response = await client.get(`/journal/getRandom`);
        return response.data;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getMonthlyData(data) {
    try {
        const response = await client.post(`/journal/getMonth`, { month: data.month, year: data.year });
        return response.data;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getJournal(data) {
    try {
        const response = await client.post(`/journal/getDay`, { month: data.month - 1, year: data.year, day: data.day + 1 });
        return response.data;
    } catch (e) {
        console.error(e);
        return false;
    }
}