import clsx from "clsx";
import { Button } from "../Button/Button";
import Cal from "../Cal/Cal";
import Time from "../Time/Time";
import css from "./RecipeCard.module.css";

export default function RecipesCard({ recipe }) {
  return (
    <div className={css["card"]}>
      <div className={css.tumb}>
        <img
          src={recipe.thumb}
          alt={recipe.description}
          className={css["card-img"]}
        />
      </div>
      <div className={css["card-header"]}>
        <h3 className={css["card-title"]}>{recipe.title}</h3>
        <Time time={recipe.time} />
      </div>
      <div className={css["card-info"]}>
        <p className={css["card-desc"]}>{recipe.description}</p>
        <Cal cal={recipe.calories} />
      </div>
      <div className={css["card-btn"]}>
        <Button
          className={clsx("white", css.md289)}
          title="Learn more"
          aria-label="Learn more"
        >
          Learn more
        </Button>
        <Button className="white" title="Add to favorite" aria-label="Add to favorite">
          icon
        </Button>
      </div>
    </div>
  );
}
