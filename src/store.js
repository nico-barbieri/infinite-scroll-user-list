import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./store/userSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});