import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectFavoriteRecipes } from "../../redux/recipes/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import {
  addFavoritesRecipe,
  removeFromFavorites,
} from "../../redux/recipes/operations";

export function useFavorite(recipe) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const closeModal = useCallback(() => setIsOpenModal(false), []);
  const openModal = useCallback(() => setIsOpenModal(true), []);

  const isOwnRecipesRoute = location.pathname.includes("/profile/own");

  const isFavorite = favoriteRecipes?.includes(recipe._id) ?? false;

  const handleToggleFavorite = useCallback(async () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      if (isFavorite) {
        await dispatch(removeFromFavorites(recipe._id));
      } else {
        await dispatch(addFavoritesRecipe(recipe._id));
      }
    } finally {
      setIsProcessing(false);
    }
  }, [isLoggedIn, isFavorite, isProcessing, dispatch, recipe._id, openModal]);

  return {
    isOwnRecipesRoute,
    isFavorite,
    isProcessing,
    isOpenModal,
    closeModal,
    handleToggleFavorite,
  };
}
