import { LIMIT_POSTS } from '../constants/limit';

export const BASE_URL = 'https://studapi.teachmeskills.by';

export const urls = {
  GET_POSTS: `${BASE_URL}/blog/posts?lesson_num=2023&limit=${LIMIT_POSTS}`,
  GET_POST: `${BASE_URL}/blog/posts/`,
  AUTH_USERS: `${BASE_URL}/auth/users/`,
  AUTH_USERS_ACTIVATION: `${BASE_URL}/auth/users/activation/`,
  AUTH_CREATE_JWT: `${BASE_URL}/auth/jwt/create/`,
  AUTH_REFRESH_JWT: `${BASE_URL}/auth/jwt/refresh/`,
  AUTH_VERIFY_JWT: `${BASE_URL}/auth/jwt/verify/`,
  GET_USERS_INFO: `${BASE_URL}/auth/users/me/`,
  POST_NEW_POST: `${BASE_URL}/blog/posts/`,
  GET_MY_POSTS: `${BASE_URL}/blog/posts/my_posts/`,
  GET_ORDERING_POSTS: `${BASE_URL}/blog/posts/?ordering=`,
};
