import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Area } from '../../types/types';
import { mockedArea } from '../../data/data';

interface AreaState {
  value: Area;
}

const initialState: AreaState = {
  value: mockedArea,
};

const areaSlice = createSlice({
  name: 'area',
  initialState: initialState,
  reducers: {
    setArea: (state, action: PayloadAction<Area>) => {
      state.value = action.payload;
    },
  },
});

export const { setArea } = areaSlice.actions;

export default areaSlice.reducer;
