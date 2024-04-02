import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  showInspectionForm: boolean;
  formId: number | undefined;
}

const initialState: AppState = {
  showInspectionForm: false,
  formId: undefined,
};
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setShowInspectionForm: (state, action: PayloadAction<boolean>) => {
      state.showInspectionForm = action.payload;
    },
    setFormId: (state, action: PayloadAction<number | undefined>) => {
      state.formId = action.payload;
    },
  },
});

export const { setShowInspectionForm, setFormId } = appSlice.actions;
export default appSlice.reducer;
