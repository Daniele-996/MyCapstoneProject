import { SET_ERROR, CLEAR_ERROR } from "../actions";

const initialState = {
  message: "",
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, message: action.payload };
    case CLEAR_ERROR:
      return { ...state, message: "" };
    default:
      return state;
  }
};

export default errorReducer;
