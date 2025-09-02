import css from "./HomePage.module.css";
import Container from "../../reuseable/Container/Container";
import RecipesList from "../../components/RecipesList/RecipesList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/recipes/operations";
import SearchBox from "../../components/SearchBox/SearchBox";
import Filters from "../../components/Filters/Filters";
import {
  selectHasNextPage,
  selectRecipes,
  selectTotalItems,
} from "../../redux/recipes/selectors";
import { selectSearch, selectSelectedCategories, selectSelectedIngredients } from "../../redux/filters/selectors";

export default function HomePage() {
  const dispatch = useDispatch();
  const nextPage = useSelector(selectHasNextPage);
  const totalItems = useSelector(selectTotalItems);
  const recipes = useSelector(selectRecipes);

  const [page, setPage] = useState(1);

  const search = useSelector(selectSearch);
  const categories = useSelector(selectSelectedCategories);
  const ingredients = useSelector(selectSelectedIngredients);

  useEffect(() => {
    setPage(1)
  }, [search, categories, ingredients]);

  useEffect(() => {
    dispatch(fetchRecipes({page, filters:{search, categories, ingredients}}));
  }, [dispatch, page, search, categories, ingredients]);

  return (
    <section className={css.wrapper}>
      <Container>
        <SearchBox/>
        <h2 className={css.subtitle}>Recipes</h2>
        <RecipesList children={<Filters/>} hasNextPage={nextPage} totalItems={totalItems} data={recipes} setPage={setPage} />
      </Container>
    </section>
  );
}
