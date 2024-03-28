import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { mockAppLocation } from '../../data/data';
import { AppLocation } from '../../types/types';

interface AppLocationState {
  value: AppLocation;
}

const initialState: AppLocationState = {
  value: mockAppLocation,
};

const appLocationSlice = createSlice({
  name: 'appLocation',
  initialState: initialState,
  reducers: {
    setAppLocation: (state, action: PayloadAction<AppLocation>) => {
      state.value = action.payload;
    },
  },
});

export const { setAppLocation } = appLocationSlice.actions;

export default appLocationSlice.reducer;
