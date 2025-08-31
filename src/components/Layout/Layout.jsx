import AppBar from "../AppBar/AppBar";
import Footer from "../Footer/Footer";
import css from "./Layout.module.css";
// import { useEffect } from "react";
// import { fetchRecipes } from "../../redux/recipes/operations";
// import { useDispatch, useSelector } from "react-redux";
// import { selectRecipes } from "../../redux/recipes/selectors";

export default function Layout({ children }) {
  // const dispatch = useDispatch();
  // const recipes = useSelector(selectRecipes);

  // useEffect(() => {
  //   if (recipes.length === 0) {
  //     dispatch(fetchRecipes());
  //   }
  // }, [dispatch, recipes.length]);

  return (
    <>
      <AppBar />
      <main className={css.main}>{children}</main>
      <Footer />
    </>
  );
}
