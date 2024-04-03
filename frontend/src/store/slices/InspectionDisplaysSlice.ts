import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InspectionDisplay } from '../../types/types';

interface InspectionDisplaysState {
  inspectionsDisplays: InspectionDisplay[];
}

const initialState: InspectionDisplaysState = {
  inspectionsDisplays: [],
};

const inspectionDisplaysSlice = createSlice({
  name: 'inspectionsDisplays',
  initialState,
  reducers: {
    setInspectionDisplays(state, action: PayloadAction<InspectionDisplay[]>) {
      state.inspectionsDisplays = action.payload;
    },
  },
});

export const { setInspectionDisplays } = inspectionDisplaysSlice.actions;
export default inspectionDisplaysSlice.reducer;
