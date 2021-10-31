import axios from 'axios';

export const client = axios.create({
  // baseURL: 'http://10.0.2.2:4040/api',
  baseURL: 'https://sap-server-taru.herokuapp.com/api',
  headers: {
    Accept: 'application/json',
  },
});
