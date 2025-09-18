import { SET_DATE } from "../actions";

const initialState = {
  currentDate: new Date().toISOString().split("T")[0],
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        currentDate: action.payload,
      };
    default:
      return state;
  }
};

export default calendarReducer;
