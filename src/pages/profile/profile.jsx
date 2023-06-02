import React from "react";
import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <ul className="text text_type_main-medium">
          <li>
            <a href="#!">Профиль</a>
          </li>
          <li className="text text_type_main-medium text_color_inactive pb-4 pt-4">
            <a href="#!">История заказов</a>
          </li>
          <li className="text text_type_main-medium text_color_inactive pb-4 pt-4">
            <a href="#!">Выход</a>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете <br /> изменить свои персональные данные
        </p>
      </div>
      <div className={styles.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          extraClass="mb-6"
          icon={"EditIcon"}
        />
        <EmailInput
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Логин"}
          value={email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          icon={"EditIcon"}
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
          extraClass="mb-6"
          icon={"EditIcon"}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
