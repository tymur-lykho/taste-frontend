import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import clsx from "clsx";
import { Button } from "../Button/Button";
import Cal from "../Cal/Cal";
import Time from "../Time/Time";
import css from "./RecipeCard.module.css";
import AuthRequiredModal from "../Modal/AuthRequiredModal/AuthRequiredModal";
import Icon from "../../reuseable/Icon/Icon";
import { addToFavoritesRecipes } from "../../redux/recipes/operations";

export default function RecipesCard({ recipe, type }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(false);
  };
  const openModal = () => {
    setIsOpenModal(true);
  };

  const handleClickAddFavorite = () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    // Logic to add recipe to favorites !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    dispatch(addToFavoritesRecipes(recipe._id));
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
        {type !== "own" && (
          <Button
            className="white"
            title="Add to favorite"
            aria-label="Add to favorite"
            onClick={handleClickAddFavorite}
          >
            <Icon className={css["save-icon"]} iconName="save-icon" />
          </Button>
        )}
      </div>
      {isOpenModal && <AuthRequiredModal onClose={closeModal} />}
    </div>
  );
}
