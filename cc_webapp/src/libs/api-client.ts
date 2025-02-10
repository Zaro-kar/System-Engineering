import Axios, { InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '@/configs/index';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
   if (config.headers) {
      config.headers.Accept = 'application/json';
   }

   config.withCredentials = true;
   return config;
}

export const api = Axios.create({
   baseURL: API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
   (response) => {
      return response.data;
   },
   (error) => {
      if (error.response?.status == 401) {
         return null;
      }

      return Promise.reject(error);
   },
);
