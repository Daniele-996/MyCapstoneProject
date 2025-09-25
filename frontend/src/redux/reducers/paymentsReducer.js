import { SET_PAYMENTS, UPDATE_PAYMENT_STATUS, USER_PAYMENTS } from "../actions";

const initialState = {
  content: [],
  userPayments: [],
};

const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENTS:
      return { ...state, content: action.payload };
    case UPDATE_PAYMENT_STATUS:
      return {
        ...state,
        content: state.content.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case USER_PAYMENTS:
      return { ...state, userPayments: action.payload };
    default:
      return state;
  }
};
export default paymentsReducer;
