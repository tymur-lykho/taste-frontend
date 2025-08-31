import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectMyRecipes,
} from "../../redux/recipes/selectors";
import css from "./MyRecipes.module.css";
import RecipesCard from "../RecipeCard/RecipeCard";
import { useEffect } from "react";
import { fetchOwnRecipes } from "../../redux/recipes/operations";

export default function MyRecipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectMyRecipes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchOwnRecipes());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>Please wait, loading...</p>}
      {error && <p>error</p>}
      {recipes ? (
        <ul className={css.list}>
          {recipes.map((recipe) => (
            <li className={css.item} key={recipe._id}>
              <RecipesCard recipe={recipe} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No found recipe</p>
      )}
    </div>
  );
}
