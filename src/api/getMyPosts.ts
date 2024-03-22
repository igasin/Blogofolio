import axios from 'axios';
import { urls } from './urls';

const limit = 12;
const offset = 0;

export const getMyPosts = async (token: string) => {
  try {
    const response = await axios.get(`${urls.GET_MY_POSTS}?limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;
    return data.results;
  } catch (error) {
    throw new Error(`Error while getting my posts: ${error}`);
  }
};
