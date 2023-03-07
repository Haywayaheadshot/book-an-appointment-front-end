import { configureStore } from '@reduxjs/toolkit';
import doctorsSlice from './landingPage/LandingPage';

const reduxLogger = require('redux-logger');

const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    doctors: doctorsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
