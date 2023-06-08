import React from "react";
import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/actions/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginSuccess = useSelector((store) => store.auth.loginSuccess);

  const login = () => {
    dispatch(loginUser(email, password));
  };

  if (loginSuccess) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <section className={styles.box}>
        <h2 className="mb-6 text text_type_main-medium">Вход</h2>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
          extraClass="mb-6"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
          onClick={login}
        >
          Войти
        </Button>
        <div className={`${styles.text} text text_type_main-default`}>
          <p className="pr-2">Вы - новый пользователь?</p>
          <Link to="/register">Зарегистрироваться</Link>
        </div>
        <div className={`${styles.text} text text_type_main-default`}>
          <p className="pr-2">Забыли пароль?</p>
          <Link to="/forgot-password">Восстановить пароль</Link>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
