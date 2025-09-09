import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import calendarReducer from "../reducers/calendarSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    calendar: calendarReducer,
  },
});

export default store;
