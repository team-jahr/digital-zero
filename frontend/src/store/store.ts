import { configureStore } from '@reduxjs/toolkit';
import appAreaReducer from './area/areaSlice';
import appLocationReducer from './location/locationSlice';

export const store = configureStore({
  reducer: {
    setAppArea: appAreaReducer,
    setAppLocation: appLocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
