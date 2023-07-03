import React, { useRef, useCallback, FC } from "react";
import wrapperStyles from "../../components/constructor-element-wrapper/constructor-element-wrapper.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import {
  DELETE_DRUGGED_INGREDIENT,
  MOVE_INGREDIENT,
} from "../../services/actions/constructor-ingredients";
import { XYCoord } from "dnd-core";
import { useDrop, useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { draggedConstructorIngredients } from "../../selectors/selectors";
import { Card } from '../../types/ingredient'

type ConstructorElementProps = {
  index: number;
  item: Card;
}

type DragItem = {
  id: string;
  index: number;
}

export const ConstructorElementWrapper: FC<ConstructorElementProps> = ({ index, item }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const draggedIngredients = useSelector(draggedConstructorIngredients);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = draggedIngredients[dragIndex];
      const newCards = [...draggedIngredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      dispatch({
        type: MOVE_INGREDIENT,
        ingredients: newCards,
      });
    },
    [draggedIngredients, dispatch]
  );

  const [, drop] = useDrop({
    accept: "component",
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: () => ({ id: item._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  const deleteIngredient = (id: number) => {
    dispatch({
      type: DELETE_DRUGGED_INGREDIENT,
      id,
    });
  };

  drag(drop(ref));

  return (
    <div
      key={index}
      className={wrapperStyles.container}
      ref={ref}
      onDrop={e => e.preventDefault()}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => deleteIngredient(index)}
      />
    </div>
  );
};
