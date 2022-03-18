import axios from 'axios';
import { ARTICLE_API_URL, MAIN_API_URL, AUTO_API_URL } from "@env"

export const client = axios.create({
  baseURL: 'http://10.0.2.2:4040/api',
  // baseURL: 'http://52.184.99.59:4040/api',
  // baseURL: MAIN_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

export const articleClient = axios.create({
  // baseURL: 'http://10.0.2.2:5000',
  baseURL: ARTICLE_API_URL,
  // baseURL: 'http://172.30.28.65:5000/',
  timeout: 8000,
  headers: {
    Accept: 'application/json',
  },
});

export const autoClient = axios.create({
  baseURL: AUTO_API_URL,
  timeout: 8000,
  headers: {
    Accept: 'application/json',
  },
})
