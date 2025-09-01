import { useSelector } from "react-redux";
import css from "./RecipePage.module.css";
import { useLocation, useParams } from "react-router-dom";
import { selectRecipes } from "../../redux/recipes/selectors";
import { useState } from "react";
import Container from "../../reuseable/Container/Container";
import clsx from "clsx";
import { useFavorite } from "../../components/hooks/useFavorite.js";
import { Button } from "../../components/Button/Button.jsx";
import Icon from "../../reuseable/Icon/Icon.jsx";
import ModalWindow from "../../components/ModalWindow/ModalWindow.jsx";

export default function RecipePage() {
  const { id } = useParams();
  const location = useLocation();

  const recipesFromStore = useSelector(selectRecipes);
  const recipeFromStore = recipesFromStore.find(
    (recipe) => String(recipe._id) === String(id)
  );

  const [recipe, setRecipe] = useState(location.state || recipeFromStore);

  if (!recipe) return <div>Loading...</div>;

  const {
    isFavorite,
    isProcessing,
    isOpenModal,
    closeModal,
    handleToggleFavorite,
  } = useFavorite(recipe._id);

  const normalizedUrl = recipe.thumb?.includes("preview")
    ? recipe.thumb.replace("preview", "preview/large")
    : recipe.thumb;

  return (
    <div>
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
                  <strong>Calories:</strong> Approximately {recipe.calories}{" "}
                  kcal per serving
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
      </Container>
      {isOpenModal && (
        <ModalWindow onClose={closeModal}>
          <h3 className={css.title}>Error while saving</h3>
          <p className={css.message}>
            To save this recipe, you need to <br />
            authorizate first
          </p>
          <div className={css.actions}>
            <Button
              type="link"
              to="/login"
              className={clsx(css.loginBtn, "white")}
            >
              Log in
            </Button>
            <Button
              type="link"
              to="/register"
              className={clsx(css.registerBtn, "fill")}
            >
              Register
            </Button>
          </div>
        </ModalWindow>
      )}
    </div>
  );
}
