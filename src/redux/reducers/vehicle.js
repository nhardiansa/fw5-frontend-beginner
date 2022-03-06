import { BOOK_VEHICLE, BOOK_VEHICLE_DECREASE_QTY, BOOK_VEHICLE_INCREASE_QTY, CLEAR_BOOKED_VEHICLE, CLEAR_VEHICLE_DETAILS, CLEAR_VEHICLE_PAYMENT, CLEAR_VEHICLE_RESERVATION, GET_VEHICLE_DETAILS, MAKE_VEHICLE_PAYMENT, MAKE_VEHICLE_RESERVATION, RESERVATION_QTY_DECREASE, RESERVATION_QTY_INCREASE, SAVE_VEHICLE_DETAILS } from '../types/vehicle';

const initialState = {
  bookedVehicle: null,
  vehicleDetails: null,
  reservationData: null,

  paymentData: null,
  paymentLoading: false,
  paymentError: null,

  error: null
};

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_VEHICLE: {
      state.bookedVehicle = action.payload;
      return { ...state };
    }

    case BOOK_VEHICLE_INCREASE_QTY: {
      if (state.bookedVehicle.qty < state.bookedVehicle.limit) {
        state.bookedVehicle.qty += 1;
      }
      return { ...state };
    }

    case BOOK_VEHICLE_DECREASE_QTY: {
      if (state.bookedVehicle.qty > 1) {
        state.bookedVehicle.qty -= 1;
      }
      return { ...state };
    }

    case CLEAR_BOOKED_VEHICLE: {
      state.bookedVehicle = null;
      return { ...state };
    }

    case GET_VEHICLE_DETAILS + '_PENDING': {
      state.vehicleDetails = null;
      return { ...state };
    }

    case GET_VEHICLE_DETAILS + '_FULFILLED': {
      const { results } = action.payload.data;
      state.vehicleDetails = results;
      return { ...state };
    }

    case GET_VEHICLE_DETAILS + '_REJECTED': {
      const { message } = action.payload.response.data;
      state.vehicleDetails = null;
      state.error = message;
      return { ...state };
    }

    case SAVE_VEHICLE_DETAILS: {
      state.vehicleDetails = action.payload;
      return { ...state };
    }

    case CLEAR_VEHICLE_DETAILS: {
      state.vehicleDetails = null;
      return { ...state };
    }

    case MAKE_VEHICLE_RESERVATION: {
      state.reservationData = action.payload;
      return { ...state };
    }

    case RESERVATION_QTY_INCREASE: {
      if (state.reservationData.qty < state.reservationData.limit) {
        state.reservationData.qty += 1;
      }
      return { ...state };
    }

    case RESERVATION_QTY_DECREASE: {
      if (state.reservationData.qty > 1) {
        state.reservationData.qty -= 1;
      }
      return { ...state };
    }

    case CLEAR_VEHICLE_RESERVATION: {
      state.reservationData = null;
      return { ...state };
    }

    case MAKE_VEHICLE_PAYMENT + '_PENDING': {
      state.paymentLoading = true;
      state.paymentError = null;
      state.paymentData = null;
      return { ...state };
    }

    case MAKE_VEHICLE_PAYMENT + '_FULFILLED': {
      const { results } = action.payload.data;
      state.paymentData = results;
      state.paymentError = null;
      state.paymentLoading = false;
      return { ...state };
    }

    case MAKE_VEHICLE_PAYMENT + '_REJECTED': {
      const { message } = action.payload.response.data;
      state.paymentError = message;
      state.paymentData = null;
      state.paymentLoading = false;
      return { ...state };
    }

    case CLEAR_VEHICLE_PAYMENT: {
      state.paymentData = null;
      state.error = null;
      return { ...state };
    }

    default: {
      return state;
    }
  }
};

export default vehicleReducer;
