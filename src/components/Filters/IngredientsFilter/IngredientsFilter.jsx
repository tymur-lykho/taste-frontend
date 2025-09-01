import { useSelector, useDispatch } from "react-redux";
import { setIngredients } from "../../../redux/filters/slice";
// import { fetchFilteredRecipes } from "../../../redux/filters/operations";
import { useMemo } from "react";
import {
  selectFilterData,
  selectSelectedIngredients,
} from "../../../redux/filters/selectors";
import css from "./IngredientsFilter.module.css";
import Select from "react-select";

export default function IngredientsFilter() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(selectFilterData);
  const selectedIngredients = useSelector(selectSelectedIngredients);

  const options = useMemo(
    () => ingredients.map((ing) => ({ value: ing._id, label: ing.name })),
    [ingredients]
  );

  const value = useMemo(
    () =>
      options.filter((option) => selectedIngredients.includes(option.value)),
    [options, selectedIngredients]
  );

  const handleChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];

    dispatch(setIngredients(values));
    // dispatch(fetchFilteredRecipes());
  };

  return (
    <Select
      className={css.select}
      options={options}
      value={value}
      onChange={handleChange}
      isMulti
      placeholder="Ingredients..."
    />
  );
}
