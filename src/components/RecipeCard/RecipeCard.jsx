import { useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import clsx from "clsx";
import { Button } from "../Button/Button";
import Cal from "../Cal/Cal";
import Time from "../Time/Time";
import css from "./RecipeCard.module.css";
import ModalWindow from "../ModalWindow/ModalWindow";

export default function RecipesCard({ recipe }) {
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
        <Button
          className="white"
          title="Add to favorite"
          aria-label="Add to favorite"
          onClick={handleClickAddFavorite}
        >
          icon
        </Button>
      </div>
      {isOpenModal && (
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
      )}
    </div>
  );
}
