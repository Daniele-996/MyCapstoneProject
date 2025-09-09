import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDate: new Date().toISOString().split("T")[0],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.currentDate = action.payload;
    },
  },
});

export const { setDate } = calendarSlice.actions;
export default calendarSlice.reducer;
