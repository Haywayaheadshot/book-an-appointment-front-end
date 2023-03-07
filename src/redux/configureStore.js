import { configureStore } from '@reduxjs/toolkit';
import doctorsSlice from './landingPage/LandingPage';
import usersSlice from './users/Users';

const reduxLogger = require('redux-logger');

const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    doctors: doctorsSlice,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
