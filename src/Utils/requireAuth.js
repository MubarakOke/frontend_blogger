import React from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";

export const RequireAuth = ({ children, loginPath }) => {
  const token = useSelector((state) => state.auth&&state.auth.token?state.auth.token:null);
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={loginPath} />;
  }
};