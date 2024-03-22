import { IPost } from '../../interfaces/IPost';

export interface IPostsState {
  loading: boolean;
  postsAll: IPost[] | null;
  favoritesPosts: IPost[] | null;
  myPosts: IPost[] | null;
  error: string | null;
  searchValue?: string;
  countPosts: number;
}
