import {client} from './index';

export async function getTasks() {
  return client.get(`/task/get`);
}

export async function addTask({taskName, goal}) {
  return client.post(`/task/add`, {taskName, goal});
}

export async function addCountTask({taskName, count}) {
  return client.post(`/task/addCount`, {taskName, count});
}

export async function getLatestTasks(taskName) {
  return client.get(`/task/getLatest`, {taskName});
}
