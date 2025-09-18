import { SET_RESERVATIONS } from "../actions";

const initialState = {
  content: [],
};

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESERVATIONS:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};
export default reservationsReducer;
