import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IssueFormState {
  isDrawerOpen: boolean;
  pictures: string[];
  enlargedImage: string | null;
}

const initialState: IssueFormState = {
  isDrawerOpen: false,
  pictures: [],
  enlargedImage: null,
};
const issueFormSlice = createSlice({
  name: 'issueForm',
  initialState,
  reducers: {
    setShowDrawer: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    setPictures: (state, action: PayloadAction<string[]>) => {
      state.pictures = action.payload;
    },
    setEnlargedImage: (state, action: PayloadAction<string | null>) => {
      state.enlargedImage = action.payload;
    },
  },
});

export const { setShowDrawer, setPictures, setEnlargedImage } =
  issueFormSlice.actions;
export default issueFormSlice.reducer;
