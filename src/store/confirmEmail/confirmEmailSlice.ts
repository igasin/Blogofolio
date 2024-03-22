import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../store';

interface IConfirmEmailState {
  confirmEmail: string;
}

const initialState: IConfirmEmailState = {
  confirmEmail: '',
};

const confirmEmailSlice = createSlice({
  name: 'confirmEmail',
  initialState,
  reducers: {
    setConfirmEmailAction: (state, action: PayloadAction<string>) => ({
      ...state,
      confirmEmail: action.payload,
    }),
    resetConfirmEmailAction: (state) => ({ ...state, confirmEmail: '' }),
  },
});

export const {
  setConfirmEmailAction,
  resetConfirmEmailAction,
} = confirmEmailSlice.actions;

// export const selectConfirmEmail = (state: RootState) => state.confirmEmail.confirmEmail;

export default confirmEmailSlice.reducer;
