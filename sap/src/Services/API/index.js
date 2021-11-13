import axios from 'axios';

export const client = axios.create({
  // baseURL: 'http://10.0.2.2:4040/api',
  baseURL: 'http://13.75.80.111:4040/api',
  headers: {
    Accept: 'application/json',
  },
});
