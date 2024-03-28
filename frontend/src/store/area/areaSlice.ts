import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppArea } from '../../types/types';
import { mockedAppArea } from '../../data/data';

interface AppAreaState {
  value: AppArea;
}

const initialState: AppAreaState = {
  value: mockedAppArea,
};

const appAreaSlice = createSlice({
  name: 'appArea',
  initialState: initialState,
  reducers: {
    setAppArea: (state, action: PayloadAction<AppArea>) => {
      state.value = action.payload;
    },
  },
});

export const { setAppArea } = appAreaSlice.actions;

export default appAreaSlice.reducer;
