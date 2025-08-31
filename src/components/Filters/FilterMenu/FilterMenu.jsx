import css from "./FilterMenu.module.css";
import ResetFiltersLink from "../ResetFilter/ResetFilter";
import { useState } from "react";
import clsx from "clsx";
import Icon from "../../../reuseable/Icon/Icon";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import IngredientsFilter from "../IngredientsFilter/IngredientsFilter";
import { selectPagination } from "../../../redux/recipes/selectors";
import { useSelector } from "react-redux";

export default function FilterMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const filterMenu = () => setIsOpen(!isOpen);
  const { totalItems } = useSelector(selectPagination);

  return (
    <div className={css.filterMenu}>
       <p className={css.totalItems} >
        {totalItems} {totalItems > 1 ? "reсipes" : "recipe"}{" "}
      </p>
      <div className={css.btnWrapper}>
        <p className={css.txt}>Filters</p>
        <button
          className={clsx(css.btnFilter)}
          onClick={filterMenu}
          aria-label="filter"
          title="filter"
        >
          {isOpen ? (
            <Icon iconName="filter-close" className={clsx(css.icon)} />
          ) : (
            <Icon iconName="filter-icon" className={clsx(css.icon)} />
          )}
        </button>
      </div>

      <div className={clsx(css.wrapFilters, { [css.open]: isOpen })}>
        <CategoryFilter className={css.field} />
        <IngredientsFilter className={css.field} />
        <ResetFiltersLink className={css.resetLink} />
      </div>
    </div>
  );
}
