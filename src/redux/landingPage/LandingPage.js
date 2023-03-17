import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const GET_DOCTORS = 'BOOK-AN-APPOINTMENT-FRONT-END/src/redux/landingPage/getDoctors';

const initialState = [];

const getDoctorsApi = 'https://bookadoc.onrender.com/api/doctors';

// action creators to get doctors
export const getDoctors = createAsyncThunk(
  GET_DOCTORS, () => axios.get(getDoctorsApi).then((res) => {
    const doctors = res.data;
    return doctors;
  }),
);

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getDoctors.fulfilled, (_, action) => action.payload);
    builder.addCase(getDoctors.rejected, (state) => {
      const newState = state;
      newState.status = 'failed';
    });
    builder.addCase(getDoctors.pending, (_, action) => action.payload);
  },
});

export default doctorsSlice.reducer;
