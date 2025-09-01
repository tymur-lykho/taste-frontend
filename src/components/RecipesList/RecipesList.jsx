import clsx from "clsx";
// import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RecipesCard from "../RecipeCard/RecipeCard";

import {
  selectError,
  selectIsLoading,
  selectPagination,
  selectRecipes,
} from "../../redux/recipes/selectors";
import { nextPage } from "../../redux/recipes/slice";

import css from "./RecipesList.module.css";

export default function RecipesList() {
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);
  const pagination = useSelector(selectPagination);

  // const [searchParams, setSearchParams] = useSearchParams();

  const handleLoadMore = () => {
    if (!pagination.hasNextPage || isLoading) {
      return;
    }
    // const newUrl = new URLSearchParams(searchParams);
    // newUrl.set("page", pagination.page);
    // setSearchParams(newUrl);
    dispatch(nextPage());
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
              {isLoading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      ) : (
        <p>No found recipe</p>
      )}
    </div>
  );
}
