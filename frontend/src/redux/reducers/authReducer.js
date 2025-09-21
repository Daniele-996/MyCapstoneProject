import { SET_LOGIN, SET_LOGOUT } from "../actions";

const initialState = {
  token: null,
  email: "",
  password: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
        password: action.payload.password,
      };
    case SET_LOGOUT:
      return {
        ...state,
        token: null,
        email: null,
        password: null,
        role: null,
      };
    default:
      return state;
  }
};
export default authReducer;
