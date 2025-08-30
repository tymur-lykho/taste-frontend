import { useSelector, useDispatch } from "react-redux";
import { setIngredients } from "../../../redux/filters/slice";
import { fetchFilteredRecipes } from "../../../redux/filters/operations";
import { useMemo } from "react";
import WindowedSelect from "react-windowed-select";
import {
  selectFilterData,
  selectSelectedIngredients,
} from "../../../redux/filters/selectors";
import css from "./IngredientsFilter.module.css";

export default function IngredientsFilter() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(selectFilterData);
  const selectedIngredients = useSelector(selectSelectedIngredients);

  const options = useMemo(
    () => ingredients.map((ing) => ({ value: ing._id, label: ing.name })),
    [ingredients]
  );

  const value = options.filter((option) =>
    selectedIngredients.includes(option.value)
  );

  const handleChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];

    dispatch(setIngredients(values));
    // dispatch(fetchFilteredRecipes());
  };

  return (
    <WindowedSelect
      className={css.select}
      options={options}
      value={value}
      onChange={handleChange}
      isMulti
      placeholder="Ingredients..."
    />
  );
}
