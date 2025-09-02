import { useDispatch, useSelector } from "react-redux";
import {
  selectRecipes,
  selectHasNextPage,
  selectTotalItems,
} from "../../redux/recipes/selectors";
import { useEffect, useState } from "react";
import { fetchOwnRecipes } from "../../redux/recipes/operations";
import RecipesList from "../RecipesList/RecipesList";

export default function MyRecipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const hasNext = useSelector(selectHasNextPage);
  const totalItems = useSelector(selectTotalItems);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchOwnRecipes(page));
  }, [dispatch, page]);

  return (
    <>
      <RecipesList
        hasNextPage={hasNext}
        totalItems={totalItems}
        setPage={setPage}
        data={recipes}
      />
    </>
  );
}
