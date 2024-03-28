import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { allMockedLocations } from '../../data/data';
import { Location } from '../../types/types';

interface LocationState {
  value: Location;
}

const initialState: LocationState = {
  value: allMockedLocations[0],
};

const locationSlice = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      state.value = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
