import { createSlice } from '@reduxjs/toolkit';

export type ThemeType = 'light' | 'dark';

interface IThemeState {
  theme: ThemeType;
}

const initialState: IThemeState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => ({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light',
    }),
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
