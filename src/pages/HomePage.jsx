import { useSelector } from "react-redux";
import RecipesList from "../components/RecipesList/RecipesList";
import SearchBox from "../components/SearchBox/SearchBox";
import { selectRecipes } from "../redux/recipes/selectors";

// export default function LoginPage() {
// }

export default function HomePage() {
  const allRecipes = useSelector(selectRecipes);

  return (
    <div>
      <SearchBox />
      <div>
        <h2>Recepies</h2>
        {/* <Filters /> */}
        <RecipesList recipes={allRecipes} />
      </div>
    </div>
  );
}
