import React, { FormEvent } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { useDispatch, useSelector } from "react-redux";
import { restorePassword } from "../../services/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../selectors/selectors";
import { useForm } from "../../hooks/use-form";

const ForgotPasswordPage = () => {
  const {values, handleChange} = useForm({});
  const { email } = values;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restoreSuccess, restoreFailed, message } = useSelector(auth);

  const restore = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email) {
      dispatch<any>(
        restorePassword({
          email,
          route: () =>
            navigate("/reset-password", {
              replace: true,
            }),
        })
      );
    }
  };

  if (restoreSuccess || restoreFailed) {
    alert(message);
  }

  return (
    <div>
      <section className={styles.box}>
        <h2 className="mb-6 text text_type_main-medium">
          Восстановление пароля
        </h2>
        <form className={styles.form} onSubmit={restore}>
          <EmailInput
            onChange={handleChange}
            placeholder={"Укажите e-mail"}
            value={email ?? ""}
            name={"email"}
            isIcon={false}
            extraClass="mb-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-20"
          >
            Восстановить
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

export default ForgotPasswordPage;
