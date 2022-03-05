import { axiosInstance, axiosInstanceMultipart } from '../../helpers/http';
import { GET_USER, LOGOUT_USER, UPDATE_USER } from '../types/user';

export const getUserData = (user) => {
  const { id } = user;
  return {
    type: GET_USER,
    payload: axiosInstance().get(`/users/profile/${id}`)
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

export const updateUser = (user, data) => {
  const { id } = user;
  const fd = new FormData();
  for (const key in data) {
    fd.append(key, data[key]);
  }
  return {
    type: UPDATE_USER,
    payload: axiosInstanceMultipart(true).patch(`/users/${id}`, fd)
  };
};
