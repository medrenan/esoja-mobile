import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.16.8.137:3333/'
  // baseURL: 'https://api-esoja.herokuapp.com/v1'
});

export const api2= axios.create({
  baseURL:'http://172.16.8.137:8080'
})
