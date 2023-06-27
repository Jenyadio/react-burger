import React, { FC } from "react";
import caloriesStyles from "../../components/calories-item/calories-item.module.css";

type CaloriesProps = {
  name: string;
  value: number;
}

export const CaloriesItem: FC<CaloriesProps> = ({ name, value }) => {
  return (
    <div className={caloriesStyles.box}>
      <p className="text text_type_main-default text_color_inactive">{name}</p>
      <p className="text text_type_digits-default text_color_inactive">
        {value}
      </p>
    </div>
  );
}
