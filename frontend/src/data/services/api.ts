import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://23.21.116.212:3333/'
  // baseURL: 'https://api-esoja.herokuapp.com/v1'
});

export const api2 = axios.create({
  baseURL: 'http://35.174.222.106:5000/'
});
