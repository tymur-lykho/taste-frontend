import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectFavoriteRecipes,
  selectRecipesState,
  selectFavoriteRecipesCount,
} from "../../redux/recipes/selectors";
import css from "./FavoriteRecipes.module.css";
import RecipesCard from "../RecipeCard/RecipeCard";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import { fetchFavoritesRecipes } from "../../redux/recipes/operations";

export default function FavoriteRecipes() {
  const dispatch = useDispatch();
  const recipesCount = useSelector(selectFavoriteRecipesCount);
  const recipes = useSelector(selectFavoriteRecipes);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const { isFavoritesLoaded } = useSelector(selectRecipesState);

  useEffect(() => {
    if (!isFavoritesLoaded) {
      dispatch(fetchFavoritesRecipes());
    }
  }, [dispatch, isFavoritesLoaded]);

  return (
    <div>
      <p className={css.count}>{recipesCount} recipes</p>
      {isLoading && <Loader/>}
      {error && <p>error</p>}
      {Array.isArray(recipes) && recipes.length > 0 ? (
        <ul className={css.list}>
          {recipes.map((recipe) => (
            <li className={css.item} key={recipe._id}>
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
