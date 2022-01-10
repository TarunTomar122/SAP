import axios from 'axios';
import { ARTICLE_API_URL, MAIN_API_URL } from "@env"

export const client = axios.create({
  // baseURL: 'http://10.0.2.2:4040/api',
  // baseURL: 'http://52.184.99.59:4040/api',
  baseURL: MAIN_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

export const articleClient = axios.create({
  // baseURL: 'http://10.0.2.2:8080',
  baseURL: ARTICLE_API_URL,
  timeout: 8000,
  headers: {
    Accept: 'application/json',
  },
});

function temp() {
  console.log("URL", ARTICLE_API_URL)
}

temp()