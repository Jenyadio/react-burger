import React, { FC, ReactNode, SyntheticEvent, useEffect } from "react";
import styles from "./profile.module.css";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/actions/auth";
import { getUserData } from "../../services/actions/user";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/websocket";
import { wsUrl } from "../../services/actions/websocket";

import { useAppDispatch } from "../../hooks/dispatch-selector-hooks";
import { getCookie } from "../../utils/cookie";

type ProfilePageProps = {
  children?: ReactNode;
};

const ProfilePage: FC<ProfilePageProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const logout = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(
      logoutUser({ route: () => navigate("/login", { replace: true }) })
    );
  };

  const accessToken = getCookie("accessToken");

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${wsUrl}?token=${accessToken}`,
    });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch, accessToken]);

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <ul className="text text_type_main-medium">
          <li>
            <NavLink
              to="/profile/profile"
              style={({ isActive }) => {
                return {
                  color: isActive ? "#F2F2F3" : "#8585AD",
                };
              }}
            >
              Профиль
            </NavLink>
          </li>
          <li className="text text_type_main-medium pb-4 pt-4">
            <NavLink
              to="/profile/orders"
              style={({ isActive }) => {
                return {
                  color: isActive ? "#F2F2F3" : "#8585AD",
                };
              }}
            >
              История заказов
            </NavLink>
          </li>
          <li className="text text_type_main-medium pb-4 pt-4">
            <NavLink
              to="/login"
              style={({ isActive }) => {
                return {
                  color: isActive ? "#F2F2F3" : "#8585AD",
                };
              }}
              onClick={logout}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        {location.pathname === "/profile/profile" ? (
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете <br /> изменить свои персональные данные
          </p>
        ) : (
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете <br /> просмотреть свою историю заказов
          </p>
        )}
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default ProfilePage;
