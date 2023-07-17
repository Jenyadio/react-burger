import React, { FormEvent } from "react";
import { useState } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-form.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/dispatch-selector-hooks";
import { useForm } from "../../hooks/use-form";
import { userData } from "../../selectors/selectors";
import { updateUserData } from "../../services/actions/user";

export const ProfileForm = () => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userData);
  const { values, handleChange, resetForm } = useForm({});
  const { name, email, password } = values;

  const update = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      dispatch(
        updateUserData({
          name: name ?? user.name,
          email: email ?? user.email,
          password: password ?? user.password,
        })
      );
    }
  };

  const reset = () => {
    resetForm();
    setShow(false);
  };

  return (
    <form
      className={styles.form}
      onSubmit={update}
      onFocus={() => setShow(true)}
    >
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChange}
        value={name ?? user?.name ?? ""}
        name={"name"}
        extraClass="mb-6"
        icon={"EditIcon"}
        required
        maxLength={20}
      />
      <Input
        type={"email"}
        onChange={handleChange}
        placeholder={"Логин"}
        value={email ?? user?.email ?? ""}
        name={"email"}
        extraClass="mb-6"
        icon={"EditIcon"}
        required
      />
      <PasswordInput
        onChange={handleChange}
        value={String(password) ?? user?.password ?? ""}
        name={"password"}
        extraClass="mb-6"
        icon={"EditIcon"}
        required
        minLength={6}
      />
      {show && (
        <div>
          <Button
            htmlType="submit"
            type="primary"
            size="small"
            extraClass="ml-2 mt-3"
          >
            Сохранить
          </Button>
          <Button
            htmlType="reset"
            type="primary"
            size="small"
            extraClass="ml-2 mt-3"
            onClick={reset}
          >
            Отмена
          </Button>
        </div>
      )}
    </form>
  );
};
