import { axiosInstance, axiosInstanceMultipart } from "../../helpers/http";
import { GET_USER, LOGOUT_USER, UPDATE_USER } from "../types/user";

export const getUserData = (token) => {
  return {
    type: GET_USER,
    payload: axiosInstance(token).get("/users/profile"),
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const updateUser = (user, data, token) => {
  const { id } = user;
  const fd = new FormData();
  for (const key in data) {
    fd.append(key, data[key]);
  }
  return {
    type: UPDATE_USER,
    payload: axiosInstanceMultipart(token).patch(`/users/${id}`, fd),
  };
};
