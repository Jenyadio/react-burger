import React, { FormEvent, SyntheticEvent, useEffect } from "react";
import { useState } from "react";
import {
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
import { auth, userInfo } from "../../selectors/selectors";
import { useForm } from "../../hooks/use-form";
import { userData } from "../../selectors/selectors";

const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const { logoutFailed, message } = useSelector(auth);
  const { getUserFailed, updateUserFailed, errMessage } = useSelector(userInfo);
  const user = useSelector(userData);
  const {values, handleChange, resetForm} = useForm({});
  const { name, email, password } = values;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getUserData());
  }, [dispatch]);

  const logout = (event: SyntheticEvent ) => {
    event.preventDefault();
    dispatch<any>(
      logoutUser({ route: () => navigate("/login", { replace: true }) })
    );
  };

  const update = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      dispatch<any>(updateUserData({ 
        name: name ?? user.name, 
        email: email ?? user.email, 
        password: password ?? user.password 
      }));
    }
  };

  if (logoutFailed) {
    alert(`Ошибка: ${message}. Попробуйте еще раз.`);
  }

  if (getUserFailed || updateUserFailed) {
    alert(`Ошибка: ${errMessage}. Попробуйте еще раз.`);
  }

  const reset = () => {
    resetForm()
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
      <form className={styles.form} onSubmit={update} onFocus={() => setShow(true)}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={name ?? user?.name ?? ''}
          name={"name"}
          extraClass="mb-6"
          icon={"EditIcon"}
          required
          maxLength={20}
        />
        <Input
          type={"email"}
          onChange={handleChange}
          placeholder={"Логин"}
          value={email ?? user?.email ?? ''}
          name={"email"}
          extraClass="mb-6"
          icon={"EditIcon"}
          required
        />
        <PasswordInput
          onChange={handleChange}
          value={password ?? user?.password ?? ''}
          name={"password"}
          extraClass="mb-6"
          icon={"EditIcon"}
          required
          minLength={6}
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
