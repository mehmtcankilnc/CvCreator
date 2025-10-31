import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeTypes = 'DARK' | 'LIGHT';

interface ThemeState {
  theme: ThemeTypes;
}

const initialState: ThemeState = {
  theme: 'LIGHT',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeTypes>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
