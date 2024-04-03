import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inspection } from '../../types/types';

interface InspectionsState {
  inspections: Inspection[];
}

const initialState: InspectionsState = {
  inspections: [],
};

const inspectionsSlice = createSlice({
  name: 'inspections',
  initialState,
  reducers: {
    setInspections(state, action: PayloadAction<Inspection[]>) {
      state.inspections = action.payload;
    },
  },
});

export const { setInspections } = inspectionsSlice.actions;
export default inspectionsSlice.reducer;
