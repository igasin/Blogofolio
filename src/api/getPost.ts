import axios from 'axios';
import { urls } from './urls';

interface IGetPost {
  id: string;
}

export const getPost = async ({ id }: IGetPost) => {
  const response = await axios.get(`${urls.GET_POST}/${id}`);
  const { data } = response;
  return data;
};
