import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditModeState {
  value: boolean;
}

const initialState: EditModeState = {
  value: false,
};
const editModeSlice = createSlice({
  name: 'editMode',
  initialState,
  reducers: {
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;
