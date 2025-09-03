import { useState } from "react";
import clsx from "clsx";
import Cal from "../Cal/Cal";
import Time from "../Time/Time";
import { Button } from "../Button/Button";
import Icon from "../../reuseable/Icon/Icon";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoritesRecipe,
  removeFromFavorites,
} from "../../redux/recipes/operations";
import { selectFavoriteRecipes } from "../../redux/recipes/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import AuthRequiredModal from "../Modal/AuthRequiredModal/AuthRequiredModal";

import css from "./RecipeCard.module.css";

export default function RecipesCard({ recipe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const isOwnRecipesRoute = location.pathname.includes("/profile/own");
  let favorite = false;

  if (favoriteRecipes !== undefined) {
    favorite = favoriteRecipes.includes(recipe._id) ? true : false;
  }

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
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
          onClick={() => navigate("/recipe/" + recipe._id)}
        >
          Learn more
        </Button>

        {!isOwnRecipesRoute && (
          <Button
            className={clsx("white", css.md40, {
              [css.favoriteActive]: favorite,
            })}
            title={favorite ? "Remove from favorite" : "Add to favorite"}
            aria-label={favorite ? "Remove from favorite" : "Add to favorite"}
            onClick={handleToggleFavorite}
          >
            <Icon
              className={clsx(css["save-icon"], {
                [css.active]: favorite,
              })}
              iconName="save-icon"
            />
          </Button>
        )}
      </div>
      {isOpenModal && <AuthRequiredModal onClose={closeModal} />}
    </div>
  );
}
