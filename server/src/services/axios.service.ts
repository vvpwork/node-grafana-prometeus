/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/typedef */
import axios, { AxiosInstance, AxiosError } from 'axios';
import c from 'config';
import { logger } from '.';

export class Axios {
  api: AxiosInstance;
  constructor(baseUrl: string, headers?: { [key: string]: string }) {
    this.api = axios.create({
      baseURL: baseUrl,
      timeout: 20000,

      headers: { ...headers },
    });
    this.api.interceptors.request.use(
      config => {
        const { baseURL, params, url } = config;
        // config.headers['Content-Type'] = 'application/json';
        logger.info({ baseURL, params, url });
        return config;
      },
      error => {
        Promise.reject(error);
      },
    );
    this.api.interceptors.response.use(
      res => res.data,
      (err: AxiosError) => {
        if (err.response) throw new Error(err.response!.data.message);
        else throw new Error(err.message);
      },
    );
  }
}
