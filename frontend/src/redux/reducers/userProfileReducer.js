import {
  SET_USER,
  SETS_USERS,
  UPDATE_USER_ROLE,
  DELETE_USER,
} from "../actions";

const initialState = {
  user: null,
  content: [],
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case SETS_USERS:
      return { ...state, content: action.payload };

    case UPDATE_USER_ROLE:
      return {
        ...state,
        content: state.content.map(
          (user) => (user.id === action.payload.id && action.payload) || user
        ),
      };

    case DELETE_USER:
      return {
        ...state,
        content: state.content.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
};
export default userProfileReducer;
