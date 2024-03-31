import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/AppSlice.ts';
import inspectionFormReducer from './slices/InspectionFormSlice.ts';

export const store = configureStore({
  reducer: {
    app: appReducer,
    inspectionForm: inspectionFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
