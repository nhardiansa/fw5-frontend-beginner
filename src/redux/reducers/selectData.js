import { GET_DATA_SELECT_FULFILLED, GET_DATA_SELECT_PENDING, GET_DATA_SELECT_REJECTED } from "../types/selectData";

const initialState = {
  isLoading: true,
  errorMessage: "",
  locations: [],
  types: []
};

const selectData = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_SELECT_PENDING:
      state.isLoading = true;
      return { ...state };

    case GET_DATA_SELECT_REJECTED:
      state.isLoading = false;
      state.errorMessage = action.payload;
      return { ...state };

    case GET_DATA_SELECT_FULFILLED:
      state.locations = action.payload.locations;
      state.types = action.payload.types;
      state.isLoading = false;
      return { ...state };

    default:
      return { ...state };
  }
};

export default selectData;
