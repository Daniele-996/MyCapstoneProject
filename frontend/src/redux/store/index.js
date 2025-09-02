import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../reducers/calendarSlice";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

export default store;
