import React from "react";
import { useState } from "react";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

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
