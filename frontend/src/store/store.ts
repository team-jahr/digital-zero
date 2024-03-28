import { configureStore } from '@reduxjs/toolkit';
import areaReducer from './area/areaSlice';
import locationReducer from './location/locationSlice';

export const store = configureStore({
  reducer: {
    setArea: areaReducer,
    setLocation: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
