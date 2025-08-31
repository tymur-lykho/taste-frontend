import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectRecipes,
} from "../../redux/recipes/selectors";
import css from "./RecipesList.module.css";
import RecipesCard from "../RecipeCard/RecipeCard";
import { useEffect } from "react";
import {
  fetchRecipes,
  fetchFavoritesRecipes,
  fetchOwnRecipes,
} from "../../redux/recipes/operations";
import { resetRecipes } from "../../redux/recipes/slice";

export default function RecipesList({ type }) {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(resetRecipes()); // очистити старі
    if (type === "favorites") {
      dispatch(fetchFavoritesRecipes());
    } else if (type === "own") {
      dispatch(fetchOwnRecipes());
    } else {
      dispatch(fetchRecipes());
    }
  }, [dispatch, type]);

  return (
    <div>
      {isLoading && <p>Please wait, loading...</p>}
      {error && <p>{error}</p>}
      {recipes?.length ? (
        <ul className={css.list}>
          {recipes.map((recipe) => (
            <li className={css.item} key={recipe._id}>
              <RecipesCard recipe={recipe} type={type} />
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p> No found recipe</p>
      )}
    </div>
  );
}
