import React, { FormEvent } from "react";
import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/actions/auth";
import { auth } from "../../selectors/selectors";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loginFailed, message } = useSelector(auth);

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && password) {
      dispatch<any>(
        loginUser({
          email,
          password,
        })
      );
    }
  };

  if (loginFailed) {
    alert(`Ошибка: ${message}. Попробуйте еще раз.`);
  }

  return (
    <div>
      <section className={styles.box}>
        <h2 className="mb-6 text text_type_main-medium">Вход</h2>
        <form className={styles.form} onSubmit={login}>
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
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-20"
          >
            Войти
          </Button>
        </form>
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
