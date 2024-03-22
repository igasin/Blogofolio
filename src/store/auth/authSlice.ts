import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
  isLogged: boolean;
}

const initialState: IAuthState = {
  isLogged: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogged: (state) => ({ ...state, isLogged: true }),
    setLogout: (state) => ({ ...state, isLogged: false }),
  },
});

export const { setLogged, setLogout } = authSlice.actions;
export default authSlice.reducer;
