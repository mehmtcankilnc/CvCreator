import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BottomSheetContentType =
  | 'EXAMPLE_CONTENT'
  | 'FILE_SETTINGS'
  | 'LANGUAGE_SETTINGS';

interface BottomSheetState {
  isOpen: boolean;
  content: {
    type: BottomSheetContentType | null;
    props: any;
  };
}

const initialState: BottomSheetState = {
  isOpen: false,
  content: {
    type: null,
    props: null,
  },
};

type OpenBottomSheetPayload = {
  type: BottomSheetContentType;
  props?: any;
};

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    openBottomSheet: (state, action: PayloadAction<OpenBottomSheetPayload>) => {
      state.isOpen = true;
      state.content.type = action.payload.type;
      state.content.props = action.payload.props || null;
    },
    closeBottomSheet: state => {
      state.isOpen = false;
    },
    clearBottomSheetContent: state => {
      state.content.type = null;
      state.content.props = null;
    },
  },
});

export const { openBottomSheet, closeBottomSheet, clearBottomSheetContent } =
  bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
