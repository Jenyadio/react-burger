import React, { useRef, useCallback } from "react";
import wrapperStyles from "../../components/constructor-element-wrapper/constructor-element-wrapper.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  DELETE_DRUGGED_INGREDIENT,
  MOVE_INGREDIENT,
} from "../../services/actions/constructor-ingredients";
import { useDrop, useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import dataStructure from "../../utils/data-proptype-structure";
import { draggedConstructorIngredients } from "../../selectors/selectors";

const ConstructorElementWrapper = ({ index, item }) => {
  const dispatch = useDispatch();
  const ref = useRef();

  const draggedIngredients = useSelector(draggedConstructorIngredients);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
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

  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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

  const deleteIngredient = (id) => {
    dispatch({
      type: DELETE_DRUGGED_INGREDIENT,
      id,
    });
  };

  drag(drop(ref));

  const preventDefault = (e) => e.preventDefault();

  return (
    <div
      key={index}
      className={wrapperStyles.container}
      ref={ref}
      onDrop={preventDefault}
      data-handler-id={handlerId}
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

ConstructorElementWrapper.propTypes = {
  item: PropTypes.shape(dataStructure).isRequired,
  index: PropTypes.number.isRequired,
};

export default ConstructorElementWrapper;
