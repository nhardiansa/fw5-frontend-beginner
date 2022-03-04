import { axiosInstance } from '../../helpers/http';
import { LOGIN, LOGOUT, ON_LOGIN } from '../types/auth';

export const login = (user) => {
  return {
    type: LOGIN,
    payload: user
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const onLogin = (email, password) => {
  const data = new URLSearchParams();
  data.append('email', email);
  data.append('password', password);
  return {
    type: ON_LOGIN,
    payload: axiosInstance().post('/auth/login', data)
  };
};
