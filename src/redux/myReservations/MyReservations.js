import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const GET_RESERVATIONS = 'BOOK-AN-APPOINTMENT-FRONT-END/src/redux/myReservations/getReservations';

const initialState = [];

// action creator to get reservations
export const getReservations = createAsyncThunk(
  GET_RESERVATIONS,
  async (username) => {
    const response = await axios.get(`http://localhost:3000/api/reservations?username=${username}`);
    return response.data;
  },
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getReservations.fulfilled, (_, action) => action.payload);
    builder.addCase(getReservations.rejected, (state) => {
      const newState = state;
      newState.status = 'failed';
    });
  },
});

export default reservationsSlice.reducer;
