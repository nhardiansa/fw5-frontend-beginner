import { LOGIN, LOGOUT } from '../types/auth';

const initialState = {
  user: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      state.user = action.user;
      return state;
    case LOGOUT:
      state.user = null;
      return state;
    default:
      return state;
  }
};

export default auth;
