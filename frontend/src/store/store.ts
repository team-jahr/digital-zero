import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/AppSlice.ts';
import inspectionFormReducer from './slices/InspectionFormSlice.ts';
import issueFormReducer from './slices/IssueFormSlice.ts';
import popUpReducer from './slices/PopUpSlice.ts';
import inspectionsReducer from './slices/InspectionsSlice.ts';
import filterReducer from './slices/FilterSlice.ts';
import inspectionDisplaysReducer from './slices/InspectionDisplaysSlice.ts';

export const store = configureStore({
  reducer: {
    app: appReducer,
    inspectionForm: inspectionFormReducer,
    issueForm: issueFormReducer,
    popUp: popUpReducer,
    inspections: inspectionsReducer,
    filter: filterReducer,
    inspectionDisplays: inspectionDisplaysReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
