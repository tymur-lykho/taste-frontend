import { useDispatch, useSelector } from "react-redux";
import css from "./RecipePage.module.css";
import { useLocation, useParams } from "react-router-dom";
import {
  selectFavoritesId,
  selectRecipes,
} from "../../redux/recipes/selectors";
import { useEffect, useState } from "react";
import { fetchRecipesId } from "../../redux/recipes/operations";
import Container from "../../reuseable/Container/Container";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import clsx from "clsx";
import { Button } from "../../components/Button/Button";

export default function RecipePage() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const favoritesIds = useSelector(selectFavoritesId);
  const isFavorite = favoritesIds.includes(id);

  // const [isOpenModal, setIsOpenModal] = useState(false);
  // const openModal = () => setIsOpenModal(true);
  // const closeModal = useCallback(() => setIsOpenModal(false), []);

  const recipesFromStore = useSelector(selectRecipes);
  const recipeFromStore = recipesFromStore.find(
    (recipe) => String(recipe._id) === String(id)
  );

  const [recipe, setRecipe] = useState(location.state || recipeFromStore);
  console.log("🚀 ~ RecipePage ~ location.state:", location.state);
  console.log("🚀 ~ RecipePage ~ recipe:", recipe);

  useEffect(() => {
    if (!recipe) {
      dispatch(fetchRecipesId(id));
    }
  }, [id, recipe, dispatch]);

  if (!recipe) return <div>Loading...</div>;

  const normalizedUrl = recipe.thumb?.includes("preview")
    ? recipe.thumb.replace("preview", "preview/large")
    : recipe.thumb;
  return (
    <Container className={css.recipePage}>
      <div className={css.tumbImg}>
        <img
          src={normalizedUrl}
          alt={recipe.description}
          className={css["cardImg"]}
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
              {recipe.instructions.split(/\r?\n/).map((step, idx) => (
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
                <strong>Calories:</strong> Approximately {recipe.calories} kcal
                per serving
              </p>
            )}
          </section>
          <Button
            className={clsx("fill", css.btnSav)}
            title="Save"
            aria-label="Save"
          >
            Save
          </Button>
        </div>
      </div>
    </Container>
  );
}
