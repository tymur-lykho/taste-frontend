import { useDispatch, useSelector } from "react-redux";
import {
  selectRecipes,
  selectHasNextPage,
  selectTotalItems,
} from "../../redux/recipes/selectors";
import { useEffect, useState } from "react";
import { fetchFavoritesRecipes } from "../../redux/recipes/operations";
import RecipesList from "../RecipesList/RecipesList";

export default function FavoriteRecipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const hasNext = useSelector(selectHasNextPage);
  const totalItems = useSelector(selectTotalItems);

      const [page, setPage] = useState(1);

      useEffect(() => {
        dispatch(fetchFavoritesRecipes(page));
    }, [dispatch, page]);

  return (
    <>
      <RecipesList
        hasNextPage={hasNext}
        totalItems={totalItems}
        data={recipes}
        setPage={setPage}
      />
    </>
  );
}
