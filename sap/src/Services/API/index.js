import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://10.0.2.2:3001/api',
  headers: {
    Accept: 'application/json',
  },
});
