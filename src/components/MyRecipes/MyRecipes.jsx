import { useDispatch, useSelector } from "react-redux";
import {
  selectRecipes,
  selectHasNextPage,
  selectTotalItems,
} from "../../redux/recipes/selectors";
import { useEffect, useState } from "react";
import { fetchOwnRecipes } from "../../redux/recipes/operations";
import RecipesList from "../RecipesList/RecipesList";
import SearchResultEmpty from "../SearchResultEmpty/SearchResultEmpty";
import { useNavigate } from "react-router-dom";
import { clearRecipesState } from "../../redux/recipes/slice";

export default function MyRecipes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const hasNext = useSelector(selectHasNextPage);
  const totalItems = useSelector(selectTotalItems);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(clearRecipesState());
  }, [dispatch]);

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
        notFound={
          <SearchResultEmpty
            onAction={() => navigate("/add-recipe")}
            cardText="Your recipes can be here, add your first recipe now!"
            actionLabel="Create recipe"
          />
        }
      />
    </>
  );
}
