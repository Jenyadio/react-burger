import React from "react";
import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        >
          Войти
        </Button>
        <div className={`${styles.text} text text_type_main-default`}>
          <p className="pr-2">Вы - новый пользователь?</p>
          <p>
            <a href="#!">Зарегистрироваться</a>
          </p>
        </div>
        <div className={`${styles.text} text text_type_main-default`}>
          <p className="pr-2">Забыли пароль?</p>
          <p>
            <a href="#!">Восстановить пароль</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
