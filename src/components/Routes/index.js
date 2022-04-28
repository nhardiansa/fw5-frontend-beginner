// import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const isLogin = (auth) => {
  console.log(auth);
  const user = auth?.user;

  if (user) {
    return true;
  }

  return false;
};

export const PublicRoute = ({ restricted, page }) => {
  const { auth } = useSelector((state) => state);

  return isLogin(auth) && restricted ? <Navigate to="/" /> : page;
};

export const PrivateRoute = ({ restricted, page }) => {
  const { auth } = useSelector((state) => state);

  return !isLogin(auth) && restricted ? <Navigate to="/login" /> : page;
};
