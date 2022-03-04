import { GET_USER_FULFILLED, GET_USER_PENDING, GET_USER_REJECTED } from '../types/user';

const initialState = {
  profile: null,
  isLoading: false,
  error: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FULFILLED: {
      const { results } = action.payload.data;
      state.profile = results;
      state.isLoading = false;
      state.error = null;
      return { ...state };
    }

    case GET_USER_PENDING: {
      state.profile = null;
      state.isLoading = true;
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

    default: {
      return { ...state };
    }
  }
};

export default user;
