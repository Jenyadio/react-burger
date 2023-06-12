import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserData } from "../../services/actions/user";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element }) => {
  const [isUserLoaded, setUserLoaded] = useState(false);
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");
  const dispatch = useDispatch();

  const init = () => {
    dispatch(getUserData());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return userEmail && userName ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;
