import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const GET_USER_BY_USERNAME = 'BOOK-AN-APPOINTMENT-FRONT-END/src/redux/users/getUserByUsername';

const initialState = [];

// action creators to get user
export const getUserByUsername = createAsyncThunk(
  GET_USER_BY_USERNAME,
  async (username) => {
    const response = await axios.get(`http://localhost:3000/api/users?username=${username}`);
    const users = response.data;
    console.log(`${users} from Api`);
    return users;
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserByUsername.fulfilled, (_, action) => action.payload);
    builder.addCase(getUserByUsername.rejected, (state) => {
      const newState = state;
      newState.status = 'failed';
    });
    builder.addCase(getUserByUsername.pending, (_, action) => action.payload);
  },
});

export default usersSlice.reducer;
