import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectRecipes,
  selectRecipesCount,
} from "../../redux/recipes/selectors";
import css from "./RecipesList.module.css";
import RecipesCard from "../RecipeCard/RecipeCard";
import { useEffect } from "react";
import { fetchRecipes } from "../../redux/recipes/operations";

export default function RecipesList() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const recipesCount = useSelector(selectRecipesCount);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div>
      <p className={css.count}>{recipesCount} recipes</p>
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
