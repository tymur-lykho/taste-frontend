import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectFavoritesId } from "../../redux/recipes/selectors";
import {
  deleteFavoritesId,
  postFavoritesId,
} from "../../redux/recipes/operations";
import {
  addFavoriteLocally,
  removeFavoriteLocally,
} from "../../redux/recipes/slice";

export function useFavorite(recipeId) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favoritesIds = useSelector(selectFavoritesId);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isFavorite = favoritesIds.includes(recipeId);

  const closeModal = useCallback(() => setIsOpenModal(false), []);
  const openModal = useCallback(() => setIsOpenModal(true), []);

  const handleToggleFavorite = useCallback(async () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (isFavorite) {
        dispatch(removeFavoriteLocally(recipeId));
        await dispatch(deleteFavoritesId(recipeId)).unwrap();
      } else {
        dispatch(addFavoriteLocally(recipeId));
        await dispatch(postFavoritesId(recipeId)).unwrap();
      }
    } catch (error) {
      if (isFavorite) {
        dispatch(addFavoriteLocally(recipeId));
      } else {
        dispatch(removeFavoriteLocally(recipeId));
      }
    } finally {
      setIsProcessing(false);
    }
  }, [isLoggedIn, isFavorite, isProcessing, dispatch, recipeId, openModal]);

  return {
    isFavorite,
    isProcessing,
    isOpenModal,
    closeModal,
    handleToggleFavorite,
  };
}
