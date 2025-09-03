import { useDispatch, useSelector } from "react-redux";
import {
  selectRecipes,
  selectHasNextPage,
  selectTotalItems,
} from "../../redux/recipes/selectors";
import { useEffect, useState } from "react";
import { fetchFavoritesRecipes } from "../../redux/recipes/operations";
import RecipesList from "../RecipesList/RecipesList";
import { useNavigate } from "react-router-dom";
import SearchResultEmpty from "../SearchResultEmpty/SearchResultEmpty";
import { clearRecipesState } from "../../redux/recipes/slice";

export default function FavoriteRecipes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const hasNext = useSelector(selectHasNextPage);
  const totalItems = useSelector(selectTotalItems);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(clearRecipesState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFavoritesRecipes(1));
    setPage(1);
  }, [dispatch, totalItems]);

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
        notFound={
          <SearchResultEmpty
            onAction={() => navigate("/")}
            cardText="You haven't saved any recipes yet, add the recipe to your favorites list."
            actionLabel="Go to recipes"
          />
        }
      />
    </>
  );
}
