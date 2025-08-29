import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectPagination,
  selectRecipes,
} from "../../redux/recipes/selectors";
import css from "./RecipesList.module.css";
import RecipesCard from "../RecipeCard/RecipeCard";
import { useEffect } from "react";
import { fetchFiltersRecipes } from "../../redux/filters/operations";
import { nextPage } from "../../redux/recipes/slice";
import { Button } from "../Button/Button";
import clsx from "clsx";

export default function RecipesList({ type, userId }) {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const pagination = useSelector(selectPagination);

  useEffect(() => {
    dispatch(fetchFiltersRecipes({ type, userId }));
  }, [dispatch, type, userId]);

  const handleLoadMore = () => {
    if (!pagination.hasNextPage || isLoading) {
      return;
    }
    dispatch(nextPage());
    dispatch(fetchFiltersRecipes({ type, userId }));
  };

  return (
    <div>
      {isLoading && <p>Please wait, loading...</p>}
      {error && <p>{error}</p>}
      {recipes ? (
        <div>
          <ul className={css.list}>
            {recipes.map((recipe) => (
              <li className={css.item} key={recipe._id}>
                <RecipesCard recipe={recipe} />
              </li>
            ))}
          </ul>
          {pagination.hasNextPage && (
            <button
              className={clsx(css.loadMore, "fill")}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}{" "}
            </button>
          )}
        </div>
      ) : (
        <p>No found recipe</p>
      )}
    </div>
  );
}
