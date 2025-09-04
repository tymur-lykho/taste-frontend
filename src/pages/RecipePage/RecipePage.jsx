import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage.jsx";
import AuthRequiredModal from "../../components/Modal/AuthRequiredModal/AuthRequiredModal.jsx";

import Icon from "../../reuseable/Icon/Icon.jsx";
import Container from "../../reuseable/Container/Container";
import { Button } from "../../components/Button/Button.jsx";

import {
  selectRecipes,
  selectRecipesId,
  selectIsLoading,
  selectFavoriteRecipes,
} from "../../redux/recipes/selectors";

import {
  fetchRecipesId,
  fetchFavoritesId,
  removeFromFavorites,
  addFavoritesRecipe,
} from "../../redux/recipes/operations.js";
import { resetCurrentRecipe } from "../../redux/recipes/slice.js";

import css from "./RecipePage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

export default function RecipePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const recipeCurrent = useSelector(selectRecipesId);
  const recipesFromStore = useSelector(selectRecipes);
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  const categories = useSelector((state) => state.filters.categories);
  const ingredientsAll = useSelector((state) => state.filters.ingredients);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  let favorite = false;

  if (favoriteRecipes !== undefined) {
    favorite = favoriteRecipes.includes(id) ? true : false;
  }

  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    if (favorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addFavoritesRecipe(id));
    }
  };

  const recipeFromStore = recipesFromStore.find(
    (recipe) => String(recipe._id) === String(id)
  );

  const [recipe, setRecipe] = useState(
    location.state || recipeFromStore || recipeCurrent
  );

  useEffect(() => {
    if (isLoggedIn) dispatch(fetchFavoritesId());
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    if (recipeCurrent) {
      setRecipe(recipeCurrent);
    } else if (!recipe && id) {
      dispatch(fetchRecipesId(id));
    }
  }, [dispatch, recipe, recipeCurrent, id]);

  useEffect(() => {
    return () => {
      dispatch(resetCurrentRecipe());
    };
  }, [dispatch]);

  if (isLoading && !recipe) {
    return (
      <Container className={css.recipePage}>
        <Loader />
      </Container>
    );
  }

  if (!recipe) {
    return <NotFoundPage />;
  }

  const normalizedUrl = recipe?.thumb?.includes("preview")
    ? recipe.thumb.replace("preview", "preview/large")
    : recipe.thumb;

  // const getCategoryName = () => {
  //   const category = categories.find(
  //     (c) => String(c._id) === String(recipe.category)
  //   );
  //   return category ? category.name : "N/A";
  // };

  // const getIngredientName = (ingredient) => {
  //   const searchIngredient = ingredientsAll.find(
  //     (i) => String(i._id) === String(ingredient.id)
  //   );
  //   return searchIngredient ? searchIngredient.name : "Unknown ingredient";
  // };

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
            <div className={css.ingredientsWrap}>
              <ul className={css.list}>
                {recipe.ingredients?.map((item) => (
                  <li key={item._id}>
                    {item.id?.name || item.name} {item.measure || ""}
                  </li>
                ))}
              </ul>
            </div>
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
          >
            {favorite ? "Unsave" : "Save"}
            <Icon
              className={favorite ? css.unsave : css.saveWhite}
              iconName="save-icon"
            />
          </Button>
        </div>
      </div>

      {isOpenModal && <AuthRequiredModal onClose={closeModal} />}
    </Container>
  );
}
