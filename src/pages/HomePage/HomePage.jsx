import css from "./HomePage.module.css";
import Container from "../../reuseable/Container/Container";
import RecipesList from "../../components/RecipesList/RecipesList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/recipes/operations";
import SearchBox from "../../components/SearchBox/SearchBox";
import {
  selectHasNextPage,
  selectRecipes,
  selectTotalItems,
} from "../../redux/recipes/selectors";

export default function HomePage() {
  const dispatch = useDispatch();
  const nextPage = useSelector(selectHasNextPage);
  const totalItems = useSelector(selectTotalItems);
  const recipes = useSelector(selectRecipes);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchRecipes(page));
  }, [dispatch, page]);

  return (
    <div>
      <Container>
        <SearchBox/>
        <h2 className={css.subtitle}>Recipes</h2>
        {/* <Filters filters={filters} /> */}
        <RecipesList hasNextPage={nextPage} totalItems={totalItems} data={recipes} setPage={setPage} />
      </Container>
    </div>
  );
}
