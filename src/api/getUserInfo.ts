import axiosInstance from './auth/axiosInstance';
import { urls } from './urls';

export const getUserInfo = async () => {
  const response = await axiosInstance.get(urls.GET_USERS_INFO);
  const { data } = response;
  return data;
};
