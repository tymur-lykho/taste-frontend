import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addFavoriteLocally,
  removeFavoriteLocally,
} from "../../redux/recipes/slice";
import {
  deleteFavoritesId,
  postFavoritesId,
} from "../../redux/recipes/operations";

export const useFavoriteHandler = ({
  isLoggedIn,
  isFavorite,
  id,
  openModal,
}) => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

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

  return { handleClickAddFavorite, isProcessing };
};
