import { useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
} from "../../redux/recipes/selectors";
import css from "./RecipesList.module.css";
import RecipesCard from "../RecipeCard/RecipeCard";
import Loader from "../Loader/Loader";

export default function RecipesList({hasNextPage, totalItems, data, setPage}) {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <div className={css.wrapper}>
      <p className={css.count}>{totalItems} recipes</p>
     
      {error && <p>error</p>}
      {data ? (
        <>
          <ul className={css.list}>
            {data.map((recipe) => (
              <li className={css.item} key={recipe._id}>
                <RecipesCard recipe={recipe} />
              </li>
            ))}
          </ul>
           {isLoading && <Loader/>}
          {hasNextPage && !isLoading && <button className={css.btn} onClick={() => {setPage(number => number +1)}}>Load More</button>}
        </>
      ) : (
        <p>No found recipe</p>
      )}
    </div>
  );
}
