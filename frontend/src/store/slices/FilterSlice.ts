// filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  isSubmitted: boolean;
  selectedInspector: string | null;
  selectedDate: Date | null;
  selectedLocation: string | null;
}

const initialState: FilterState = {
  isSubmitted: false,
  selectedInspector: null,
  selectedDate: null,
  selectedLocation: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setIsSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    setSelectedInspector: (state, action: PayloadAction<string | null>) => {
      state.selectedInspector = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<Date | null>) => {
      state.selectedDate = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<string | null>) => {
      state.selectedLocation = action.payload;
    },
  },
});

export const {
  setIsSubmitted,
  setSelectedInspector,
  setSelectedDate,
  setSelectedLocation,
} = filterSlice.actions;
export default filterSlice.reducer;
