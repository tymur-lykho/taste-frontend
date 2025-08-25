import RecipesList from "../RecipesList/RecipesList";
import css from "./SectionRecipes.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectRecipes } from "../../redux/recipes/selectors";
import clsx from "clsx";
import { useSelector } from "react-redux";

export default function SectionRecipes({ type }) {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  let title = "";

  if (type === "profile" && isAuthenticated) {
    title = "My profile";
  } else {
    title = "Recepies";
  }

  return (
    <div className={clsx("container", css["all-recipes"])}>
      <h2 className={css.title}>{title}</h2>
      {/* <Filters filters={filters} /> */}
      <RecipesList />
    </div>
  );
}
