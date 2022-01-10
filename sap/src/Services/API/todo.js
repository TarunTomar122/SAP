import { client } from './index';

export async function addTodo({ title, description }) {
    try {
        const response = await client.post(`/todo/add`, { title, description });
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getTodos({ }) {
    try {
        const response = await client.post(`/todo/get`);
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
}