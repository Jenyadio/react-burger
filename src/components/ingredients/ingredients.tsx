import React, { FC, useMemo } from "react";
import { Item } from "../item/item";
import ingredientsStyles from "../../components/ingredients/ingredients.module.css";
import { useSelector } from "react-redux";
import { burgerItems } from "../../selectors/selectors";
import { Card } from '../../types/ingredient'

type IngredientsProps = {
  name: string;
  type: string;
  id: string;
  tabsRef: (node?: Element | null | undefined) => void;
}

export const Ingredients: FC<IngredientsProps> = ({ name, type, id, tabsRef }) => {
  const items = useSelector(burgerItems);

  const list = useMemo(
    () => items.filter((item: Card) => item.type === type),
    [items]                                                 // eslint-disable-line
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
        {list.map((item: Card, index: number) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </article>
  );
}
