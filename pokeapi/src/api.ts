import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // URL do json-server
});

export default api;