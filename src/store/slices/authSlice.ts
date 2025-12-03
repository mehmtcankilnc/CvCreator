import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserPayload {
  id: string;
  name: string | null;
}

interface AuthState {
  isAnonymous: boolean;
  userId: string | null;
  userName: string | null;
}

const initialState: AuthState = {
  isAnonymous: false,
  userId: '',
  userName: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAnon: (state, action: PayloadAction<boolean>) => {
      state.isAnonymous = action.payload;
      state.userId = '';
      state.userName = '';
    },
    setUser: (state, action: PayloadAction<UserPayload>) => {
      state.isAnonymous = false;
      state.userId = action.payload.id;
      state.userName = action.payload.name;
    },
  },
});

export const { setAnon, setUser } = authSlice.actions;
export default authSlice.reducer;
