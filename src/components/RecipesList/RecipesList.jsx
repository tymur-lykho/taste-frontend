import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectPagination,
  selectRecipes,
  selectOwn,
  selectFavorites,
} from "../../redux/recipes/selectors";
import css from "./RecipesList.module.css";
import RecipesCard from "../RecipeCard/RecipeCard";
import { nextPage } from "../../redux/recipes/slice";
import { Button } from "../Button/Button";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

export default function RecipesList({ type }) {
  const dispatch = useDispatch();
  const recipesAll = useSelector(selectRecipes);
  const recipesOwn = useSelector(selectOwn);
  const recipesFavorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const pagination = useSelector(selectPagination);
  const [searchParams, setSearchParams] = useSearchParams();

  let recipes = [];
  if (type === "own") {
    recipes = recipesOwn;
  } else if (type === "favorites") {
    recipes = recipesFavorites;
  } else {
    recipes = recipesAll;
  }

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
