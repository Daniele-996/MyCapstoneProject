import { SET_USER } from "../actions";

const initialState = {
  user: null,
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
export default userProfileReducer;
