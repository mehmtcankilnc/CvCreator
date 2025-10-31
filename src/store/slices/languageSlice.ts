import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LanguageTypes = 'TR' | 'EN';

interface LanguageState {
  lang: LanguageTypes;
}

const initialState: LanguageState = {
  lang: 'EN',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageTypes>) => {
      state.lang = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
