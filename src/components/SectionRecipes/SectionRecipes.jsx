import RecipesList from "../RecipesList/RecipesList";
import MyRecipes from "../MyRecipes/MyRecipes.jsx";
import css from "./SectionRecipes.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import Container from "../../reuseable/Container/Container.jsx";

export default function SectionRecipes({ type }) {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  let title = "";

  if (type === "profile" && isAuthenticated) {
    title = "My profile";
  } else {
    title = "Recipes";
  }

  return (
    <Container>
      <h2 className={css.title}>{title}</h2>
      {/* <Filters filters={filters} /> */}
      <RecipesList />
      <MyRecipes/>
    </Container>
  );
}
