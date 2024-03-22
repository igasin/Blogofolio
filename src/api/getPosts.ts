import axios from 'axios';
import { IPost } from '../interfaces/IPost';
import { IPostsParams } from '../interfaces/IPostsParams';
import { urls } from './urls';

type PostsType = Omit<IPost, 'like' | 'dislike' | 'isFavorite'>;

interface IResponse {
  results: PostsType[];
  count: number;
}

export const getPosts = async ({
  searchValue = '',
  offset = 0,
  ordering = '',
}: IPostsParams): Promise<IResponse> => {
  const response = await axios.get(
    `${urls.GET_POSTS}&search=${searchValue}&offset=${offset}&ordering=${ordering}`,
  );
  const { data } = response;
  return data;
};
