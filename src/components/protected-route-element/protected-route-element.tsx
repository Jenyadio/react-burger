import { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authLoginSuccess } from "../../selectors/selectors";
import { useAppSelector } from "../../hooks/dispatch-selector-hooks";

type ProtectedRouteProps = {
  anonymous?: boolean;
  element: ReactElement;
}

export const ProtectedRouteElement: FC<ProtectedRouteProps> = ({ anonymous = false, element }) => {
  const loginSuccess = useAppSelector(authLoginSuccess);
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
