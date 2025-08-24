import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import { fetchRecipes } from "../../redux/recipes/operations";
import { useDispatch } from "react-redux";

export default function Layout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className={css.layout}>
      <AppBar />
      <main className={css.main}>{children}</main>
      <Footer />
    </div>
  );
}
