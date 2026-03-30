import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = window.localStorage.getItem("userInfo");
  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
