import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRecipes,
  selectIsLoading,
} from "../../redux/recipes/selectors";
import { fetchRecipes } from "../../redux/recipes/operations";
import RecipesCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";

export default function RecipesList() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);


  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}

      {recipes && recipes.length ? (
        <ul className={css.list}>
          {recipes.map((recipe) => (
            <li className={css.item} key={recipe._id || recipe.id}>
              <RecipesCard recipe={recipe} />
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No found recipe</p>
      )}
    </div>
  );
}