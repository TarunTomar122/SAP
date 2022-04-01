import { client } from './index';

export async function addThought({ name, rating, thought, title }) {
  try {
    const response = await client.post(`/thought/add`, {
      name,
      rating,
      thought,
      title,
    });
    return response;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function getThoughts() {
  try {
    const response = await client.post(`/thought/get`);
    return response.data;
  } catch (e) {
    console.error(e);
    return false;
  }
}


