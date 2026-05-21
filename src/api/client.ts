import axios from 'axios';

import type { ApiError } from '../types/api';

const client = axios.create({
  baseURL: 'https://swapi.info/api',
  timeout: 10000,
});

client.interceptors.request.use((config) => {
  // config.headers['X-App-Version'] = '1.0.0';
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError: ApiError = {
      status: error.response?.status ?? 0,
      message:
        error.response?.data?.detail ??
        error.message ??
        'An unexpected error occurred.',
      endpoint: error.config?.url ?? 'unknown',
    };
    return Promise.reject(normalizedError);
  }
);

export default client;
