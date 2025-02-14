import axios, { InternalAxiosRequestConfig } from 'axios';
import { serverUrl, tokenType, apiKey } from '@constants/index';
import { getAuthToken } from '@service/local';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const axiosInstance = axios.create({
  baseURL: serverUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Origin': null,

  },
});


axiosInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: InternalAxiosRequestConfig<any>) => {
    config.headers.Authorization = `${tokenType} ${getAuthToken()}`;
    config.headers['Api-Key'] = apiKey;
    return config;
  },
);

export const signIn = () => {
  return axios.get('https://halbestunde.netlify.app/api/auth');
};

export const generatePresignedUploadUrl = (filename: string) => {
  return axiosInstance.get('/recognize/presigned-upload', {
    params: {
      filename,
    },
  });
};

export const postUploadedFile = (payload: {
  filename: string;
  pdf_image: boolean;
}) => {
  return axiosInstance.post('/v2/recognize/presigned-upload', payload);
};

export const getResults = (inferenceId: string) => {
    return axiosInstance.get(`/v2/recognize/${inferenceId}`);
}
