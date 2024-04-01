import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location, Area, Issue } from '../../types/types.ts';

interface InspectionFormState {
  defaultLocation: Location;
  selectedLocation: Location;
  allLocations: Location[];
  otherLocations: Location[];
  isSubmitted: boolean;
  isSendEmailChecked: boolean;
  areas: Area[];
  listOfIssues: Issue[];
}

const initialState: InspectionFormState = {
  defaultLocation: { id: 1, name: 'Stockholm' },
  selectedLocation: { id: 1, name: 'Stockholm' },
  allLocations: [],
  otherLocations: [],
  isSubmitted: false,
  isSendEmailChecked: false,
  areas: [],
  listOfIssues: [],
};
const inspectionFormSlice = createSlice({
  name: 'inspectionForm',
  initialState,
  reducers: {
    setDefaultLocation: (state, action: PayloadAction<Location>) => {
      state.defaultLocation = action.payload;
    },
    setAllLocations: (state, action: PayloadAction<Location[]>) => {
      state.allLocations = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
    setOtherLocations: (state, action: PayloadAction<Location[]>) => {
      state.otherLocations = action.payload;
    },
    setIsSubmitted: (state, action: PayloadAction<boolean>) => {
      state.isSubmitted = action.payload;
    },
    setSendEmail: (state, action: PayloadAction<boolean>) => {
      state.isSendEmailChecked = action.payload;
    },
    setAllAreas: (state, action: PayloadAction<Area[]>) => {
      state.areas = action.payload;
    },
    setListOfIssues: (state, action: PayloadAction<Issue[]>) => {
      state.listOfIssues = action.payload;
    },
  },
});

export const {
  setAllLocations,
  setSelectedLocation,
  setDefaultLocation,
  setOtherLocations,
  setIsSubmitted,
  setSendEmail,
  setAllAreas,
  setListOfIssues,
} = inspectionFormSlice.actions;
export default inspectionFormSlice.reducer;
