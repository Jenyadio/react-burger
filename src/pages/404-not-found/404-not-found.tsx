import React from "react";
import styles from "./404-not-found.module.css";
import { Link } from "react-router-dom";

const NotFound404Page = () => {
  return (
    <div className={styles.main}>
      <div className={styles.linkbox}>
        <Link to="/" className={`${styles.link} text text_type_main-medium`}>
          Страница не найдена <br /> Перейти на главную страницу
        </Link>
      </div>
    </div>
  );
};

export default NotFound404Page;
