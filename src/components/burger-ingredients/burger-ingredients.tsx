import {Tabs} from "../tabs/tabs";
import {Ingredients} from "../ingredients/ingredients";
import burgerIngredientsStyles from "../../components/burger-ingredients/burger-ingredients.module.css";
import { useInView } from "react-intersection-observer";

function BurgerIngredients() {

  const [bunRef, inViewBun] = useInView({threshold: 0});
  const [sauceRef, inViewSauce] = useInView({threshold: 0});
  const [mainRef, inViewMain] = useInView({threshold: 0});

  return (
    <section>
      <header>
        <h1 className="mt-10 mb-5 text text_type_main-large">
          Соберите бургер
        </h1>
        <Tabs inViewBun={inViewBun} inViewSauce={inViewSauce} inViewMain={inViewMain} />
      </header>
      <main className={burgerIngredientsStyles.box} id="ingredients">
        <Ingredients name="Булки" type="bun" id="bun" tabsRef={bunRef}/>
        <Ingredients name="Соусы" type="sauce" id="sauce" tabsRef={sauceRef}/>
        <Ingredients name="Начинки" type="main" id="main" tabsRef={mainRef}/>
      </main>
    </section>
  );
}

export default BurgerIngredients;
