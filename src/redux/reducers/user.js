import { GET_USER_FULFILLED, GET_USER_PENDING, GET_USER_REJECTED, LOGOUT_USER, UPDATE_USER } from '../types/user';

const initialState = {
  profile: null,
  isLoading: true,
  error: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PENDING: {
      state.profile = null;
      state.isLoading = true;
      state.error = null;
      return { ...state };
    }

    case GET_USER_FULFILLED: {
      const { results } = action.payload.data;
      state.profile = results;
      state.isLoading = false;
      state.error = null;
      return { ...state };
    }

    case GET_USER_REJECTED: {
      const { message } = action.payload.response.data;
      state.profile = null;
      state.isLoading = false;
      state.error = message;
      return { ...state };
    }

    case LOGOUT_USER: {
      state.profile = null;
      state.isLoading = false;
      state.error = null;
      return { ...state };
    }

    case UPDATE_USER + '_PENDING': {
      state.isLoading = true;
      state.error = null;
      return { ...state };
    }

    case UPDATE_USER + '_FULFILLED': {
      const { results } = action.payload.data;
      state.profile = results;
      state.isLoading = false;
      state.error = null;
      return { ...state };
    }

    case UPDATE_USER + '_REJECTED': {
      const { message } = action.payload.response.data;
      state.error = message;
      state.isLoading = false;
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

export default user;
