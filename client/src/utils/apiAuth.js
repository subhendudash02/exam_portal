import axios from 'axios';

const url = axios.create({
  baseURL: 'http://localhost:8000/api/student/',
}); // django REST api

export default url;
