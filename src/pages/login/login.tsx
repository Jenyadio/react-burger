import React, { FormEvent } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/actions/auth";
import { auth } from "../../selectors/selectors";
import { useForm } from "../../hooks/use-form";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatch-selector-hooks";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { loginFailed, message } = useAppSelector(auth);
  const {values, handleChange} = useForm({});
  const { email, password } = values;

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email && password) {
      dispatch(
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
            onChange={handleChange}
            value={email ?? ""}
            name={"email"}
            isIcon={false}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={handleChange}
            value={password?.toString() ?? ""}
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
