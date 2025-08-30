import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../..//reuseable/Container/Container.jsx";
import RecipesList from "../RecipesList/RecipesList.jsx";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn.jsx";
import {
  selectIsLoading,
  selectPage,
  selectHasNext,
  selectRecipes,
} from "../../redux/recipes/selectors";
import { fetchRecipes } from "../../redux/recipes/operations";
import css from "./SectionRecipes.module.css";

export default function SectionRecipes() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const hasNext = useSelector(selectHasNext);
  const page = useSelector(selectPage);
  const recipes = useSelector(selectRecipes);

  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    dispatch(fetchRecipes({ page: 1 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (isLoading || !hasNext || clicks >= 12) return;
    dispatch(fetchRecipes({ page: page + 1 }));
    setClicks((c) => c + 1);
  };
  // if (type === "profile" && isAuthenticated) {
  //   title = "My profile";
  // } else {
  //   title = "Recipes";
  // }

  return (
    <Container>
      <h2 className={css.title}>Recipes</h2>
      <RecipesList />

      {!isLoading && hasNext && clicks < 12 && (
        <LoadMoreBtn onClick={handleLoadMore} loading={isLoading} />
      )}

      {isLoading && recipes.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} loading={true} />
      )}
    </Container>
  );
}
