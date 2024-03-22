import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../api/getUserInfo';
// import { RootState } from '../store';
import { IUser } from '../../interfaces/IUser';
import { IUserInfoState } from './interfaces';

const initialState: IUserInfoState = {
  user: null,
  loading: false,
  error: null,
};

export const getUserInfoAction = createAsyncThunk(
  'userInfo/getUserInfo',
  async (): Promise<IUser> => {
    const user: IUser = await getUserInfo();
    return user;
  },
);

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    resetUserInfoAction: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfoAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserInfoAction.rejected, (state) => {
        state.loading = false;
        state.error = 'Unknown error';
      });
  },
});

export const { resetUserInfoAction } = userInfoSlice.actions;

// export const selectUserInfo = (state: RootState) => state.userInfo;

export default userInfoSlice.reducer;
