import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bottomSheetReducer from './slices/bottomSheetSlice';
import themeReducer from './slices/themeSlice';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bottomSheet: bottomSheetReducer,
    theme: themeReducer,
    language: languageReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
