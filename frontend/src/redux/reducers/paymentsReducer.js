import { SET_PAYMENTS } from "../actions";

const initialState = {
  content: [],
};

const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENTS:
      return { ...state, list: action.paylaod };
    default:
      return state;
  }
};
export default paymentsReducer;
