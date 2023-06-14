import React from "react";
import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/actions/auth";
import { auth } from "../../selectors/selectors";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerFailed, message } = useSelector(auth);

  const register = (e) => {
    e.preventDefault();
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
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            extraClass="mb-6"
          />
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
