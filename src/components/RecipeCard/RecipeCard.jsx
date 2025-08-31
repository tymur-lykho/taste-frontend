import clsx from "clsx";
import { Button } from "../Button/Button";
import Cal from "../Cal/Cal";
import Time from "../Time/Time";
import css from "./RecipeCard.module.css";
import Icon from "../../reuseable/Icon/Icon";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavoritesRecipe, removeFromFavorites } from "../../redux/recipes/operations";

export default function RecipesCard({ recipe }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const isOwnRecipesRoute = location.pathname.includes('/profile/own');
  // const isFavoritesRecipesRoute = location.pathname.includes('/profile/favorites');

  const handleAddToFavorites = (recipeId) => {
    console.log("Adding recipe ID:", recipeId); ///
    dispatch(addFavoritesRecipe(recipeId));
  };

  const handleRemoveFromFavorites = (recipeId) => {
    console.log("Removing recipe ID:", recipeId); ///
    dispatch(removeFromFavorites(recipeId));
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
            className="white" 
            title="Add to favorite" 
            aria-label="Add to favorite"
            onClick={() => recipe.isFavorite 
              ? handleRemoveFromFavorites(recipe._id)
              : handleAddToFavorites(recipe._id)
            }
          >
            <Icon 
              className={clsx(css["save-icon"], {
                [css.active]: recipe.isFavorite
              })} 
              iconName="save-icon" 
            />
          </Button>
        )}


        {/* {!isOwnRecipesRoute && (
          {recipe.isFavorite ? (
        <button 
          onClick={() => handleRemoveFromFavorites(recipe._id)}
          className={css.favoriteBtn}
        >
          Remove from favorites
        </button>
       ) : (
        <button 
          onClick={() => handleAddToFavorites(recipe._id)}
          className={css.favoriteBtn}
        >
          Add to favorites
        </button>
       )}
        <Button className="white" title="Add to favorite" aria-label="Add to favorite">
        <Icon className={css["save-icon"]} iconName="save-icon" />
        </Button>)} */}
      </div>
    </div>
  );
}

