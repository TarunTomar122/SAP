import axios from 'axios';

export const client = axios.create({
  // baseURL: 'http://10.0.2.2:4040/api',
  baseURL: 'http://52.184.99.59:4040/api',
  headers: {
    Accept: 'application/json',
  },
});
