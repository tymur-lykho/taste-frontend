import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnRecipes, fetchFavoritesRecipes } from "../redux/recipes/operations";
import { selectRecipes } from "../redux/recipes/selectors";
import RecipesList from "../components/RecipesList/RecipesList";
import SectionRecipes from "../components/SectionRecipes/SectionRecipes";
import NavigationProfile from "../components/NavigationProfile/NavigationProfile";

export default function UserPage() {
  // return <h1>User Page | My recipes | Favourites</h1>;

  const dispatch = useDispatch();
   const recipes = useSelector(selectRecipes);

  useEffect(() => {
    dispatch(fetchOwnRecipes());
  }, [dispatch]);

  return (
    <div>
      {/* <SectionRecipes /> */}
      <NavigationProfile/>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <RecipesList recipe={recipe} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No found my recipes</p>
      )}
    </div>
  );
};

