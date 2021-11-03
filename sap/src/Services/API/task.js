import {client} from './index';

export async function getTasks() {
  try {
    const response = await client.get(`/task/get`);
    return response.data;
  } catch (er) {
    console.log(er);
    return false;
  }
}

export async function getTodaysTasks() {
  try {
    const response = await client.get(`/task/getTodaysTasks`);
    return response.data;
  } catch (er) {
    console.log(er);
    return false;
  }
}

export async function addTask(taskName, goal) {
  try {
    const response = await client.post(`/task/add`, {taskName, goal});
    return response.data;
  } catch (er) {
    console.log(er);
    return false;
  }
}

export async function addCountTask(taskName, count) {
  try {
    const response = await client.post(`/task/addCount`, {taskName, count});
    return response.data;
  } catch (er) {
    console.log(er);
    return false;
  }
}

export async function getLatestTasks(taskName) {
  try {
    const response = await client.post(`/task/getLatest`, {taskName});
    return response.data;
  } catch (er) {
    console.log(er);
    return false;
  }
}

export async function deleteTask(taskName) {
  try {
    const response = await client.post(`/task/deleteTodaysTask`, {taskName});
    return response.data;
  } catch (er) {
    console.log(er);
    return false;
  }
}
