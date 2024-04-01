import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location, Area, Issue } from '../../types/types.ts';

interface InspectionFormState {
  defaultLocation: Location;
  selectedLocation: Location;
  allLocations: Location[];
  otherLocations: Location[];
  isDraft: boolean;
  isSendEmailChecked: boolean;
  areas: Area[];
  listOfIssues: Issue[];
  editIssue: Issue | null;
}

const initialState: InspectionFormState = {
  defaultLocation: { id: 1, name: 'Stockholm' },
  selectedLocation: { id: 1, name: 'Stockholm' },
  allLocations: [],
  otherLocations: [],
  isDraft: false,
  isSendEmailChecked: false,
  areas: [],
  listOfIssues: [],
  editIssue: null,
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
    setIsDraft: (state, action: PayloadAction<boolean>) => {
      state.isDraft = action.payload;
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
    setEditIssue: (state, action: PayloadAction<Issue>) => {
      state.editIssue = action.payload;
    },
  },
});

export const {
  setAllLocations,
  setSelectedLocation,
  setDefaultLocation,
  setOtherLocations,
  setIsDraft,
  setSendEmail,
  setAllAreas,
  setListOfIssues,
  setEditIssue,
} = inspectionFormSlice.actions;
export default inspectionFormSlice.reducer;
