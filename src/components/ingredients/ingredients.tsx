import React, { FC, useMemo } from "react";
import { Item } from "../item/item";
import ingredientsStyles from "../../components/ingredients/ingredients.module.css";
import { burgerItems } from "../../selectors/selectors";
import { useAppSelector } from "../../hooks/dispatch-selector-hooks";

type IngredientsProps = {
  name: string;
  type: string;
  id: string;
  tabsRef: (node?: Element | null | undefined) => void;
};

export const Ingredients: FC<IngredientsProps> = ({
  name,
  type,
  id,
  tabsRef,
}) => {
  const items = useAppSelector(burgerItems);

  const list = useMemo(
    () => items.filter((item) => item.type === type),
    [items] // eslint-disable-line
  );

  return (
    <article id={id} ref={tabsRef}>
      <h2
        className={`${ingredientsStyles.header} pt-10 text text_type_main-medium`}
        id={id}
      >
        {name}
      </h2>
      <div className={`${ingredientsStyles.box} mt-6 ml-4 mr-4`}>
        {list.map((item, index: number) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </article>
  );
};
