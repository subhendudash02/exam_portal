import axios from "axios";

const url = axios.create({
    baseURL: 'http://localhost:8000/api/teacher/'
  }) // django REST api

export default url;