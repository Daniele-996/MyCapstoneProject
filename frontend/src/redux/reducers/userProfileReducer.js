import {
  SET_USER,
  SETS_USERS,
  UPDATE_USER_ROLE,
  DELETE_USER,
  UPDATE_AVATAR,
  UPDATE_USER_PROFILE,
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
    case UPDATE_AVATAR:
      return {
        ...state,
        user: { ...state.user, avatarUrl: action.payload.avatarUrl },
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        user:
          state.user?.id === action.payload.id ? action.payload : state.user,
        content: state.content.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    default:
      return state;
  }
};
export default userProfileReducer;
