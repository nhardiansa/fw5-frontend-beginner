import { LOGIN, LOGOUT, ON_LOGIN_FULFILLED, ON_LOGIN_PENDING, ON_LOGIN_REJECTED } from '../types/auth';

const initialState = {
  user: null,
  isLoading: false,
  error: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      state.user = action.payload;
      return { ...state };
    }

    case LOGOUT: {
      state.user = null;
      window.localStorage.removeItem('user');
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
      window.localStorage.setItem('user', JSON.stringify(results));
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export default auth;
