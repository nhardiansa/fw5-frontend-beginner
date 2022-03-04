import { axiosInstance } from '../../helpers/http';
import { GET_USER } from '../types/user';

export const getUserData = (user) => {
  const { id } = user;
  return {
    type: GET_USER,
    payload: axiosInstance().get(`/users/profile/${id}`)
  };
};
