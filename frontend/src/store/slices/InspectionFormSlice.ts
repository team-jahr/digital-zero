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
  editIssue: Issue | null;
  areaDisabled: boolean;
  areaValue: string;
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
  editIssue: null,
  areaDisabled: false,
  areaValue: '',
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
    setEditIssue: (state, action: PayloadAction<Issue | null>) => {
      state.editIssue = action.payload;
    },
    setIsAreaDisabled: (state, action: PayloadAction<boolean>) => {
      state.areaDisabled = action.payload;
    },
    setAreaValue: (state, action: PayloadAction<string>) => {
      state.areaValue = action.payload;
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
  setEditIssue,
  setIsAreaDisabled,
  setAreaValue,
} = inspectionFormSlice.actions;
export default inspectionFormSlice.reducer;
