import React from "react";
import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNewUser } from "../../services/actions/user";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userEmail, userName } = useSelector((store) => store.userInfo);
  const dispatch = useDispatch();

  const registerUser = () => {
    dispatch(getNewUser(email, password, name));
  };

  if (userEmail && userName) {
    alert("Вы успешно зарегистрированы");
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <section className={styles.box}>
        <h2 className="mb-6 text text_type_main-medium">Регистрация</h2>
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
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
          onClick={registerUser}
        >
          Зарегистрироваться
        </Button>
        <div className={`${styles.text} text text_type_main-default`}>
          <p className="pr-2">Уже зарегистрированы?</p>
          <Link to="/login">Войти</Link>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
