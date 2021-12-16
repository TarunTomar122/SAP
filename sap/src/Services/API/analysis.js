import {client} from './index';

export async function getTasksInfo() {
  try {
    const response = await client.get(`/analyze/track`);
    return response;
  } catch (e) {
    console.error(e);
    return false;
  }
}
