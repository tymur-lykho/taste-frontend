import { useSelector } from "react-redux";
import {
  selectRecipes,
  selectIsLoading,
  selectError,
} from "../../redux/recipes/selectors";
import RecipesCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";

export default function RecipesList() {
  const recipes = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "tomato" }}>{error}</p>}

      {recipes?.length ? (
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