import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // const { loginData } = useSelector((state) => state.authReducer);
  // isLoggedIn
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  let getData = localStorage.getItem("userCredential")
  getData = JSON.parse(getData)
  
  if (getData?.isLoggedIn) {
    return <Outlet />;
  }
  return <Navigate to="/auth/login" />;
};

export default PrivateRoute;
