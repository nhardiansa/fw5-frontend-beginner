import { DECREASE, INCREASE } from '../types/counter';

const initialState = {
  value: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return { value: state.value + 1 };
    case DECREASE:
      return { value: state.value - 1 };
    default:
      return state;
  }
};

export default reducer;
