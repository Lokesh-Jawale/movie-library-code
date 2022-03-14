import { configureStore } from '@reduxjs/toolkit';
import appDataReducer from '../features/appDataSlice';

export const store = configureStore({
  reducer: {
    appData : appDataReducer
  },
});