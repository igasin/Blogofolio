import { RootState } from '../store';

export const isDarkTheme = (state: RootState) => state.theme.theme === 'dark';
