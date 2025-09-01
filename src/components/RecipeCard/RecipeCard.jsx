import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import clsx from "clsx";
import { Button } from "../Button/Button";
import Cal from "../Cal/Cal";
import Time from "../Time/Time";
import css from "./RecipeCard.module.css";
import ModalWindow from "../ModalWindow/ModalWindow";
import Icon from "../../reuseable/Icon/Icon";
import { selectFavoritesId } from "../../redux/recipes/selectors";
import {
  deleteFavoritesId,
  fetchFavoritesId,
  postFavoritesId,
} from "../../redux/recipes/operations";
import { useNavigate } from "react-router-dom";
import {
  addFavoriteLocally,
  removeFavoriteLocally,
} from "../../redux/recipes/slice";

export default function RecipesCard({ recipe }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isFavorites = useSelector(selectFavoritesId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const id = recipe._id;

  const isFavorite = isFavorites.includes(id);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const handleClickAddFavorite = useCallback(async () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (isFavorite) {
        dispatch(removeFavoriteLocally(id));
        await dispatch(deleteFavoritesId(id)).unwrap();
      } else {
        dispatch(addFavoriteLocally(id));
        await dispatch(postFavoritesId(id)).unwrap();
      }
    } catch (error) {
      if (isFavorite) {
        dispatch(addFavoriteLocally(id));
      } else {
        dispatch(removeFavoriteLocally(id));
      }
    } finally {
      setIsProcessing(false);
    }
  }, [isLoggedIn, isFavorite, isProcessing, dispatch, id, openModal]);

  const handleClickLearnMore = () => {
    navigate(`/recipes/${id}`, { state: recipe });
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
          onClick={handleClickLearnMore}
        >
          Learn more
        </Button>
        <Button
          className={isFavorite ? "fill" : "white"}
          title="Add to favorite"
          aria-label="Add to favorite"
          onClick={handleClickAddFavorite}
          disabled={isProcessing}
        >
          <Icon
            className={isFavorite ? css.saveFill : css.saveWhite}
            iconName="save-icon"
          />
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
