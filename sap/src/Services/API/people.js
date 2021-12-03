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

export async function getTags() {
  try {
    const response = await client.get(`/people/getTags`);
    return response.data;
  } catch (er) {
    console.log(er);
    return false;
  }
}

export async function addPerson(person) {
  try {
    const response = await client.post(`/people/add`, person);
    return response.data;
  } catch (er) {
    console.log(er);
    return false;
  }
}
