import Axios, { InternalAxiosRequestConfig } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { API_URL } from '@/configs';

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
      if (response.data.message) {
         enqueueSnackbar(response.data.message, {
            variant: 'success',
         });
      }
      return response.data.data;
   },
   (error) => {
      const message = error.response?.data?.message || error.message;
      if (error.response?.status == 401) {
         return null;
      }

      enqueueSnackbar(message, {
         variant: 'error',
      });

      return Promise.reject(error);
   },
);