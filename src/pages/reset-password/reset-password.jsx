import React from "react";
import { useState } from "react";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/actions/user";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const message = useSelector((store) => store.userInfo.message);
  const dispatch = useDispatch();

  const getPassword = () => {
    dispatch(resetPassword(password, code));
  };

  if (message) {
    alert(message);
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <section className={styles.box}>
        <h2 className="mb-6 text text_type_main-medium">
          Восстановление пароля
        </h2>
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
          onChange={(e) => setCode(e.target.value)}
          value={code}
          name={"code"}
          extraClass="mb-6"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
          onClick={getPassword}
        >
          Сохранить
        </Button>
        <div className={`${styles.text} text text_type_main-default`}>
          <p className="pr-2">Вспомнили пароль?</p>
          <p>
            <a href="#!">Войти</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordPage;
