import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../../interfaces/IPost';
import { getPosts } from '../../api/getPosts';
import { IPostsParams } from '../../interfaces/IPostsParams';
import { IPostsState } from './interfaces';
import { getMyPosts } from '../../api/getMyPosts';

const initialState: IPostsState = {
  loading: false,
  postsAll: null,
  favoritesPosts: null,
  myPosts: null,
  error: null,
  searchValue: '',
  countPosts: 0,
};

export const getMyPostsAction = createAsyncThunk(
  'posts/getMyPosts',
  async (token: string) => {
    try {
      const myPosts = await getMyPosts(token);
      return myPosts;
    } catch (error) {
      throw new Error(`Error while getting my posts: ${error}`);
    }
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPostsRequest: (state) => ({
      ...state,
      loading: true,
      error: null,
      countPosts: 0,
    }),
    getPostsSuccess: (
      state,
      action: PayloadAction<{
        posts: IPost[];
        count: number;
        searchValue?: string;
      }>,
    ) => ({
      ...state,
      loading: false,
      postsAll: action.payload.posts,
      countPosts: action.payload.count,
      searchValue: action.payload.searchValue || '',
    }),
    getPostsError: (state) => ({
      ...state,
      loading: false,
      error: 'Unknown error',
    }),
    setLike(state, action: PayloadAction<number>) {
      const postId = action.payload;
      state.postsAll = state.postsAll?.map((post) => (post.id === postId ? { ...post, like: post.like + 1 } : post));
      state.favoritesPosts = state.favoritesPosts?.map((post) => (post.id === postId ? { ...post, like: post.like + 1 } : post));
    },
    setDislike(state, action: PayloadAction<number>) {
      const postId = action.payload;
      state.postsAll = state.postsAll?.map((post) => (post.id === postId ? { ...post, dislike: post.dislike + 1 } : post));
      state.favoritesPosts = state.favoritesPosts?.map((post) => (post.id === postId ? { ...post, dislike: post.dislike + 1 } : post));
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const postId = action.payload;
      state.postsAll = state.postsAll?.map((post) => (post.id === postId ? { ...post, isFavorite: !post.isFavorite } : post));
    },
    setFavorite(state) {
      state.favoritesPosts = state.postsAll?.filter((post) => post.isFavorite);
    },
    resetPosts() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyPostsAction.fulfilled, (state, action) => ({
      ...state, myPosts: action.payload,
    }));
    builder.addCase(getMyPostsAction.rejected, (state, action) => ({
      ...state,
      error: action.error.message || null,
    }));
  },
});

export const getPostsAction = createAsyncThunk(
  'posts/getPosts',
  async ({ searchValue, offset, ordering }: IPostsParams, { dispatch }) => {
    try {
      dispatch(postsSlice.actions.getPostsRequest());
      const { results, count } = await getPosts({ searchValue, offset, ordering });
      const dataWithAddFields: IPost[] = results.map((post) => ({
        ...post,
        like: 0,
        dislike: 0,
        isFavorite: false,
      }));
      if (searchValue) {
        dispatch(
          postsSlice.actions.getPostsSuccess({
            posts: dataWithAddFields,
            count,
            searchValue,
          }),
        );
      } else {
        dispatch(
          postsSlice.actions.getPostsSuccess({
            posts: dataWithAddFields,
            count,
            searchValue: '',
          }),
        );
      }
    } catch (error) {
      dispatch(postsSlice.actions.getPostsError());
    }
  },
);

export const resetPostsAction = createAsyncThunk(
  'posts/resetPosts',
  async (_, { dispatch }) => {
    dispatch(postsSlice.actions.resetPosts());
  },
);

export const {
  getPostsRequest,
  getPostsSuccess,
  getPostsError,
  setLike,
  setDislike,
  toggleFavorite,
  setFavorite,
  resetPosts,
} = postsSlice.actions;

export default postsSlice.reducer;
