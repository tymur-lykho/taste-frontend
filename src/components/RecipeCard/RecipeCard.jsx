import clsx from "clsx";
import { Button } from "../Button/Button";
import Cal from "../Cal/Cal";
import Time from "../Time/Time";
import css from "./RecipeCard.module.css";
import Icon from "../../reuseable/Icon/Icon";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavoritesRecipe, removeFromFavorites } from "../../redux/recipes/operations";
import { selectFavoriteRecipes } from "../../redux/recipes/selectors";

export default function RecipesCard({ recipe }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  const isOwnRecipesRoute = location.pathname.includes('/profile/own');
  let favorite = false;

  if (favoriteRecipes !== undefined) {
    favorite = favoriteRecipes.includes(recipe._id) ? true : false;
  }

  const handleToggleFavorite = () => {
    if (favorite) {
      dispatch(removeFromFavorites(recipe._id));
    } else {
      dispatch(addFavoritesRecipe(recipe._id));
    }
  };

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
        <Time className={css.time} time={recipe.time} />
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

        {!isOwnRecipesRoute && (
          <Button 
            className={clsx("white", {
              [css.favoriteActive]: favorite
            })} 
            title={favorite ? "Remove from favorite" : "Add to favorite"} 
            aria-label={favorite ? "Remove from favorite" : "Add to favorite"}
            onClick={handleToggleFavorite}
          >
            <Icon 
              className={clsx(css["save-icon"], {
                [css.active]: favorite
              })} 
              iconName="save-icon" 
            />
          </Button>
        )}
      </div>
    </div>
  );
}

