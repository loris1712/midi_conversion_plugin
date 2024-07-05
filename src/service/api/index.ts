import axios, {InternalAxiosRequestConfig} from 'axios'
import { serverUrl, tokenType } from '@constants/index';
import { getAuthToken } from '@service/local';



const axiosInstance = axios.create({
    baseURL: serverUrl,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  config.headers.Authorization = `${tokenType} ${getAuthToken()}`;
  return config
});


export const generatePresignedUploadUrl = (filename: string) => {
    return axiosInstance.get('/recognize/presigned-upload', {
        params: {
            filename
        }
    });
}