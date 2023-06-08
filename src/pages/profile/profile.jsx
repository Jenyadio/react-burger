import React, { useEffect } from "react";
import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { NavLink, Navigate } from "react-router-dom";
import { logoutUser } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/actions/user";

const ProfilePage = () => {
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState("*******");
  const [show, setShow] = useState(false);
  const logoutSuccess = useSelector((store) => store.auth.logoutSuccess);

  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getUserData);
  }, [dispatch]);

  if (logoutSuccess) {
    return <Navigate to={"/login"} />;
  }

  const handleName = (e) => {
    setName(e.target.value);
    setShow(true);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setShow(true);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setShow(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <ul className="text text_type_main-medium">
          <li>
            <NavLink
              to="/profile"
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
              to="/orders"
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
              onClick={userLogout}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете <br /> изменить свои персональные данные
        </p>
      </div>
      <div className={styles.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleName}
          value={name}
          name={"name"}
          extraClass="mb-6"
          icon={"EditIcon"}
        />
        <EmailInput
          onChange={handleEmail}
          placeholder={"Логин"}
          value={email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          icon={"EditIcon"}
        />
        <PasswordInput
          onChange={handlePassword}
          value={password}
          name={"password"}
          extraClass="mb-6"
          icon={"EditIcon"}
        />
        {show && (
          <div>
            <Button
              htmlType="button"
              type="primary"
              size="small"
              extraClass="ml-2 mt-3"
            >
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="small"
              extraClass="ml-2 mt-3"
            >
              Отмена
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
