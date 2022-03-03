import { Navigate } from 'react-router-dom';

const isLogin = () => {
  const storage = window.localStorage;
  const user = storage.getItem('user');

  if (user) {
    return true;
  }

  return false;
};

export const PublicRoute = ({ restricted, page }) => {
  return (
    (isLogin() && restricted) ? <Navigate to='/' /> : page
  );
};

export const PrivateRoute = ({ restricted, page }) => {
  return (
    (!isLogin() && restricted) ? <Navigate to='/login' /> : page
  );
};
