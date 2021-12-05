import {client} from './index';

export async function addThought({name, rating, thought}) {
  try {
    const response = await client.post(`/thought/add`, {name, rating, thought});
    return response;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getThoughts(name) {
  try {
    const response = await client.post(`/thought/get`, {name});
    return response.data;
  } catch (e) {
    console.error(e);
    return false;
  }
}
