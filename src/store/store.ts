import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './theme/themeSlice';
import postsSlice from './posts/postsSlice';
import confirmEmailSlice from './confirmEmail/confirmEmailSlice';
import authSlice from './auth/authSlice';
import userInfoSlice from './userInfo/userInfoSlice';
import tabsReducer from './tabs/tabsSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    posts: postsSlice,
    confirmEmail: confirmEmailSlice,
    auth: authSlice,
    userInfo: userInfoSlice,
    tab: tabsReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
