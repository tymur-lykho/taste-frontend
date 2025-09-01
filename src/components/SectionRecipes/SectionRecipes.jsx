import RecipesList from "../RecipesList/RecipesList";
import css from "./SectionRecipes.module.css";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../reuseable/Container/Container.jsx";
import Filters from "../Filters/Filters.jsx";
import UserBar from "../UserBar/UserBar.jsx";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchFilteredRecipes } from "../../redux/filters/operations.js";
import {
  resetRecipes,
  setPage,
  setPerPage,
} from "../../redux/recipes/slice.js";
import {
  selectSearch,
  selectSelectedArea,
  selectSelectedCategories,
  selectSelectedIngredients,
} from "../../redux/filters/selectors.js";
import { selectPagination } from "../../redux/recipes/selectors.js";
import {
  setArea,
  setCategories,
  setIngredients,
  setSearch,
} from "../../redux/filters/slice.js";
import {
  fetchFavoritesRecipes,
  fetchOwnRecipes,
} from "../../redux/recipes/operations.js";

export default function SectionRecipes() {
  const isAuthenticated = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const categories = useSelector(selectSelectedCategories);
  const ingredients = useSelector(selectSelectedIngredients);
  const area = useSelector(selectSelectedArea);
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, perPage } = useSelector(selectPagination);

  const userId = isAuthenticated ? user.id : null;
  let type = "home";
  if (pathname.includes("/profile/favorites")) {
    type = "favorites";
  } else if (pathname.includes("/profile/own")) {
    type = "own";
  }

  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const perPageFromUrl = Number(searchParams.get("perPage")) || 12;
    const searchFromUrl = searchParams.get("search") || "";
    const categoriesFromUrl = searchParams.get("categories") || "";
    const ingredientsFromUrl =
      searchParams.get("ingredients")?.split(",") || [];
    const areaFromUrl = searchParams.get("area") || "";

    dispatch(setPage(pageFromUrl));
    dispatch(setPerPage(perPageFromUrl));
    dispatch(setSearch(searchFromUrl));
    dispatch(setCategories(categoriesFromUrl));
    dispatch(setIngredients(ingredientsFromUrl));
    dispatch(setArea(areaFromUrl));
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(resetRecipes());
  }, [search, categories, ingredients, area, dispatch]);

  useEffect(() => {
    setSearchParams({
      page,
      perPage,
      ...(search && { search }),
      ...(categories && { categories }),
      ...(ingredients?.length && { ingredients: ingredients.join(",") }),
      ...(area && { area }),
    });
  }, [page, perPage, search, categories, ingredients, area, setSearchParams]);

  useEffect(() => {
    if (type === "own" && isAuthenticated) {
      dispatch(fetchOwnRecipes());
    } else if (type === "favorites" && isAuthenticated) {
      dispatch(fetchFavoritesRecipes());
    } else {
      dispatch(fetchFilteredRecipes());
    }
  }, [
    page,
    perPage,
    search,
    categories,
    ingredients,
    area,
    dispatch,
    type,
    userId,
    isAuthenticated,
  ]);

  const isProfile = pathname.startsWith("/profile");

  useEffect(() => {
    if (isProfile && !isAuthenticated) {
      navigate("/register");
    }
  }, [isProfile, navigate, isAuthenticated]);

  const title = isProfile && isAuthenticated ? "My profile" : "Recipes";

  return (
    <Container>
      <h2 className={css.title}>{title}</h2>
      {isProfile && <UserBar />}
      <Filters />
      <RecipesList type={type} userId={userId} />
    </Container>
  );
}
