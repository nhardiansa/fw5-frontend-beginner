import qs from 'qs';
import constants from '../../config/constants';
import { axiosInstance } from '../../helpers/http';
import { BOOK_VEHICLE, BOOK_VEHICLE_DECREASE_QTY, BOOK_VEHICLE_INCREASE_QTY, CLEAR_BOOKED_VEHICLE, CLEAR_DELETED_VEHICLE_PAYMENT, CLEAR_VEHICLE_DETAILS, CLEAR_VEHICLE_PAYMENT, CLEAR_VEHICLE_RESERVATION, DELETE_VEHICLE_PAYMENT, FINISH_PAYMENT, GET_VEHICLE_DETAILS, GET_VEHICLE_PAYMENT_DETAILS, GET_VEHICLE_PAYMENT_LIST, LOAD_MORE_VEHICLE_PAYMENT_LIST, MAKE_VEHICLE_PAYMENT, MAKE_VEHICLE_RESERVATION, RESERVATION_QTY_DECREASE, RESERVATION_QTY_INCREASE, RETURN_VEHICLE, SAVE_VEHICLE_DETAILS } from '../types/vehicle';

export const bookVehicle = (vehicleData) => {
  const {
    id,
    price,
    qty: totalQty,
    booked
  } = vehicleData;

  const qty = 0;
  const limit = totalQty - booked;

  return {
    type: BOOK_VEHICLE,
    payload: { id, qty, limit, price }
  };
};

export const bookVehicleIncreaseQty = () => {
  return {
    type: BOOK_VEHICLE_INCREASE_QTY
  };
};

export const bookVehicleDecreaseQty = () => {
  return {
    type: BOOK_VEHICLE_DECREASE_QTY
  };
};

export const clearBookedVehicle = () => {
  return {
    type: CLEAR_BOOKED_VEHICLE
  };
};

export const makeVehicleReservation = (reservationData) => {
  return {
    type: MAKE_VEHICLE_RESERVATION,
    payload: reservationData
  };
};

export const reservationQtyIncrease = () => {
  return {
    type: RESERVATION_QTY_INCREASE
  };
};

export const reservationQtyDecrease = () => {
  return {
    type: RESERVATION_QTY_DECREASE
  };
};

export const clearVehicleReservation = () => {
  return {
    type: CLEAR_VEHICLE_RESERVATION
  };
};

export const getVehicleDetails = (id) => {
  return {
    type: GET_VEHICLE_DETAILS,
    payload: axiosInstance().get(`/vehicles/${id}`)
  };
};

export const saveVehicleDetails = (vehicleData) => {
  return {
    type: SAVE_VEHICLE_DETAILS,
    payload: vehicleData
  };
};

export const clearVehicleDetails = () => {
  return {
    type: CLEAR_VEHICLE_DETAILS
  };
};

export const makeVehiclePayment = (paymentData) => {
  const data = qs.stringify(paymentData);
  return {
    type: MAKE_VEHICLE_PAYMENT,
    payload: axiosInstance(true).post('/histories', data)
  };
};

export const clearVehiclePayment = () => {
  return {
    type: CLEAR_VEHICLE_PAYMENT
  };
};

export const getVehiclePaymentList = (input) => {
  const data = new URLSearchParams({
    limit: constants.itemLimit,
    ...input
  });

  console.log(data.toString());

  return {
    type: GET_VEHICLE_PAYMENT_LIST,
    payload: axiosInstance(true).get(`/histories?${data.toString()}`)
  };
};

export const loadMoreVehiclePaymentList = (input) => {
  const data = new URLSearchParams(input);
  console.log(data);
  return {
    type: LOAD_MORE_VEHICLE_PAYMENT_LIST,
    payload: axiosInstance(true).get(`/histories?${data.toString()}`)
  };
};

export const getVehiclePaymentDetails = (id) => {
  return {
    type: GET_VEHICLE_PAYMENT_DETAILS,
    payload: axiosInstance(true).get(`/histories/${id}`)
  };
};

export const deleteVehiclePayment = (id) => {
  return {
    type: DELETE_VEHICLE_PAYMENT,
    payload: axiosInstance(true).delete(`/histories/${id}`)
  };
};

export const clearDeletedPaymentData = () => {
  return {
    type: CLEAR_DELETED_VEHICLE_PAYMENT
  };
};

export const finishPayment = (id) => {
  const data = qs.stringify({ payment: 1 });
  return {
    type: FINISH_PAYMENT,
    payload: axiosInstance(true).patch(`/histories/${id}`, data)
  };
};

export const returnVehicle = (id) => {
  const data = qs.stringify({ returned: 1 });
  return {
    type: RETURN_VEHICLE,
    payload: axiosInstance(true).patch(`/histories/${id}`, data)
  };
};