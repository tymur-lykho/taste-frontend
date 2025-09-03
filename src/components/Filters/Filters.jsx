import css from "./Filters.module.css";
import FilterMenu from "./FilterMenu/FilterMenu";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../../redux/recipes/selectors";

export default function Filters() {
  const totalItems = useSelector(selectTotalItems);

  return (
    <div className={css.filterPanel}>
      <p className={css.total} >
        {totalItems} {totalItems > 1 ? "reсipes" : "recipe"}
      </p>
      <FilterMenu className={css.menu} />
    </div>
  );
}
