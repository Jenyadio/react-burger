import React from "react";
import { useState } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate } from "react-router-dom";
import styles from "./forgot-password.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCodeToRenewPassword } from "../../services/actions/user";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const message = useSelector((store) => store.userInfo.message);
  const dispatch = useDispatch();

  const getCode = () => {
    dispatch(getCodeToRenewPassword(email));
  };

  if (message) {
    alert(message);
    return <Navigate to={"/reset-password"} />;
  }

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
          onClick={getCode}
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
