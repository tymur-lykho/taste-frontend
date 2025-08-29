import RecipesList from "../RecipesList/RecipesList";
import css from "./SectionRecipes.module.css";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import Container from "../../reuseable/Container/Container.jsx";

export default function SectionRecipes({ type }) {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  let title = "";
  const userId = type === "profile" && isAuthenticated ? user._id : null;

  if (type === "profile" && isAuthenticated) {
    title = "My profile";
  } else {
    title = "Recipes";
  }

  return (
    <Container>
      <h2 className={css.title}>{title}</h2>
      {/* <Filters filters={filters} /> */}
      <RecipesList  />
      <RecipesList type="profile" userId={userId} />
    </Container>
  );
}
