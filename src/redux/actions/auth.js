import { LOGIN, LOGOUT } from '../types/auth';

export const login = (user) => {
  return {
    type: LOGIN,
    user
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
