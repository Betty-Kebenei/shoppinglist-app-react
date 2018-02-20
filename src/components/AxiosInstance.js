import axios from 'axios';
import promise from 'promise';

const instance = axios.create();

instance.interceptors.request.use( config => {
  const access_token = localStorage.getItem('access_token');

  if (access_token) {
    if (config.method !== 'OPTIONS') {
          config.headers.Authorization = `Bearer ${access_token}`;
        }
  }
  return config;
}, function (error) {
   return promise.reject(error);
});

export default instance;