import { useSelector } from "react-redux";
import { selectError, selectIsLoading } from "../../redux/recipes/selectors";

import css from "./RecipesList.module.css";
import RecipesCard from "../RecipeCard/RecipeCard";
import Loader from "../Loader/Loader";

export default function RecipesList({
  fillters,
  hasNextPage,
  totalItems,
  data,
  setPage,
  notFound,
}) {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <div className={css.wrapper}>
      {fillters ? fillters : <p className={css.count}>{totalItems} recipes</p>}
      {error && <p>error</p>}
      {data.length > 0 ? (
        <>
          <ul className={css.list}>
            {data.map((recipe) => (
              <li className={css.item} key={recipe._id}>
                <RecipesCard recipe={recipe} />
              </li>
            ))}
          </ul>
          {hasNextPage && !isLoading && (
            <button
              className={css.btn}
              onClick={() => {
                setPage((number) => number + 1);
              }}
            >
              Load More
            </button>
          )}
        </>
      ) : (
        notFound
      )}
      {isLoading && <Loader />}
    </div>
  );
}
