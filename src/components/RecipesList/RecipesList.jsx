import { useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectRecipes,
} from "../../redux/recipes/selectors";
import css from "./RecipesList.module.css";
import RecipesCard from "../RecipeCard/RecipeCard";
import { useEffect } from "react";

export default function RecipesList() {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const recipes = useSelector(selectRecipes) || [];

  return (
    <div>
      {isLoading && <p>Please wait, loading...</p>}
      {error && <p>error</p>}
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li className={css.item} key={recipe.id}>
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
