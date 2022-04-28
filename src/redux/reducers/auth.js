import {
  CLEAR_REGISTER_DATA,
  LOGIN,
  LOGOUT,
  ON_LOGIN_FULFILLED,
  ON_LOGIN_PENDING,
  ON_LOGIN_REJECTED,
  REGISTER,
} from "../types/auth";

const initialState = {
  user: null,
  isLoading: false,
  error: null,

  registeredEmail: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      state.user = action.payload;
      return { ...state };
    }

    case LOGOUT: {
      state.user = null;
      return { ...state };
    }

    case ON_LOGIN_PENDING: {
      state.user = null;
      state.isLoading = true;
      state.error = null;
      return { ...state };
    }

    case ON_LOGIN_REJECTED: {
      const { message } = action.payload.response.data;
      state.user = null;
      state.isLoading = false;
      state.error = message;
      return { ...state };
    }

    case ON_LOGIN_FULFILLED: {
      const { results } = action.payload.data;
      state.user = results;
      state.isLoading = false;
      state.error = null;
      return { ...state };
    }

    case REGISTER: {
      state.registeredEmail = action.payload;
      return { ...state };
    }

    case CLEAR_REGISTER_DATA: {
      state.registeredEmail = null;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export default auth;
