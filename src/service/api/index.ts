import axios, { InternalAxiosRequestConfig } from 'axios';
import { serverUrl, tokenType } from '@constants/index';
import { getAuthToken } from '@service/local';

const axiosInstance = axios.create({
  baseURL: serverUrl,
});

axiosInstance.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: InternalAxiosRequestConfig<any>) => {
    config.headers.Authorization = `${tokenType} ${getAuthToken()}`;
    return config;
  },
);

export const signIn = (email: string, password: string) => {
  return axios.post(
    'https://omr.external.api.halbestunde.com/service-auth/auth/signin',
    { email, password },
  );
};

export const generatePresignedUploadUrl = (filename: string) => {
  return axiosInstance.get('/recognize/presigned-upload', {
    params: {
      filename,
    },
  });
};

export const getResults = (referenceId: string) => {
    return axiosInstance.get(`/recognize/${referenceId}`);
}
