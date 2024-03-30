import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  showInspectionForm: boolean;
}

const initialState: AppState = {
  showInspectionForm: false,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setShowInspectionForm: (state, action: PayloadAction<boolean>) => {
      state.showInspectionForm = action.payload;
    },
  },
});

export const { setShowInspectionForm } = appSlice.actions;
export default appSlice.reducer;
