import React, { FormEvent } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/actions/auth";
import { auth } from "../../selectors/selectors";
import { useForm } from "../../hooks/use-form";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatch-selector-hooks";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { registerFailed, message } = useAppSelector(auth);
  const {values, handleChange} = useForm({});
  const { name, email, password } = values;

  const register = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name && email && password) {
      dispatch(
        registerUser({
          email,
          password,
          name,
          route: () => navigate("/login", { replace: true }),
        })
      );
    }
  };

  if (registerFailed) {
    alert(`Ошибка: ${message}. Попробуйте еще раз.`);
  }

  return (
    <div>
      <section className={styles.box}>
        <h2 className="mb-6 text text_type_main-medium">Регистрация</h2>
        <form className={styles.form} onSubmit={register}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={name ?? ""}
            name={"name"}
            extraClass="mb-6"
          />
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
            Зарегистрироваться
          </Button>
        </form>
        <div className={`${styles.text} text text_type_main-default`}>
          <p className="pr-2">Уже зарегистрированы?</p>
          <Link to="/login">Войти</Link>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
