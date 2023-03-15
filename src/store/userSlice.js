import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = () => {

  return createSlice({
    name: "users",
    initialState: {
      users: [],
      error: null,
      isLoading: false,
    },
    reducers: {
      startRequest: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      setUsers: (state, action) => {
        state.error = null;
        state.users = action.payload;
        state.isLoading = false;
      },
      setError: (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      },
    },
  });
};

export const { startRequest, setUsers, setError } = usersSlice().actions;

export default usersSlice().reducer;
