import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import clsx from "clsx";

import css from "./RecipePage.module.css";
import Container from "../../reuseable/Container/Container";
import Icon from "../../reuseable/Icon/Icon.jsx";
import { Button } from "../../components/Button/Button.jsx";
import FavoriteAuthModal from "../../reuseable/FavoriteAuthModal/FavoriteAuthModal.jsx";
import { selectRecipes, selectRecipesId } from "../../redux/recipes/selectors";
import { fetchFavoritesId, fetchRecipesId } from "../../redux/recipes/operations.js";
import { resetCurrentRecipe } from "../../redux/recipes/slice.js";
import { useFavorite } from "../../components/hooks/useFavorite.js";

export default function RecipePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  const recipesFromStore = useSelector(selectRecipes);
  const recipeCurrent = useSelector(selectRecipesId);

  const recipeFromStore = recipesFromStore.find(
    (r) => String(r._id) === String(id)
  );

  const recipe = useMemo(() => {
    return location.state || recipeFromStore || recipeCurrent;
  }, [location.state, recipeFromStore, recipeCurrent]);

  useEffect(() => {
    if (!recipe) {
      dispatch(fetchRecipesId(id));
    }
  }, [dispatch, recipe, id]);

  useEffect(() => {
    return () => {
      dispatch(resetCurrentRecipe());
    };
  }, [dispatch]);

  if (!recipe) return null;

  const normalizedUrl = recipe?.thumb?.includes("preview")
    ? recipe.thumb.replace("preview", "preview/large")
    : recipe.thumb;

  const {
    isFavorite,
    isProcessing,
    isOpenModal,
    closeModal,
    handleToggleFavorite,
  } = useFavorite(recipe);

  return (
    <Container className={css.recipePage}>
      <div className={css.tumbImg}>
        <img
          src={normalizedUrl}
          alt={recipe.description}
          className={css.cardImg}
        />
      </div>

      <h1 className={css.titleProduct}>{recipe.title}</h1>

      <div className={css.cardRecipe}>
        <div className={css.wrapRecipe}>
          <section className={css.about}>
            <h2>About Recipe</h2>
            <p>{recipe.description}</p>
          </section>

          <section className={css.ingredients}>
            <h2>Ingredients</h2>
            <ul className={css.list}>
              {recipe.ingredients?.map((item) => (
                <li key={item._id}>
                  {item.id?.name || item.name} {item.measure || ""}
                </li>
              ))}
            </ul>
          </section>

          <section className={css.steps}>
            <h2>Preparation Steps</h2>
            <ol className={css.stepsWrap}>
              {recipe.instructions
                .split(/\r?\n/)
                .filter((step) => step.trim() !== "")
                .map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
            </ol>
          </section>
        </div>

        <div className={css.right}>
          <section className={css.generalInfo}>
            <h3 className={css.title}>General informations</h3>
            <p>
              <strong>Category:</strong> {recipe.category?.name || "N/A"}
            </p>
            {recipe.cuisine && (
              <p>
                <strong>Cuisine:</strong> {recipe.cuisine}
              </p>
            )}
            {recipe.time && (
              <p>
                <strong>Cooking Time:</strong> {recipe.time} min
              </p>
            )}
            {recipe.calories && (
              <p>
                <strong>Calories:</strong> ~{recipe.calories} kcal per serving
              </p>
            )}
          </section>

          <Button
            className={clsx("fill", css.btnSav)}
            onClick={handleToggleFavorite}
            disabled={isProcessing}
          >
            {isFavorite ? "Unsave" : "Save"}
            <Icon
              className={isFavorite ? css.unsave : css.saveWhite}
              iconName="save-icon"
            />
          </Button>
        </div>
      </div>

      {isOpenModal && <FavoriteAuthModal onClose={closeModal} />}
    </Container>
  );
}
