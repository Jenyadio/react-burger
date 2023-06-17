import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteElement = ({ anonymous = false, element }) => {
  const loginSuccess = useSelector((store) => store.auth.loginSuccess);
  const token = localStorage.getItem("refreshToken");
  const location = useLocation();

  const from = location.state?.from || "/";

  if (anonymous && token && loginSuccess) {
    return <Navigate to={from} />;
  } else if (anonymous && token) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRouteElement;
