import axios, { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';
import { urls } from '../urls';

interface IPostLogin {
  email: string;
  password: string;
}

interface IRefreshAccessToken {
  refresh: string;
}

interface IVerifyTokenData {
  token: string;
}

export const createToken = async (formData: IPostLogin) => {
  const response = await axiosInstance.post(urls.AUTH_CREATE_JWT, formData);
  return response.data;
};

export const refreshAccessToken = async (
  refreshTokenData: IRefreshAccessToken,
) => {
  const response = await axiosInstance.post(urls.AUTH_REFRESH_JWT, refreshTokenData);
  return response.data;
};

export const apiErrorHandler = async (err: AxiosError) => {
  if (err.response?.status === 401) {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      const response = await refreshAccessToken({ refresh: refreshToken });
      localStorage.setItem('access_token', response.access);
      const { config } = err;
      if (config) {
        config.headers.authorization = `Bearer ${response.access}`;
        return axios.request(config);
      }
    }
  }
  throw err;
};

export const verifyAccessToken = async (verifyTokenData: IVerifyTokenData) => {
  const response = await axiosInstance
    .post(urls.AUTH_VERIFY_JWT, verifyTokenData)
    .catch(apiErrorHandler);
  return response.data;
};
