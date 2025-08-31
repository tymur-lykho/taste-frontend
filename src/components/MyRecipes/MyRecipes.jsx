import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectMyRecipes,
  selectRecipesState,
  selectMyRecipesCount,
} from "../../redux/recipes/selectors";
import css from "./MyRecipes.module.css";
import { useEffect } from "react";
import { fetchOwnRecipes } from "../../redux/recipes/operations";
import RecipesCard from "../RecipeCard/RecipeCard";
import Loader from "../Loader/Loader";

export default function MyRecipes() {
  const dispatch = useDispatch();
  const recipesCount = useSelector(selectMyRecipesCount);
  const recipes = useSelector(selectMyRecipes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const { isMyRecipesLoaded } = useSelector(selectRecipesState);

  useEffect(() => {
    if (!isMyRecipesLoaded) {
      dispatch(fetchOwnRecipes());
    }
  }, [dispatch, isMyRecipesLoaded]);

  const recipesArray = Array.isArray(recipes) ? recipes : [];

  return (
    <div>
      <p className={css.count}>{recipesCount} recipes</p>
      {isLoading && <Loader />}
      {error && <p>error</p>}
      {recipesArray.length > 0 ? (
        <ul className={css.list}>
          {recipesArray.map((recipe) => (
            <li className={css.item} key={recipe._id}>
              <RecipesCard recipe={recipe} />
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>No recipes found</p>
      )}
    </div>
  );
}
