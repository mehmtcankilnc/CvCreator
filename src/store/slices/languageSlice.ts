import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LanguageTypes = 'en' | 'tr';

interface LanguageState {
  lang: LanguageTypes;
}

const initialState: LanguageState = {
  lang: 'en',
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
