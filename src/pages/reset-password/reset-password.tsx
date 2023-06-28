import React, { FormEvent } from "react";
import { useState } from "react";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/actions/auth";
import { auth } from "../../selectors/selectors";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetSuccess, resetFailed, message } = useSelector(auth);

  const reset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password && token) {
      dispatch<any>(
        resetPassword({
          password,
          token,
          route: () => navigate("/login", { replace: true }),
        })
      );
    }
  };

  if (resetSuccess || resetFailed) {
    alert(message);
  }

  return (
    <div>
      <section className={styles.box}>
        <h2 className="mb-6 text text_type_main-medium">
          Восстановление пароля
        </h2>
        <form className={styles.form} onSubmit={reset}>
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            placeholder={"Введите новый пароль"}
            value={password}
            name={"password"}
            extraClass="mb-6"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setToken(e.target.value)}
            value={token}
            name={"code"}
            extraClass="mb-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-20"
          >
            Сохранить
          </Button>
        </form>
        <div className={`${styles.text} text text_type_main-default`}>
          <p className="pr-2">Вспомнили пароль?</p>
          <p>
            <Link to="/login">Войти</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordPage;
