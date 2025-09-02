import clsx from "clsx";
import { useState } from "react";
import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors";

import Cal from "../Cal/Cal";
import Time from "../Time/Time";
import { Button } from "../Button/Button";
import Icon from "../../reuseable/Icon/Icon";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  addFavoritesRecipe,
  removeFromFavorites,
} from "../../redux/recipes/operations";
import { selectFavoriteRecipes } from "../../redux/recipes/selectors";

import css from "./RecipeCard.module.css";

export default function RecipesCard({ recipe }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite || false);

  const isOwnRecipesRoute = location.pathname.includes("/profile/own");
  // const isFavoritesRecipesRoute = location.pathname.includes('/profile/favorites');

  useEffect(() => {
    const favorite = favoriteRecipes.some((fav) => fav._id === recipe._id);
    setIsFavorite(favorite);
  }, [recipe._id, favoriteRecipes]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      console.log("Removing from favorites:", recipe._id);
      dispatch(removeFromFavorites(recipe._id));
      setIsFavorite(false);
    } else {
      console.log("Adding to favorites:", recipe._id);
      dispatch(addFavoritesRecipe(recipe._id));
      setIsFavorite(true);
    }
  };

  // const handleAddToFavorites = (recipeId) => {
  //   console.log("Adding recipe ID:", recipeId);
  //   dispatch(addFavoritesRecipe(recipeId));
  // };

  // const handleRemoveFromFavorites = (recipeId) => {
  //   console.log("Removing recipe ID:", recipeId);
  //   dispatch(removeFromFavorites(recipeId));
  // };

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
              [css.favoriteActive]: isFavorite,
            })}
            title={isFavorite ? "Remove from favorite" : "Add to favorite"}
            aria-label={isFavorite ? "Remove from favorite" : "Add to favorite"}
            onClick={handleToggleFavorite}
          >
            <Icon
              className={clsx(css["save-icon"], {
                [css.active]: isFavorite,
              })}
              iconName="save-icon"
            />
          </Button>
        )}

        {/* {!isOwnRecipesRoute && (
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
        )} */}

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
      {/* {isOpenModal && (
        <ModalWindow onClose={closeModal}>
          <h3 className={css.title}>Error while saving</h3>
          <p className={css.message}>
            To save this recipe, you need to <br />
            authorizate first
          </p>
          <div className={css.actions}>
            <Button
              type="link"
              to="/login"
              className={clsx(css.loginBtn, "white")}
            >
              Log in
            </Button>
            <Button
              type="link"
              to="/register"
              className={clsx(css.registerBtn, "fill")}
            >
              Register
            </Button>
          </div>
        </ModalWindow>
      )} */}
    </div>
  );
}
