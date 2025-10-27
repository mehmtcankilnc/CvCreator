import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAnonymous: boolean;
  userId: string | null;
}

const initialState: AuthState = {
  isAnonymous: false,
  userId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAnon: (state, action: PayloadAction<boolean>) => {
      state.isAnonymous = action.payload;
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.isAnonymous = false;
      state.userId = action.payload;
    },
    logout: state => {
      state.isAnonymous = true;
      state.userId = '';
    },
  },
});

export const { setAnon, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
