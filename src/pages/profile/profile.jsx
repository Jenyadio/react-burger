import React, { useEffect } from "react";
import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/actions/user";
import { updateUserData } from "../../services/actions/user";
import { getCookie } from "../../utils/cookie";

const ProfilePage = () => {
  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");
  const userPassword = getCookie("password");
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState(userPassword);
  const [show, setShow] = useState(false);
  const { logoutFailed, message } = useSelector((store) => store.auth);
  const { getUserFailed, updateUserFailed, errMessage } = useSelector(
    (store) => store.userInfo
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(
      logoutUser({ route: () => navigate("/login", { replace: true }) })
    );
  };

  useEffect(() => {
    dispatch(getUserData);
  }, [dispatch]);

  const update = (e) => {
    e.preventDefault();
    if (name && email && password) {
      dispatch(updateUserData({ name, email, password }));
    }
  };

  if (logoutFailed) {
    alert(`Ошибка: ${message}. Попробуйте еще раз.`);
  }

  if (getUserFailed || updateUserFailed) {
    alert(`Ошибка: ${errMessage}. Попробуйте еще раз.`);
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

  const reset = () => {
    setName(userName);
    setEmail(userEmail);
    setPassword(userPassword);
    setShow(false);
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
              onClick={logout}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете <br /> изменить свои персональные данные
        </p>
      </div>
      <form className={styles.form} onSubmit={update}>
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
              htmlType="submit"
              type="primary"
              size="small"
              extraClass="ml-2 mt-3"
            >
              Сохранить
            </Button>
            <Button
              htmlType="reset"
              type="primary"
              size="small"
              extraClass="ml-2 mt-3"
              onClick={reset}
            >
              Отмена
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
