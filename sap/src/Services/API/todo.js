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

export async function getTodos() {
    try {
        const response = await client.get(`/todo/get`);
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function deleteTodo({ title }) {
    try {
        const response = await client.post(`/todo/delete`, { title });
        return response;
    } catch (e) {
        console.error(e);
        return false;
    }
}