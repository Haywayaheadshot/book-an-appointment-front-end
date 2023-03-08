import { configureStore } from '@reduxjs/toolkit';
import doctorsSlice from './landingPage/LandingPage';
import usersSlice from './users/Users';
import reservationsSlice from './myReservations/MyReservations';

const reduxLogger = require('redux-logger');

const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    doctors: doctorsSlice,
    users: usersSlice,
    reservations: reservationsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
