import axios from 'axios';

export const BASE_URL = 'https://api.shrtco.de/v2/';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
