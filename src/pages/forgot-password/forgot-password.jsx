import React from "react";
import { useState } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  return (
    <div>
      <section className={styles.box}>
        <h2 className="mb-6 text text_type_main-medium">
          Восстановление пароля
        </h2>
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Укажите e-mail"}
          value={email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
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

export default ForgotPasswordPage;
