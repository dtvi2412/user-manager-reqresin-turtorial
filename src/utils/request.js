import axios from 'axios';

const httpRequest = axios.create({
  baseURL: 'https://reqres.in/api/',
});

export default httpRequest;
