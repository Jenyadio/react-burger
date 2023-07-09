import React, { FormEvent } from "react";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/actions/auth";
import { auth } from "../../selectors/selectors";
import { useForm } from "../../hooks/use-form";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatch-selector-hooks";

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { resetSuccess, resetFailed, message } = useAppSelector(auth);
  const {values, handleChange} = useForm({});
  const { password, token } = values;
  

  const reset = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password && token) {
      dispatch(
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
            onChange={handleChange}
            placeholder={"Введите новый пароль"}
            value={password?.toString() ?? ""}
            name={"password"}
            extraClass="mb-6"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChange}
            value={token ?? ""}
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
