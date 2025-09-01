import { useDispatch, useSelector } from "react-redux";
import css from "./RecipePage.module.css";
import { useLocation, useParams } from "react-router-dom";
import { selectRecipes } from "../../redux/recipes/selectors";
import { useEffect, useState } from "react";
import { fetchRecipesId } from "../../redux/recipes/operations";

export default function RecipePage() {
  const { id } = useParams();

  const location = useLocation();
  const dispatch = useDispatch();

  const recipesFromStore = useSelector(selectRecipes);
 
  const recipeFromStore = recipesFromStore.find(
    (recipe) => String(recipe._id) === String(id)
  );
  
  const [recipe, setRecipe] = useState(location.state || recipeFromStore);

  useEffect(() => {
    if (!recipe) {
      dispatch(fetchRecipesId(id));
    }
  }, [id, recipe, dispatch]);

  if (!recipe) return <div>Loading...</div>;

  const normalizedUrl = recipe.thumb.includes("preview")
  ? recipe.thumb.replace("preview", "large")
  : recipe.thumb;

console.log(normalizedUrl);


  return (
    <div className={css.recipePage}>
      <h1>{recipe.title}</h1>
      <div className={css.tumb}>
        <img
          src={normalizedUrl}
          alt={recipe.description}
          className={css["card-img"]}
        />
      </div>

      <section className={css.generalInfo}>
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
            <strong>Calories:</strong> {recipe.calories} kcal
          </p>
        )}
      </section>

      <section className={css.about}>
        <h2>About Recipe</h2>
        <p>{recipe.description}</p>
      </section>

      <section className={css.ingredients}>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients?.map((item) => (
            <li key={item._id}>
              {item.id?.name || item.name} {item.measure || ""}
            </li>
          ))}
        </ul>
      </section>

      <section className={css.steps}>
        <h2>Preparation Steps</h2>
        <ol>
          {recipe.instructions.split(/\r?\n/).map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
