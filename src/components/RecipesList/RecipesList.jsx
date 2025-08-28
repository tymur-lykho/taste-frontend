import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRecipes,
  selectIsLoading,
  selectError,
} from "../../redux/recipes/selectors";
import { fetchRecipes } from "../../redux/recipes/operations";
import RecipesCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";

export default function RecipesList() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "tomato" }}>{error}</p>}

      {recipes && recipes.length ? (
        <ul className={css.list}>
          {recipes.map((r) => (
            <li className={css.item} key={r._id || r.id}>
              <RecipesCard recipe={r} />
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No found recipe</p>
      )}
    </div>
  );
}