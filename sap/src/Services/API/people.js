import {client} from './index';

export async function getPeopleList() {
  try {
    const response = await client.get(`/people/get`);
    return response.data;
  } catch (er) {
    console.log(er);
    return false;
  }
}
