import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const GET_USERS = 'BOOK-AN-APPOINTMENT-FRONT-END/src/redux/users/getUsers';

const initialState = [];

const getUsersApi = 'http://localhost:3000/api/users';

// action creators to get users
export const getUsers = createAsyncThunk(
  GET_USERS, () => axios.get(getUsersApi).then((res) => {
    const users = res.data;
    return users;
  }),
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (_, action) => action.payload);
    builder.addCase(getUsers.rejected, (state) => {
      const newState = state;
      newState.status = 'failed';
    });
    builder.addCase(getUsers.pending, (_, action) => action.payload);
  },
});

export default usersSlice.reducer;
